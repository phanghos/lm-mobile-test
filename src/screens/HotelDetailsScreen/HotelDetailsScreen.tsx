import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import CheckHours from 'components/HotelListItem/CheckHours';
import type { RootStackParamList } from 'navigation/types';

type ScreenProps = StackScreenProps<RootStackParamList, 'HOTEL_DETAILS_SCREEN'>;

const HotelDetailsScreen = () => {
  const {
    params: { checkIn, checkOut },
  } = useRoute<ScreenProps['route']>();

  return (
    <View style={styles.container}>
      <CheckHours checkIn={checkIn} checkOut={checkOut} />
    </View>
  );
};

export default HotelDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F1FF', padding: 16 },
});
