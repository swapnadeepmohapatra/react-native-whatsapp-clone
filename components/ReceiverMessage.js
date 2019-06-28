import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Card, Button, Icon, Text } from "native-base";

export default class ReceiverMessage extends Component {
  render() {
    item = this.props.data;
    return (
      // <View>
      //   <Card style={styles.listItem}>
      //     <Text style={styles.messageText}>{item.text}</Text>
      //     <Text style={styles.messageText}>receiver</Text>
      //     <Text style={styles.timeText}>
      //       {new Date(item.time).toLocaleDateString()}
      //     </Text>
      //   </Card>
      // </View>
      <View
        style={{
          alignItems: "flex-start",
          marginTop: 5,
          marginRight: 40,
          marginBottom: 5
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            // borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }}
        >
          <Text
            style={{ fontSize: 16, color: "#0d0d0d", padding: 8, elevation: 1 }}
          >
            {item.text}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#999999",
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 5
            }}
          >
            {new Date(item.time).getHours()}:{new Date(item.time).getMinutes()}
          </Text>
        </View>
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
