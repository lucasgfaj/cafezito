import OrderBar from '@/components/Panel/OrderBar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Orders = () => {
    return (
        <View style={styles.container}>
        <OrderBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Orders;
