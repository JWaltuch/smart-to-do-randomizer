#!/bin/bash

# Start iPhone 16 Pro simulator first
echo "Starting iPhone 16 Pro simulator..."
xcrun simctl boot "iPhone 16 Pro"

# Wait a moment for simulator to start
sleep 2

# Start Expo with iOS
echo "Starting Expo with iOS..."
npx expo start --ios 