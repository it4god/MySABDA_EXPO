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
class EntityBibleDictionary extends Component {
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
      questionanswers: [],
      suggestions: [],
      isLoading: false
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.entity_id = this.props.navigation.getParam("entity_id", "");
    this.entity_mention = this.props.navigation.getParam("entity_mention", "");
    this.total_strong = this.props.navigation.getParam("total_strong", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(
      DCT.getValue("dictionaryabout", this.language) + " " + this.entity_mention
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
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.dictionary.length > 0) {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{borderBottomWidth:1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            {this.dictionary}
          </ScrollView>
        );
      } else {
      }
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>{DCT.getValue("00000002", this.language)}</Text>
        </ScrollView>
      );
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
      DCT.getValue("bibledict", this.language) +
      this.constructor.name +
      "_" +
      this.language +
      " " +
      this.entity_id +
      " " +
      this.total_strong +
      " " +
      this.entity_mention;

    if (storeCache.dataset[key] != null) {
      this.dictionary = storeCache.dataset[key];
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
      var urlEntityinDictionary =
        "https://sabdapro.com:3002/App/app_lex_dictionary?limit=300&skip=0&lang_code=" +
        this.language +
        "&strong_aug=" +
        this.total_strong +
        "&strong_value=" +
        this.entity_mention;
      console.log(urlEntityinDictionary)
      fetch(urlEntityinDictionary)
        .then(response => response.json())
        .then(responseJson => {
          this.list_dict = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_dict
          );
          let list_dict_data = JSON.parse(this.list_dict);
          this.dictionary = [];

          for (let i = 0; i < list_dict_data.length; i++) {
            span_id = COMethods.getUniqueId("EntityBibleDIctionary");

            this.dictionary.push(
              <View
                key={i + "bible dictionary"}
                style={{
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  borderBottomWidth:1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,

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
                      this.EntityDetailBibleDictionary(
                        list_dict_data[i].entry_id,
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
                    <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
                      <Text
                        style={{
                          paddingLeft: 15,
                          fontFamily: 'NotoSans-Bold',  color:this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >{list_dict_data[i].term} {" "}
                        <Text>{list_dict_data[i].res_name}</Text>

                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{height : 60}}></View>
              </View>
            );
          }
          this.props.ACT_setCacheData(key, this.dictionary);
          if (this._isMounted) {
            this.setState({
              isLoading: true,
              renderID: Math.random()
            });
          }
        });
    }
  }
  EntityDetailBibleDictionary(entry_id, language) {
    const { push } = this.props.navigation;
    push("EntityDetailBibleDictionary", {
      entry_id: entry_id,
      language: language,
      key: "Entity Bible Dictionary" + Math.random
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
  fontEntityCategory: {
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityBibleDictionary);
