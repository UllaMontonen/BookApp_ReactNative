import React, { useState } from "react";
import { StyleSheet, View, Keyboard, Alert, FlatList, Image } from 'react-native';
import { Input, Button, Icon, ListItem } from '@rneui/themed';
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
                        <ListItem.Title>{item.volumeInfo.title || 'Not available'}</ListItem.Title>
                        <ListItem.Subtitle>Author/s: {item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Author not available'}</ListItem.Subtitle>
                        <ListItem.Subtitle>Published year: {getPublishedYear(item.volumeInfo.publishedDate)}</ListItem.Subtitle>
                        <ListItem.Subtitle>Pages: {item.volumeInfo.pageCount || 'Not available'}</ListItem.Subtitle>
                        <Button style={styles.readmore}
                            title="Read more"
                            onPress={() => handleReadMore(item)}
                        />
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
    },
    readmore: {
        width: 140,
        marginTop: 10,
    }
});