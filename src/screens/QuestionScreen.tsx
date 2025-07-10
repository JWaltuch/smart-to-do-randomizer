import React, { useState } from 'react';
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
import { TaskScore } from '../types';

const QuestionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { questions, tasks, currentScores, updateTaskScore, resetScores } = useTaskContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion) return;

    // Store the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    // Update task scores based on the answer
    const property = currentQuestion.property;
    const response = answer;
    
    tasks.forEach(task => {
      if (task.properties[property] === response) {
        const currentScore = currentScores.find((s: TaskScore) => s.taskId === task.id)?.score || 0;
        updateTaskScore(task.id, currentScore + 1);
      }
    });

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Survey completed
      Alert.alert(
        'Journey Complete',
        'Your personalized recommendations are ready.',
        [
          {
            text: 'View Results',
            onPress: () => navigation.navigate('Result' as never),
          },
        ]
      );
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result' as never);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Start Fresh',
      'Are you sure you want to begin your journey again?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Begin Again',
          style: 'destructive',
          onPress: () => {
            resetScores();
            setCurrentQuestionIndex(0);
            setAnswers({});
          },
        },
      ]
    );
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestionsText}>
          No guides available. Please add some questions first.
        </Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestionsText}>No more questions.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Step {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          <Text style={styles.propertyText}>Focus: {currentQuestion.property}</Text>
        </View>

        <View style={styles.answerContainer}>
          <TouchableOpacity
            style={[styles.answerButton, styles.yesButton]}
            onPress={() => handleAnswer(true)}
          >
            <Text style={styles.answerButtonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.answerButton, styles.noButton]}
            onPress={() => handleAnswer(false)}
          >
            <Text style={styles.answerButtonText}>No</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Begin Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  progressText: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    flexGrow: 1,
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    padding: 28,
    borderRadius: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f7fafc',
  },
  questionText: {
    fontSize: 22,
    fontWeight: '300',
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  propertyText: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
  },
  answerContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 28,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 22,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  yesButton: {
    backgroundColor: '#48bb78',
  },
  noButton: {
    backgroundColor: '#ed8936',
  },
  answerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  actionContainer: {
    gap: 12,
  },
  skipButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  skipButtonText: {
    color: '#718096',
    fontSize: 16,
    fontWeight: '500',
  },
  resetButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#fed7d7',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#feb2b2',
  },
  resetButtonText: {
    color: '#c53030',
    fontSize: 16,
    fontWeight: '500',
  },
  noQuestionsText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    padding: 40,
    lineHeight: 24,
  },
});

export default QuestionScreen; 