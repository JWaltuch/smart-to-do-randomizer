import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  Switch,
} from 'react-native';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types';

const TaskListScreen: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, currentScores, getTopTasks, addProperty, answeredQuestions, questions } = useTaskContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFullResults, setShowFullResults] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyQuestion, setNewPropertyQuestion] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskProperties, setEditTaskProperties] = useState<Record<string, boolean>>({});
  const [newTaskProperties, setNewTaskProperties] = useState<Record<string, boolean>>({
    indoor: false,
    physical: false,
    quick: false,
    creative: false,
    social: false,
    learning: false,
  });

  const handleAddTask = () => {
    if (!newTaskName.trim()) {
      Alert.alert('Error', 'Please enter an activity name');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: newTaskName.trim(),
      properties: newTaskProperties,
      score: 0,
    };

    addTask(newTask);
    setNewTaskName('');
    setNewTaskProperties({
      indoor: false,
      physical: false,
      quick: false,
      creative: false,
      social: false,
      learning: false,
    });
    setShowAddModal(false);
  };

  const handleAddProperty = () => {
    if (!newPropertyName.trim()) {
      Alert.alert('Error', 'Please enter a property name');
      return;
    }

    if (!newPropertyQuestion.trim()) {
      Alert.alert('Error', 'Please enter a question for this property');
      return;
    }

    addProperty(newPropertyName.trim().toLowerCase(), newPropertyQuestion.trim());
    setNewPropertyName('');
    setNewPropertyQuestion('');
    setShowAddPropertyModal(false);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setEditTaskName(task.name);
    setEditTaskProperties({ ...task.properties });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingTask || !editTaskName.trim()) {
      Alert.alert('Error', 'Please enter an activity name');
      return;
    }

    updateTask(editingTask.id, {
      name: editTaskName.trim(),
      properties: editTaskProperties,
    });

    setShowEditModal(false);
    setEditingTask(null);
    setEditTaskName('');
    setEditTaskProperties({});
  };

  const toggleEditProperty = (property: string) => {
    setEditTaskProperties(prev => ({
      ...prev,
      [property]: !prev[property],
    }));
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert(
      'Remove Activity',
      'Are you sure you want to remove this activity?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => deleteTask(taskId),
        },
      ]
    );
  };

  const getTaskScore = (taskId: string) => {
    return currentScores.find(s => s.taskId === taskId)?.score || 0;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const scoreA = getTaskScore(a.id);
    const scoreB = getTaskScore(b.id);
    return scoreB - scoreA;
  });

  const toggleProperty = (property: string) => {
    setNewTaskProperties(prev => ({
      ...prev,
      [property]: !prev[property],
    }));
  };

  // Determine journey state
  const hasAnsweredQuestions = Object.keys(answeredQuestions).length > 0;
  const hasCompletedJourney = hasAnsweredQuestions && Object.keys(answeredQuestions).length >= questions.length;
  
  const topTasks = getTopTasks(5); // Get top 5 for the hidden feature

  return (
    <View style={styles.container}>
      <ScrollView style={styles.taskList}>
        {sortedTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No activities yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Add some activities to get started with your mindful journey
            </Text>
          </View>
        ) : (
          sortedTasks.map(task => {
            const score = getTaskScore(task.id);

            return (
              <View key={task.id} style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <Text style={styles.taskName}>{task.name}</Text>
                  <View style={styles.taskActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditTask(task)}
                    >
                      <Text style={styles.editButtonText}>✎</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteTask(task.id)}
                    >
                      <Text style={styles.deleteButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {score > 0 && (
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>Match: {score}</Text>
                  </View>
                )}

                <View style={styles.propertiesContainer}>
                  <Text style={styles.propertiesLabel}>Traits:</Text>
                  <View style={styles.propertyTags}>
                    {Object.entries(task.properties).map(([property, value]) => (
                      <View 
                        key={property} 
                        style={[
                          styles.propertyTag,
                          value ? styles.propertyTagTrue : styles.propertyTagFalse
                        ]}
                      >
                        <Text style={[
                          styles.propertyTagText,
                          value ? styles.propertyTagTextTrue : styles.propertyTagTextFalse
                        ]}>
                          {property}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Hidden feature - subtle way to see top results */}
        {hasCompletedJourney && topTasks.length > 0 && (
          <TouchableOpacity
            style={styles.hiddenFeature}
            onPress={() => setShowFullResults(!showFullResults)}
          >
            <Text style={styles.hiddenFeatureText}>
              {showFullResults ? 'Hide' : 'Show'} top matches ({topTasks.length})
            </Text>
          </TouchableOpacity>
        )}

        {showFullResults && topTasks.length > 0 && (
          <View style={styles.fullResultsContainer}>
            <Text style={styles.fullResultsTitle}>Top Matches</Text>
            {topTasks.map((task, index) => (
              <View key={task.id} style={styles.topTaskCard}>
                <Text style={styles.topTaskRank}>#{index + 1}</Text>
                <Text style={styles.topTaskName}>{task.name}</Text>
                <Text style={styles.topTaskScore}>Match: {task.score}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ Add Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addPropertyButton}
          onPress={() => setShowAddPropertyModal(true)}
        >
          <Text style={styles.addPropertyButtonText}>+ Add Property</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Activity</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Activity name"
              value={newTaskName}
              onChangeText={setNewTaskName}
              autoFocus
            />

            <Text style={styles.propertiesTitle}>Activity Traits</Text>
            <View style={styles.propertiesList}>
              {Object.entries(newTaskProperties).map(([property, value]) => (
                <View key={property} style={styles.propertyRow}>
                  <Text style={styles.propertyLabel}>{property}</Text>
                  <Switch
                    value={value}
                    onValueChange={() => toggleProperty(property)}
                    trackColor={{ false: '#e2e8f0', true: '#667eea' }}
                    thumbColor={value ? '#ffffff' : '#f4f3f4'}
                  />
                </View>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddTask}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAddPropertyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddPropertyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Property</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Property name (e.g., outdoor, quiet)"
              value={newPropertyName}
              onChangeText={setNewPropertyName}
              autoFocus
            />

            <TextInput
              style={styles.input}
              placeholder="Question for this property (e.g., Do you want to work outdoors?)"
              value={newPropertyQuestion}
              onChangeText={setNewPropertyQuestion}
              multiline
              numberOfLines={3}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddPropertyModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddProperty}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Activity</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Activity name"
              value={editTaskName}
              onChangeText={setEditTaskName}
              autoFocus
            />

            <Text style={styles.propertiesTitle}>Activity Traits</Text>
            <View style={styles.propertiesList}>
              {Object.entries(editTaskProperties).map(([property, value]) => (
                <View key={property} style={styles.propertyRow}>
                  <Text style={styles.propertyLabel}>{property}</Text>
                  <Switch
                    value={value}
                    onValueChange={() => toggleEditProperty(property)}
                    trackColor={{ false: '#e2e8f0', true: '#667eea' }}
                    thumbColor={value ? '#ffffff' : '#f4f3f4'}
                  />
                </View>
              ))}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  taskList: {
    flex: 1,
    padding: 20,
    paddingBottom: 0, // Remove bottom padding since we have bottom buttons
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#718096',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    lineHeight: 20,
  },
  taskCard: {
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
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3748',
    flex: 1,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e6fffa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#81e6d9',
  },
  editButtonText: {
    color: '#319795',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fed7d7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#feb2b2',
  },
  deleteButtonText: {
    color: '#c53030',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  propertiesContainer: {
    marginTop: 8,
  },
  propertiesLabel: {
    fontSize: 12,
    color: '#a0aec0',
    marginBottom: 4,
    fontWeight: '500',
  },
  propertyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  propertyTag: {
    backgroundColor: '#f7fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  propertyTagTrue: {
    backgroundColor: '#f0fff4',
    borderColor: '#48bb78',
  },
  propertyTagFalse: {
    backgroundColor: '#fef5e7',
    borderColor: '#ed8936',
  },
  propertyTagText: {
    fontSize: 12,
    color: '#4a5568',
    fontWeight: '500',
  },
  propertyTagTextTrue: {
    color: '#22543d',
  },
  propertyTagTextFalse: {
    color: '#9c4221',
  },
  hiddenFeature: {
    padding: 12,
    marginTop: 16,
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  hiddenFeatureText: {
    fontSize: 12,
    color: '#a0aec0',
    fontWeight: '500',
  },
  fullResultsContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f7fafc',
  },
  fullResultsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  topTaskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc',
  },
  topTaskRank: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
    marginRight: 12,
    minWidth: 20,
  },
  topTaskName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2d3748',
    flex: 1,
  },
  topTaskScore: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'column',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  addButton: {
    backgroundColor: '#667eea',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  addPropertyButton: {
    backgroundColor: '#48bb78',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addPropertyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#2d3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f7fafc',
  },
  propertiesTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: 12,
  },
  propertiesList: {
    marginBottom: 20,
  },
  propertyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f7fafc',
  },
  propertyLabel: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cancelButtonText: {
    color: '#718096',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#667eea',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default TaskListScreen; 