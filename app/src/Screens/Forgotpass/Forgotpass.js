import React, {useState} from 'react';
import ForgotImage from '../../Images/forgot.png'
import { Parent, Container, FormContainer, InputContainer, ButtonContainer } from '../../Styles/Container.style';
import { Image, Title, Input, Forgot, ButtonText, Desc } from '../../Styles/Elements.style';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Style from '../../Styles/Core.style';
import Toast from 'react-native-toast-message/';
function alert(type, message){
  Toast.show({
    type: type,
    text1: message
  });
}

const Forgotpass = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = function(){
    if(!email){
      alert('error', 'Enter your email');
    }else{
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      fetch('http://localhost/note/validEmail.php', {
        method: 'POST',
        headers: {
          'Content-type' : 'multipart/form-data'
        },
        body: formData
      }).then(a => a.json())
      .then(res => {
        setLoading(false);
        setEmail('');
        if(res.error === '01'){
          alert('error', res.message)
        }else{
          navigation.navigate('code');
        }

      }).catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <Parent>
    <Container>
      <Image source={ForgotImage} width='230px' />

      <FormContainer>
        <Title>Forgot Password?</Title>

        <InputContainer>
          <MaterialIcons name="alternate-email" style={[Style.iconStyle, {fontSize: 18}]} />
          <Input value={email} onChangeText={value => setEmail(value)} autoCapitalize='none' keyboardType='email-address' placeholder="Email ID" />
        </InputContainer>

        <ButtonContainer onPress={onSubmit}>
          <ButtonText>{loading ? 'Sending...' : 'Send Code'}</ButtonText>
        </ButtonContainer>

        <Desc onPress={() => navigation.goBack()}>
           <Forgot>← Go back</Forgot>
        </Desc>
      </FormContainer>
    </Container>
    <Toast />
  </Parent>
  )
}

export default Forgotpass