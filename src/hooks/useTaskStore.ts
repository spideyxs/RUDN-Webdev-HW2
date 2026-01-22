import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Task, TaskStatus } from '../types/task';
import { TaskStage as TaskStageValues } from '../types/taskStatus';
import { transformTodoToTask, generateTaskId } from '../utils/taskUtils';
import { useInitialTasks } from './useInitialTasks';
import { 
  getTasksFromStorage, 
  saveTasksToStorage, 
  addTaskToStorage,
  updateTaskInStorage,
  deleteTaskFromStorage 
} from '../utils/storage';

export const useTaskStore = () => {
  const queryClient = useQueryClient();
  const [taskList, setTaskList] = useState<Task[]>([]);

  const { data: todosData, isLoading: isLoadingTodos } = useInitialTasks();

  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    if (storedTasks.length > 0) {
      setTaskList(storedTasks);
    } else if (todosData) {
      const transformedTasks = todosData.slice(0, 20).map((todo: { id: number; title: string; completed: boolean }) => 
        transformTodoToTask(todo, todo.id)
      );
      saveTasksToStorage(transformedTasks);
      setTaskList(transformedTasks);
    }
  }, [todosData]);

  const createTaskMutation = useMutation({
    mutationFn: async (taskData: { title: string; description?: string }) => {
      const newTask: Task = {
        id: generateTaskId(),
        title: taskData.title,
        description: taskData.description || '',
        createdAt: new Date(),
        status: TaskStageValues.Todo
      };
      addTaskToStorage(newTask);
      const updatedList = [...taskList, newTask];
      setTaskList(updatedList);
      return Promise.resolve(newTask);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: number; status: TaskStatus }) => {
      const currentTasks = getTasksFromStorage();
      const foundTask = currentTasks.find((t: Task) => t.id === taskId);
      if (foundTask) {
        const updatedTask = { ...foundTask, status };
        updateTaskInStorage(updatedTask);
        const updatedList = taskList.map(t => t.id === taskId ? updatedTask : t);
        setTaskList(updatedList);
        return Promise.resolve(updatedTask);
      }
      throw new Error('Task not found');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      deleteTaskFromStorage(taskId);
      const updatedList = taskList.filter(t => t.id !== taskId);
      setTaskList(updatedList);
      return Promise.resolve(taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return {
    taskList,
    isLoading: isLoadingTodos,
    createTask: createTaskMutation.mutateAsync,
    updateTaskStatus: updateTaskStatusMutation.mutateAsync,
    deleteTask: deleteTaskMutation.mutateAsync
  };
};
