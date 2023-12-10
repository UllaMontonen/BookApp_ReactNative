import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { ref, onValue, remove } from 'firebase/database';
import { ListItem } from '@rneui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import database from '../Firebase';


// This is the Reading List Screen. Users can view the books they have saved here.
// The information is fetched from the Firebase Realtime Database.
// Users can remove books from the database by pressing the "Book read" button.


export default function ReadingListScreen() {

    const [books, setBooks] = useState([]);


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
        alert("Book was removed from the reading list");

        remove(ref(database, 'books/' + key));
    }

    // Rendering books for flatlist, also handling errors here
    const renderBooks = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <View style={styles.row}>
                    <Image
                        style={{ width: 150, height: 200, marginBottom: 15 }}
                        source={{
                            uri: item.image,
                        }}
                        defaultSource={require('../pictures/placeholder.png')}
                    />
                    <View style={styles.info}>
                        <ListItem.Title style={{ fontWeight: 'bold', }}>{item.title || 'Not available'}</ListItem.Title>
                        <ListItem.Subtitle>Author/s: {item.authors || 'Author not available'}</ListItem.Subtitle>
                        <View style={styles.deleteButton}>
                            <TouchableOpacity
                                onPress={() => deleteItem(item.key)}>
                                <View style={styles.row}>
                                    <Ionicons name="checkmark-circle-outline" size={20} color="white" paddingRight={5} />

                                    <Text style={styles.deleteText}>Book read</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.header}>This is your reading list</Text>
            <FlatList
                data={books}
                style={styles.list}
                keyExtractor={item => item.key}
                renderItem={renderBooks}

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
        marginBottom: 15,
    },
    // flatlist style
    list: {
        width: '100%',
    },
    // list item direction, book and info next to each other
    row: {
        flexDirection: 'row',
    },
    // book read button
    deleteButton: {
        borderRadius: 25,
        height: 35,
        width: "70%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
        marginTop: 5,
    },
    // text inside the button
    deleteText: {
        color: "white",
        fontSize: 16,
    },
    // info text about the book, title etc.
    info: {
        flex: 2,
        paddingLeft: 15,
        justifyContent: 'center',
    },

})