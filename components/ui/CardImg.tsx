import React from 'react';
import { Image, ImageSourcePropType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface CardImgProps {
  image: ImageSourcePropType;
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export default function CardImg({
  image,
  width = 150,
  height = 150,
  borderRadius = 12,
  style,
}: CardImgProps) {
  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Image
        source={image}
        style={{ width: '100%', height: '100%', borderRadius }}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
