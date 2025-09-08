import SignInScreen from '@/components/SignIn';
import LoginForm from '@/components/SignIn';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const signIn = () => {
    return (
        <View style={styles.container}>
            <SignInScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default signIn;
