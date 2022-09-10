import React, {useState} from 'react';
import { Parent, Container, FormContainer, InputContainer, ButtonContainer } from '../../Styles/Container.style';
import {Title, Input, Forgot, ButtonText, Desc } from '../../Styles/Elements.style';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Style from '../../Styles/Core.style';
import Toast from 'react-native-toast-message/';
function alert(type, message){
  Toast.show({
    type: type,
    text1: message
  });
}

const Code = ({navigation}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = function(){
    if(!code){
      alert('error', 'Code is not valid');
    }else{
      setLoading(true);
      const formData = new FormData();
      formData.append('code', code);

      fetch('http://localhost/note/checkCode.php', {
        method: 'POST',
        headers: {
          'Content-type' : 'multipart/form-data'
        },
        body: formData
      }).then(a => a.json())
      .then(res => {
        setLoading(false);
        setCode('');
        if(res.error === '01'){
          alert('error', res.message)
        }else{
          navigation.navigate('newpassword', res.email)
        }
        
      }).catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <Parent>
    <Container>

      <FormContainer>
        <Title>Enter code</Title>

        <InputContainer>
          <MaterialIcons name="code" style={[Style.iconStyle, {fontSize: 18}]} />
          <Input value={code} onChangeText={value => setCode(value)} autoCapitalize='none' placeholder="e.g 19736ek21" />
        </InputContainer>

        <ButtonContainer onPress={onSubmit}>
          <ButtonText>{loading ? 'Checking...' : 'Continue'}</ButtonText>
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

export default Code;