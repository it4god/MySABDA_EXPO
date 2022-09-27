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
class EntityinCommentary extends Component {
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
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.keyword = this.props.navigation.getParam("keyword", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;

    this.isfuzzy = this.props.navigation.getParam("fuzzy", "N");
    this.isindefinition = this.props.navigation.getParam("indefinition", "N");
    this.handleChangeTab(
      DCT.getValue("commentaryabout", this.language) + " " + this.keyword
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
      if (this.commentary > 0) {
        return (
          <View contentContainerStyle={styles.contentContainer}   style={[styles.header,{backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <FlatList
              style={{ width: "100%" }}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.serverData}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                    flexDirection: "column",
                    paddingVertical: 12,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderBottomWidth:1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  }}
                >
                  <TouchableOpacity
                    key={"to "}
                    onPress={() => {
                      this.EntityinDetailCommentary(
                        item.subentry_code,
                        item.vref,
                        item._highlight["key.lang_clean"][0],
                        item.key,
                        item.res_name,
                        this.language
                      );
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        flex: 1,
                        paddingRight: 10
                      }}
                    >
                      <View style={{}}>{this.MyParser.DoParserDiscovery(item._highlight["key.lang_clean"][0], this.props.STORE_BIBLE.IS_SHOW_DARKMODE)}</View>
                      <Text style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>
                        {" on "}
                        {item.vref}
                      </Text>
                    </View>
                    <Text
                      style={{
                        flex: 2,
                        color:this.props.STORE_STYLE.TEXT_COLOR_URL,
                        fontWeight: "normal",
                        fontSize: this.fsizeminusone
                      }}
                    >
                      {item.res_name}
                    </Text>

                    <Text  style={{color:this.props.STORE_STYLE.TEXT_COLOR}}>
                      {item.text.replace(/(<([^>]+)>)/gi, "")} {"..."}
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

  renderFooter() {
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
  }
  loadMoreData = () => {
    this.page = 25;
    this.skip = this.skip + this.page;
    this.setState({ fetching_from_server: true }, () => {
      clearTimeout(this.timer);
      this.timer = -1;
      this.timer = setTimeout(() => {
        this.page = 25;
        let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
        var urlEntityinCommentary =
          "https://sabdapro.com:3002/App/app_search_data?limit=" +
          this.page +
          "&skip=" +
          this.skip +
          "&fragment_size=410&type=C&search_in_desc=" +
          this.isindefinition +
          "&search_fuzzy=" +
          this.isfuzzy +
          "&lang_code=" +
          this.language +
          "&ver_code=" +
          ver_code +
          "&keyword=" +
          this.keyword;

        fetch(urlEntityinCommentary)
          .then(response => response.json())
          .then(responseJson => {
            this.list_search = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_search
            );
            let list_search_data = JSON.parse(this.list_search);

            this.setState({
              serverData: [...this.state.serverData, ...list_search_data],
              fetching_from_server: false
            });

          })
          .catch(error => {
            console.error(error);
          });
      }, 1500);
    });
  };

  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  GoCallAPI() {
    this.page = 25;
    let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    var urlEntityinCommentary =
      "https://sabdapro.com:3002/App/app_search_data?limit=" +
      this.page +
      "&skip=0&fragment_size=410&type=C&search_in_desc=" +
      this.isindefinition +
      "&search_fuzzy=" +
      this.isfuzzy +
      "&lang_code=" +
      this.language +
      "&ver_code=" +
      ver_code +
      "&keyword=" +
      this.keyword;

    fetch(urlEntityinCommentary)
      .then(response => response.json())
      .then(responseJson => {
        this.list_search = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_search
        );
        let list_search_data = JSON.parse(this.list_search);
        this.commentary = list_search_data.length;

        this.setState({
          serverData: [...this.state.serverData, ...list_search_data],

          isLoading: true
        });
        if (this._isMounted) {
          this.setState({
            isLoading: true,
            renderID: Math.random()
          });
        }
      });
  }
  EntityinDetailCommentary(
    entry_code,
    vref,
    key,
    keyplain,
    res_name,
    language
  ) {
    const { push } = this.props.navigation;
    push("EntityinDetailCommentary", {
      entry_code: entry_code,
      vref: vref,
      key: key,
      keyplain: keyplain,
      res_name: res_name,
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
    paddingLeft: 15,
    paddingRight: 15
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
export default connect(mapStateToProps, mapDispatchToProps)(EntityinCommentary);
