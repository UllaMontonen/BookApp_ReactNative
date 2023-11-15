import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, } from 'react-native';
import { StatusBar } from 'expo-status-bar';



export default function HomeScreen({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to the ReadBook App</Text>
            </View>
            <Image
                style={styles.imgae}
                source={require('./pictures/owl.webp')} /** Picture of the app */
            />
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Search')} /** Navigating to SearchScreen.js */
                >
                    <Text style={styles.buttonText}>Find books</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ReadingList')} /** Navigating to ReadingListScreen.js */
                >
                    <Text style={styles.buttonText}>My Reading List</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    // Whole page
    container: {
        marginTop: 10,
        alignItems: 'center',
    },
    // Header style
    header: {
        marginBottom: 50,
        marginTop: 30,
    },
    // Button style
    button: {
        marginBottom: 15,
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6f1d1b",

    },
    // text in the button
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 18,
    },

    // Image style
    imgae: {
        width: "70%",
        height: 260,
        marginBottom: 40,
    }
});