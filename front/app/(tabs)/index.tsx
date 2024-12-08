import { Image, StyleSheet, Platform, Button, View,  } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function HomeScreen() {
  let getData2 = () => {
    fetch('http://10.0.2.2:8000/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Button title="Kliknij mnie!!!" onPress={getData2} color="#841584" />
      </View>
      
    </SafeAreaProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});