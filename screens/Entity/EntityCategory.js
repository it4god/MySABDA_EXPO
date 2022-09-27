import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Platform
} from "react-native";
import { List, Card } from "react-native-paper";
import * as COMethods from "../../common/COMethods";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityCategory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      biblecategory: [],
      suggestions: [],
      isLoading: false,
   
    };

  }
  componentDidMount = () => {
    this._isMounted = true;
    this.entity_id = this.props.navigation.getParam("entity_id", "");
    this.entity_mention = this.props.navigation.getParam("entity_mention", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.fsizeminus = Number(this.props.STORE_BIBLE.FONT_SIZE) - 4;
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 5;
    this.handleChangeTab(
      DCT.getValue("categoryabout", this.language) + " " + this.entity_mention
    );
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.GoCallAPI();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.state.biblecategory.length > 0) {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <List.Section>{this.biblecategory}</List.Section>
          </ScrollView>
        );
      }
      else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>{DCT.getValue("00000002", this.language)}</Text>
          </ScrollView>
        );

      }
    }
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  GoCallAPI() {
    let storeBible = this.props.STORE_BIBLE;
    let storeCache = storeBible.CACHE_DATA;
    let key =
      DCT.getValue("category", this.language) +
      this.constructor.name +
      "_" +
      this.language +
      " " +
      this.entity_id;


    {
      var urlEntityCategory =
        "https://sabdapro.com:3002/App/app_entity_category_header?limit=300&skip=0&lang_code=" +
        this.language +
        "&entity_id=" +
        this.entity_id;
      fetch(urlEntityCategory)
        .then(response => response.json())
        .then(responseJson => {
          this.list_entity_ctg_hd = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_entity_ctg_hd
          );
          let list_entity_ctg_hd = JSON.parse(this.list_entity_ctg_hd);
          this.biblecategory = [];
          this.data_view = [];
          for (let i = 0; i < list_entity_ctg_hd.length; i++) {
            let span_id = COMethods.getUniqueId("EntityCategory");

            let urlentitycategorydetail =
              "https://sabdapro.com:3002/App/app_entity_category?category=" +
              list_entity_ctg_hd[i].category +
              "&entity_id=" +
              this.entity_id +
              "&lang_code=" +
              this.language +
              "&skip=0&limit=100";
            const data_view = cloneDeep(this.data_view);
            fetch(urlentitycategorydetail)
              .then(response => response.json())
              .then(responseJson => {
                this.list_entity_temp = JSON.stringify(
                  JSON.parse(JSON.stringify(responseJson)).data.list_entity_temp
                );
                let list_entity_temp = JSON.parse(this.list_entity_temp);
                for (let z = 0; z < list_entity_temp.length; z++) {
                  let span_id2 = COMethods.getUniqueId("EntityDetailCategory");
                  let entity_id = list_entity_temp[z].entity_id;
                  category = list_entity_temp[z].data.category;
                  let entity_mention = list_entity_temp[z].data.entity_mention;
                  thumb = list_entity_temp[z].data.thumb120_file;
                  thumbnail =
                    "http://mysabda.net/media/entity/thumb-120px/" + thumb;

                  if (thumb != null) {
                    data_view.push(
                      <View
                        key={"view list suggest data " + span_id2}
                        style={{
                          paddingLeft: 10,
                          paddingTop: 10,
                          paddingBottom: 10,
                          paddingRight: 10
                        }}
                      >
                        <Card
                          style={{
                            borderWidth: 1,
                            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                            backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR
                          }}
                          elevation={1}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.OpenSearchEntity(
                                entity_id,
                                entity_mention,
                                this.language
                              );
                            }}
                          >
                            <Card.Cover
                              elevation={1}
                              style={{ width: 85, height: 85,  backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR }}
                              source={{ uri: thumbnail }}
                            />
                            <Card.Content elevation={1} style={{ backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                              <View
                                style={{
                                  flexDirection: "column"
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: this.fsizeminus,
                                    fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR
                                  }}
                                  key={span_id + "entity_mention " + z.toString}
                                >
                                  {entity_mention}
                                </Text>
                                <Text
                                  style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR}}
                                  key={span_id + "category " + z.toString}
                                >
                                  {category.substring(0, 12)}
                                </Text>
                              </View>
                            </Card.Content>
                          </TouchableOpacity>
                        </Card>
                      </View>
                    );
                  } else {
                    if (category === "world" || category == "location") {
                      data_view.push(
                        <View
                          key={"view list suggest data " + span_id2}
                          style={{
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingRight: 10
                          }}
                        >
                          <Card
                            style={{
                              borderWidth: 1,
                              borderColor: this.props.STORE_STYLE.BORDER_COLOR,backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR
                            }}
                            elevation={1}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.OpenSearchEntity(
                                  entity_id,
                                  entity_mention,
                                  this.language
                                );
                              }}
                            >
                              <Card.Cover
                                elevation={1}
                                style={{ width: 85, height: 85,  backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR }}
                                source={require("../../assets/images/ic_world.png")}
                              />
                              <Card.Content elevation={1} style={{ backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                                <View
                                  style={{
                                    flexDirection: "column"
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: this.fsizeminus,
                                      fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR
                                    }}
                                    key={
                                      span_id + "entity_mention " + z.toString
                                    }
                                  >
                                    {entity_mention}
                                  </Text>
                                  <Text
                                    style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                                    key={span_id + "category " + z.toString}
                                  >
                                    {category.substring(0, 12)}
                                  </Text>
                                </View>
                              </Card.Content>
                            </TouchableOpacity>
                          </Card>
                        </View>
                      );
                    } else if (category === "person") {
                      data_view.push(
                        <View
                          key={"view list suggest data " + span_id2}
                          style={{
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingRight: 10
                          }}
                        >
                          <Card
                            style={{
                              borderWidth: 1,
                              borderColor: this.props.STORE_STYLE.BORDER_COLOR,backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR
                            }}
                            elevation={1}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.OpenSearchEntity(
                                  entity_id,
                                  entity_mention,
                                  this.language
                                );
                              }}
                            >
                              <Card.Cover
                                elevation={1}
                                style={{ width: 85, height: 85,  backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR}}
                                source={require("../../assets/images/ic_person.png")}
                              />
                              <Card.Content elevation={1} style={{ backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                                <View
                                  style={{
                                    flexDirection: "column"
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: this.fsizeminus,
                                      fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR
                                    }}
                                    key={
                                      span_id + "entity_mention " + z.toString
                                    }
                                  >
                                    {entity_mention}
                                  </Text>
                                  <Text
                                    style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                                    key={span_id + "category " + z.toString}
                                  >
                                    {category.substring(0, 12)}
                                  </Text>
                                </View>
                              </Card.Content>
                            </TouchableOpacity>
                          </Card>
                        </View>
                      );
                    } else if (category === "people") {
                      data_view.push(
                        <View
                          key={"view list suggest data " + span_id2}
                          style={{
                            paddingLeft: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingRight: 10
                          }}
                        >
                          <Card
                            style={{
                              borderWidth: 1,
                              borderColor: this.props.STORE_STYLE.BORDER_COLOR,backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR
                            }}
                            elevation={1}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                this.OpenSearchEntity(
                                  entity_id,
                                  entity_mention,
                                  this.language
                                );
                              }}
                            >
                              <Card.Cover
                                elevation={1}
                                style={{ width: 85, height: 85,  backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR }}
                                source={require("../../assets/images/ic_people.png")}
                              />
                              <Card.Content elevation={1} style={{ backgroundColor : this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                                <View
                                  style={{
                                    flexDirection: "column"
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: this.fsizeminus,
                                      fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR
                                    }}
                                    key={
                                      span_id + "entity_mention " + z.toString
                                    }
                                  >
                                    {entity_mention}
                                  </Text>
                                  <Text
                                    style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                                    key={span_id + "category " + z.toString}
                                  >
                                    {category.substring(0, 12)}
                                  </Text>
                                </View>
                              </Card.Content>
                            </TouchableOpacity>
                          </Card>
                        </View>
                      );
                    }
                  }
                }
              });

            if (i == 0) {
              this.biblecategory.push(
                <List.Accordion
                  key={span_id}
                  title={list_entity_ctg_hd[i].category}
                  titleStyle={{
                    fontFamily: 'NotoSans-Bold',
                    fontSize: 17,
                    color:this.props.STORE_STYLE.TEXT_COLOR
                  }}
                  style={{
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                  left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
                >
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                      paddingTop: 5,
                      paddingBottom: 5
                    }}
                  >
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {data_view}
                    </View>
                  </View>
                </List.Accordion>
              );
            } else {
              this.biblecategory.push(
                <List.Accordion
                  key={span_id}
                  title={list_entity_ctg_hd[i].category}
                  titleStyle={{
                    fontFamily: 'NotoSans-Bold',
                    fontSize: 17,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                  style={{
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderLeftWidth: 1,
                    borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderRightWidth: 1,
                    borderRightColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                  left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
                >
                  <View
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                    }}
                  >
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      {data_view}
                    </View>
                  </View>
                </List.Accordion>
              );
            }
            
          }
          this.props.ACT_setCacheData(key, this.biblecategory);
          if (this._isMounted) {
            this.setState({
              isLoading: true,
              biblecategory : this.biblecategory,
              renderID: Math.random()
            });
          }
        });
    }
  }
  EntityDetailCategory(entity_id, category, language) {
    const { push } = this.props.navigation;
    push("EntityDetailCategory", {
      entity_id: entity_id,
      category: category,
      language: language,
      key: "Entity Category" + Math.random
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

    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingBottom: 50
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
  fontEntityMention: {
    fontSize: 13,
    fontFamily: 'NotoSans-Bold'
  },
  fontEntityCategory: {
    fontSize: 11,
    fontWeight: "normal"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
const mapStateToProps = state => {
  return {
    STORE_BIBLE: state.bible,
    STORE_STYLE: state.style
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ACT_setCacheData: (key, listdata) =>
      dispatch(BibleAction.setCacheData(key, listdata)),
    ACT_setLangChange: lang_code =>
      dispatch(BibleAction.setLangChange(lang_code))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EntityCategory);
