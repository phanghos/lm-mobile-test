import React from 'react';
import {
  Dimensions,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import type { Hotel } from 'types';
import { Screen } from 'screens';
import {
  formatAddress as formatHotelAddress,
  formatPrice,
} from 'utils/formatters';
import HotelStars from 'components/HotelStars/HotelStars';
import HotelImage from './HotelImage';

type HotelListItemProps = Hotel;

const { width } = Dimensions.get('screen');

const renderCarouselItem: ListRenderItem<string> = ({ item }) => (
  <HotelImage uri={item} />
);

const SLIDER_WIDTH = width - 64;

const ITEM_WIDTH = width * 0.8;

const HotelListItem = (props: HotelListItemProps) => {
  const { name, location, stars, userRating, gallery, price, currency } = props;

  const { navigate } = useNavigation();

  const goToHotelDetails = () => navigate(Screen.HotelDetails, props);

  return (
    <TouchableOpacity onPress={goToHotelDetails}>
      <View style={styles.container}>
        <Text style={styles.hotelName}>{name}</Text>
        <Text style={styles.hotelAddress}>{formatHotelAddress(location)}</Text>
        <View style={styles.starsAndRatingContainer}>
          <HotelStars count={stars} />
          <View style={styles.userRatingContainer}>
            <Text style={styles.userRating}>{userRating}</Text>
          </View>
        </View>
        {!!gallery.length && (
          <Carousel
            data={gallery}
            renderItem={renderCarouselItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
        )}
        <Text style={styles.price}>
          {formatPrice({ amount: price, currency })}
        </Text>
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
