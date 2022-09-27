import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class AppLanguages extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor
    }
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("language", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
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
      <View style={[styles.container,styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            borderRadius: 5,
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
            {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
            <Image
              style={{ width: 25, height: 25, paddingRight: 1 }}
              source={require("../assets/images/language_black.png")}
            />
            )}
                        {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
            <Image
              style={{ width: 25, height: 25, paddingRight: 1 }}
              source={require("../assets/images/language_white_darkmode.png")}
            />
            )}
          </View>
          <View style={styles.containerBottom}>
            <TouchableOpacity
              onPress={() => {
                this.applanguage = "eng";
                this._storeData();
                this.props.ACT_setLangChange("eng");
                this.props.navigation.navigate('Home');
              }}
              style={styles.containerBottomItem}
            >
              <View style={styles.button}>
                <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>English</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            borderRadius: 5,
            paddingTop: 5,
            paddingBottom: 5,
            backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
          }}
        >
          <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
          {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
            <Image
              style={{ width: 25, height: 25, paddingRight: 1 }}
              source={require("../assets/images/language_black.png")}
            />
            )}
                        {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
            <Image
              style={{ width: 25, height: 25, paddingRight: 1 }}
              source={require("../assets/images/language_white_darkmode.png")}
            />
            )}
          </View>
          <View style={styles.containerBottom}>
            <TouchableOpacity
              onPress={() => {
                this.applanguage = "ind";
                this._storeData();
                this.props.ACT_setLangChange("ind");
                this.props.navigation.navigate('Home');
              }}
              style={styles.containerBottomItem}
            >
              <View style={styles.button}>
              <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>Indonesia</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("applanguage", this.applanguage);
    } catch (error) {
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,

  },
  containertopRow: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBottom: {
    color: "#353535",
    fontSize: 15,
    fontWeight: "bold",
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

  containertopRowText: {
    flexDirection: "column",
    marginLeft: 5,
  },

  containerBottom: {
    flex: 8,
    paddingRight: 20,
  },
  containerBottomItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppLanguages);
