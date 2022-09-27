import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Platform,
  AsyncStorage
} from "react-native";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import * as BibleStyle from "../../actions/BibleStyleAction";
import { HeaderBackButton } from 'react-navigation-stack';
import { ToggleButton, Switch } from "react-native-paper";
import { setCustomText } from "react-native-global-props";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT * 1.6;
class Settings extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    if (params.change == true) {
      return {
        title: " ",
        headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
        headerStyle: {
          backgroundColor: params.backgroundcolor,
        },
        headerLeft: <HeaderBackButton tintColor={params.titlecolor} onPress={() => {

          navigation.replace('Home')

        }} />,
        headerTransparent: true,
        headerBackTitle: "",
        headerTintColor: params.titlecolor,
      }
    }
    else {
      return {
        title: " ",
        headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
        headerStyle: {
          backgroundColor: params.backgroundcolor,
        },
        headerLeft: <HeaderBackButton tintColor={params.titlecolor} onPress={() => {

          navigation.goBack();

        }} />,
        headerTransparent: true,
        headerBackTitle: "",
        headerTintColor: params.titlecolor,
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      font_size: "16",
      isLineView: false,
      isShowNotes: false,
      isShowPericopes: false,
      isShowHighlight: false,
      isShowDarkMode: false,
      isOffline: false,
      SearchLimit: "50"
    };
    this.show_limit_search = false;
  }
  _storeData = async () => {
    let islineview = "true";
    if (this.state.isLineView === true) islineview = "true";
    else islineview = "false";

    let isshownotes = "true";
    if (this.state.isShowNotes === true) isshownotes = "true";
    else isshownotes = "false";

    let isshowpericopes = "true";
    if (this.state.isShowPericopes === true) isshowpericopes = "true";
    else isshowpericopes = "false";

    let isshowhighlight = "true";
    if (this.state.isShowHighlight === true) isshowhighlight = "true";
    else isshowhighlight = "false";

    let isshowdarkmode = "true";
    if (this.state.isShowDarkMode === true) isshowdarkmode = "true";
    else isshowdarkmode = "false";

    let isoffline = "true";
    if (this.state.isOffline === true) isoffline = "true";
    else isoffline = "false";

    try {
      await AsyncStorage.setItem("is_line_view", islineview);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("is_show_notes", isshownotes);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("is_show_pericopes", isshowpericopes);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("is_show_highlight", isshowhighlight);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("is_show_darkmode", isshowdarkmode);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("is_offline", isoffline);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("fontsize", this.state.font_size);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("searchlimit", this.state.SearchLimit);
    } catch (error) {
      console.log(error);
    }

    this.defaultFonts();
  };

  defaultFonts() {
    const customTextProps = {
      style: {
        fontSize: Number(this.state.font_size),
        fontFamily: "NotoSans-Regular"
      }
    };
    setCustomText(customTextProps);

    this.props.ACT_setBookChapterChange(true);
    this.props.ACT_setIsLineView(this.state.isLineView);
    this.props.ACT_setIsShowNotes(this.state.isShowNotes);
    this.props.ACT_setIsShowPericopes(this.state.isShowPericopes);
    this.props.ACT_setIsShowHighlight(this.state.isShowHighlight);
    this.props.ACT_setIsShowDarkMode(this.state.isShowDarkMode);
    this.props.ACT_setDarkMode(this.state.isShowDarkMode);
    this.props.ACT_setOffline(this.state.isOffline);
    this.props.ACT_setFontSize(this.state.font_size);
    this.props.ACT_setSearchLimit(this.state.SearchLimit);
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR,
      change: true
    });
  }



  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.book_id = this.props.STORE_BIBLE.BOOK_ID;
    this.handleChangeTab(DCT.getValue("setting", this.language));
    this.setState({
      isLineView: this.props.STORE_BIBLE.IS_LINE_VIEW,
      isShowNotes: this.props.STORE_BIBLE.IS_SHOW_NOTES,
      isShowPericopes: this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
      isShowHighlight: this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
      isShowDarkMode: this.props.STORE_BIBLE.IS_SHOW_DARKMODE,
      isOffline : this.props.STORE_BIBLE.OFFLINE,
      font_size: this.props.STORE_BIBLE.FONT_SIZE,
      SearchLimit: this.props.STORE_BIBLE.SEARCH_LIMIT
    });
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR,
      change: false,
    });

  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title,

    });
  };
  render() {
    return (
      <ScrollView style={[styles.header, { paddingTop: 10, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, paddingTop: 80 }]}>
        <View
          style={{
            flexDirection: "column",
            paddingTop: 20,
            marginLeft: 15,
            marginright: 15,
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <Text style={{ paddingLeft: 10, fontSize: 18, color: this.props.STORE_STYLE.TEXT_COLOR, fontFamily: 'NotoSans-Bold' }}>
            {" "}
            {DCT.getValue("textsize", this.catalog_language)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10,
              paddingLeft: 10,
              paddingTop: 10
            }}
          >
            <ToggleButton.Group
              onValueChange={value => {
                this.setState(
                  {
                    font_size: value
                  },
                  () => {
                    this._storeData();
                  }
                );
              }}
              value={this.state.font_size}
            >
              {this.state.font_size == "14" && (
                <View style={{ backgroundColor: "#273f7a", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 15, height: 15, tintColor: "#ffffff" }}
                      />
                    )}
                    value="14"
                    tintColor="#ffffff"
                  />
                </View>
              )}
              {this.state.font_size != "14" && (
                <View style={{ backgroundColor: "#3B93DB", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 15, height: 15, tintColor: "#ffffff" }}
                      />
                    )}
                    value="14"
                    tintColor="#ffffff"
                  />
                </View>
              )}

              <View style={{ paddingLeft: 10 }}></View>
              {this.state.font_size == "15" && (
                <View style={{ backgroundColor: "#273f7a", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 17, height: 17, tintColor: "#ffffff" }}
                      />
                    )}
                    value="15"
                    tintColor="#ffffff"
                  />
                </View>
              )}

              {this.state.font_size != "15" && (
                <View style={{ backgroundColor: "#3B93DB", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 17, height: 17, tintColor: "#ffffff" }}
                      />
                    )}
                    value="15"
                    tintColor="#ffffff"
                  />
                </View>
              )}
              <View style={{ paddingLeft: 10 }}></View>
              {this.state.font_size == "16" && (
                <View style={{ backgroundColor: "#273f7a", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 19, height: 19, tintColor: "#ffffff" }}
                      />
                    )}
                    value="16"
                    tintColor="#ffffff"
                  />
                </View>
              )}
              {this.state.font_size != "16" && (
                <View style={{ backgroundColor: "#3B93DB", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 19, height: 19, tintColor: "#ffffff" }}
                      />
                    )}
                    value="16"
                    tintColor="#ffffff"
                  />
                </View>
              )}
              <View style={{ paddingLeft: 10 }}></View>
              {this.state.font_size == "17" && (
                <View style={{ backgroundColor: "#273f7a", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 21, height: 21, tintColor: "#ffffff" }}
                      />
                    )}
                    value="17"
                    tintColor="#ffffff"
                  />
                </View>
              )}
              {this.state.font_size != "17" && (
                <View style={{ backgroundColor: "#3B93DB", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 21, height: 21, tintColor: "#ffffff" }}
                      />
                    )}
                    value="17"
                    tintColor="#ffffff"
                  />
                </View>
              )}

              <View style={{ paddingLeft: 10 }}></View>
              {this.state.font_size == "18" && (
                <View style={{ backgroundColor: "#273f7a", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 23, height: 23, tintColor: "#ffffff" }}
                      />
                    )}
                    value="18"
                    tintColor="#ffffff"
                  />
                </View>
              )}
              {this.state.font_size != "18" && (
                <View style={{ backgroundColor: "#3B93DB", width: 43 }}>
                  <ToggleButton
                    icon={({ }) => (
                      <Image
                        source={require("../../assets/images/fontsize.png")}
                        style={{ width: 23, height: 23, tintColor: "#ffffff" }}
                      />
                    )}
                    value="18"
                    tintColor="#ffffff"
                  />
                </View>
              )}
            </ToggleButton.Group>
          </View>
          <Text
            style={{
              paddingLeft: 10,
              fontSize: 18,
              fontFamily: 'NotoSans-Bold',
              paddingTop: 10,
              paddingBottom: 10,
              color: this.props.STORE_STYLE.TEXT_COLOR,
            }}
          >
            {" "}
            {DCT.getValue("display", this.catalog_language)}
          </Text>
          <View
            style={{
              paddingLeft: 10,
              flex: 1,
              borderWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 15
            }}
          >
            <Switch
              value={this.state.isLineView}
              onValueChange={() => {
                this.setState({ isLineView: !this.state.isLineView });
                setTimeout(() => {
                  this._storeData();
                }, 500);
              }}
              color="#3B93DB"
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 15,
                paddingTop: 10,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {DCT.getValue("lineview", this.catalog_language)}
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 10,
              flex: 1,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 15
            }}
          >
            <Switch
              value={this.state.isShowNotes}
              onValueChange={() => {
                this.setState({ isShowNotes: !this.state.isShowNotes });
                setTimeout(() => {
                  this._storeData();
                }, 500);
              }}
              color="#3B93DB"
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 15,
                paddingTop: 10,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {DCT.getValue("shownotes", this.catalog_language)}
            </Text>
          </View>

          <View
            style={{
              paddingLeft: 10,
              flex: 1,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 15
            }}
          >
            <Switch
              value={this.state.isShowPericopes}
              onValueChange={() => {
                this.setState({ isShowPericopes: !this.state.isShowPericopes });
                setTimeout(() => {
                  this._storeData();
                }, 500);
              }}
              color="#3B93DB"
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 15,
                paddingTop: 10,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {DCT.getValue("showpericope", this.catalog_language)}
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 10,
              flex: 1,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 15
            }}
          >
            <Switch
              value={this.state.isShowHighlight}
              onValueChange={() => {
                this.setState({ isShowHighlight: !this.state.isShowHighlight });
                setTimeout(() => {
                  this._storeData();
                }, 500);
              }}
              color="#3B93DB"
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 15,
                paddingTop: 10,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {DCT.getValue("showwordstudyhint", this.catalog_language)}
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 11,
                paddingTop: 15,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            ></Text>
          </View>
          <View
            style={{
              paddingLeft: 10,
              flex: 1,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 15
            }}
          >
            <Switch
              value={this.state.isShowDarkMode}
              onValueChange={() => {
                this.setState({ isShowDarkMode: !this.state.isShowDarkMode });
                setTimeout(() => {
                  this._storeData();
                }, 500);
              }}
              color="#3B93DB"
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 15,
                paddingTop: 10,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {DCT.getValue("isdarkmode", this.catalog_language)}
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 11,
                paddingTop: 15
              }}
            ></Text>
          </View>
          <View
            style={{
              paddingLeft: 10,
              flex: 1,
              borderBottomWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 10,
              marginRight: 15
            }}
          >
            <Switch
              value={this.state.isOffline}
              onValueChange={() => {
                this.setState({ isOffline: !this.state.isOffline });
                setTimeout(() => {
                  this._storeData();
                }, 500);
              }}
              color="#3B93DB"
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 15,
                paddingTop: 10,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {DCT.getValue("isoffline", this.catalog_language)}
            </Text>
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 11,
                paddingTop: 15
              }}
            ></Text>
          </View>
        </View>
        {this.show_limit_search && (
          <Text
            style={{
              paddingLeft: 10,
              paddingTop: 20,
              fontSize: 18,
              fontFamily: 'NotoSans-Bold'
            }}
          >
            {" "}
            {DCT.getValue("searchlimit", this.catalog_language)}
          </Text>
        )}
        {this.show_limit_search && (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10,
              paddingLeft: 10,
              paddingTop: 10
            }}
          >
            <ToggleButton.Group
              onValueChange={value => {
                this.setState(
                  {
                    SearchLimit: value
                  },
                  () => {
                    this._storeData();
                  }
                );
              }}
              value={this.state.SearchLimit}
            >
              <View style={{ backgroundColor: "#3B93DB", width: 43 }}>
                <ToggleButton
                  icon={({ }) => (
                    <Text style={{ fontSize: 13, color: "white" }}>{"25"}</Text>
                  )}
                  value="25"
                  tintColor="#ffffff"
                />
              </View>
              <View style={{ paddingLeft: 10 }}></View>
              <View style={{ backgroundColor: "#3B93DB", width: 40 }}>
                <ToggleButton
                  icon={({ }) => (
                    <Text style={{ fontSize: 13, color: "white" }}>{"50"}</Text>
                  )}
                  value="50"
                  tintColor="#ffffff"
                />
              </View>
              <View style={{ paddingLeft: 10 }}></View>
              <View style={{ backgroundColor: "#3B93DB", width: 40 }}>
                <ToggleButton
                  icon={({ }) => (
                    <Text style={{ fontSize: 13, color: "white" }}>
                      {"100"}
                    </Text>
                  )}
                  value="100"
                  tintColor="#ffffff"
                />
              </View>
              <View style={{ paddingLeft: 10 }}></View>
              <View style={{ backgroundColor: "#3B93DB", width: 40 }}>
                <ToggleButton
                  icon={({ }) => (
                    <Text style={{ fontSize: 13, color: "white" }}>
                      {"200"}
                    </Text>
                  )}
                  value="200"
                  tintColor="#ffffff"
                />
              </View>
              <View style={{ paddingLeft: 10 }}></View>
              <View style={{ backgroundColor: "#3B93DB", width: 40 }}>
                <ToggleButton
                  icon={({ }) => (
                    <Text style={{ fontSize: 13, color: "white" }}>
                      {"500"}
                    </Text>
                  )}
                  value="500"
                  tintColor="#ffffff"
                />
              </View>
              <View style={{ paddingLeft: 10 }}></View>
              <View style={{ backgroundColor: "#3B93DB", width: 40 }}>
                <ToggleButton
                  icon={({ }) => (
                    <Text style={{ fontSize: 13, color: "white" }}>
                      {"Max"}
                    </Text>
                  )}
                  value="3000"
                  tintColor="#ffffff"
                />
              </View>
            </ToggleButton.Group>
          </View>

        )}
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10
  }
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
    ACT_setIsShowDarkMode: (is_showdarkmode) =>
      dispatch(BibleAction.setIsShowDarkMode(is_showdarkmode)),
    ACT_setFontSize: (set_font_size) =>
      dispatch(BibleAction.setFontSize(set_font_size)),
    ACT_setBibleVersion: (set_bible_version) =>
      dispatch(BibleAction.setBibleVersion(set_bible_version)),
    ACT_setTempBibleVersion: (set_temp_bible_version) =>
      dispatch(BibleAction.setTempBibleVersion(set_temp_bible_version)),
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
    ACT_setDarkMode: (set_dark_mode) =>
      dispatch(BibleStyle.setDarkMode(set_dark_mode)),
    ACT_setOffline: (set_offline) =>
      dispatch(BibleAction.SetOffline(set_offline))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
