import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, } from "react-native";




export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onPressLogin = () => {
        // Do something about login operation
    };
    const onPressSignUp = () => {
        // Do something about signup operation
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login to the ReadBook App</Text>
            </View>
            <Image
                style={styles.imgae}
                source={require('./pictures/owl.webp')} /** Picture of the app */
            />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Write your email'
                    placeholderTextColor="white"
                    onChangeText={email => setEmail(email)}
                    value={email} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Write your password'
                    placeholderTextColor="white"
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
                    value={password} />
            </View>
            <TouchableOpacity style={styles.loginBtn}>
                <Text onPress={onPressLogin} style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text onPress={onPressSignUp} style={styles.register}>Register a new account</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    // whole page
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white",
    },

    // text input area
    inputView: {
        backgroundColor: "#99582a",
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 10,
        alignItems: "center",
        height: 40,
        color: "white",
        fontSize: 18,
    },

    // text input (no placeholder)
    TextInput: {
        height: 40,
        color: "white",
        fontSize: 18,

    },
    // loging button
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "#6f1d1b",
    },
    // text in the button
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 18,
    },
    // Header style
    header: {
        marginBottom: 50,
        marginTop: 30,
    },
    // Image style
    imgae: {
        width: 270,
        height: 260,
        marginBottom: 40
    },
    register: {
        marginTop: 20,
        color: "#6f1d1b",
        fontWeight: 'bold',
    }

});