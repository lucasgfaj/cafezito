import HomeBar from '@/components/Panel/Home';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Index = () => {
  return (
    <View style={styles.container}>
      <HomeBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Index;
