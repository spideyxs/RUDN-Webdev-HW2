import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Divider,
  CircularProgress 
} from '@mui/material';
import { useTaskStore } from '../../hooks/useTaskStore';
import { findTaskById } from '../../utils/findTaskById';
import type { TaskStatus } from '../../types/task';
import { STATUS_LABELS } from '../../types/task';
import { TaskStage as TaskStageValues } from '../../types/taskStatus';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { taskList, updateTaskStatus, deleteTask } = useTaskStore();
  
  const taskId = id ? parseInt(id) : null;
  const openedTask = findTaskById(taskList, taskId);

  if (!openedTask) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  const taskStatus = openedTask.status;
  const taskTitle = openedTask.title;
  const taskDescription = openedTask.description;
  const taskCreatedAt = openedTask.createdAt;
  const selectedTaskId = openedTask.id;

  const canMoveToTodo = taskStatus !== TaskStageValues.Todo;
  const canMoveToInProgress = taskStatus !== TaskStageValues.InProgress;
  const canMoveToDone = taskStatus !== TaskStageValues.Done;

  const handleStatusChange = async (newStatus: TaskStatus) => {
    try {
      await updateTaskStatus({ taskId: selectedTaskId, status: newStatus });
    } catch (err) {
      console.error('Ошибка при обновлении статуса:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      try {
        await deleteTask(selectedTaskId);
        navigate('/');
      } catch (err) {
        console.error('Ошибка при удалении задачи:', err);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
          border: '3px solid #E63946',
          borderRadius: '16px',
          boxShadow: '0 12px 32px rgba(230, 57, 70, 0.2)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component="img"
              src="/img/svgwaves_io_spiderman (4).png"
              alt="Task"
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
              Задача #{selectedTaskId}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{
              background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
              color: '#FFFFFF',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(220, 38, 38, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #B91C1C 0%, #991B1B 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(220, 38, 38, 0.5)',
                transition: 'all 0.3s'
              }
            }}
          >
            Удалить
          </Button>
        </Box>

        <Divider sx={{ mb: 3, borderColor: '#E63946', borderWidth: 2, borderRadius: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Название
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {taskTitle}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Описание
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {taskDescription || 'Описание отсутствует'}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Дата создания
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {formatDate(taskCreatedAt)}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Статус
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 3, 
              fontWeight: 700,
              fontSize: '1.2rem',
              color: taskStatus === TaskStageValues.Todo ? '#FF6B35' : taskStatus === TaskStageValues.InProgress ? '#1E40AF' : '#10B981'
            }}
          >
            {STATUS_LABELS[taskStatus as TaskStatus]}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3, borderColor: '#1E40AF', borderWidth: 2, borderRadius: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Изменить статус:
          </Typography>
          
          {canMoveToTodo && (
            <Button
              variant="contained"
              onClick={() => handleStatusChange(TaskStageValues.Todo)}
              sx={{ 
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                py: 1.5,
                boxShadow: '0 4px 16px rgba(255, 107, 53, 0.4)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(255, 107, 53, 0.5)',
                  transition: 'all 0.3s'
                }
              }}
            >
              Перевести в "К выполнению"
            </Button>
          )}
          
          {canMoveToInProgress && (
            <Button
              variant="contained"
              onClick={() => handleStatusChange(TaskStageValues.InProgress)}
              sx={{ 
                background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                py: 1.5,
                boxShadow: '0 4px 16px rgba(30, 64, 175, 0.4)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(30, 64, 175, 0.5)',
                  transition: 'all 0.3s'
                }
              }}
            >
              Перевести в "В работе"
            </Button>
          )}
          
          {canMoveToDone && (
            <Button
              variant="contained"
              onClick={() => handleStatusChange(TaskStageValues.Done)}
              sx={{ 
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                color: '#FFFFFF',
                fontWeight: 700,
                py: 1.5,
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
                '&:hover': { 
                  background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.5)',
                  transition: 'all 0.3s'
                }
              }}
            >
              Перевести в "Выполнено"
            </Button>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
            sx={{
              borderColor: '#1E40AF',
              color: '#1E40AF',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': {
                borderColor: '#1E3A8A',
                bgcolor: 'rgba(30, 64, 175, 0.1)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s'
              }
            }}
          >
            Назад к списку
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskViewPage;
