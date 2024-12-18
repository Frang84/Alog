import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: "Login"
      }}/>
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)/Functions" options={{
        headerShown: false
      }}/>
    </Stack>
  );
}