import AccountBar from '@/components/Panel/AccountBar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Account = () => {
    return (
        <View style={styles.container}>
            <AccountBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Account;
