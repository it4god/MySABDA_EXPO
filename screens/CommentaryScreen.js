import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
  StyleSheet,
  ScrollView,
  View,
  Text, Image,
  TouchableOpacity, Platform
} from "react-native";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
import * as COBible from "../common/COBible";
import * as SQLite from 'expo-sqlite';
import { withNavigation } from "react-navigation";
const headerHeight = Header.HEIGHT * 1.6;
class CommentaryScreen extends Component {
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
      finishloadapi: false
    };
    global.data_book = [];
    this.verse_phrase_comment = [];
    this.verse_range_comment = [];
    this.question_answer_comment = [];
    this.loading = false;

  }

  componentDidMount = () => {
    this._isMounted = true;

    this.book_id = this.props.navigation.getParam("book_id", "");
    this.chapter_no = this.props.navigation.getParam("chapter_no", "");
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


    this.start_i = COBible.getChapterVerse(
      COBible.getBookChapter(parseInt(this.book_id, 10)).start +
      parseInt(this.chapter_no, 10)
    ).start;
    this.end_i =
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.book_id, 10)).start +
        parseInt(this.chapter_no, 10)
      ).start +
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.book_id, 10)).start +
        parseInt(this.chapter_no, 10)
      ).end;
    this.lang_id = "0";
    if (this.props.STORE_BIBLE.LANG_CODE === "eng")
      this.lang_id = "1"
    else
      this.lang_id = "2"
      const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState({
        isLoading: false
      })
      this.GoCallAPI();
      this.GOCallAPI2();
      this.GoCallAPI3();

      setTimeout(() => {
        if (this.state.verse_phrase_comment.length == 0 && this.state.verse_range_comment.length == 0 && this.state.question_answer_comment == 0) {
          this.setState({
            isLoading: true
          })
        }
      }, 2000);
    })
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

    const versephrasecom = DCT.getValue("versephrasecom", this.language);
    const verserangecom = DCT.getValue("verserangecom", this.language);
    const quesans = DCT.getValue("quesans", this.language);
    return (
      <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
        <List.Section>
          {this.props.STORE_BIBLE.OFFLINE == true && this.state.isLoading == true && (
            <List.Accordion

              title={DCT.getValue("nocommentdata", this.language)}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
              expanded={true}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  paddingRight: 10,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR
                }}
              ><Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 15,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/download.png")}
                />
                <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }} onPress={() => {
                  const { navigate } = this.props.navigation;
                  navigate("Download", {});
                }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("commentary", this.language)}</Text>
              </View>
            </List.Accordion>

          )}
          {this.state.verse_phrase_comment.length > 0 && (
            <List.Accordion
              title={versephrasecom}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 19,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.isversephrasecom}
              onPress={() =>
                this.setState({ isversephrasecom: !this.state.isversephrasecom })
              }
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,


              }}

            >
              {this.state.verse_phrase_comment}
            </List.Accordion>
          )}
          {this.state.verse_range_comment.length > 0 && (
            <List.Accordion
              title={verserangecom}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 19,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.isverserangecom}
              onPress={() =>
                this.setState({ isverserangecom: !this.state.isverserangecom })
              }
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
            >
              {this.state.verse_range_comment}
            </List.Accordion>
          )}
          {this.state.question_answer_comment.length > 0 && (
            <List.Accordion
              title={quesans}
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 19,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.isquesans}
              onPress={() => this.setState({ isquesans: !this.state.isquesans })}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}

            >
              {this.state.question_answer_comment}
            </List.Accordion>
          )}
        </List.Section>
      </ScrollView>
    );
  }

  GoCallAPI() {




    if (this.props.STORE_BIBLE.OFFLINE == true) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT resource_cmt.res_id as res_id , res_name from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid >=  " + this.start_i + " AND vid <= " + this.end_i + " and entry_type_id = 1 and cmt_type_id = 3 GROUP BY resource_cmt.res_id HAVING COUNT(resource_cmt.res_id > 0) ";
      console.log(sqlcmt_map);
      try {
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => this.setState({ list_comment_resource: _array }),
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            this.GoOfflineVersePhraseCommentary()
          }
        );
      } catch (e) {
        console.log(e);
      }


    }
    else {
      var url_verse_phrase =
        "https://sabdapro.com:3002/App/app_comment_resource?limit=1000&skip=0&lang_code=" +
        this.language +
        "&type_search=BC&book_id=" +
        this.book_id +
        "&chapter_no=" +
        this.chapter_no +
        "&resource_type=verse_phrase_comment&entry_type=entry";

      fetch(url_verse_phrase)
        .then(response => response.json())
        .then(responseJson => {
          let list_comment_resource = responseJson.data.comment_resource
          if (this._isMounted === true) {
            this.setState(
              {
                list_comment_resource: list_comment_resource
              },
              () => {
                this.GOShowVersePhraseCommentary();
              }
            );
          }
        });
    }
  }
  GoOfflineVersePhraseCommentary() {
    this.data_view = [];
    console.log(" berapa data : " + this.state.list_comment_resource.length)
    for (let i = 0; i < this.state.list_comment_resource.length; i++) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT vid, resource_cmt.res_id, res_name, entry_code, key, vref from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid >=  " + this.start_i + " AND vid <= " + this.end_i + "  and entry_type_id = 1 and cmt_type_id = 3 and resource_cmt.res_id = " + this.state.list_comment_resource[i].res_id;

      console.log(sqlcmt_map);
      try {
        let myrows = [];
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => myrows = _array,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            const data_view = cloneDeep(this.data_view);
            for (var z = 0; z < myrows.length; z++) {
              const subentry_code = myrows[z].entry_code
              const res_name = myrows[z].res_name;
              const key_commentary = myrows[z].key;
              const vref_commentary = myrows[z].vref;
              var regexremove = /(<([^>]+)>)/gi;
              if (myrows[z].key !== null)
                key = myrows[z].key
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

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                >
                  <View
                    key={span_id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: 30,
                      marginRight: 30,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenCommentary(
                          subentry_code,
                          res_name,
                          key_commentary,
                          vref_commentary
                        );
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {key.trim()}{" "}
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                          {myrows[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
            let span_id = COMethods.getUniqueId("VersePhrase" + i);
            let versephrasecom_title = "";
            if (this.state.list_comment_resource[i].res_name.length > 36) {
              versephrasecom_title =
                this.state.list_comment_resource[i].res_name.substring(0, 36) +
                "..." +
                " " +
                "(" +
                myrows.length +
                ")";
            } else {
              versephrasecom_title =
                this.state.list_comment_resource[i].res_name.substring(0, 36) +
                " " +
                "(" +
                myrows.length +
                ")";
            }
            let verse_phrase_comment = [];
            verse_phrase_comment.push(
              <List.Section key={span_id}>
                <List.Accordion
                  title={versephrasecom_title}
                  titleStyle={{
                    fontSize: 14,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                  style={{
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                  left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
                >
                  {data_view}
                </List.Accordion>
              </List.Section>
            );
            if (this._isMounted) {
              this.setState({ verse_phrase_comment: [...this.state.verse_phrase_comment, ...verse_phrase_comment] })
              //this.setState({ ...verse_phrase_comment: ...this.verse_phrase_comment });
            }

          }

        );


      } catch (e) {
        console.log(e);
      }


    }


  }

  GOShowVersePhraseCommentary() {
    const { list_comment_resource } = this.state;

    if (list_comment_resource.length > 0) {
      this.data_view = [];
      for (var i = 0; i < list_comment_resource.length; i++) {
        var res_id = list_comment_resource[i].res_id;

        var urlcommentarydetail =
          "https://sabdapro.com:3002/App/app_comment_summary?res_id=" +
          res_id +
          " &lang_code=" +
          this.language +
          "&entry_type=entry&type_search=BC&book_id=" +
          this.book_id +
          "&chapter_no=" +
          this.chapter_no +
          "&skip=0&limit=1000";

        const data_view = cloneDeep(this.data_view);
        console.log(urlcommentarydetail);
        fetch(urlcommentarydetail)
          .then(response => response.json())
          .then(responseJson => {
            let comment_summary_data = responseJson.data.comment_summary

            for (var z = 0; z < comment_summary_data.length; z++) {
              const subentry_code = comment_summary_data[z].subentry_code;
              const res_name = comment_summary_data[z].res_name;
              const key_commentary = comment_summary_data[z].key;
              const vref_commentary = comment_summary_data[z].vref;
              var regexremove = /(<([^>]+)>)/gi;
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

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                >
                  <View
                    key={span_id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: 30,
                      marginRight: 30,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenCommentary(
                          subentry_code,
                          res_name,
                          key_commentary,
                          vref_commentary
                        );
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {key.trim()}{" "}
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                          {comment_summary_data[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          });

        span_id = COMethods.getUniqueId("VersePhrase" + i);
        let versephrasecom_title = "";
        if (list_comment_resource[i].res_name.length > 36) {
          versephrasecom_title =
            list_comment_resource[i].res_name.substring(0, 36) +
            "..." +
            " " +
            "(" +
            list_comment_resource[i].count +
            ")";
        } else {
          versephrasecom_title =
            list_comment_resource[i].res_name.substring(0, 36) +
            " " +
            "(" +
            list_comment_resource[i].count +
            ")";
        }
        this.verse_phrase_comment.push(
          <List.Section key={span_id}>
            <List.Accordion
              title={versephrasecom_title}
              titleStyle={{
                fontSize: 14,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              {data_view}
            </List.Accordion>
          </List.Section>
        );
      }
    }
    if (this._isMounted) {
      this.setState({ verse_phrase_comment: this.verse_phrase_comment });
    }
  }

  GOCallAPI2() {
    if (this.props.STORE_BIBLE.OFFLINE == true) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT resource_cmt.res_id as res_id , res_name from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid >=  " + this.start_i + " AND vid <= " + this.end_i + " and entry_type_id = 1 and cmt_type_id = 2 GROUP BY resource_cmt.res_id HAVING COUNT(resource_cmt.res_id > 0) ";
      console.log(sqlcmt_map);
      try {
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => this.setState({ list_comment_resource_verse_range: _array }),
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            this.GoOfflineVerseRangeCommentary()
          }
        );
      } catch (e) {
        console.log(e);
      }


    }
    else {
      var url_verse_range_commentary =
        "https://sabdapro.com:3002/App/app_comment_resource?limit=1000&skip=0&lang_code=" +
        this.language +
        "&type_search=BC&book_id=" +
        this.book_id +
        "&chapter_no=" +
        this.chapter_no +
        "&resource_type=verse_range_comment&entry_type=entry";
      fetch(url_verse_range_commentary)
        .then(response => response.json())
        .then(responseJson => {

          let list_comment_resource = responseJson.data.comment_resource
          if (this._isMounted === true) {
            this.setState(
              {
                list_comment_resource_verse_range: list_comment_resource
              },
              () => {
                this.GOShowVerseRangeCommentary();
              }
            );
          }
        });
    }
  }

  GoOfflineVerseRangeCommentary() {
    this.data_view = [];
    console.log(" berapa data : " + this.state.list_comment_resource_verse_range.length)
    for (let i = 0; i < this.state.list_comment_resource_verse_range.length; i++) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT resource_cmt.res_id, res_name, entry_code, key, vref from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid >=  " + this.start_i + " AND vid <= " + this.end_i + "  and entry_type_id = 1 and cmt_type_id = 2 and resource_cmt.res_id = " + this.state.list_comment_resource_verse_range[i].res_id + " GROUP BY resource_cmt.res_id, res_name, entry_code, key, vref";

      console.log(sqlcmt_map);
      try {
        let myrows = [];
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => myrows = _array,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            const data_view = cloneDeep(this.data_view);
            for (var z = 0; z < myrows.length; z++) {
              const subentry_code = myrows[z].entry_code;
              const res_name = myrows[z].res_name;
              const key_commentary = myrows[z].key;
              const vref_commentary = myrows[z].vref;
              var regexremove = /(<([^>]+)>)/gi;
              let key = "";
              if (myrows[z].key !== null)
                key = myrows[z].key
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

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                >
                  <View
                    key={span_id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: 30,
                      marginRight: 30,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenCommentary(
                          subentry_code,
                          res_name,
                          key_commentary,
                          vref_commentary
                        );
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {key.trim()}{" "}
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                          {myrows[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
            let span_id = COMethods.getUniqueId("VerseRange" + i);
            let verserangecom_title = "";
            if (this.state.list_comment_resource_verse_range[i].res_name.length > 36) {
              verserangecom_title =
                this.state.list_comment_resource_verse_range[i].res_name.substring(0, 36) +
                "..." +
                " " +
                "(" +
                myrows.length +
                ")";
            } else {
              verserangecom_title =
                this.state.list_comment_resource_verse_range[i].res_name.substring(0, 36) +
                " " +
                "(" +
                myrows.length +
                ")";
            }
            let verse_range_comment = [];
            verse_range_comment.push(
              <List.Section key={span_id}>
                <List.Accordion
                  title={verserangecom_title}
                  titleStyle={{
                    fontSize: 14,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                  style={{
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                  left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
                >
                  {data_view}
                </List.Accordion>
              </List.Section>
            );
            if (this._isMounted) {
              this.setState({ verse_range_comment: [...this.state.verse_range_comment, ...verse_range_comment] })
              //this.setState({ ...verse_phrase_comment: ...this.verse_phrase_comment });
            }

          }

        );


      } catch (e) {
        console.log(e);
      }


    }


  }


  GOShowVerseRangeCommentary() {
    const { list_comment_resource_verse_range } = this.state;

    if (list_comment_resource_verse_range.length > 0) {
      this.data_view = [];
      for (var i = 0; i < list_comment_resource_verse_range.length; i++) {
        var res_id = list_comment_resource_verse_range[i].res_id;

        var urlcommentarydetail =
          "https://sabdapro.com:3002/App/app_comment_summary?res_id=" +
          res_id +
          "&lang_code=" +
          this.language +
          "&entry_type=entry&type_search=BC&book_id=" +
          this.book_id +
          "&chapter_no=" +
          this.chapter_no +
          "&skip=0&limit=300";

        const data_view = cloneDeep(this.data_view);
        fetch(urlcommentarydetail)
          .then(response => response.json())
          .then(responseJson => {

            let comment_summary_data = responseJson.data.comment_summary

            for (var z = 0; z < comment_summary_data.length; z++) {
              span_id = COMethods.getUniqueId(z);
              const subentry_code = comment_summary_data[z].subentry_code;
              const res_name = comment_summary_data[z].res_name;
              const key_commentary = comment_summary_data[z].key;
              const vref_commentary = comment_summary_data[z].vref;
              var regexremove = /(<([^>]+)>)/gi;
              if (comment_summary_data[z].key !== null)
                key = comment_summary_data[z].key
                  .replace(/<para>/g, "")
                  .replace(/<b>/g, "")
                  .replace(/<\/b>/, "")
                  .replace(/<\/br>/g, "")
                  .replace(regexremove, "")
                  .replace("()", "")
                  .replace("()", "")
                  .replace("()", "").trim();
              else key = "";

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                >
                  <View
                    key={span_id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: 30,
                      marginRight: 30,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenCommentary(
                          subentry_code,
                          res_name,
                          key,
                          vref_commentary
                        );
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {key.trim()}{" "}
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                          {comment_summary_data[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          });

        span_id = COMethods.getUniqueId("VerseRange" + i);

        let verserangecom_title = "";
        if (list_comment_resource_verse_range[i].res_name.length > 36) {
          verserangecom_title =
            list_comment_resource_verse_range[i].res_name.substring(0, 36) +
            "...";
          " " + "(" + list_comment_resource_verse_range[i].count + ")";
        } else {
          verserangecom_title =
            list_comment_resource_verse_range[i].res_name.substring(0, 36) +
            " " +
            "(" +
            list_comment_resource_verse_range[i].count +
            ")";
        }
        this.verse_range_comment.push(
          <List.Section key={span_id}>
            <List.Accordion
              title={verserangecom_title}
              titleStyle={{
                fontSize: 14,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              {data_view}
            </List.Accordion>
          </List.Section>
        );
      }
    }
    if (this._isMounted) {
      this.setState({ verse_range_comment: this.verse_range_comment });
    }
  }

  GoCallAPI3() {
    if (this.props.STORE_BIBLE.OFFLINE == true) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT resource_cmt.res_id as res_id , res_name from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid >=  " + this.start_i + " AND vid <= " + this.end_i + " and entry_type_id = 1 and cmt_type_id = 1 GROUP BY resource_cmt.res_id HAVING COUNT(resource_cmt.res_id > 0) ";
      console.log(sqlcmt_map);
      try {
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => this.setState({ list_comment_resource_question_answer: _array }),
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            this.GoOfflineQuestionAnswerCommentary()
          }
        );
      } catch (e) {
        console.log(e);
      }


    }
    else {
      var url_question_answer =
        "https://sabdapro.com:3002/App/app_comment_resource?limit=1000&skip=0&lang_code=" +
        this.language +
        "&type_search=BC&book_id=" +
        this.book_id +
        "&chapter_no=" +
        this.chapter_no +
        "&resource_type=question&entry_type=entry";
      fetch(url_question_answer)
        .then(response => response.json())
        .then(responseJson => {

          let list_comment_resource = responseJson.data.comment_resource

          if (this._isMounted === true) {
            this.setState(
              {
                list_comment_resource_question_answer: list_comment_resource
              },
              () => {
                this.GOShowQuestionAnswer();
              }
            );
          }
        });
    }
  }

  GoOfflineQuestionAnswerCommentary() {
    this.data_view = [];
    console.log(" berapa data : " + this.state.list_comment_resource_question_answer.length)
    for (let i = 0; i < this.state.list_comment_resource_question_answer.length; i++) {
      let dbcmt = SQLite.openDatabase('cmt_map.db');
      let sqlcmt_map = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlcmt_map = "SELECT resource_cmt.res_id, res_name, entry_code, key, vref from map_cmt_verse_0" + this.lang_id + "_" + number + " INNER JOIN resource_cmt ON map_cmt_verse_0" + this.lang_id + "_" + number + ".res_id = resource_cmt.res_id WHERE vid >=  " + this.start_i + " AND vid <= " + this.end_i + "  and entry_type_id = 1 and cmt_type_id = 1 and resource_cmt.res_id = " + this.state.list_comment_resource_question_answer[i].res_id + " GROUP BY resource_cmt.res_id, res_name, entry_code, key, vref";

      console.log(sqlcmt_map);
      try {
        let myrows = [];
        dbcmt.transaction(
          tx => {
            tx.executeSql(sqlcmt_map,
              [],
              (_, { rows: { _array } }) => myrows = _array,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            const data_view = cloneDeep(this.data_view);
            for (var z = 0; z < myrows.length; z++) {
              const subentry_code = myrows[z].entry_code;
              const res_name = myrows[z].res_name;
              const key_commentary = myrows[z].key;
              const vref_commentary = myrows[z].vref;
              var regexremove = /(<([^>]+)>)/gi;
              if (myrows[z].key !== null)
                key = myrows[z].key
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

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                >
                  <View
                    key={span_id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: 30,
                      marginRight: 30,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenCommentary(
                          subentry_code,
                          res_name,
                          key_commentary,
                          vref_commentary
                        );
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {key.trim()}{" "}
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                          {myrows[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
            let span_id = COMethods.getUniqueId("VerseRange" + i);
            let quesans = "";
            if (this.state.list_comment_resource_question_answer[i].res_name.length > 36) {
              quesans =
                this.state.list_comment_resource_question_answer[i].res_name.substring(0, 36) +
                "..." +
                " " +
                "(" +
                myrows.length +
                ")";
            } else {
              quesans =
                this.state.list_comment_resource_question_answer[i].res_name.substring(0, 36) +
                " " +
                "(" +
                myrows.length +
                ")";
            }
            let qa = [];
            qa.push(
              <List.Section key={span_id}>
                <List.Accordion
                  title={quesans}
                  titleStyle={{
                    fontSize: 14,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                  style={{
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR
                  }}
                  left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
                >
                  {data_view}
                </List.Accordion>
              </List.Section>
            );
            if (this._isMounted) {
              this.setState({ question_answer_comment: [...this.state.question_answer_comment, ...qa] })
              this.setState({ finishloadapi: true })
            }

          }

        );


      } catch (e) {
        console.log(e);
      }


    }


  }
  GOShowQuestionAnswer() {
    const { list_comment_resource_question_answer } = this.state;

    if (list_comment_resource_question_answer.length > 0) {
      this.data_view = [];
      for (var i = 0; i < list_comment_resource_question_answer.length; i++) {
        var res_id = list_comment_resource_question_answer[i].res_id;

        var urlquestionanswer =
          "https://sabdapro.com:3002/App/app_comment_summary?res_id=" +
          res_id +
          "&lang_code=" +
          this.language +
          "&entry_type=entry&type_search=BC&book_id=" +
          this.book_id +
          "&chapter_no=" +
          this.chapter_no +
          "&skip=0&limit=300";

        const data_view = cloneDeep(this.data_view);
        fetch(urlquestionanswer)
          .then(response => response.json())
          .then(responseJson => {
            this.comment_summary = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.comment_summary
            );
            let comment_summary_data = responseJson.data.comment_summary;
            var regexremove = /(<([^>]+)>)/gi;

            for (var z = 0; z < comment_summary_data.length; z++) {
              span_id = COMethods.getUniqueId(z);
              const subentry_code = comment_summary_data[z].subentry_code;
              const res_name = comment_summary_data[z].res_name;
              const key_commentary = comment_summary_data[z].key;
              const vref_commentary = comment_summary_data[z].vref;
              key = comment_summary_data[z].key
                .replace(regexremove, "")
                .replace("()", "")
                .replace("()", "")
                .replace("()", "");

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                >
                  <View
                    key={span_id}
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      marginLeft: 30,
                      marginRight: 30,
                      paddingTop: 10,
                      paddingBottom: 10,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderBottomColor: this.props.STORE_STYLE.BORDER_COLOR
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenCommentary(
                          subentry_code,
                          res_name,
                          key_commentary,
                          vref_commentary
                        );
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {key.trim()}{" "}
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                          {comment_summary_data[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          });

        let span_id = COMethods.getUniqueId("QA" + i);
        let quesans = "";

        if (list_comment_resource_question_answer[i].res_name.length > 36) {
          quesans =
            list_comment_resource_question_answer[i].res_name.substring(0, 36) +
            "...";
          " " + "(" + list_comment_resource_question_answer[i].count + ")";
        } else {
          quesans = list_comment_resource_question_answer[i].res_name.substring(
            0,
            36
          );
          " " + "(" + list_comment_resource_question_answer[i].count + ")";
        }
        this.question_answer_comment.push(
          <List.Section key={span_id}>
            <List.Accordion
              title={quesans}
              titleStyle={{
                fontSize: 14,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              {data_view}
            </List.Accordion>
          </List.Section>
        );
      }
    }
    if (this._isMounted) {
      this.setState({ question_answer_comment: this.question_answer_comment });
      this.setState({ finishloadapi: true })
    }
  }
  OpenCommentary(subentry_code, res_name, key_commentary, vref_commentary) {
    const { navigate } = this.props.navigation;
    navigate("DetailCommentary", {
      subentry_code: subentry_code,
      language: this.language,
      res_name: res_name,
      key_commentary: key_commentary,
      vref_commentary: vref_commentary
    });
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingBottom: 150
  },
  contentContainer: {
    paddingBottom: 150
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
      dispatch(BibleAction.setLangChange(lang_code))
  };
};
export default  withNavigation(connect(mapStateToProps, mapDispatchToProps)(CommentaryScreen));
