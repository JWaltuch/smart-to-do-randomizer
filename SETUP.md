# Quick Setup Guide

## Prerequisites

1. **Install Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Install Expo CLI**
   ```bash
   npm install -g @expo/cli
   ```

3. **Install Expo Go app** on your phone
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run the app:**
   - **On your phone**: Scan the QR code with Expo Go
   - **iOS Simulator**: Press `i` (requires Xcode)
   - **Android Emulator**: Press `a` (requires Android Studio)

## First Time Use

1. The app will automatically load sample data on first launch
2. Navigate to "View All Tasks" to see your task list
3. Use "Start Survey" to answer questions and get recommendations
4. Add your own tasks and questions as needed

## Troubleshooting

### Common Issues

**"Cannot find module" errors**
- Run `npm install` to ensure all dependencies are installed
- Clear Metro cache: `npx expo start --clear`

**App won't load on phone**
- Make sure your phone and computer are on the same WiFi network
- Try using a tunnel connection: `npx expo start --tunnel`

**TypeScript errors**
- The app should work despite TypeScript warnings
- These are development-time checks and won't affect the running app

### Development Tips

- Use `npm start` to restart the development server
- Shake your device or press `Cmd+D` (iOS) / `Cmd+M` (Android) to open developer menu
- Enable "Fast Refresh" for instant code updates

## Next Steps

1. **Customize the app** by modifying `src/data/sampleData.ts`
2. **Add new features** by extending the existing components
3. **Deploy to app stores** using Expo's build service

## Support

If you encounter issues:
1. Check the [Expo documentation](https://docs.expo.dev/)
2. Review the [React Native documentation](https://reactnative.dev/)
3. Search for similar issues on [Stack Overflow](https://stackoverflow.com/) 