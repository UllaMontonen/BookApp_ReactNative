import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

// This is the Register screen. The register function utilizes Firebase authentication.
// After a successful registration, the user are navigated to the login screen.
// Users can also navigate to the login screen directly.


const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Registering a new user
  const handleRegistration = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        alert("Sign up successfully")
        navigation.navigate('LogIn');
      })
      // Error handling
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error ", error.code, ", ", error.message);
      });
  };

  // Navigating back to LogIn screen
  const handleLogIn = () => {
    navigation.navigate('LogIn');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Create a new account</Text>
      </View>
      <Image
        style={styles.imgae}
        source={require('../pictures/owl.webp')} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Write your email'
          placeholderTextColor="white"
          onChangeText={email => setEmail(email)}
          value={email} />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Write your password'
          placeholderTextColor="white"
          onChangeText={password => setPassword(password)}
          secureTextEntry={true}
          value={password} />
      </View>
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegistration}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={handleLogIn} style={styles.backlogin}>Back to login</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // whole page
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
  // text input area
  inputView: {
    backgroundColor: "#99582a",
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    height: 40,
    color: "white",
    fontSize: 18,
  },
  // text input (no placeholder)
  TextInput: {
    height: 40,
    color: "white",
    fontSize: 18,
  },
  // text in the button
  buttonText: {
    color: "white",
    fontWeight: 'bold',
    fontSize: 18,
  },
  // header style
  header: {
    marginBottom: 30,
    marginTop: 20,
},
  // image style
  imgae: {
    width: 100,
    height: 100,
    marginBottom: 30
},
  // back to login button
  backlogin: {
    marginTop: 20,
    color: "#6f1d1b",
    fontWeight: 'bold',
  }
});

export default RegisterScreen;
