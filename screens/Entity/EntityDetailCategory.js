import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Platform
} from "react-native";
import { Card } from "react-native-elements";
import * as COMethods from "../../common/COMethods";
import * as DCT from "../../dictionary";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
export default class EntityDetailCategory extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: " ",
    headerTitle: <Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", }}>{navigation.getParam("title", "")}</Text>,
    headerStyle: {
      backgroundColor: "#7a42f4"
    },
    headerRight: <PopToTopScreen myNavigation={navigation} />,
    headerBackTitle: "",
    headerTransparent: true,
    headerTintColor: "#FFFFFF"
  });

  constructor(props) {
    super(props);
    this.state = {
      verse_list: [],
      entity_list: [],
      see_also: [],
      isLoading: false
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.entity_id = this.props.navigation.getParam("entity_id", "");
    this.category = this.props.navigation.getParam("category", "");
    this.language = this.props.navigation.getParam("language", "");

    this.handleChangeTab(DCT.getValue("category", this.language));
    this.GoCallAPI();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header,{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}]}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.state.entity_list}
          </View>
        </ScrollView>
      );
    }
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  GoCallAPI() {
    var urlEntityDetailCategory =
      "https://sabdapro.com:3002/App/app_entity_category?category=" +
      this.category +
      "&entity_id=" +
      this.entity_id +
      "&lang_code=" +
      this.language +
      "&skip=0&limit=100";

    fetch(urlEntityDetailCategory)
      .then(response => response.json())
      .then(responseJson => {
        this.list_entity_temp = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity_temp
        );
        let list_entity_temp = JSON.parse(this.list_entity_temp);
        this.entity_list = [];

        for (let i = 0; i < list_entity_temp.length; i++) {
          span_id = COMethods.getUniqueId("EntityDetailCategory");
          let entity_id = list_entity_temp[i].entity_id;
          category = list_entity_temp[i].data.category;
          let entity_mention = list_entity_temp[i].data.entity_mention;
          thumb = list_entity_temp[i].data.thumb120_file;
          thumbnail = "http://mysabda.net/media/entity/thumb-120px/" + thumb;

          if (thumb != null) {
            this.entity_list.push(
              <Card key={span_id + "card " + i.toString}>
                <View key={span_id + "view " + i.toString}>
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenSearchEntity(
                        entity_id,
                        entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Image
                      key={span_id + "image " + i.toString}
                      source={{
                        uri: thumbnail
                      }}
                      style={{ width: 100, height: 100 }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={styles.fontEntityMention}
                    key={span_id + "entity_mention " + i.toString}
                  >
                    {entity_mention}
                  </Text>
                  <Text
                    style={styles.fontEntityCategory}
                    key={span_id + "category " + i.toString}
                  >
                    {category}
                  </Text>
                </View>
              </Card>
            );
          } else {
            if (category === "world" || category == "location") {
              this.entity_list.push(
                <Card key={span_id + "card " + i.toString}>
                  <View key={span_id + "view " + i.toString}>
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                    >
                      <Image
                        style={{ width: 100, height: 100 }}
                        fill="black"
                        source={require("../../assets/images/ic_world.png")}
                      />
                    </TouchableOpacity>
                    <Text
                      style={styles.fontEntityMention}
                      key={span_id + "entity_mention " + i.toString}
                    >
                      {entity_mention}
                    </Text>
                    <Text
                      style={styles.fontEntityCategory}
                      key={span_id + "category " + i.toString}
                    >
                      {category}
                    </Text>
                  </View>
                </Card>
              );
            } else if (category === "person") {
              this.entity_list.push(
                <Card key={span_id + "card " + i.toString}>
                  <View key={span_id + "view " + i.toString}>
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                    >
                      <Image
                        style={{ width: 100, height: 100 }}
                        fill="black"
                        source={require("../../assets/images/ic_person.png")}
                      />
                    </TouchableOpacity>
                    <Text
                      style={styles.fontEntityMention}
                      key={span_id + "entity_mention " + i.toString}
                    >
                      {entity_mention}
                    </Text>
                    <Text
                      style={styles.fontEntityCategory}
                      key={span_id + "category " + i.toString}
                    >
                      {category}
                    </Text>
                  </View>
                </Card>
              );
            } else if (category === "people") {
              this.entity_list.push(
                <Card key={span_id + "card " + i.toString}>
                  <View key={span_id + "view " + i.toString}>
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                    >
                      <Image
                        style={{ width: 100, height: 100 }}
                        fill="black"
                        source={require("../../assets/images/ic_people.png")}
                      />
                    </TouchableOpacity>
                    <Text
                      style={styles.fontEntityMention}
                      key={span_id + "entity_mention " + i.toString}
                    >
                      {entity_mention}
                    </Text>
                    <Text
                      style={styles.fontEntityCategory}
                      key={span_id + "category " + i.toString}
                    >
                      {category}
                    </Text>
                  </View>
                </Card>
              );
            }
          }
        }

        if (this._isMounted) {
          this.setState({
            entity_list: this.entity_list,
            isLoading: true
          });
        }
      });
  }

  OpenSearchEntity(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random
    });
  }
}

const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingBottom: 150,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 150,
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    flex: 4
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    textAlign: "justify",
    color: "white",
    flex: 1
  },
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
