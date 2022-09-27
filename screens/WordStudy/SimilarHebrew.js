import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class SimilarHebrew extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "NotoSans-Bold",
              color: params.titlecolor,
            }}
          >
            {navigation.getParam("title", "")}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerTransparent: true,
      headerBackTitle: "",
      headerTintColor: params.titlecolor,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      lemma: "",
      lemma_translit: "",
      strong_aug: "",
      strong_number: "",
    };
    this.similarhebrew = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.strong_aug = this.props.navigation.getParam("strong_aug", "");
    this.lemma = this.props.navigation.getParam("lemma", "");
    this.lemma_translit = this.props.navigation.getParam("lemma_translit", "");
    this.fsize = Number(this.props.STORE_BIBLE.FONT_SIZE) + 1;
    this.original_language = "";
    if (this.strong_aug.substring(0, 1) === "H") {
      this.handleChangeTab(DCT.getValue("similarh", this.language));
      this.original_language = "Greek";
    } else {
      this.handleChangeTab(DCT.getValue("similarg", this.language));
      this.original_language = "Hebrew";
    }
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR,
    });
    this.GoCallAPI();
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
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        style={[
          styles.header,
          { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 },
        ]}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 },
          ]}
        >
          <View>
            <Text
              style={{
                fontFamily: "NotoSans-Bold",
                fontSize: this.fsize,
                textAlign: "left",
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {this.lemma}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", paddingRight: 20 }}
          >
            <Text
              style={{
                fontWeight: "normal",
                paddingLeft: 15,
                paddingRight: 20,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {"("}
              {this.lemma_translit}
              {" - "}
              {this.strong_aug}
              {")"}
              {" is semantically similar to the following "}{" "}
              {this.original_language} {" words:"}{" "}
            </Text>
          </View>
        </View>
        {this.similarhebrew}
        <View style={{height : 100}}></View>
      </ScrollView>
    );
  }
  GoCallAPI() {
    var urlsimilarhebrew =
      "https://sabdapro.com:3002/App/app_lex_similar?limit=100&skip=0&lang_code=" +
      this.language +
      "&strong_aug=" +
      this.strong_aug;
    console.log(urlsimilarhebrew);
    fetch(urlsimilarhebrew)
      .then((response) => response.json())
      .then((responseJson) => {
        this.lexdata = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_lex_similar
        );
        this.similarhebrew = [];
        var mylexdata = JSON.parse(this.lexdata);
        for (let i = 0; i < mylexdata.length; i++) {
          if (i == 0) {
            this.similarhebrew.push(
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
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
                      this.OpenWordStudy(
                        mylexdata[i].strong_aug,
                        "",
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
                        source={require("../../assets/images/record.png")}
                      />
                    )}
                    {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                      <Image
                        style={{
                          width: 25,
                          height: 25,
                          paddingLeft: 7,
                          paddingTop: 15,
                          paddingRight: 5,
                        }}
                        source={require("../../assets/images/record_darkmode.png")}
                      />
                    )}
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontFamily: "NotoSans-Bold",
                          color: this.props.STORE_STYLE.TEXT_COLOR,
                        }}
                      >
                        {mylexdata[i].lemma}{" "}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: "normal",
                          color: this.props.STORE_STYLE.TEXT_COLOR,
                        }}
                      >
                        {mylexdata[i].lemma_translit}{" "}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontFamily: "NotoSans-Bold",
                          color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                        }}
                      >
                        {mylexdata[i].strong_aug}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else {
            this.similarhebrew.push(
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingRight: 7,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenWordStudy(
                        mylexdata[i].strong_aug,
                        "",
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
                          paddingLeft: 7,
                          paddingTop: 15,
                          paddingRight: 5,
                        }}
                        source={require("../../assets/images/record.png")}
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
                        source={require("../../assets/images/record_darkmode.png")}
                      />
                    )}
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontFamily: "NotoSans-Bold",
                          color: this.props.STORE_STYLE.TEXT_COLOR,
                        }}
                      >
                        {mylexdata[i].lemma}{" "}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontWeight: "normal",
                          color: this.props.STORE_STYLE.TEXT_COLOR,
                        }}
                      >
                        {mylexdata[i].lemma_translit}{" "}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontFamily: "NotoSans-Bold",
                          color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                        }}
                      >
                        {mylexdata[i].strong_aug}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        }

        if (this._isMounted === true) {
          this.setState(
            {
              isLoading: true,
            },

            () => {}
          );
        }
      });
  }

  OpenWordStudy(strongnumber, wordstrong, language) {
    const { push } = this.props.navigation;
    push("WordStudy", {
      strongnumber: strongnumber,
      wordstrong: wordstrong,
      language: language,
      key: "Word Study " + Math.random,
    });
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 70 : 85,
  },
  container: {
    backgroundColor: "#F4F5F8",
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  containertopRow: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBottom: {
    color: "#353535",
    fontSize: 14,
    paddingLeft: 20,
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2,
      },
      android: {
        borderRadius: 80,
      },
    }),
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button2: {
    shadowColor: "#353535",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  containertopRowText: {
    flexDirection: "column",
    marginLeft: 5,
  },

  containerBottom: {
    flex: 9,
  },
  containerBottomItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  containerBottomItem2: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

const mapStateToProps = (state) => {
  return {
    STORE_BIBLE: state.bible,
    STORE_STYLE: state.style,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SimilarHebrew);
