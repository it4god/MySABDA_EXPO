import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform
} from "react-native";
import * as DCT from "../../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import TagParser from "../../common/TagParser";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityinDictionary extends Component {
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
    this.dictionary = 0;
    this.ok = 0;
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.keyword = this.props.navigation.getParam("keyword", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.isfuzzy = this.props.navigation.getParam("fuzzy", "N");
    this.isindefinition = this.props.navigation.getParam("indefinition", "N");
    this.handleChangeTab(
      DCT.getValue("dictionaryabout", this.language) + " " + this.keyword
    );
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 2;
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
      if (this.dictionary > 0 || this.ok) {
        return (
          <View contentContainerStyle={styles.contentContainer} style={[styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <FlatList
              style={{ width: "100%" }}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.serverData}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                    flexDirection: "column",
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    flexDirection: "column",
                    borderBottomWidth:1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.EntityinDetailDictionary(
                        item.entry_code,
                        item.res_name,
                        this.language,
                        this.keyword
                      );
                    }}
                  >
                    {this.MyParser.DoParserDiscovery(
                      item._highlight["term.lang_clean"][0], this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                    )}

                    <Text
                      style={{
                        fontSize: this.fsizeminusone,
                        flex: 2,
                        color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                        fontWeight: "normal"
                      }}
                    >
                      {item.res_name}
                    </Text>

                    <Text
                      style={{
                        flex: 1,
                        fontWeight: "normal"
                        ,  color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {item.text.replace(/(<([^>]+)>)/gi, "").substring(0, 80)}{" "}
                      {"..."}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={this.renderFooter.bind(this)}
            />
          </View>
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}}>
            <Text style={{color:this.props.STORE_BIBLE.TEXT_COLOR}}>{DCT.getValue("00000002", this.language)}</Text>
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

  renderFooter() {
    if (this.dictionary > 20) {
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
        let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
        var urlEntityinDictionary =
          "https://sabdapro.com:3002/App/app_search_data?limit=" +
          this.page +
          "&skip=" +
          this.skip +
          "&fragment_size=410&type=D&search_in_desc=" +
          this.isindefinition +
          "&search_fuzzy=" +
          this.isfuzzy +
          "&lang_code=" +
          this.language +
          "&ver_code=" +
          ver_code +
          "&keyword=" +
          this.keyword;

        fetch(urlEntityinDictionary)
          .then(response => response.json())
          .then(responseJson => {
            this.list_search = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_search
            );
            let list_search_data = JSON.parse(this.list_search);
            this.dictionary = list_search_data.length;
            if (this._isMounted) {
              this.setState({
                serverData: [...this.state.serverData, ...list_search_data],
                fetching_from_server: false
              });
            }
          });
      }, 1500);
    });
  };
  GoCallAPI() {
    this.page = 25;
    let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    var urlEntityinDictionary =
      "https://sabdapro.com:3002/App/app_search_data?limit=" +
      this.page +
      "&skip=0&fragment_size=410&type=D&search_in_desc=" +
      this.isindefinition +
      "&search_fuzzy=" +
      this.isfuzzy +
      "&lang_code=" +
      this.language +
      "&ver_code=" +
      ver_code +
      "&keyword=" +
      this.keyword;
    console.log(urlEntityinDictionary)
    fetch(urlEntityinDictionary)
      .then(response => response.json())
      .then(responseJson => {
        this.list_search = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_search
        );
        let list_search_data = JSON.parse(this.list_search);
        this.dictionary = list_search_data.length;
        if (this.dictionary > 0) this.ok = true;
        if (this._isMounted) {
          this.setState({
            serverData: [...this.state.serverData, ...list_search_data],

            isLoading: true
          });
        }
      });
  }
  EntityinDetailDictionary(entry_code, res_name, language, keyword) {
    const { push } = this.props.navigation;
    push("EntityinDetailDictionary", {
      entry_code: entry_code,
      res_name: res_name,
      language: language,
      keyword: keyword
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
export default connect(mapStateToProps, mapDispatchToProps)(EntityinDictionary);
