import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from 'components/Button/Button';

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
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    {!!buttonText && <Button text={buttonText} onPress={onButtonPress} />}
  </View>
);

export default Placeholder;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, marginBottom: 16 },
});
