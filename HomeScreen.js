import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from '@rneui/themed';
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
                <Button
                    title="Find Books"
                    onPress={() => navigation.navigate('Search')} /** Navigating to SearchScreen.js */
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="My Reading List"
                    onPress={() => navigation.navigate('ReadingList')} /** Navigating to ReadingListScreen.js */
                />
            </View>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
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
        marginBottom: 10,
        width: 270, 
    },
    // Image style
    imgae: {
        width: 270, 
        height: 260,
        marginBottom: 40
    }
});