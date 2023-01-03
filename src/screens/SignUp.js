import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

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
    /*
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = auth().currentUser;
        user.updateProfile({
          displayName: name,
          username: username,
        });
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      }); */
      return null;
  };

  return (
    <PaperProvider style={styles.container}>
      <View style={styles.container}>
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
          onChangeText={setEmail}
          mode="outlined"
          style={styles.forms}
        />
        <TextInputPaper
          label="Password"
          value={password}
          onChangeText={setPassword}
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
    bottomContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    mainCard: {
      width: '100%',
      height: '80%',
      paddingBottom: "50%",
      paddingTop: "10%",
      borderRadius: 50
    },
    forms: {
      minWidth: "80%",
      maxWidth: "80%",
      marginBottom: 20,
      alignSelf: 'center'
    }
  })
  export default SignUp;