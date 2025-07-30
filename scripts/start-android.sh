#!/bin/bash

# Start Android emulator first
echo "Starting Android emulator..."
emulator -avd Pixel_7_API_34

# Wait a moment for emulator to start
sleep 5

# Start Expo with Android
echo "Starting Expo with Android..."
npx expo start --android 