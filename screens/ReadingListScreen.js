import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// This is the Reading List Screen. Users can view the books they have saved here.

// ****** fetching data from firebase needs to be done ******
// ****** Remove function need to be done *******
// ******* Flatlist function needs to be done *******

export default function ReadingListScreen() {


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });





    return (
        <View style={styles.container}>
            <Text style={styles.header}>This is your reading list</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    // container style
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white",
    },
    // header text (Reading List)
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },

})