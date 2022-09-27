import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image, Platform
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { List } from "react-native-paper";
import PopToTopScreen from "./Home/PopToTop";
import * as SQLite from 'expo-sqlite';
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT * 1.6;
class VersePhraseCommentaryScreen extends Component {
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
      list_comment_resource: [],
      list_comment_resource_verse_range: [],
      list_comment_resource_question_answer: [],
      verse_phrase_comment: [],
      verse_range_comment: [],
      question_answer_comment: [],
      isversephrasecom: true,
      isverserangecom: true,
      isquesans: true,
    };
    global.data_book = [];
    this.verse_phrase_comment = [];
    this.verse_range_comment = [];
    this.question_answer_comment = [];
  }

  componentDidMount = () => {
    this._isMounted = true;

    this.vid = this.props.navigation.getParam("vid", "");
    this.book_id = this.props.navigation.getParam("book_id", "");
    this.version_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.version_code === "tb" ||
      this.version_code === "ayt" ||
      this.version_code === "avb"
    )
      this.lang_code = "ind";
    else this.lang_code = "eng";
    this.language = this.props.STORE_BIBLE.LANG_CODE;

    this.handleChangeTab(DCT.getValue("menu_comment", this.language));
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
    return (
      <ScrollView style={[styles.containerActivityIndicator, styles.horizontal, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
        <List.Section>
          {this.state.verse_range_comment.length > 0 && (
            <List.Accordion
              title={DCT.getValue("verserangecom", this.language)}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.isverserangecom}
              onPress={() =>
                this.setState({ isverserangecom: !this.state.isverserangecom })
              }
              style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, borderTopWidth: 1, borderColor: this.props.STORE_STYLE.BORDER_COLOR, borderBottomWidth: 1 }}
            >
              <FlatList
                style={{ width: "100%" }}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.verse_range_comment}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          const { navigate } = this.props.navigation;
                          navigate("DetailCommentary", {
                            subentry_code: item.subentry_code,
                            language: this.language,
                            res_name: item.res_name,
                            key_commentary: item.key,
                            vref_commentary: item.vref,
                          });
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
                            source={require("../assets/images/record.png")}
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
                            source={require("../assets/images/record_darkmode.png")}
                          />
                        )}
                        <View
                          style={{
                            flexDirection: "column",
                            flexWrap: "nowrap",
                          }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.key}
                          </Text>
                          <Text
                            style={{
                              fontSize: this.fsizeminusone,
                              paddingLeft: 15,
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.vref}
                          </Text>
                          <Text
                            style={{
                              fontSize: this.fsizeminusone,
                              paddingLeft: 15,
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.res_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={this.renderFooter.bind(this)}
              />

            </List.Accordion>
          )}
          {this.state.verse_phrase_comment.length > 0 && (
            <List.Accordion
              title={DCT.getValue("versephrasecom", this.language)}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.isversephrasecom}
              onPress={() =>
                this.setState({ isversephrasecom: !this.state.isversephrasecom })
              }
              style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, borderColor: this.props.STORE_STYLE.BORDER_COLOR, borderBottomWidth: 1, borderTopWidth: 1 }}
            >
              <FlatList
                style={{ width: "100%" }}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.verse_phrase_comment}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderBottomWidth: 1,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          const { navigate } = this.props.navigation;
                          navigate("DetailCommentary", {
                            subentry_code: item.subentry_code,
                            language: this.language,
                            res_name: item.res_name,
                            key_commentary: item.key,
                            vref_commentary: item.vref,
                          });
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
                            source={require("../assets/images/record.png")}
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
                            source={require("../assets/images/record_darkmode.png")}
                          />
                        )}
                        <View
                          style={{
                            flexDirection: "column",
                            flexWrap: "nowrap",
                          }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.key}
                          </Text>
                          <Text
                            style={{
                              fontSize: this.fsizeminusone,
                              paddingLeft: 15,
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.vref}
                          </Text>
                          <Text
                            style={{
                              fontSize: this.fsizeminusone,
                              paddingLeft: 15,
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.res_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={this.renderFooter.bind(this)}
              />

            </List.Accordion>
          )}
          {this.state.question_answer_comment.length > 0 && (
            <List.Accordion
              title={DCT.getValue("quesans", this.language)}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.isquesans}
              onPress={() => this.setState({ isquesans: !this.state.isquesans })}
              style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, borderColor: this.props.STORE_STYLE.BORDER_COLOR, borderBottomWidth: 1, borderTopWidth: 1 }}
            >
              <FlatList
                style={{ width: "100%" }}
                keyExtractor={(item, index) => index.toString()}
                data={this.state.question_answer_comment}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          const { navigate } = this.props.navigation;
                          navigate("DetailCommentary", {
                            subentry_code: item.subentry_code,
                            language: this.language,
                            res_name: item.res_name,
                            key_commentary: item.key,
                            vref_commentary: item.vref,
                          });
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
                            source={require("../assets/images/record.png")}
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
                            source={require("../assets/images/record_darkmode.png")}
                          />
                        )}
                        <View
                          style={{
                            flexDirection: "column",
                            flexWrap: "nowrap",
                          }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.key}
                          </Text>
                          <Text
                            style={{
                              fontSize: this.fsizeminusone,
                              paddingLeft: 15,
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.vref}
                          </Text>
                          <Text
                            style={{
                              fontSize: this.fsizeminusone,
                              paddingLeft: 15,
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {item.res_name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={this.renderFooter.bind(this)}
              />

            </List.Accordion>
          )}
        </List.Section>
        <View style={{ height: 160 }}></View>
      </ScrollView>
    );
  }
  renderFooter() {
    return <View style={styles.footer}></View>;
  }
  GoCallAPI() {
    this.lang_id = "0";
    if (this.props.STORE_BIBLE.LANG_CODE === "eng")
      this.lang_id = "1"
    else
      this.lang_id = "2"
    if (this.props.STORE_BIBLE.OFFLINE == true) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT resource_cmt.res_id as res_id , res_name, entry_code, key, vref, cmt_type_id  from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid =  " + this.vid + " and entry_type_id = 1 GROUP BY resource_cmt.res_id HAVING COUNT(resource_cmt.res_id > 0) ";
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
           
            let key = "";
            var regexremove = /(<([^>]+)>)/gi;
            let versephrasecomment = [];
            let verserangecomment = [];
            let questioncomment = [];
            console.log("Jumlah Commentary " + this.list_comment_resource.length)
            for (let i = 0; i < this.list_comment_resource.length; i++) {
              key = "";
              if (this.list_comment_resource[i].key !== null) {
                key = this.list_comment_resource[i].key.replace(regexremove, "");
              }
              if (this.list_comment_resource[i].cmt_type_id.toString() === "2")
                verserangecomment.push({
                  key: key,
                  vref: this.list_comment_resource[i].vref,
                  res_name: this.list_comment_resource[i].res_name,
                  subentry_code: this.list_comment_resource[i].entry_code
                });
                if (this.list_comment_resource[i].cmt_type_id.toString() === "3")
                versephrasecomment.push({
                  key: key,
                  vref: this.list_comment_resource[i].vref,
                  res_name: this.list_comment_resource[i].res_name,
                  subentry_code: this.list_comment_resource[i].entry_code
                });
                if (this.list_comment_resource[i].cmt_type_id.toString() === "1")
                questioncomment.push({
                  key: key,
                  vref:this.list_comment_resource[i].vref,
                  res_name: this.list_comment_resource[i].res_name,
                  subentry_code:this.list_comment_resource[i].entry_code
                });
            }
            this.setState({
              verse_range_comment: verserangecomment,
              verse_phrase_comment: versephrasecomment,
              question_answer_comment: questioncomment,
              isLoading: true,
            });


          }
        );
      } catch (e) {
        console.log(e);
      }

    }
    else {
      var urlcommentarydetail =
        "https://sabdapro.com:3002/App/app_comment_summary?lang_code=" +
        this.language +
        "&entry_type=entry&type_search=L&list_vid=" +
        this.vid +
        "&skip=0&limit=1000";

      console.log(urlcommentarydetail);
      fetch(urlcommentarydetail)
        .then((response) => response.json())
        .then((responseJson) => {
          this.comment_summary = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.comment_summary
          );
          let comment_summary_data = JSON.parse(this.comment_summary);
          let key = "";
          var regexremove = /(<([^>]+)>)/gi;
          let versephrasecomment = [];
          let verserangecomment = [];
          let questioncomment = [];
          for (let i = 0; i < comment_summary_data.length; i++) {
            key = "";
            if (comment_summary_data[i].key !== null) {
              key = comment_summary_data[i].key.replace(regexremove, "");
            }
            if (comment_summary_data[i].resource_type === "verse_range_comment")
              verserangecomment.push({
                key: key,
                vref: comment_summary_data[i].vref,
                res_name: comment_summary_data[i].res_name,
                subentry_code: comment_summary_data[i].subentry_code
              });
            if (comment_summary_data[i].resource_type === "verse_phrase_comment")
              versephrasecomment.push({
                key: key,
                vref: comment_summary_data[i].vref,
                res_name: comment_summary_data[i].res_name,
                subentry_code: comment_summary_data[i].subentry_code
              });
            if (comment_summary_data[i].resource_type === "question")
              questioncomment.push({
                key: key,
                vref: comment_summary_data[i].vref,
                res_name: comment_summary_data[i].res_name,
                subentry_code: comment_summary_data[i].subentry_code
              });
          }
          this.setState({
            verse_range_comment: verserangecomment,
            verse_phrase_comment: versephrasecomment,
            question_answer_comment: questioncomment,
            isLoading: true,
          });
        });
    }
  }

  OpenCommentary(subentry_code, res_name, key_commentary, vref_commentary) {
    const { navigate } = this.props.navigation;
    navigate("DetailCommentary", {
      subentry_code: subentry_code,
      language: this.language,
      res_name: res_name,
      key_commentary: key_commentary,
      vref_commentary: vref_commentary,
    });
  }
}
const styles = StyleSheet.create({
  header: {
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
    padding: 0,
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
)(VersePhraseCommentaryScreen);
