import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FilterItemProps = {
  title: string;
};

const FilterItem = ({
  title,
  children,
}: PropsWithChildren<FilterItemProps>) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </View>
);

export default FilterItem;

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
});
