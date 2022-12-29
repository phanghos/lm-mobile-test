import React from 'react';
import {
  Dimensions,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import type { Hotel } from 'types';
import { formatAddress } from 'utils/formatters';
import HotelStars from 'components/HotelStars/HotelStars';
import HotelImage from './HotelImage';

type HotelListItemHeaderProps = {
  title: string;
  location: Hotel['location'];
  stars: number;
  rating: number;
  gallery: string[];
};

const { width } = Dimensions.get('screen');

const renderCarouselItem: ListRenderItem<string> = ({ item }) => (
  <HotelImage uri={item} />
);

const SLIDER_WIDTH = width - 64;

const ITEM_WIDTH = width * 0.8;

const HotelListItemHeader = ({
  title,
  location,
  stars,
  rating,
  gallery,
}: HotelListItemHeaderProps) => (
  <View>
    <Text style={styles.hotelName}>{title}</Text>
    <Text style={styles.hotelAddress}>{formatAddress(location)}</Text>
    <View style={styles.starsAndRatingContainer}>
      <HotelStars count={stars} />
      <View style={styles.userRatingContainer}>
        <Text style={styles.userRating}>{rating}</Text>
      </View>
    </View>
    <Carousel
      data={gallery}
      renderItem={renderCarouselItem}
      sliderWidth={SLIDER_WIDTH}
      itemWidth={ITEM_WIDTH}
    />
  </View>
);

export default HotelListItemHeader;

const styles = StyleSheet.create({
  hotelName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  hotelAddress: { fontStyle: 'italic', marginBottom: 8 },
  starsAndRatingContainer: { flexDirection: 'row', marginBottom: 8 },
  userRatingContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#D8315B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRating: { color: 'white', fontWeight: '600' },
});
