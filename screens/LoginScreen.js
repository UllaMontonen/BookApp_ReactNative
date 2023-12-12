import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';


// This is the Login screen. The login function utilizes Firebase authentication.
// After a successful login, the user gains access to the app.
// Users can also create a new account if they don't have one yet.


export default function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    const auth = getAuth();

    // Navigation to RegisterScreen
    const handleRegister = () => {
        navigation.navigate('Register');
    };
    
    const handleHome = () => {
        navigation.navigate('Tab');
    };


    useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);
     handleHome;
     return () => unsubscribe();
      }, []);

 // Handle user state changes
  const onAuthStateChangedHandler = (user) => {
    
    if (initializing) {
      setInitializing(false);
      console.log("initialized done");
    }
    setUser(user);
    console.log("set user: ", user);
  };

    // Login function
    const onPressLogin = async () => {
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Signed in 
            const user = userCredential.user;
            alert("Login successful");
            console.log("set after signing in: ", user.email);
           
            if (user) {
                const uid = user.uid;
                setInitializing(false); 
                console.log("uid", uid);

            } else {
                console.error("User is still null after login");
            }

        } catch (error) {
            // Error handling
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error:", errorCode, errorMessage);
        }
    };



    return (

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login to ReadBook</Text>
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
            <TouchableOpacity style={styles.loginBtn}>
                <Text onPress={onPressLogin} style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text onPress={handleRegister} style={styles.register}>Create a new account</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    // whole page
    container: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white",
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
    // loging button
    loginBtn: {
        width: "40%",
        borderRadius: 25,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        backgroundColor: "#6f1d1b",
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
    // create new account button
    register: {
        marginTop: 20,
        color: "#6f1d1b",
        fontWeight: 'bold',
    }

});