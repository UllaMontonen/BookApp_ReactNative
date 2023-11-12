import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, Alert, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, ListItem } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';


export default function ReadMoreScreen() {

    const route = useRoute();
    const { selectedBook } = route.params;
    // Show more function for the description part
    const [showFullDescription, setShowFullDescription] = useState(false);

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


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedBook.volumeInfo.title}</Text>
                </View>
                <Image
                    style={{ width: 150, height: 200, marginBottom: 15 }}
                    source={{
                        uri: selectedBook.volumeInfo.imageLinks?.thumbnail || './pictures/placeholder.png',
                    }}
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
                            <Text style={{ color: 'blue' }}>...</Text>
                        )}
                    </Text>
                    {selectedBook.volumeInfo.description?.length > 300 && (
                        <TouchableOpacity onPress={toggleDescription}>
                            <Text style={{ color: 'blue', marginTop: 5 }}>
                                {showFullDescription ? 'Show Less' : 'Show More'}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    );
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
    },
    header: {
        marginBottom: 20,
        marginTop: 10,
    },
    text: {
        marginBottom: 5,
    },
    description: {
        padding: 20,
    }
});