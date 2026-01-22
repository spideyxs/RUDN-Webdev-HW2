import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(135deg, #E63946 0%, #C41E3A 100%)',
        boxShadow: '0 4px 20px rgba(230, 57, 70, 0.4)'
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src="/img/spider-man.png"
          alt="Spider"
          sx={{ 
            mr: 2, 
            width: 32, 
            height: 32,
            filter: 'brightness(0) invert(1)'
          }}
        />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Доска задач
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ 
              fontWeight: 600,
              color: '#FFFFFF',
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s'
              }
            }}
          >
            Все задачи
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/create')}
            sx={{ 
              fontWeight: 600,
              color: '#FFFFFF',
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
                transition: 'all 0.2s'
              }
            }}
          >
            Создать задачу
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
