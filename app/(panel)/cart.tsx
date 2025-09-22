import React from 'react';
import { StyleSheet, View } from 'react-native';
import Order from '@/components/Details/Order';
const Cart = () => {
    return (
        <View style={styles.container}>
            <Order/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Cart;
