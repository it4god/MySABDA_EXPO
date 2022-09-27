import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
 FlatList
} from "react-native";
import TagParser from "../../common/TagParser";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import PopToTopScreen from "../Home/PopToTop";
import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class VerseOccurence extends Component {
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
      serverData: [],
      fetching_from_server: false,
      arr: [],
      arr_data: [],
      myversedata: [],
      expanded: false,
    };
    this.verseoccurence = 0;
    this.page = 0;
    this.skip = 0;
    this.ok = false;
    this.verseoccurence = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.strong_aug = this.props.navigation.getParam("strong_aug", "");
    this.lemma = this.props.navigation.getParam("lemma", "");
    this.lemma_translit = this.props.navigation.getParam("lemma_translit", "");
    this.fsize = Number(this.props.STORE_BIBLE.FONT_SIZE) + 1;
    this.original_language = "";
    this.handleChangeTab(DCT.getValue("verse_ocurrence", this.language));
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
        <ScrollView style={[styles.containerActivityIndicator, styles.horizontal,styles.header, {backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </ScrollView>
      );
    } else {
      const { navigate } = this.props.navigation;
      return (
        <ScrollView style={[styles.header,{  backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,  }]}>
           <View style={[styles.container,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}]}>
            <View>
              <Text
                style={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: this.fsize,
                  textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.lemma}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingRight: 20,
              }}
            >
              <Text
                style={{
                  fontWeight: "normal",
                  paddingLeft: 15,
                  paddingRight: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {"("}
                {this.lemma_translit}
                {" - "}
                {this.strong_aug}
                {")"}
                {" appears in: "}{" "}
              </Text>
            </View>
          </View>

          <FlatList
            style={{ width: "100%" }}
            keyExtractor={(item, index) => index.toString()}
            data={this.state.serverData}
            renderItem={({ item, index }) => (
              <List.Section>
                <List.Accordion
                  key={index}
                  title={
                    item.book_name + " " + item.chapter_no + ":" + item.verse_no
                  }
                  titleStyle={{
                    fontFamily: "NotoSans-Bold",
                    fontSize: 16,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                  style={{
                    backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,

                    borderBottomWidth: 1,
                    
                    borderLeftWidth: 1,
                    borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderRightWidth: 1,
                    borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  onPress={() => {

                    this.VerseOccur(index);
                  }}
                >
                  <View
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 20,
                      paddingBottom: 20,
                      borderBottomWidth: 1,
                      
                    }}
                  >
                    {this.state.arr_data[index]}
                  </View>
                </List.Accordion>
              </List.Section>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
                   <View style={{height : 100}}></View>
        </ScrollView>
      );
    }
  }
  renderFooter() {
    console.log("this verse occurence : " + this.verseoccurence)
    if (this.verseoccurence >= 20) {
      return (
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.loadMoreData}
            style={styles.loadMoreBtn}
          >
            <Text style={styles.btnText}>Load More</Text>
            {this.state.fetching_from_server ? (
              <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  loadMoreData = () => {
    this.page = 20;
    this.skip = this.skip + this.page;
    this.setState({ fetching_from_server: true }, () => {
      clearTimeout(this.timer);
      this.timer = -1;
      this.timer = setTimeout(() => {
        let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
        var urlverseocurence =
          "https://sabdapro.com:3002/App/app_lex_verse?limit=" +
          this.page +
          "&skip=" + this.skip + "&lang_code=" +
          this.language +
          "&ver_code=" + ver_code + "&strong_aug=" +
          this.strong_aug;
        fetch(urlverseocurence)
          .then((response) => response.json())
          .then((responseJson) => {
            let a = this.state.arr.slice();
           let myversedata = responseJson.data.list_lex_verse
            this.total_verse_data = myversedata.length;
            this.verseoccurence = myversedata.length;
            for (let i = 0; i < this.total_verse_data; i++) {
              a[i] =
                "https://sabdapro.com:3002/App/app_lex_verse_detail?verse_id=" +
                myversedata[i].verse_id +
                "&lang_code=" +
                this.language +
                "&strong_aug=" +
                this.strong_aug +
                "&skip=0&limit=1000";
            }

            if (this._isMounted === true) {
              this.setState(
                {
                  serverData: [...this.state.serverData, ...myversedata],
                  arr: [...this.state.arr, ...a],
                  fetching_from_server: false
                }
              );
            }
          });
      }, 1500);
    });
  };
  GoCallAPI() {
    let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    this.page = 20;



    var urlverseocurence =
      "https://sabdapro.com:3002/App/app_lex_verse?limit=" +
      this.page +
      "&skip=0&lang_code=" +
      this.language +
      "&ver_code=" + ver_code + "&strong_aug=" +
      this.strong_aug;
    console.log(urlverseocurence);
    fetch(urlverseocurence)
      .then((response) => response.json())
      .then((responseJson) => {
        let a = this.state.arr.slice();
        let myversedata = responseJson.data.list_lex_verse
            this.total_verse_data = myversedata.length;
            this.verseoccurence = myversedata.length;
        for (let i = 0; i < this.total_verse_data; i++) {
          a[i] =
            "https://sabdapro.com:3002/App/app_lex_verse_detail?verse_id=" +
            myversedata[i].verse_id +
            "&lang_code=" +
            this.language +
            "&strong_aug=" +
            this.strong_aug +
            "&skip=0&limit=1000";
        }

        if (this._isMounted === true) {
          this.setState(
            {
              serverData: [...this.state.serverData, ...myversedata],
              arr: [...this.state.arr, ...a],

              isLoading: true
            },

            () => {

            }
          );

        }
      });
  }

  GoCallAPI2() {

    const { serverData } = this.state;
    for (let i = 0; i < serverData.length; i++) {
      let titleverse =
        serverData[i].book_name +
        " " +
        serverData[i].chapter_no +
        ":" +
        serverData[i].verse_no;

      if (i == 0) {
        this.verseoccurence.push(
          <List.Accordion
            key={i}
            title={titleverse}
            titleStyle={{
              fontFamily: "NotoSans-Bold",
              fontSize: 16,
              color: this.props.STORE_STYLE.TEXT_COLOR,
            }}
            style={{
              backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,
              borderBottomWidth: 1,
              
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onPress={() => {
              console.log(i);
              this.VerseOccur(i);
            }}
          >
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 1,
                
              }}
            >
              {this.state.arr_data[i]}
            </View>
          </List.Accordion>
        );
      } else {
        this.verseoccurence.push();
      }
    }

    this.setState(
      {
        isLoading: true,
      },

      () => { }
    );
  }
  GoCallAPI2(value, expanded) {
    this.verseoccurence = [];
    const { myversedata } = this.state;
    for (let i = 0; i < myversedata.length; i++) {
      let titleverse =
        myversedata[i].book_name +
        " " +
        myversedata[i].chapter_no +
        ":" +
        myversedata[i].verse_no;

      if (i === value) {
        this.verseoccurence.push(
          <List.Accordion
            key={i}
            title={titleverse}
            titleStyle={{
              fontFamily: "NotoSans-Bold",
              fontSize: 16,
     
            }}
            style={{
              backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,

              borderBottomWidth: 1,
              
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onPress={() => {
              console.log(i);
              if (i !== value && this.state.expanded === false)
                this.setState(
                  {
                    expanded: true,
                  },

                  () => { }
                );
              this.VerseOccur(i);
            }}
            expanded={this.state.expanded}
          >
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 1,
                
              }}
            >
              {this.state.arr_data[i]}
            </View>
          </List.Accordion>
        );
      } else {
        this.verseoccurence.push(
          <List.Accordion
            key={i}
            title={titleverse}
            titleStyle={{
              fontFamily: "NotoSans-Bold",
              fontSize: 16,
              color: this.props.STORE_STYLE.TEXT_COLOR,
            }}
            style={{
              backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,

              borderBottomWidth: 1,
              
              borderLeftWidth: 1,
              borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
              borderRightWidth: 1,
              borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onPress={() => {
              console.log(i);
              if (i !== value && this.state.expanded === false)
                this.setState(
                  {
                    expanded: true,
                  },

                  () => { }
                );
              this.VerseOccur(i);
            }}
            expanded={false}
          >
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                paddingBottom: 20,
                borderBottomWidth: 1,
                
              }}
            >
              {this.state.arr_data[i]}
            </View>
          </List.Accordion>
        );
      }
    }

    this.setState(
      {
        isLoading: true,
        expanded: !this.state.expanded,
      },

      () => { }
    );
  }
  VerseOccur(value) {

    console.log("verse occur " + value + " " + this.state.arr[value]);
    fetch(this.state.arr[value])
      .then((response) => response.json())
      .then((responseJson) => {

       let  myversetoken = responseJson.data.lex_verse_token
        this.arraycontent = [];
        let myversetext = responseJson.data.lex_verse_text

        var regexremove = /(<([^>]+)>)/gi;

        for (let j = 0; j < myversetext.length; j++) {
          var mytext = myversetext[j].text.replace(regexremove, "");
          this.contenttext = this.MyParser.DoParserWord(mytext, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
          this.arraycontent.push(
            <View
              key={j + Math.random}
              style={{
                flexDirection: "column",
              }}
            >
              <Text style={{               color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
                {myversetext[j].ver_name}
              </Text>
              <View>{this.contenttext}</View>
            </View>
          );
          

        }
        let arr_counter = this.state.arr_data.slice();

        for (let i = 0; i < this.state.serverData.length; i++) {
          if(i===value)
          arr_counter[i] = this.arraycontent;
        }

        this.setState(
          {
            arr_data: arr_counter,
          },

          () => {
            //this.GoCallAPI2(value);
          }
        );
      });
  }
}

const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    
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
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center"
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
    ACT_setFontSize: (set_font_size) =>
      dispatch(BibleAction.setFontSize(set_font_size)),
    ACT_setBibleVersion: (set_bible_version) =>
      dispatch(BibleAction.setBibleVersion(set_bible_version)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerseOccurence);
