import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

import auth from "../config/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { registerUser } from '../config/firebase';

import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  TextInput as TextInputPaper,
  Card,
} from 'react-native-paper';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    if (email !== '' && password !== '') {
      try{
      setLoading(true)
      registerUser(email, password).then(() => {
        setLoading(false)
      })}
      catch(err) {
        setLoading(false);
        setError(err.message)
      };
    }
  }

  return (
    <PaperProvider style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headers}>
          <Text style={styles.headText}>Hey!</Text>
          <Text style={styles.joinText}>Join Now</Text>
        </View>
      <View style={styles.bottomContainer}>
      <Card style={styles.mainCard}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20, minWidth: '100%', textAlign: "center"}}>
          Sign up for Lensi
        </Text>
        {error && (
          <Text style={{ color: 'red', marginBottom: 20 }}>
            {error}
          </Text>
        )}
        <TextInputPaper
          label="Email"
          value={email}
          onChangeText={(text) => {setEmail(text)}}
          mode="outlined"
          style={styles.forms}
        />
        <TextInputPaper
          label="Password"
          value={password}
          onChangeText={(text) => {setPassword(text)}}
          mode="outlined"
          style={styles.forms}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            />
          )}
          <Text style={{ marginTop: 20, marginBottom: 20, textAlign: 'center' }}>
            Already have an account?
            <Text
              style={{ color: 'blue', }}
              onPress={() => navigation.navigate('Login')}
            >
              {' '}Log in
            </Text>
          </Text>
        </Card>
        </View>
        </View>
      </PaperProvider>
    );
  };
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#1D637A",
    },
    headers: {
      justifyContent: 'flex-end',
      alignItems:'flex-start',
      marginLeft: '10%',
      height: '35%'
    },
    headText: {
      fontSize: 50,
      color: 'white',
      fontWeight: 'bold'
    },
    joinText: {
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold'
    },
    bottomContainer: {
      height: "60%",
      width: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
    },
    mainCard: {
      width: '100%',
      height: '100%',
      paddingTop: "10%",
      borderRadius: 50,
      backgroundColor: "white"
    },
    forms: {
      minWidth: "80%",
      maxWidth: "80%",
      marginBottom: 20,
      alignSelf: 'center',
      borderRadius: 50
    }
  })
  export default SignUp;