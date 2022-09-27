import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator
} from "react-native";
import PopToTopScreen from "../Home/PopToTop";
import { Card, List } from "react-native-paper";
import * as COMethods from "../../common/COMethods";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityDetailBibleFact extends Component {
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
      see_also: [],
      verse_list: [],
      entity_list: [],
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 3;
    this.entity_id = this.props.navigation.getParam("entity_id", "");
    this.entity_mention = this.props.navigation.getParam("entity_mention", "");
    this.event_id = this.props.navigation.getParam("event_id", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;

    this.event = this.props.navigation.getParam("event", "");
    this.handleChangeTab(
      DCT.getValue("factabout", this.language) + " " + this.entity_mention
    );
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.GoCallAPI2();
    this.GoCallAPI3();
    this.GoCallAPI();

  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.isLoading || !this.state.isLoading2 || !this.state.isLoading3) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal ,styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <View style={{ paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}><Text style={{ fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR, fontSize: 18, paddingLeft: 15, paddingTop: 10, paddingBottom: 10 }}>{this.event}</Text></View>
          <List.Section>
            <List.Accordion
              title={DCT.getValue("relatedentities", this.language)}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 18,
                color:this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                borderWidth:1, borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2
              }}
              expanded={true}
            >
              <ScrollView
                key={"cardview10"}
                horizontal={true}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: 20,
                  paddingRight: 20,
                  paddingLeft: 10
                }}
              >
                {this.entity_list}
              </ScrollView>

              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                key={"see also"}
              >
                <View key={"view_see_also"}>
                  <Text
                    key={"text_see_also"}
                    style={{ color: "#353535", fontFamily: 'NotoSans-Bold',color:this.props.STORE_STYLE.TEXT_COLOR }}
                  >
                    {DCT.getValue("seealso", this.language)}
                    {"  "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: "wrap"
                  }}
                >
                  {this.see_also}
                </View>
              </View>
            </List.Accordion>
          </List.Section>
          <List.Section>
            <List.Accordion
              title={DCT.getValue("inthebible", this.language)}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 18,
                color:this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2, borderWidth:1, borderColor: this.props.STORE_STYLE.BORDER_COLOR}}
              expanded={true}
            >
              {this.verse_list}
            </List.Accordion>
          </List.Section>
          <View style={{height : 60}}></View>
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
    let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    var urlEntityDetailBibleFact =
      "https://sabdapro.com:3002/App/app_event_verse?limit=200&skip=0&ver_code=" + ver_code + "&lang_code=" +
      this.language +
      "&event_id=" +
      this.event_id;

    fetch(urlEntityDetailBibleFact)
      .then(response => response.json())
      .then(responseJson => {
        this.list_verse = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_verse
        );
        let list_verse = JSON.parse(this.list_verse);
        this.verse_list = [];

        for (let i = 0; i < list_verse.length; i++) {
          span_id = COMethods.getUniqueId("EntityDetailBibleFact");
          var regexremove = /(<([^>]+)>)/gi;
          let text = list_verse[i].text.replace(regexremove, "").replace(/\*/g, "");
          if (i == 0) {

            this.verse_list.push(
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR
                }}
                key={span_id}
              >
                <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR_URL}}>
                  {list_verse[i].book_name}{" "}
                </Text>
                <Text style={{ color:this.props.STORE_STYLE.TEXT_COLOR  }}>{text}</Text>
              </View>
            );
          } else {
            this.verse_list.push(
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                }}
                key={span_id}
              >
                <Text style={{ color:this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                  {list_verse[i].book_name}{" "}
                </Text>
                <Text style={{ color:this.props.STORE_STYLE.TEXT_COLOR }}>{text}</Text>
              </View>
            );
          }
        }
        if (this._isMounted) {
          this.setState({
            isLoading: true
          });
        }
      });

  }
  GoCallAPI2() {
    var urlEntityDetailBibleFact =
      "https://sabdapro.com:3002/App/app_event_inv_rel?limit=100&skip=0&type=I&lang_code=" +
      this.language +
      "&event_id=" +
      this.event_id +
      "&not_entity_id=" +
      this.entity_id;
    fetch(urlEntityDetailBibleFact)
      .then(response => response.json())
      .then(responseJson => {
        this.list_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        let list_entity = JSON.parse(this.list_entity);
        this.entity_list = [];

        for (let i = 0; i < list_entity.length; i++) {
          span_id = COMethods.getUniqueId("EntityDetailBibleFact");
          let entity_id = list_entity[i].entity_id;
          let category = list_entity[i].category;
          let entity_mention = list_entity[i].entity_mention;
          let thumb = list_entity[i].thumb120_file;
          let thumbnail =
            "http://mysabda.net/media/entity/thumb-120px/" + thumb;

          if (thumb != null) {
            this.entity_list.push(
              <View
                key={"view list entity data " + i}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
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
                      style={{ width: 150, height: 150  }}
                      source={{ uri: thumbnail }}
                    />
                    <Card.Content elevation={1}>
                      <View
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={{ fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR  }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "category " + i.toString}
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
              this.entity_list.push(
                <View
                  key={"view list entity data " + i}
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                >
                  <Card
                    style={{
                      borderWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR  
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
                        style={{ width: 150, height: 150 }}
                        source={require("../../assets/images/ic_world.png")}
                      />
                      <Card.Content elevation={1}>
                        <View
                          style={{
                            flexDirection: "column"
                          }}
                        >
                          <Text
                            style={{ fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR}}
                            key={span_id + "entity_mention " + i.toString}
                          >
                            {entity_mention}
                          </Text>
                          <Text
                            style={{ fontSize: this.fsizeminusone }}
                            key={span_id + "category " + i.toString}
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
              this.entity_list.push(
                <View
                  key={"view list entity data " + i}
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                >
                  <Card
                    style={{
                      borderWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR 
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
                        style={{ width: 150, height: 150}}
                        source={require("../../assets/images/ic_person.png")}
                      />
                      <Card.Content elevation={1}>
                        <View
                          style={{
                            flexDirection: "column"
                          }}
                        >
                          <Text
                            style={{ fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR }}
                            key={span_id + "entity_mention " + i.toString}
                          >
                            {entity_mention}
                          </Text>
                          <Text
                            style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                            key={span_id + "category " + i.toString}
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
              this.entity_list.push(
                <View
                  key={"view list entity data " + i}
                  style={{ paddingLeft: 10, paddingRight: 10 }}
                >
                  <Card
                    style={{
                      borderWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR 
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
                        style={{ width: 150, height: 150 }}
                        source={require("../../assets/images/ic_people.png")}
                      />
                      <Card.Content elevation={1}>
                        <View
                          style={{
                            flexDirection: "column"
                          }}
                        >
                          <Text
                            style={{ fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR}}
                            key={span_id + "entity_mention " + i.toString}
                          >
                            {entity_mention}
                          </Text>
                          <Text
                            style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                            key={span_id + "category " + i.toString}
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
        if (this._isMounted) {
          this.setState({

            isLoading2: true
          });
        }
      });

  }
  GoCallAPI3() {
    var urlEntityDetailBibleFact =
      "https://sabdapro.com:3002/App/app_event_inv_rel?limit=100&skip=0&type=R&lang_code=" +
      this.language +
      "&event_id=" +
      this.event_id +
      "&not_entity_id=" +
      this.entity_id;

    fetch(urlEntityDetailBibleFact)
      .then(response => response.json())
      .then(responseJson => {
        this.list_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        let list_entity = JSON.parse(this.list_entity);
        this.see_also = [];
        this.see_also2 = [];
        for (let i = 0; i < list_entity.length; i++) {
          let entity_id = list_entity[i].entity_id;
          let category = list_entity[i].category;
          let entity_mention = list_entity[i].entity_mention;
          let thumb = list_entity[i].thumb120_file;
          span_id = COMethods.getUniqueId("EntityDetailBibleFact");
          this.see_also.push(
            <View key={span_id}>
              <TouchableOpacity
                key={"to " + i}
                onPress={() => {
                  this.OpenSearchEntity(
                    entity_id,
                    entity_mention,
                    this.language
                  );
                }}
              >
                <Text
                  key={"text_parent_name " + i}
                  style={{ color:this.props.STORE_STYLE.TEXT_COLOR_URL}}
                >
                  <Text
                    key={"text dot" + i + Math.random}
                    style={{ color:this.props.STORE_STYLE.TEXT_COLOR}}
                  >
                    <Text
                      key={"text dot" + i + Math.random}
                      style={{ color:this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {"∙ "}
                    </Text>
                  </Text>
                  {entity_mention}
                  {"   "}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
        if (this._isMounted) {
          this.setState({

            isLoading3: true
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
    paddingBottom: 50
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityDetailBibleFact);
