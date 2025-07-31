export interface Question {
  id: string;
  text: string;
  property: string;
}

export interface Task {
  id: string;
  name: string;
  properties: Record<string, boolean>;
  score: number;
}

export interface TaskScore {
  taskId: string;
  score: number;
}

export interface SurveyInstance {
  id: string;
  taskScores: TaskScore[];
  completedAt: Date;
} 