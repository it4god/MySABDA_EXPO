import React, { Component } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity, Platform
} from "react-native";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import * as COBible from "../common/COBible";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class BookSummaryCommentaryScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: " ",
    headerTitle: <Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", }}>{navigation.getParam("title", "")}</Text>,
    headerStyle: {
      backgroundColor: "#FFFFFF"
    },
    headerBackTitle: "",
    headerTransparent: true,
    headerTintColor: "#353535"
  });

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
      isquesans: true
    };
    global.data_book = [];
    this.verse_phrase_comment = [];
    this.verse_range_comment = [];
    this.question_answer_comment = [];
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


    this.list_vid = "";

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

    for (let i = this.start_i + 1; i <= this.end_i; i++) {
      this.list_vid = this.list_vid + "," + i.toString();
    }

    this.list_vid = this.list_vid.substr(1);



    this.handleChangeTab(DCT.getValue("searchadditionalresources", this.language));
    this.GoCallAPI();
    this.GOCallAPI2();

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
    const versephrasecom = DCT.getValue("bookoutline", this.language);
    const verserangecom = DCT.getValue("bookintro", this.language);
    return (
      <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{}]}>
        <List.Section>
          <List.Accordion
            title={versephrasecom}
            titleStyle={{
              fontFamily: 'NotoSans-Bold',
              fontSize: 16,
              color: "#353535"
            }}
            expanded={this.state.isversephrasecom}
            onPress={() =>
              this.setState({ isversephrasecom: !this.state.isversephrasecom })
            }
            style={{
              backgroundColor: "#F4F5F8",
              borderWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR
            }}
          >
            {this.state.verse_phrase_comment}
          </List.Accordion>
          <List.Accordion
            title={verserangecom}
            titleStyle={{
              fontFamily: 'NotoSans-Bold',
              fontSize: 16,
              color: "#353535"
            }}
            expanded={this.state.isverserangecom}
            onPress={() =>
              this.setState({ isverserangecom: !this.state.isverserangecom })
            }
            style={{
              backgroundColor: "#F4F5F8",
              borderWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR
            }}
          >
            {this.state.verse_range_comment}
          </List.Accordion>
        </List.Section>
      </ScrollView>
    );
  }

  GoCallAPI() {
    var url_verse_phrase =
      "https://sabdapro.com:3002/App/app_comment_resource?limit=300&skip=0&lang_code=" +
      this.language +
      "&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no +
      "&entry_type=outline_book";

    fetch(url_verse_phrase)
      .then(response => response.json())
      .then(responseJson => {
        this.comment_resource = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.comment_resource
        );
        var list_comment_resource = JSON.parse(this.comment_resource);
        if (this._isMounted === true) {
          this.setState(
            {
              list_comment_resource: list_comment_resource
            },
            () => {
              this.GOShowOutlineBookCommentary();
            }
          );
        }
      });
  }

  GOShowOutlineBookCommentary() {
    const { list_comment_resource } = this.state;

    if (list_comment_resource.length > 0) {
      this.data_view = [];
      for (var i = 0; i < list_comment_resource.length; i++) {
        var res_id = list_comment_resource[i].res_id;

        var urlcommentarydetail =
          "https://sabdapro.com:3002/App/app_comment_summary?res_id=" +
          res_id +
          "&lang_code=" +
          this.language +
          "&entry_type=outline_book&type_search=BC&book_id=" +
          this.book_id +
          "&chapter_no=" +
          this.chapter_no +
          "&skip=0&limit=1000";

        const data_view = cloneDeep(this.data_view);
        console.log(urlcommentarydetail);
        fetch(urlcommentarydetail)
          .then(response => response.json())
          .then(responseJson => {
            this.comment_summary = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.comment_summary
            );
            var comment_summary_data = JSON.parse(this.comment_summary);

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

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: "#F4F5F8" }}
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
                      backgroundColor: "#F4F5F8",
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
                      <Text style={{ color: "#353535" }}>
                        {key}{" "}
                        <Text style={{ color: "#105B8E" }}>
                          {comment_summary_data[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          });

        span_id = COMethods.getUniqueId("Outline Chapter" + i);
        versephrasecom_title = "";
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
                color: "#353535"
              }}
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
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
    var url_verse_range_commentary =
      "https://sabdapro.com:3002/App/app_comment_resource?limit=1000&skip=0&lang_code=" +
      this.language +
      "&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no +
      "&entry_type=intro_book";
    fetch(url_verse_range_commentary)
      .then(response => response.json())
      .then(responseJson => {
        this.comment_resource = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.comment_resource
        );
        var list_comment_resource = JSON.parse(this.comment_resource);
        if (this._isMounted === true) {
          this.setState(
            {
              list_comment_resource_verse_range: list_comment_resource
            },
            () => {
              this.GOIntroBookCommentary();
            }
          );
        }
      });
  }
  GOIntroBookCommentary() {
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
          "&entry_type=intro_book&type_search=BC&book_id=" +
          this.book_id +
          "&chapter_no=" +
          this.chapter_no +
          "&skip=0&limit=1000";

        const data_view = cloneDeep(this.data_view);
        fetch(urlcommentarydetail)
          .then(response => response.json())
          .then(responseJson => {
            this.comment_summary = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.comment_summary
            );
            var comment_summary_data = JSON.parse(this.comment_summary);

            for (var z = 0; z < comment_summary_data.length; z++) {
              span_id = COMethods.getUniqueId(z);
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

              data_view.push(
                <View
                  key={span_id + "Beginning"}
                  style={{ backgroundColor: "#F4F5F8" }}
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
                      backgroundColor: "#F4F5F8",
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
                      <Text style={{ color: "#353535" }}>
                        {key}{" "}
                        <Text style={{ color: "#105B8E" }}>
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

        verserangecom_title = "";
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
                color: "#353535"
              }}
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
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
    var url_question_answer =
      "https://sabdapro.com:3002/App/app_comment_resource?limit=300&skip=0&lang_code=" +
      this.language +
      "&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no +
      "&resource_type=question&entry_type=entry";
    fetch(url_question_answer)
      .then(response => response.json())
      .then(responseJson => {
        this.comment_resource = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.comment_resource
        );
        var list_comment_resource = JSON.parse(this.comment_resource);

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
            var comment_summary_data = JSON.parse(this.comment_summary);
            var regexremove = /<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi;

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
                  style={{ backgroundColor: "#F4F5F8" }}
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
                      backgroundColor: "#F4F5F8",
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
                      <Text style={{ color: "#353535" }}>
                        {key}{" "}
                        <Text style={{ color: "#105B8E" }}>
                          {comment_summary_data[z].vref}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          });

        span_id = COMethods.getUniqueId("QA" + i);
        quesans = "";

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
                color: "#353535"
              }}
              style={{
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
            >
              {data_view}
            </List.Accordion>
          </List.Section>
        );
      }
    }
    if (this._isMounted) {
      this.setState({ question_answer_comment: this.question_answer_comment });
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
  header : {
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
    STORE_BIBLE: state.bible
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
export default connect(mapStateToProps, mapDispatchToProps)(BookSummaryCommentaryScreen);
