import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function DetailsScreen() {
    return (
      <View style={styles.container}>
        <Text>Add screen</Text>
        <Link href="/">back to home</Link>
        <Link href="/explore">go to explore</Link>
        <Link href="/(test)/details">go to details</Link>
        <Link href="/(test)/info">go to info</Link>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });