import RegisterScreen from '@/components/RegisterForm';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Register = () => {
    return (
        <View style={styles.container}>
            <RegisterScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Register;
