import { createAppContainer, createStackNavigator } from "react-navigation";
import HomePage from "./screens/HomePage";
import LoadingPage from "./screens/LoadingPage";
import * as firebase from "firebase";
import SignInPage from "./screens/SignInPage";
import SignUpPage from "./screens/SignUpPage";
import PrivateChatPage from "./screens/PrivateChatPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";

const initState = {
  myCounter: 0
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INC_COUNTER":
      return { myCounter: state.myCounter + 1 };
    case "DEC_COUNTER":
      if (state.myCounter >= 1) {
        return { myCounter: state.myCounter - 1 };
      } else {
        return state;
      }
    case "PG_CHANGE":
      this.props.navigation.navigate("PrivateChatPage");
  }
  return state;
};

const FirstRoute = () => (
  <Provider store={store}>
    <HomePage />
  </Provider>
);

const store = createStore(reducer);

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
    Home: { screen: FirstRoute },
    Loading: { screen: LoadingPage },
    Signin: { screen: SignInPage },
    Signup: { screen: SignUpPage },
    PrivateChat: { screen: PrivateChatPage }
  },
  {
    // initialRouteName: "PrivateChat"
    initialRouteName: "Loading",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;
