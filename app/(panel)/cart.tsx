import React from 'react';
import { StyleSheet, View } from 'react-native';
import CartBar from '@/components/Panel/CartBar';
const Cart = () => {
    return (
        <View style={styles.container}>
            <CartBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Cart;
