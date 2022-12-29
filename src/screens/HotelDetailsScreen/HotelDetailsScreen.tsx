import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import CheckHours from 'components/HotelListItem/CheckHours';
import type { RootStackParamList } from 'navigation/types';
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
        style={gallery.length === 1 && { marginTop: 16 }}
      />
    </View>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F1FF', padding: 16 },
});
