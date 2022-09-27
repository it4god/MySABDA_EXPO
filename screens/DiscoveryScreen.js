import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator, Platform
} from "react-native";
import * as COMethods from "../common/COMethods";
import * as COBible from "../common/COBible";
import * as DCT from "../dictionary";
import { List } from "react-native-paper";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import TagParser from "../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent,
} from "react-native-dialog-component";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class DiscoveryScreen extends Component {
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
      app_chapter_sum: [],
      app_book_sum: [],
      book_name: "",
      chapter_no: "",
      chapter_keyword: [],
      book_content: [],
      chapter_conclusion: [],
      book_keyword: "",
      christ_seen: "",
      book_write: "",
      date_written: "",
      place_written: "",
      book_statistics: "",
      book_title: "",
      book_date: "",
      book_writer: "",
      book_scope: "",
      book_purpose: "",
      book_theology: "",
      book_message: "",
      book_written_for: "",
      list_book_intro: [],
      list_book_intro_comm: [],
      data_book: [],
      data_book_view: [],
      isLoading: false,
      arr: [],
      arr_key: [],
      ischapter: true,
      isbook: true,
    };
    this.isloading = true;
    this.bibleproject = [];

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
    this.MyParser = new TagParser(this, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
    this.handleChangeTab(DCT.getValue("menu_discovery", this.language));
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
  async GoShowMore() {
    const { list_book_intro } = this.state;
    this.data_book = [];
    this.data_book_intro_commentary_text = "";
    if (list_book_intro.length > 0 && this.isloading) {
      var i = 0;
      this.data_book_view = [];
      let a = this.state.arr.slice();
      let b = this.state.arr_key.slice();
      for (let i = 0; i < list_book_intro.length; i++) {
        var sub_entry_code = list_book_intro[i].subentry_code;
        var regexremove = /(<([^>]+)>)/gi;

        b[i] = list_book_intro[i].key.replace(
          /<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi,
          ""
        );
        b[i] = b[i].replace(regexremove, "");
        if (this._isMounted) {
          this.setState({ arr_key: b });
        }
        var urlcommentary =
          "https://sabdapro.com:3002/App/app_comment_detail?lang_code=" +
          this.language +
          "&subentry_code=" +
          sub_entry_code +
          "&skip=0&limit=300";

        await fetch(urlcommentary)
          .then((response) => response.json())
          .then((responseJson) => {
            var listcommentdata = responseJson.data.list_comment;
            this.data_book_intro_commentary_text = listcommentdata[0].text;
            //creates the clone of the state

            a[i] = this.MyParser.DoParserDiscovery(
              this.data_book_intro_commentary_text, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
            );

            if (this._isMounted) {
              this.setState({ arr: a });
            }
          });
      }

      for (var x = 0; x < list_book_intro.length; x++) {
        let span_id = COMethods.getUniqueId("Book");
        if (x == 0) {
          this.data_book_view.push(
            <List.Accordion
              key={span_id}
              title={this.state.arr_key[x]}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 15,
                  paddingBottom: 15,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                {this.state.arr[x]}
              </View>
            </List.Accordion>
          );
        } else {
          this.data_book_view.push(
            <List.Accordion
              key={span_id}
              title={this.state.arr_key[x]}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderLeftWidth: 1,
                borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderRightWidth: 1,
                borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              }} left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 15,
                  paddingBottom: 15,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                {this.state.arr[x]}
              </View>
            </List.Accordion>
          );
        }
      }
      this.isloading = false;
    }

    if (this._isMounted) {
      this.setState({
        data_book_view: this.data_book_view,
        isLoading: true,
      });
    }
  }

  render() {
    const chaptersummary =
      this.state.book_name +
      " " +
      this.state.chapter_no +
      " " +
      DCT.getValue("summary", this.language);
    const booksummary =
      this.state.book_name + " " + DCT.getValue("introduction", this.language);

    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal, styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={[styles.container,styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,  }]}
        >
          <List.Section>
            <List.Accordion
              title={chaptersummary}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
              expanded={this.state.ischapter}
              onPress={() =>
                this.setState({ ischapter: !this.state.ischapter })
              }
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "row",

                }}
              >
                <Text
                  style={{
                    paddingLeft: 20,
                    paddingTop: 15,
                    fontSize: 25,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.book_name} {this.state.chapter_no}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 15,
                  paddingBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  {this.bibleproject}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <View>
                  <Text
                    style={{
                      paddingTop: 18,
                      fontFamily: "NotoSans-Bold",
                      color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {DCT.getValue("keyword", this.language)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  {this.state.chapter_keyword}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <Text
                  style={{
                    paddingTop: 18,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("content", this.language)}
                </Text>
                {this.state.book_content}
              </View>

              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <Text
                  style={{
                    paddingTop: 18,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("conclusion", this.language)}
                </Text>
                {this.state.chapter_conclusion}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <Text
                  style={{
                    paddingTop: 18,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("interestfact", this.language)}
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                  }}
                >
                  {this.state.fact}
                </View>
              </View>

              <View style={{ height: 20 }}></View>
              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
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
                      this.SearchAdditionalResources(
                        this.book_id,
                        this.chapter_no,
                        "chaptersummary"
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
                    <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                      <Text
                        style={{
                          paddingLeft: 15,
                          fontFamily: "NotoSans-Bold",
                          paddingRight: 15,
                          color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {DCT.getValue(
                          "searchadditionalresources",
                          this.language
                        )}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ height: 20 }}></View>
              </View>
            </List.Accordion>
            <List.Accordion
              title={booksummary}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.isbook}
              onPress={() => this.setState({ isbook: !this.state.isbook })}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,

                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderLeftWidth: 1,
                borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderRightWidth: 1,
                borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.book_name}
                </Text>
                <Text
                  style={{
                    paddingLeft: 12,
                    paddingRight: 10,
                    fontWeight: "normal",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.book_theme}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("keyword", this.language)}
                </Text>
                <Text
                  style={{
                    paddingLeft: 12,
                    paddingRight: 10,
                    fontWeight: "normal",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.book_keyword}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("christassesen", this.language)}
                </Text>
                <Text
                  style={{
                    paddingLeft: 12,
                    paddingRight: 10,
                    fontWeight: "normal",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.christ_seen}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSans-Bold",
                    paddingRight: 10,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("writer", this.language)}
                </Text>
                {this.state.book_writer}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("writedate", this.language)}
                </Text>
                <Text
                  style={{
                    paddingLeft: 12,
                    paddingRight: 10,
                    fontWeight: "normal",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.date_written}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("placewriten", this.language)}
                </Text>
                <Text
                  style={{
                    paddingLeft: 12,
                    paddingRight: 10,
                    fontWeight: "normal",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.place_written}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("writtenfor", this.language)}
                </Text>
                <Text
                  style={{
                    paddingLeft: 12,
                    paddingRight: 10,
                    fontWeight: "normal",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.book_written_for}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Text
                  style={{
                    fontFamily: "NotoSans-Bold",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {DCT.getValue("stats", this.language)}
                </Text>
                <Text
                  style={{
                    paddingLeft: 12,
                    paddingRight: 10,
                    fontWeight: "normal",
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                >
                  {this.state.book_statistics}
                </Text>
              </View>
              <View style={{ height: 20 }}></View>
              <List.Section>{this.state.data_book_view}</List.Section>
              {true === false && (
                <View
                  key={"addresources2"}
                  style={{
                    flexDirection: "row",
                    borderWidth: 1,
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
                        this.SearchAdditionalResources(
                          this.book_id,
                          this.chapter_no,
                          "booksummary"
                        );
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
                      <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15,
                            color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {DCT.getValue(
                            "searchadditionalresources",
                            this.language
                          )}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
            </List.Accordion>
          </List.Section>
        </ScrollView>
      );
    }
  }
  GoCallAPI() {
    console.log(this.book_id);
    this.start_i =
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.book_id, 10)).start +
        parseInt(this.chapter_no, 10)
      ).start + 1;
    let bibleprojecturl =
      "https://sabdapro.com:3002/app/app_audio_video?lang_code=eng&limit=100&author=BibleProject&list_vid=" +
      this.start_i.toString();
    console.log(bibleprojecturl);
    fetch(bibleprojecturl)
      .then((response) => response.json())
      .then((responseJson) => {
        var list_av = responseJson.data.list_av
        if (list_av.length > 0) {
          this.bibleproject.push(
            <TouchableOpacity
              key={"bible project"}
              onPress={() => {
                const { push } = this.props.navigation;
                push("DetailYoutube", {
                  title: list_av[0].title,
                  description: list_av[0].description,
                  url: list_av[0].url,
                  thumb: list_av[0].thumbnail_url,
                  author: list_av[0].author,
                  language: this.language,
                  key: "Detail Audio" + Math.random,
                });
              }}
            >
              <Image
                style={{ width: 280, height: 140, paddingRight: 1 }}
                source={{ uri: list_av[0].thumbnail_url }}
              />
            </TouchableOpacity>
          );
        }
      });

    var urlchaptersum =
      "https://sabdapro.com:3002/App/app_chapter_sum?limit=50&lang_code=" +
      this.language +
      "&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no;
    console.log(urlchaptersum);
    fetch(urlchaptersum)
      .then((response) => response.json())
      .then((responseJson) => {

        var list_chapter_summary = responseJson.data.list_chapter_sum

        console.log(list_chapter_summary[0].fact);
        let facttext = [];
        let chapterkeyword = [];
        let conclusiontext = [];
        let contenttext = [];
        if (list_chapter_summary[0].fact !== null)
          facttext = this.MyParser.DoParserDiscovery(
            list_chapter_summary[0].fact, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
          );
        if (list_chapter_summary[0].keyword !== null)
          chapterkeyword = this.MyParser.DoParserDiscovery(
            list_chapter_summary[0].keyword, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
          );
        if (list_chapter_summary[0].conclusion !== null)
          conclusiontext = this.MyParser.DoParserDiscovery(
            list_chapter_summary[0].conclusion, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
          );
        if (list_chapter_summary[0].content !== null)
          contenttext = this.MyParser.DoParserDiscovery(
            list_chapter_summary[0].content, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
          );
        if (this._isMounted) {
          this.setState(
            {
              book_name: list_chapter_summary[0].book_name,
              chapter_no: list_chapter_summary[0].chapter_no,
              chapter_keyword: chapterkeyword,
              book_content: contenttext,
              fact: facttext,
              chapter_conclusion: conclusiontext,
            },
            () => { }
          );
        }
      });

    var urlbooksum =
      "https://sabdapro.com:3002/App/app_book_sum?limit=300&lang_code=" +
      this.language +
      "&type_search=BC&book_id=" +
      this.book_id;

    fetch(urlbooksum)
      .then((response) => response.json())
      .then((responseJson) => {

        var list_book_summary =responseJson.data.book_sum;
        var list_book_intro = responseJson.data.book_intro
        if (this._isMounted) {
          this.setState(
            {
              book_theme: list_book_summary[0].theme,
              place_written: list_book_summary[0].place_written,
              book_statistics: list_book_summary[0].stats,
              book_written_for: list_book_summary[0].written_for,
              date_written: list_book_summary[0].date_written,
              book_writer: this.MyParser.DoParserDiscovery(
                list_book_summary[0].writer, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
              ),
              christ_seen: list_book_summary[0].christ_in_scripture,
              book_keyword: list_book_summary[0].keyword,
              list_book_intro: list_book_intro,
            },
            () => {
              this.GoShowMore();
            }
          );
        }
      });
  }
  ShowDialogVerse(text, verse) {
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <ScrollView>
              <View style={{ flexDirection: "row-reverse" }}>
                <TouchableOpacity
                  onPress={() => {
                    DialogManager.dismissAll(() => { });
                  }}
                >
                  {/*Donute Button Image */}

                  <View style={{ alignItems: "center", justifyContent: "center", height: 50, width: 100 }}>
                    <Image
                      source={require("../assets/images/cross.png")}
                      style={{ width: 15, height: 15, marginLeft: 8 }}
                    />
                  </View>

                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "#353535",
                  fontSize: 25,
                  textAlign: "center",
                }}
              >
                {verse}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 150,
                  justifyContent: "flex-end",
                }}
              >
                {text}
              </View>
            </ScrollView>
          </DialogContent>
        ),
      },
      () => { }
    );
  }
  SearchAdditionalResources(book_id, chapter_no, summary) {
    const { navigate } = this.props.navigation;
    if (summary === "chaptersummary") {
      navigate("ChapterSummaryCommentary", {
        book_id: this.book_id,
        chapter_no: this.chapter_no,
        language: this.language,
      });
    } else if (summary === "booksummary") {
      navigate("BookSummaryCommentary", {
        book_id: this.book_id,
        chapter_no: this.chapter_no,
        language: this.language,
      });
    }
  }
  ClickReaction(value, props) {
    var str = value.replace(/seterip/g, "-");
    var array = str.split("|");
    var classnumber = array[0];
    var ver_code = "esv";
    if (props.lang_code == "eng") ver_code = "esv";
    else ver_code = "tb";
    if (classnumber === "clsVref") {
      DialogManager.dismissAll(() => { });
      props.props.navigation.navigate("VerseScreen", {
        value: value,
      });
      /*
      var vid = array[1];
      var verse = array[2];
      let array_vid = [];
      if (vid.indexOf(",") > 0) {
        array_vid = vid.split(",");
      }
      if (array_vid.length === 0) {
        let urlvref =
          "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
          vid +
          "&ver_code=" + ver_code;
        console.log(urlvref);
        fetch(urlvref)
          .then(response => response.json())
          .then(responseJson => {
            this.vrefdata = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_verse
            );
            let myvrefdata = JSON.parse(this.vrefdata);
            let text = "";
            let texttemp = "";
            for (let i = 0; i < myvrefdata.length; i++)
              {
                texttemp = myvrefdata[i].text;
                texttemp = texttemp.replace(/<para>/g,"");
                texttemp = texttemp.replace(/<\/para>/g,"");
                text += texttemp
              }

            let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
            this.rendertext = props.MyParser.DoParserBibleFullVersion(text,true,false,true,false, props.props.STORE_BIBLE.FONT_SIZE, props.version_code, true);
            props.ShowDialogVerse(this.rendertext, verse);
          });
      } else {
        this.rendertext = [];

        for (let x = 0; x < array_vid.length; x++) {
          this.versevref = " ";
          let urlvref =
            "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
            array_vid[x] +
            "&ver_code=" + ver_code;
          console.log(urlvref);
          fetch(urlvref)
            .then(response => response.json())
            .then(responseJson => {
              this.vrefdata = JSON.stringify(
                JSON.parse(JSON.stringify(responseJson)).data.list_verse
              );
              let myvrefdata = JSON.parse(this.vrefdata);
              let text = "";
              let texttemp = "";
              for (let i = 0; i < myvrefdata.length; i++)
              {
                texttemp = myvrefdata[i].text;
                texttemp = texttemp.replace(/<para>/g,"");
                texttemp = texttemp.replace(/<\/para>/g,"");
                text += texttemp
              }
           

              

              let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
              this.rendertext.push(
                <View key={array_vid[x] + " title"} style={{ height: 40 }}>
                  <Text
                    style={{
                      color: "#353535",
                      fontSize: 25,
                      textAlign: "center"
                    }}
                  >
                    {verse}
                  </Text>
                </View>
              );
              this.rendertext.push(props.MyParser.DoParserBibleFullVersion(text,true,false,true,false, props.props.STORE_BIBLE.FONT_SIZE, props.version_code, true));
              this.rendertext.push(
                <View key={array_vid[x]} style={{ height: 20 }}></View>
              );
         
            });
        }

        setTimeout(() => {
          props.ShowDialogVerse(this.rendertext, " ");
        }, 600);
      }*/
    }
    if (classnumber === "clsCmt") {
      var strongnumber = array[1];
      strongnumber = strongnumber.replace("entry_code##", "");

      var urlcmtnumber =
        "https://sabdapro.com:3002/App/app_comment_detail?lang_code=" +
        props.language +
        "&entry_code=" +
        strongnumber;
      let text = "";
      console.log(urlcmtnumber);
      fetch(urlcmtnumber)
        .then((response) => response.json())
        .then((responseJson) => {
          var commentdata =responseJson.data.list_comment
          let text = commentdata[0].text;
          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");

          this.rendertext = props.MyParser.DoParserDiscovery(text, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
          props.GoShowCMT(this.rendertext);
        });
    }
  }

  GoShowCMT(value) {
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <View
              style={{
                flexDirection: "column",
                paddingTop: 20,
                paddingBottom: 150,
                justifyContent: "flex-end",
              }}
            >
              {value}
            </View>
            <View style={{ height: 10 }}></View>
          </DialogContent>
        ),
      },
      () => { }
    );
  }
}
const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingBottom: 150,
  },
  contentContainer: {
    paddingBottom: 150,
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
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryScreen);
