import React, { useState } from 'react';
import {
  Dimensions,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import type { Hotel } from 'types';
import { Colors } from 'colors';
import { formatAddress } from 'utils/formatters';
import HotelStars from 'components/HotelStars/HotelStars';
import HotelImage from './HotelImage';

type HotelListItemHeaderProps = {
  title: string;
  location: Hotel['location'];
  stars: number;
  rating: number;
  gallery: string[];
  onImagePress?: () => void;
};

const { width } = Dimensions.get('screen');

const renderCarouselItem: (
  onImagePress: HotelListItemHeaderProps['onImagePress'],
) => ListRenderItem<string> =
  onImagePress =>
  ({ item }) =>
    (
      <TouchableWithoutFeedback onPress={onImagePress}>
        <View onStartShouldSetResponder={() => false}>
          <HotelImage uri={item} />
        </View>
      </TouchableWithoutFeedback>
    );

const SLIDER_WIDTH = width - 64;
const ITEM_WIDTH = width * 0.8;
const INACTIVE_DOT_OPACITY = 0.5;
const INACTIVE_DOT_SCALE = 0.5;

const HotelListItemHeader = ({
  title,
  location,
  stars,
  rating,
  gallery,
  onImagePress,
}: HotelListItemHeaderProps) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
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
        renderItem={renderCarouselItem(onImagePress)}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={setCarouselIndex}
      />
      <Pagination
        dotsLength={gallery.length}
        activeDotIndex={carouselIndex}
        dotContainerStyle={styles.paginationDotContainer}
        dotStyle={styles.paginationDotStyle}
        inactiveDotOpacity={INACTIVE_DOT_OPACITY}
        inactiveDotScale={INACTIVE_DOT_SCALE}
      />
    </View>
  );
};

export default HotelListItemHeader;

const styles = StyleSheet.create({
  hotelName: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  hotelAddress: { fontStyle: 'italic', marginBottom: 8 },
  starsAndRatingContainer: { flexDirection: 'row', marginBottom: 8 },
  userRatingContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRating: { color: 'white', fontWeight: '600' },
  paginationDotContainer: { height: 0 },
  paginationDotStyle: { width: 10, height: 10, borderRadius: 5 },
});
