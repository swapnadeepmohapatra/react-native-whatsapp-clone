import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import * as firebase from "firebase";
import UserChatItem from "../components/UserChatItem";

export default class ChatsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
    // self = this;
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("Users")
      .on("value", dataSnapshot => {
        let userResult = Object.values(dataSnapshot.val());
        let userKey = Object.keys(dataSnapshot.val());

        userKey.forEach((val, key) => {
          userResult[key]["key"] = val;
        });

        this.setState({ chats: userResult });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.chats}
          renderItem={({ item }) => {
            if (item.uid !== firebase.auth().currentUser.uid) {
              return <UserChatItem name={item} />;
            }
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 5
  }
});
