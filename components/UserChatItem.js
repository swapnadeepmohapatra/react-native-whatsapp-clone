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
import { connect } from "react-redux";

class UserChatItem extends Component {
  constructor(props) {
    super(props);
    self = this;
  }

  openChat = () => {
    self.props.navigation.replace("PrivateChat");
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
            this.props.pgChange();
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

function mapStateToProps(state) {
  return {
    myCounter: state.myCounter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incCounter: () =>
      dispatch({
        type: "INC_COUNTER"
      }),
    decCounter: () =>
      dispatch({
        type: "DEC_COUNTER"
      }),
    pgChange: () =>
      dispatch({
        type: "PG_CHANGE"
      })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserChatItem);
