import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ref, onValue, remove } from 'firebase/database';
import database from '../Firebase';



// This is the Reading List Screen. Users can view the books they have saved here.

// ****** fetching data from firebase needs to be done ******
// ****** Remove function need to be done *******
// ******* Flatlist function needs to be done *******

export default function ReadingListScreen() {

    const [books, setBooks] = useState([]);

    {/** T
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
    });*/}

    useEffect(() => {
        const booksRef = ref(database, '/books');
        onValue(booksRef, snapshot => {
            const data = snapshot.val();
            const booklist = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
            setBooks(booklist);
            console.log(books.length, 'booklist');
            console.log("books: ", books);
        })
    }, []);

    // deleting an item from reading list
    const deleteItem = (key) => {
       console.log('delete book: ', key, books.find(item => item.key === key));
       setBooks(prevBooks => prevBooks.filter(item => item.key !== key));

        remove (ref(database, 'books/' + key));
    }




    return (
        <View style={styles.container}>
            <Text style={styles.header}>This is your reading list</Text>
            <FlatList style={styles.list}
          keyExtractor={item => item.key }
          renderItem={({item}) => 
          <View style={styles.list}>
            <Text>{item.title}</Text>
            <Text style={styles.delete} onPress={() => deleteItem(item.key)}>  delete</Text>
          </View>}
        data={books}
      />
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
    list: {
        flexDirection: 'row',
      },
      delete: {
        color: "blue",
      },

})