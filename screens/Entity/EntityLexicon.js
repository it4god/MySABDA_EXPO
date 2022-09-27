import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform
} from "react-native";
import * as COMethods from "../../common/COMethods";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityLexicon extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      strong_numbers: [],
      suggestions: [],
      isLoading: false
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.entity_mention = this.props.navigation.getParam("entity_mention", "");
    this.total_strong = this.props.navigation.getParam("total_strong", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(
      DCT.getValue("lexicon", this.language) + " : " + this.entity_mention
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

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header, {backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.strong_numbers.length > 0) {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}  style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <View style={{ flexDirection: "column" }}>
              {this.strong_numbers}
            </View>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}  style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
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
      DCT.getValue("lexicon", this.language) +
      this.constructor.name +
      "_" +
      this.language +
      " " +
      this.entity_id;

    if (storeCache.dataset[key] != null) {
      this.strong_numbers = storeCache.dataset[key];
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
      var urlEntityLexicon =
        "https://sabdapro.com:3002/App/app_lex_strong?&lang_code=" +
        this.language +
        "&strong_aug=" +
        this.total_strong;
      fetch(urlEntityLexicon)
        .then(response => response.json())
        .then(responseJson => {
          let list_lex_data = responseJson.data.lex_data
          this.strong_numbers = [];

          for (let i = 0; i < list_lex_data.length; i++) {
            let span_id = COMethods.getUniqueId("EntityLexicon");

            this.strong_numbers.push(
              <View
                key={i + "entity lexicon"}
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingTop: 7,
                    paddingRight: 7, backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <TouchableOpacity
                    key={"to " + i}
                    onPress={() => {
                      this.EntityDetailLexicon(
                        list_lex_data[i].strong,
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
                        paddingRight: 5
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
                        paddingRight: 5
                      }}
                      source={require("../../assets/images/record_darkmode.png")}
                    />
                    )}
                    <View style={{ flexDirection: "column", flexWrap: "wrap", backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                      <View style={{ flexDirection: "row" }}>
                        <View>
                          <Text
                            style={{
                              paddingLeft: 10,
                              fontSize: 18,
                              flex: 3,
                              fontFamily: 'NotoSans-Bold',
                              textAlign: "left",color:this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {list_lex_data[i].lemma}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              paddingLeft: 10,
                              paddingTop: 3,
                              textAlign: "left",color:this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            {" "}
                            {list_lex_data[i].lemma_translit}
                          </Text>
                        </View>
                        <Text
                          style={{
                            paddingLeft: 10,
                            paddingTop: 3,
                            color:this.props.STORE_STYLE.TEXT_COLOR_URL,
                            textAlign: "left"
                          }}
                        >
                          {" "}
                          {list_lex_data[i].strong}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }

          this.props.ACT_setCacheData(key, this.strong_numbers);
          if (this._isMounted) {
            this.setState({
              isLoading: true,
              renderID: Math.random()
            });
          }
        });
    }
  }
  EntityDetailLexicon(strongnumber, wordstrong, language) {
    const { navigate } = this.props.navigation;
    navigate("WordStudy", {
      strongnumber: strongnumber,
      wordstrong: wordstrong,
      language: language
    });
  }
  OpenSearchEntity(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random
    });
  }
}
const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingBottom: 50,
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
  fontEntityMention: {
    fontSize: 13,
    fontFamily: 'NotoSans-Bold'
  },
  fontEntityLexicon: {
    fontSize: 11,
    fontWeight: "normal"
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
export default connect(mapStateToProps, mapDispatchToProps)(EntityLexicon);
