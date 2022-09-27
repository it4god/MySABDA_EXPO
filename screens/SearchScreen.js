import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Platform,
  AsyncStorage
} from "react-native";
import { Card, List, Switch } from "react-native-paper";
import { CheckBox, Input, Button } from "react-native-elements";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as BibleAction from "../actions/BibleAction";
import PopToTopScreen from "./Home/PopToTop";
import TagParser from "../common/TagParser";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT * 1.6;
class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      }, headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isshowoptions: false,
      searchbibletext: true,
      searchcommentary: true,
      searchdictionary: true,
      searchlexicon: true,
      searchentity: true,
      lexicon: [],
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
      isLoading: false,
      suggestions: [],
      searchtext: " ",
      dataloaded: false,
      serverDataQA: [],
      serverDataBible: [],
      serverDataCommentary: [],
      serverDataDictionary: [],
      serverDataLexicon: [],
      searchfuzzy: false,
      searchindefinition: false,
      acc_qa: true,
      acc_bible: true,
      acc_commentary: true,
      acc_dictionary: true,
      acc_lexicon: true,
      acc_entity: true,
    };
    global.data_book = [];
    this.commetary = [];
    this.dataQA = 0;
    this.dataBible = 0;
    this.dataCommentary = 0;
    this.dataDictionary = 0;
    this.dataLexicon = 0;
    this.dataEntity = 0;
    this.dataBibleText = false;
    this.rendertext = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.isfuzzy = this.props.navigation.getParam("fuzzy", "N");
    this.isindefinition = this.props.navigation.getParam("indefinition", "N");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("search", this.language));
    this.entity_id = this.props.navigation.getParam("entity_id", "");
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeTab = (title) => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title,
    });
  };
  render() {
    const { entity_total_hits } = this.state;

    if (!this.state.isLoading) {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingBottom: 5,
              backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
            }}
          >
            <View style={{ flex: 8, marginLeft: 10, backgroundColor: "#FFFFFF" }}>
              <Input
                style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, color: this.props.STORE_STYLE.TEXT_COLOR }}
                placeholder=""
                RightIcon={<Icon name="search" size={24} color="black" />}
                onChangeText={(searchtext) => this.setState({ searchtext })}
                value={this.state.searchtext}
                onSubmitEditing={() => {
                  this.GoCallAPI();
                }}



              />
            </View>
            <View style={{ flex: 2, paddingRight: 10, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 15,
                  marginLeft: 15,
                  alignItems: "center",
                  justifyContent: "center",

                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRadius: 5,
                  backgroundColor: "#3B93DB",
                  flex: 1,
                  marginBottom: 5,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => this.GoCallAPI()}>
                    <Image
                      style={{ width: 16, height: 16 }}
                      source={require("../assets/images/ic_search_white.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <List.Section>
            <List.Accordion
              title="Show Options"
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR_URL,
              }}
              expanded={this.state.isshowoptions}
              onPress={() =>
                this.setState({ isshowoptions: !this.state.isshowoptions })
              }
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderLeftWidth: 1,
                borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderRightWidth: 1,
                borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}
              >
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("searchin", this.props.STORE_BIBLE.LANG_CODE)}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchbibletext}
                    onPress={() => {
                      this.setState({
                        searchbibletext: !this.state.searchbibletext,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "bibletext",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchlexicon}
                    onPress={() => {
                      this.setState({
                        searchlexicon: !this.state.searchlexicon,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "lexicon",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchcommentary}
                    onPress={() => {
                      this.setState({
                        searchcommentary: !this.state.searchcommentary,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "commentary",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchentity}
                    onPress={() => {
                      this.setState({
                        searchentity: !this.state.searchentity,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "entity",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchdictionary}
                    onPress={() => {
                      this.setState({
                        searchdictionary: !this.state.searchdictionary,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "dictionary",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                </View>
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue(
                    "otheroptions",
                    this.props.STORE_BIBLE.LANG_CODE
                  )}
                </Text>
                <View
                  style={{
                    paddingLeft: 10,
                    flex: 1,
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginRight: 15,
                  }}
                >
                  <Switch

                    tintColor="#FDFDFD"
                    value={this.state.searchindefinition}
                    onValueChange={() => {
                      this.setState({
                        searchindefinition: !this.state.searchindefinition,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    color="#3B64DB"
                  />
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 15,
                      paddingTop: 10, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {DCT.getValue(
                      "searchindefinition",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    paddingLeft: 10,
                    flex: 1,
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginRight: 15,
                  }}
                >
                  <Switch
                    tintColor="#FDFDFD"
                    value={this.state.fuzzysearch}
                    onValueChange={() => {
                      this.setState({ fuzzysearch: !this.state.fuzzysearch });
                      setTimeout(() => { }, 500);
                    }}
                    color="#3B64DB"
                  />
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 15,
                      paddingTop: 10, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {DCT.getValue(
                      "fuzzysearch",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                  </Text>
                </View>
              </View>
            </List.Accordion>
          </List.Section>
        </ScrollView>
      );
    } else {
      let title_quesans =
        DCT.getValue("quesans", this.language) +
        " " +
        DCT.getValue("about", this.language) +
        this.state.keyword;

      let title_bible_text = DCT.getValue("bibletext", this.language);
      let title_bible =
        this.state.keyword + " " + DCT.getValue("inthebible", this.language);

      let title_commentary =
        DCT.getValue("commentaryabout", this.language) +
        " " +
        this.state.keyword;

      let title_dictionary =
        this.state.keyword + " " + DCT.getValue("indictionary", this.language);

      let title_lexicon =
        this.state.keyword + " " + DCT.getValue("inlexicon", this.language);

      this.show_bible_text = false;
      if (this.dataBible > 0 && this.state.searchbibletext === true)
        this.show_bible_text = true;

      this.show_commentary = false;
      if (this.dataCommentary > 0 && this.state.searchcommentary === true)
        this.show_commentary = true;

      this.show_dictionary = false;
      if (this.dataDictionary > 0 && this.state.searchdictionary === true)
        this.show_dictionary = true;

      this.show_lexicon = false;
      if (this.dataLexicon > 0 && this.state.searchlexicon === true)
        this.show_lexicon = true;

      this.show_entity = false;
      if (this.dataEntity > 0 && this.state.searchentity === true)
        this.show_entity = true;

      this.show_qa = false;
      if (this.dataQA > 0) this.show_qa = true;

      console.log(this.show_qa);

      console.log("this Data QA " + this.dataQA);

      this.data_empty = false;
      if (
        this.show_bible_text == false &&
        this.show_commentary == false &&
        this.show_dictionary == false &&
        this.show_lexicon == false &&
        this.show_entity == false
      ) {
        this.data_empty = true;
      } else {
        this.data_empty = false;
      }
      if (this.dataBibleText == true) this.data_empty = false;

      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingBottom: 5,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <View style={{ flex: 8, marginLeft: 10, backgroundColor: "#FFFFFF" }}>
              <Input
                style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, color: this.props.STORE_STYLE.TEXT_COLOR }}
                placeholder=""
                RightIcon={<Icon name="search" size={24} color="black" />}
                onChangeText={(searchtext) => this.setState({ searchtext })}
                value={this.state.searchtext}
                onSubmitEditing={() => {
                  this.GoCallAPI();
                }}



              />
            </View>
            <View style={{ flex: 2, paddingRight: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 15,
                  marginLeft: 15,
                  alignItems: "center",
                  justifyContent: "center",

                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRadius: 5,
                  backgroundColor: "#3B93DB",
                  flex: 1,
                  marginBottom: 5,
                  marginTop: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => this.GoCallAPI()}>
                    <Image
                      style={{ width: 16, height: 16 }}
                      source={require("../assets/images/ic_search_white.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <List.Section>
            <List.Accordion
              title="Show Options"
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR_URL,
              }}
              onPress={() =>
                this.setState({ isshowoptions: !this.state.isshowoptions })
              }
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderLeftWidth: 1,
                borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderRightWidth: 1,
                borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}
              >
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("searchin", this.props.STORE_BIBLE.LANG_CODE)}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchbibletext}
                    onPress={() => {
                      this.setState({
                        searchbibletext: !this.state.searchbibletext,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "bibletext",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchlexicon}
                    onPress={() => {
                      this.setState({
                        searchlexicon: !this.state.searchlexicon,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "lexicon",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchcommentary}
                    onPress={() => {
                      this.setState({
                        searchcommentary: !this.state.searchcommentary,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "commentary",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchentity}
                    onPress={() => {
                      this.setState({
                        searchentity: !this.state.searchentity,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "entity",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <CheckBox
                    containerStyle={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                    textStyle={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: 13 }}
                    checked={this.state.searchdictionary}
                    onPress={() => {
                      this.setState({
                        searchdictionary: !this.state.searchdictionary,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    title={DCT.getValue(
                      "dictionary",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                    checkedColor={"#3B64DB"}
                  />
                </View>
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue(
                    "otheroptions",
                    this.props.STORE_BIBLE.LANG_CODE
                  )}
                </Text>
                <View
                  style={{
                    paddingLeft: 10,
                    flex: 1,
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginRight: 15,

                  }}
                >
                  <Switch
                    tintColor="#FDFDFD"
                    value={this.state.searchindefinition}
                    onValueChange={() => {
                      this.setState({
                        searchindefinition: !this.state.searchindefinition,
                      });
                      setTimeout(() => { }, 500);
                    }}
                    color="#3B64DB"
                  />
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 15,
                      paddingTop: 10, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {DCT.getValue(
                      "searchindefinition",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    paddingLeft: 10,
                    flex: 1,
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginRight: 15,
                  }}
                >
                  <Switch
                    tintColor="#FDFDFD"
                    value={this.state.fuzzysearch}
                    onValueChange={() => {
                      this.setState({ fuzzysearch: !this.state.fuzzysearch });
                      setTimeout(() => { }, 500);
                    }}
                    color="#3B64DB"
                  />
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 15,
                      paddingTop: 10, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {DCT.getValue(
                      "fuzzysearch",
                      this.props.STORE_BIBLE.LANG_CODE
                    )}
                  </Text>
                </View>
              </View>
            </List.Accordion>
          </List.Section>
          {this.dataBibleText && (
            <List.Section>
              <List.Accordion
                title={title_bible_text}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                }}
                expanded={true}
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderLeftWidth: 1,
                  borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRightWidth: 1,
                  borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View style={{ paddingLeft: 10, paddingRight: 15 }}>
                  {this.rendertext}
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.show_qa == true && (
            <List.Section>
              <List.Accordion
                title={title_quesans}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                }}
                expanded={this.state.acc_qa}
                onPress={() =>
                  this.setState({
                    acc_qa: !this.state.acc_qa,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderLeftWidth: 1,
                  borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRightWidth: 1,
                  borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View>
                  <FlatList
                    style={{ width: "100%" }}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.serverDataQA}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                          flexDirection: "column",
                          paddingVertical: 5,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            paddingRight: 15,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              this.EntityDetailinQuestionAnswers(
                                item.subentry_code,
                                item.vref,
                                item.key,
                                this.language
                              );
                            }}
                            style={styles.containerBottomItem}
                          >
                            {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                              <Image
                                style={{
                                  width: 25,
                                  height: 25,
                                  paddingLeft: 15,
                                  paddingTop: 15,
                                }}
                                source={require("../assets/images/record.png")}
                              />
                            )}
                            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                              <Image
                                style={{
                                  width: 25,
                                  height: 25,
                                  paddingLeft: 15,
                                  paddingTop: 15,
                                }}
                                source={require("../assets/images/record_darkmode.png")}
                              />
                            )}
                            <View
                              style={{
                                flexDirection: "column",
                                flexWrap: "wrap",
                                paddingLeft: 15,
                                paddingRight: 15,
                              }}
                            >
                              {this.MyParser.DoParserDiscovery(
                                item.key
                                  .replace(/<eshigh>/g, "")
                                  .replace(/<\/eshigh>/g, ""), this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                              )}
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                </View>
                <View style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      const { push } = this.props.navigation;

                      push("QuestionAnswers", {
                        keyword: this.state.searchtext,
                        language: this.language,
                        fuzzy: this.isfuzzy,
                        indefinition: this.isindefinition,
                      });
                    }}
                    style={styles.loadMoreBtn}
                  >
                    <Text style={styles.btnText}>Show All</Text>
                  </TouchableOpacity>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.show_bible_text == true && (
            <List.Section>
              <List.Accordion
                title={title_bible}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                }}
                expanded={this.state.acc_bible}
                onPress={() =>
                  this.setState({
                    acc_bible: !this.state.acc_bible,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderLeftWidth: 1,
                  borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRightWidth: 1,
                  borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View>
                  <FlatList
                    style={{ width: "100%" }}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.serverDataBible}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          paddingHorizontal: 15,
                          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                          flexDirection: "column",
                          paddingVertical: 12,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() => {
                              this.ReadFullChapter(item.bookid, item.chapter);
                            }}
                          >
                            <Text
                              style={{
                                flex: 3,
                                fontFamily: "NotoSans-Bold",
                                color: this.props.STORE_STYLE.TEXT_COLOR
                              }}
                            >
                              {item.book_name} {item.chapter} {":"} {item.verse}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              this.ReadFullChapter(item.bookid, item.chapter);
                            }}
                          >
                          <Text
                            style={{
                              paddingLeft: 25,
                              fontSize: this.fsizeminusone,
                              flex: 2,
                              fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.full_name}
                          </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                              this.ReadFullChapter(item.bookid, item.chapter);
                            }}
                          >
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {" "}
                          {item._highlight["text.lang_clean"][0]
                            .replace(/(<([^>]+)>)/gi, "")
                            .replace(/\*/g, "")}
                        </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
                <View style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      const { push } = this.props.navigation;
                      push("EntityinBible", {
                        keyword: this.state.searchtext,
                        language: this.language,
                        fuzzy: this.isfuzzy,
                        indefinition: this.isindefinition,
                      });
                    }}
                    style={styles.loadMoreBtn}
                  >
                    <Text style={styles.btnText}>Show All</Text>
                  </TouchableOpacity>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.show_commentary == true && (
            <List.Section>
              <List.Accordion
                title={title_commentary}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                }}
                expanded={this.state.acc_commentary}
                onPress={() =>
                  this.setState({
                    acc_commentary: !this.state.acc_commentary,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderLeftWidth: 1,
                  borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRightWidth: 1,
                  borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View>
                  <FlatList
                    style={{ width: "100%" }}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.serverDataCommentary}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                          flexDirection: "column",
                          paddingVertical: 12,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                      >
                        <TouchableOpacity
                          key={"to "}
                          onPress={() => {
                            this.EntityinDetailCommentary(
                              item.subentry_code,
                              item.vref,
                              item._highlight["key.lang_clean"][0],
                              item.key,
                              item.res_name,
                              this.language
                            );
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              flex: 1,
                              paddingRight: 10,
                            }}
                          >
                            <View style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                              {this.MyParser.DoParserDiscovery(
                                item._highlight["key.lang_clean"][0], this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                              )}
                            </View>
                            <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                              {" on "}
                              {item.vref}
                            </Text>
                          </View>
                          <Text
                            style={{
                              flex: 2,
                              color: "gray",
                              fontWeight: "normal",
                              fontSize: this.fsizeminusone, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.res_name}
                          </Text>

                          <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                            {item.text.replace(/(<([^>]+)>)/gi, "")} {"..."}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
                <View style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      const { push } = this.props.navigation;
                      push("EntityinCommentary", {
                        keyword: this.state.searchtext,
                        language: this.language,
                        fuzzy: this.isfuzzy,
                        indefinition: this.isindefinition,
                      });
                    }}
                    style={styles.loadMoreBtn}
                  >
                    <Text style={styles.btnText}>Show All</Text>
                  </TouchableOpacity>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.show_dictionary == true && (
            <List.Section>
              <List.Accordion
                title={title_dictionary}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                }}
                expanded={this.state.acc_dictionary}
                onPress={() =>
                  this.setState({
                    acc_dictionary: !this.state.acc_dictionary,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderLeftWidth: 1,
                  borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRightWidth: 1,
                  borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View>
                  <FlatList
                    style={{ width: "100%" }}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.serverDataDictionary}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                          flexDirection: "column",
                          paddingVertical: 10,
                          paddingHorizontal: 15,
                          flexDirection: "column",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.EntityinDetailDictionary(
                              item.entry_code,
                              item.res_name,
                              this.language,
                              this.keyword
                            );
                          }}
                        >
                          {this.MyParser.DoParserDiscovery(
                            item._highlight["term.lang_clean"][0], this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                          )}

                          <Text
                            style={{
                              fontSize: this.fsizeminusone,
                              flex: 2,
                              fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.res_name}
                          </Text>

                          <Text
                            style={{
                              flex: 1,
                              fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.text
                              .replace(/(<([^>]+)>)/gi, "")
                              .substring(0, 80)}{" "}
                            {"..."}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
                <View style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      const { push } = this.props.navigation;
                      push("EntityinDictionary", {
                        keyword: this.state.searchtext,
                        language: this.language,
                        fuzzy: this.isfuzzy,
                        indefinition: this.isindefinition,
                      });
                    }}
                    style={styles.loadMoreBtn}
                  >
                    <Text style={styles.btnText}>Show All</Text>
                  </TouchableOpacity>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.show_lexicon == true && (
            <List.Section>
              <List.Accordion
                title={title_lexicon}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                }}
                expanded={this.state.acc_lexicon}
                onPress={() =>
                  this.setState({
                    acc_lexicon: !this.state.acc_lexicon,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderLeftWidth: 1,
                  borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRightWidth: 1,
                  borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }} >{this.state.lexicon}</View>
                <View style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      const { push } = this.props.navigation;
                      push("EntityinLexicon", {
                        keyword: this.state.searchtext,
                        language: this.language,
                        fuzzy: this.isfuzzy,
                        indefinition: this.isindefinition,
                      });
                    }}
                    style={styles.loadMoreBtn}
                  >
                    <Text style={styles.btnText}>Show All</Text>
                  </TouchableOpacity>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.show_entity == true && (
            <List.Section>
              <List.Accordion
                title={DCT.getValue("entity", this.language)}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                }}
                expanded={this.state.acc_entity}
                onPress={() =>
                  this.setState({
                    acc_entity: !this.state.acc_entity,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderLeftWidth: 1,
                  borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                  borderRightWidth: 1,
                  borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    paddingTop: 20,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
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
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                        <Text style={[styles.fontCapital, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
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
                          <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.state.gender} </Text>
                          <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.state.category}</Text>
                        </View>

                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.state.also_called}</Text>
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
                      paddingTop: 15,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                    key={"cardview2"}
                  >
                    <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }} key={"text_cardview2"}>
                      {this.state.desc_multilang}
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingLeft: 20,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderBottomWidth: 1,
                      paddingBottom: 15,
                    }}
                    key={"cardview3"}
                  >
                    {this.entityid}
                  </View>
                  <View
                    style={{ paddingTop: 20, paddingLeft: 20 }}
                    key={"cardview4"}
                  >
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
                    style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, paddingTop: 10 }}
                    key={"cardview9"}
                  >
                    <Text
                      style={{
                        fontFamily: "NotoSans-Bold",
                        paddingLeft: 20,
                        paddingBottom: 20,
                        color: this.props.STORE_STYLE.TEXT_COLOR
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
                      backgroundColor: "#F4F5F8",
                      paddingBottom: 20,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    {this.state.suggestions}
                  </ScrollView>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    paddingLeft: 10,
                    paddingVertical: 10,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                  }}
                >
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.state.title_search_entity2}</Text>
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.state.entity_total_hits2}</Text>
                  <ScrollView
                    horizontal={true}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                      paddingLeft: 4,
                    }}
                  >
                    {this.state.data_search_entity2}
                  </ScrollView>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.data_empty == true && (
            <View style={{ paddingLeft: 20, paddingTop: 20, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}>
              <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{DCT.getValue("00000002", this.language)}</Text>
            </View>
          )}
          <View style={{ height: 300 }}></View>
        </ScrollView>
      );
    }
  }

  GoCallAPI() {
    let url_check_verse =
      "https://sabdapro.com:3002/app/app_verse_text?limit=100&type_search=K&ver_code=" +
      this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() +
      "&verse=" +
      this.state.searchtext;
    console.log(url_check_verse);
    fetch(url_check_verse)
      .then((response) => response.json())
      .then((responseJson) => {
        try {
          this.list_verse = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_verse
          );
          let list_verse = JSON.parse(this.list_verse);
          if (list_verse.length > 0) {
            let text = "";
            let texttemp = "";
            for (let i = 0; i < list_verse.length; i++) {
              texttemp = list_verse[i].text;
              text += texttemp;
            }
            this.dataBibleText = true;
            this.setState({ isLoading: false });
            this.rendertext = this.MyParser.DoParserBibleFullVersion(
              text,
              true,
              false,
              true,
              false,
              this.props.STORE_BIBLE.FONT_SIZE,
              this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase(),
              false,
              true
            );
            this.setState({ isLoading: true });
            this.dataBibleText = true;
          } else {
            this.GoCallAPISearch();
          }
        } catch (error) {
          console.log(error);
          this.GoCallAPISearch();
        }
      });
  }
  GoCallAPIEntity() {
    var url_search_entity = "";
    if (this.entity_id !== "") {
      url_search_entity =
        "https://sabdapro.com:3002/App/app_search_entity?limit=100&skip=0&view_type=S&lang_code=" +
        this.language +
        "&entity_id=" +
        this.entity_id;
    } else {
      url_search_entity =
        "https://sabdapro.com:3002/App/app_search_entity?limit=100&skip=0&view_type=S&lang_code=" +
        this.language +
        "&keyword=" +
        this.state.searchtext;
    }
    console.log(url_search_entity);
    fetch(url_search_entity)
      .then((response) => response.json())
      .then((responseJson) => {
        this.search_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        var title_search_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.title
        );
        var list_search_entity = JSON.parse(this.search_entity);
        var total_hits = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.total_hits
        );
        this.list_info_box = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_info_box
        );
        var list_info_box = JSON.parse(this.list_info_box);
        if (this._isMounted === true) {
          this.setState(
            {
              list_search_entity: list_search_entity,
              entity_total_hits: total_hits,
              title_search_entity: title_search_entity,
              list_info_box: list_info_box,
            },
            () => {
              if (list_search_entity.length > 0) {
                this.dataEntity = 1;
                this.GOShowSearchEntity();
              }

              this.GOShowListInfoBox();
            }
          );
        }
      });
  }

  GOShowSearchEntity() {
    if (this.state.searchentity == true) {
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
        this.also_called = [];
        this.desc_multilang = [];
        this.entityid = [];
        this.parent_name = [];
        this.spouse_name = [];
        if (also_called != null) {
          this.also_called.push(
            <Text key={"also_called"} style={{ fontFamily: "NotoSans-Bold" }}>
              {"Also Called : "}
              <Text
                key={"content_also_called"}
                style={{ fontWeight: "normal" }}
              >
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
        if (entity_id != null) {
          this.entityid.push(
            <View key={"more entity"}>
              <TouchableOpacity
                key={"touchopacity_entity_id"}
                onPress={() => {
                  this.MoreAbout(entity_id, this.language);
                }}
              >
                <Text key={"text_entity_id"} style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                  {"More About "} {entity_mention}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
        if (parent_id != null) {
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
                        style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
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
                      {" : "}
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
        if (spouse_id != null) {
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
                      key={"touchopacity_spouse_name " + data.entity_id}
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
                        style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
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
                      {" : "}
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

        if (sibling_id != null) {
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
                        style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
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
                      {" : "}
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

        if (offspring_id != null) {
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
                        style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
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
                      {" : "}
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

        var urlEntitySuggestion =
          "https://sabdapro.com:3002/App/app_entity_suggestion?limit=300&skip=0&lang_code=" +
          this.language +
          "&entity_id_src=" +
          entity_id;

        fetch(urlEntitySuggestion)
          .then((response) => response.json())
          .then((responseJson) => {
            this.list_entity_suggest = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_entity_suggest
            );
            let list_entity_suggest = JSON.parse(this.list_entity_suggest);
            this.suggestion = [];

            for (let i = 0; i < list_entity_suggest.length; i++) {
              let span_id = COMethods.getUniqueId("EntitySuggestion");
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
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    <Card
                      style={{
                        borderWidth: 1,
                        borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                        <Card.Content elevation={1}>
                          <View
                            style={{
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              style={{ fontFamily: "NotoSans-Bold" }}
                              key={span_id + "entity_mention " + i.toString}
                            >
                              {list_entity_suggest[i].data.entity_mention}
                            </Text>
                            <Text
                              style={{ fontSize: this.fsizeminusone }}
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
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    <Card
                      style={{
                        borderWidth: 1,
                        borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                        <Card.Content elevation={1}>
                          <View
                            style={{
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              style={{ fontFamily: "NotoSans-Bold" }}
                              key={span_id + "entity_mention " + i.toString}
                            >
                              {list_entity_suggest[i].data.entity_mention}
                            </Text>
                            <Text
                              style={{ fontSize: this.fsizeminusone }}
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
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    <Card
                      style={{
                        borderWidth: 1,
                        borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                        <Card.Content elevation={1}>
                          <View
                            style={{
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              style={{ fontFamily: "NotoSans-Bold" }}
                              key={span_id + "entity_mention " + i.toString}
                            >
                              {list_entity_suggest[i].data.entity_mention}
                            </Text>
                            <Text
                              style={{ fontSize: this.fsizeminusone }}
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
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                  >
                    <Card
                      style={{
                        borderWidth: 1,
                        borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                        <Card.Content elevation={1}>
                          <View
                            style={{
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              style={{ fontFamily: "NotoSans-Bold" }}
                              key={span_id + "entity_mention " + i.toString}
                            >
                              {list_entity_suggest[i].data.entity_mention}
                            </Text>
                            <Text
                              style={{ fontSize: this.fsizeminusone }}
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
              });
            }
          });

        let thumb220_file = list_search_entity[0].thumb220_file;
        let category = list_search_entity[0].category;
        let thumbnail =
          "http://mysabda.net/media/entity/thumb-220px/" + thumb220_file;
        if (this._isMounted === true) {
          this.setState({
            entity_mention: entity_mention,
            desc_multilang: this.desc_multilang,
            also_called: this.also_called,
            thumbnail: thumbnail,
            category: category,
            gender: gender,
            entity_id: entity_id,
          });
        }
      }
    }
  }
  ReadFullChapter(book_id, chapter_no) {
    this.book_id = book_id;
    this.chapter_no = chapter_no;
    this.props.ACT_setBookID(book_id);
    this.props.ACT_setChapterNo(Number(chapter_no));
    this._storeData();
    this.props.ACT_setBookChapterChange(true);
    this.props.ACT_SetVrefChange(true);
    this.props.navigation.navigate('Home');

  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("book_id", this.book_id.toString());
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("chapter_no", this.chapter_no.toString());
    } catch (error) {
      console.log(error);
    }
  };
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
                  paddingLeft: 0,
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
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
                  >
                    <Text
                      key={"text_list_info_box_key " + i.toString()}
                      style={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
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
        } else {
          this.list_info_box_data.push(
            <View
              key={"view_list_info_box " + i.toString()}
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                paddingLeft: 0,
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
                  style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
                >
                  <Text
                    key={"text_list_info_box_key " + i.toString()}
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR, fontFamily: "NotoSans-Bold" }}
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
    var url_search_entity2 = "";
    if (this.entity_id !== "") {
      url_search_entity2 =
        "https://sabdapro.com:3002/App/app_search_entity?limit=100&skip=0&view_type=S&lang_code=" +
        this.language +
        "&entity_id=" +
        this.entity_id;
    } else {
      url_search_entity2 =
        "https://sabdapro.com:3002/App/app_search_entity?limit=100&skip=0&view_type=M&lang_code=" +
        this.language +
        "&keyword=" +
        this.searchtext;
    }

    fetch(url_search_entity2)
      .then((response) => response.json())
      .then((responseJson) => {
        this.search_entity2 = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        var title_search_entity2 = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.title
        );
        var list_search_entity2 = JSON.parse(this.search_entity2);
        var total_hits2 = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.total_hits
        );

        if (total_hits2 > 0) {
          total_hits2 = "( " + total_hits2 + " Records )";

          if (this._isMounted === true) {
            this.setState(
              {
                list_search_entity2: list_search_entity2,
                entity_total_hits2: total_hits2,
                title_search_entity2: title_search_entity2,
              },
              () => {
                this.GOShowSearchEntity2();
              }
            );
          }
        }
      });
  }

  GOShowSearchEntity2() {
    const { list_search_entity2 } = this.state;
    this.data_search_entity2 = [];

    if (list_search_entity2.length > 0) {
      for (var i = 0; i < list_search_entity2.length; i++) {
        let span_id = COMethods.getUniqueId("SearchEntity2" + " " + i.toString());
        let entity_id = list_search_entity2[i].entity_id;
        let category = list_search_entity2[i].category;
        let entity_mention = list_search_entity2[i].entity_mention;
        thumb = list_search_entity2[i].thumb120_file;
        thumbnail = "http://mysabda.net/media/entity/thumb-120px/" + thumb;
        if (thumb != null) {
          this.data_search_entity2.push(
            <View key={span_id} style={{ paddingLeft: 10, paddingRight: 10 }}>
              <Card
                style={{
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                    style={{ width: 110, height: 110 }}
                    source={{
                      uri: thumbnail,
                    }}
                  />
                  <Card.Content elevation={1}>
                    <View
                      style={{
                        flexDirection: "column",
                      }}
                    >
                      <Text
                        style={{ fontFamily: "NotoSans-Bold" }}
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
        } else {
          if (category === "world" || category == "location") {
            this.data_search_entity2.push(
              <View key={span_id} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                      style={{ width: 110, height: 110 }}
                      source={require("../assets/images/ic_world.png")}
                    />
                    <Card.Content elevation={1}>
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "NotoSans-Bold" }}
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
            this.data_search_entity2.push(
              <View key={span_id} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                      style={{ width: 110, height: 110 }}
                      source={require("../assets/images/ic_person.png")}
                    />
                    <Card.Content elevation={1}>
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "NotoSans-Bold" }}
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
          } else if (category === "people") {
            this.data_search_entity2.push(
              <View key={span_id} style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Card
                  style={{
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                      style={{ width: 110, height: 110 }}
                      source={require("../assets/images/ic_people.png")}
                    />
                    <Card.Content elevation={1}>
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <Text
                          style={{ fontFamily: "NotoSans-Bold" }}
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
          }
        }
      }
    }

    if (this._isMounted === true) {
      this.setState(
        {
          data_search_entity2: this.data_search_entity2,
        },
        () => { }
      );
    }
  }
  GoCallAPISearch() {
    this.dataBibleText = false;
    if (this.state.searchindefiniton === true) this.isindefinition = "Y";
    else this.isindefinition = "N";

    if (this.state.searchfuzzy === true) this.isfuzzy = "Y";
    else this.isfuzzy = "N";

    this.keyword = this.state.searchtext;
    if (this.keyword != "" && this.keyword.length > 1) {
      this.keyword =
        this.keyword.substring(0, 1).toUpperCase() + this.keyword.substring(1);
    } else {
      Alert.alert(
        DCT.getValue("nodata", this.props.STORE_BIBLE.LANG_CODE.toLowerCase()),
        DCT.getValue(
          "00000002",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      return;
    }
    const { entity_total_hits } = this.state;
    this.APISearch = [];
    this.LoadingResources = [];

    this.page = 3;
    var urlQA =
      "https://sabdapro.com:3002/App/app_search_data?limit=" +
      this.page +
      "&skip=0&fragment_size=410&type=CQ&search_in_desc=" +
      this.isindefinition +
      "&search_fuzzy=" +
      this.isfuzzy +
      "&lang_code=" +
      this.language +
      "&keyword=" +
      this.keyword;
    console.log(urlQA);
    fetch(urlQA)
      .then((response) => response.json())
      .then((responseJson) => {
        this.list_search = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_search
        );
        let list_search_data = JSON.parse(this.list_search);

        this.dataQA = list_search_data.length;

        this.setState({
          serverDataQA: list_search_data,
        });
      });

    let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();

    if (this.state.searchbibletext == true) {
      var urlEntityinBible =
        "https://sabdapro.com:3002/App/app_search_data?limit=" +
        this.page +
        "&skip=0&fragment_size=4000&type=B&search_in_desc=" +
        this.isindefinition +
        "&search_fuzzy=" +
        this.isfuzzy +
        "&lang_code=" +
        this.language +
        "&ver_code=" +
        ver_code +
        "&keyword=" +
        this.keyword;
      console.log(urlEntityinBible);
      fetch(urlEntityinBible)
        .then((response) => response.json())
        .then((responseJson) => {
          this.list_search = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_search
          );
          let list_search_data = JSON.parse(this.list_search);
          this.entityinbible = list_search_data.length;
          if (this.entityinbible > 0) this.dataBible = 1;
          this.setState({
            serverDataBible: list_search_data,
          });
        });
    }
    if (this.state.searchcommentary == true) {
      var urlEntityinCommentary =
        "https://sabdapro.com:3002/App/app_search_data?limit=" +
        this.page +
        "&skip=0&fragment_size=410&type=C&search_in_desc=" +
        this.isindefinition +
        "&search_fuzzy=" +
        this.isfuzzy +
        "&lang_code=" +
        this.language +
        "&ver_code=" +
        ver_code +
        "&keyword=" +
        this.keyword;

      fetch(urlEntityinCommentary)
        .then((response) => response.json())
        .then((responseJson) => {
          this.list_search = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_search
          );
          let list_search_data = JSON.parse(this.list_search);
          this.commentary = list_search_data.length;
          if (this.commentary > 1) this.dataCommentary = 1;
          this.setState({
            serverDataCommentary: list_search_data,
          });
        });
    }
    if (this.state.searchdictionary == true) {
      var urlEntityinDictionary =
        "https://sabdapro.com:3002/App/app_search_data?limit=" +
        this.page +
        "&skip=0&fragment_size=410&type=D&search_in_desc=" +
        this.isindefinition +
        "&search_fuzzy=" +
        this.isfuzzy +
        "&lang_code=" +
        this.language +
        "&ver_code=" +
        ver_code +
        "&keyword=" +
        this.keyword;

      fetch(urlEntityinDictionary)
        .then((response) => response.json())
        .then((responseJson) => {
          this.list_search = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_search
          );
          let list_search_data = JSON.parse(this.list_search);
          this.dictionary = list_search_data.length;
          if (this.dictionary > 0) this.dataDictionary = 1;
          if (this._isMounted) {
            this.setState({
              serverDataDictionary: list_search_data,
            });
          }
        });
    }
    if (this.state.searchlexicon == true) {
      var urlEntityinLexicon =
        "https://sabdapro.com:3002/App/app_search_data?limit=3" +
        "&skip=0&fragment_size=410&type=L&search_in_desc=" +
        this.isindefinition +
        "&search_fuzzy=" +
        this.isfuzzy +
        "&lang_code=" +
        this.language +
        "&ver_code=" +
        ver_code +
        "&keyword=" +
        this.keyword;
      console.log(urlEntityinLexicon);
      fetch(urlEntityinLexicon)
        .then((response) => response.json())
        .then((responseJson) => {
          this.list_search = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_search
          );
          let list_search_data = JSON.parse(this.list_search);
          this.lexicon = [];
          if (list_search_data.length > 0) this.dataLexicon = 1;
          for (let i = 0; i < list_search_data.length; i++) {
            let textdesc = "";
            if (list_search_data[i]._index === "lexstrong") {
              textdesc = this.MyParser.DoParserDiscovery(
                list_search_data[i].short_def, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
              );
            } else if (list_search_data[i]._index === "lexdef") {
              textdesc = this.MyParser.DoParserDiscovery(
                list_search_data[i].definition, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
              );
            }
            console.log(list_search_data[i].strong);
            let span_id = COMethods.getUniqueId("EntityinLexicon");

            this.lexicon.push(
              <View
                key={i + "lexicon"}
                style={{
                  flexDirection: "row",

                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                  paddingBottom: 15,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
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
                      onPress={() => {
                        this.EntityinDetailLexicon(
                          list_search_data[i].strong,
                          this.keyword,
                          this.language
                        );
                      }}
                      style={styles.containerBottomItem}
                    >
                      {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
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
                      {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
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
                      <View
                        style={{
                          flexDirection: "row",
                          paddingLeft: 15,
                          paddingRight: 25,
                        }}
                      >
                        <View>
                          <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                            {" "}
                            {list_search_data[i].lemma_translit}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                            {" "}
                            {list_search_data[i].strong}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    {textdesc}
                  </View>
                </View>
              </View>
            );
          }
          this.setState(
            {
              lexicon: this.lexicon,
            },
            () => { }
          );
        });
    }
    this.setState(
      {
        isLoading: true,
        isshowoptions: false,
        keyword: this.keyword,
      },
      () => {
        this.GoCallAPIEntity();
      }
    );
  }
  ClickReaction3(value, props) { }
  ClickReaction2(value, props) { }
  ClickReaction(value, props) { }
  OpenEntity(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      language: language,
      entity_mention: entity_mention,
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
    push("Entity", {
      entity_id: entity_id,
      language: language,
      key: "Entity " + Math.random,
    });
  }
  QuestionAnswer(keyword, language) {
    const { push } = this.props.navigation;
    push("QuestionAnswers", {
      keyword: keyword,
      language: language,
      fuzzy: this.isfuzzy,
      indefinition: this.isindefinition,
    });
  }
  EntityInBible(keyword, language) {
    const { push } = this.props.navigation;
    push("EntityinBible", {
      keyword: keyword,
      language: language,
      fuzzy: this.isfuzzy,
      indefinition: this.isindefinition,
    });
  }
  EntityInCommentary(keyword, language) {
    const { push } = this.props.navigation;
    push("EntityinCommentary", {
      keyword: keyword,
      language: language,
      fuzzy: this.isfuzzy,
      indefinition: this.isindefinition,
    });
  }
  EntityInDictionary(keyword, language) {
    const { push } = this.props.navigation;
    push("EntityinDictionary", {
      keyword: keyword,
      language: language,
      fuzzy: this.isfuzzy,
      indefinition: this.isindefinition,
    });
  }
  EntityInLexicon(keyword, language) {
    const { push } = this.props.navigation;
    push("EntityinLexicon", {
      keyword: keyword,
      language: language,
      fuzzy: this.isfuzzy,
      indefinition: this.isindefinition,
    });
  }
  EntityDetailinQuestionAnswers(entry_code, vref, key, language) {
    const { navigate } = this.props.navigation;
    navigate("EntityinDetailQuestionsAnswers", {
      entry_code: entry_code,
      vref: vref,
      key: key,
      language: language,
    });
  }
  EntityinDetailCommentary(
    entry_code,
    vref,
    key,
    keyplain,
    res_name,
    language
  ) {
    const { push } = this.props.navigation;
    push("EntityinDetailCommentary", {
      entry_code: entry_code,
      vref: vref,
      key: key,
      keyplain: keyplain,
      res_name: res_name,
      language: language,
    });
  }
  EntityinDetailDictionary(entry_code, res_name, language, keyword) {
    const { push } = this.props.navigation;
    push("EntityinDetailDictionary", {
      entry_code: entry_code,
      res_name: res_name,
      language: language,
      keyword: keyword,
    });
  }
  EntityinDetailLexicon(strongnumber, wordstrong, language) {
    const { navigate } = this.props.navigation;
    navigate("WordStudy", {
      strongnumber: strongnumber,
      wordstrong: wordstrong,
      language: language,
    });
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingBottom: 60,
    paddingLeft: 5,
    paddingRight: 25,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  fontCapital: {
    fontSize: 20,
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
    color: "#353535",
    flex: 1,
    paddingLeft: 10,
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
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  item: {
    padding: 10,
  },
  separator: {
    height: 1,

  },
  text: {
    fontSize: 20,
    color: "#353535",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "#3B64DB",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
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
    ACT_setBookID: (book_id) => dispatch(BibleAction.setBookID(book_id)),
    ACT_setChapterNo: (chapter_no) =>
      dispatch(BibleAction.setChapterNo(chapter_no)),
    ACT_setBookChapterChange: (book_chapter_change) =>
      dispatch(BibleAction.setBookChapterChange(book_chapter_change)),
    ACT_SetVrefChange: (set_vref_change) =>
      dispatch(BibleAction.SetVrefChange(set_vref_change)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
