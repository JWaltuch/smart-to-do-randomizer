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
  const { tasks, questions, currentScores, answeredQuestions, resetScores, getRandomTopTask } = useTaskContext();

  // Determine journey state
  const hasAnsweredQuestions = Object.keys(answeredQuestions).length > 0;
  const hasCompletedJourney = hasAnsweredQuestions && Object.keys(answeredQuestions).length >= questions.length;

  const getJourneyButtonText = () => {
    if (!hasAnsweredQuestions) return 'Begin Journey';
    if (hasCompletedJourney) return 'Start Fresh';
    return 'Continue Journey';
  };

  const getJourneyButtonStyle = () => {
    if (!hasAnsweredQuestions) return styles.primaryButton;
    if (hasCompletedJourney) return styles.resetButton;
    return styles.secondaryButton;
  };

  const handleJourneyButton = () => {
    if (questions.length === 0) {
      Alert.alert(
        'No Questions Available',
        'Please add some questions first before starting the survey.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (hasCompletedJourney) {
      resetScores();
    }
    
    navigation.navigate('Questions' as never);
  };

  const handleViewTasks = () => {
    navigation.navigate('Tasks' as never);
  };

  const recommendedTask = getRandomTopTask();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Task Randomizer</Text>
        <Text style={styles.subtitle}>
          Find your perfect activity with gentle guidance
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.button, getJourneyButtonStyle()]}
          onPress={handleJourneyButton}
        >
          <Text style={styles.buttonText}>{getJourneyButtonText()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleViewTasks}
        >
          <Text style={styles.buttonText}>View Activities</Text>
        </TouchableOpacity>
      </View>

      {recommendedTask && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>Your Perfect Activity</Text>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationText}>{recommendedTask.name}</Text>
            <Text style={styles.recommendationSubtext}>
              This activity matches your current preferences perfectly
            </Text>
            <View style={styles.matchIndicator}>
              <Text style={styles.matchText}>Match: {recommendedTask.score}</Text>
            </View>
          </View>
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
  recommendationContainer: {
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
  recommendationCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f7fafc',
    alignItems: 'center',
  },
  recommendationText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  recommendationSubtext: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  matchIndicator: {
    backgroundColor: '#f7fafc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  matchText: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '600',
  },
});

export default HomeScreen; 