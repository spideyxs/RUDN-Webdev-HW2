import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';
import { useTaskStore } from '../../hooks/useTaskStore';

const CreateTaskPage = () => {
  const navigate = useNavigate();
  const { createTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Название задачи обязательно');
      return;
    }

    try {
      await createTask({ title: title.trim(), description: description.trim() });
      navigate('/');
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
          border: '3px solid #E63946',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(230, 57, 70, 0.2)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            component="img"
            src="/img/svgwaves_io_spiderman (3).png"
            alt="Create"
            sx={{ width: 40, height: 40 }}
          />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #E63946 0%, #C41E3A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Создать задачу
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Название задачи"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            error={!!error}
            helperText={error}
            required
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#E63946'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#E63946'
                }
              }
            }}
          />
          
          <TextField
            fullWidth
            label="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1E40AF'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1E40AF'
                }
              }
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                background: 'linear-gradient(135deg, #E63946 0%, #C41E3A 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                boxShadow: '0 4px 16px rgba(230, 57, 70, 0.4)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #C41E3A 0%, #A01A2A 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(230, 57, 70, 0.5)',
                  transition: 'all 0.3s'
                }
              }}
            >
              Создать
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/')}
              sx={{
                borderColor: '#1E40AF',
                color: '#1E40AF',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#1E3A8A',
                  bgcolor: 'rgba(30, 64, 175, 0.1)',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.3s'
                }
              }}
            >
              Отмена
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateTaskPage;
