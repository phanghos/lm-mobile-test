import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewProps } from 'react-native';

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant?: 'regular' | 'fullWidth';
} & Pick<ViewProps, 'style'>;

const Button = ({ text, onPress, variant = 'regular', style }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.buttonContainer,
      variant === 'fullWidth' && { width: '100%' },
      style,
    ]}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    backgroundColor: '#D8315B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
