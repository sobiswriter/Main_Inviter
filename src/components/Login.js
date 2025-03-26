import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleSignup = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/signup', { email, password });
      localStorage.setItem('token', response.data.token);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        position: 'fixed',
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
        margin: '0 auto',
      }}
    >
      {/* Welcome Message */}
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: 4,
          padding: 3,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          maxWidth: '600px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: 1,
          }}
        >
          INVITER
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#555',
            fontStyle: 'italic',
          }}
        >
          Your All-in-One Solution for Creating and Sending Messages
        </Typography>
      </Box>

      {/* Login Form */}
      <Box
        sx={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          maxWidth: 400,
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          align="center"
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Login
        </Typography>
        {error && (
          <Typography color="error" sx={{ textAlign: 'center', marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(33, 150, 243, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(33, 150, 243, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196F3',
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(33, 150, 243, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(33, 150, 243, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196F3',
                    },
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  padding: 1.5,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
                  }
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleSignup}
                sx={{
                  padding: 1.5,
                  borderColor: '#21CBF3',
                  color: '#21CBF3',
                  '&:hover': {
                    borderColor: '#2196F3',
                    color: '#2196F3',
                    background: 'rgba(33, 150, 243, 0.08)',
                  }
                }}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default Login;