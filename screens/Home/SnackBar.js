import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import * as SQLite from 'expo-sqlite';
export const BAR_HEIGHT_ANDROID = 56;
export const BAR_HEIGHT_IOS = 49;

class SnackBar extends Component {
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
      total_commentary: 0,
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.studyword = DCT.getValue("studyword", this.language);
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  ShowSnackBarFunction(lemma, strong_number, wordstrong, verse_id, book_id, language) {
    this.setState({
      total_commentary: 0,
    });
    duration = 4000;
    this.language = language;
    this.book_id = book_id;
    if (this.props.STORE_BIBLE.OFFLINE == true) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      this.lang_id = "0";
      if (this.props.STORE_BIBLE.LANG_CODE === "eng")
        this.lang_id = "1"
      else
        this.lang_id = "2"
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();
        let totalword = 0;
        totalword = lemma.length * 1.5 + wordstrong.length;
        if (totalword > 26) wordstrong = wordstrong.substring(0, 8) + "...";
        else if (totalword > 18) wordstrong = wordstrong.substring(0, 14) + "...";
      sqlcmt_map = "SELECT resource_cmt.res_id as res_id , res_name, vref, key, entry_code from map_cmt_strong_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_strong_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid =   "+ verse_id + " and strong = '"  + strong_number + "' GROUP BY resource_cmt.res_id HAVING COUNT(resource_cmt.res_id > 0) ";
      console.log(sqlcmt_map);
      try {
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => this.commentary_data = _array ,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            this.setState({  comment_data: this.commentary_data, total_commentary : this.commentary_data.length, isLoading : true })
          }
        );
      } catch (e) {
        console.log(e);
      }


    }
    else {

      var urlCommentStrong =
        "https://sabdapro.com:3002/app/app_comment_strong?lang_code=" +
        this.language +
        "&list_strong=" +
        strong_number +
        "&vid=" +
        verse_id;

      console.log("Verse ID : " + verse_id)
      fetch(urlCommentStrong)
        .then((response) => response.json())
        .then((responseJson) => {

          let list_comment_data = responseJson.data.list_comment
          let total_commentary = list_comment_data.length;
          this.setState({
            comment_data: list_comment_data,
            total_commentary: total_commentary,
            isLoading: true,
          });
        });
      let totalword = 0;
      totalword = lemma.length * 1.5 + wordstrong.length;
      if (totalword > 26) wordstrong = wordstrong.substring(0, 8) + "...";
      else if (totalword > 18) wordstrong = wordstrong.substring(0, 14) + "...";

    }
    if (this.ShowSnackBar === false) {
      this.setState({
        lemma: lemma,
        strong_number: strong_number,
        word_strong: wordstrong,
        verse_id: verse_id,
      });
      this.ShowSnackBar = true;

      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 400,useNativeDriver: true,
      }).start(this.hide(duration));
    }

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
          <View style={{ flex: 8, flexDirection: "row" }}>
            <View>
              <Text
                style={[styles.SnackBarMessage, { color: this.props.STORE_STYLE.TEXT_COLOR }]}
                onPress={() => {
                  this.props.navigationProps.navigate("WordStudy", {
                    strongnumber: this.state.strong_number,
                    wordstrong: this.state.word_strong,
                    language: this.state.language,
                    verse_id: this.state.verse_id,
                  });
                }}
              >
                {" "}
                {this.state.lemma}{" "}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={[styles.SnackBarMessage2, { color: this.props.STORE_STYLE.TEXT_COLOR_URL }]}
              onPress={() => {
                this.props.navigationProps.navigate("WordStudy", {
                  strongnumber: this.state.strong_number,
                  wordstrong: this.state.word_strong,
                  language: this.state.language,
                  verse_id: this.state.verse_id,
                });
              }}
            >
              {this.state.strong_number}
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.SnackBarMessage, { color: this.props.STORE_STYLE.TEXT_COLOR }]}
              onPress={() => {
                this.props.navigationProps.navigate("WordStudy", {
                  strongnumber: this.state.strong_number,
                  wordstrong: this.state.word_strong,
                  language: this.state.language,
                  verse_id: this.state.verse_id,
                });
              }}
            >
              {this.state.word_strong}
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={[styles.SnackBarUndoText, { color: this.props.STORE_STYLE.TEXT_COLOR_URL }]}
              onPress={() => {
                this.props.navigationProps.navigate("WordStudy", {
                  strongnumber: this.state.strong_number,
                  wordstrong: this.state.word_strong,
                  language: this.state.language,
                  verse_id: this.state.verse_id,
                });
              }}
            >
              {" "}
              {this.studyword}{" "}
            </Text>
          </View>
        </View>
        <View style={{ height: 5 }}></View>
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
                this.Commentaries();
              }}
            >
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  paddingLeft: 4,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                <Text style={{ fontFamily: "NotoSans-Bold", fontSize: 14 }}>
                  {" "}
                  {this.state.total_commentary}{" "}
                </Text>
                {DCT.getValue("commentaryfound", this.language)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 2 }}
              onPress={() => {
                this.Commentaries();
              }}
            >
              <Text style={[styles.SnackBarUndoText, { color: this.props.STORE_STYLE.TEXT_COLOR_URL }]}> {this.studyword} </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    );
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
})(SnackBar);

const styles = StyleSheet.create({
  SnackBarContainter: {
    backgroundColor: "#ffffff",
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
        height: BAR_HEIGHT_IOS * 0.9 + 55,
      },
      android: {
        height: BAR_HEIGHT_ANDROID * 0.9 + 55,
      },
    }),
  },

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
