import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Hotel } from 'types';
import { Screen } from 'screens';
import { formatPrice } from 'utils/formatters';
import HotelListItemHeader from './HotelListItemHeader';

type HotelListItemProps = Hotel;

const HotelListItem = (props: HotelListItemProps) => {
  const { name, location, stars, userRating, gallery, price, currency } = props;

  const { navigate } = useNavigation();

  const goToHotelDetails = () => navigate(Screen.HotelDetails, props);

  return (
    <TouchableOpacity onPress={goToHotelDetails}>
      <View style={styles.container}>
        <HotelListItemHeader
          title={name}
          location={location}
          stars={stars}
          rating={userRating}
          gallery={gallery}
          onImagePress={goToHotelDetails}
        />
        <Text style={[styles.price, gallery.length === 1 && { marginTop: 16 }]}>
          {formatPrice({ amount: price, currency })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HotelListItem;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: 'white', borderRadius: 8 },
  price: { fontSize: 20, color: '#D8315B', fontWeight: '700' },
});
