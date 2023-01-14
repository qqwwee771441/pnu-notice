import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MainPage from './components/MainPage';

export default function App() {
  return (
    <View style={styles.container}>
      <MainPage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
