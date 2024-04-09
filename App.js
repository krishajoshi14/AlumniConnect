import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './app/(authenticate)/Login'
import Register from './app/(authenticate)/Register';
import Homepage from './app/(authenticate)/Homepage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Hide the header for Login screen
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }} // Hide the header for Register screen
        />
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ headerShown: false }} // Hide the header for Home screen if needed
        />
      </Stack.Navigator>
    </NavigationContainer>

  //   <View style={styles.container}>
  //   <Homepage/>
  // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});