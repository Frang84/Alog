import { Stack, Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs>

      <Tabs.Screen name="add" options={{
        headerShown: false
      }}/>
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}