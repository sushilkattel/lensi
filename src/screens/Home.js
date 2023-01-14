import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { logout, setEndData, setStartData } from '../config/firebase';

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
import { getHealthColor, user } from '../components/utils';
import MenuPop from '../components/MenuPop';


const Home = ({ navigation }) => {
  const userTemp = useState({days: 0, worn: 0, remaining: 0, startExists: false, scoreStatus: "GOOD"})
  const [User, setUser] = useState(userTemp);
  const [startIcon, setStartIcon] = useState(User.startExists);
  const [healthImg, setHealthImg] = useState(require("../assets/GOOD.png"))
  const [getForceUpdate, setForceUpdate] = useState(false);

  const healthStatus = User.scoreStatus;

  const handleStart = async () => {
    if(startIcon == "play") {
      setStartData()
      setStartIcon("stop")
    }
    if(startIcon == "stop") {
      await setEndData()
      setStartIcon("play")
      setForceUpdate(true);
    }
    return null;
  }


  useEffect(() => {
    if(getForceUpdate == true) {
      console.log("SET TO FALSE")
      setForceUpdate(false);
    }
    const fetch = async () => {
      const currUser = await user();
      setUser(currUser);
      const getStartStatus = () => {
        if(currUser.startExists) {
          return "stop";
        }
        return "play";
      }
      setStartIcon(getStartStatus());
      if(await healthStatus == "OK") {
        setHealthImg(require("../assets/OK.png"))
      }
      if(await healthStatus == "BAD") {
        setHealthImg(require("../assets/BAD.png"))
      }
    }
    fetch();
  }, [getForceUpdate])
  
  const healthColor = getHealthColor(healthStatus);
  //Control image of health

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
          <Avatar.Image size={150} source={healthImg} backgroundColor={"transparent"}/>
          <Text style={styles.healthHeader}>LENS HEALTH</Text>
          <Text style={[styles.health, {color: healthColor}]}>{healthStatus}</Text>
          <TouchableOpacity onPress={() => handleStart()}>
          <IconButton
          icon={startIcon}
          iconColor={"#1D637A"}
          backgroundColor={"white"}
          size={20}
          style={{alignSelf: "center",}}
        />
        </TouchableOpacity>
        </View>
      <View style={styles.bottomContainer}>
      <Card style={styles.mainCard}>
        <Text style={styles.mainStat}>{User.days}</Text>
        <Text style={styles.mainHeader}>DAYS REMAINING</Text>
        <Divider bold={true} style={styles.divider} />
        <Text style={styles.mainStat}>{User.worn}</Text>
        <View>
        <Text style={styles.mainHeader}>HOURS WORN</Text>
        <Text style={styles.mainToday}>TODAY</Text>
        </View>
        <Divider bold={true} style={styles.divider} />
        <Text style={styles.mainStat}>{User.remaining}</Text>
        <Text style={styles.mainHeader}>HOURS{'\n'}REMAINING</Text>
        <Divider bold={true} style={styles.divider} />
        <MenuPop forceAnUpdate={() => setForceUpdate(true)} />
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
      height: '30%',
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
      paddingTop: "5%",
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingBottom: "10%",
      backgroundColor: "white"
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
    },
    lower: {
      width: "100%",
      alignItems: "center",
      alignSelf: "center",
      flexDirection: "row",
    }
  })
  export default Home;