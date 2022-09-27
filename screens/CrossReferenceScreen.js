import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity, Image, Platform
} from "react-native";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import TagParser from "../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import { List } from "react-native-paper";
import PopToTopScreen from "./Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class CrossReferenceScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerTransparent: true,
      headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data_view: [],
      xrefs_verse: [],
      list_xref: [],
      isLoading: false
    };
    global.data_book = [];
    this.list_xref = [];
  }

  componentDidMount = () => {

    this._isMounted = true;
    this.book_id = this.props.navigation.getParam("book_id", "");
    this.chapter_no = this.props.navigation.getParam("chapter_no", "");
    this.version_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.version_code === "tb" ||
      this.version_code === "ayt" ||
      this.version_code === "avb"
    )
      this.lang_code = "ind";
    else this.lang_code = "eng";
    this.language = this.props.STORE_BIBLE.LANG_CODE;

    if (this.language === "eng") this.res_code = "tsk";
    else this.res_code = "fulllife";
    this.MyParser = new TagParser(this,this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
    this.handleChangeTab(DCT.getValue("menu_xref", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
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
        <ScrollView style={[styles.containerActivityIndicator, styles.horizontal,styles.header, { backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <List.Section>{this.state.xrefs_verse}</List.Section>
        </ScrollView>
      );
    }
  }
  GoCallAPI() {
    var url_cross_reference =
      "https://sabdapro.com:3002/App/app_xrefs_verse?limit=300&skip=0&lang_code=" +
      this.props.STORE_BIBLE.LANG_CODE +
      "&ver_code=" +
      this.version_code +
      "&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no;
    console.log(url_cross_reference);
    fetch(url_cross_reference)
      .then(response => response.json())
      .then(responseJson => {
        this.xrefs_verse = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.xrefs_verse
        );
        var xrefs_verse = JSON.parse(this.xrefs_verse);
        if (this._isMounted) {
          this.setState(
            {
              list_xref: xrefs_verse
            },
            () => {
              this.GoShowXRef();
            }
          );
        }
      });
  }

  GoShowXRef() {
    const { list_xref } = this.state;

    if (list_xref.length > 0) {
      this.data_view = [];
      for (var i = 0; i < list_xref.length; i++) {
        var verse_id = list_xref[i].verse_id;

        var urlxrefdetail =
          "https://sabdapro.com:3002/App/app_xrefs?res_code=" +
          this.res_code +
          "&ver_code=" +
          this.version_code +
          "&lang_code=" +
          this.lang_code +
          "&type_search=L&list_vid=" +
          verse_id +
          "&skip=0&limit=300";
        const data_view = cloneDeep(this.data_view);
        console.log(urlxrefdetail);
        fetch(urlxrefdetail)
          .then(response => response.json())
          .then(responseJson => {
            this.xrefs_summary = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.xrefs
            );
            var xref_data = JSON.parse(this.xrefs_summary);

            for (var z = 0; z < xref_data.length; z++) {
              console.log(xref_data[z].xrefs.replace(/<\/vref>; /g, "</vref>"));
              let tsk = "";
              try {
                tsk = this.MyParser.DoParserDiscovery(
                  xref_data[z].xrefs.replace(/<\/vref>; /g, "</vref>"), this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                );
              } catch (error) { }

              let token_clean = "";
              if (
                xref_data[z].list_token[0].token_clean !== null ||
                xref_data[z].list_token[0].token_clean !== undefined
              ) {
                token_clean =
                  "( " +
                  this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() +
                  " : ";
                for (let e = 0; e < xref_data[z].list_token.length; e++)
                  if (xref_data[z].list_token[e].token_clean !== null)
                    token_clean =
                      token_clean +
                      xref_data[z].list_token[e].token_clean +
                      " ";

                token_clean = token_clean + " )";
              }
              if (
                token_clean ===
                "( " +
                this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() +
                " : " +
                " )"
              )
                token_clean = "";
              span_id = COMethods.getUniqueId(z);
              data_view.push(
                <View
                  key={span_id}
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                >
                  <Text style={{ fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR }}>
                    {xref_data[z].resource.toUpperCase()} {": "}{" "}
                    {xref_data[z].entry} {"  "}
                    <Text style={{ fontWeight: "normal",color: this.props.STORE_STYLE.TEXT_COLOR  }}>
                      {token_clean}
                    </Text>
                  </Text>
                  {tsk}
                </View>
              );
            }
          });

        let span_id = COMethods.getUniqueId("XF" + i);
        let bookchapter =
          list_xref[i].book_name +
          " " +
          list_xref[i].chapter_no +
          " " +
          ":" +
          list_xref[i].verse_no;
        if (i == 0) {
          this.list_xref.push(
            <List.Accordion
              key={span_id}
              title={bookchapter}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
               left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2
                }}
              >
                {data_view}
              </View>
            </List.Accordion>
          );
        } else {
          this.list_xref.push(
            <List.Accordion
              key={span_id}
              title={bookchapter}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderBottomWidth: 1,
                borderColor : this.props.STORE_STYLE.BORDER_COLOR,
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
                  backgroundColor: "#F4F5F8"
                }}
              >
                {data_view}
              </View>
            </List.Accordion>
          );
        }
      }
      if (this._isMounted) {
        this.setState({ xrefs_verse: this.list_xref, isLoading: true });
      }
    }
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

                  <View style={{ alignItems: "flex-end", justifyContent: "flex-end", height: 50, width: 100 }}>
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

    paddingBottom: 100
  },
  contentContainer: {
    paddingBottom: 100
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
      dispatch(BibleAction.setLangChange(lang_code)),
    ACT_setBookID: book_id => dispatch(BibleAction.setBookID(book_id)),
    ACT_setChapterNo: chapter_no =>
      dispatch(BibleAction.setChapterNo(chapter_no)),
    ACT_setBookChapterChange: book_chapter_change =>
      dispatch(BibleAction.setBookChapterChange(book_chapter_change)),
    ACT_setIsLineView: is_line_view =>
      dispatch(BibleAction.setIsLineView(is_line_view)),
    ACT_setIsShowNotes: is_shownotes =>
      dispatch(BibleAction.setIsShowNotes(is_shownotes)),
    ACT_setIsShowPericopes: is_showpericopes =>
      dispatch(BibleAction.setIsShowPericopes(is_showpericopes)),
    ACT_setIsShowHighlight: is_showhighlight =>
      dispatch(BibleAction.setIsShowHighlight(is_showhighlight)),
    ACT_setFontSize: set_font_size =>
      dispatch(BibleAction.setFontSize(set_font_size)),
    ACT_setBibleVersion: set_bible_version =>
      dispatch(BibleAction.setBibleVersion(set_bible_version)),
    ACT_setLemma: set_lemma => dispatch(BibleAction.setLemma(set_lemma)),
    ACT_setStrongNumber: set_strong_number =>
      dispatch(BibleAction.setStrongNumber(set_strong_number)),
    ACT_setWordStrong: set_word_strong =>
      dispatch(BibleAction.setWordStrong(set_word_strong)),
    ACT_SetBibleParallel: set_bible_parallel =>
      dispatch(BibleAction.setBibleParallel(set_bible_parallel)),
    ACT_SetParallel: set_parallel =>
      dispatch(BibleAction.setParallel(set_parallel)),
    ACT_SetOriginalVersion: set_original_version =>
      dispatch(BibleAction.setOriginalVersion(set_original_version)),
    ACT_setSearchLimit: set_search_limit =>
      dispatch(BibleAction.setSearchLimit(set_search_limit)),
    ACT_SetDailyBibleStartDate: set_daily_bible_start_date =>
      dispatch(BibleAction.SetDailyBibleStartDate(set_daily_bible_start_date)),
    ACT_SetDailyBibleID: set_daily_bible_id =>
      dispatch(BibleAction.SetDailyBibleID(set_daily_bible_id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CrossReferenceScreen);
