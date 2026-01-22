import type { Task } from '../types/task';
import { TaskStage as TaskStageValues } from '../types/taskStatus';

export const transformTodoToTask = (todo: { id: number; title: string; completed: boolean }, id: number): Task => {
  return {
    id: id,
    title: todo.title || 'Без названия',
    description: '',
    createdAt: new Date(),
    status: todo.completed ? TaskStageValues.Done : TaskStageValues.Todo
  };
};

export const generateTaskId = (): number => {
  return Date.now();
};
