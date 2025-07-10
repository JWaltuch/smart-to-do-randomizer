import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import { TaskProvider } from './src/context/TaskContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6366f1',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Smart To-Do Randomizer' }}
          />
          <Stack.Screen 
            name="Questions" 
            component={QuestionScreen} 
            options={{ title: 'Answer Questions' }}
          />
          <Stack.Screen 
            name="Tasks" 
            component={TaskListScreen} 
            options={{ title: 'Your Tasks' }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </TaskProvider>
  );
} 