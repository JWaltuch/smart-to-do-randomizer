# smart-to-do-randomizer

This is another small project I was thinking about to help me choose what to do with free time when I have analysis paralysis.

Goals:
- Test coding with Cursor
- Working app I can use
- The app should provides a survey of questions. Each question adds or subtracts from a task's score based on its boolean properties (ex: fun, high-energy). The app will generate a random task based on the ones with the highest score
- I would love to make this app available on mobile.

Future Possibilities:
- Login, database with customizable tasks

# smart-to-do-randomizer%

A React Native mobile app that uses a question-based survey to intelligently recommend tasks based on your preferences and current mood.

## Concept

Based on your data modeling brainstorm, this app implements:

- **Questions**: Each question has text and targets a specific property
- **Tasks**: Each task has a name and multiple boolean properties (defaulting to false)
- **Smart Scoring**: When you answer questions, tasks with matching properties get their scores incremented
- **Local Storage**: Results are stored locally per survey instance, not long-term
- **No Analysis**: The goal is randomization, not historical analysis

## Features

- ✅ Answer yes/no questions to determine task priorities
- ✅ Add and manage custom tasks with properties
- ✅ View task recommendations based on survey responses
- ✅ Modern, intuitive mobile UI
- ✅ Local data persistence
- ✅ Reset functionality to start fresh

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS) or Android Studio (for Android)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd smart-to-do-randomizer
   npm install
   ```

2. **Choose your development approach:**

   **Option A - Standard Expo workflow:**
   ```bash
   npm start
   ```
   Then choose your platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator  
   - Scan QR code with Expo Go app on your phone

   **Option B - iOS Simulator (Recommended):**
   ```bash
   npm run ios-sim
   ```
   This automatically boots the iPhone 16 Pro simulator and starts Expo.

### First Time Setup

1. **Add Sample Data** (Optional):
   - The app comes with sample tasks and questions
   - You can modify `src/data/sampleData.ts` to customize the initial data

2. **Start Using the App:**
   - Navigate to "View All Tasks" to see your task list
   - Add new tasks with custom properties
   - Use "Start Survey" to answer questions and get recommendations

## How It Works

### Data Model

```typescript
interface Question {
  id: string;
  text: string;
  property: string; // The property this question targets
}

interface Task {
  id: string;
  name: string;
  properties: Record<string, boolean>; // Multiple boolean properties
  score: number;
}
```

### Scoring Algorithm

When you answer a question:
1. The app identifies the property being asked about
2. It finds all tasks where that property matches your answer
3. It increments the score for those matching tasks
4. Tasks are then sorted by score to show recommendations

### Example Flow

1. **Question**: "Do you want to work indoors today?" (property: "indoor")
2. **Answer**: "Yes"
3. **Result**: All tasks with `properties.indoor = true` get +1 score
4. **Recommendation**: Tasks with higher scores appear first

## Project Structure

```
smart-to-do-randomizer/
├── src/
│   ├── context/
│   │   └── TaskContext.tsx      # State management
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Main dashboard
│   │   ├── QuestionScreen.tsx   # Survey interface
│   │   └── TaskListScreen.tsx   # Task management
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   └── data/
│       └── sampleData.ts        # Sample data
├── App.tsx                      # Main app component
├── package.json                 # Dependencies
└── README.md                   # This file
```

## Customization

### Adding New Properties

1. Update your tasks to include new boolean properties
2. Add corresponding questions that target those properties
3. The scoring system will automatically work with new properties

### Styling

The app uses a modern design system with:
- Primary color: `#6366f1` (Indigo)
- Success color: `#10b981` (Green)
- Error color: `#ef4444` (Red)
- Background: `#f8fafc` (Light gray)

### Data Persistence

All data is stored locally using AsyncStorage:
- Tasks and questions persist between app sessions
- Survey scores are reset when you start a new survey
- No data is sent to external servers

## Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS (may have simulator issues)
- `npm run ios-sim` - Boot iPhone 16 Pro simulator and start Expo (recommended for iOS)
- `npm run web` - Run in web browser

### Key Technologies

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type safety and better development experience
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data persistence

## Troubleshooting

### iOS Simulator Runtime Errors
- Use `npm run ios-sim` instead of `npm run ios` to avoid runtime bundle errors
- This script automatically boots the correct iPhone 16 Pro simulator

### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Clear Metro cache: `npx expo start --clear`

### App won't load on phone
- Make sure your phone and computer are on the same WiFi network
- Try using a tunnel connection: `npx expo start --tunnel`

### TypeScript errors
- The app should work despite TypeScript warnings
- These are development-time checks and won't affect the running app

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
