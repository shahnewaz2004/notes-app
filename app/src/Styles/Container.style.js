import styled from "styled-components/native";

export const Parent = styled.View`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
`;

export const Container = styled.View`
  width: 100%;
`;

export const FormContainer = styled.View`
  width: 90%;
  margin: 0 auto;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 14px 0;
`;

export const ButtonContainer = styled.TouchableOpacity`
  width: ${props => props.width || '100%'};
  height: 45px;
  background-color: #4b7bec;
  border-radius: 5px;
  margin-top: 30px;
`;

export const DrawerContainer = styled.View`
  width: 100%;
  flex: 1;
`

export const DrawerHeader = styled.View`
  padding: 20px 15px 20px 15px;
  flex-direction: row;
  align-items: center;
`

export const DrawerHeaderInner = styled.View`
  margin-left: 10px;
`

export const ItemContainer = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 20px;
  margin-left: -20px;
`

export const BottomContainer = styled.View`
  border-top-width: 1px;
  border-color: #a8a7a7;
  padding: 15px 0 15px 10px;
`

export const LogoutContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`

export const ShareContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`

export const NotesContainer = styled.View`
    padding: 20px 15px;
`

export const NotesHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`

export const NoteAddContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

export const SearchContainer = styled.View`
  flex: 1;
  height: 45px;
  margin-left: 20px;
  position: relative;
`

export const TodoSmContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
`

export const SettingContainer = styled.View`
  padding: 20px;
`

export const SettingHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const SettingBottom = styled.View`
  margin-top: 80px;
`

export const DetailsHeader = styled.View`
  flex-direction: row;
  align-items: center;
`
export const DetailsLarg = styled.View`
  background-color: #FAF6D2;
  padding: 10px 15px;
  border-radius: 10px;
  margin-top: 20px;
  height: 90%;
`

export const AboutContainer = styled.View`
  padding: 20px;
`