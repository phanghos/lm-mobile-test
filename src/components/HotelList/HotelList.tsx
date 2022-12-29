import React from 'react';
import {
  FlatList,
  Insets,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import type { Hotel } from 'types';
import useFetchHotels from 'hooks/useFetchHotels';
import HotelListItem from 'components/HotelListItem/HotelListItem';
import HotelListItemPlaceholder from 'components/HotelListItem/HotelListItemPlaceholder';

const renderItem: ListRenderItem<Hotel> = ({ item }) => (
  <HotelListItem {...item} />
);

const keyExtractor = ({ id }: Hotel) => `${id}`;

const Separator = () => <View style={styles.separator} />;

const scrollInsets: Insets = { top: 16, bottom: -16 };

const HotelList = () => {
  const { isLoading, hotels, hasError } = useFetchHotels();

  return (
    <View style={styles.container}>
      {isLoading && <HotelListItemPlaceholder isLoading={isLoading} />}
      {!!hotels.length && (
        <FlatList
          data={hotels}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Separator}
          contentContainerStyle={styles.listContainer}
          scrollIndicatorInsets={scrollInsets}
        />
      )}
      {hasError && <></>}
    </View>
  );
};

export default HotelList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F1FF' },
  separator: { height: 8 },
  listContainer: { padding: 16 },
});
