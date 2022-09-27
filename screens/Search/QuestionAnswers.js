import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  Platform
} from "react-native";

import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import TagParser from "../../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class QuestionAnswers extends Component {
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
      serverData: [],
      fetching_from_server: false
    };
    this.timer = -1;
    this.page = 0;
    this.skip = 0;
    this.questionanswers1 = 0;
    this.ok = false;
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.keyword = this.props.navigation.getParam("keyword", "");
    this.isfuzzy = this.props.navigation.getParam("fuzzy", "N");
    this.isindefinition = this.props.navigation.getParam("indefinition", "N");
    this.version_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.version_code === "tb" ||
      this.version_code === "ayt" ||
      this.version_code === "avb"
    )
      this.lang_code = "ind";
    else this.lang_code = "eng";
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.limit = this.props.STORE_BIBLE.SEARCH_LIMIT;

    this.handleChangeTab(DCT.getValue("quesans", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.GoCallAPI();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.questionanswers1 > 0 || this.ok) {
        return (
          <View contentContainerStyle={styles.contentContainer} style={[styles.header, {   backgroundColor:   this.props.STORE_STYLE.BACKGROUND_COLOR,      borderBottomWidth:1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,}]}  >
            <FlatList
              style={{ width: "100%" }}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.serverData}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "row",
                    flexDirection: "column",
                    paddingVertical: 5,
                    paddingLeft: 15,
                    paddingRight: 15,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                    borderBottomWidth:1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingRight: 15
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.EntityDetailinQuestionAnswers(
                          item.subentry_code,
                          item.vref,
                          item._highlight["key.lang_clean"][0],
                          this.language
                        );
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
                            source={require("../../assets/images/record.png")}
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
                            source={require("../../assets/images/record_darkmode.png")}
                          />
                          )}
                      <View
                        style={{
                          flexDirection: "column",
                          flexWrap: "wrap",
                          paddingLeft: 15,
                          paddingRight: 15,
                          color: this.props.STORE_STYLE.TEXT_COLOR,
                        }}
                      >
                        {this.MyParser.DoParserDiscovery(
                          item._highlight["key.lang_clean"][0]
                            .replace(/<eshigh>/g, "")
                            .replace(/<\/eshigh>/g, ""), this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={this.renderFooter.bind(this)}
            />
          </View>
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>{DCT.getValue("00000002", this.language)}</Text>
          </ScrollView>
        );
      }
    }
  }
  renderFooter() {
    if (this.questionanswers1 > 20) {
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
    this.page = 25;
    this.skip = this.skip + this.page;
    this.setState({ fetching_from_server: true }, () => {
      clearTimeout(this.timer);
      this.timer = -1;
      this.timer = setTimeout(() => {
        var urlQA =
          "https://sabdapro.com:3002/App/app_search_data?limit=" +
          this.page +
          "&skip=" +
          this.skip +
          "&fragment_size=410&type=CQ&search_in_desc=" +
          this.isindefinition +
          "&search_fuzzy=" +
          this.isfuzzy +
          "&lang_code=" +
          this.language +
          "&keyword=" +
          this.keyword;

        fetch(urlQA)
          .then(response => response.json())
          .then(responseJson => {
            let list_search_data = responseJson.data.list_search
            this.questionanswers1 = list_search_data.length;
            this.setState({
              serverData: [...this.state.serverData, ...list_search_data],
              fetching_from_server: false
            });
          });
      }, 1500);
    });
  };
  GoCallAPI() {
    this.page = 25;
    var urlQA =
      "https://sabdapro.com:3002/App/app_search_data?limit=" +
      this.page +
      "&skip=0&fragment_size=410&type=CQ&search_in_desc=" +
      this.isindefinition +
      "&search_fuzzy=" +
      this.isfuzzy +
      "&lang_code=" +
      this.language +
      "&keyword=" +
      this.keyword;

    fetch(urlQA)
      .then(response => response.json())
      .then(responseJson => {
        let list_search_data =responseJson.data.list_search

        this.questionanswers1 = list_search_data.length;
        if (this.questionanswers1 > 0) this.ok = true;
        this.setState({
          serverData: [...this.state.serverData, ...list_search_data],

          isLoading: true
        });
      });
  }

  EntityDetailinQuestionAnswers(entry_code, vref, key, language) {
    const { navigate } = this.props.navigation;
    navigate("EntityinDetailQuestionsAnswers", {
      entry_code: entry_code,
      vref: vref,
      key: key,
      language: language
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
                  <Image
                    source={require("../../assets/images/cross.png")}
                    style={{ width: 15, height: 15, marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "#353535",
                  fontSize: 25,
                  textAlign: "center"
                }}
              >
                {verse}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 150,
                  justifyContent: "flex-end"
                }}
              >
                {text}
              </View>
            </ScrollView>
          </DialogContent>
        )
      },
      () => { }
    );
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
        value: value
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
            }
            */
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

      fetch(urlcmtnumber)
        .then(response => response.json())
        .then(responseJson => {
          this.listcommentdata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_comment
          );
          var commentdata = JSON.parse(this.listcommentdata);
          let text = commentdata[0].text;
          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");

          this.rendertext = props.MyParser.DoParserDiscovery(text);
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
            <ScrollView>
              <View
                style={{
                  flexDirection: "column",
                  paddingBottom: 10,
                  justifyContent: "center"
                }}
              >
                {value}
              </View>
            </ScrollView>
          </DialogContent>
        )
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
    paddingVertical: 20,
    paddingBottom: 150,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingBottom: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  submitButtonText: {
    textAlign: "justify",
    color: "white",
    flex: 1
  },
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  containerBottom: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  containerBottomItem: {
    flex: 9,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start"
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    flex: 4
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    textAlign: "justify",
    color: "white",
    flex: 1
  },
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  item: {
    padding: 10
  },
  separator: {
    height: 1,
   
  },
  text: {
    fontSize: 20,
    color: "#353535"
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswers);
