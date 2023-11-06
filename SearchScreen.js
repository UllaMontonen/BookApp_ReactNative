import React, { useState } from "react";
import { StyleSheet, View, Keyboard, Alert, Text, FlatList, Image } from 'react-native';
import { Input, Button, Icon, ListItem } from '@rneui/themed';


export default function SearchScreen() {

    // searched books
    const [keyword, setKeyword] = useState('');
    // Results Google Books API returns
    const [results, setResults] = useState([]);

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


    // Kuva = imageLinks.smallThumbnail
    // "imageLinks": {
    //    "smallThumbnail": "http://books.google.com/books/content?id=ac6OEAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    //    "thumbnail": "http://books.google.com/books/content?id=ac6OEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    //  },

   

// <ListItem.Subtitle>{item.volumeInfo.description}</ListItem.Subtitle>


// HOX!!! KOKEILE SMALL THUMBNAIL VAIHTOEHTOA!!

    // Rendering books for flatlist
    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <View style={styles.row}>
                <Image
        style={{ width: 100, height: 200, flex: 1 }}
        source={{
            uri: `${item.volumeInfo.imageLinks.thumbnail}`,
        }}
    />
    <View style={styles.info}>
                    <ListItem.Title>{item.volumeInfo.title}</ListItem.Title>
                    <ListItem.Subtitle>Author/s: {item.volumeInfo.authors}</ListItem.Subtitle>
                    <ListItem.Subtitle>Published year: {item.volumeInfo.publishedDate}</ListItem.Subtitle>
                    <ListItem.Subtitle>Pages: {item.volumeInfo.pageCount}</ListItem.Subtitle>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    );

    return (
        <View style={styles.container}>
            <Input
                label='Searching for books'
                placeholder='Write book name here'
                onChangeText={keyword => setKeyword(keyword)}
                value={keyword} />
            <View style={styles.button}>
                <Button raised icon={{ name: 'search', color: "white" }} onPress={fetchBook} title="Search book" />
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
    // Button style
    button: {
        marginBottom: 10,
        width: 200,
    },
    // Flatlist style
    list: {
        width: '100%',
        marginBottom: 100,
    },
    row: {
        flexDirection: 'row',
    },
    info: {
        flex: 2,
        paddingLeft: 15,
        justifyContent: 'center',
    }
});