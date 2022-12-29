import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Hotel } from 'types';
import {
  formatAddress as formatHotelAddress,
  formatCurrency,
} from 'utils/formatters';

type HotelListItemProps = Hotel;

const HotelListItem = (props: HotelListItemProps) => {
  const { name, location, userRating, price } = props;

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.hotelName}>{name}</Text>
        <Text style={styles.hotelAddress}>{formatHotelAddress(location)}</Text>
        <View style={styles.starsAndRatingContainer}>
          <View style={styles.userRatingContainer}>
            <Text style={styles.userRating}>{userRating}</Text>
          </View>
        </View>
        <Text style={styles.price}>{formatCurrency(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HotelListItem;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 8 },
  hotelName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  hotelAddress: { fontStyle: 'italic', marginBottom: 8 },
  starsAndRatingContainer: { flexDirection: 'row', marginBottom: 8 },
  userRatingContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#D8315B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  userRating: { color: 'white', fontWeight: '600' },
  price: { fontSize: 20, color: '#D8315B', fontWeight: '700' },
});
