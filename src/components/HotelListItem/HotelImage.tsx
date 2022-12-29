import React, { useState } from 'react';
import { Image, ImageURISource, StyleSheet } from 'react-native';

type HotelImageProps = ImageURISource;

const HotelImage = ({ uri }: HotelImageProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      source={{ uri: hasError ? 'https://via.placeholder.com/150' : uri }}
      onError={() => setHasError(true)}
      style={styles.image}
    />
  );
};

export default HotelImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginBottom: 16,
  },
});
