import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'colors';

type WithoutResetProps = {
  canReset?: never;
  onResetPress?: never;
};

type WithResetProps = {
  canReset: true;
  onResetPress: () => void;
};

type FilterItemProps = {
  title: string;
} & (WithoutResetProps | WithResetProps);

const FilterItem = ({
  title,
  canReset,
  onResetPress,
  children,
}: PropsWithChildren<FilterItemProps>) => (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      {canReset && (
        <TouchableOpacity onPress={onResetPress}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

export default FilterItem;

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginRight: 16,
  },
  resetText: { color: Colors.primary, fontWeight: '500', top: -3 },
});
