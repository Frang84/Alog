import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="createChellange" options={{
        headerShown: false,
        headerTitle: "back"
      }}/>
        <Stack.Screen name="createHangover" options={{
        headerShown: false,
        headerTitle: "back"
      }}/>
    </Stack>
  );
}