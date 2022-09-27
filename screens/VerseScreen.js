import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator, Platform,AsyncStorage
} from "react-native";
import * as DCT from "../dictionary";
import TagParser from "../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent,
} from "react-native-dialog-component";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import PopToTopScreen from "./Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class VerseScreen extends Component {
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
      isLoading: false,
    };
    this.morethanone = false;
    this.ok = false;
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.value = this.props.navigation.getParam("value", []);
    this.lang_code = "eng";
    this.version_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.version_code === "tb" ||
      this.version_code === "ayt" ||
      this.version_code === "avb"
    )
      this.lang_code = "ind";
    else this.lang_code = "eng";
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("verse", this.language));
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 2;
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.GoCallAPI(this.value);
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header, {backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {

      if (!this.morethanone && this.state.isLoading) this.ok = true;
      return (
        <ScrollView
          style={[styles.header,{
            backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 15,
            paddingRight: 15, 
          }]}
          contentContainerStyle={styles.contentContainer}
        >
          <Text
            style={{
              color: this.props.STORE_STYLE.TEXT_COLOR,
              fontSize: 25,
              textAlign: "center",
            }}
          >
            {this.verse}
          </Text>
          <View
            style={{
              flexDirection: "column",
              paddingTop: 20,
              paddingBottom: 10,
              justifyContent: "flex-end",
            }}
          >
            {this.rendertext}
          </View>
          {this.ok && (
            <View
              style={{
                flexDirection: "column",
                paddingTop: 10,
                paddingBottom: 150,
              }}
            >
              <TouchableOpacity
                key={"to"}
                onPress={() => {
                  this.ReadFullChapter(this.book_id, this.chapter_no);
                }}
              >
                <Text
                  style={{
                    color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                    fontSize: 18,
                    textAlign: "left",
                  }}
                >
                  {DCT.getValue("readfullchapter", this.language)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
            <View style={{height : 160}}></View>
        </ScrollView>
      );
    }
  }
  handleChangeTab = (title) => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title,
    });
  };
  ReadFullChapter(book_id, chapter_no) {
    this.props.ACT_setBookID(this.book_id);
    this.props.ACT_setChapterNo(Number(this.chapter_no));
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
  GoCallAPI(value) {
    var str = value.replace(/seterip/g, "-");
    var array = str.split("|");
    var classnumber = array[0];
    var ver_code = "esv";
    if (this.lang_code == "eng") ver_code = "esv";
    else ver_code = "tb";
    if (classnumber === "clsVref") {
      var vid = array[1];
      let array_vid = [];
      if (vid.indexOf(",") > 0) {
        array_vid = vid.split(",");
      }
      if (array_vid.length === 0) {
        this.morethanone = false;
        let urlvref =
          "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
          vid +
          "&ver_code=" +
          ver_code;
        console.log(urlvref);
        fetch(urlvref)
          .then((response) => response.json())
          .then((responseJson) => {
            this.vrefdata = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_verse
            );
            let myvrefdata = JSON.parse(this.vrefdata);
            let text = "";
            let texttemp = "";
            for (let i = 0; i < myvrefdata.length; i++) {
              texttemp = myvrefdata[i].text;
              texttemp = texttemp.replace(/<para>/g, "");
              texttemp = texttemp.replace(/<\/para>/g, "");
              text += texttemp;
            }
            console.log(text);
            console.log("this is show dark" + this.props.STORE_BIBLE.IS_SHOW_DARKMODE.toString())
            let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
            this.rendertext = this.MyParser.DoParserBibleFullVersion(
              text,
              true,
              false,
              true,
              false,
              this.props.STORE_BIBLE.FONT_SIZE,
              this.version_code,
              true,
              true, "",
              this.props.STORE_BIBLE.IS_SHOW_DARKMODE
            );
            this.verse = verse;
            this.book_id = myvrefdata[0].book_id;
            this.chapter_no = myvrefdata[0].chapter;
            this.setState({ isLoading: true });
          });
      } else {
        this.rendertext = [];
        this.morethanone = true;
        this.ok = false;
        for (let x = 0; x < array_vid.length; x++) {
          this.versevref = " ";
          let urlvref =
            "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
            array_vid[x] +
            "&ver_code=" +
            ver_code;
          console.log(urlvref);
          fetch(urlvref)
            .then((response) => response.json())
            .then((responseJson) => {
              this.vrefdata = JSON.stringify(
                JSON.parse(JSON.stringify(responseJson)).data.list_verse
              );
              let myvrefdata = JSON.parse(this.vrefdata);
              let text = "";
              let texttemp = "";
              for (let i = 0; i < myvrefdata.length; i++) {
                texttemp = myvrefdata[i].text;
                texttemp = texttemp.replace(/<para>/g, "");
                texttemp = texttemp.replace(/<\/para>/g, "");
                text += texttemp;
              }
              this.book_id = myvrefdata[0].book_id;
              this.chapter_no = myvrefdata[0].chapter;
              let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
              this.verse = "";
              console.log("Verse verse: " +  myvrefdata[0].book_id + " " + myvrefdata[0].chapter)
              this.rendertext.push(
                <View key={array_vid[x] + " title"} style={{ height: 40 }}>
                  <Text
                    style={{
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                      fontSize: 25,
                      textAlign: "center",
                    }}
                  >
                    {verse}
                  </Text>
                </View>
              );
              console.log("this is show dark" + this.props.STORE_BIBLE.IS_SHOW_DARKMODE.toString())
              this.rendertext.push(
                this.MyParser.DoParserBibleFullVersion(
                  text,
                  true,
                  false,
                  true,
                  false,
                  this.props.STORE_BIBLE.FONT_SIZE,
                  this.version_code,
                  true,
                  true, "",
                  this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                )
              );

              this.rendertext.push(
                <View
                  key={array_vid[x]}
                  style={{
                    flexDirection: "column",
                    paddingBottom: 35,
                  }}
                >
                  <TouchableOpacity
                    key={"to"}
                    onPress={() => {
                      this.ReadFullChapter(
                        this.book_id ,
                        this.chapter_no
                      );
                    }}
                  >
                    <Text
                      style={{
                        color: "#3B93DB",
                        fontSize: 18,
                        textAlign: "left",
                      }}
                    >
                      {DCT.getValue("readfullchapter"  , this.language)} 
                    </Text>
                  </TouchableOpacity>
                </View>
              );

              this.setState({ isLoading: true });
            });
        }
      }
    }
  }
  ClickReaction3(value, props) {

  }
  ClickReaction(value, props) {
    var str = value.replace(/seterip/g, "-");
    var array = str.split("|");
    var classnumber = array[0];
    var strongnumber = array[1];
    var wordstrong = array[2];
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
        .then((response) => response.json())
        .then((responseJson) => {

          let commentdata = responseJson.data.list_comment
          let text = commentdata[0].text;
          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");

          this.rendertext = props.MyParser.DoParserDiscovery(text,  this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
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
                  justifyContent: "center",
                }}
              >
                {value}
              </View>
            </ScrollView>
          </DialogContent>
        ),
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
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    flex: 4,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    textAlign: "justify",
    color: "white",
    flex: 1,
  },
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
    ACT_setIsLineView: (is_line_view) =>
      dispatch(BibleAction.setIsLineView(is_line_view)),
    ACT_setIsShowNotes: (is_shownotes) =>
      dispatch(BibleAction.setIsShowNotes(is_shownotes)),
    ACT_setIsShowPericopes: (is_showpericopes) =>
      dispatch(BibleAction.setIsShowPericopes(is_showpericopes)),
    ACT_setIsShowHighlight: (is_showhighlight) =>
      dispatch(BibleAction.setIsShowHighlight(is_showhighlight)),
    ACT_setFontSize: (set_font_size) =>
      dispatch(BibleAction.setFontSize(set_font_size)),
    ACT_setBibleVersion: (set_bible_version) =>
      dispatch(BibleAction.setBibleVersion(set_bible_version)),
    ACT_setLemma: (set_lemma) => dispatch(BibleAction.setLemma(set_lemma)),
    ACT_setStrongNumber: (set_strong_number) =>
      dispatch(BibleAction.setStrongNumber(set_strong_number)),
    ACT_setWordStrong: (set_word_strong) =>
      dispatch(BibleAction.setWordStrong(set_word_strong)),
    ACT_SetBibleParallel: (set_bible_parallel) =>
      dispatch(BibleAction.setBibleParallel(set_bible_parallel)),
    ACT_SetParallel: (set_parallel) =>
      dispatch(BibleAction.setParallel(set_parallel)),
    ACT_SetOriginalVersion: (set_original_version) =>
      dispatch(BibleAction.setOriginalVersion(set_original_version)),
    ACT_setSearchLimit: (set_search_limit) =>
      dispatch(BibleAction.setSearchLimit(set_search_limit)),
    ACT_SetDailyBibleStartDate: (set_daily_bible_start_date) =>
      dispatch(BibleAction.SetDailyBibleStartDate(set_daily_bible_start_date)),
    ACT_SetDailyBibleID: (set_daily_bible_id) =>
      dispatch(BibleAction.SetDailyBibleID(set_daily_bible_id)),
    ACT_SetActionNo: (set_action_no) =>
      dispatch(BibleAction.SetActionNo(set_action_no)),
    ACT_SetVrefChange: (set_vref_change) =>
      dispatch(BibleAction.SetVrefChange(set_vref_change)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerseScreen);
