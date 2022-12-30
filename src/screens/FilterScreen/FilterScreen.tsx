import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'colors';
import Filters from 'components/Filters/Filters';

const FilterScreen = () => (
  <View style={styles.container}>
    <Filters />
  </View>
);

export default FilterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colors.screenBackground },
});
