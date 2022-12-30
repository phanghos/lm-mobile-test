import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen } from 'screens';
import { Colors } from 'colors';
import useAppStore from 'store';
import FilterIcon from '../../../assets/icons/filter.svg';

const HeaderFilterButton = () => {
  const { navigate } = useNavigation();
  const filters = useAppStore(state => state.filters);
  const filtersCount = Object.keys(filters).length;

  return (
    <TouchableOpacity onPress={() => navigate(Screen.Filter)}>
      <View>
        <FilterIcon width={30} height={30} style={styles.icon} />
        {!!filtersCount && (
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{filtersCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default HeaderFilterButton;

const styles = StyleSheet.create({
  icon: { marginRight: 24 },
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'white',
    top: -8,
    left: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: { color: Colors.primary, fontWeight: '700' },
});
