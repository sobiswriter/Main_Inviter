import React, { useState, useRef, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  IconButton, 
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Fab,
  Zoom,
  Slide
} from '@mui/material';
import { ChatBubble, Close, Send } from '@mui/icons-material';

// Knowledge base for the chatbot about the invitation form
const knowledgeBase = {
  // Greetings and basic interactions
  "hi": "Hello! I'm your invitation assistant. How can I help you with your invitation form today?",
  "hello": "Hi there! I'm here to help with your invitation form. What would you like to know?",
  "hey": "Hey! Need help with your invitation form? Just ask me anything about it!",
  "bye": "Goodbye! Feel free to chat again if you need more help with your invitation.",
  "thanks": "You're welcome! Is there anything else you'd like to know about the invitation form?",
  "thank you": "You're welcome! Happy to help with your invitation needs.",
  "good morning": "Good morning! How can I assist you with your invitation form today?",
  "good afternoon": "Good afternoon! Need help with your invitation form?",
  "good evening": "Good evening! I'm here to help with your invitation form.",
  
  // Event name related
  "event name": "Enter the name of your event in the 'Event Name' field. This will be prominently displayed in your invitation.",
  "title": "The event title goes in the 'Event Name' field at the top of the form.",
  "name of event": "You can enter your event's name in the 'Event Name' field at the top of the form.",
  "what to call": "You should enter what you want to call your event in the 'Event Name' field.",
  
  // Date related
  "date": "Enter the date of your event in the 'Date' field. Use a clear format like MM/DD/YYYY.",
  "when": "To specify when your event will take place, fill in both the 'Date' and 'Time' fields.",
  "how to set date": "Simply click on the 'Date' field and type your event date in a format like MM/DD/YYYY.",
  "calendar": "The form doesn't have a calendar picker, but you can type the date directly in the 'Date' field.",
  "schedule": "Set your event schedule by filling in both the 'Date' and 'Time' fields.",
  
  // Time related
  "time": "Enter the time of your event in the 'Time' field. Use a format like HH:MM AM/PM.",
  "what time": "Specify the time your event starts in the 'Time' field using a format like 1:00 PM.",
  "duration": "Currently, the form only asks for the start time in the 'Time' field. If you want to include duration, mention it in the invitation text.",
  "how to set time": "Click on the 'Time' field and enter the time of your event in a format like 7:30 PM.",
  
  // Location related
  "location": "Enter where your event will take place in the 'Location' field.",
  "where": "Specify where your event will be held in the 'Location' field.",
  "place": "Enter the venue or place of your event in the 'Location' field.",
  "address": "You should put the full address or location details in the 'Location' field.",
  "venue": "Enter your event venue in the 'Location' field.",
  "how to set location": "Simply type the address or venue name in the 'Location' field.",
  
  // Recipients related
  "recipients": "Enter email addresses or phone numbers of people you want to invite, separated by commas.",
  "who to invite": "Add the email addresses or phone numbers of your guests in the 'Recipients' field, separated by commas.",
  "guest list": "Enter all guest email addresses or phone numbers in the 'Recipients' field, with commas between each one.",
  "invitees": "List all the people you want to invite by adding their email addresses or phone numbers in the 'Recipients' field.",
  "how to add people": "To add people to your invitation, enter their email addresses or phone numbers in the 'Recipients' field, separated by commas.",
  "add guests": "Add your guests' contact information in the 'Recipients' field, using commas to separate multiple entries.",
  
  // Send method related
  "send method": "Choose whether to send your invitation via 'Email' or 'SMS' from the dropdown menu.",
  "how to send": "Select either 'Email' or 'SMS' from the 'Send Via' dropdown menu to choose how to deliver your invitation.",
  "delivery method": "You can choose between email and SMS delivery using the 'Send Via' dropdown.",
  "email or sms": "Select your preferred delivery method (Email or SMS) from the 'Send Via' dropdown menu.",
  "text message": "If you want to send invitations via text message, select 'SMS' from the 'Send Via' dropdown.",
  
  // Invitation text related
  "invitation text": "Enter the text of your invitation in the 'Invitation Text' field. You can also generate text automatically with the 'Generate with AI' button.",
  "message": "Type your invitation message in the 'Invitation Text' field, or use the AI generator to create it automatically.",
  "wording": "You can write your own invitation wording in the 'Invitation Text' field or use the AI to generate it for you.",
  "what to write": "You can write a personalized message in the 'Invitation Text' field or click 'Generate with AI' to create text automatically.",
  "how to write": "You can either write your own invitation text or click the 'Generate with AI' button to create it automatically based on your event details.",
  "invite": "Craft your invitation message in the 'Invitation Text' field, or use the AI generator to create it based on your event details.",
  
  // AI generation related
  "generate text": "Click the 'Generate with AI' button to automatically create invitation text based on your event details.",
  "ai": "The 'Generate with AI' feature uses artificial intelligence to create invitation text based on your event details.",
  "automatic text": "Click 'Generate with AI' to have the system automatically create invitation text based on your event information.",
  "ai generation": "The system can generate invitation text for you - just fill in the event details and click 'Generate with AI'.",
  "how to generate": "To generate invitation text automatically, first fill in your event details, then click the 'Generate with AI' button.",
  
  // Sending related
  "send invitation": "Click the 'Send' button to send your invitation to all recipients.",
  "how to send invitation": "After filling in all required fields, click the 'Send' button to deliver your invitation to all recipients.",
  "deliver": "To deliver your invitation, fill in all required fields and click the 'Send' button.",
  
  // Navigation related
  "back": "Click the 'Back to Dashboard' button to return to the main dashboard.",
  "dashboard": "To return to the dashboard, click the 'Back to Dashboard' button at the bottom of the form.",
  "cancel": "If you want to cancel creating this invitation, click the 'Back to Dashboard' button.",
  
  // General form information
  "fields": "Required fields include Event Name, Date, Time, Location, Recipients, and Invitation Text.",
  "required": "You must fill in Event Name, Date, Time, Location, Recipients, and Invitation Text before sending.",
  "mandatory": "The mandatory fields are Event Name, Date, Time, Location, Recipients, and Invitation Text.",
  
  // Help and general information
  "help": "I can answer questions about how to use the invitation form. What specific part do you need help with?",
  "how does this work": "This form allows you to create and send invitations. Fill in your event details, add recipients, write or generate invitation text, and click Send.",
  "what is this": "This is an invitation form that helps you create and send invitations to your events via email or SMS.",
  "purpose": "This form helps you create and send digital invitations to your event guests via email or SMS.",
  "features": "This invitation form lets you specify event details, add recipients, generate invitation text with AI, and send invitations via email or SMS.",
  
  // Default response for unrecognized queries
  "default": "I can only answer questions about the invitation form. Please ask something related to creating or sending invitations."
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm here to help with your invitation form. What questions do you have?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findAnswer = (question) => {
    // Convert question to lowercase for case-insensitive matching
    const lowerQuestion = question.toLowerCase();
    
    // Check if any keywords from the knowledge base are in the question
    for (const [keyword, answer] of Object.entries(knowledgeBase)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }
    
    // If no specific match is found, return the default response
    return knowledgeBase.default;
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    
    // Get bot response
    const botResponse = findAnswer(input);
    
    // Add bot message with a slight delay to simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 500);
    
    // Clear input
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <Zoom in={true}>
        <Fab 
          color="primary" 
          aria-label="chat"
          onClick={toggleChat}
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20,
            zIndex: 1000
          }}
        >
          <ChatBubble />
        </Fab>
      </Zoom>

      {/* Chat window */}
      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: 320,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            overflow: 'hidden',
            borderRadius: 2
          }}
        >
          {/* Chat header */}
          <Box
            sx={{
              p: 2,
              backgroundColor: '#1976d2',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h6">Invitation Helper</Typography>
            <IconButton size="small" onClick={toggleChat} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Chat messages */}
          <List
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              backgroundColor: '#f5f5f5'
            }}
          >
            {messages.map((message, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  flexDirection: message.isBot ? 'row' : 'row-reverse',
                  p: 0.5
                }}
              >
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: message.isBot ? '#1976d2' : '#e0e0e0',
                      color: message.isBot ? 'white' : 'black'
                    }}
                  >
                    {message.isBot ? 'B' : 'U'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Paper
                      elevation={1}
                      sx={{
                        p: 1,
                        backgroundColor: message.isBot ? 'white' : '#dcf8c6',
                        borderRadius: 1,
                        maxWidth: '80%',
                        display: 'inline-block'
                      }}
                    >
                      <Typography variant="body2">{message.text}</Typography>
                    </Paper>
                  }
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>

          {/* Chat input */}
          <Box
            sx={{
              p: 1,
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Ask about the invitation form..."
              variant="outlined"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={input.trim() === ''}
            >
              <Send />
            </IconButton>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}

export default Chatbot;
