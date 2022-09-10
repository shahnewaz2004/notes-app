import { createDrawerNavigator } from "@react-navigation/drawer";
import Notes from "../Screens/Notes/Notes";
import Setting from "../Screens/Setting/Setting";
import About from "../Screens/About/About";
import Details from "../Screens/Details/Details";
import CustomDrawer from "../Components/CustomDrawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HomeAuth = () => {
  const Drawer = createDrawerNavigator();
  
  return (
    <Drawer.Navigator
      initialRouteName="notes"
      screenOptions={{
        drawerActiveBackgroundColor: "#c7ecee",
        drawerActiveTintColor: "#222f3e",
        drawerInactiveTintColor: "#747d8c",
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15
        },

        drawerItemStyle: {
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
          paddingLeft: 25
        }
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="notes" component={Notes}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="book" color={color} size={20} />
          ),
          drawerLabel: "Notes",
        }}
      />

      <Drawer.Screen name="setting" component={Setting}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="gear" color={color} size={20} />
          ),
          drawerLabel: "Setting",
        }}
      />

      <Drawer.Screen name="about" component={About}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome name="question-circle" color={color} size={20} />
          ),
          drawerLabel: "About Developer",
        }}
      />

      <Drawer.Screen name="details" component={Details}
        options={{
          drawerItemStyle: {display: 'none'}
        }} 
      />

    

    </Drawer.Navigator>
  );
};

export default HomeAuth;
