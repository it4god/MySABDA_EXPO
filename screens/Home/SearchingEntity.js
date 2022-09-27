import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StyleSheet, Image
} from "react-native";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";

export default class SearchingEntity extends Component {
  ShowSearch() {
    DialogManager.show(
      {
        title: "Search",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 80,
                justifyContent: "center"
              }}
            >
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder=""
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this.handleSearch}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.Searching(this.state.searchtext)}
              >
                <Text style={styles.submitButtonText}> Search </Text>
              </TouchableOpacity>
            </View>
          </DialogContent>
        )
      },
      () => { }
    );
  }
  handleSearch = text => {
    this.setState({ searchtext: text });
  };
  Searching(text) {
    const language = this.props.navigationProps.getParam("LangParam", "eng");
    this.props.navigationProps.navigate("Search", {
      searchtext: text,
      language: language
    });
    DialogManager.dismissAll(() => { });
  }
  render() {
    return (
      <View style={{ flexDirection: "row", paddingRight: 20, flex: 1 }}>
        <TouchableHighlight
          style={styles.buttonsearch}
          key={"search"}
          underlayColor="yellow"
          onPress={() => {
            this.ShowSearch();
          }}
        >
          <Image
            style={{ width: 25, height: 25 }}
            source={require("../../assets/images/ic_search.png")}
          />
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    margin: 15,
    height: 40,
    borderColor: "#353535",
    borderWidth: 1,
    flex: 4
  },
  submitButton: {
    backgroundColor: "#353535",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    textAlign: "justify",
    color: "white",
    flex: 1
  }
});

