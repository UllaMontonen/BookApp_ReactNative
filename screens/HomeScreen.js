import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


// sign out button need to be done


export default function HomeScreen({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to the ReadBook App</Text>
            </View>
            <Image
                style={styles.imgae}
                source={require('../pictures/owl.webp')} /** Picture of the app */
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Search')} /** Navigating to SearchScreen.js */
            >
                <Ionicons name="search" size={24} color="white" />

                <Text style={styles.buttonText}>Find books</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('ReadingList')} /** Navigating to ReadingListScreen.js */
            >
                <Ionicons name="md-book" size={24} color="white" />
                <Text style={styles.buttonText}>My Reading List</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.signout}>Sign out</Text> 
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    // Whole page
    container: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: "white",
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
        flexDirection: 'row',

    },
    // text in the button
    buttonText: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
    },

    // Image style
    imgae: {
        width: "70%",
        height: 260,
        marginBottom: 40,
    },

    // sign out text button
    signout: {
        marginTop: 40,
        color: "#6f1d1b",
        fontWeight: 'bold',
        fontSize: 18,
    }
});