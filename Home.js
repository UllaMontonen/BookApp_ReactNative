import React from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from '@rneui/themed';
import { Header } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';




export default function Home({ navigation }) {
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to the Reading Book App</Text>
            </View>
            <Image
                style={styles.imgae}
                source={require('./pictures/owl.webp')} />
            <View style={styles.button}>
                <Button
                    title="Find Books"
                    onPress={() => navigation.navigate('Search')} // Navigate to Search screen
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="My Reading List"
                    onPress={() => navigation.navigate('ReadingList')} // Navigate to ReadingList screen
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
    header: {
        marginBottom: 50,
        marginTop: 30,
    },
    button: {
        marginBottom: 10,
        width: 270, 
    },
    imgae: {
        width: 270, 
        height: 260,
        marginBottom: 40
    }
});