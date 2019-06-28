import { createAppContainer, createStackNavigator } from "react-navigation";
import HomePage from "./screens/HomePage";
import LoadingPage from "./screens/LoadingPage";
import * as firebase from "firebase";
import SignInPage from "./screens/SignInPage";
import SignUpPage from "./screens/SignUpPage";
import PrivateChatPage from "./screens/PrivateChatPage";

var firebaseConfig = {
  apiKey: "AIzaSyA3IiXHr_8bmSO2LSsq4N48gkmZzAuxGRM",
  authDomain: "reactnativewhatsapp.firebaseapp.com",
  databaseURL: "https://reactnativewhatsapp.firebaseio.com",
  projectId: "reactnativewhatsapp",
  storageBucket: "",
  messagingSenderId: "1075400460123",
  appId: "1:1075400460123:web:796658b858967297"
};
firebase.initializeApp(firebaseConfig);

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomePage },
    Loading: { screen: LoadingPage },
    Signin: { screen: SignInPage },
    Signup: { screen: SignUpPage },
    PrivateChat: { screen: PrivateChatPage }
  },
  {
    // initialRouteName: "PrivateChat"
    initialRouteName: "Loading"
    // defaultNavigationOptions: {
    //   header: null
    // }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
