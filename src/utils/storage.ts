import type { Task } from '../types/task';

const STORAGE_KEY = 'kanban_tasks';

export const getTasksFromStorage = (): Task[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const tasks = JSON.parse(stored);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  } catch {
    return [];
  }
};

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const addTaskToStorage = (task: Task): void => {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
};

export const updateTaskInStorage = (updatedTask: Task): void => {
  const tasks = getTasksFromStorage();
  const index = tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasksToStorage(tasks);
  }
};

export const deleteTaskFromStorage = (taskId: number): void => {
  const tasks = getTasksFromStorage();
  const filtered = tasks.filter(t => t.id !== taskId);
  saveTasksToStorage(filtered);
};
