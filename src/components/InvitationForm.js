import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Typography, 
  Paper, 
  Grid, 
  Alert,
  Box 
} from '@mui/material';
import axios from 'axios';
import Chatbot from './Chatbot';

function InvitationForm({ onBack }) {
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [recipients, setRecipients] = useState('');
  const [sendMethod, setSendMethod] = useState('email');
  const [invitationText, setInvitationText] = useState('');
  const [error, setError] = useState('');

  const handleGenerateText = async () => {
    if (!eventName || !date || !time || !location) {
      setError('Please fill in event details first');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/generate-text', {
        eventName,
        date,
        time,
        location,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvitationText(response.data.invitationText);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate text');
    }
  };

  const handleSend = async () => {
    if (!eventName || !date || !time || !location || !recipients || !invitationText) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/create-invitation', {
        eventName,
        date,
        time,
        location,
        recipients,
        sendMethod,
        invitationText,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Invitation saved successfully!');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save invitation');
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: '#e3f2fd', // Light blue background
          maxWidth: 800,
          margin: '0 auto',
          marginTop: 4,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2' }}>
          Create Invitation
        </Typography>
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Event Name"
                fullWidth
                variant="outlined"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                fullWidth
                variant="outlined"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Time"
                fullWidth
                variant="outlined"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                fullWidth
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Recipients (comma-separated emails or phone numbers)"
                fullWidth
                variant="outlined"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Send Via</InputLabel>
                <Select
                  value={sendMethod}
                  onChange={(e) => setSendMethod(e.target.value)}
                  label="Send Via"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Invitation Text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={invitationText}
                onChange={(e) => setInvitationText(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1976d2', color: '#fff' }}
              onClick={handleGenerateText}
            >
              Generate with AI
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1976d2', color: '#fff' }}
              onClick={handleSend}
            >
              Send
            </Button>
            <Button variant="outlined" sx={{ color: '#1976d2', borderColor: '#1976d2' }} onClick={onBack}>
              Back to Dashboard
            </Button>
          </Box>
        </form>
      </Paper>
      <Chatbot />
    </>
  );
}

export default InvitationForm;