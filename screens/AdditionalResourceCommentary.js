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
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class AdditionalResourceCommentary extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      }, headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.data_view = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;

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
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          {this.data_view}
        </ScrollView>
      );
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
      "&entry_type=outline_chp";

    fetch(url_verse_phrase)
      .then((response) => response.json())
      .then((responseJson) => {
        let list_comment_resource =responseJson.data.comment_resource
        if (this._isMounted === true) {
          this.setState(
            {
              list_comment_resource: list_comment_resource,
            },
            () => {
              this.GOShowOutlineChapterCommentary();
            }
          );
        }
      });

    var urlCommentary =
      "https://sabdapro.com:3002/App/app_comment_summary?lang_code=" +
      this.language +
      "&entry_type=outline_book&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no +
      "&skip=0&limit=1000";
    fetch(urlCommentary)
      .then((response) => response.json())
      .then((responseJson) => {
        let comment_summary_data = responseJson.data.comment_summary
        if (this._isMounted === true) {
          this.setState({
            commentdata: comment_summary_data,
            isLoading: true,
          });
        }
      });
  }

  GoShowOutlineChapterSummary() {
    const { list_comment_resource } = this.state;

    if (list_comment_resource.length > 0) {
      for (var i = 0; i < list_comment_resource.length; i++) {
        var res_id = list_comment_resource[i].res_id;

        var urlcommentarydetail =
          "https://sabdapro.com:3002/App/app_comment_summary?res_id=" +
          res_id +
          " &lang_code=" +
          this.language +
          "&entry_type=outline_chp&type_search=BC&book_id=" +
          this.book_id +
          "&chapter_no=" +
          this.chapter_no +
          "&skip=0&limit= 1000";


        fetch(urlcommentarydetail)
          .then((response) => response.json())
          .then((responseJson) => {

            let comment_summary_data = responseJson.data.comment_summary

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
                        subentry_code: comment_summary_data[z].subentry_code,
                        language: this.language,
                        res_name: comment_summary_data[z].res_name,
                        key_commentary: comment_summary_data[z].key,
                        vref_commentary: comment_summary_data[z].vref,
                      });
                    }}
                    style={styles.containerBottomItem}
                  >
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
                    <View
                      style={{
                        flexDirection: "column",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          paddingLeft: 15,
                          fontFamily: "NotoSans-Bold",
                          paddingRight: 15,
                        }}
                      >
                        {comment_summary_data[z].key}
                      </Text>
                      <Text
                        style={{
                          fontSize: this.fsizeminusone,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                      >
                        {comment_summary_data[z].vref}
                      </Text>
                      <Text
                        style={{
                          fontSize: this.fsizeminusone,
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                      >
                        {comment_summary_data[z].res_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          });
      }
    }
    if (this._isMounted) {
      this.setState({ verse_phrase_comment: this.verse_phrase_comment });
    }
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
)(AdditionalResourceCommentary);
