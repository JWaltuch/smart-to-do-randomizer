#!/bin/bash

# Start Android emulator first
echo "Starting Android emulator..."
emulator -avd Pixel_7_API_34

# Wait for emulator to be ready
echo "Waiting for Android emulator to boot..."
while ! adb devices | grep -q "emulator"; do
  sleep 1
  echo -n "."
done
echo " Emulator ready!"

# Start Expo with Android
echo "Starting Expo with Android..."
npx expo start --android 