#!/bin/bash

# Start iPhone 16 Pro simulator first
echo "Starting iPhone 16 Pro simulator..."
xcrun simctl boot "iPhone 16 Pro"

# Wait for simulator to be ready
echo "Waiting for iOS simulator to boot..."
while ! xcrun simctl list devices | grep "iPhone 16 Pro" | grep -q "Booted"; do
  sleep 1
  echo -n "."
done
echo " Simulator ready!"

# Start Expo with iOS
echo "Starting Expo with iOS..."
npx expo start --ios 