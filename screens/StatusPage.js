import React from "react";
import { StyleSheet, View } from "react-native";

export default class StatusPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    self = this;
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#EA7773",
          //   backgroundColor: "#EA7773",
          flex: 1
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
