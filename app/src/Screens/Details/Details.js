import { useState, useEffect} from 'react';
import { DetailsHeader, DetailsLarg, SettingContainer } from '../../Styles/Container.style'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DetailsDescInput, DetailsTitleInput, Forgot, Title } from '../../Styles/Elements.style';
import Style from '../../Styles/Core.style';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

function alert(type, message){
  Toast.show({
    type: type,
    text1: message
  });
}

const Details = ({navigation, route}) => {
  const [data, setData] = useState({title: '', desc: '', noteId: ''});
  
  useEffect(function(){
    const noteTitle = route.params.title || '';
    const noteDesc = route.params.description || '';
    const noteId = route.params.noteId || 'noteId';
    setData({title: noteTitle, desc: noteDesc, noteId: noteId});
    
  }, [route.params])

  const handleInput = (name, value) => {
    setData({...data, [name] : value});
  }

  const submitData = () => {
    AsyncStorage.getItem('app_authObj').then(value => {
      if(value !== null){
        if(data.title || data.desc){
      
            const formData = new FormData();
              formData.append('userId', JSON.parse(value).id);
              formData.append('title', data.title);
              formData.append('desc', data.desc);
              formData.append('noteId', data.noteId)
            fetch('http://localhost/note/insert.php', {
              method: "POST",
              headers: {
                'Content-Type' : 'multipart/form-data'
              },
              body: formData
            }).then(a => a.json())
            .then(res => {

              // // ERROR 01 MEANS THERE HAVE AN ERROR 
              if(res.error === '01'){
                alert('error', res.message)
              }else{
                navigation.navigate('notes')
              }

            }).catch(err => { 
              console.log(err)
          })

        }else{
          navigation.navigate('notes')
        }
      }
  })

  }

  const deleteNote = () => {
    const formData = new FormData();
    formData.append('noteId', data.noteId);
    fetch('https://app.pencil.shahnewazrakib.me/delete.php', {
       method: "POST",
       headers: {
                'Content-Type' : 'multipart/form-data'
              },
       body: formData
    }).then(a => a.json())
    .then(res => {
      navigation.navigate('notes');
    }).catch(err => { 
      console.log(err)
    })
  }


  return (
    <SettingContainer>
        <DetailsHeader>
            <FontAwesome onPress={submitData} color={'#aaa'} size={22} name='chevron-left' style={Style.backButton} />
            <Title color="#4b7bec" fSize="20px">Details</Title>
           {
            data.noteId !== 'noteId' && <MCI onPress={deleteNote} name='delete-circle' size={35} style={Style.deleteIcon}/>
           }
        </DetailsHeader>

        <DetailsLarg>
            <DetailsTitleInput value={data.title} onChangeText={value => handleInput('title', value)} placeholder="Title..." />
            <DetailsDescInput value={data.desc} onChangeText={value => handleInput('desc', value)} style={Style.detailsLarg}  multiline = {true} numberOfLines={10} placeholder="Type here..."/>
            <Forgot align="left">{route.params.date || 'New Todo'}</Forgot>
        </DetailsLarg>

      <Toast />
    </SettingContainer>
  )
}

export default Details