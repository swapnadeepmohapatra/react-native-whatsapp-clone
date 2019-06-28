import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { Input, Card, Button, Icon, Text } from "native-base";
import * as firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";

export default class PrivateChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Hello", message: "", messageList: [] };
    self = this;
  }

  static navigationOptions = {
    header: null,
    title: "Swapnadeep Mohapatra",
    headerStyle: {
      backgroundColor: "#075E54"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  updateList = messageList => {
    this.setState({ messageList: messageList });
  };
  componentDidMount() {
    this.setState({ name: this.props.navigation.getParam("name", "NO-ID") });
    var messageListRef = firebase
      .database()
      .ref("message_list")
      .child(firebase.auth().currentUser.uid)
      .child(this.props.navigation.getParam("uid", "000"));
    messageListRef.on("value", dataSnapshot => {
      if (dataSnapshot.val()) {
        let messageList = Object.values(dataSnapshot.val());
        self.updateList(messageList.reverse());
      }
    });
    this.forceUpdate();
  }

  sendMessage = message => {
    dateNow = Date.now();
    if (message.trim() != "") {
      var messageListSenderRef = firebase
        .database()
        .ref("message_list")
        .child(firebase.auth().currentUser.uid)
        .child(this.props.navigation.getParam("uid", "000"));
      var newMessageSenderRef = messageListSenderRef.push();
      newMessageSenderRef.set({
        text: message,
        time: dateNow,
        receiver: this.props.navigation.getParam("uid", "000"),
        name: this.props.navigation.getParam("name", "aaa"),
        sender: firebase.auth().currentUser.uid
      });

      var messageListReceiverRef = firebase
        .database()
        .ref("message_list")
        .child(this.props.navigation.getParam("uid", "000"))
        .child(firebase.auth().currentUser.uid);
      var newMessageReceiverRef = messageListReceiverRef.push();
      newMessageReceiverRef.set({
        text: message,
        time: dateNow,
        receiver: this.props.navigation.getParam("uid", "000"),
        name: this.props.navigation.getParam("name", "aaa"),
        sender: firebase.auth().currentUser.uid
      });
    } else {
      alert("Write a valid text");
    }
    this.setState({
      message: ""
    });
    this.forceUpdate();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          backgroundColor="#128C7E"
          style={{
            height: StatusBar.currentHeight
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#075E54",
            paddingVertical: 5
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icon name="arrow-back" style={{ color: "#fff", marginLeft: 10 }} />
          </TouchableOpacity>
          <Image
            source={{
              uri: this.props.navigation.getParam("image", "Nothing")
            }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
              marginLeft: 5,
              marginVertical: 5
            }}
          />
          <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
            {this.props.navigation.getParam("name", "Nothing")}
          </Text>
        </View>
        <KeyboardAvoidingView
          style={{
            backgroundColor: "#ECE5DD",
            //   backgroundColor: "#EA7773",
            flex: 1
          }}
          behavior="padding"
          enabled
        >
          <FlatList
            style={{ paddingHorizontal: 10 }}
            data={this.state.messageList}
            inverted
            keyExtractor={(item, index) => item.time.toString()}
            renderItem={({ item }) => {
              if (item.sender === firebase.auth().currentUser.uid) {
                return <SenderMessage data={item} />;
              } else {
                return <ReceiverMessage data={item} />;
              }
            }}
          />
          <View style={styles.inputContainer}>
            <Input
              style={{ marginLeft: 10 }}
              placeholder="Enter Message"
              placeholderTextColor="#c1c1c1"
              onChangeText={text => {
                this.setState({ message: text });
              }}
              value={this.state.message}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#128C7E",
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                height: 50,
                width: 50
              }}
              onPress={() => {
                this.sendMessage(this.state.message);
              }}
            >
              <Icon name="send" style={{ color: "#fff" }} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 50,
    borderColor: "#fff",
    color: "#fff",
    marginBottom: 5,
    backgroundColor: "#fff",
    marginHorizontal: 10
  },
  listItem: {
    padding: 10
  },
  messageText: {
    fontSize: 20
  },
  timeText: {
    fontSize: 10
  }
});
