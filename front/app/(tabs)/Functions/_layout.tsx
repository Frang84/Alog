import { Stack, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { customeStyle, customStyleTabBar } from '@/app/style';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: '#27b376', 
      }}
      
      >
        
      <Tabs.Screen name="add"  options={{
        headerShown: false,
        tabBarIcon: ({color}) => (
          <Ionicons name="add" size={18}   color={color}/>
        ),
        
      }}
      />
      <Tabs.Screen name="settings" options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="settings" size={18}  color={color}/>
        ),
      }}/>
      <Tabs.Screen name="index" options={{
          headerShown: false,
          headerTitle: "Stats",
          title: "Stats",
          tabBarIcon: ({color}) => (
            <Ionicons name="stats-chart" size={18}  color={color}/>
          ),
        }}/>
        <Tabs.Screen name="challange"  options={{
          headerShown: false,
          title: "Challange",
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="medal" size={24}  color={color}/>
          ),
        }}/>
        
        
      
    </Tabs>
  );
}