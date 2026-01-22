import { Card, CardContent, Typography, Box } from '@mui/material';
import type { Task } from '../../types/task';
import { TaskStage as TaskStageValues } from '../../types/taskStatus';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const navigate = useNavigate();
  const taskId = task.id;
  const taskTitle = task.title;
  const taskStatus = task.status;

  const handleClick = () => {
    navigate(`/task/${taskId}`);
  };

  const getCardStyle = () => {
    if (taskStatus === TaskStageValues.Todo) {
      return {
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
        border: '2px solid #FFFFFF',
        '&:hover': {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE5E5 100%)',
          borderColor: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.4)'
        }
      };
    } else if (taskStatus === TaskStageValues.InProgress) {
      return {
        background: 'linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%)',
        border: '2px solid #FFFFFF',
        '&:hover': {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #DBEAFE 100%)',
          borderColor: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.4)'
        }
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        border: '2px solid #E63946',
        '&:hover': {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
          borderColor: '#1E40AF',
          boxShadow: '0 8px 24px rgba(30, 64, 175, 0.3)'
        }
      };
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        ...getCardStyle(),
        '&:hover': { 
          ...getCardStyle()['&:hover'],
          transform: 'translateY(-4px) scale(1.02)'
        }
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {taskStatus === TaskStageValues.Todo && (
            <Box
              component="img"
              src="/img/svgwaves_io_spiderman.png"
              alt="Todo"
              sx={{ width: 20, height: 20 }}
            />
          )}
          {taskStatus === TaskStageValues.InProgress && (
            <Box
              component="img"
              src="/img/svgwaves_io_spiderman (1).png"
              alt="InProgress"
              sx={{ width: 20, height: 20 }}
            />
          )}
          {taskStatus === TaskStageValues.Done && (
            <Box
              component="img"
              src="/img/svgwaves_io_spiderman (2).png"
              alt="Done"
              sx={{ width: 20, height: 20 }}
            />
          )}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 700,
              cursor: 'pointer',
              color: taskStatus === TaskStageValues.Todo ? '#E63946' : taskStatus === TaskStageValues.InProgress ? '#1E40AF' : '#E63946',
              fontSize: '0.9rem',
              '&:hover': { 
                textDecoration: 'underline',
                color: taskStatus === TaskStageValues.Todo ? '#C41E3A' : taskStatus === TaskStageValues.InProgress ? '#1E3A8A' : '#C41E3A'
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            #{taskId}
          </Typography>
        </Box>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            mt: 1.5,
            fontWeight: 600,
            color: taskStatus === TaskStageValues.Done ? '#1E40AF' : '#1A1A1A'
          }}
        >
          {taskTitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
