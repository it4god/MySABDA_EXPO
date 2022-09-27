import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
Platform,
  Image
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import TagParser from "../common/TagParser";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class More extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerTransparent: true,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };


  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      serverData: [],
      fetching_from_server: false
    };
    this.timer = -1;
    this.page = 0;
    this.skip = 0;
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.keyword = this.props.navigation.getParam("keyword", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.isfuzzy = this.props.navigation.getParam("fuzzy", "N");
    this.isindefinition = this.props.navigation.getParam("indefinition", "N");
    this.handleChangeTab(
      DCT.getValue("study", this.language) + " " + this.keyword
    );
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 2;
    this.limit = this.props.STORE_BIBLE.SEARCH_LIMIT;
  };

  async componentWillUnmount() {

    this.playbackInstance = null;
    this._isMounted = false;
  }
  render() {
    return (
      <ScrollView ContentContainerStyle={styles.contentContainer} style={[styles.header,{   backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
        <View
          style={{
            flexDirection: "row",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("1");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/discovery.png")}
                />
              )}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/discovery_darkmode.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("menu_discovery", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,

            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("2");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/commentary.png")}
                />)}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/commentary_darkmode.png")}
                />)}

              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("commentary", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("3");
              }}
              style={styles.containerBottomItem}
            >
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/parallel_darkmode.png")}
                />
              )}
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/parallel.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("parallel", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("4");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/entity.png")}
                />
              )}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/entity_darkmode.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("entity", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("5");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/xref.png")}
                />)}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/xref_darkmode.png")}
                />)}

              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("menu_xref", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("6");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/originallanguage.png")}
                />)}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/originallanguage_darkmode.png")}
                />)}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("originallanguage", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("7");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/media.png")}
                />)}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/media_darkmode.png")}
                />)}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("menu_media", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("8");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/audio.png")}
                />)}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/audio_darkmode.png")}
                />)}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("menu_audio", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            paddingLeft: 20,
            paddingBottom: 10,
            paddingTop: 5
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingTop: 7,
              paddingRight: 7,
              paddingLeft: 20,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.StudyPage("9");
              }}
              style={styles.containerBottomItem}
            >
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/daily_bible.png")}
                />
              )}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/daily_bible_darkmode.png")}
                />
              )}
              <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                <Text
                  style={{
                    paddingLeft: 35,
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 15,
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                  }}
                >
                  {DCT.getValue("menu_dailybible", this.language)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:100}}></View>
      </ScrollView>
    );
  }

  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };

  StudyPage(value) {
    this.props.ACT_SetActionNo(value);
    if (value === "1") {
    } else if (value === "2") {
    } else if (value === "3") {
    } else if (value === "4") {
    } else if (value === "5") {
    } else if (value === "6") {
    } else if (value === "7") {
    } else if (value === "8") {
    } else if (value === "9") {
    } else {
      this.props.ACT_SetActionNo("0");
    }
    this.props.navigation.goBack();
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
  fontEntityMention: {
    fontSize: 13,
    fontFamily: "NotoSans-Bold"
  },
  fontEntityCategory: {
    fontSize: 11,
    fontWeight: "normal"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  containerBottom: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  containerBottomItem: {
    flex: 7,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30
  },
  item: {
    padding: 10
  },
  separator: {
    height: 1,
   
  },
  text: {
    fontSize: 20,
    color: "#353535"
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
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
      dispatch(BibleAction.SetDailyBibleID(set_daily_bible_id)),
    ACT_SetActionNo: set_action_no =>
      dispatch(BibleAction.SetActionNo(set_action_no))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(More);
