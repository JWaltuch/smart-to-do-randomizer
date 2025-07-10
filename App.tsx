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
              backgroundColor: '#667eea',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: '300',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Mindful Tasks' }}
          />
          <Stack.Screen 
            name="Questions" 
            component={QuestionScreen} 
            options={{ title: 'Your Journey' }}
          />
          <Stack.Screen 
            name="Result" 
            component={require('./src/screens/ResultScreen').default} 
            options={{ title: 'Your Recommendation' }}
          />
          <Stack.Screen 
            name="Tasks" 
            component={TaskListScreen} 
            options={{ title: 'Activities' }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </TaskProvider>
  );
} 