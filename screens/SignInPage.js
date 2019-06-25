import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from "react-native";
import * as firebase from "firebase";
import { Form, Item, Input, Label, Button } from "native-base";

export default class SignInPage extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  signInUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Home");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        enabled
      >
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image
              source={require("../src/logo.png")}
              style={{ height: 150, width: 150 }}
            />
            <Text style={styles.text}>WhatsApp</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Form style={styles.form}>
              <Item floatingLabel>
                <Label style={{ color: "#128C7E" }}>Email</Label>
                <Input
                  style={{ color: "#075E54" }}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => {
                    this.setState({ email });
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label style={{ color: "#128C7E" }}>Password</Label>
                <Input
                  style={{ color: "#075E54" }}
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={password => {
                    this.setState({ password });
                  }}
                />
              </Item>
              <Button
                style={styles.button}
                full
                rounded
                onPress={() => {
                  this.signInUser(this.state.email, this.state.password);
                }}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </Button>
            </Form>
            <View style={styles.footer}>
              <Text>OR</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Signup");
                }}
              >
                <Text>Create a new Account ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  form: {
    padding: 20,
    width: "100%",
    marginBottom: 30
  },
  button: {
    marginTop: 20,
    backgroundColor: "#25D366"
  },
  buttonText: {
    color: "#fff"
  },
  footer: {
    alignItems: "center"
  },
  text: {
    color: "#7BBF6A",
    fontSize: 28,
    marginTop: 10,
    fontWeight: "bold"
  }
});
