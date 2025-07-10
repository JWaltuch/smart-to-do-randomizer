import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, Question, TaskScore } from '../types';
import { sampleTasks, sampleQuestions } from '../data/sampleData';

interface TaskContextType {
  tasks: Task[];
  questions: Question[];
  currentScores: TaskScore[];
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (questionId: string, updates: Partial<Question>) => void;
  deleteQuestion: (questionId: string) => void;
  updateTaskScore: (taskId: string, score: number) => void;
  resetScores: () => void;
  getTopTasks: (count: number) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentScores, setCurrentScores] = useState<TaskScore[]>([]);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const storedQuestions = await AsyncStorage.getItem('questions');
      
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Load sample data if no existing data
        setTasks(sampleTasks);
        await AsyncStorage.setItem('tasks', JSON.stringify(sampleTasks));
      }
      
      if (storedQuestions) {
        setQuestions(JSON.parse(storedQuestions));
      } else {
        // Load sample data if no existing data
        setQuestions(sampleQuestions);
        await AsyncStorage.setItem('questions', JSON.stringify(sampleQuestions));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const saveQuestions = async (newQuestions: Question[]) => {
    try {
      await AsyncStorage.setItem('questions', JSON.stringify(newQuestions));
    } catch (error) {
      console.error('Error saving questions:', error);
    }
  };

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const newTasks = tasks.map((task: Task) => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task: Task) => task.id !== taskId);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const addQuestion = (question: Question) => {
    const newQuestions = [...questions, question];
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    const newQuestions = questions.map((question: Question) => 
      question.id === questionId ? { ...question, ...updates } : question
    );
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
  };

  const deleteQuestion = (questionId: string) => {
    const newQuestions = questions.filter((question: Question) => question.id !== questionId);
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
  };

  const updateTaskScore = (taskId: string, score: number) => {
    setCurrentScores((prev: TaskScore[]) => {
      const existing = prev.find((s: TaskScore) => s.taskId === taskId);
      if (existing) {
        return prev.map((s: TaskScore) => s.taskId === taskId ? { ...s, score } : s);
      } else {
        return [...prev, { taskId, score }];
      }
    });
  };

  const resetScores = () => {
    setCurrentScores([]);
  };

  const getTopTasks = (count: number): Task[] => {
    return tasks
      .map((task: Task) => {
        const score = currentScores.find((s: TaskScore) => s.taskId === task.id)?.score || 0;
        return { ...task, score };
      })
      .sort((a: Task, b: Task) => b.score - a.score)
      .slice(0, count);
  };

  const value: TaskContextType = {
    tasks,
    questions,
    currentScores,
    addTask,
    updateTask,
    deleteTask,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    updateTaskScore,
    resetScores,
    getTopTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}; 