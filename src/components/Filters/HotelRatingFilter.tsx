import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import HotelRating from 'components/HotelListItem/HotelRating/HotelRating';
import { Colors } from 'colors';
import { RangeFilterType } from './types';

type HotelRatingFilterProps = {
  values: RangeFilterType;
  min: number;
  max: number;
  step?: number;
  onValuesChange: (values: RangeFilterType) => void;
};

const HotelRatingFilter = ({
  values,
  min,
  max,
  step = 1,
  onValuesChange,
}: HotelRatingFilterProps) => {
  const [minValue, maxValue] = values;

  return (
    <View style={styles.container}>
      <View style={styles.sliderLabelContainer}>
        <Text style={styles.sliderLabelBetween}>Between</Text>
        <HotelRating rating={minValue} style={styles.ratingContainer} />
        <Text style={styles.sliderLabelAnd}>and</Text>
        <HotelRating rating={maxValue} style={styles.ratingContainer} />
      </View>
      <MultiSlider
        min={min}
        max={max}
        step={step}
        values={[minValue, maxValue]}
        showStepMarkers
        enabledOne
        enabledTwo
        onValuesChange={([newMin, newMax]) =>
          onValuesChange([+newMin.toFixed(2), +newMax.toFixed(2)])
        }
        containerStyle={styles.sliderContainer}
        markerStyle={styles.sliderMarker}
        selectedStyle={styles.sliderTrack}
      />
    </View>
  );
};

export default HotelRatingFilter;

const styles = StyleSheet.create({
  container: {},
  sliderContainer: { marginHorizontal: 16 },
  sliderMarker: { backgroundColor: Colors.primary },
  sliderTrack: { backgroundColor: Colors.primary },
  sliderLabelContainer: { flexDirection: 'row', alignItems: 'center' },
  sliderLabelBetween: { fontSize: 16, fontWeight: '500', marginRight: 16 },
  sliderLabelAnd: { fontSize: 16, fontWeight: '500', marginHorizontal: 16 },
  ratingContainer: { width: 50 },
});
