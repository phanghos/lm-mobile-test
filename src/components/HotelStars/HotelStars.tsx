import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import StarFilled from '../../../assets/icons/star_filled.svg';
import StarOutlined from '../../../assets/icons/star_outlined.svg';

type HotelStarsProps = {
  count: number;
  onStarPress?: (count: number) => void;
};

const TOTAL_STARS = 5;

const HotelStars = ({ count, onStarPress }: HotelStarsProps) => (
  <View style={styles.container}>
    {[
      ...Array(count).fill(StarFilled),
      ...Array(TOTAL_STARS - count).fill(StarOutlined),
    ].map((Star: React.FC<SvgProps>, index) => (
      <TouchableOpacity
        // eslint-disable-next-line react/no-array-index-key
        key={`${index}`}
        onPress={() => onStarPress?.(index + 1)}
        disabled={!onStarPress}>
        <Star width={20} height={20} style={styles.star} />
      </TouchableOpacity>
    ))}
  </View>
);

export default HotelStars;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginRight: 8 },
  star: { top: 5, marginRight: 8 },
});
