import { Task, Question } from '../types';

export const sampleTasks: Task[] = [
  {
    id: '1',
    name: 'Clean the kitchen',
    properties: {
      'indoor': true,
      'physical': true,
      'quick': false,
      'creative': false,
    },
    score: 0,
  },
  {
    id: '2',
    name: 'Write a blog post',
    properties: {
      'indoor': true,
      'physical': false,
      'quick': false,
      'creative': true,
    },
    score: 0,
  },
  {
    id: '3',
    name: 'Go for a run',
    properties: {
      'indoor': false,
      'physical': true,
      'quick': true,
      'creative': false,
    },
    score: 0,
  },
  {
    id: '4',
    name: 'Paint a picture',
    properties: {
      'indoor': true,
      'physical': false,
      'quick': false,
      'creative': true,
    },
    score: 0,
  },
  {
    id: '5',
    name: 'Organize desk',
    properties: {
      'indoor': true,
      'physical': true,
      'quick': true,
      'creative': false,
    },
    score: 0,
  },
];

export const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'Do you want to work indoors today?',
    property: 'indoor',
  },
  {
    id: '2',
    text: 'Do you feel like doing something physical?',
    property: 'physical',
  },
  {
    id: '3',
    text: 'Do you want to do something quick?',
    property: 'quick',
  },
  {
    id: '4',
    text: 'Do you want to do something creative?',
    property: 'creative',
  },
]; 