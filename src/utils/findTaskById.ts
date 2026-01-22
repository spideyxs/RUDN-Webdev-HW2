import type { Task } from '../types/task';

export const findTaskById = (taskList: Task[], taskId: number | null): Task | null => {
  if (!taskId) {
    return null;
  }
  const foundTask = taskList.find(task => task.id === taskId);
  return foundTask || null;
};
