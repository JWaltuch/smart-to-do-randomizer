# Changelog

## [1.2.0] - 2024-12-19

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
- "Top Recommended Tasks" → "Your Perfect Activity"
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
- **Single Recommendation**: Shows one random top-scoring activity instead of a list
- **Confident Presentation**: "Your Perfect Activity" with supportive messaging
- **Match Indicator**: Subtle score display to show confidence level
- **Softer Header**: Rounded bottom corners and improved styling

#### **TaskListScreen**
- **Hidden Results Feature**: Subtle toggle to show/hide full results list
- **Enhanced Modal**: Property toggles for adding activities
- **Better Visual Hierarchy**: Improved typography and spacing
- **Non-Intrusive Design**: Full results don't interfere with main flow

#### **QuestionScreen**
- **Larger Question Containers**: Better padding and improved readability
- **Softer Progress Bar**: More elegant styling
- **Updated Copy**: "Step X of Y" instead of "Question X of Y"
- **More Elegant Buttons**: Better spacing and styling

#### **Navigation**
- **Updated Header Colors**: Match new soothing theme
- **Mindful Screen Titles**: More gentle and supportive language
- **Consistent Styling**: Unified design across all navigation elements

### 🔧 **Technical Improvements**
- **TypeScript**: Enhanced type safety for property management and random selection
- **State Management**: Improved property toggle functionality and random task selection
- **Performance**: Optimized re-renders for property changes and random selection
- **Accessibility**: Better contrast ratios and touch targets

### 🎯 **Mental Health Focus**
- **Anti-Analysis Paralysis**: Single recommendation prevents decision fatigue
- **Gentle Language**: All copy updated to be more supportive and less task-oriented
- **Calming Colors**: Color palette designed to reduce stress and anxiety
- **Mindful Interactions**: User experience focused on gentle guidance rather than rigid task management
- **Positive Framing**: "Journey" instead of "survey", "activities" instead of "tasks"

---

## [1.1.0] - 2024-12-19

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

### 🎯 **Mental Health Focus**
- **Gentle Language**: All copy updated to be more supportive and less task-oriented
- **Calming Colors**: Color palette designed to reduce stress and anxiety
- **Mindful Interactions**: User experience focused on gentle guidance rather than rigid task management
- **Positive Framing**: "Journey" instead of "survey", "activities" instead of "tasks"

---

## [1.0.0] - 2024-12-19

### 🚀 **Initial Release**
- Smart to-do randomizer with question-based scoring
- React Native app with Expo SDK 53
- Local data persistence with AsyncStorage
- Security vulnerabilities resolved
- TypeScript support with React 19 compatibility 