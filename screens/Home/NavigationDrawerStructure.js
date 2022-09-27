import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import DrawerMenu from "../DrawerMenu";
export default class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    this.props.navigationProps.navigate('DrawerMenu');
  };
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require("../../assets/images/drawer.png")}
            style={{ width: 25, height: 25, marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
