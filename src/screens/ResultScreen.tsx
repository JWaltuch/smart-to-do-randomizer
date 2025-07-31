import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTaskContext } from '../context/TaskContext';

const ResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const { getRandomTopTask } = useTaskContext();
  const recommendedTask = getRandomTopTask();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Perfect Activity</Text>
      {recommendedTask ? (
        <View style={styles.card}>
          <Text style={styles.taskName}>{recommendedTask.name}</Text>
          <Text style={styles.matchText}>Match: {recommendedTask.score}</Text>
          <Text style={styles.subtext}>
            This activity matches your current preferences perfectly.
          </Text>
        </View>
      ) : (
        <Text style={styles.noResultText}>
          No strong match found. Try adjusting your answers or adding more activities!
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home' as never)}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: '#2d3748',
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f7fafc',
    minWidth: 260,
  },
  taskName: {
    fontSize: 22,
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  matchText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 12,
  },
  subtext: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  noResultText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default ResultScreen; 