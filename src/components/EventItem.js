import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { calendarColors } from '../constants/calendarColors';

const makeDate = (dateTime) => {
  let date = new Date(Date.parse(dateTime));
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
};

export default function EventItem({ item }) {
  const { status, summary, colorId, start, end } = item;
  const startDate = makeDate(start.dateTime);
  const endDate = makeDate(end.dateTime);

  return (
    <View
      style={{
        alignSelf: 'center',
        padding: 5,
        margin: 5,
        width: '90%',
        borderRadius: 15,
        backgroundColor: colorId ? calendarColors[colorId] : '#111d5e',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }}
    >
      <Text
        style={{
          alignSelf: 'flex-start',
          color: 'white',
          fontSize: 18,
          paddingLeft: 5,
          fontWeight: 'bold',
        }}
      >
        {summary}
      </Text>
      <Text
        style={{
          alignSelf: 'flex-start',
          color: 'white',
          paddingLeft: 5,
          marginVertical: 3,
        }}
      >
        Start Time: {startDate}
      </Text>
      <Text
        style={{
          alignSelf: 'flex-start',
          color: 'white',
          paddingLeft: 5,
          marginVertical: 3,
        }}
      >
        End Time: {endDate}
      </Text>
    </View>
  );
}
