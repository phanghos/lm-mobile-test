import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Hotel } from 'types';

type CheckHoursProps = Pick<Hotel, 'checkIn' | 'checkOut'>;

const CheckHours = ({ checkIn, checkOut }: CheckHoursProps) => (
  <View style={styles.container}>
    <Text style={styles.checkInContainer}>
      <Text style={styles.checkHoursTitle}>Check-in:</Text>
      <Text
        style={styles.hours}>{` from ${checkIn.from} to ${checkIn.to}`}</Text>
    </Text>

    <Text>
      <Text style={styles.checkHoursTitle}>Check-out:</Text>
      <Text
        style={styles.hours}>{` from ${checkOut.from} to ${checkOut.to}`}</Text>
    </Text>
  </View>
);

export default CheckHours;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fceef2', borderRadius: 8 },
  checkInContainer: { marginBottom: 4 },
  checkHoursTitle: { fontWeight: '700' },
  hours: { fontStyle: 'italic' },
});
