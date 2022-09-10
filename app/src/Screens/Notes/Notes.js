import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NoteAddContainer, NotesContainer, NotesHeader, SearchContainer, TodoSmContainer } from '../../Styles/Container.style';
import Style from '../../Styles/Core.style';
import NotFound from '../../Images/notFound.png';
import {Forgot, Image, SearchInput, Title, TodoItem } from '../../Styles/Elements.style';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({navigation}) => {
  const [notes, setNotes] = useState();
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState();
  
  function loadNotes(){
    AsyncStorage.getItem('app_authObj').then(value => {
      if(value !== null){
        const uid = JSON.parse(value).id;
        setUserId(uid);
        const formData = new FormData();
        formData.append('userId', uid);

        fetch('http://localhost/note/getNotes.php', {
        method: "POST",
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
          body: formData
        }).then(a => a.json())
        .then(res => {

        // ERROR 01 MEANS THERE HAVE AN ERROR 
        if(res.error === '00'){
          setNotes(res.notes)
        }else{
          setNotes('');
        }

        }).catch(err => {
          console.log(err)
        })
      }
    }) 
  }

  function searchNotes(query){
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('query', query);

        fetch('https://app.pencil.shahnewazrakib.me/search.php', {
        method: "POST",
        headers: {
          'Content-Type' : 'multipart/form-data'
        },
          body: formData
        }).then(a => a.json())
        .then(res => {
          // ERROR 01 MEANS THERE HAVE AN ERROR 
          if(res.error === '00'){
            setNotes(res.notes);
          }

        }).catch(err => {
          console.log(err)
        })
    }

  useEffect(function(){
    loadNotes();
  }, [isFocused])

  return (
    <NotesContainer>

      <NotesHeader>
        <Ionicons onPress={() => navigation.openDrawer()} name='grid' size={30} color="#1e90ff" />
        <SearchContainer>
          <SearchInput placeholder='Search' onChangeText={value => searchNotes(value)} />
        </SearchContainer>
      </NotesHeader>

      <NoteAddContainer>
        <Title fSize="25px" fFamily="Inter_600SemiBold">Your Lists</Title>
        <IconButton onPress={() => navigation.navigate('details', [])} icon='plus' containerColor='#16a085' iconColor='white' />
     </NoteAddContainer>

      <ScrollView style={Style.scrollView} showsVerticalScrollIndicator={false}>
      <TodoSmContainer>

      {
       notes ? notes.map((value, index) => {
            return (
              <TodoItem key={index} onPress={() => navigation.navigate('details', value)}>
                <Title fSize="17px" style={Style.titleStyle}>{value.title}</Title>
                <Forgot align="left" color="gray">{value.description.slice(0, 100)}...</Forgot>
                <Forgot align="left" style={Style.date}>{value.date}</Forgot>
              </TodoItem>
            )
          }) : 
          <Image  source={NotFound} width='300px' height="400px" />
      }
        
      </TodoSmContainer>
      </ScrollView>


    </NotesContainer>
  )
}

export default Home