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
        <Text style={styles.title}>Mindful Tasks</Text>
        <Text style={styles.subtitle}>
          Find your perfect activity with gentle guidance
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Activities</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{questions.length}</Text>
          <Text style={styles.statLabel}>Guides</Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleStartSurvey}
        >
          <Text style={styles.buttonText}>Begin Journey</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleViewTasks}
        >
          <Text style={styles.buttonText}>View Activities</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetScores}
        >
          <Text style={styles.buttonText}>Start Fresh</Text>
        </TouchableOpacity>
      </View>

      {topTasks.length > 0 && (
        <View style={styles.topTasksContainer}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          {topTasks.map((task, index) => (
            <View key={task.id} style={styles.taskItem}>
              <Text style={styles.taskName}>{task.name}</Text>
              <Text style={styles.taskScore}>Match: {task.score}</Text>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#2d3748',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#f7fafc',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '200',
    color: '#667eea',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 14,
    color: '#a0aec0',
    marginTop: 4,
    fontWeight: '500',
  },
  actionContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButton: {
    backgroundColor: '#667eea',
  },
  secondaryButton: {
    backgroundColor: '#48bb78',
  },
  resetButton: {
    backgroundColor: '#ed8936',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  topTasksContainer: {
    padding: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#2d3748',
    marginBottom: 16,
    textAlign: 'center',
  },
  taskItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f7fafc',
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: 4,
  },
  taskScore: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
});

export default HomeScreen; 