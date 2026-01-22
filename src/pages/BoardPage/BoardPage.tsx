import { Container, CircularProgress, Box } from '@mui/material';
import { useTaskStore } from '../../hooks/useTaskStore';
import TaskColumn from '../../components/TaskColumn/TaskColumn';
import { TaskStage as TaskStageValues } from '../../types/taskStatus';

const BoardPage = () => {
  const { taskList, isLoading } = useTaskStore();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  const todoTasks = taskList.filter(t => t.status === TaskStageValues.Todo);
  const inProgressTasks = taskList.filter(t => t.status === TaskStageValues.InProgress);
  const doneTasks = taskList.filter(t => t.status === TaskStageValues.Done);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4
      }}>
        <Box sx={{ flex: 1 }}>
          <TaskColumn status={TaskStageValues.Todo} tasks={todoTasks} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TaskColumn status={TaskStageValues.InProgress} tasks={inProgressTasks} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TaskColumn status={TaskStageValues.Done} tasks={doneTasks} />
        </Box>
      </Box>
    </Container>
  );
};

export default BoardPage;
