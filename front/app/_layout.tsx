import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false
      }}/>
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)/Functions" options={{
        headerShown: false
      }}/>
    </Stack>
  );
}