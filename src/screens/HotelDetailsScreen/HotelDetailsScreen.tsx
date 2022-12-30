import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from 'navigation/types';
import { Colors } from 'colors';
import CheckHours from 'components/HotelListItem/CheckHours';
import HotelListItemHeader from 'components/HotelListItem/HotelListItemHeader';

type ScreenProps = StackScreenProps<RootStackParamList, 'HOTEL_DETAILS_SCREEN'>;

const HotelDetailsScreen = () => {
  const {
    params: { name, location, stars, userRating, gallery, checkIn, checkOut },
  } = useRoute<ScreenProps['route']>();

  return (
    <View style={styles.container}>
      <HotelListItemHeader
        title={name}
        location={location}
        stars={stars}
        rating={userRating}
        gallery={gallery}
      />
      <CheckHours
        checkIn={checkIn}
        checkOut={checkOut}
        style={gallery.length === 1 && styles.checkHoursWithoutPagination}
      />
    </View>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBackground, padding: 16 },
  checkHoursWithoutPagination: { marginTop: 16 },
});
