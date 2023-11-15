import React, { useState } from "react";
import { StyleSheet, Icon, Text, View, Keyboard, Alert, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { ListItem } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import ReadMoreScreen from './ReadMoreScreen';

export default function SearchScreen() {


    // searched books
    const [keyword, setKeyword] = useState('');
    // Results Google Books API returns
    const [results, setResults] = useState([]);
    // Navigation to Read more screen
    const navigation = useNavigation();

    // fetching the searched books usinf Google Books API
    const fetchBook = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResults(data.items);
        } catch (error) {
            Alert.alert('Error', error.message);
        }

        Keyboard.dismiss();
    };

    // Showing only the year, format not yyy-mm-dd
    const getPublishedYear = (fullDate) => {
        if (fullDate) {
            const year = new Date(fullDate).getFullYear();
            return year;
        }
        return 'Not available';
    };


    // Rendering books for flatlist, also handling errors here
    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <View style={styles.row}>
                    <Image
                        style={{ width: 150, height: 200, marginBottom: 15 }}
                        source={{
                            uri: item.volumeInfo.imageLinks?.thumbnail,
                        }}
                        defaultSource={require('./pictures/placeholder.png')}
                    />
                    <View style={styles.info}>
                        <ListItem.Title style={{ fontWeight: 'bold', }}>{item.volumeInfo.title || 'Not available'}</ListItem.Title>
                        <ListItem.Subtitle>Author/s: {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Author not available'}</ListItem.Subtitle>
                        <ListItem.Subtitle>Published year: {getPublishedYear(item.volumeInfo.publishedDate)}</ListItem.Subtitle>
                        <ListItem.Subtitle>Pages: {item.volumeInfo.pageCount || 'Not available'}</ListItem.Subtitle>
                        <View style={styles.readMorebutton}>
                            <TouchableOpacity 
                                onPress={() => handleReadMore(item)}>
                                <Text style={styles.readMoreText}>Read more</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    );

    const handleReadMore = (selectedBook) => {
        // Navigate to the ReadMoreScreen and pass the selected book as a parameter
        navigation.navigate('ReadMore', { selectedBook });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Search for books</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder='Write book name here'
                    placeholderTextColor="#6f1d1b"
                    onChangeText={keyword => setKeyword(keyword)}
                value={keyword} />
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={fetchBook}    >
                    <Text style={styles.buttonText}>Search book</Text>
                </TouchableOpacity>


            </View>
            <FlatList
                data={results}
                style={styles.list}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    // Container style
    container: {
        marginTop: 10,
        alignItems: 'center',
    },
    // Read more button style
    readMorebutton: {
        width: "70%",
        borderRadius: 25,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6f1d1b",
        marginTop: 20,
    },
    // text in the Read More button
    readMoreText: {
        color: "white",
        fontSize: 16,
    },
    // Flatlist style
    list: {
        width: '100%',
        marginBottom: 100,
    },
    // list item direction, book and info next to each other
    row: {
        flexDirection: 'row',
    },

    // info text about the book, title etc.
    info: {
        flex: 2,
        paddingLeft: 15,
        justifyContent: 'center',
    },
    // button read more
    readmore: {
        width: 140,
        marginTop: 10,
    },
    // Search button style
    button: {
        marginBottom: 15,
        width: "50%",
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
        // Search input
        inputView: {
            borderColor: "#6f1d1b", 
            borderWidth: 1,
            borderRadius: 5,
            width: "80%",
            height: 50,
            marginBottom: 15,
            alignItems: "center",
            height: 40,
            fontSize: 18,
        },
        // text input
        TextInput: {
            height: 40,
            fontSize: 18,
            color: "#6f1d1b",
        },

        header: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,

        }
});