import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CommonProps = {
  title: string;
  subtitle: string;
};

type WithoutButtonProps = {
  buttonText?: never;
  onButtonPress?: never;
};

type WithButtonProps = {
  buttonText: string;
  onButtonPress: () => void;
};

type PlaceholderProps = CommonProps & (WithoutButtonProps | WithButtonProps);

const Placeholder = ({
  title,
  subtitle,
  buttonText,
  onButtonPress,
}: PlaceholderProps) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    {!!buttonText && (
      <TouchableOpacity onPress={onButtonPress} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

export default Placeholder;

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 16 },
  buttonContainer: {
    padding: 12,
    backgroundColor: '#D8315B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
