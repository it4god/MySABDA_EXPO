import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform
} from "react-native";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import PopToTopScreen from "./Home/PopToTop";
import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class ChapterSummaryCommentary extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      }, headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerTransparent: true,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };



  constructor(props) {
    super(props);
    this.state = {
      data_view: [],
      is_intro_chapter: true,
      intro_chapter: [],
      isLoading: false,
      nodata: false,
      list_comment_resource: []
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.intro_chapter = DCT.getValue("introchapter", this.language)
    this.book_id = this.props.navigation.getParam("book_id", []);
    this.chapter_no = this.props.navigation.getParam("chapter_no", []);
    this.handleChangeTab(
      DCT.getValue("searchadditionalresources", this.language)
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
  handleChangeTab = (title) => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title,
    });
  };
  render() {
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.state.nodata) {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <Text>{DCT.getValue("00000002", this.language)}</Text>
          </ScrollView>
        );
      }
      else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <List.Section>
              <List.Accordion
                title={this.intro_chapter}
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.is_intro_chapter}
                onPress={() =>
                  this.setState({
                    is_intro_chapter: !this.state.is_intro_chapter,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                {this.state.intro_chapter}
              </List.Accordion>
            </List.Section>
            <View style={{height : 60}}></View>
          </ScrollView>
        );
      }
    }
  }
  renderFooter() {
    return <View style={styles.footer}></View>;
  }
  GoCallAPI() {
    var url_verse_phrase =
      "https://sabdapro.com:3002/App/app_comment_resource?limit=300&skip=0&lang_code=" +
      this.language +
      "&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no +
      "&entry_type=intro_chp";
    fetch(url_verse_phrase)
      .then((response) => response.json())
      .then((responseJson) => {

        let list_comment_resource =responseJson.data.comment_resource
        if (this._isMounted === true) {

          if (list_comment_resource.length > 0) {
            this.data_view = [];
            for (var i = 0; i < list_comment_resource.length; i++) {
              var res_id = list_comment_resource[i].res_id;

              var urlcommentarydetail =
                "https://sabdapro.com:3002/App/app_comment_summary?res_id=" +
                res_id +
                " &lang_code=" +
                this.language +
                "&entry_type=intro_chp&type_search=BC&book_id=" +
                this.book_id +
                "&chapter_no=" +
                this.chapter_no +
                "&skip=0&limit= 1000";

              fetch(urlcommentarydetail)
                .then((response) => response.json())
                .then((responseJson) => {
                  var comment_summary_data = responseJson.data.comment_summary

                  for (var z = 0; z < comment_summary_data.length; z++) {
                    const subentry_code = comment_summary_data[z].subentry_code;
                    const res_name = comment_summary_data[z].res_name;
                    const key_commentary = comment_summary_data[z].key;
                    const vref_commentary = comment_summary_data[z].vref;
                    var regexremove = /<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi;
                    if (comment_summary_data[z].key !== null)
                      key = comment_summary_data[z].key
                        .replace(/<para>/g, "")
                        .replace(/<b>/g, "")
                        .replace(/<\/b>/, "")
                        .replace(/<\/br>/g, "")
                        .replace(regexremove, "")
                        .replace("()", "")
                        .replace("()", "")
                        .replace("()", "");
                    else key = "";
                    span_id = COMethods.getUniqueId(z);

                    this.data_view.push(
                      <View
                        key={"intro chapter" + span_id}
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          paddingTop: 7,
                          paddingRight: 7,backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            const { navigate } = this.props.navigation;
                            navigate("DetailCommentary", {
                              subentry_code: subentry_code,
                              language: this.language,
                              res_name: res_name,
                              key_commentary: key_commentary,
                              vref_commentary: vref_commentary,
                            });
                          }}
                          style={styles.containerBottomItem}
                        >
                          {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
                          <Image
                            style={{
                              width: 25,
                              height: 25,
                              paddingLeft: 15,
                              paddingTop: 15,
                              paddingRight: 5,
                            }}
                            source={require("../assets/images/record.png")}
                          />
                          )}
                          {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
                          <Image
                            style={{
                              width: 25,
                              height: 25,
                              paddingLeft: 15,
                              paddingTop: 15,
                              paddingRight: 5,
                            }}
                            source={require("../assets/images/record_darkmode.png")}
                          />
                          )}
                          <View
                            style={{
                              flexDirection: "column",
                              flexWrap: "wrap",backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                            }}
                          >
                            <Text
                              style={{
                                paddingLeft: 15,
                                fontFamily: "NotoSans-Bold",
                                paddingRight: 15,color: this.props.STORE_STYLE.TEXT_COLOR
                              }}
                            >
                              {key_commentary}
                            </Text>
                            <Text
                              style={{
                                fontSize: this.fsizeminusone,
                                paddingLeft: 15,
                                paddingRight: 15,color: this.props.STORE_STYLE.TEXT_COLOR
                              }}
                            >
                              {vref_commentary}
                            </Text>
                            <Text
                              style={{
                                fontSize: this.fsizeminusone,
                                paddingLeft: 15,
                                paddingRight: 15,color: this.props.STORE_STYLE.TEXT_COLOR
                              }}
                            >
                              {res_name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                });
            }
            if (this._isMounted) {
              this.setState({
                intro_chapter: this.data_view,
                isLoading: true,
                nodata: false
              });
            }
          }
          else {
            this.setState({
              isLoading: true,
              nodata: true,
            });
          }
        }
      });
  }
  GOShowIntroChapterCommentary() {
    const { list_comment_resource } = this.state;


  }
}
const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  contentContainer: {

    paddingBottom: 30,
  },
  containerBottom: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  containerBottomItem: {
    flex: 9,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
  },
  item: {
    padding: 10,
  },
  separator: {
    height: 1,
   
  },
  text: {
    fontSize: 20,
    color: "#353535",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChapterSummaryCommentary);
