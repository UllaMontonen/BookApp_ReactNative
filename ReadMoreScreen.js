import React, { useState, useEffect } from "react";
import { StyleSheet, View, Keyboard, Alert, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, ListItem } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function ReadMoreScreen( {navigation}) {

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
                    defaultSource={require('./pictures/placeholder.png')}
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
                    <View style={styles.searchbutton}>
                            <TouchableOpacity 
                                 >
                                <Text style={styles.searchText}>Add to readinglist</Text>
                            </TouchableOpacity>
                        </View>
                     <View style={styles.searchbutton}>
                            <TouchableOpacity 
                                 onPress={() => navigation.navigate('SearchView')}>
                                <Text style={styles.searchText}>Back to search</Text>
                            </TouchableOpacity>
                        </View>
                </View>
                </View>
        </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    // Container style
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white",
    },
    // Flatlist style
    list: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
    },
    info: {
        paddingLeft: 15,
    },
    header: {
        marginBottom: 15,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        marginBottom: 5,
    },
    description: {
        padding: 20,
    },
    // Back to search button
    searchbutton: {
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
    // Back to search text
    searchText: {
        color: "white",
        fontSize: 16,
    },
    // aligning items to center
    center: {
        alignItems: "center",
    },
    showMore: {
        color: '#6f1d1b', marginTop: 5, marginBottom: 10, fontWeight: 'bold'
    }
});