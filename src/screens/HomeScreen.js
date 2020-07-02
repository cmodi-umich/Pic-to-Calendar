import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, FlatList } from 'react-native';
import { getEvents } from '../backend_calls/events';
import { signInWithGoogleAsync } from '../backend_calls/user';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState();
  const [accessToken, setAccessToken] = useState({});
  const [events, setEvents] = useState([]);

  const handleSignIn = () => {
    signInWithGoogleAsync().then(({ user, accessToken }) => {
      setUser(user);
      setAccessToken(accessToken);
      getEvents(accessToken, user.email).then((eventsRes) => {
        const events = eventsRes.map((event) => {
          const { id, status, summary, colorId, start, end } = event;
          return { id, status, summary, colorId, start, end };
        });
        setEvents(events);
      });
    });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={{ alignSelf: 'center' }}>Welcome, {user.name}</Text>
          <Button
            title='Print User Info'
            onPress={() => {
              console.log(user);
            }}
          />
        </>
      ) : (
        <Button title='Sign In' onPress={handleSignIn} />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {events.length > 0 ? (
          <>
            <Text
              style={{
                alignSelf: 'center',
              }}
            >
              Upcoming Events:
            </Text>
            <FlatList
              data={events}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      alignSelf: 'center',
                      padding: 5,
                      margin: 5,
                      border: 'solid',
                      borderWidth: 2,
                      width: '90%',
                      borderRadius: 15,
                    }}
                    key={item.id}
                  >
                    <Text style={{ alignSelf: 'center' }}>{item.summary}</Text>
                    <Text style={{ alignSelf: 'center' }}>{item.colorId}</Text>
                    <Text style={{ alignSelf: 'center' }}>{item.status}</Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <Text>No Events!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
