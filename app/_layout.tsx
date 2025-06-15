import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

export default function AppLayout() {
  React.useEffect(() => {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="reading-lists"
        options={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reader"
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}