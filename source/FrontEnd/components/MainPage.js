import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function MainPage() {
  return (
    <View style={styles.container}>
      <Text>This is MainPage</Text>
      <StatusBar style="auto" />
    </View>
  );
}
