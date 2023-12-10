import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, Alert, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { push, ref, onValue, remove } from 'firebase/database';
import database from '../Firebase';


// The ReadMore screen opens when the user presses the 'Read More' button on the SearchScreen after the search function has been completed.
// On the ReadMore screen, the user can press the 'Show More' button to view the rest of the description, and 'Show Less' has the opposite function.
// Additionally, the user can add the book to the Reading List by pressing the 'Add to readinglist' button, and the book will be saved to the Firebase database.

export default function ReadMoreScreen() {

    const route = useRoute();
    // Selected book
    const { selectedBook } = route.params;
    // Show more function for the description part
    const [showFullDescription, setShowFullDescription] = useState(false);
    // Navigation to Read more screen
    const navigation = useNavigation();
    // Used for saving books to Firebase database
    const [books, setBooks] = useState([]);


    // Showing only the year for the PublishedYear call
    // Now returns yyy-mm-dd
    const getPublishedYear = (fullDate) => {
        if (fullDate) {
            const year = new Date(fullDate).getFullYear();
            return year;
        }
        return 'Not available';
    };

    // Show more function
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Reset showFullDescription when navigating to a new book
    useEffect(() => {
        setShowFullDescription(false);
    }, [selectedBook]);

    const descriptionToShow = showFullDescription
        ? selectedBook.volumeInfo.description
        : selectedBook.volumeInfo.description?.slice(0, 300);


    useEffect(() => {
        const booksRef = ref(database, '/books');
        onValue(booksRef, snapshot => {
            const data = snapshot.val();
            const booklist = data ? Object.keys(data).map(key => ({ key, ...data[key] })) : [];
            setBooks(booklist);
            console.log(booklist.length, 'booklist read');
        })
    }, []);

    // saving an item to reading list
    const saveItem = () => {
        const title = selectedBook?.volumeInfo?.title;
        const authors = selectedBook?.volumeInfo?.authors?.join(', ');
        const image = selectedBook?.volumeInfo?.imageLinks?.thumbnail;
        if (title) {
            push(ref(database, '/books'), { title, authors, image });
            console.log("Book added to the reading list:", title);
            alert("Book was added to the readingList");
        } else {
            console.error("Cannot add book to the reading list: title is undefined");
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.center}>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedBook.volumeInfo.title}</Text>
                    </View>
                    <Image
                        style={{ width: 150, height: 200, marginBottom: 15 }}
                        source={{
                            uri: selectedBook.volumeInfo.imageLinks?.thumbnail,
                        }}
                        defaultSource={require('../pictures/placeholder.png')}
                    />
                    <View style={styles.text}>
                        <Text style={{ fontSize: 15 }}>Author/s: {selectedBook.volumeInfo.authors?.join(', ') || 'Not available'}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 15 }}>Publisher: {selectedBook.volumeInfo.publisher || 'Not available'}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 15 }}>Published year: {getPublishedYear(selectedBook.volumeInfo.publishedDate)}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 15 }}>Language: {selectedBook.volumeInfo.language || 'Not available'}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text style={{ fontSize: 15 }}>Pages: {selectedBook.volumeInfo.pageCount || 'Not available'}</Text>
                    </View>
                    <View style={styles.description}>
                        <Text style={{ fontSize: 15 }}>
                            {descriptionToShow || 'Not available'}
                            {selectedBook.volumeInfo.description?.length > 300 && !showFullDescription && (
                                <Text style={{ color: '#6f1d1b', fontWeight: 'bold' }}>...</Text>
                            )}
                        </Text>
                        {selectedBook.volumeInfo.description?.length > 300 && (
                            <TouchableOpacity onPress={toggleDescription}>
                                <Text style={styles.showMore}>
                                    {showFullDescription ? 'Show Less' : 'Show More'}</Text>
                            </TouchableOpacity>
                        )}
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={saveItem}
                            >
                                <Text style={styles.buttonText}>Add to readinglist</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SearchView')}>
                                <Text style={styles.buttonText}>Back to search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    // container style affects the whole page
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white",
    },
    // flatlist style
    list: {
        width: '100%',
    },
    // title text
    header: {
        marginBottom: 15,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    // all texts, except description and title
    text: {
        marginBottom: 5,
    },
    // description text
    description: {
        padding: 20,
    },
    // back to search button and readinglist button
    button: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 25,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6f1d1b",
        marginTop: 5,
        marginLeft: 50,
        marginRight: 50,
    },
    // text inside the buttons
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    // aligning items to center
    center: {
        alignItems: "center",
    },
    // show more button
    showMore: {
        color: '#6f1d1b', marginTop: 5, marginBottom: 10, fontWeight: 'bold'
    }
});