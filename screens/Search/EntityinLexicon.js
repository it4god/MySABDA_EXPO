import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  I18nManager,
  ActivityIndicator,
  Image,
  Platform
} from "react-native";
import * as COMethods from "../../common/COMethods";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import TagParser from "../../common/TagParser";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityinLexicon extends Component {
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
      questionanswers: [],
      isLoading: false
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    I18nManager.forceRTL(false);
    this.MyParser = new TagParser(this);
    this.keyword = this.props.navigation.getParam("keyword", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.isfuzzy = this.props.navigation.getParam("fuzzy", "N");
    this.isindefinition = this.props.navigation.getParam("indefinition", "N");
    this.handleChangeTab(
      DCT.getValue("lexiconabout", this.language) + " " + this.keyword
    );
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.limit = this.props.STORE_BIBLE.SEARCH_LIMIT;
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
      if (this.lexicon.length > 0) {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            {this.lexicon}
          </ScrollView>
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
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  GoCallAPI() {
    let storeBible = this.props.STORE_BIBLE;
    let storeCache = storeBible.CACHE_DATA;

    let key =
      DCT.getValue("lexiconabout", this.language) +
      this.constructor.name +
      "_" +
      this.language +
      " " +
      this.keyword;

    if (storeCache.dataset[key] != null) {
      this.questionanswers1 = storeCache.dataset[key];
      if (this._isMounted) {
        this.setState(
          {
            isLoading: true,
            renderID: Math.random()
          },
          () => { }
        );
      }
      return;
    }
    {
      let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
      var urlEntityinLexicon =
        "https://sabdapro.com:3002/App/app_search_data?limit=" +
        this.limit +
        "&skip=0&fragment_size=410&type=L&search_in_desc=" +
        this.isindefinition +
        "&search_fuzzy=" +
        this.isfuzzy +
        "&lang_code=" +
        this.language +
        "&ver_code=" +
        ver_code +
        "&keyword=" +
        this.keyword;
      fetch(urlEntityinLexicon)
        .then(response => response.json())
        .then(responseJson => {
          let list_search_data =responseJson.data.list_search
          this.lexicon = [];

          for (let i = 0; i < list_search_data.length; i++) {
            let textdesc = "";
            if (list_search_data[i]._index === "lexstrong") {
              textdesc = this.MyParser.DoParserDiscovery(
                list_search_data[i].short_def, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
              );
            } else if (list_search_data[i]._index === "lexdef") {
              textdesc = this.MyParser.DoParserDiscovery(
                list_search_data[i].definition, this.props.STORE_BIBLE.IS_SHOW_DARKMODE
              );
            }
            let span_id = COMethods.getUniqueId("EntityinLexicon");

            this.lexicon.push(
              <View
                key={i + "lexicon"}
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                  paddingBottom: 15
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column"
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.EntityinDetailLexicon(
                          list_search_data[i].strong,
                          this.keyword,
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
                          flexDirection: "row",
                          paddingLeft: 15,
                          paddingRight: 25
                        }}
                      >
                        <View>
                          <Text style={{ textAlign: "left", color:this.props.STORE_STYLE.TEXT_COLOR }}>
                            {" "}
                            {list_search_data[i].lemma_translit}
                          </Text>
                        </View>
                        <View>
                          <Text style={{  color:this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                            {" "}
                            {list_search_data[i].strong}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                    {textdesc}
                  </View>
                </View>
              </View>
            );
          }
          this.props.ACT_setCacheData(key, this.questionanswers1);
          if (this._isMounted) {
            this.setState({
              isLoading: true,
              renderID: Math.random()
            });
          }
        });
    }
  }
  EntityinDetailLexicon(strongnumber, wordstrong, language) {
    const { navigate } = this.props.navigation;
    navigate("WordStudy", {
      strongnumber: strongnumber,
      wordstrong: wordstrong,
      language: language
    });
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
export default connect(mapStateToProps, mapDispatchToProps)(EntityinLexicon);
