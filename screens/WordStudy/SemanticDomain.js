import React, { Component } from "react";
import {
  Alert,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator, TouchableOpacity, Image,
  Platform
} from "react-native";
import * as COMethods from "../../common/COMethods";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import TagParser from "../../common/TagParser";
import { List } from "react-native-paper";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class SemanticDomain extends Component {
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
      language: "eng",
      mystrongdata: [],
      parent_semdom_node: "",
      isLoading: false
    };
    this.detail_strong = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.semantic_id = this.props.navigation.getParam("semantic_id", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.titlesemanticdomain = DCT.getValue("semanticdomdetail", this.language);

    this.handleChangeTab(DCT.getValue("semanticdom", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.MyParser = new TagParser(this);
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
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, paddingTop: 85 }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, paddingTop: 85 }]}>
          <List.Section>
            <List.Accordion
              title={this.state.parent_semdom_node}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={true}
              style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 20,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    alignItems: "center",
                    fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {"Strong : "}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  paddingLeft: 10,
                  paddingRight: 10,
                  flex: 1
                }}
              >
                {this.detail_strong}
              </View>
            </List.Accordion>
          </List.Section>
          <View style={{height : 100}}></View>
        </ScrollView>
      );
    }
  }

  GoCallAPI() {
    var urlsemantic =
      "https://sabdapro.com:3002/App/app_semdom_louw?semdom_id=" +
      this.semantic_id +
      "&limit=100";
    fetch(urlsemantic)
      .then(response => response.json())
      .then(responseJson => {
        this.parentdata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_parent
        );
        this.strongdata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_strong
        );
        var myparentdata = JSON.parse(this.parentdata);
        this.list_strong_data = JSON.parse(this.strongdata);

        let parent_semdom_node = myparentdata[0].parent_semdom_node;
        let fsize = Number(this.props.STORE_BIBLE.FONT_SIZE) + 4;
        this.detail_strong = [];

        for (let i = 0; i < this.list_strong_data.length; i++) {
          this.detail_strong.push(
            <View
              key={i}
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                paddingTop: 15
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 10
                }}
              >
                <Text
                  style={{
                    fontFamily: 'NotoSans-Bold',
                    fontSize: fsize, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.list_strong_data[i].lemma}
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontWeight: "normal",
                    paddingTop: 5, color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.list_strong_data[i].lemma_translit}
                </Text>
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: 'NotoSans-Bold',
                    color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                    paddingTop: 5
                  }}
                  onPress={() => {
                    this.ShowStrongNumberWordStudy(this.list_strong_data[i].strong);
                  }}
                >
                  {this.list_strong_data[i].strong}
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
                    fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("pronunciation", this.language)}
                  {"  "}
                </Text>
                <Text
                  style={{
                    fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.list_strong_data[i].pronunciation}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingLeft: 20,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    paddingLeft: 10,
                    fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("definition", this.language)}
                  {"   "}
                </Text>
                <Text
                  style={{
                    fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.list_strong_data[i].short_def}
                </Text>
              </View>
              <View style={{ height: 10 }}></View>
              <View
                style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR }}
              ></View>
            </View>
          );
        }

        if (this._isMounted === true) {
          this.setState(
            {
              parent_semdom_node: parent_semdom_node,
              isLoading: true
            },

            () => { }
          );
        }
      });
  }

  GoCallAPILex() {
    const { list_lex_def, list_dictionary } = this.state;
    this.data_lexicon_def = [];
    if (list_lex_def.length > 0) {
      for (let i = 0; i < list_lex_def.length; i++) {
        thedefinition = this.MyParser.DoParserDiscovery(
          list_lex_def[i].definition, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
        );

        this.title_definition_res_name = list_lex_def[i].res_name;
        if (i == 0) {
          this.data_lexicon_def.push(
            <List.Accordion
              key={i}
              title={this.title_definition_res_name}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: "#353535"
              }}
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  paddingRight: 10,
                  backgroundColor: "#F4F5F8"
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
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: "#353535"
              }}
              style={{
                backgroundColor: "#FFFFFF",
                borderBottomWidth: 1,

                borderLeftWidth: 1,
                borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderRightWidth: 1,
                borderRightColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  paddingRight: 10,
                  backgroundColor: "#F4F5F8"
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
          isLoadingLexicon: true
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
          fontFamily: 'NotoSans-Bold',
          fontSize: 16,
          color: "#353535"
        }}
        style={{
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,

          borderLeftWidth: 1,
          borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
          borderRightWidth: 1,
          borderRightColor: this.props.STORE_STYLE.BORDER_COLOR
        }}
      >
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 10,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: "#F4F5F8"
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
          style={{ color: "#105B8E" }}
          onPress={() => {
            this.ShowSemanticDomain(this.state.semantic_domain_id[x]);
          }}
        >
          {this.state.semantic_domain[x]}
        </Text>
      );
    }

    this.data_lexicon_def.push(
      <List.Accordion
        key={"semantic_domain"}
        title={this.title_semantic_domain}
        titleStyle={{
          fontFamily: 'NotoSans-Bold',
          fontSize: 16,
          color: "#353535"
        }}
        style={{
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,

          borderLeftWidth: 1,
          borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
          borderRightWidth: 1,
          borderRightColor: this.props.STORE_STYLE.BORDER_COLOR
        }}
      >
        <View
          style={{
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 10,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: "#F4F5F8"
          }}
        >
          {this.semantic}
        </View>
      </List.Accordion>
    );
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

  ShowStrongNumberWordStudy(value) {
    const { push } = this.props.navigation;

    push("WordStudy", {
      strongnumber: value,
      key: "WordStudy " + Math.random
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
              text: "Tampilkan",
              onPress: () => this.GoCallAPI2(this.strongnumber, this.glossary)
            }
          ],
          { cancelable: false }
        );
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
          this.ShowStrongNumberWordStudy(value);
        }}
      >
        <Text style={{ color: "#105B8E" }}>{value} </Text>
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
                <TouchableOpacity onPress={() => {
                  DialogManager.dismissAll(() => { });
                }}>
                  {/*Donute Button Image */}
                  <Image
                    source={require("../../assets/images/cross.png")}
                    style={{ width: 15, height: 15, marginLeft: 8 }}
                  />
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
    var ver_code = "esv"
    if (props.lang_code == "eng") ver_code = "esv"
    else ver_code = "tb";
    if (classnumber === "clsVref") {
      var vid = array[1];
      var verse = array[2];

      let urlvref =
        "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
        vid +
        "&ver_code=" + ver_code;
      fetch(urlvref)
        .then(response => response.json())
        .then(responseJson => {
          this.vrefdata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_verse
          );
          let myvrefdata = JSON.parse(this.vrefdata);
          let text = "";
          for (let i = 0; i < myvrefdata.length; i++)
            text += myvrefdata[i].text;
          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");
          this.rendertext = props.MyParser.DoParserDiscovery(text);
          props.ShowDialogVerse(this.rendertext, verse);
        });
      /*
    this.strongnumberdata = [];
    var urlstrongnumber =
      "https://sabdapro.com:3002/App/app_lex_strong?&lang_code=" +
      props.state.language +
      "&strong_aug=" +
      strongnumber;

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

        props.setState({
          snackIsVisible: true,
          snlabel: "        " + this.lemma + "     " + this.strongnumber,
          wordstrong: this.wordstrong,
          snumber: this.strongnumber
        });
      });
  */
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
              <View
                style={{
                  flexDirection: "column",
                  paddingBottom: 10,
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
    paddingTop: Platform.OS === 'ios' ? 70 : 85
  },
  container: {
    flex: 1,

    paddingBottom: 100,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingBottom: 150
  },
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center"
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
export default connect(mapStateToProps, mapDispatchToProps)(SemanticDomain);
