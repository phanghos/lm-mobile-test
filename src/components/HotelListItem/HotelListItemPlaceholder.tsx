import React from 'react';
import { ScrollView, StyleSheet, View, ViewProps } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

type SingleHotelListItemPlaceholderProps = {
  isLoading: boolean;
} & Pick<ViewProps, 'style'>;

const SingleHotelListItemPlaceholder = ({
  isLoading,
  style,
}: SingleHotelListItemPlaceholderProps) => (
  <View style={[styles.container, style]}>
    <SkeletonContent
      containerStyle={styles.placeholderContainer}
      isLoading={isLoading}
      layout={[
        { key: 'hotelName', width: '50%', height: 20, marginBottom: 8 },
        { key: 'hotelAddress', width: '70%', height: 20, marginBottom: 16 },
        { key: 'stars', width: '40%', height: 30, marginBottom: 16 },
        { key: 'gallery', width: '100%', height: 200, marginBottom: 16 },
        { key: 'price', width: '20%', height: 20 },
      ]}
    />
  </View>
);

type HotelListItemPlaceholderProps = Pick<
  SingleHotelListItemPlaceholderProps,
  'isLoading'
>;

const PLACEHOLDER_ITEMS = [
  SingleHotelListItemPlaceholder,
  SingleHotelListItemPlaceholder,
];

const HotelListItemPlaceholder = ({
  isLoading,
}: HotelListItemPlaceholderProps) => (
  <ScrollView>
    {PLACEHOLDER_ITEMS.map((Placeholder, index) => (
      <Placeholder
        // eslint-disable-next-line react/no-array-index-key
        key={`${index}`}
        isLoading={isLoading}
        style={index === 0 ? styles.firstItem : styles.lastItem}
      />
    ))}
  </ScrollView>
);

export default HotelListItemPlaceholder;

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', marginHorizontal: 16 },
  placeholderContainer: { width: '100%', padding: 16, borderRadius: 8 },
  firstItem: { margin: 16 },
  lastItem: { marginBottom: 16 },
});
