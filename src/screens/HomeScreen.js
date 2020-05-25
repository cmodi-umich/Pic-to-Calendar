import * as React from "react";
import { StyleSheet, Text, Button, View } from "react-native";

const handleSignIn = () => {
  console.log("signing in");
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title='Sign In' onPress={handleSignIn} />
      <Button
        onPress={() => navigation.navigate("Camera")}
        title='Go to Camera'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
