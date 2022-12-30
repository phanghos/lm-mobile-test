import React from 'react';
import {
  ButtonProps as RNButtonProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import { Colors } from 'colors';

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant?: 'regular' | 'fullWidth';
} & Pick<ViewProps, 'style'> &
  Pick<RNButtonProps, 'disabled'>;

const DISABLED_OPACITY = 0.5;

const Button = ({
  text,
  onPress,
  variant = 'regular',
  disabled,
  style,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.buttonContainer,
      variant === 'fullWidth' && { width: '100%' },
      disabled && { opacity: DISABLED_OPACITY },
      style,
    ]}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});
