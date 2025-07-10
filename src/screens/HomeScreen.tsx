import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTaskContext } from '../context/TaskContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { tasks, questions, resetScores, getTopTasks } = useTaskContext();

  const handleStartSurvey = () => {
    if (questions.length === 0) {
      Alert.alert(
        'No Questions Available',
        'Please add some questions first before starting the survey.',
        [{ text: 'OK' }]
      );
      return;
    }
    navigation.navigate('Questions' as never);
  };

  const handleViewTasks = () => {
    navigation.navigate('Tasks' as never);
  };

  const topTasks = getTopTasks(3);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart To-Do Randomizer</Text>
        <Text style={styles.subtitle}>
          Answer questions to get personalized task recommendations
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{questions.length}</Text>
          <Text style={styles.statLabel}>Questions</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleStartSurvey}
        >
          <Text style={styles.buttonText}>Start Survey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleViewTasks}
        >
          <Text style={styles.buttonText}>View All Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetScores}
        >
          <Text style={styles.buttonText}>Reset Scores</Text>
        </TouchableOpacity>
      </View>

      {topTasks.length > 0 && (
        <View style={styles.topTasksContainer}>
          <Text style={styles.sectionTitle}>Top Recommended Tasks</Text>
          {topTasks.map((task, index) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskName}>{task.name}</Text>
              <Text style={styles.taskScore}>Score: {task.score}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  actionContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
  },
  secondaryButton: {
    backgroundColor: '#10b981',
  },
  resetButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  topTasksContainer: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  taskScore: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
});

export default HomeScreen; 