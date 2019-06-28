import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  KeyboardAvoidingView
} from "react-native";
import { Input, Card, Button, Icon, Text } from "native-base";
import * as firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";

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
    var messageListRef = firebase
      .database()
      .ref("message_list")
      .child(firebase.auth().currentUser.uid)
      .child(this.props.navigation.getParam("uid", "000"));
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
      text: message,
      time: Date.now(),
      uid: this.props.navigation.getParam("uid", "000"),
      name: this.props.navigation.getParam("name", "aaa")
    });
    this.setState({
      message: " "
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
          <Image
            source={{
              uri: this.props.navigation.getParam("image", "Nothing")
            }}
            style={{ height: 50, width: 50, borderRadius: 50 }}
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
            data={this.state.messageList}
            inverted
            keyExtractor={(item, index) => item.time.toString()}
            renderItem={({ item }) => (
              <Card style={styles.listItem}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timeText}>
                  {new Date(item.time).toLocaleDateString()}
                </Text>
              </Card>
            )}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder="Enter Message"
              onChangeText={text => {
                this.setState({ message: text });
              }}
              value={this.state.message}
            />
            <Button
              style={{ backgroundColor: "#128C7E" }}
              rounded
              icon
              onPress={() => {
                this.sendMessage(this.state.message);
              }}
            >
              <Icon name="send" />
            </Button>
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
    padding: 5,
    borderRadius: 50,
    borderColor: "#fff",
    color: "#fff",
    // position: "absolute",
    // bottom: 5,
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
