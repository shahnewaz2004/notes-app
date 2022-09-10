import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import { ButtonContainer, InputContainer, SettingBottom, SettingContainer} from '../../Styles/Container.style'
import { ButtonText, Forgot, Input, Title } from '../../Styles/Elements.style'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast  from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

function alert(type, message){
  Toast.show({
    type: type,
    text1: message
  });
}


const Setting = () => {

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const [data, setData] = useState({old_pass: '', new_pass: ''});
  const handleInput = (name, value) => {
    setData({...data, [name] : value});
  }

  const submitData = () => {
    if(!data.old_pass || !data.new_pass){
      alert('error', 'Passwords are required');
    }else{
      AsyncStorage.getItem('app_authObj').then(value => {
        if(value !== null){
            setLoading(true);
            const formData = new FormData();
            formData.append('email', JSON.parse(value).email);
            formData.append('old_pass', data.old_pass);
            formData.append('new_pass', data.new_pass);

            fetch('http://localhost/note/updatePassword.php', {
              method: "POST",
              headers: {
                'Content-Type' : 'multipart/form-data'
              },
              body: formData
            }).then(a => a.json())
            .then(async res => {

              // ERROR 01 MEANS THERE HAVE AN ERROR 
              if(res.error === '01'){
                 alert('error', res.message)
              }else{
                alert('success', res.message);
                setData({old_pass: '', new_pass: ''});
              }

              setLoading(false)

            }).catch(err => {
              console.log(err)
            })
         }
      })

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
    <SettingContainer>
  
        <View>
          
          <Title fSize="18px">{user.name}</Title>
          <Forgot align="left" color="gray" fSize="15px" style={Style.forgot}>{user.email}</Forgot>
          <Forgot align="left" color="gray" fSize="15px">{`Joined on: ${user.date}`}</Forgot>
        </View>
      

      <SettingBottom>
        <Title fSize="20px">Change Password</Title>
        <InputContainer>
              <Fontisto name="locked" style={Style.iconStyle} />
              <Input value={data.old_pass} onChangeText={value => handleInput('old_pass', value)} secureTextEntry={showPassword1} autoCapitalize='none' autoCorrect={false} placeholder="Old Password" />
              <Ionicons onPress={() => setShowPassword1(!showPassword1)} name={showPassword1 ? 'eye' : 'eye-off'} style={Style.eyeIconStyle} />
        </InputContainer>

        <InputContainer>
              <Fontisto name="locked" style={Style.iconStyle} />
              <Input value={data.new_pass} onChangeText={value => handleInput('new_pass', value)} secureTextEntry={showPassword2} autoCapitalize='none' autoCorrect={false} placeholder="New Password" />
              <Ionicons onPress={() => setShowPassword2(!showPassword2)} name={showPassword2 ? 'eye' : 'eye-off'} style={Style.eyeIconStyle} />
        </InputContainer>

        <ButtonContainer width="50%" onPress={submitData}>
            <ButtonText>{loading ? 'Loading...' : 'Save'}</ButtonText>
        </ButtonContainer>
      </SettingBottom>
      <Toast />
    </SettingContainer> 
  )
}

export default Setting