import React, {useState, useContext} from 'react';
import LoginImage from "../../Images/login.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import Style from "../../Styles/Core.style";
import {Link} from '@react-navigation/native'
import { AuthContext } from '../../context/AuthContext';
import Toast  from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Parent,
  Container,
  FormContainer,
  InputContainer,
  ButtonContainer,
} from "../../Styles/Container.style";

import {
  Image,
  Title,
  Input,
  Forgot,
  ButtonText,
  Desc,
} from "../../Styles/Elements.style";

function alert(type, message){
  Toast.show({
    type: type,
    text1: message
  });
}

const Login = () => {

  const {setLoggedIn} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const handleInput = (name, value) => {
    setData({...data, [name] : value});
  }

  const submitData = () => {
    if(!data.email || !data.password){
      alert('error', 'All the fields are required!')
    }else{

      setLoading(true)
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      fetch('http://localhost/note/login.php', {
        method: "POST",
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
        body: formData
      }).then(a => a.json())
      .then(async res => {

        // ERROR 01 MEANS THERE HAVE AN ERROR 
        if(res.error === '01'){
         alert('error', res.message);
         setLoading(false)
        }else{
          alert('success', res.message);
          setData({email: '', password: ''});
         
          await AsyncStorage.setItem('app_authObj', JSON.stringify({
            id : res.user.id,
            name: res.user.name,
            email: res.user.email,
            date: res.user.joined
          }));

          setLoggedIn(true);
        }

        

      }).catch(err => {
        console.log('err')
      })

    }
  }


  return (
    <Parent>
      <Container>
        <Image source={LoginImage} width='230px' />

        <FormContainer>
          <Title>Sign in</Title>

          <InputContainer>
            <MaterialIcons name="alternate-email" style={[Style.iconStyle, {fontSize: 18}]} />
            <Input autoCapitalize='none' keyboardType='email-address' value={data.email} onChangeText={value => handleInput('email', value)} placeholder="Email ID" />
          </InputContainer>

          <InputContainer>
            <Fontisto name="locked" style={Style.iconStyle} />
            <Input value={data.password} onChangeText={value => handleInput('password', value)} secureTextEntry={showPassword} autoCapitalize='none' autoCorrect={false} placeholder="Password" />
            <Ionicons onPress={() => setShowPassword(!showPassword)} name={showPassword ? 'eye' : 'eye-off'} style={Style.eyeIconStyle} />
          </InputContainer>

          <Forgot align="right"><Link to={{screen: 'forgot'}}>Forgot password? </Link></Forgot>
          <ButtonContainer onPress={submitData}>
            <ButtonText>{loading ? 'Loading...' : 'Login'}</ButtonText>
          </ButtonContainer>

          <Desc>
            New to Logistics? <Link to={{screen: 'register'}}><Forgot>Register here</Forgot></Link>
          </Desc>
        </FormContainer>
      </Container>
      <Toast />
    </Parent>
  );
};

export default Login;
