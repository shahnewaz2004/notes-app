import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../Screens/Login/Login.js";
import Register from "../Screens/Register/Register.js";
import Forgotpass from "../Screens/Forgotpass/Forgotpass.js";
import Code from "../Screens/Code/Code.js";
import NewPassword from '../Screens/NewPassword/NewPassword.js';

const LoginAuth = function(){
    const Stack = createNativeStackNavigator();
    
      
    return(
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="login" component={Login} />
                <Stack.Screen options={{headerShown: false}} name="register" component={Register} />
                <Stack.Screen options={{headerShown: false}} name="forgot" component={Forgotpass} />
                <Stack.Screen options={{headerShown: false}} name="code" component={Code} />
                <Stack.Screen options={{headerShown: false}} name="newpassword" component={NewPassword} />
            </Stack.Navigator>
    )
}

export default LoginAuth;