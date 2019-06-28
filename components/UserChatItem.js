import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  PixelRatio,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";

class UserChatItem extends Component {
  constructor(props) {
    super(props);
    self = this;
  }

  openChat = () => {
    self.props.navigation.navigate("PrivateChat", {
      name: this.props.name.name,
      image: this.props.name.profilePic,
      uid: this.props.name.uid
    });
    // alert("done");
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.name.profilePic }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            marginHorizontal: 10
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.openChat();
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 0.05 * Dimensions.get("window").width
              }}
            >
              {this.props.name.name}
            </Text>
            <Text
              style={{
                fontSize: 0.04 * Dimensions.get("window").width,
                color: "#7B8788",
                marginTop: 2
              }}
            >
              {this.props.name.latestMsg}
            </Text>
            <View
              style={{
                backgroundColor: "#EAF0F1",
                width: Dimensions.get("window").width - 90,
                height: 1,
                marginTop: 5
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 5
  }
});

export default withNavigation(UserChatItem);
