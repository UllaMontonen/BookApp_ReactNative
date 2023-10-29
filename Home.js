import React from "react";
import { StyleSheet, View, Text, Button } from 'react-native';




export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
        title="Find Books"
        onPress={() => navigation.navigate('Search')} // Navigate to Search screen
      />
      <Button
        title="My Reading List"
        onPress={() => navigation.navigate('ReadingList')} // Navigate to ReadingList screen
      />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: 'center',
    },
});