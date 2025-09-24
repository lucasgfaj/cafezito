import Favorite from '@/components/Panel/Favorite';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Favorites = () => {
    return (
        <View style={styles.container}>
            <Favorite/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default Favorites;
