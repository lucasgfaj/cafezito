import React from 'react';
import { StyleSheet, View } from 'react-native';
import Delivery from '@/components/Details/Delivery';

const DeliveryIndex = () => {
    return (
        <View style={styles.container}>
            <Delivery/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default DeliveryIndex;
