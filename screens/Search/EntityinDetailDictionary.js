import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator, Image
} from "react-native";

import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import TagParser from "../../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityinDetailDictionary extends Component {
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
      questionanswers: [],
      isLoading: false,
      title: "",
      vref: "",
      text: []
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.entry_code = this.props.navigation.getParam("entry_code", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.limit = this.props.STORE_BIBLE.SEARCH_LIMIT;
    this.keyword = this.props.navigation.getParam("keyword", "");
    this.res_name = this.props.navigation.getParam("res_name", "");
    this.handleChangeTab(
      DCT.getValue("dictionaryabout", this.language) + " " + this.keyword
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
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView
          style={[styles.header,{
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
            paddingLeft: 15,
            paddingRight: 15,
          }]}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={{ paddingBottom: 20 }}>
            <View style={{ flexDirection: "column" }}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{      fontFamily: "NotoSans-Bold", color:this.props.STORE_STYLE.TEXT_COLOR }}>{this.keyword}</Text>
              </View>
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text
                  style={{
                    flex: 2,
                    color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                    fontWeight: "normal",
                    fontSize: this.fsizeminusone
                  }}
                >
                  {this.res_name}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 5 }}>{this.mytext}</View>
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
    var urlEntityinDetailDictionary =
      "https://sabdapro.com:3002/App/app_dictionary_detail?lang_code=" +
      this.language +
      "&entry_code=" +
      this.entry_code;
    this.handleChangeTab(
      DCT.getValue("dictionaryabout", this.language) + " " + this.keyword
    );

    fetch(urlEntityinDetailDictionary)
      .then(response => response.json())
      .then(responseJson => {

        let list_dictionary = responseJson.data.list_dictionary
        let mytext = list_dictionary[0].text;
        this.mytext = this.MyParser.DoParserDiscovery(mytext, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
      });
    this.setState(
      {
        isLoading: true
      },
      () => { }
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
}
const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 50,
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
)(EntityinDetailDictionary);
