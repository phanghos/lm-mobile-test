import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppStore from 'store';
import { Colors } from 'colors';
import Filters from 'components/Filters/Filters';

const FilterScreen = () => {
  const { setOptions } = useNavigation();
  const resetFilters = useAppStore(state => state.resetFilters);

  useEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={resetFilters} style={styles.headerContainer}>
          <Text style={styles.headerText}>Reset all</Text>
        </TouchableOpacity>
      ),
    });
  }, [setOptions, resetFilters]);

  return (
    <View style={styles.container}>
      <Filters />
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  headerContainer: { marginRight: 16 },
  headerText: { color: 'white', fontWeight: '600' },
  container: { flex: 1, padding: 16, backgroundColor: Colors.screenBackground },
});
