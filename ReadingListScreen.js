import React from "react";
import { StyleSheet, View, Text } from 'react-native';


export default function ReadingListScreen() {
    return (
        <View style={styles.container}>
            <Text>ReadingList</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    // Container style
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white",
    },

})