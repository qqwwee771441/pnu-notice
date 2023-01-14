import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import AlertScreen from './components/AlertScreen';

const Stack = createNativeStackNavigator();

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Alert"
          component={AlertScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
