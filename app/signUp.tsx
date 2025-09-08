import SignUpScreen from '@/components/SignUp';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const signUp = () => {
    return (
        <View style={styles.container}>
         <SignUpScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default signUp;
