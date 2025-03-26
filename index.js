require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const HF_API_TOKEN = process.env.HF_API_TOKEN;

const JWT_SECRET = process.env.JWT_SECRET;

// SMTP2GO setup
const transporter = nodemailer.createTransport({
  host: 'mail.smtp2go.com',
  port: 2525, // or 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Twilio setup
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const { error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }]);

  if (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Generate text with Hugging Face API
app.post('/generate-text', authenticateToken, async (req, res) => {
  const { eventName, date, time, location } = req.body;

  if (!eventName || !date || !time || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const prompt = `Write a short, casual invitation for ${eventName} on ${date} at ${time} at ${location}.`;
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/google/gemma-3-27b-it',
      { inputs: prompt, max_length: 50 },
      { headers: { Authorization: `Bearer ${HF_API_TOKEN}` } }
    );

    const text = response.data[0].generated_text.trim();
    res.json({ invitationText: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

// Create invitation endpoint with SMTP2GO
app.post('/create-invitation', authenticateToken, async (req, res) => {
  const { eventName, date, time, location, recipients, sendMethod, invitationText } = req.body;
  const userEmail = req.user.email;

  if (!eventName || !date || !time || !location || !recipients || !sendMethod || !invitationText) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Save to Supabase
  const { error: saveError } = await supabase
    .from('invitations')
    .insert([{
      user_email: userEmail,
      event_name: eventName,
      date,
      time,
      location,
      recipients,
      send_method: sendMethod,
      invitation_text: invitationText,
    }]);

  if (saveError) {
    return res.status(500).json({ error: 'Failed to save invitation' });
  }

  // Send invitation
  const recipientList = recipients.split(',').map(r => r.trim());
  try {
    if (sendMethod === 'email') {
      const mailOptions = {
        from: 'sobi2541@outlook.com', // e.g., 'you@example.com'
        to: recipientList,
        subject: `Invitation to ${eventName}`,
        text: invitationText,
      };
      await transporter.sendMail(mailOptions);
    } else if (sendMethod === 'sms') {
      for (const recipient of recipientList) {
        await twilioClient.messages.create({
          body: invitationText,
          from: twilioNumber,
          to: recipient,
        });
      }
    }
    res.json({ message: 'Invitation sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send invitation' });
  }
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});