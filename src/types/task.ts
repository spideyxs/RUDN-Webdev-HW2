import type { TaskStage } from './taskStatus';
import { TaskStage as TaskStageValues } from './taskStatus';

export interface Task {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  status: TaskStage;
}

export type TaskStatus = TaskStage;

export const STATUS_LABELS = {
  [TaskStageValues.Todo]: 'К выполнению',
  [TaskStageValues.InProgress]: 'В работе',
  [TaskStageValues.Done]: 'Выполнено'
};
