import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform
} from "react-native";
import { Card, List } from "react-native-paper";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import PopToTopScreen from "./Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerTransparent: true,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      entity_id: [],
      entity_mention: "",
      also_called: [],
      desc_multilang: [],
      thumbnail:
        "https://www.junior-kings.co.uk/wp-content/uploads/sites/2/2017/12/blank-small-square.jpg",
      category: "",
      list_search_entity: [],
      list_info_box: [],
      list_info_box_data: [],
      data_search_entity: [],
      title_search_entity: "",
      entity_total_hits: 0,
      list_search_entity2: [],
      data_search_entity2: [],
      title_search_entity2: "",
      entity_total_hits: "",
      entity_total_hits2: "",
      parent_name: [],
      spouse_name: [],
      sibling_name: [],
      offspring_name: [],
      ancentor_of: [],
      related_to: [],
      total_strong: "",
      gender: "",
      suggestions: [],
    };
    global.data_book = [];
    this.commetary = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.entity_id = this.props.navigation.getParam("entity_id", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.entity_mention = this.props.navigation.getParam("entity_mention", "");
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 3;
    this.titleotherresources = DCT.getValue("otherresources", this.language);

    this.handleChangeTab(DCT.getValue("menu_entity", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.GoCallAPI();
    this.GoCallAPI2();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeTab = (title) => {
    console.log(title);

    this.props.navigation.setParams({
      title: title,
    });
  };
  render() {
    const { entity_total_hits } = this.state;

    if (entity_total_hits != "0") {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              flexWrap: "nowrap",
              paddingTop: 20,
            }}
          >
            <View
              key={"cardview1"}
              style={{
                flex: 1,
                flexDirection: "column",
                flexWrap: "nowrap",
                paddingLeft: 20,
                paddingBottom: 10,
                borderColor : this.props.STORE_STYLE.BORDER_COLOR,
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 0,
                }}
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    paddingLeft: 2,
                  }}
                >
                  <Text style={[styles.fontCaptial, {color:this.props.STORE_STYLE.TEXT_COLOR}]}>
                    {this.state.entity_mention}
                  </Text>
                  <View
                    style={{
                      flex: 5,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      paddingLeft: 2,
                    }}
                  >
                    <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>{this.state.gender} </Text>
                    <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>{this.state.category}</Text>
                  </View>

                  <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>{this.state.also_called}</Text>
                </View>

                <View
                  style={{
                    flex: 5,
                    flexWrap: "wrap",
                  }}
                >
                  <Image
                    source={{
                      uri: this.state.thumbnail,
                    }}
                    style={{ paddingLeft: 20, width: 120, height: 120 }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                flexWrap: "nowrap",
                paddingLeft: 20,
                paddingBottom: 15,
                borderColor : this.props.STORE_STYLE.BORDER_COLOR,
                borderBottomWidth: 1,
                paddingTop: 15,
              }}
              key={"cardview2"}
            >
              <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}} key={"text_cardview2"}>{this.state.desc_multilang}</Text>
            </View>
            <View style={{ paddingTop: 20, paddingLeft: 20 }} key={"cardview4"}>
              {this.state.parent_name}
            </View>
            <View style={{ paddingLeft: 20 }} key={"cardview5"}>
              {this.state.spouse_name}
            </View>
            <View style={{ paddingLeft: 20 }} key={"cardview6"}>
              {this.state.sibling_name}
            </View>
            <View style={{ paddingLeft: 20 }} key={"cardview7"}>
              {this.state.offspring_name}
            </View>
            <View
              style={{ paddingLeft: 22, paddingBottom: 10 }}
              key={"cardview8"}
            >
              {this.state.list_info_box_data}
            </View>
            <View
              style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, paddingTop: 10 }}
              key={"cardview9"}
            >
              <Text
                style={{
                  fontFamily: "NotoSans-Bold",
                  paddingLeft: 20,
                  paddingBottom: 20, color:this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {DCT.getValue("relatedto", this.language)}
              </Text>
            </View>
            <ScrollView
              key={"cardview10"}
              horizontal={true}
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                paddingLeft: 10,
                paddingRight: 15,
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                paddingBottom: 20,
              }}
            >
              {this.state.suggestions}
            </ScrollView>
          </View>
          <List.Section>
            <List.Accordion
              title={this.titleotherresources}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 18,
                color:this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderTopWidth: 1,
                borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              expanded={true}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              {this.LoadingResources}
            </List.Accordion>
          </List.Section>
          <View style={{height:60,backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR }}></View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              flexWrap: "wrap",

              paddingLeft: 4,
            }}
          >
            <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>{"Data not found !"}</Text>
          </View>
        </ScrollView>
      );
    }
  }

  GoCallAPI() {
    var url_search_entity =
      "https://sabdapro.com:3002/App/app_search_entity?limit=100&skip=0&view_type=S&lang_code=" +
      this.language +
      "&entity_id=" +
      this.entity_id;
    console.log(url_search_entity);
    fetch(url_search_entity)
      .then((response) => response.json())
      .then((responseJson) => {
        this.search_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        var list_search_entity = JSON.parse(this.search_entity);

        this.list_info_box = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_info_box
        );
        var list_info_box = JSON.parse(this.list_info_box);

        if (this._isMounted === true) {
          this.setState(
            {
              list_info_box: list_info_box,
              list_search_entity: list_search_entity,
            },
            () => {
              this.GOShowSearchEntity();
              if (list_info_box.length > 0) {
                this.GOShowListInfoBox();
              }
            }
          );
        }
      });
  }
  GOShowListInfoBox() {
    const { list_info_box } = this.state;
    this.list_info_box_data = [];
    this.list_info_box_data2 = [];
    for (var i = 0; i < list_info_box.length; i++) {
      var regexremove = /(<([^>]+)>)/gi;

      if (list_info_box[i].value.indexOf(",") > 1) {
        let info_box_array = list_info_box[i].value.split(",");
        for (let j = 0; j < info_box_array.length; j++) {
          let start = info_box_array[j].indexOf('"');
          let finish = info_box_array[j].indexOf(
            '"',
            info_box_array[j].indexOf('"') + 1
          );
          let entity_id = info_box_array[j].substr(
            start + 1,
            finish - start - 1
          );
          entity_id = entity_id.replace(/%22/g, "");
          let entity_mention = info_box_array[j].replace(regexremove, "");
          console.log(list_info_box[i].key)
          if (
            list_info_box[i].key === "Born in" ||
            list_info_box[i].key === "Died at"
          ) {
          } else {
            this.list_info_box_data.push(
              <View
                key={"view_list_info_box " + i.toString() + j.toString()}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 0, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}
              >
                <TouchableOpacity
                  key={"touchopacity_list_info_box_name " + i + j}
                  onPress={() => {
                    this.OpenEntity(entity_id, entity_mention, this.language);
                  }}
                >
                  <Text
                    key={"text_list_info_box_key " + i.toString()}
                    style={{color:this.props.STORE_STYLE.TEXT_COLOR_URL }}
                  >
                    <Text
                      key={"text_list_info_box_key " + i.toString()}
                      style={{color:this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
                    >
                      {list_info_box[i].key} {": "}
                    </Text>
                    {entity_mention}
                    {"   "}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
        }
      } else {
        let start = list_info_box[i].value.indexOf('"');
        let finish = list_info_box[i].value.indexOf(
          '"',
          list_info_box[i].value.indexOf('"') + 1
        );
        let entity_id = list_info_box[i].value.substr(
          start + 1,
          finish - start - 1
        );
        entity_id = entity_id.replace(/%22/g, "");
        let entity_mention = list_info_box[i].value.replace(regexremove, "");
        if (
          list_info_box[i].key === "Born in" ||
          list_info_box[i].key === "Died at"
        ) {
        }
        else {
          this.list_info_box_data.push(
            <View
              key={"view_list_info_box " + i.toString()}
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                paddingLeft: 0, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
              }}
            >
              <TouchableOpacity
                key={"touchopacity_list_info_box_name " + i}
                onPress={() => {
                  this.OpenEntity(entity_id, entity_mention, this.language);
                }}
              >
                <Text
                  key={"text_list_info_box_key " + i.toString()}
                  style={{ color:this.props.STORE_STYLE.TEXT_COLOR_URL  }}
                >
                  <Text
                    key={"text_list_info_box_key " + i.toString()}
                    style={{ color:this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
                  >
                    {list_info_box[i].key} {": "}
                  </Text>
                  {entity_mention}
                  {"   "}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      }
    }
    this.list_info_box_data2.push(
      <View
        key={"view_list_info_box"}
        style={{
          flex: 1,
          flexDirection: "column",
          flexWrap: "wrap",
          paddingLeft: 0,
        }}
      >
        {this.list_info_box_data}
      </View>
    );

    this.setState(
      {
        list_info_box_data: this.list_info_box_data2,
      },
      () => { }
    );
  }

  GoCallAPI2() {
    var urlEntitySuggestion =
      "https://sabdapro.com:3002/App/app_entity_suggestion?limit=300&skip=0&lang_code=" +
      this.language +
      "&entity_id_src=" +
      this.entity_id;
    console.log(urlEntitySuggestion);
    fetch(urlEntitySuggestion)
      .then((response) => response.json())
      .then((responseJson) => {
        let list_entity_suggest = responseJson.data.list_entity_suggest
        this.suggestion = [];

        for (let i = 0; i < list_entity_suggest.length; i++) {
          span_id = COMethods.getUniqueId("EntitySuggestion");
          let thumbnail = "null";
          if (list_entity_suggest[i].data.thumb120_file != "null") {
            thumbnail =
              "http://mysabda.net/media/entity/thumb-120px/" +
              list_entity_suggest[i].data.thumb120_file;
          }
          if (
            thumbnail === "http://mysabda.net/media/entity/thumb-120px/null"
          ) {
            if (list_entity_suggest[i].data.category === "location") {
              thumbnail = "location";
            } else if (list_entity_suggest[i].data.category === "person") {
              thumbnail = "person";
            } else if (list_entity_suggest[i].data.category === "people") {
              thumbnail = "people";
            }
          }

          if (thumbnail === "location") {
            this.suggestion.push(
              <View
                key={"view list suggest data " + i}
                style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
              >
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                  }}
                  elevation={1}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenSearchEntity(
                        list_entity_suggest[i].data.entity_id,
                        list_entity_suggest[i].data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Card.Cover
                      style={{ width: 110, height: 110 }}
                      source={require("../assets/images/ic_world.png")}
                    />
                    <Card.Content elevation={1} style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2}}>
                      <View
                        style={{
                          flexDirection: "column",  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                        }}
                      >
                        <Text
                          style={{ fontFamily: "NotoSans-Bold", color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {list_entity_suggest[i].data.entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR  }}
                          key={span_id + "category " + i.toString}
                        >
                          {list_entity_suggest[i].data.category.substring(
                            0,
                            12
                          )}
                        </Text>
                      </View>
                    </Card.Content>
                  </TouchableOpacity>
                </Card>
              </View>
            );
          } else if (thumbnail === "person") {
            this.suggestion.push(
              <View
                key={"view list suggest data " + i}
                style={{ paddingLeft: 10, paddingRight: 10,  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2  }}
              >
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR2,
                  }}
                  elevation={1}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenSearchEntity(
                        list_entity_suggest[i].data.entity_id,
                        list_entity_suggest[i].data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Card.Cover
                      style={{ width: 110, height: 110 }}
                      source={require("../assets/images/ic_person.png")}
                    />
                    <Card.Content elevation={1} style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2}}>
                      <View
                        style={{
                          flexDirection: "column", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                        }}
                      >
                        <Text
                          style={{ fontFamily: "NotoSans-Bold", color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {list_entity_suggest[i].data.entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "category " + i.toString}
                        >
                          {list_entity_suggest[i].data.category.substring(
                            0,
                            12
                          )}
                        </Text>
                      </View>
                    </Card.Content>
                  </TouchableOpacity>
                </Card>
              </View>
            );
          } else if (thumbnail === "people") {
            this.suggestion.push(
              <View
                key={"view list suggest data " + i}
                style={{ paddingLeft: 10, paddingRight: 10, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2  }}
              >
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR2,
                  }}
                  elevation={1}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenSearchEntity(
                        list_entity_suggest[i].data.entity_id,
                        list_entity_suggest[i].data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Card.Cover
                      style={{ width: 110, height: 110 }}
                      source={require("../assets/images/ic_people.png")}
                    />
                    <Card.Content elevation={1} style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2}}>
                      <View
                        style={{
                          flexDirection: "column", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                        }}
                      >
                        <Text
                          style={{ fontFamily: "NotoSans-Bold",color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {list_entity_suggest[i].data.entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "category " + i.toString}
                        >
                          {list_entity_suggest[i].data.category.substring(
                            0,
                            12
                          )}
                        </Text>
                      </View>
                    </Card.Content>
                  </TouchableOpacity>
                </Card>
              </View>
            );
          } else {
            this.suggestion.push(
              <View
                key={"view list suggest data " + i}
                style={{ paddingLeft: 10, paddingRight: 10,  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2  }}
              >
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR2,
                  }}
                  elevation={1}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenSearchEntity(
                        list_entity_suggest[i].data.entity_id,
                        list_entity_suggest[i].data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Card.Cover
                      elevation={1}
                      style={{ width: 110, height: 110 }}
                      source={{ uri: thumbnail }}
                    />
                    <Card.Content elevation={1} style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2}}>
                      <View
                        style={{
                          flexDirection: "column", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                        }}
                      >
                        <Text
                          style={{ fontFamily: "NotoSans-Bold", color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {list_entity_suggest[i].data.entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "category " + i.toString}
                        >
                          {list_entity_suggest[i].data.category.substring(
                            0,
                            12
                          )}
                        </Text>
                      </View>
                    </Card.Content>
                  </TouchableOpacity>
                </Card>
              </View>
            );
          }
        }
        this.suggestion.push(
          <View key={"kosong"} style={{ width: 40 }}></View>
        );
        if (this._isMounted) {
          this.setState({
            suggestions: this.suggestion,
            isLoading: true,
          });
        }
      });
  }
  GOShowSearchEntity() {
    const { list_search_entity } = this.state;
    this.data_search_entity = [];

    if (list_search_entity.length > 0) {
      let entity_mention = list_search_entity[0].entity_mention;
      let offspring_id = list_search_entity[0].offspring_id;
      let desc_multilang = list_search_entity[0].desc_multilang;
      let also_called = list_search_entity[0].also_called;
      let entity_id = list_search_entity[0].entity_id;
      let parent_id = list_search_entity[0].parent_id;
      let spouse_id = list_search_entity[0].spouse_id;
      let sibling_id = list_search_entity[0].sibling_id;
      let gender = list_search_entity[0].gender;
      let strong_number = list_search_entity[0].strong;
      this.also_called = [];
      this.desc_multilang = [];
      this.entityid = [];
      this.parent_name = [];
      this.spouse_name = [];
      let total_strong = "";
      if (also_called != null) {
        this.also_called.push(
          <Text key={"also_called"} style={{ fontFamily: "NotoSans-Bold" }}>
            {"Also called : "}
            <Text key={"content_also_called"} style={{ fontWeight: "normal" }}>
              {also_called}
            </Text>
          </Text>
        );
      }
      if (desc_multilang != null) {
        this.desc_multilang.push(
          <Text key={"desc_multilang"}>{desc_multilang}</Text>
        );
      }
      if (strong_number != null && strong_number.length > 0) {
        total_strong = "";
        for (var i = 0; i < strong_number.length; i++) {
          total_strong = total_strong + "," + strong_number[i];
        }
        total_strong = total_strong.substr(1);
      }

      if (parent_id != null && parent_id.length > 0) {
        let total_parent_id = "";
        for (var i = 0; i < parent_id.length; i++) {
          total_parent_id = total_parent_id + "," + parent_id[i];
        }
        total_parent_id = total_parent_id.substr(1);
        var url_parent =
          "https://sabdapro.com:3002/App/app_entity_list?limit=6&skip=0&lang_code=" +
          this.language +
          "&list_entity_id=" +
          total_parent_id;

        fetch(url_parent)
          .then((response) => response.json())
          .then((responseJson) => {
            this.search_entity = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_entity
            );
            var list_search_entity = JSON.parse(this.search_entity);

            this.parent_name1 = [];
            this.parent_name2 = [];
            let data;
            for (var z = 0; z < parent_id.length; z++) {
              let entity_idx = parent_id[z];

              data = list_search_entity.filter((e) => {
                if (e.entity_id === entity_idx) return e;
                return null;
              });
              data = data[0];
              this.parent_name1.push(
                <View key={"view" + z}>
                  <TouchableOpacity
                    key={"touchopacity_parent_name " + z}
                    onPress={() => {
                      this.OpenEntity(
                        entity_idx,
                        data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                      key={"text_parent_name " + z}
                      style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL}}
                    >
                      <Text
                        key={"text dot" + z + Math.random}
                        style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        <Text
                          key={"text dot" + z + Math.random}
                          style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}
                        >
                          {"∙ "}
                        </Text>
                      </Text>
                      {data.entity_mention}
                      {"   "}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }

            this.parent_name2.push(
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                key={"spouse_name"}
              >
                <View key={"view_parentname"}>
                  <Text
                    key={"text_parentname"}
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
                  >
                    {DCT.getValue("parent", this.language)}
                    {"  "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {this.parent_name1}
                </View>
              </View>
            );
            if (this._isMounted === true) {
              this.setState(
                {
                  parent_name: this.parent_name2,
                },
                () => { }
              );
            }
          });
      }

      if (spouse_id != null && spouse_id.length > 0) {
        let total_spouse_id = "";
        for (var i = 0; i < spouse_id.length; i++) {
          total_spouse_id = total_spouse_id + "," + spouse_id[i];
        }
        total_spouse_id = total_spouse_id.substr(1);
        var url_spouse =
          "https://sabdapro.com:3002/App/app_entity_list?limit=100&skip=0&lang_code=" +
          this.language +
          "&list_entity_id=" +
          total_spouse_id;

        fetch(url_spouse)
          .then((response) => response.json())
          .then((responseJson) => {
            this.search_entity = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_entity
            );
            var list_search_entity = JSON.parse(this.search_entity);

            this.spouse_name1 = [];
            this.spouse_name2 = [];

            let data;
            for (var z = 0; z < spouse_id.length; z++) {
              let entity_idx = spouse_id[z];

              data = list_search_entity.filter((e) => {
                if (e.entity_id === entity_idx) return e;
                return null;
              });
              data = data[0];
              this.spouse_name1.push(
                <View key={"view" + z}>
                  <TouchableOpacity
                    key={"touchopacity_spouse_name " + z}
                    onPress={() => {
                      this.OpenEntity(
                        entity_idx,
                        data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                      key={"text_spouse_name " + z}
                      style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL}}
                    >
                      <Text
                        key={"text dot" + z + Math.random}
                        style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {"∙ "}
                      </Text>
                      {data.entity_mention}
                      {"   "}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }

            this.spouse_name2.push(
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                key={"spouse_name"}
              >
                <View key={"view_spousename"}>
                  <Text
                    key={"text_spousename"}
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
                  >
                    {DCT.getValue("spouse", this.language)}
                    {"  "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {this.spouse_name1}
                </View>
              </View>
            );
            if (this._isMounted === true) {
              this.setState(
                {
                  spouse_name: this.spouse_name2,
                },
                () => { }
              );
            }
          });
      }

      if (sibling_id != null && sibling_id.length > 0) {
        let total_sibling_id = "";
        for (var i = 0; i < sibling_id.length; i++) {
          total_sibling_id = total_sibling_id + "," + sibling_id[i];
        }
        total_sibling_id = total_sibling_id.substr(1);
        var url_sibling =
          "https://sabdapro.com:3002/App/app_entity_list?limit=100&skip=0&lang_code=" +
          this.language +
          "&list_entity_id=" +
          total_sibling_id;

        fetch(url_sibling)
          .then((response) => response.json())
          .then((responseJson) => {
            this.search_entity = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_entity
            );
            var list_search_entity = JSON.parse(this.search_entity);

            this.sibling_name1 = [];
            this.sibling_name2 = [];

            let data;
            for (var z = 0; z < sibling_id.length; z++) {
              let entity_idx = sibling_id[z];

              data = list_search_entity.filter((e) => {
                if (e.entity_id === entity_idx) return e;
                return null;
              });
              data = data[0];
              this.sibling_name1.push(
                <View key={"view" + z}>
                  <TouchableOpacity
                    key={"touchopacity_sibling_name " + z}
                    onPress={() => {
                      this.OpenEntity(
                        entity_idx,
                        data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                      key={"text_sibling_name " + z}
                      style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL}}
                    >
                      {" "}
                      <Text
                        key={"text dot" + z + Math.random}
                        style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {"∙ "}
                      </Text>
                      {data.entity_mention}
                      {"   "}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
            this.sibling_name2.push(
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                key={"sibling_name"}
              >
                <View key={"view_siblingname"}>
                  <Text
                    key={"text_siblingname"}
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
                  >
                    {DCT.getValue("sibling", this.language)}
                    {"  "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {this.sibling_name1}
                </View>
              </View>
            );
            if (this._isMounted === true) {
              this.setState(
                {
                  sibling_name: this.sibling_name2,
                },
                () => { }
              );
            }
          });
      }

      if (offspring_id != null && offspring_id.length > 0) {
        let total_offspring_id = "";
        for (var i = 0; i < offspring_id.length; i++) {
          total_offspring_id = total_offspring_id + "," + offspring_id[i];
        }
        total_offspring_id = total_offspring_id.substr(1);
        var url_offspring =
          "https://sabdapro.com:3002/App/app_entity_list?limit=100&skip=0&lang_code=" +
          this.language +
          "&list_entity_id=" +
          total_offspring_id;

        fetch(url_offspring)
          .then((response) => response.json())
          .then((responseJson) => {
            this.search_entity = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_entity
            );
            var list_search_entity = JSON.parse(this.search_entity);

            this.offspring_name1 = [];
            this.offspring_name2 = [];
            let data;
            for (var z = 0; z < offspring_id.length; z++) {
              let entity_idx = offspring_id[z];

              data = list_search_entity.filter((e) => {
                if (e.entity_id === entity_idx) return e;
                return null;
              });
              data = data[0];

              this.offspring_name1.push(
                <View key={"view" + z}>
                  <TouchableOpacity
                    key={"touchopacity_offspring_name " + z}
                    onPress={() => {
                      this.OpenEntity(
                        entity_idx,
                        data.entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                      key={"text_offspring_name " + z}
                      style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL}}
                    >
                      {"∙ "}
                      {data.entity_mention}
                      {"   "}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }

            this.offspring_name2.push(
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                key={"offspring_name"}
              >
                <View key={"view_offspringname"}>
                  <Text
                    key={"text_offspringname"}
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
                  >
                    {DCT.getValue("offspring", this.language)}
                    {"  "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {this.offspring_name1}
                </View>
              </View>
            );
            if (this._isMounted === true) {
              this.setState(
                {
                  offspring_name: this.offspring_name2,
                },
                () => { }
              );
            }
          });
      }
      var url_related_to =
        "https://sabdapro.com:3002/App/app_entity_suggestion?limit=100&skip=0&lang_code=" +
        this.language +
        "&entity_id_src=" +
        entity_id;

      fetch(url_related_to)
        .then((response) => response.json())
        .then((responseJson) => {
          this.entity_suggest = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_entity_suggest
          );
          let list_entity_suggest = JSON.parse(this.entity_suggest);

          let list_entity_suggest_data = [];
          let list_entity_suggest_data2 = [];
          for (let i = 0; i < list_entity_suggest.length; i++) {
            let suggest_entity = list_entity_suggest[i].data;
            let suggest_entity_mention = suggest_entity.entity_mention;
            let suggest_entity_id = suggest_entity.entity_id;
            let suggest_category = suggest_entity.category;
            let suggest_thumb120_file = suggest_entity.thumb120_file;
            let thumbnail =
              "http://mysabda.net/media/entity/thumb-120px/" +
              suggest_thumb120_file;

            if (
              suggest_category === "location" &&
              thumbnail === "http://mysabda.net/media/entity/thumb-120px/null"
            ) {
              list_entity_suggest_data.push(
                <View
                  style={{ paddingLeft: 10 }}
                  key={"view list suggest data " + i}
                >
                  <TouchableOpacity
                    key={"touachleopacity 1 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 50 }}
                      fill="black"
                      source={require("../assets/images/ic_world.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={"touachleopacity 2 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                      style={[styles.fontEntityMention, {color:this.props.STORE_STYLE.TEXT_COLOR}]}
                      key={"text list suggest data " + i.toString}
                    >
                      {suggest_entity_mention}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            } else if (
              suggest_category === "person" &&
              thumbnail === "http://mysabda.net/media/entity/thumb-120px/null"
            ) {
              list_entity_suggest_data.push(
                <View
                  style={{ paddingLeft: 10 }}
                  key={"view list suggest data " + i}
                >
                  <TouchableOpacity
                    key={"touachleopacity 1 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 50 }}
                      fill="black"
                      source={require("../assets/images/ic_person.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={"touachleopacity 2 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                      style={styles.fontEntityMention}
                      key={"text list suggest data " + i.toString}
                    >
                      {suggest_entity_mention}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            } else if (
              suggest_category === "people" &&
              thumbnail === "http://mysabda.net/media/entity/thumb-120px/null"
            ) {
              list_entity_suggest_data.push(
                <View
                  style={{ paddingLeft: 10 }}
                  key={"view list suggest data " + i}
                >
                  <TouchableOpacity
                    key={"touachleopacity 1 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 50 }}
                      fill="black"
                      source={require("../assets/images/ic_people.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={"touachleopacity 2 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                      style={[styles.fontEntityMention, {color:this.props.STORE_STYLE.TEXT_COLOR}]}
                      key={"text list suggest data " + i.toString}
                    >
                      {suggest_entity_mention}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              list_entity_suggest_data.push(
                <View
                  style={{ paddingLeft: 10 }}
                  key={"view list suggest data " + i}
                >
                  <TouchableOpacity
                    key={"touachleopacity 1 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Image
                      key={"image list suggest data " + i.toString}
                      source={{
                        uri: thumbnail,
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    key={"touachleopacity 2 " + i}
                    onPress={() => {
                      this.OpenSearchEntity(
                        suggest_entity_id,
                        suggest_entity_mention,
                        this.language
                      );
                    }}
                  >
                    <Text
                     style={[styles.fontEntityMention, {color:this.props.STORE_STYLE.TEXT_COLOR}]}
                      key={"text list suggest data " + i.toString}
                    >
                      {suggest_entity_mention}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
          }
          list_entity_suggest_data2.push(
            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              key={"entity suggest view"}
            >
              {list_entity_suggest_data}
            </View>
          );
          if (this._isMounted === true) {
            this.setState(
              {
                related_to: list_entity_suggest_data2,
              },
              () => { }
            );
          }
        });

      let thumb220_file = list_search_entity[0].thumb220_file;
      let category = list_search_entity[0].category;
      let thumbnail =
        "http://mysabda.net/media/entity/thumb-220px/" + thumb220_file;
      if (this._isMounted === true) {
        this.setState(
          {
            entity_mention: entity_mention,
            desc_multilang: this.desc_multilang,
            also_called: this.also_called,
            thumbnail: thumbnail,
            category: category,
            entity_id: this.entityid,
            gender: gender,
            total_strong: total_strong,
          },
          () => { }
        );
      }
      this.LoadingResources = [];
      this.LoadingResources.push(
        <View
          key={"bible dictionary"}
          style={{
            flexDirection: "row",
            borderTopWidth: 1,
            borderBottomWidth:1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.EntityBibleDictionary(
                  this.entity_id,
                  this.state.entity_mention,
                  this.state.total_strong,
                  this.language
                )
              }
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record.png")}
              />
              )}
                            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color:this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("bibledict", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
      this.LoadingResources.push(
        <View
          key={"bible facts"}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.EntityBibleFact(
                  this.entity_id,
                  this.state.entity_mention,
                  this.language
                )
              }
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record.png")}
              />
              )}
                            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color:this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("biblefacts", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );

      this.LoadingResources.push(
        <View
          key={"category"}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.EntityCategory(
                  this.entity_id,
                  this.state.entity_mention,
                  this.language
                )
              }
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record.png")}
              />
              )}
                            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color:this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("category", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );

      this.LoadingResources.push(
        <View
          key={"lexicon"}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                this.EntityLexicon(
                  this.state.entity_mention,
                  this.state.total_strong,
                  this.language
                )
              }
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record.png")}
              />
              )}
                            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
              <Image
                style={{
                  width: 25,
                  height: 25,
                  paddingLeft: 15,
                  paddingTop: 15,
                  paddingRight: 5,
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color:this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("lexicon", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  OpenEntity(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random,
    });
  }

  OpenSearchEntity(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random,
    });
  }
  MoreAbout(entity_id, language) {
    const { push } = this.props.navigation;
    const { entity_mention } = this.state;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random,
    });
  }

  EntityBibleDictionary(entity_id, entity_mention, total_strong, language) {
    const { push } = this.props.navigation;
    push("EntityBibleDictionary", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      total_strong: total_strong,
      language: language,
      key: "Entity Bible Dictionary " + Math.random,
    });
  }

  EntityBibleFact(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("EntityBibleFact", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity Bible Fact" + Math.random,
    });
  }
  EntityCategory(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("EntityCategory", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity Category" + Math.random,
    });
  }
  EntityLexicon(entity_mention, total_strong, language) {
    const { push } = this.props.navigation;
    push("EntityLexicon", {
      entity_mention,
      total_strong: total_strong,
      language: language,
      key: "Entity Lexicon" + Math.random,
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
    paddingBottom: 60,
    paddingLeft: 5,
    paddingRight: 25,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 40,
  },
  fontCaptial: {
    fontSize: 24,
    fontFamily: "NotoSans-Bold",
  },
  fontEntityMention: {
    fontSize: 13,
    fontFamily: "NotoSans-Bold",
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 5,
    margin: 10,
    height: 40,
  },
  submitButtonText: {
    textAlign: "justify",
    color: "white",
    flex: 1,
  },
  fontEntityCategory: {
    fontSize: 11,
    fontWeight: "normal",
  },
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  containerBottom: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  containerBottomItem: {
    flex: 9,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
  },
});

const mapStateToProps = (state) => {
  return {
    STORE_BIBLE: state.bible,
    STORE_STYLE: state.style
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ACT_setCacheData: (key, listdata) =>
      dispatch(BibleAction.setCacheData(key, listdata)),
    ACT_setLangChange: (lang_code) =>
      dispatch(BibleAction.setLangChange(lang_code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EntityScreen);
