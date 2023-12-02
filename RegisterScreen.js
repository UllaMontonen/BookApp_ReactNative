import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
//import auth from '@react-native-firebase/auth';
//import database from '@react-native-firebase/database';

{/** 
const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  auth()
  .createUserWithEmailAndPassword('email', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });

  const handleRegistration = async () => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    
        // Access the user details
        const user = userCredential.user;
    
        // Save additional user data to Firebase Realtime Database
        await database().ref(`/users/${user.uid}`).set({
          email: user.email,
        });
    
        // Navigate to the login screen or any other screen as needed
      } catch (error) {
        console.error('Registration error:', error.message);
      }
  };s

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your email"
          placeholderTextColor="white"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your password"
          placeholderTextColor="white"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          value={password}
        />
      </View>
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegistration}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white",
    },

  // registration button
  registerBtn: {
    width: "40%",
    borderRadius: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    backgroundColor: "#6f1d1b",
  },
});

export default RegisterScreen;
*/}