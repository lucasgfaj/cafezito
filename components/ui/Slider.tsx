import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Category {
  id: string;
  name: string;
}

interface SliderProps {
  data: Category[];
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  onPressItem?: (item: Category) => void;
  style?: ViewStyle;
}

export default function Slider({
  data,
  width = 120,
  height = 50,
  backgroundColor = '#FFA500',
  textColor = '#FFF',
  borderRadius = 8,
  onPressItem,
  style,
}: SliderProps) {
  const [selectedId, setSelectedId] = useState<string>('1');

  const handleSelect = (item: Category) => {
    setSelectedId(item.id);
    onPressItem?.(item);
  };

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedId;
          return (
            <TouchableOpacity
              style={[
                styles.card,
                {
                  width,
                  height,
                  backgroundColor: isSelected ? backgroundColor : 'white',
                  borderRadius,
                  borderColor: 'white',
                  borderWidth: 1,
                },
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: isSelected ? textColor : '#000',
                    fontWeight: isSelected ? '800' : '300',
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: 'Sora',
    fontSize: 14,
  },
});
