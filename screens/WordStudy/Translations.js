import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  ActivityIndicator,

} from "react-native";
import TagParser from "../../common/TagParser";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import PopToTopScreen from "../Home/PopToTop";
import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class Translations extends Component {
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
      lemma: "",
      lemma_translit: "",
      strong_aug: "",
      strong_number: "",
      isLoading: false,
      arraycontent: [],
      arr: [],
      arr_count: [],
      myversedata: []
    };
    this.mytranslations = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.strong_aug = this.props.navigation.getParam("strong_aug", "");
    this.lemma = this.props.navigation.getParam("lemma", "");
    this.lemma_translit = this.props.navigation.getParam("lemma_translit", "");
    this.fsize = Number(this.props.STORE_BIBLE.FONT_SIZE) + 1;
    this.title_translation = DCT.getValue("translations", this.language);
    this.handleChangeTab(DCT.getValue("translations", this.language));
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
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header, {backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      const { navigate } = this.props.navigation;
      return (
        <ScrollView style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2, }]}>
          <View style={[styles.container,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}]}>
            <View>
              <Text
                style={{
                  fontWeight: "normal",
                  paddingLeft: 15,
                  paddingRight: 10,  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {"Translations of "}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: this.fsize,
                  textAlign: "left",  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.lemma}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "normal",
                  paddingLeft: 15,
                  paddingRight: 10,  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {"("}
                {this.lemma_translit}
                {" - "}
                {this.strong_aug}
                {")"}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontWeight: "normal",
                  paddingLeft: 15,
                  paddingRight: 10,  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {" appears in: "}
              </Text>
            </View>
          </View>
          <List.Section>{this.mytranslations}</List.Section>
          <View style={{ height: 100 }}></View>
        </ScrollView>
      );
    }
  }
  GoCallAPI() {
    var urltranslations =
      "https://sabdapro.com:3002/App/app_lex_translation?limit=6&skip=0&lang_code=" +
      this.language +
      "&strong_aug=" +
      this.strong_aug;
    console.log(urltranslations);
    fetch(urltranslations)
      .then(response => response.json())
      .then(responseJson => {
        this.translations = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_lex_trans
        );
        this.mytranslations = [];
        let mytranslation = JSON.parse(this.translations);

        for (let i = 0; i < mytranslation.length; i++) {
          this.list_word = [];
          let mylistword = mytranslation[i].list_word;
          for (let x = 0; x < mylistword.length; x++) {
            this.list_word.push(
              <View
                key={x + "Statistics"}
                style={{
                  flexDirection: "row",
                  flex: 1,
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,

                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,
                  shadowColor: "#353535",
                  shadowOffset: {
                    width: 0,
                    height: 2
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 2.62,

                  elevation: 4
                }}
              >
                <View style={{ flex: 8 }}>
                  <View style={styles.button}>
                    <Text style={[styles.txtBottom,{color: this.props.STORE_STYLE.TEXT_COLOR}]}>{mylistword[x].key}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    paddingLeft: 10
                  }}
                >
                 <Text style={[styles.txtBottom,{color: this.props.STORE_STYLE.TEXT_COLOR}]}>{mylistword[x].count}</Text>
                </View>
              </View>
            );
          }
          let titletranslation = mytranslation[i].res_code.toUpperCase();
          this.mytranslations.push(
            <List.Accordion
              key={i}
              title={titletranslation}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 18,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                paddingLeft: 20,
                paddingRight: 20
              }}
              expanded={true}
            >
              {this.list_word}
            </List.Accordion>
          );
        }
      });

    if (this._isMounted === true) {
      this.setState(
        {
          isLoading: true
        },

        () => { }
      );
    }
  }


}

const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#353535",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,

    elevation: 4
  },
  containertopRow: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBottom: {
    color: "#353535",
    fontSize: 14,
    paddingLeft: 20
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2
      },
      android: {
        borderRadius: 80
      }
    })
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  button2: {
    shadowColor: "#353535",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  },
  containertopRowText: {
    flexDirection: "column",
    marginLeft: 5
  },

  containerBottom: {
    flex: 9
  },
  containerBottomItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  containerBottomItem2: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
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
      dispatch(BibleAction.setBibleVersion(set_bible_version))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Translations);
