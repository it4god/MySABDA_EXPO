import React, { Component } from "react";
import {
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Image, Platform
} from "react-native";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import TagParser from "../common/TagParser";
import { List } from "react-native-paper";
import PopToTopScreen from "./Home/PopToTop";
import { Header } from 'react-navigation-stack';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from "expo-file-system";
import CryptoJS from "react-native-crypto-js";
import * as SQLite from 'expo-sqlite';
const headerHeight = Header.HEIGHT * 1.6;
class WordStudyScreen extends Component {
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
      mydata: [],
      language: "eng",
      glossary: "",
      lemma: "",
      lemma_translit: "",
      lemma_translit_ascii: "",
      pronunciation: "",
      morphology: "",
      derived: [],
      synonim: "",
      short_desc: "",
      strong: "",
      title: "",
      strong_id: "",
      wordstrong: "",
      related_entries: [],
      rel_name: [],
      isLoading: true,
      snackIsVisible: false,
      snlabel: "",
      snumber: "",
      list_lex_def: [],
      data_lex: [],
      list_dictionary: [],
      ref_word: [],
      data_lexicon_def: [],
      isLoadingDictionary: false,
      isLoadingLexicon: false,
      isLoadingResources: false,
      semantic_domain: [],
      semantic_domain_id: [],
      entity_id: [],
      entity_mention: "",
      also_called: [],
      desc_multilang: [],
      thumbnail:
        "https://www.junior-kings.co.uk/wp-content/uploads/sites/2/2017/12/blank-small-square.jpg",
      category: "",
      related_to: [],
      total_strong: "",
      gender: "",
      bibledictionary_acc: true,
      otherresources_acc: true,
      entity_acc: true
    };
    this.total_semantic = 0;
    this.word_entity = [];
    this.data_dictionary = [];
    this.mydata_lexdef = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.strongnumber = this.props.navigation.getParam("strongnumber", "");
    this.verse_id = this.props.navigation.getParam("verse_id", "");
    console.log("verse id : " + this.verse_id);
    if (this.strongnumber.substring(0, 1) === "H")
      this.similar_language = "Similar Greek";
    else this.similar_language = "Similar Hebrew";
    this.wordstrong = this.props.navigation.getParam("wordstrong", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.titlewordstudy = DCT.getValue("lemmadefinition", this.language);
    this.titledictionary = DCT.getValue("bibledict", this.language);
    this.titleotherresources = DCT.getValue("otherresources", this.language);
    this.handleChangeTab(DCT.getValue("wordstudy", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.MyParser = new TagParser(this);
    this.fsize = Number(this.props.STORE_BIBLE.FONT_SIZE) + 0.5;
    this.GoCallAPI();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  render() {
    if (
      !this.state.isLoading &&
      !this.state.isLoadingLexicon &&
      !this.state.isLoadingDictionary &&
      !this.state.isLoadingResources
    ) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <List.Section>
            <List.Accordion
              title={this.titlewordstudy}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 18,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={true}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 20,
                  paddingTop: 20,
                  paddingRight: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.lemma}
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontSize: 20,
                    fontWeight: "normal",
                    paddingTop: 2,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.lemma_tranlit}
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    paddingTop: 7,
                    fontSize: 15,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.strong}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: 15,
                  paddingLeft: 20,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: "NotoSans-Bold",
                    fontSize: this.fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("pronunciation", this.language)}
                  {"  "}
                </Text>
                <Text
                  style={{
                    flex: 6,

                    fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.pronunciation}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: 15,
                  paddingLeft: 20,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: "NotoSans-Bold",
                    fontSize: this.fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("glossary", this.language)}
                  {"   "}
                </Text>
                <Text
                  style={{
                    fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.glossary}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: 15,
                  paddingLeft: 20
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: "NotoSans-Bold",
                    fontSize: this.fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("morphology", this.language)}{" "}
                </Text>
                <Text
                  style={{
                    fontWeight: "normal",
                    paddingLeft: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.morphology}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: 15,
                  paddingLeft: 20
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: "NotoSans-Bold",
                    fontSize: this.fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("derived", this.language)}
                  {"   "}
                </Text>
                <View>{this.state.derived}</View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 20,
                  paddingTop: 15
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: "NotoSans-Bold",
                    fontSize: this.fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("synonym", this.language)}
                  {"   "}
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontWeight: "normal",
                    fontSize: this.fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.synonim}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 20,
                  paddingTop: 15
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: "NotoSans-Bold",
                    fontSize: this.fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("relatedentry", this.language)}
                  {"   "}
                </Text>
                {this.state.rel_name}
              </View>
            </List.Accordion>
          </List.Section>
          <View style={{ paddingBottom: 10 }}></View>
          {this.mydata_lexdef.length == 0 && this.props.STORE_BIBLE.OFFLINE == true && (
            <List.Section>
              <List.Accordion

                title={DCT.getValue("nolexicondata", this.language)}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR
                }}
                expanded={true}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 20,
                    paddingRight: 10,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                >
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      paddingLeft: 15,
                      paddingTop: 15,
                      paddingRight: 5
                    }}
                    source={require("../assets/images/download.png")}
                  />
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }} onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate("Download", {});
                  }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("lexicon", this.language)}</Text>
                </View>
              </List.Accordion>
            </List.Section>

          )}
          <List.Section>{this.state.data_lexicon_def}</List.Section>
          {this.data_dictionary.length == 0 && (
            <List.Section>
              <List.Accordion
                title={DCT.getValue("nodictionarydata", this.language)}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={true}
                onPress={() =>
                  this.setState({
                    bibledictionary_acc: !this.state.bibledictionary_acc
                  })
                }
                style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, borderBottomWidth: 1, borderColor: this.props.STORE_STYLE.BORDER_COLOR }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 20,
                    paddingRight: 10,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                >
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      paddingLeft: 15,
                      paddingTop: 15,
                      paddingRight: 5
                    }}
                    source={require("../assets/images/download.png")}
                  />
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }} onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate("Download", {});
                  }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("dictionary", this.language)}</Text>
                </View>
              </List.Accordion>
            </List.Section>
          )}
          {this.data_dictionary.length > 0 && (
            <List.Section>
              <List.Accordion
                title={this.titledictionary}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 18,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.bibledictionary_acc}
                onPress={() =>
                  this.setState({
                    bibledictionary_acc: !this.state.bibledictionary_acc
                  })
                }
                style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, borderBottomWidth: 1, borderColor: this.props.STORE_STYLE.BORDER_COLOR }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                {this.data_dictionary}
              </List.Accordion>
            </List.Section>
          )}
          <List.Section>
            <List.Accordion
              title={this.titleotherresources}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 18,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.otherresources_acc}
              onPress={() =>
                this.setState({
                  otherresources_acc: !this.state.otherresources_acc
                })
              }
              style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              {this.LoadingResources}
            </List.Accordion>
          </List.Section>
          {this.word_entity > 0 && <List.Accordion
            key={"entity"}
            title={DCT.getValue("entity", this.language)}
            expanded={this.state.entity_acc}
            onPress={() => { this.setState({ entity_acc: !this.state.entity_acc }); }}
            titleStyle={{
              fontFamily: "NotoSans-Bold",
              fontSize: 18,
              color: this.props.STORE_STYLE.TEXT_COLOR
            }}
            style={{
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
              borderTopWidth: 1,
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
              key={"cardview1"}
              style={{
                flex: 1,
                flexDirection: "column",
                flexWrap: "nowrap",
                paddingLeft: 20,
                paddingBottom: 10,
                paddingTop: 20,
                paddingRight: 10,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderBottomWidth: 1
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 0
                }}
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "column",
                    flexWrap: "wrap",
                    paddingLeft: 2
                  }}
                >
                  <Text style={[styles.fontCaptial, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                    {this.state.entity_mention}
                  </Text>
                  <View
                    style={{
                      flex: 5,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      paddingLeft: 2
                    }}
                  >
                    <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.state.gender} </Text>
                    <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.state.category}</Text>
                  </View>

                  <Text>{this.state.also_called}</Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    flexWrap: "wrap"
                  }}
                >
                  <Image
                    source={{
                      uri: this.state.thumbnail
                    }}
                    style={{ width: 80, height: 80 }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingBottom: 10,
                paddingTop: 10,
                paddingRight: 10
              }}
              key={"cardview2"}
            >
              <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }} key={"text_cardview2"}>{this.state.desc_multilang}</Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingBottom: 10,
                paddingTop: 10,
                paddingRight: 10
              }}
              key={"more entity"}
            >
              <TouchableOpacity
                key={"touchopacity_entity_id"}
                onPress={() => {
                  this.MoreAbout(
                    this.state.entity_id,
                    this.state.entity_mention,
                    this.language
                  );
                }}
              >
                <Text key={"text_entity_id"} style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                  {"More About "} {this.state.entity_mention}
                </Text>
              </TouchableOpacity>
            </View>
          </List.Accordion>}
          <View style={{ height: 60, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}></View>
        </ScrollView>
      );
    }
  }

  GoCallAPI() {
    if (this._isMounted) {
      this.setState(
        {
          language: this.language
        },
        () => { }
      );
    }
    if (this.props.STORE_BIBLE.OFFLINE == true) {
      this.GoCallLexicon();
      this.GoCallOfflineDictionary();

    }
    else {
      var urlstrongnumber =
        "https://sabdapro.com:3002/App/app_lex_strong?&lang_code=" +
        this.language +
        "&strong_aug=" +
        this.strongnumber;

      fetch(urlstrongnumber)
        .then(response => response.json())
        .then(responseJson => {

          let lexdef = responseJson.data.list_lex_def
          let mystrongnumber = responseJson.data.lex_data

          let semantic_domain = mystrongnumber[0].sem_dom;
          let semantic_domain_id = mystrongnumber[0].sem_dom_id;
          this.this_total_semantic = 0;
          if (semantic_domain != null || semantic_domain != undefined)
            this.this_total_semantic = mystrongnumber[0].sem_dom.length;

          this.wordstrongsynonimword = "";
          if (mystrongnumber.length > 0) {
            if (mystrongnumber[0].synonim != null)
              this.synonimword = mystrongnumber[0].synonim;
            else this.synonimword = "-";

            if (this._isMounted === true) {
              let derived_word = this.MyParser.DoParserDiscovery(
                mystrongnumber[0].derived, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
              );
              let reference_word = this.MyParser.DoParserDiscovery(
                mystrongnumber[0].refsource, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
              );

              this.setState(
                {
                  glossary: mystrongnumber[0].gloss,
                  lemma: mystrongnumber[0].lemma,
                  pronunciation: mystrongnumber[0].pronunciation,
                  morphology: mystrongnumber[0].morph,
                  lemma_translit: mystrongnumber[0].lemma_translit,
                  synonim: this.synonimword,
                  derived: derived_word,
                  strong: mystrongnumber[0].strong,
                  related_entries: mystrongnumber[0].rel_name,
                  wordstrong: this.wordstrong,
                  ref_word: reference_word,
                  semantic_domain: semantic_domain,
                  semantic_domain_id: semantic_domain_id
                },
                () => {
                  let listRender = [];
                  listRender = this.GetRender(mystrongnumber[0].rel_name);
                  this.setState({
                    rel_name: listRender
                  });

                  let listLexDef = [];
                  for (var i = 0; i < lexdef.length; i++) {
                    listLexDef.push(lexdef[i].lex_def_id);
                  }

                  this.SetDetailLexDef(listLexDef);
                }
              );
            }
          }
        });
      this.data_dictionary = [];
      var urldictionary =
        "https://sabdapro.com:3002/App/app_lex_dictionary?limit=100&skip=0&lang_code=" +
        this.language +
        "&strong_aug=" +
        this.strongnumber +
        "&strong_value=" +
        this.wordstrong;
      fetch(urldictionary)
        .then(response => response.json())
        .then(responseJson => {
          this.dictonarydata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_dict
          );
          this.dictonarydata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_dict
          );
          var thedictionary = JSON.parse(this.dictonarydata);

          let listDictionaryData = [];
          for (let i = 0; i < thedictionary.length; i++) {
            listDictionaryData.push({
              res_name: thedictionary[i].res_name,
              term: thedictionary[i].term,
              entry_id: thedictionary[i].entry_id
            });
          }

          if (this._isMounted === true) {
            this.setState(
              {
                list_dictionary: listDictionaryData
              },
              () => {
                this.GoCallAPIDictionary();
              }
            );
          }
        });
    }
  }
  GoCallAPI2(strongnumber) {
    if (this._isMounted) {
      this.setState(
        {
          language: this.language
        },
        () => { }
      );
    }
    var urlstrongnumber =
      "https://sabdapro.com:3002/App/app_lex_strong?&lang_code=" +
      this.language +
      "&strong_aug=" +
      strongnumber;

    fetch(urlstrongnumber)
      .then(response => response.json())
      .then(responseJson => {
        this.strongnumberdata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.lex_data
        );
        this.lexdefdata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_lex_def
        );
        var lexdef = JSON.parse(this.lexdefdata);
        var mystrongnumber = JSON.parse(this.strongnumberdata);

        let semantic_domain = mystrongnumber[0].sem_dom;
        let semantic_domain_id = mystrongnumber[0].sem_dom_id;
        this.this_total_semantic = 0;
        if (semantic_domain != null || semantic_domain != undefined)
          this.this_total_semantic = mystrongnumber[0].sem_dom.length;

        this.wordstrongsynonimword = "";
        if (mystrongnumber.length > 0) {
          if (mystrongnumber[0].synonim != null)
            this.synonimword = mystrongnumber[0].synonim;
          else this.synonimword = "-";

          if (this._isMounted === true) {
            let derived_word = this.MyParser.DoParserDiscovery(
              mystrongnumber[0].derived, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
            );
            let reference_word = this.MyParser.DoParserDiscovery(
              mystrongnumber[0].refsource, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
            );

            this.setState(
              {
                glossary: mystrongnumber[0].gloss,
                lemma: mystrongnumber[0].lemma,
                pronunciation: mystrongnumber[0].pronunciation,
                morphology: mystrongnumber[0].morph,
                lemma_translit: mystrongnumber[0].lemma_translit,
                synonim: this.synonimword,
                derived: derived_word,
                strong: mystrongnumber[0].strong,
                related_entries: mystrongnumber[0].rel_name,
                wordstrong: this.wordstrong,
                ref_word: reference_word,
                semantic_domain: semantic_domain,
                semantic_domain_id: semantic_domain_id
              },
              () => {
                let listRender = [];
                listRender = this.GetRender(mystrongnumber[0].rel_name);
                this.setState({
                  rel_name: listRender
                });

                let listLexDef = [];
                for (var i = 0; i < lexdef.length; i++) {
                  listLexDef.push(lexdef[i].lex_def_id);
                }

                this.SetDetailLexDef(listLexDef);
              }
            );
          }
        }
      });
    this.data_dictionary = [];
    var urldictionary =
      "https://sabdapro.com:3002/App/app_lex_dictionary?limit=100&skip=0&lang_code=" +
      this.language +
      "&strong_aug=" +
      this.strongnumber +
      "&strong_value=" +
      this.wordstrong;
    fetch(urldictionary)
      .then(response => response.json())
      .then(responseJson => {
        this.dictonarydata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_dict
        );
        this.dictonarydata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_dict
        );
        var thedictionary = JSON.parse(this.dictonarydata);

        let listDictionaryData = [];
        for (let i = 0; i < thedictionary.length; i++) {
          listDictionaryData.push({
            res_name: thedictionary[i].res_name,
            term: thedictionary[i].term,
            entry_id: thedictionary[i].entry_id
          });
        }

        if (this._isMounted === true) {
          this.setState(
            {
              list_dictionary: listDictionaryData
            },
            () => {
              this.GoCallAPIDictionary();
            }
          );
        }
      });
  }
  GoCallAPIDictionary() {
    const { list_dictionary } = this.state;
    this.data_dictionary = [];
    for (let i = 0; i < list_dictionary.length; i++) {
      if (i == 0) {
        this.data_dictionary.push(
          <View
            key={i}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
              flexWrap: "nowrap"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingTop: 7,
                paddingRight: 7,
                flexWrap: "nowrap"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.openDictionary(
                    list_dictionary[i].term,
                    list_dictionary[i].res_name,
                    list_dictionary[i].entry_id
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
                      paddingRight: 5
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
                      paddingRight: 5
                    }}
                    source={require("../assets/images/record_darkmode.png")}
                  />
                )}
                <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                  <Text
                    style={{
                      paddingLeft: 15,
                      fontFamily: "NotoSans-Bold",
                      paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {list_dictionary[i].term}{" "}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 15,
                      fontWeight: "normal",
                      paddingRight: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {list_dictionary[i].res_name}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        this.data_dictionary.push(
          <View
            key={i}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              flexWrap: "nowrap",
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingRight: 7,
                flexWrap: "nowrap"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.openDictionary(
                    list_dictionary[i].term,
                    list_dictionary[i].res_name,
                    list_dictionary[i].entry_id
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
                      paddingRight: 5
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
                      paddingRight: 5
                    }}
                    source={require("../assets/images/record_darkmode.png")}
                  />
                )}
                <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                  <Text
                    style={{
                      paddingLeft: 15,
                      fontFamily: "NotoSans-Bold",
                      paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {list_dictionary[i].term}{" "}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 15,
                      fontWeight: "normal",
                      paddingRight: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {list_dictionary[i].res_name}{" "}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    this.LoadingResources = [];
    this.LoadingResources.push(
      <View
        key={"similar hebrew"}
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
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
            paddingRight: 7
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.openSimilarOriginalLanguage(
                this.state.lemma,
                this.state.lemma_translit,
                this.state.strong
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
                  paddingRight: 5
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
                  paddingRight: 5
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
            )}
            <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: "NotoSans-Bold",
                  paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.similar_language}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );

    this.LoadingResources.push(
      <View
        key={"verse occurence"}
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
            paddingRight: 7
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.openVerseOccurence(
                this.state.lemma,
                this.state.lemma_translit,
                this.state.strong
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
                  paddingRight: 5
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
                  paddingRight: 5
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
            )}
            <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: "NotoSans-Bold",
                  paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {"Verse Occurence"}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
    this.LoadingResources.push(
      <View
        key={"Translations"}
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
            paddingRight: 7
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.openTranslation(
                this.state.lemma,
                this.state.lemma_translit,
                this.state.strong
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
                  paddingRight: 5
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
                  paddingRight: 5
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
            )}
            <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: "NotoSans-Bold",
                  paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {"Translations"}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
    this.LoadingResources.push(
      <View
        key={"Word Forms"}
        style={{
          flexDirection: "row",
          borderColor: this.props.STORE_STYLE.BORDER_COLOR,
          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingTop: 7,
            paddingRight: 7
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.OpenWordForms(
                this.state.lemma,
                this.state.lemma_translit,
                this.state.strong
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
                  paddingRight: 5
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
                  paddingRight: 5
                }}
                source={require("../assets/images/record_darkmode.png")}
              />
            )}
            <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: "NotoSans-Bold",
                  paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {"Word Forms"}{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
    this.setState(
      {
        isLoadingDictionary: true,
        isLoadingResources: true
      },
      () => { }
    );
  }
  openTranslation(lemma, lemma_translit, strong_aug) {
    const { push } = this.props.navigation;

    push("Translations", {
      lemma: lemma,
      lemma_translit: lemma_translit,
      strong_aug: strong_aug,
      key: "Translations " + Math.random
    });
  }
  OpenWordForms(lemma, lemma_translit, strong_aug) {
    const { push } = this.props.navigation;

    push("WordForms", {
      lemma: lemma,
      lemma_translit: lemma_translit,
      strong_aug: strong_aug,
      key: "WordForms " + Math.random
    });
  }

  openSimilarOriginalLanguage(lemma, lemma_translit, strong_aug) {
    const { push } = this.props.navigation;

    push("SimilarHebrew", {
      lemma: lemma,
      lemma_translit: lemma_translit,
      strong_aug: strong_aug,
      key: "Similar Hebrew/Greek " + Math.random
    });
  }

  openVerseOccurence(lemma, lemma_translit, strong_aug) {
    const { push } = this.props.navigation;

    push("VerseOccurence", {
      lemma: lemma,
      lemma_translit: lemma_translit,
      strong_aug: strong_aug,
      key: "Verse Occurence" + Math.random
    });
  }

  openDictionary(term, res_name, entry_id) {
    const { push } = this.props.navigation;

    push("WordStudyDictionary", {
      term: term,
      res_name: res_name,
      entry_id: entry_id,
      key: "WordStudyDictionary " + Math.random
    });
  }
  SetDetailLexDef(listLexDef) {
    this.detail_lexicon_def = [];
    for (var i = 0; i < listLexDef.length; i++) {
      var detail_lex_def_url =
        "https://sabdapro.com:3002/App/app_lex_def?lex_def_id=" +
        listLexDef[i] +
        "&lang_code=" +
        this.language +
        "&skip=0&limit=10";

      fetch(detail_lex_def_url)
        .then(response => response.json())
        .then(responseJson => {
          this.data_lex_def_raw = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_lex_def
          );
          var data_lex_def = JSON.parse(this.data_lex_def_raw);
          this.detail_lexicon_def.push({
            res_name: data_lex_def[0].res_name,
            definition: data_lex_def[0].definition
          });
          this.detail_lexicon_def.sort(dynamicSort("res_name"));
          if (this._isMounted === true) {
            this.setState(
              {
                list_lex_def: this.detail_lexicon_def
              },
              () => {

              }
            );
          }
        });

    }
    setTimeout(() => {
      if (this.props.STORE_BIBLE.OFFLINE == false)
        this.GoCallLexicon();
    }, 1000);

  }

  async DctOffline() {
    console.log(this.mydata_dct.length + "mydata_dct length")
    this.data_dictionary = [];
    if (this.mydata_dct.length > 0) {

      for (let i = 0; i < this.mydata_dct.length; i++) {


        if (i == 0) {
          this.data_dictionary.push(
            <View
              key={i}
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                flexWrap: "nowrap"
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingTop: 7,
                  paddingRight: 7,
                  flexWrap: "nowrap"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.openDictionary(
                      this.mydata_dct[i].term,
                      this.mydata_dct[i].res_name,
                      this.mydata_dct[i].entry_code
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
                        paddingRight: 5
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
                        paddingRight: 5
                      }}
                      source={require("../assets/images/record_darkmode.png")}
                    />
                  )}
                  <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                    <Text
                      style={{
                        paddingLeft: 15,
                        fontFamily: "NotoSans-Bold",
                        paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.mydata_dct[i].term}{" "}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 15,
                        fontWeight: "normal",
                        paddingRight: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.mydata_dct[i].res_name}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        } else {
          this.data_dictionary.push(
            <View
              key={i}
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                flexWrap: "nowrap",
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingRight: 7,
                  flexWrap: "nowrap"
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.openDictionary(
                      this.mydata_dct[i].term,
                      this.mydata_dct[i].res_name,
                      this.mydata_dct[i].entry_code
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
                        paddingRight: 5
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
                        paddingRight: 5
                      }}
                      source={require("../assets/images/record_darkmode.png")}
                    />
                  )}
                  <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                    <Text
                      style={{
                        paddingLeft: 15,
                        fontFamily: "NotoSans-Bold",
                        paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.mydata_dct[i].term}{" "}
                    </Text>
                    <Text
                      style={{
                        paddingLeft: 15,
                        fontWeight: "normal",
                        paddingRight: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.mydata_dct[i].res_name}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      }

      this.LoadingResources = [];
      this.LoadingResources.push(
        <View
          key={"similar hebrew"}
          style={{
            flexDirection: "row",
            borderTopWidth: 1,
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
              paddingRight: 7
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.openSimilarOriginalLanguage(
                  this.state.lemma,
                  this.state.lemma_translit,
                  this.state.strong
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
                    paddingRight: 5
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
                    paddingRight: 5
                  }}
                  source={require("../assets/images/record_darkmode.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.similar_language}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );

      this.LoadingResources.push(
        <View
          key={"verse occurence"}
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
              paddingRight: 7
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.openVerseOccurence(
                  this.state.lemma,
                  this.state.lemma_translit,
                  this.state.strong
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
                    paddingRight: 5
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
                    paddingRight: 5
                  }}
                  source={require("../assets/images/record_darkmode.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {"Verse Occurence"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
      this.LoadingResources.push(
        <View
          key={"Translations"}
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
              paddingRight: 7
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.openTranslation(
                  this.state.lemma,
                  this.state.lemma_translit,
                  this.state.strong
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
                    paddingRight: 5
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
                    paddingRight: 5
                  }}
                  source={require("../assets/images/record_darkmode.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {"Translations"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
      this.LoadingResources.push(
        <View
          key={"Word Forms"}
          style={{
            flexDirection: "row",
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.OpenWordForms(
                  this.state.lemma,
                  this.state.lemma_translit,
                  this.state.strong
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
                    paddingRight: 5
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
                    paddingRight: 5
                  }}
                  source={require("../assets/images/record_darkmode.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "nowrap" }}>
                <Text
                  style={{
                    paddingLeft: 15,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {"Word Forms"}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
      this.setState(
        {
          isLoadingDictionary: true,
          isLoadingResources: true
        },
        () => { }
      );
    }
  }

  async LexOffline() {
    this.data_lexicon_def = [];
    console.log(this.mydata_lexdef.length + "mydata_lexdef length")
    if (this.mydata_lexdef.length > 0) {

      for (let i = 0; i < this.mydata_lexdef.length; i++) {
        let datatext = this.mydata_lexdef[i].entry_code;
        let manual_data_object = "";
        let manual_data_text = "";
        console.log(datatext)
        if (datatext.includes("abbott")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_01_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("av_eng")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_02_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("av_ind")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_03_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("barclay")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_04_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("boeker")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_05_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("strong")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_06_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("tdnt")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_07_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("twot")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_08_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("yoppi")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_09_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("tbesh")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_10_entry.json", { encoding: EncodingType.UTF8 });
        }
        else if (datatext.includes("lsj")) {
          manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "lexdef_11_entry.json", { encoding: EncodingType.UTF8 });
        }

        var json = JSON.parse((manual_data_object));
        console.log(json)
        console.log(json[datatext.toString()].definition);
        manual_data_text = json[datatext].definition;

        var key = CryptoJS.enc.Hex.parse('2d4d6d615f79353444395f413133502d7a73306c69443351367152314168613d');
        var iv = CryptoJS.enc.Hex.parse(manual_data_text.substring(0, 32));
        var manual_data = (manual_data_text.substring(32));
        var decrypted = CryptoJS.AES.decrypt(
          manual_data, key,
          {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
          }
        );



        let thedefinition = this.MyParser.DoParserDiscovery(
          decrypted.toString(CryptoJS.enc.Utf8).replace(/<\/vref>; /g, "</vref>").replace(/""/g, '"'), this.props.STORE_BIBLE.IS_SHOW_DARKMODE
        );

        this.title_definition_res_name = this.mydata_lexdef[i].res_name;
        if (i == 0) {
          this.data_lexicon_def.push(
            <List.Accordion
              key={i + Math.random()}
              title={this.title_definition_res_name}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
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
                  flexDirection: "column",
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  paddingRight: 10,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR
                }}
              >
                {thedefinition}
              </View>
            </List.Accordion>
          );
        } else {
          this.data_lexicon_def.push(
            <List.Accordion
              key={i + Math.random()}
              title={this.title_definition_res_name}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
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
                  flexDirection: "column",
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  paddingRight: 10,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR
                }}
              >
                {thedefinition}
              </View>
            </List.Accordion>
          );
        }
      }
      this.setState({ ok: true })
    }

    this.title_definition = DCT.getValue("references", this.language);
    this.data_lexicon_def.push(
      <List.Accordion
        key={"132"}
        title={this.title_definition}
        titleStyle={{
          fontFamily: "NotoSans-Bold",
          fontSize: 16,
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
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 10,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR
          }}
        >
          {this.state.ref_word}
        </View>
      </List.Accordion>
    );
    this.setState({ ok: true })
    this.title_semantic_domain = DCT.getValue("semanticdom", this.language);
    this.semantic = [];
    for (let x = 0; x < this.this_total_semantic; x++) {
      this.semantic.push(
        <Text
          key={x + "semantic"}
          style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
          onPress={() => {
            this.ShowSemanticDomain(this.state.semantic_domain_id[x]);
          }}
        >
          {this.state.semantic_domain[x]}
        </Text>
      );
    }
    if (this.semantic.length > 0)
      this.data_lexicon_def.push(
        <List.Accordion
          key={"semantic_domain"}
          title={this.title_semantic_domain}
          titleStyle={{
            fontFamily: "NotoSans-Bold",
            fontSize: 16,
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
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 10,
              paddingTop: 15,
              paddingBottom: 15,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR
            }}
          >
            {this.semantic}
          </View>
        </List.Accordion>
      );
    this.setState({ ok: true })
    var url_entity =
      "https://sabdapro.com:3002/App/app_lex_entity?limit=6&skip=0&lang_code=eng&strong_aug=" +
      this.strongnumber +
      "&verse_id=" +
      this.verse_id;
    console.log(url_entity);
    fetch(url_entity)
      .then(response => response.json())
      .then(responseJson => {
        this.list_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        var list_entity = JSON.parse(this.list_entity);
        this.entity_id = 0;

        if (list_entity.length > 0) {
          this.entity_id = list_entity[0].entity_id;

          this.showEntity(this.entity_id);
        }
      });
    this.setState(
      {
        isLoadingLexicon: true,
        data_lexicon_def: this.data_lexicon_def
      },
      () => { }
    );



  }
  GoCallLexicon() {
    let dblex = SQLite.openDatabase('lexicon.db');
    let sqlquerylex = "";
    if (this.strongnumber.includes("G")) {
      sqlquerylex = "SELECT * from entry_lex_01_G where strong_aug = '" + this.strongnumber + "'"
    }
    else if (this.strongnumber.includes("H")) {
      sqlquerylex = "SELECT * from entry_lex_01_H where strong_aug = '" + this.strongnumber + "'"
    }

    try {
      dblex.transaction(
        tx => {
          tx.executeSql(sqlquerylex,
            [],
            (_, { rows: { _array } }) => this.setState({ mydata_lex: _array }),
            (tx, error) => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        },
        () => {
          this.wordstrongsynonimword = "";
          if (this.state.mydata_lex[0].synonim != null)
            this.synonimword = this.state.mydata_lex[0].synonim;
          else this.synonimword = "-";
          let derived_word = this.MyParser.DoParserDiscovery(
            this.state.mydata_lex[0].derived, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
          );
          let reference_word = this.MyParser.DoParserDiscovery(
            this.state.mydata_lex[0].reference, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
          );
          this.setState(
            {
              glossary: this.state.mydata_lex[0].gloss,
              lemma: this.state.mydata_lex[0].lemma,
              pronunciation: this.state.mydata_lex[0].pronunciation,
              morphology: this.state.mydata_lex[0].morph,
              lemma_translit: this.state.mydata_lex[0].lemma_translit,
              synonim: this.synonimword,
              derived: derived_word,
              strong: this.state.mydata_lex[0].strong,
              related_entries: [],
              wordstrong: this.wordstrong,
              ref_word: reference_word,
              semantic_domain: '',
              semantic_domain_id: ''
            },
          )
        }
      );
    } catch (e) {
      console.log(e);
    }


    this.lang_id = "0";
    if (this.props.STORE_BIBLE.LANG_CODE === "eng")
      this.lang_id = "1"
    else
      this.lang_id = "2"
    console.log("Strong Number : " + this.strongnumber + "this lang id " + this.lang_id);
    const { list_lex_def } = this.state;

    if (this.props.STORE_BIBLE.OFFLINE === true) {
      if (this.strongnumber.includes("G")) {
        let db = SQLite.openDatabase('lexdef_map.db');
        let sqlquery = "";
        if (this.lang_id == "1")
          sqlquery = "SELECT entry_code, res_name, res_abbr FROM map_lexdef_strong_01_G INNER JOIN resource_lexdef ON map_lexdef_strong_01_G.res_id = resource_lexdef.res_id WHERE strong = '" + this.strongnumber + "'";
        else
          sqlquery = "SELECT entry_code,res_name, res_abbr FROM map_lexdef_strong_02_G INNER JOIN resource_lexdef ON map_lexdef_strong_02_G.res_id = resource_lexdef.res_id WHERE strong = '" + this.strongnumber + "'";
        console.log(sqlquery)
        try {
          db.transaction(
            tx => {
              console.log("This is printed");
              tx.executeSql(sqlquery,
                [],
                (_, { rows: { _array } }) => this.mydata_lexdef = _array,
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);
            },
            () => {
              this.LexOffline();
              this.setState({ ok: true })
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
      else if (this.strongnumber.includes("H")) {
        let db = SQLite.openDatabase('lexdef_map.db');
        let sqlquery = "";
        if (this.lang_id == "1")
          sqlquery = "SELECT entry_code, res_name, res_abbr FROM map_lexdef_strong_01_H INNER JOIN resource_lexdef ON map_lexdef_strong_01_H.res_id = resource_lexdef.res_id WHERE strong = '" + this.strongnumber + "'";
        else
          sqlquery = "SELECT entry_code,res_name, res_abbr FROM map_lexdef_strong_02_H INNER JOIN resource_lexdef ON map_lexdef_strong_02_H.res_id = resource_lexdef.res_id WHERE strong = '" + this.strongnumber + "'";
        console.log(sqlquery)
        try {
          db.transaction(
            tx => {
              console.log("This is printed");
              tx.executeSql(sqlquery,
                [],
                (_, { rows: { _array } }) => this.setState({ mydata_lexdef: _array }),
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);
            },
            () => {
              this.LexOffline();
              this.setState({ ok: true })
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
    else {
      this.data_lexicon_def = [];
      if (list_lex_def.length > 0) {
        for (let i = 0; i < list_lex_def.length; i++) {
          let thedefinition = this.MyParser.DoParserDiscovery(
            list_lex_def[i].definition.replace(/<\/vref>; /g, "</vref>"), this.props.STORE_BIBLE.IS_SHOW_DARKMODE
          );

          this.title_definition_res_name = list_lex_def[i].res_name;
          if (i == 0) {
            this.data_lexicon_def.push(
              <List.Accordion
                key={i}
                title={this.title_definition_res_name}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
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
                    flexDirection: "column",
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 20,
                    paddingRight: 10,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                >
                  {thedefinition}
                </View>
              </List.Accordion>
            );
          } else {
            this.data_lexicon_def.push(
              <List.Accordion
                key={i}
                title={this.title_definition_res_name}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
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
                    flexDirection: "column",
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 20,
                    paddingRight: 10,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                >
                  {thedefinition}
                </View>
              </List.Accordion>
            );
          }
        }
        this.setState(
          {
            isLoadingLexicon: true,
            data_lexicon_def: this.data_lexicon_def
          },
          () => { }
        );
      }
      this.title_definition = DCT.getValue("references", this.language);
      this.data_lexicon_def.push(
        <List.Accordion
          key={"132"}
          title={this.title_definition}
          titleStyle={{
            fontFamily: "NotoSans-Bold",
            fontSize: 16,
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
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 10,
              paddingTop: 15,
              paddingBottom: 15,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR
            }}
          >
            {this.state.ref_word}
          </View>
        </List.Accordion>
      );
      this.title_semantic_domain = DCT.getValue("semanticdom", this.language);
      this.semantic = [];
      for (let x = 0; x < this.this_total_semantic; x++) {
        this.semantic.push(
          <Text
            key={x + "semantic"}
            style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}
            onPress={() => {
              this.ShowSemanticDomain(this.state.semantic_domain_id[x]);
            }}
          >
            {this.state.semantic_domain[x]}
          </Text>
        );
      }
      if (this.semantic.length > 0)
        this.data_lexicon_def.push(
          <List.Accordion
            key={"semantic_domain"}
            title={this.title_semantic_domain}
            titleStyle={{
              fontFamily: "NotoSans-Bold",
              fontSize: 16,
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
                flexDirection: "column",
                paddingLeft: 20,
                paddingRight: 10,
                paddingTop: 15,
                paddingBottom: 15,
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
            >
              {this.semantic}
            </View>
          </List.Accordion>
        );

      var url_entity =
        "https://sabdapro.com:3002/App/app_lex_entity?limit=6&skip=0&lang_code=eng&strong_aug=" +
        this.strongnumber +
        "&verse_id=" +
        this.verse_id;
      console.log(url_entity);
      fetch(url_entity)
        .then(response => response.json())
        .then(responseJson => {
          this.list_entity = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_entity
          );
          var list_entity = JSON.parse(this.list_entity);
          this.entity_id = 0;

          if (list_entity.length > 0) {
            this.entity_id = list_entity[0].entity_id;

            this.showEntity(this.entity_id);
          }
        });

    }

  }
  GoCallOfflineDictionary() {

    this.lang_id = "0";
    if (this.props.STORE_BIBLE.LANG_CODE === "eng")
      this.lang_id = "1"
    else
      this.lang_id = "2"
    this.mydata_dct = [];
    if (this.props.STORE_BIBLE.OFFLINE === true) {
      if (this.strongnumber.includes("G")) {
        let db = SQLite.openDatabase('dct_map.db');
        let sqlquery = "";
        if (this.lang_id == "1")
          sqlquery = "SELECT strong, entry_code, term, res_abbr, res_name FROM map_dct_strong_01_G INNER JOIN resource_dct ON map_dct_strong_01_G.res_id = resource_dct.res_id WHERE strong = '" + this.strongnumber + "'";
        else
          sqlquery = "SELECT strong, entry_code, term, res_abbr, res_name FROM map_dct_strong_02_G INNER JOIN resource_dct ON map_dct_strong_02_G.res_id = resource_dct.res_id WHERE strong = '" + this.strongnumber + "'";
        console.log(sqlquery)
        try {
          db.transaction(
            tx => {
              tx.executeSql(sqlquery,
                [],
                (_, { rows: { _array } }) => this.mydata_dct = _array,
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);
            },
            () => {
              this.DctOffline();
              this.setState({ ok: true })
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
      else if (this.strongnumber.includes("H")) {
        let db = SQLite.openDatabase('dct_map.db');
        let sqlquery = "";
        if (this.lang_id == "1")
          sqlquery = "SELECT strong, entry_code, term, res_abbr FROM map_dct_strong_01_H INNER JOIN resource_dct ON map_dct_strong_01_H.res_id = resource_dct.res_id WHERE strong = '" + this.strongnumber + "'";
        else
          sqlquery = "SELECT strong, entry_code, term, res_abbr FROM map_dct_strong_02_H INNER JOIN resource_dct ON map_dct_strong_02_H.res_id = resource_dct.res_id WHERE strong = '" + this.strongnumber + "'";
        console.log(sqlquery)
        try {
          db.transaction(
            tx => {
              console.log("This is printed");
              tx.executeSql(sqlquery,
                [],
                (_, { rows: { _array } }) => this.setState({ mydata_dct: _array }),
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);
            },
            () => {
              this.DctOffline();
              this.setState({ ok: true })
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    }



  }


  showEntity(entity_id) {
    var url_search_entity =
      "https://sabdapro.com:3002/App/app_entity?entity_id=" +
      entity_id +
      "&lang_code=" +
      this.language;

    fetch(url_search_entity)
      .then(response => response.json())
      .then(responseJson => {
        this.search_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        var list_search_entity = JSON.parse(this.search_entity);

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
          this.word_entity = 1;
          if (also_called != null) {
            this.also_called.push(
              <Text key={"also_called"} style={{ fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                {"Also called : "}
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
          let total_strong = "";
          if (strong_number != null && strong_number.length > 0) {

            for (var i = 0; i < strong_number.length; i++) {
              total_strong = total_strong + "," + strong_number[i];
            }
            total_strong = total_strong.substr(1);
          }
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
                entity_id: entity_id,
                gender: gender,
                total_strong: total_strong
              },
              () => {
                this.ShowWordEntityDisplay();
              }
            );
          }
        }
      });
  }
  ShowWordEntityDisplay() {

  }
  MoreAbout(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random
    });
  }
  OpenSearchEntity(entity_id, entity_mention, language) {
    // const {navigate } = this.props.navigation;
    /*
    navigate("Search", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Search Screen " + Math.random
    });
    */
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random
    });
  }

  GetRender(value) {
    let id = COMethods.getUniqueId("para");
    return (
      <View
        key={id}
        style={{
          flexDirection: "row",
          paddingTop: 5,
          paddingBottom: 5,
          flexWrap: "wrap"
        }}
      >
        {this.ParserTagRelatedEntries(value)}
      </View>
    );
  }

  ShowSemanticDomain(value) {
    const { push } = this.props.navigation;

    push("SemanticDomain", {
      semantic_id: value,
      key: "SemanticDomain " + Math.random
    });
  }
  ShowStrongNumber(value) {
    var urlstrongnumber =
      "https://sabdapro.com:3002/App/app_lex_strong?&lang_code=" +
      this.language +
      "&strong_aug=" +
      value;
    let text = "";
    fetch(urlstrongnumber)
      .then(response => response.json())
      .then(responseJson => {
        this.strongnumberdata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.lex_data
        );
        var mystrongnumber = JSON.parse(this.strongnumberdata);
        this.strongnumber = mystrongnumber[0].strong;
        this.lemma = mystrongnumber[0].lemma;
        this.glossary = mystrongnumber[0].gloss;

        Alert.alert(
          "   " + this.lemma + "  " + this.strongnumber,
          this.glossary,
          [
            {
              text: DCT.getValue("close", this.language),
              onPress: () => console.log("Tutup"),
              style: "cancel"
            },
            {
              text: DCT.getValue("studyword", this.language),

              onPress: () =>
                this.GoNextWordStudy(this.strongnumber, this.glossary)
            }
          ],
          { cancelable: false }
        );
      });
  }

  GoNextWordStudy(strongnumber, wordstrong) {
    const { push } = this.props.navigation;
    push("WordStudy", {
      strongnumber: strongnumber,
      wordstrong: wordstrong,
      nextwordstyd: "true",
      key: "WordStudy " + Math.random
    });
  }

  ParserTagRelatedEntries(objChild) {
    let renderlist = [];
    for (var i = 0; i < objChild.length; i++) {
      let objStyle = this.onGetTagName("biblex");
      let span_id = COMethods.getUniqueId(objStyle.key);
      var value = objChild[i];

      renderlist.push(this.GetRenderItem(span_id, value));
    }
    return renderlist;
  }
  GetRenderItem(span_id, value) {
    return (
      <TouchableHighlight
        underlayColor="yellow"
        key={span_id}
        onPress={() => {
          this.ShowStrongNumber(value);
        }}
      >
        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>{value} </Text>
      </TouchableHighlight>
    );
  }
  ShowDialogVerse(text, verse) {
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <ScrollView>
              <View style={{ flexDirection: "row-reverse" }}>
                <TouchableOpacity
                  onPress={() => {
                    DialogManager.dismissAll(() => { });
                  }}
                >
                  {/*Donute Button Image */}

                  <View style={{ alignItems: "center", justifyContent: "center", height: 50, width: 100 }}>
                    <Image
                      source={require("../assets/images/cross.png")}
                      style={{ width: 15, height: 15, marginLeft: 8 }}
                    />
                  </View>

                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "#353535",
                  fontSize: 25,
                  textAlign: "center"
                }}
              >
                {verse}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 150,
                  justifyContent: "flex-end"
                }}
              >
                {text}
              </View>
            </ScrollView>
          </DialogContent>
        )
      },
      () => { }
    );
  }

  ClickReaction(value, props) {
    var str = value.replace(/seterip/g, "-");
    var array = str.split("|");
    var classnumber = array[0];
    var ver_code = "esv";
    if (props.lang_code == "eng") ver_code = "esv";
    else ver_code = "tb";
    if (classnumber === "clsVref") {

      DialogManager.dismissAll(() => { });
      props.props.navigation.navigate("VerseScreen", {
        value: value
      });

      /*
      var vid = array[1];
      var verse = array[2];
      let array_vid = [];
      if (vid.indexOf(",") > 0) {
        array_vid = vid.split(",");
      }
      if (array_vid.length === 0) {
        let urlvref =
          "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
          vid +
          "&ver_code=" + ver_code;
        console.log(urlvref);
        fetch(urlvref)
          .then(response => response.json())
          .then(responseJson => {
            this.vrefdata = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_verse
            );
            let myvrefdata = JSON.parse(this.vrefdata);
            let text = "";
            let texttemp = "";
            for (let i = 0; i < myvrefdata.length; i++)
              {
                texttemp = myvrefdata[i].text;
                texttemp = texttemp.replace(/<para>/g,"");
                texttemp = texttemp.replace(/<\/para>/g,"");
                text += texttemp
              }

            let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
            this.rendertext = props.MyParser.DoParserBibleFullVersion(text,true,false,true,false, props.props.STORE_BIBLE.FONT_SIZE, props.version_code, true);
            props.ShowDialogVerse(this.rendertext, verse);
          });
      } else {
        this.rendertext = [];

        for (let x = 0; x < array_vid.length; x++) {
          this.versevref = " ";
          let urlvref =
            "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
            array_vid[x] +
            "&ver_code=" + ver_code;
          console.log(urlvref);
          fetch(urlvref)
            .then(response => response.json())
            .then(responseJson => {
              this.vrefdata = JSON.stringify(
                JSON.parse(JSON.stringify(responseJson)).data.list_verse
              );
              let myvrefdata = JSON.parse(this.vrefdata);
              let text = "";
              let texttemp = "";
              for (let i = 0; i < myvrefdata.length; i++)
              {
                texttemp = myvrefdata[i].text;
                texttemp = texttemp.replace(/<para>/g,"");
                texttemp = texttemp.replace(/<\/para>/g,"");
                text += texttemp
              }
           

              

              let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
              this.rendertext.push(
                <View key={array_vid[x] + " title"} style={{ height: 40 }}>
                  <Text
                    style={{
                      color: "#353535",
                      fontSize: 25,
                      textAlign: "center"
                    }}
                  >
                    {verse}
                  </Text>
                </View>
              );
              this.rendertext.push(props.MyParser.DoParserBibleFullVersion(text,true,false,true,false, props.props.STORE_BIBLE.FONT_SIZE, props.version_code, true));
              this.rendertext.push(
                <View key={array_vid[x]} style={{ height: 20 }}></View>
              );
         
            });
        }

        setTimeout(() => {
          props.ShowDialogVerse(this.rendertext, " ");
        }, 600);
      }*/
    }
    if (classnumber === "clsCmt") {
      var strongnumber = array[1];
      strongnumber = strongnumber.replace("entry_code##", "");

      var urlcmtnumber =
        "https://sabdapro.com:3002/App/app_comment_detail?lang_code=" +
        props.language +
        "&entry_code=" +
        strongnumber;
      let text = "";

      fetch(urlcmtnumber)
        .then(response => response.json())
        .then(responseJson => {
          this.listcommentdata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_comment
          );
          var commentdata = JSON.parse(this.listcommentdata);
          let text = commentdata[0].text;
          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");

          this.rendertext = props.MyParser.DoParserDiscovery(text);
          props.GoShowCMT(this.rendertext);
        });
    }
    if (classnumber === "clsLex") {
      var strongnumber = array[1];
      props.ShowStrongNumber(strongnumber);
    }
    if (classnumber === "clsLexDef") {
      var lexdef = array[1];

      var urllexdef =
        "https://sabdapro.com:3002/App/app_lex_def?lang_code=" +
        props.language +
        "&spec_code=" +
        lexdef;

      fetch(urllexdef)
        .then(response => response.json())
        .then(responseJson => {
          this.lex_def_data = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_lex_def
          );
          var lex_def_data = JSON.parse(this.lex_def_data);
          let text = lex_def_data[0].definition;

          this.rendertext = props.MyParser.DoParserDiscovery(text);
          props.GoShowCMT(this.rendertext);
        });
    }
  }

  GoShowCMT(value) {
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <ScrollView>
              <TouchableOpacity
                style={{ flex: 2, paddingRight: 5 }}
                key={"to global close"}
                onPress={() => {
                  DialogManager.dismissAll(() => { });
                }}
              >
                <Text
                  style={{
                    color: "#105B8E",
                    fontSize: 25,
                    textAlign: "center"
                  }}
                >
                  {"X"}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  paddingBottom: 150,
                  paddingTop: 20,
                  justifyContent: "center"
                }}
              >
                {value}
              </View>
            </ScrollView>
          </DialogContent>
        )
      },
      () => { }
    );
  }
  onGetTagName(tag) {
    var objStyle = {};

    if (this.is_highlight && !this.list_tag_exception.includes(tag))
      return objStyle;

    switch (tag) {
      case "para":
        objStyle.key = "para";
        if (this.onlyverse) objStyle.classname = "clsParagraph_onlyverse";
        else objStyle.classname = "clsParagraph";
        break;
      case "table":
        objStyle.key = "table";
        objStyle.classname = "clsTable";
        break;
      case "thead":
        objStyle.key = "thead";
        //objStyle.classname = 'clsTable';
        break;
      case "tbody":
        objStyle.key = "tbody";
        //objStyle.classname = 'clsTable';
        break;
      case "tfoot":
        objStyle.key = "tfoot";
        //objStyle.classname = 'clsTable';
        break;
      case "caption":
        objStyle.key = "caption";
        //objStyle.classname = 'clsTable';
        break;
      case "col":
        objStyle.key = "col";
        //objStyle.classname = 'clsTable';
        break;
      case "colgroup":
        objStyle.key = "colgroup";
        //objStyle.classname = 'clsTable';
        break;

      case "tr":
        objStyle.key = "tr";
        //objStyle.classname = 'clsTable';
        break;
      case "th":
        objStyle.key = "th";
        //objStyle.classname = 'clsTable';
        break;
      case "td":
        objStyle.key = "td";
        //objStyle.classname = 'clsTable';
        break;
      case "quote":
        objStyle.key = "quote";
        if (this.onlyverse) objStyle.classname = "clsQuote_onlyverse";
        else objStyle.classname = "clsQuote";
        break;
      case "poetry":
        objStyle.key = "poetry";
        if (this.onlyverse) objStyle.classname = "clsPoetry_onlyverse";
        else objStyle.classname = "clsPoetry";
        break;

      case "ul":
        objStyle.key = "ul";
        objStyle.classname = "clsUL";
        break;
      case "ol":
        objStyle.key = "ol";
        objStyle.classname = "clsOL";
        break;
      case "li":
        objStyle.key = "li";
        //objStyle.classname = 'clsLI';
        break;
      case "br":
        objStyle.key = "br";
        objStyle.classname = "clsBR";
        break;
      case "sup":
        objStyle.key = "sup";
        objStyle.classname = "clsSup";
        break;
      case "sub":
        objStyle.key = "sub";
        objStyle.classname = "clsSub";
        break;
      case "b":
        objStyle.key = "bold";
        objStyle.classname = "clsBold";
        break;
      case "u":
        objStyle.key = "underline";
        objStyle.classname = "clsUnderline";
        break;
      case "i":
        objStyle.key = "italic";
        objStyle.classname = "clsItalic";
        break;
      case "hebrew":
      case "greek":
        objStyle.key = "grkhrw";
        objStyle.classname = "clsGrkhrw";
        break;
      case "vref":
        objStyle.key = "vref";
        objStyle.classname =
          "clsVref" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "xref":
        objStyle.key = "xref";
        objStyle.classname =
          "clsXref" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "cmt":
        objStyle.key = "cmt";
        objStyle.classname =
          "clsCmt" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "entity":
        objStyle.key = "entity";
        objStyle.classname =
          "clsEntity" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "lex":
        objStyle.key = "lex";
        objStyle.classname =
          "clsLex" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "lex_def":
        objStyle.key = "lex_def";
        objStyle.classname =
          "clsLexDef" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "louwnida":
        objStyle.key = "louwnida";
        objStyle.classname =
          "clsLouw" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "biblex":
        objStyle.key = "biblelex";
        objStyle.classname = "clsBibleLex";
        break;

      case "bookchp":
        objStyle.key = "bookchp";
        objStyle.classname = "clsBookChapter";
        break;
      case "bookchplink":
        objStyle.key = "bookchplink";
        objStyle.classname = "clsBookChapter_link";
        break;

      case "pericope":
        objStyle.key = "pericope";
        objStyle.classname = "clsPericope";
        break;
      case "pericopelink":
        objStyle.key = "pericope_link";
        objStyle.classname = "clsPericope_link";
        break;

      case "subtitle":
        objStyle.key = "subtitle";
        objStyle.classname = "clsSubtitle";
        break;

      case "versetext":
        objStyle.key = "versetext";
        if (this.onlyverse) objStyle.classname = "clsVerseText_onlyverse";
        else objStyle.classname = "clsVerseText";
        break;

      case "chapverse":
        objStyle.key = "chapverse";
        objStyle.classname =
          "clsChapVerse" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "j":
        objStyle.key = "JWord";
        objStyle.classname = "clsJWord";
        break;
      case "p":
        objStyle.key = "p";
        objStyle.classname = "clsP";
        break;
      case "eshigh":
        objStyle.key = "esHigh";
        objStyle.classname = "clsESHigh";
        break;
      case "bcprint":
        objStyle.key = "bcprint";
        objStyle.classname = "clsBCPrint";
        break;
      default:
        objStyle.key = "unkw";
        objStyle.classname = "";
        break;
    }
    return objStyle;
  }
}

function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
}

const styles = StyleSheet.create({
  header: {
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
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  containerBottom: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  containerBottomItem: {
    flex: 9,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start"
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
export default connect(mapStateToProps, mapDispatchToProps)(WordStudyScreen);
