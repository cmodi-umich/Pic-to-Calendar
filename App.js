import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import CameraScreen from './src/screens/CameraScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

function Navigator(props) {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='root' component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App(props) {
  return (
    <Swiper
      horizontal={true}
      style={{}}
      showsButtons={false}
      loop={false}
      showsPagination={false}
    >
      <HomeScreen />
      <CameraScreen />
    </Swiper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
