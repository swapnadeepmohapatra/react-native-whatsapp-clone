import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Card, Button, Icon, Text } from "native-base";

export default class SenderMessage extends Component {
  render() {
    item = this.props.data;
    return (
      <View
        style={{
          alignItems: "flex-end",
          marginTop: 5,
          marginLeft: 40,
          marginBottom: 5
        }}
      >
        <View
          style={{
            backgroundColor: "#E2FFC7",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 10
          }}
        >
          <Text style={{ fontSize: 16, color: "#0d0d0d", padding: 8 }}>
            {item.text}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#999999",
              marginRight: 10,
              marginBottom: 5,
              textAlign: "right",
              marginLeft: 10
            }}
          >
            {new Date(item.time).getHours()}:{new Date(item.time).getMinutes()}
          </Text>
        </View>
      </View>
      //   <View>
      //     <Card style={styles.listItem}>
      //       <Text style={styles.messageText}>{item.text}</Text>
      //       <Text style={styles.messageText}>sender</Text>
      //       <Text style={styles.timeText}>
      //         {new Date(item.time).toLocaleDateString()}
      //       </Text>
      //     </Card>
      //   </View>
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
