import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import { Colors } from 'colors';

type HotelRatingProps = {
  rating: number;
  textStyle?: StyleProp<TextStyle>;
} & Pick<ViewProps, 'style'>;

const HotelRating = ({ rating, style, textStyle }: HotelRatingProps) => (
  <View style={[styles.userRatingContainer, style]}>
    <Text style={[styles.userRating, textStyle]}>{rating}</Text>
  </View>
);

export default HotelRating;

const styles = StyleSheet.create({
  userRatingContainer: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userRating: { color: 'white', fontWeight: '600' },
});
