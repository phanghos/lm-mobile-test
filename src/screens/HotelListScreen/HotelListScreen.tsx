import React from 'react';
import {
  FlatList,
  Insets,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import type { Hotel } from 'types';
import { Colors } from 'colors';
import useFetchHotels from 'hooks/useFetchHotels';
import useFilterHotels from 'hooks/useFilterHotels';
import HotelListItem from 'components/HotelListItem/HotelListItem';
import HotelListItemPlaceholder from 'components/HotelListItem/HotelListItemPlaceholder';
import EmptyPlaceholder from 'components/EmptyPlaceholder/EmptyPlaceholder';
import ErrorPlaceholder from 'components/ErrorPlaceholder/ErrorPlaceholder';
import useAppStore from 'store';

const renderItem: ListRenderItem<Hotel> = ({ item }) => (
  <HotelListItem {...item} />
);

const keyExtractor = ({ id }: Hotel) => `${id}`;

const Separator = () => <View style={styles.separator} />;

const scrollInsets: Insets = { top: 16, bottom: -16 };

const HotelListScreen = () => {
  const { isLoading, hotels, hasError, refetch } = useFetchHotels();
  const filters = useAppStore(state => state.filters);
  const filteredHotels = useFilterHotels(hotels, filters);

  return (
    <View style={styles.container}>
      {isLoading && <HotelListItemPlaceholder isLoading={isLoading} />}
      <FlatList
        data={filteredHotels}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={!isLoading ? <EmptyPlaceholder /> : null}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={
          filteredHotels.length
            ? styles.listContainer
            : styles.listContainerEmpty
        }
        scrollIndicatorInsets={scrollInsets}
      />
      {hasError && <ErrorPlaceholder onButtonPress={refetch} />}
    </View>
  );
};

export default HotelListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.screenBackground },
  separator: { height: 8 },
  listContainer: { padding: 16 },
  listContainerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
