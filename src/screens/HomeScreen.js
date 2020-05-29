import React, { useState } from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import * as Google from "expo-google-app-auth";

async function signInWithGoogleAsync() {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "469044449243-99o0ititqfn517eh4glvrqkp37jiq5au.apps.googleusercontent.com",
      iosClientId:
        "469044449243-fdhtjgejhjrsfhcu80gfhiacod2ecmt9.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      return result;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export default function HomeScreen({ navigation }) {
  [accessToken, setAccessToken] = useState();

  async function getSomething() {
    return await fetch(
      "https://www.googleapis.com/calendar/v3/users/me/calendarList",
      {
        headers: { Authorization: `Bearer ${accessToken.accessToken}` },
      }
    );
  }

  const handleSignIn = () => {
    signInWithGoogleAsync().then((token) => {
      setAccessToken(token);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the GCAL App!</Text>
      <Button title='Sign In' onPress={handleSignIn} />
      <Button title='print' onPress={() => console.log(accessToken)} />
      <Button
        title='get list'
        onPress={async () => {
          getSomething().then((res) => console.log(res.json()));
        }}
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
