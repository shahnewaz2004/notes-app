import React, {useState} from 'react';
import RegisterImage from "../../Images/register.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from "react-native-vector-icons/Ionicons";
import Style from "../../Styles/Core.style";
import {Link} from '@react-navigation/native';
import Toast  from 'react-native-toast-message';


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

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [data, setData] = useState({name: '', email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const handleInput = (name, value) => {
    setData({...data, [name] : value});
  }

  const submitData = () => {
    if(!data.name || !data.email || !data.password){
      alert('error', 'All the fields are required!')
    }else{

      setLoading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);

      fetch('http://localhost/note/register.php', {
        method: "POST",
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
        body: formData
      }).then(a => a.json())
      .then(res => {
        // ERROR 01 MEANS THERE HAVE AN ERROR 
        
        if(res.error === '01'){
         alert('error', res.message)
        }else{
          alert('success', res.message);
          setData({name: '', email: '', password: ''})
        }

        setLoading(false);

      }).catch(err => {
        console.log(err)
      })

    }
  }

  return (
    
    <Parent>
      <Container>
        <Image source={RegisterImage} width="200px"/>

        <FormContainer>
          
          <Title>Sign up</Title>

          <InputContainer>
            <FontAwesome name="user" style={[Style.iconStyle, {fontSize: 19}]} />
            <Input value={data.name} placeholder="Full name" onChangeText={value => handleInput('name', value)} />
          </InputContainer>

          <InputContainer>
            <MaterialIcons name="alternate-email" style={[Style.iconStyle, {fontSize: 18}]} />
            <Input autoCapitalize='none' value={data.email} keyboardType='email-address' placeholder="Email ID" onChangeText={value => handleInput('email', value)} />
          </InputContainer>

          <InputContainer>
            <Fontisto name="locked" style={Style.iconStyle} />
            <Input value={data.password} onChangeText={value => handleInput('password', value)} secureTextEntry={showPassword} autoCapitalize='none' autoCorrect={false} placeholder="Password" />
            <Ionicons onPress={() => setShowPassword(!showPassword)} name={showPassword ? 'eye' : 'eye-off'} style={Style.eyeIconStyle} />
          </InputContainer>

          <ButtonContainer onPress={submitData}>
            <ButtonText>{loading ? 'Loading...': 'Register'}</ButtonText>
          </ButtonContainer>

          <Desc>
            Joined us already? <Link to={{screen: 'login'}}><Forgot>Login here</Forgot></Link>
          </Desc>
        </FormContainer>
      </Container>
      <Toast />
    </Parent>
  );
};

export default Register;
