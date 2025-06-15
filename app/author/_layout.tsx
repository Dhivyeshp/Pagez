import { Tabs } from 'expo-router';
import AuthorHeader from '../components/AuthorHeader'; // Adjusted path
import { View } from 'react-native';

const mockUserProfile = {
  avatar: "https://via.placeholder.com/32x32/FF6B6B/FFFFFF?text=A"
}; // This should come from a global state or context

export default function AuthorLayout() {
  return (
    <View style={{ flex: 1 }}>
      <AuthorHeader profileImage={mockUserProfile.avatar} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide the default tab bar
        }}
      >
        <Tabs.Screen name="dashboard" />
        <Tabs.Screen name="books" />
        <Tabs.Screen name="notes" />
        <Tabs.Screen name="community" />
        <Tabs.Screen name="you" />
      </Tabs>
    </View>
  );
}
