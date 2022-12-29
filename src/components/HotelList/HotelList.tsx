import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import type { Hotel } from 'types';
import useFetchHotels from 'hooks/useFetchHotels';

const keyExtractor = ({ id }: Hotel) => `${id}`;

const HotelList = () => {
  const { isLoading, hotels, hasError } = useFetchHotels();

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size={'large'} />}
      {!!hotels.length && (
        <FlatList
          data={hotels}
          renderItem={({ item: _ }) => <></>}
          keyExtractor={keyExtractor}
        />
      )}
      {hasError && <></>}
    </View>
  );
};

export default HotelList;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F1FF' },
});
