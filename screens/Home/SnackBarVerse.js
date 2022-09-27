import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  TouchableOpacity,
  Clipboard,
  Alert,
} from "react-native";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import * as SQLite from 'expo-sqlite';
export const BAR_HEIGHT_ANDROID = 56;
export const BAR_HEIGHT_IOS = 49;

class SnackBarVerse extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(400);
    this.ShowSnackBar = false;
    this.HideSnackBar = true;
    this.state = {
      lemma: "",
      strong_number: "",
      word_strong: "",
      verse_id: "",
      comment_data: [],
      list_comment_resource: [],
      list_xref: [],
      total_commentary: 0,
      total_xref: 0,
      text: "",
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  writeToClipboard = async () => {
    await Clipboard.setString(this.state.text);
    Alert.alert(
      DCT.getValue("copytoclipboard", this.language),
      this.state.text,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  };
  ShowSnackBarFunction(vid, version_code, book_id, language) {
    this.vid = vid;
    this.version_code = version_code;
    this.setState({
      total_commentary: 0,
      total_xref: 0,
    });
    this.lang_id = "0";
    if (this.props.STORE_BIBLE.LANG_CODE === "eng")
      this.lang_id = "1"
    else
      this.lang_id = "2"
    this.book_id = book_id;
    duration = 5000;
    this.language = language;
    this.lang_code = language;
    if (
      this.version_code === "tb" ||
      this.version_code === "ayt" ||
      this.version_code === "avb"
    )
      this.language = "ind";
    else this.language = "eng";
    this.studyword = DCT.getValue("studyword", this.language);

    if (this.props.STORE_BIBLE.OFFLINE == true) {
      this.list_comment_resource = [];
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT resource_cmt.res_id as res_id , res_name from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid =  " +  vid + " and entry_type_id = 1 GROUP BY resource_cmt.res_id HAVING COUNT(resource_cmt.res_id > 0) ";
      console.log(sqlcmt_map);
      try {
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => this.list_comment_resource= _array ,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            this.setState({   total_commentary : this.state.total_commentary + this.list_comment_resource.length })
     
          }
        );
      } catch (e) {
        console.log(e);
      }

    }
    else
    {
    var urlcommentarydetail =
      "https://sabdapro.com:3002/App/app_comment_summary?lang_code=" +
      this.lang_code +
      "&entry_type=entry&type_search=L&list_vid=" +
      this.vid +
      "&skip=0&limit=1000";
    console.log(urlcommentarydetail);
    fetch(urlcommentarydetail)
      .then((response) => response.json())
      .then((responseJson) => {
        let comment_summary_data = responseJson.data.comment_summary

        this.setState({
          total_commentary:
            this.state.total_commentary + comment_summary_data.length,
        });
      });

    }
    if (this.language === "eng") this.res_code = "tsk";
    else this.res_code = "fulllife";
    var urlxrefdetail =
      "https://sabdapro.com:3002/App/app_xrefs?res_code=" +
      this.res_code +
      "&ver_code=" +
      this.version_code +
      "&lang_code=" +
      this.language +
      "&type_search=L&list_vid=" +
      this.vid +
      "&skip=0&limit=300";
    console.log(urlxrefdetail);
    fetch(urlxrefdetail)
      .then((response) => response.json())
      .then((responseJson) => {
        let xref_data = responseJson.data.xrefs
        this.total_xref = this.total_xref + xref_data.length;

        this.setState({
          total_xref: this.state.total_xref + xref_data.length,
        });
      });
   
    this.ShowSnackBar = true;

    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 400,useNativeDriver: true,
    }).start(this.hide(duration));
  }

  hide = (duration) => {
    this.timerID = setTimeout(() => {
      if (this.HideSnackBar === true) {
        this.HideSnackBar = false;

        Animated.timing(this.animatedValue, {
          toValue: 400,
          duration: 400,useNativeDriver: true,
        }).start(() => {
          this.HideSnackBar = true;
          this.ShowSnackBar = false;
          clearTimeout(this.timerID);
        });
      }
    }, 5000);
  };

  SnackBarCloseFunction = () => {
    if (this.HideSnackBar === true) {
      this.HideSnackBar = false;
      clearTimeout(this.timerID);

      Animated.timing(this.animatedValue, {
        toValue: 400,
        duration: 400,useNativeDriver: true,
      }).start(() => {
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
      });
    }
  };

  SnackBarClose() {
    if (this.HideSnackBar === true) {
      this.HideSnackBar = false;
      clearTimeout(this.timerID);

      Animated.timing(this.animatedValue, {
        toValue: 400,
        duration: 400,useNativeDriver: true,
      }).start(() => {
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
      });
    }
  }
  render() {
    this.height = 10;
    if (this.state.total_commentary > 0) this.height = this.height + 45;
    if (this.state.total_xref > 0) this.height = this.height + 45;
    this.height = this.height + 5;
    if (this.state.total_commentary === 0 && this.state.total_xref === 0)
      this.height = 10;
    return (
      <Animated.View
        style={{
          transform: [{ translateY: this.animatedValue }],
          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
          position: "absolute",
          flexDirection: "column",
          left: 0,
          bottom: 0,
          right: 0,
          paddingRight: 10,
          paddingLeft: 10,
          paddingTop: 5,
          paddingBottom: 5,
          flex: 1,
          ...Platform.select({
            ios: {
              height: BAR_HEIGHT_IOS * 0.9 + this.height,
            },
            android: {
              height: BAR_HEIGHT_ANDROID * 0.9 + this.height,
            },
          }),
        }}
      >
        {this.state.total_commentary > 0 && (
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRadius: 5,
              flex: 5,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ flex: 8 }}
              onPress={() => {
                this.VersePhraseCommentary(this.vid, this.book_id);
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  paddingLeft: 4,
                  color : this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                <Text style={{ fontFamily: "NotoSans-Bold", fontSize: 14, color : this.props.STORE_STYLE.TEXT_COLOR}}>
                  {" "}
                  {this.state.total_commentary}{" "}
                </Text>
                {DCT.getValue("commentaryfound", this.language)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 2 }}
              onPress={() => {
                this.VersePhraseCommentary(this.vid, this.book_id);
              }}
            >
              <Text style={[styles.SnackBarUndoText], {color : this.props.STORE_STYLE.TEXT_COLOR_URL}}> {this.studyword} </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.total_commentary > 0 && <View style={{ height: 5 }}></View>}
        {this.state.total_xref > 0 && (
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRadius: 5,
              flex: 5,
              paddingTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ flex: 8 }}
              onPress={() => {
                this.CrossReferenceVerse(this.vid, this.lang_code);
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  paddingLeft: 4,
                  color : this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                <Text style={{ fontFamily: "NotoSans-Bold",color : this.props.STORE_STYLE.TEXT_COLOR, fontSize: 14 }}>
                  {" "}
                  {this.state.total_xref}{" "}
                </Text>
                {DCT.getValue("xreffound", this.language)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 2 }}
              onPress={() => {
                this.CrossReferenceVerse(this.vid, this.lang_code);
              }}
            >
              <Text style={[styles.SnackBarUndoText],{color : this.props.STORE_STYLE.TEXT_COLOR_URL}}> {this.studyword} </Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.total_xref > 0 && <View style={{ height: 5 }}></View>}
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            borderRadius: 5,
            flex: 5,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              this.CopyVerse();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#105B8E",
                fontSize: 15,
                paddingLeft: 5,
                paddingRight: 5,
                fontFamily: "NotoSans-Bold",
                color : this.props.STORE_STYLE.TEXT_COLOR
              }}
            >
              {" "}
              {DCT.getValue("copyverse", this.language)}{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
  CopyVerse() {
    let urlvref =
      "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
      this.vid +
      "&ver_code=" +
      this.version_code;
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

        let verse =
          myvrefdata[0].book +
          " " +
          myvrefdata[0].chapter +
          ":" +
          myvrefdata[0].verse;
        var regexremove1 = /(<([^>]+)>)/gi;
        var regexremove2 = /<verse(.*?)>(.*?)<\/verse>/gi;
        var regexremove3 = /<cmt(.*?)>(.*?)<\/cmt>/gi;
        var regexremove4 = /<pericope(.*?)>(.*?)<\/pericope>/gi;
        text = text
          .replace(regexremove2, "")
          .replace(regexremove3, "")
          .replace(regexremove4, "")
          .replace(regexremove1, "");

        text = text.substring(1) + "\n(" + verse + " - " + this.version_code.toUpperCase() + ")";
        /*
      this.rendertext = this.MyParser.DoParserBibleFullVersion(
        text,
        true,
        false,
        true,
        false,
        this.props.STORE_BIBLE.FONT_SIZE,
        this.version_code,
        true
      );
      this.verse = verse;
      this.book_id = myvrefdata[0].book_id;
      this.chapter_no = myvrefdata[0].chapter;
*/

        this.setState({
          text: text,
        });
        this.writeToClipboard();
      });
  }
  VersePhraseCommentary(vid, book_id) {
    if (Number(this.state.total_commentary) > 0) {
      this.props.navigationProps.navigate("VersePhraseCommentaryScreen", {
        vid: vid,
        book_id : book_id
      });
    }
  }
  CrossReferenceVerse(vid, language) {
    if (Number(this.state.total_commentary) > 0) {
      this.props.navigationProps.navigate("CrossReferenceVerse", {
        vid: vid,
      });
    }
  }
  Commentaries() {
    if (Number(this.state.total_commentary) > 0) {
      this.props.navigationProps.navigate("StrongCommentary", {
        strongcomment: this.state.comment_data,
        total_commentary: this.state.total_commentary,
      });
    }
  }
}
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(SnackBarVerse);

const styles = StyleSheet.create({
  SnackBarContainter: {},

  SnackBarMessage: {
    color: "#353535",
    fontSize: 15,
    fontFamily: "NotoSans-Bold",
    paddingLeft: 4,
  },
  SnackBarMessage2: {
    color: "#105B8E",
    fontSize: 16,
    fontFamily: "NotoSans-Bold",
    paddingLeft: 4,
  },

  SnackBarUndoText: {
    color: "#105B8E",
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
