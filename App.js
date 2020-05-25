import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import LinkingConfiguration from "./src/navigation/LinkingConfiguration";
import CameraScreen from "./src/screens/CameraScreen";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <View style={styles.container}>
      <NavigationContainer linking={LinkingConfiguration}>
        <Stack.Navigator>
          <Stack.Screen name='Root' component={BottomTabNavigator} />
          <Stack.Screen name='Camera' component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
