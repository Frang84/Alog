import { Stack, Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs>

      <Tabs.Screen name="add" options={{
        headerShown: false
      }}/>
      <Tabs.Screen name="settings" />
      <Tabs.Screen name="index" options={{
          headerShown: false,
          headerTitle: "Stats",
          title: "Stats"
        }}/>
        <Tabs.Screen name="challange" options={{
          headerShown: false,
          title: "Challange"
        }}/>
        
        
      
    </Tabs>
  );
}