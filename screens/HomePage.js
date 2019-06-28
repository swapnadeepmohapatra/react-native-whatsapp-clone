import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import Icon from "react-native-vector-icons/MaterialIcons";
import ChatsPage from "./ChatsPage";
import StatusPage from "./StatusPage";
import CallsPage from "./CallsPage";
import * as firebase from "firebase";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "CHATS" },
        { key: "second", title: "STATUS" },
        { key: "third", title: "CALLS" }
      ]
    };
    // self = this;
  }

  static navigationOptions = {
    header: null
  };

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  logout = () => {
    firebase.auth().signOut();
    this._menu.hide();
    this.props.navigation.navigate("Loading");
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#075E54",
          flex: 1
        }}
      >
        <View
          backgroundColor="#128C7E"
          style={{
            height: StatusBar.currentHeight
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{ height: 50, justifyContent: "center", marginLeft: 20 }}
          >
            <Text style={{ color: "white", fontSize: 19 }}>WhatsApp</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Icon name="search" size={27} style={styles.icons} />
            </TouchableOpacity>
            <Menu
              ref={this.setMenuRef}
              button={
                <TouchableOpacity
                  onPress={() => {
                    this.showMenu();
                  }}
                >
                  <Icon name="more-vert" size={27} style={styles.icons} />
                </TouchableOpacity>
              }
            >
              <MenuItem
                onPress={() => {
                  this.props.navigation.navigate("PrivateChat");
                }}
              >
                New Group
              </MenuItem>
              <MenuItem
                onPress={() => {
                  this.props.navigation.navigate("Settings");
                }}
              >
                Settings
              </MenuItem>
              <MenuDivider />
              <MenuItem onPress={this.logout}>Logout</MenuItem>
            </Menu>
          </View>
        </View>
        <TabView
          style={{
            backgroundColor: "#fff"
          }}
          navigationState={this.state}
          renderScene={SceneMap({
            first: ChatsPage,
            second: StatusPage,
            third: CallsPage
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{ backgroundColor: "#075E54" }}
              indicatorStyle={{ backgroundColor: "#fff" }}
            />
          )}
          onIndexChange={index => this.setState({ index })}
        />
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
  scene: {
    flex: 1
  },
  icons: {
    paddingHorizontal: 5,
    marginLeft: 10,
    color: "#fff",
    paddingVertical: 10
  }
});
