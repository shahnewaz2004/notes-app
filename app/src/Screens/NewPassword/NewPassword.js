import React, {useState} from 'react'
import { ButtonContainer, InputContainer, SettingBottom, SettingContainer} from '../../Styles/Container.style'
import { ButtonText, Input, Title } from '../../Styles/Elements.style'
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast  from 'react-native-toast-message';

function alert(type, message){
  Toast.show({
    type: type,
    text1: message
  });
}


const NewPassword = ({navigation, route}) => {

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');

  const submitData = () => {
    if(!password){
      alert('error', 'Password is required');
    }else if(password.length < 8){
        alert('error', 'Password must be at least 8 character long')
    }else{
            setLoading(true);
            const formData = new FormData();
            formData.append('new_pass', password);
            formData.append('email', route.params);

            fetch('http://localhost/note/setNewPassword.php', {
              method: "POST",
              headers: {
                'Content-Type' : 'multipart/form-data'
              },
              body: formData
            }).then(a => a.json())
            .then( res => {
              // ERROR 01 MEANS THERE HAVE AN ERROR 
              if(res.error === '01'){
                 alert('error', res.message)
                 setLoading(false)
              }else{
                navigation.replace('login')
              }


            }).catch(err => {
              console.log(err)
            })
    }
  }


  return (
    <SettingContainer>
  
      <SettingBottom>
        <Title fSize="20px">Change Password</Title>
        <InputContainer>
              <Fontisto name="locked" style={Style.iconStyle} />
              <Input value={password} onChangeText={value => setPassword(value)} secureTextEntry={showPassword} autoCapitalize='none' autoCorrect={false} placeholder="New Password" />
              <Ionicons onPress={() => setShowPassword(!showPassword)} name={showPassword ? 'eye' : 'eye-off'} style={Style.eyeIconStyle} />
        </InputContainer>

        <ButtonContainer onPress={submitData}>
            <ButtonText>{loading ? 'Loading...' : 'Update'}</ButtonText>
        </ButtonContainer>
      </SettingBottom>
      <Toast />
    </SettingContainer> 
  )
}

export default NewPassword