import AsyncStorage from '@react-native-async-storage/async-storage';
import { sampleTasks, sampleQuestions } from '../data/sampleData';

export const loadSampleData = async () => {
  try {
    // Check if data already exists
    const existingTasks = await AsyncStorage.getItem('tasks');
    const existingQuestions = await AsyncStorage.getItem('questions');

    // Only load sample data if no existing data
    if (!existingTasks) {
      await AsyncStorage.setItem('tasks', JSON.stringify(sampleTasks));
      console.log('Loaded sample tasks');
    }

    if (!existingQuestions) {
      await AsyncStorage.setItem('questions', JSON.stringify(sampleQuestions));
      console.log('Loaded sample questions');
    }
  } catch (error) {
    console.error('Error loading sample data:', error);
  }
}; 