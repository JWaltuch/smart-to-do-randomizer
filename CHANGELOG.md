# Changelog

## [1.0.0] - 2025-07-10

### 🎉 **Initial Release - Task Randomizer**

#### **Core Features**
- **Complete React Native mobile app** with Expo framework
- **Question-based task recommendation system** that intelligently matches activities to user preferences
- **Local data persistence** with AsyncStorage for tasks, questions, and journey state
- **Modern UI** with soothing mental health app theme and gentle user experience

#### **Smart Journey System**
- **Adaptive Journey Button**: Single button that intelligently changes based on journey state
  - "Begin Journey" (blue) - when no questions answered
  - "Continue Journey" (green) - when some questions answered but not all
  - "Start Fresh" (orange) - when all questions completed (clears scores)
- **Journey State Tracking**: Persistent tracking of answered questions to properly determine journey completion
- **Complete Journey Flow**: Users must answer all questions before seeing recommendations
- **No Skip Option**: Removed skip button to ensure users complete the full journey experience

#### **Result & Recommendation System**
- **ResultScreen**: Dedicated screen showing single random top task recommendation after survey completion
- **Single Recommendation**: Home screen shows only ONE random recommendation instead of a list to prevent analysis paralysis
- **Back to Home Navigation**: Easy navigation back to main screen from results
- **Graceful Handling**: Helpful message when no strong match is found
- **Hidden Full Results**: Complete results list available as subtle feature in Activities screen

#### **Property Management System**
- **Add New Properties**: Create custom properties with automatic question creation
- **Property Modal**: Form to create new properties with associated questions
- **Activity Editing**: Edit existing activities to update their properties and names
- **Edit Modal**: Form to edit activity names and toggle properties
- **Property Tag Color Coding**: All activity properties display with color coding - green for true, gentle orange for false
- **Complete Property Visibility**: All properties shown (not just true ones) for better transparency
- **Automatic Updates**: New properties automatically added to all existing tasks (defaulting to false)

#### **UI/UX Enhancements**
- **Soothing Mental Health Theme**: Gentle color palette and supportive language
- **Property UI**: Stacked vertical buttons for better mobile layout (Add Activity + Add Property)
- **Question Screen**: Clean question display without technical property information
- **Hidden Feature Logic**: Top matches only show when journey is completed
- **Activity Management**: Edit (✎) and delete (×) buttons for each activity
- **Color-Coded Properties**: Visual property tags with green for true, gentle orange for false

#### **Technical Improvements**
- **Scoring Algorithm**: Fixed score accumulation across multiple questions
- **Context Integration**: Proper state management with persistent journey tracking
- **TypeScript**: Enhanced type safety throughout the application
- **iOS Simulator Support**: Custom script for reliable iOS development
- **App Configuration**: Clean app.json without missing asset references

#### **Navigation & Flow**
- **Smart Navigation**: Results screen instead of task list after survey completion
- **Conditional Display**: Recommendations only show when journey is fully completed
- **Clean Home Screen**: Removed statistics for focused interface
- **App Name**: "Task Randomizer" for clarity about app purpose

---

## [1.1.0] - 2025-07-10

### 🎨 **Theme Overhaul - Soothing Mental Health App Design**

#### **Color Palette Updates**
- **Primary Color**: Changed from harsh indigo (`#6366f1`) to soft indigo (`#667eea`)
- **Secondary Color**: Updated from bright green (`#10b981`) to gentle green (`#48bb78`)
- **Accent Color**: Changed from red (`#ef4444`) to warm orange (`#ed8936`)
- **Background**: Updated to softer light gray (`#f8f9fa`)
- **Text Colors**: Switched to softer charcoal (`#2d3748`) for better readability

#### **Typography Improvements**
- **Font Weights**: Reduced from bold (600/700) to light (300) for a gentler feel
- **Letter Spacing**: Added negative letter spacing for more elegant text
- **Line Heights**: Increased for better readability and breathing room

#### **UI/UX Enhancements**
- **Rounded Corners**: Increased border radius from 8-12px to 16-20px
- **Shadows**: Softer, more diffused shadows with lower opacity
- **Spacing**: More generous padding and margins throughout
- **Borders**: Added subtle borders to cards for better definition

#### **Copy Updates**
- "Smart To-Do Randomizer" → "Mindful Tasks"
- "Start Survey" → "Begin Journey"
- "View All Tasks" → "View Activities"
- "Reset Scores" → "Start Fresh"
- "Top Recommended Tasks" → "Recommended for You"
- "Score" → "Match"
- "Properties" → "Traits"
- "Add Task" → "Add Activity"

### ✅ **Functionality Fixes**

#### **Task Properties Management**
- **Fixed**: Task properties are now fully editable when creating new activities
- **Added**: Toggle switches for each property (indoor, physical, quick, creative, social, learning)
- **Improved**: Visual feedback showing properties as tags on each task
- **Enhanced**: Modal interface for adding activities with property selection

#### **Property System**
- **Pre-defined Properties**: indoor, physical, quick, creative, social, learning
- **Toggle Interface**: Easy on/off switches for each property
- **Visual Tags**: Properties display as colored tags on task cards
- **Reset Functionality**: Properties reset to false when adding new activities

### 📱 **Screen-Specific Updates**

#### **HomeScreen**
- Softer header with rounded bottom corners
- Larger, more elegant stat cards
- Improved button styling with better shadows
- More generous spacing between elements

#### **QuestionScreen**
- Larger question containers with better padding
- Softer progress bar styling
- Updated copy: "Step X of Y" instead of "Question X of Y"
- More elegant answer buttons with better spacing

#### **TaskListScreen**
- Enhanced modal for adding activities with property toggles
- Better visual hierarchy with improved typography
- Softer delete button styling
- More descriptive empty state messaging

#### **Navigation**
- Updated header colors to match new theme
- Changed screen titles to be more mindful and gentle
- Consistent styling across all navigation elements

### 🔧 **Technical Improvements**
- **TypeScript**: Enhanced type safety for property management
- **State Management**: Improved property toggle functionality
- **Performance**: Optimized re-renders for property changes
- **Accessibility**: Better contrast ratios and touch targets

---

## [1.2.0] - 2025-07-10

### 🎯 **Anti-Analysis Paralysis Feature**

#### **Single Recommendation Display**
- **Primary Change**: Home screen now shows only ONE random recommendation instead of a list
- **Random Selection**: App randomly chooses from tasks with the highest score to prevent decision fatigue
- **Hidden Full Results**: Complete results list is now a subtle, non-obvious feature in the Activities screen
- **Purpose**: Eliminates analysis paralysis by presenting a single, confident recommendation

#### **Smart Randomization Logic**
- **Highest Score Filter**: Only considers tasks with scores >= the highest score
- **Random Selection**: Picks randomly from top-scoring tasks to avoid bias
- **Fallback**: Returns null if no tasks have scores > 0

#### **Hidden Feature Implementation**
- **Subtle Access**: "Show top matches" button appears only when there are scored tasks
- **Toggle Functionality**: Users can expand/collapse the full results list
- **Non-Intrusive**: Hidden feature doesn't interfere with the main single-recommendation flow

### 📱 **Screen-Specific Updates**

#### **HomeScreen**
- **Single Recommendation**: Shows one random top-scoring activity instead of a list
- **Confident Presentation**: "Your Perfect Activity" with supportive messaging
- **Match Indicator**: Subtle score display to show confidence level

#### **TaskListScreen**
- **Hidden Results Feature**: Subtle toggle to show/hide full results list
- **Non-Intrusive Design**: Full results don't interfere with main flow

### 🔧 **Technical Improvements**
- **TypeScript**: Enhanced type safety for random selection
- **State Management**: Improved random task selection
- **Performance**: Optimized re-renders for random selection

### 🎯 **Mental Health Focus**
- **Anti-Analysis Paralysis**: Single recommendation prevents decision fatigue
- **Gentle Language**: All copy updated to be more supportive and less task-oriented
- **Calming Colors**: Color palette designed to reduce stress and anxiety
- **Mindful Interactions**: User experience focused on gentle guidance rather than rigid task management
- **Positive Framing**: "Journey" instead of "survey", "activities" instead of "tasks"

---

## [1.2.1] - 2025-07-10

### 🔧 **iOS Simulator Configuration Fix**

#### **Runtime Bundle Error Resolution**
- **Fixed**: iOS simulator runtime bundle errors by specifying correct device
- **Added**: Custom `start-ios.sh` script to boot iPhone 16 Pro simulator
- **Enhanced**: `npm run ios-sim` command for reliable iOS development
- **Improved**: Expo settings configuration for better development experience

#### **Development Tools**
- **Script**: `scripts/start-ios.sh` - Automatically boots correct simulator
- **NPM Script**: `npm run ios-sim` - Easy iOS simulator startup
- **Configuration**: `.expo/settings.json` - Proper Expo development settings 