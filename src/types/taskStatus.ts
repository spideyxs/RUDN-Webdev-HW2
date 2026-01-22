export const TaskStage = {
  Todo: 0,
  InProgress: 1,
  Done: 2
} as const;

export type TaskStage = typeof TaskStage[keyof typeof TaskStage];
