import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import StarFilled from '../../../assets/icons/star_filled.svg';
import StarOutlined from '../../../assets/icons/star_outlined.svg';

type HotelStarsProps = {
  count: number;
};

const TOTAL_STARS = 5;

const HotelStars = ({ count }: HotelStarsProps) => (
  <>
    {[
      ...Array(count).fill(StarFilled),
      ...Array(TOTAL_STARS - count).fill(StarOutlined),
    ].map((Star: React.FC<SvgProps>, index) => (
      <Star
        // eslint-disable-next-line react/no-array-index-key
        key={`${index}`}
        width={20}
        height={20}
        style={styles.star}
      />
    ))}
  </>
);

export default HotelStars;

const styles = StyleSheet.create({
  star: { top: 5, marginRight: 8 },
});
