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

const QuestionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { questions, tasks, updateTaskScore, resetScores } = useTaskContext();
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
        const currentScore = task.score || 0;
        updateTaskScore(task.id, currentScore + 1);
      }
    });

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Survey completed
      Alert.alert(
        'Survey Complete!',
        'Your task recommendations are ready.',
        [
          {
            text: 'View Results',
            onPress: () => navigation.navigate('Tasks' as never),
          },
        ]
      );
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Tasks' as never);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Survey',
      'Are you sure you want to start over?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
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
          No questions available. Please add some questions first.
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
          Question {currentQuestionIndex + 1} of {questions.length}
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
          <Text style={styles.propertyText}>Property: {currentQuestion.property}</Text>
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
            <Text style={styles.resetButtonText}>Reset Survey</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e2e8f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
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
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    lineHeight: 28,
  },
  propertyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
  },
  answerContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  yesButton: {
    backgroundColor: '#10b981',
  },
  noButton: {
    backgroundColor: '#ef4444',
  },
  answerButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  actionContainer: {
    gap: 12,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '500',
  },
  noQuestionsText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    padding: 40,
  },
});

export default QuestionScreen; 