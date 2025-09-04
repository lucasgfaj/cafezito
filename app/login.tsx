import LoginForm from '@/components/LoginForm';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
            <LoginForm/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Login;
