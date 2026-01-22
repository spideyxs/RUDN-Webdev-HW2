import { Box, Typography, Paper } from '@mui/material';
import type { Task, TaskStatus } from '../../types/task';
import { STATUS_LABELS } from '../../types/task';
import { TaskStage as TaskStageValues } from '../../types/taskStatus';
import TaskCard from '../TaskCard/TaskCard';

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

const TaskColumn = ({ status, tasks }: ColumnProps) => {
  const statusColors = {
    [TaskStageValues.Todo]: '#E63946',
    [TaskStageValues.InProgress]: '#1E40AF',
    [TaskStageValues.Done]: '#FFFFFF'
  };

  const statusBgColors = {
    [TaskStageValues.Todo]: 'linear-gradient(135deg, #E63946 0%, #C41E3A 50%, #E63946 100%)',
    [TaskStageValues.InProgress]: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 50%, #3B82F6 100%)',
    [TaskStageValues.Done]: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #FFFFFF 100%)'
  };

  const textColors = {
    [TaskStageValues.Todo]: '#FFFFFF',
    [TaskStageValues.InProgress]: '#FFFFFF',
    [TaskStageValues.Done]: '#1E40AF'
  };

  return (
    <Paper 
      elevation={6} 
      sx={{ 
        p: 3, 
        minHeight: '400px',
        background: statusBgColors[status],
        border: status === TaskStageValues.Done ? '3px solid #E63946' : `3px solid ${statusColors[status]}`,
        borderRadius: '16px',
        boxShadow: status === TaskStageValues.Todo 
          ? '0 12px 32px rgba(230, 57, 70, 0.4)' 
          : status === TaskStageValues.InProgress 
          ? '0 12px 32px rgba(30, 64, 175, 0.4)'
          : '0 12px 32px rgba(230, 57, 70, 0.3)'
      }}
    >
      <Box 
        sx={{ 
          mb: 3, 
          pb: 2, 
          borderBottom: status === TaskStageValues.Done 
            ? '4px solid #1E40AF' 
            : `4px solid ${status === TaskStageValues.Todo ? '#FFFFFF' : '#FFFFFF'}`,
          borderRadius: '8px',
          background: status === TaskStageValues.Done 
            ? 'linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(230, 57, 70, 0.1) 100%)'
            : 'rgba(255, 255, 255, 0.15)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {status === TaskStageValues.Todo && (
            <Box
              component="img"
              src="/img/svgwaves_io_spiderman.png"
              alt="Todo"
              sx={{ width: 28, height: 28 }}
            />
          )}
          {status === TaskStageValues.InProgress && (
            <Box
              component="img"
              src="/img/svgwaves_io_spiderman (1).png"
              alt="InProgress"
              sx={{ width: 28, height: 28 }}
            />
          )}
          {status === TaskStageValues.Done && (
            <Box
              component="img"
              src="/img/svgwaves_io_spiderman (2).png"
              alt="Done"
              sx={{ width: 28, height: 28 }}
            />
          )}
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 800,
              color: textColors[status],
              textShadow: status === TaskStageValues.Done 
                ? '1px 1px 3px rgba(0,0,0,0.1)' 
                : '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '0.5px'
            }}
          >
            {STATUS_LABELS[status]}
          </Typography>
        </Box>
      </Box>
      <Box>
        {tasks.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
            Нет задач
          </Typography>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </Box>
    </Paper>
  );
};

export default TaskColumn;
