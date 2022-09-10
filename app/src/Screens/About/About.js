import * as Linking from 'expo-linking';
import Developer from '../../Images/developer.jpg';
import {Desc, Image, Title, AboutText, Forgot } from '../../Styles/Elements.style';
import { AboutContainer } from '../../Styles/Container.style';
import Style from '../../Styles/Core.style';

const About = () => {
  return (
    <AboutContainer>
      <Image source={Developer} width="150px" style={Style.aboutUsImage} />
      <Title align="center" fSize="22px">Shahnewaz Rakib</Title>
      <Desc style={{marginTop: 0}}>Web and APP developer</Desc>

      <AboutText> Hey, I am Shahnewaz and I am a full stack WEB and APP developer. 
        This is a simple todo application that allows you keep your notes. 
        I built this application for my own portfolio but it's working great. 
        You can use is for your daily life.
      </AboutText>
      
      <AboutText>
        Know more: <Forgot onPress={() => Linking.openURL('https://shahnewazrakib.me')}>https://shahnewazrakib.me</Forgot>
      </AboutText>
    </AboutContainer>
  )
}

export default About