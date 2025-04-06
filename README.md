# 🎉 Event Inviter

Event Inviter is an intelligent event management system designed to streamline invitation creation, sending, and guest communication. Built with a modern tech stack, it integrates powerful APIs to automate SMS/email delivery and chatbot interaction for an interactive user experience.

---

## ✨ Features

- 💬 **AI Chatbot** using Gemini 2.0 Flash API for real-time Q&A about events.
- 📧 **Email Invites** powered by SendGrid.
- 📱 **SMS Invites** using Twilio API.
- 🔐 **Authentication & Database** with Supabase.
- 🖼️ **Beautiful UI** built with React and Tailwind CSS.
- 🌐 **Backend** powered by Node.js and Express for seamless API orchestration.
- 📊 **Dashboard** to view invitations, guest statuses, and event insights.

---

## 🛠️ Tech Stack

### 🔧 Frontend
- React.js (with Create React App)
- Tailwind CSS
- JSX Components

### 🧠 AI Integration
- Gemini 2.0 Flash API (for Chatbot)

### 📲 Messaging & Emails
- Twilio API (SMS)
- SendGrid API (Emails)

### ☁️ Backend
- Node.js
- Express.js
- Supabase (Database & Auth)

---

## 📁 Directory Structure

```bash
Event-Inviter/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   │   ├── twilioService.js
│   │   ├── sendGridService.js
│   │   └── chatbotService.js
│   ├── config/
│   ├── index.js
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chatbot.js
│   │   │   ├── Dashboard.js
│   │   │   ├── InvitationForm.js
│   │   │   └── Login.js
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package-lock.json


🚀 Getting Started
1. Clone the Repository
->
git clone https://github.com/your-username/Event-Inviter.git
cd Event-Inviter

2. Setup Backend
cd backend
npm install
Create a .env file with your credentials:

env
Copy
Edit
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
SENDGRID_API_KEY=your_sendgrid_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_api_key

Start the backend:
->
npm start
3. Setup Frontend
->
cd ../frontend
npm install
npm start
The app will run at: http://localhost:3000

📸 Screenshots


✅ Future Improvements
Add calendar syncing (Google Calendar API)

Admin dashboard for event analytics

RSVP tracking and automated reminders

Multi-language support

🧑‍💻 Contributing
Pull requests are welcome! Feel free to open an issue or submit a feature request.







