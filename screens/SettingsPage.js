import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar
} from "react-native";

import { Form, Item, Input, Label, Button, Icon } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Header } from "react-navigation";
import * as firebase from "firebase";
import uuid from "uuid";

export default class SettingsPage extends React.Component {
  static navigationOptions = {
    title: "Settings",
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      uid: "",
      email: "",
      image: "empty",
      latestMsg: "",
      status: "",
      imageChanged: false,
      imageDownloadUrl: "empty",
      isUploading: false
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref("Users")
      .child(firebase.auth().currentUser.uid)
      .once("value")
      .then(snapshot => {
        this.setState({
          name: snapshot.val().name,
          latestMsg: snapshot.val().latestMsg,
          email: snapshot.val().email,
          imageDownloadUrl: snapshot.val().profilePic,
          uid: snapshot.val().uid,
          status: snapshot.val().status
        });
      });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.2,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  uploadImageAsync = async (uri, storageRef) => {
    const parts = uri.split(".");
    const fileExtenstion = parts[parts.length - 1];

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = storageRef
      .child(this.state.uid)
      .child(uuid.v4() + "." + fileExtenstion);
    const snapshot = await ref.put(blob);

    this.setState({ imageChanged: true });

    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  saveContact = async () => {
    if (
      this.state.name !== "" &&
      this.state.latestMsg !== "" &&
      this.state.email !== "" &&
      this.state.uid !== "" &&
      this.state.status !== ""
    ) {
      this.setState({ isUploading: true });
      const dbReference = firebase
        .database()
        .ref()
        .child("Users")
        .child(this.state.uid);
      const storageRef = firebase
        .storage()
        .ref()
        .child("profilePic");

      if (this.state.image !== false) {
        const downloadUrl = await this.uploadImageAsync(
          this.state.image,
          storageRef
        );
        this.setState({ imageDownloadUrl: downloadUrl });
      }

      var contact = {
        name: this.state.name,
        latestMsg: this.state.latestMsg,
        uid: this.state.uid,
        email: this.state.email,
        status: this.state.status,
        profilePic: this.state.imageDownloadUrl
      };

      this.setState({ isUploading: false });

      await dbReference.set(contact, error => {
        if (!error) {
          //   return this.props.navigation.goBack();
          return alert("Profile Updated");
        }
      });
    }
  };

  render() {
    if (this.state.isUploading) {
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
            Contact Uploading please wait..
          </Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          backgroundColor="#00423b"
          style={{
            height: StatusBar.currentHeight
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#075E54",
            height: 50
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon name="arrow-back" style={{ color: "#fff", marginLeft: 10 }} />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontSize: 20, marginLeft: 15 }}>
            Settings
          </Text>
        </View>
        <KeyboardAvoidingView
          style={{ flex: 1, marginTop: StatusBar.currentHeight }}
          behavior="padding"
        >
          <ScrollView style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                this.pickImage();
              }}
            >
              <Image
                source={{
                  uri: this.state.imageDownloadUrl
                }}
                style={styles.imagePicker}
              />
            </TouchableOpacity>

            <Form>
              <Item style={styles.inputItem} floatingLabel>
                <Label>Name</Label>
                <Input
                  value={this.state.name}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={name => this.setState({ name })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label>About</Label>
                <Input
                  value={this.state.latestMsg}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={latestMsg => this.setState({ latestMsg })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label>Email</Label>
                <Input
                  value={this.state.email}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
            </Form>

            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                this.saveContact();
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Button>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  imagePicker: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#c1c1c1",
    borderWidth: 2
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#25D366",
    marginTop: 40,
    marginHorizontal: 100
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
