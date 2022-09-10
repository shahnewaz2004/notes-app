import styled from "styled-components/native";

export const Image = styled.Image`
  width: ${props => props.width};
  height: ${props => props.height || 'auto'};
  aspect-ratio: 1;
  margin: 0 auto 30px auto;
`;

export const Title = styled.Text`
  color: ${props => props.color || '#222f3e'};
  font-family: ${props => props.fFamily || "Poppins_700Bold"};
  font-size: ${props => props.fSize || '30px'};
  text-align: ${props => props.align || 'left'};
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  border-color: #a8a7a7;
  flex: 1;
  font-family: "Poppins_500Medium";
  padding: 10px 0;
  margin-left: 15px;
`;

export const Forgot = styled.Text`
  font-family: "Inter_400Regular";
  text-align: ${props => props.align || 'center'};
  font-size: ${props => props.fSize || '14px'};
  color: ${props => props.color || '#4b7bec'};
  line-height: 20px;
`;

export const Desc = styled.Text`
  font-family: "Inter_400Regular";
  text-align: ${props => props.align || 'center'};
  margin-top: 20px;
  color: #a8a7a7;
`;

export const ButtonText = styled.Text`
  font-family: "Poppins_500Medium";
  text-align: center;
  color: white;
  line-height: 45px;
`;

export const Uimage = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  border-width: 3px;
  border-color: skyblue;
  margin-bottom:10px;
`
export const DrawerDesc = styled.Text`
  font-size: 14px;
  color: #c8d6e5;
`

export const BottomText = styled.Text`
  color: gray;
  font-size: 15px;
  padding: 0 0 0 15px;
  font-family: 'Poppins_400Regular';
`

export const SearchInput = styled.TextInput`
  background-color: #EDEDED;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 0 15px;
  font-family: 'Poppins_400Regular';
`

export const TodoItem = styled.TouchableOpacity`
  width: 48%;
  background-color: #FAF6D2;
  border-width: 1px;
  border-color: #dfe4ea;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 15px;
`


export const DetailsTitleInput = styled.TextInput`
  width: 100%;
  font-family: 'Poppins_700Bold';
  font-size: 20px;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-color: #aaa;

`

export const DetailsDescInput = styled.TextInput`
  width: 100%; 
  height: 85%;
  padding: 20px 0;
  font-size: 15px;
  font-family: 'Inter_400Regular';
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin-bottom: 10px;
`

export const AboutText = styled.Text`
  font-family: 'Poppins_400Regular';
  margin-top: 30px;
  line-height: 28px;
`