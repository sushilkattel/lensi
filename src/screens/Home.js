import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { logout } from '../config/firebase';

import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  TextInput as TextInputPaper,
  Card,
  Avatar,
  Divider,
  IconButton,
} from 'react-native-paper';

const Home = ({ navigation }) => {
  const healthStatus = "GOOD"
  return (
    <PaperProvider style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headers}>
        <View style={styles.upper}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <View style={styles.outBtn}>
          <Button
              onPress={logout}
              labelStyle={styles.signOutMain} 
              >Sign Out</Button>
            </View>
            </View>
          <Avatar.Image size={150} source={require('../assets/good.png')} backgroundColor={"transparent"}/>
          <Text style={styles.healthHeader}>LENS HEALTH</Text>
          <Text style={styles.health}>{healthStatus}</Text>
        </View>
      <View style={styles.bottomContainer}>
      <Card style={styles.mainCard}>
        <Text style={styles.mainStat}>0</Text>
        <Text style={styles.mainHeader}>DAYS REMAINING</Text>
        <Divider bold={true} style={styles.divider} />
        <Text style={styles.mainStat}>0</Text>
        <View>
        <Text style={styles.mainHeader}>HOURS WORN</Text>
        <Text style={styles.mainToday}>TODAY</Text>
        </View>
        <Divider bold={true} style={styles.divider} />
        <Text style={styles.mainStat}>0</Text>
        <Text style={styles.mainHeader}>HOURS{'\n'}REMAINING</Text>
        <Divider bold={true} style={styles.divider} />
        <IconButton
          icon="plus"
          iconColor={"white"}
          backgroundColor={"#1D637A"}
          size={40}
          style={{alignSelf: "center",}}
        />
      
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
      justifyContent: 'flex-start',
      alignItems:'center',
      height: '35%',
      paddingTop: '6%',
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
      minWidth: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
    },
    mainCard: {
      minWidth: '100%',
      height: '100%',
      paddingTop: "10%",
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: "10%"
    },
    forms: {
      minWidth: "80%",
      maxWidth: "80%",
      marginBottom: 20,
      alignSelf: 'center',
      borderRadius: 50
    },
    outBtn: {
      position: 'absolute', //Here is the trick
      right: 0, //Here is the trick
    },
    logo: {
      width: "20%",
      height: "100%",
      resizeMode: 'contain',
    },
    upper: {
      width: "100%",
      height: "30%",
      alignItems: "center",
      flexDirection: "row",
      paddingLeft: "4%"
    },
    healthHeader: {
      fontSize: 18,
      color: "white",
      fontWeight: "bold"
    },
    health: {
      fontSize: 20,
      color: "#20D78A",
      fontWeight: "bold"
    },
    mainStat: {
      color: "#1D637A",
      fontWeight: "bold",
      fontSize: 48, 
      textAlign: "center"
    },
    mainHeader: {
      color: "#1D637A",
      fontSize: 18,
      textAlign: "center"
    },
    mainToday: {
      color: "#1D637A",
      fontSize: 16,
      textAlign: "center",
      fontWeight: "bold"
    },
    divider: {
      height: "1%",
      marginHorizontal: "10%",
      marginVertical: "4%"
    },
    signOutMain: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold"
    }
  })
  export default Home;