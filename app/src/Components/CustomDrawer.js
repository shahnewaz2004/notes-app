import { useContext, useState, useEffect } from "react";
import { Share } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList
} from "@react-navigation/drawer";
import UserImage from '../Images/user.jpg';
import { DrawerContainer, ItemContainer, DrawerHeader, BottomContainer, DrawerHeaderInner, LogoutContainer, ShareContainer } from "../Styles/Container.style";
import { BottomText, DrawerDesc, Title, Uimage } from "../Styles/Elements.style";
import Style from '../Styles/Core.style'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';

const CustomDrawer = (props) => {

  const {setLoggedIn} = useContext(AuthContext);
  const [user, setUser] = useState({}); 
 
  const onShare = async () => {
    try {
       await Share.share({
        message: 'Notes APP. List your notes and get it done 😀! http://google.com',
      });
    } catch (error) {
      alert(error.message);
    }
  };
  
  const logout = async () => {
    try{
      await AsyncStorage.removeItem('app_authObj');
      setLoggedIn(false);
    }catch(err){
      alert('Failed to logout!')
    }
  }

  const getUser =  function (){
    AsyncStorage.getItem('app_authObj').then(value => {
      if(value !== null){
        setUser(JSON.parse(value))
      }
    }) 
  }

  useEffect(function(){
    getUser();
  }, [])

    return (
      <DrawerContainer>
        <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#2e86de'}}>
            <DrawerHeader>
              <Uimage source={UserImage} />
              <DrawerHeaderInner>
                <Title fFamily="Poppins_500Medium" fSize="16px" color="white">{user.name}</Title>
                <DrawerDesc>{`Joined on ${user.date}`}</DrawerDesc>
              </DrawerHeaderInner>
            </DrawerHeader>

            <ItemContainer>
              <DrawerItemList {...props} />
            </ItemContainer>
        </DrawerContentScrollView>

        <BottomContainer>
          <ShareContainer>
            <FontAwesome name="share-alt" style={[Style.iconStyle, Style.logoutIcon]} />
            <BottomText onPress={onShare}>Tell a friend</BottomText>
          </ShareContainer>

          <LogoutContainer>
            <FontAwesome name="sign-out" style={[Style.iconStyle, Style.logoutIcon]} />
            <BottomText onPress={logout}> Sign Out </BottomText>
          </LogoutContainer>
        </BottomContainer>
      </DrawerContainer>
    );
  };
  
  export default CustomDrawer;
  