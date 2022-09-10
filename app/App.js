import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts} from 'expo-font';
import {Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from "@expo-google-fonts/poppins";
import { Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/context/AuthContext';

// IMPORT THE AUTH HERE  
import LoginAuth from "./src/Auth/LoginAuth";
import HomeAuth from "./src/Auth/HomeAuth";
import Splash from './src/Screens/Splash/Splash.js';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect( function(){
    setTimeout(function(){
      setLoading(false)
    }, 2000) 

    AsyncStorage.getItem('app_authObj').then(value => {
      if(value !== null){
        setLoggedIn(true);
      }
    }) 

  }, []);

  
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular,
    Inter_600SemiBold,
    Inter_400Regular
  });

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  if (!fontsLoaded) {
    return <ActivityIndicator style={{justifyContent: 'center', height: '100%'}} size={50} color='dodgerblue'/>
  }

  if(loading){
    return <Splash />
  }

  return (
    <>
      <StatusBar style="auto"/>
      <AuthContext.Provider value={{setLoggedIn}}>
        <NavigationContainer theme={MyTheme}>
          {
            loggedIn ? <HomeAuth /> : <LoginAuth />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
