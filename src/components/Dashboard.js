import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Box, Grid, Card, CardContent, Container, Avatar, Rating, IconButton, Tooltip, Badge, Fab, Menu, MenuItem, Switch, FormControlLabel, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BuildIcon from '@mui/icons-material/Build';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EditIcon from '@mui/icons-material/Edit';
import TextsmsIcon from '@mui/icons-material/Textsms';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';

function Dashboard({ onLogout, onCreate }) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [anchorEl, setAnchorEl] = useState(null);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [notificationDrawer, setNotificationDrawer] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState(true);
  const [expandedNotification, setExpandedNotification] = useState(null);
  
  // Add global style to hide scrollbars
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    // Add CSS to hide scrollbars
    style.textContent = `
      body, html {
        overflow: hidden !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      body::-webkit-scrollbar, html::-webkit-scrollbar, *::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important;
      }
    `;
    // Append style to head
    document.head.appendChild(style);
    
    // Cleanup function
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Simulated notifications data
  const notifications = [
    {
      id: 1,
      title: "New Feature Available",
      message: "Try our new AI-powered invitation templates! Create stunning designs with just a few clicks.",
      time: "2 hours ago",
      read: false,
      icon: <StarIcon sx={{ color: '#2196F3' }} />
    },
    {
      id: 2,
      title: "Invitation Sent",
      message: "Your invitation to 'Team Meeting' was successfully sent to 12 recipients.",
      time: "Yesterday",
      read: true,
      icon: <EmailIcon sx={{ color: '#2196F3' }} />
    },
    {
      id: 3,
      title: "RSVP Update",
      message: "You have 5 new RSVPs for 'Birthday Party'. 3 accepted, 2 declined.",
      time: "2 days ago",
      read: false,
      icon: <PeopleIcon sx={{ color: '#2196F3' }} />
    }
  ];
  
  useEffect(() => {
    // Hide welcome animation after 3 seconds
    const timer = setTimeout(() => {
      setWelcomeAnimation(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };
  
  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };
  
  const toggleNotificationDrawer = () => {
    setNotificationDrawer(!notificationDrawer);
  };
  
  const markAllAsRead = () => {
    setNotificationCount(0);
  };
  
  const toggleExpandNotification = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
  };
  
  const speedDialActions = [
    { icon: <HomeIcon />, name: 'Home' },
    { icon: <HistoryIcon />, name: 'History' },
    { icon: <SettingsIcon />, name: 'Settings' },
  ];

  return (
    <Container maxWidth={false} disableGutters sx={{ 
      height: '100vh', 
      overflow: 'hidden',
      padding: 0,
      margin: 0,
      maxWidth: '100%',
      width: '100%'
    }}>
      {/* Welcome Animation Overlay */}
      {welcomeAnimation && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode ? 'rgba(26, 26, 46, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeOut 0.5s ease-in-out 2.5s forwards',
            '@keyframes fadeOut': {
              '0%': { opacity: 1 },
              '100%': { opacity: 0, visibility: 'hidden' }
            }
          }}
        >
          <Typography 
            variant="h2" 
            sx={{ 
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
              animation: 'scaleIn 0.5s ease-out',
              '@keyframes scaleIn': {
                '0%': { transform: 'scale(0.8)', opacity: 0 },
                '100%': { transform: 'scale(1)', opacity: 1 }
              }
            }}
          >
            Welcome to Inviter
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: darkMode ? '#fff' : '#333',
              mt: 2,
              opacity: 0,
              animation: 'fadeIn 0.5s ease-out 0.5s forwards',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            Your invitation management dashboard
          </Typography>
        </Box>
      )}
      
      <Box
        sx={{
          minHeight: '100vh',
          height: '100vh',
          width: '100vw',
          background: darkMode 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
            : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 1, sm: 2, md: 3 },
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          transition: 'background 0.5s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: darkMode 
              ? 'radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10.5%)'
              : 'radial-gradient(circle, rgba(255,255,255,0.8) 10%, transparent 10.5%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px',
            opacity: 0.3,
            pointerEvents: 'none',
          }
        }}
      >
        {/* Floating Navigation */}
        <Box sx={{ 
          position: 'fixed', 
          top: 16, 
          right: 16, 
          zIndex: 1100,
          display: 'flex',
          gap: 2,
          alignItems: 'center'
        }}>
          <Tooltip title="Toggle Theme">
            <IconButton 
              onClick={toggleDarkMode} 
              sx={{ 
                bgcolor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', 
                color: darkMode ? '#fff' : '#333',
                '&:hover': {
                  bgcolor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                }
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Notifications">
            <IconButton 
              onClick={toggleNotificationDrawer}
              sx={{ 
                bgcolor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', 
                color: darkMode ? '#fff' : '#333',
                '&:hover': {
                  bgcolor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                }
              }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Menu">
            <IconButton 
              onClick={handleMenuOpen}
              sx={{ 
                bgcolor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', 
                color: darkMode ? '#fff' : '#333',
                '&:hover': {
                  bgcolor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                background: darkMode ? 'rgba(26, 26, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: 2,
                color: darkMode ? '#fff' : 'inherit',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1 }}>
              <HomeIcon fontSize="small" />
              Dashboard
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1 }}>
              <HistoryIcon fontSize="small" />
              History
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1 }}>
              <SettingsIcon fontSize="small" />
              Settings
            </MenuItem>
            <MenuItem onClick={onLogout} sx={{ gap: 1, color: '#ff5252' }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
        
        {/* Notification Drawer */}
        <Drawer
          anchor="right"
          open={notificationDrawer}
          onClose={toggleNotificationDrawer}
          PaperProps={{
            sx: {
              width: { xs: '100%', sm: 300 },
              background: darkMode ? 'rgba(26, 26, 46, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: darkMode ? '#fff' : 'inherit',
            }
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Notifications</Typography>
            <Box>
              <Tooltip title="Mark all as read">
                <IconButton size="small" onClick={markAllAsRead} sx={{ mr: 1 }}>
                  <CheckCircleIcon fontSize="small" sx={{ color: '#2196F3' }} />
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={toggleNotificationDrawer}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <List sx={{ p: 0 }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  sx={{ 
                    p: 2, 
                    background: notification.read 
                      ? 'transparent' 
                      : (darkMode ? 'rgba(33, 150, 243, 0.1)' : 'rgba(33, 150, 243, 0.05)'),
                    borderLeft: notification.read 
                      ? 'none' 
                      : '3px solid #2196F3',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {notification.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                          {notification.title}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleExpandNotification(notification.id)}
                          sx={{ p: 0 }}
                        >
                          {expandedNotification === notification.id ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                        </IconButton>
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" sx={{ color: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
                        {notification.time}
                      </Typography>
                    }
                  />
                </ListItem>
                <Collapse in={expandedNotification === notification.id} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 2, pt: 0, pl: 9 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {notification.message}
                    </Typography>
                  </Box>
                </Collapse>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        
        {/* Speed Dial for Quick Actions */}
        <SpeedDial
          ariaLabel="Quick Actions"
          sx={{ position: 'fixed', bottom: 80, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleSpeedDialClose}
          onOpen={handleSpeedDialOpen}
          open={speedDialOpen}
          FabProps={{
            sx: {
              bgcolor: darkMode ? 'rgba(33, 150, 243, 0.9)' : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              '&:hover': {
                bgcolor: darkMode ? 'rgba(33, 150, 243, 1)' : 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
              }
            }
          }}
        >
          {speedDialActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleSpeedDialClose}
              FabProps={{
                sx: {
                  bgcolor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
                  color: darkMode ? '#fff' : '#333',
                }
              }}
            />
          ))}
        </SpeedDial>

        <Grid container spacing={1} sx={{ height: '100%', overflow: 'hidden', marginBottom: 5 }}>
          <Grid item xs={12} md={5} lg={3} sx={{ height: { md: '100%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Welcome Message */}
            <Box 
              sx={{
                background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: 1.5,
                borderRadius: 8,
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                marginBottom: 1.5,
                textAlign: 'center',
                width: '100%',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                animation: 'fadeIn 1s ease-out',
                transform: 'translateY(0)',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Typography 
                variant="h5" 
                sx={{
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                  mb: 1
                }}
              >
                Welcome!
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, color: darkMode ? '#fff' : 'inherit' }}>
                You're logged in. Ready to send some invitations?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={onCreate}
                  startIcon={<AddIcon />}
                  size="small"
                  sx={{
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    borderRadius: 6,
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    color: 'white',
                    height: 32,
                    padding: '0 12px',
                    fontSize: '0.8rem',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  Create Invitation
                </Button>
                <Button
                  variant="outlined"
                  onClick={onLogout}
                  size="small"
                  sx={{
                    borderRadius: 6,
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.23)',
                    color: darkMode ? '#fff' : 'inherit',
                    height: 32,
                    padding: '0 12px',
                    fontSize: '0.8rem',
                    '&:hover': {
                      borderColor: '#2196F3',
                      color: '#2196F3',
                      background: 'transparent',
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Box>
            
            {/* About Inviter */}
            <Box 
              sx={{
                marginBottom: 1.5, 
                width: '100%',
                transform: 'translateY(0)',
                transition: 'transform 0.5s ease',
                animation: 'fadeIn 1.2s ease-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                }
              }}
            >
              <Card
                elevation={0}
                sx={{
                  background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ padding: 1.5 }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                    }}
                  >
                    <EventNoteIcon sx={{ marginRight: 1, color: '#2196F3' }} fontSize="small" />
                    About Inviter
                  </Typography>
                  <Typography variant="body2" sx={{ color: darkMode ? '#fff' : 'inherit' }}>
                    Inviter is your all-in-one solution for creating and sending personalized invitations. Whether it's for a birthday party, wedding, or corporate event, Inviter makes it easy to design and deliver beautiful invitations to your guests.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7} lg={5}>
            <Grid container spacing={1} sx={{ height: '100%' }}>
              <Grid item xs={12}>
                {/* What We Do */}
                <Box
                  sx={{
                    width: '100%',
                    marginBottom: 1.5,
                    transform: 'translateY(0)',
                    transition: 'transform 0.5s ease',
                    animation: 'fadeIn 1.4s ease-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: 8,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ padding: 1.5, flexGrow: 1, overflow: 'hidden' }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          fontWeight: 'bold',
                          fontSize: { xs: '1rem', md: '1.1rem' },
                        }}
                      >
                        <BuildIcon sx={{ marginRight: 1, color: '#2196F3' }} fontSize="small" />
                        What We Do
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <EditIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Create custom invitations with our easy-to-use editor</Typography>
                        </Box>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <SmartToyIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Generate AI-powered invitation text</Typography>
                        </Box>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <EmailIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Send invitations via email or SMS</Typography>
                        </Box>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <PeopleIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Track RSVPs and manage guest lists</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>

                {/* Future Scopes */}
                <Box
                  sx={{
                    width: '100%',
                    height: { md: '48%' },
                    transform: 'translateY(0)',
                    transition: 'transform 0.5s ease',
                    animation: 'fadeIn 1.4s ease-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: 8,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ padding: 1.5, flexGrow: 1, overflow: 'hidden' }}>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          fontWeight: 'bold',
                          fontSize: { xs: '1rem', md: '1.1rem' },
                        }}
                      >
                        <TrendingUpIcon sx={{ marginRight: 1, color: '#2196F3' }} fontSize="small" />
                        Future Scopes
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <CalendarMonthIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Integration with calendar apps</Typography>
                        </Box>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <LanguageIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Support for more languages</Typography>
                        </Box>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <SmartToyIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Enhanced AI for more personalized messages</Typography>
                        </Box>
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            padding: 1.5,
                            borderRadius: 8,
                            background: darkMode ? 'rgba(44, 62, 80, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                              transform: 'translateX(10px)',
                              boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                            }
                          }}
                        >
                          <PhoneAndroidIcon sx={{ color: '#2196F3' }} />
                          <Typography sx={{ color: darkMode ? '#fff' : 'inherit' }}>Mobile app for on-the-go management</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4} sx={{ height: { lg: '100%' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Reviews Section */}
            <Box
              sx={{
                width: '100%',
                height: { lg: '85%' },
                transform: 'translateY(0)',
                transition: 'transform 0.5s ease',
                animation: 'fadeIn 1.6s ease-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                }
              }}
            >
              <Card 
                elevation={0}
                sx={{
                  background: darkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: 8,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ padding: 1.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      fontWeight: 'bold',
                      fontSize: { xs: '1rem', md: '1.1rem' },
                    }}
                  >
                    <StarIcon sx={{ marginRight: 1, color: '#2196F3' }} fontSize="small" />
                    What Our Users Say
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, justifyContent: 'space-around' }}>
                    {/* Review Card 1 */}
                    <Box 
                      sx={{ 
                        padding: 1.5, 
                        borderRadius: 8, 
                        background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 203, 243, 0.1) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          transform: 'translateY(-5px) scale(1.02)',
                          boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.3)',
                          '&::before': {
                            opacity: 1,
                          }
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: '#2196F3',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 0 15px rgba(33, 150, 243, 0.5)',
                            }
                          }}
                        >
                          ER
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : 'inherit' }}>Emily R.</Typography>
                          <Rating value={5} readOnly size="small" />
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: darkMode ? '#fff' : 'inherit', position: 'relative', zIndex: 1 }}>
                        "Inviter made planning my wedding so much easier! The AI text generation saved me hours."
                      </Typography>
                    </Box>
                    
                    {/* Review Card 2 */}
                    <Box 
                      sx={{ 
                        padding: 1.5, 
                        borderRadius: 8, 
                        background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 203, 243, 0.1) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          transform: 'translateY(-5px) scale(1.02)',
                          boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.3)',
                          '&::before': {
                            opacity: 1,
                          }
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: '#2196F3',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 0 15px rgba(33, 150, 243, 0.5)',
                            }
                          }}
                        >
                          JD
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : 'inherit' }}>John D.</Typography>
                          <Rating value={4.5} precision={0.5} readOnly size="small" />
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: darkMode ? '#fff' : 'inherit', position: 'relative', zIndex: 1 }}>
                        "I love how professional the invitations look. My clients are impressed!"
                      </Typography>
                    </Box>
                    
                    {/* Review Card 3 */}
                    <Box 
                      sx={{ 
                        padding: 1.5, 
                        borderRadius: 8, 
                        background: darkMode ? 'rgba(44, 62, 80, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 4px 15px 0 rgba(31, 38, 135, 0.2)',
                        transform: 'translateY(0)',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(45deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 203, 243, 0.1) 100%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                        },
                        '&:hover': {
                          transform: 'translateY(-5px) scale(1.02)',
                          boxShadow: '0 8px 25px 0 rgba(31, 38, 135, 0.3)',
                          '&::before': {
                            opacity: 1,
                          }
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: '#2196F3',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              boxShadow: '0 0 15px rgba(33, 150, 243, 0.5)',
                            }
                          }}
                        >
                          SK
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: darkMode ? '#fff' : 'inherit' }}>Sarah K.</Typography>
                          <Rating value={5} readOnly size="small" />
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ color: darkMode ? '#fff' : 'inherit', position: 'relative', zIndex: 1 }}>
                        "The RSVP tracking feature is a game-changer. No more chasing guests!"
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box 
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: { xs: 1, sm: 1.5 },
            background: darkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            color: darkMode ? '#fff' : '#333',
            textAlign: 'center',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            boxShadow: '0 -8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            zIndex: 1000,
            animation: 'fadeIn 1.8s ease-out',
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 'bold',
                }}
              >
                Get in Touch
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  transition: 'all 0.3s ease',
                  padding: '4px 8px',
                  borderRadius: 8,
                  '&:hover': {
                    background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                    transform: 'translateY(-3px)',
                  }
                }}
              >
                <EmailOutlinedIcon sx={{ color: '#2196F3', fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: darkMode ? '#fff' : 'inherit' }}>contact@inviter.com</Typography>
              </Box>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  transition: 'all 0.3s ease',
                  padding: '4px 8px',
                  borderRadius: 8,
                  '&:hover': {
                    background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                    transform: 'translateY(-3px)',
                  }
                }}
              >
                <PhoneIcon sx={{ color: '#2196F3', fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: darkMode ? '#fff' : 'inherit' }}>+1 234 567 8900</Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#2196F3', 
                  transition: 'all 0.3s ease',
                  background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                  '&:hover': { 
                    transform: 'scale(1.2)',
                    background: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.7)',
                  } 
                }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#2196F3', 
                  transition: 'all 0.3s ease',
                  background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                  '&:hover': { 
                    transform: 'scale(1.2)',
                    background: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.7)',
                  } 
                }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#2196F3', 
                  transition: 'all 0.3s ease',
                  background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                  '&:hover': { 
                    transform: 'scale(1.2)',
                    background: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.7)',
                  } 
                }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: '#2196F3', 
                  transition: 'all 0.3s ease',
                  background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                  '&:hover': { 
                    transform: 'scale(1.2)',
                    background: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.7)',
                  } 
                }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
          <Typography variant="body2" sx={{ opacity: 0.7, marginTop: 1, color: darkMode ? '#fff' : 'inherit' }}>
            2025 Inviter. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;