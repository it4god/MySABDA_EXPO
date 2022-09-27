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
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityBibleFact extends Component {
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
      isLoading: false,
      serverData: [],
      fetching_from_server: false,
      biblefacts: [],
      suggestions: []
    };
    this.timer = -1;
    this.page = 0;
    this.skip = 0;
    this.biblefact = 0;
    this.ok = false;
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.entity_id = this.props.navigation.getParam("entity_id", "");
    this.entity_mention = this.props.navigation.getParam("entity_mention", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(
      DCT.getValue("factabout", this.language) + " " + this.entity_mention
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
      if (this.biblefact > 0 || this.ok) {
        return (
          
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <FlatList
              style={{ width: "100%" }}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.serverData}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    borderBottomWidth:1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      paddingTop: 7,
                      paddingRight: 7
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.EntityDetailBibleFact(
                          this.entity_id,
                          this.entity_mention,
                          item.event,
                          item.event_id,
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
                      <View
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15,color:this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {item.event}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={this.renderFooter.bind(this)}
            />
          </ScrollView >
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={{}}>
            <Text>{DCT.getValue("00000002", this.language)}</Text>
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
    if (this.biblefact > 20) {
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
        var urlBibleFact =
          "https://sabdapro.com:3002/App/app_event_header?limit=" +
          this.page +
          "&skip=" +
          this.skip +
          "&lang_code=" +
          this.language +
          "&entity_id=" +
          this.entity_id;
        fetch(urlBibleFact)
          .then(response => response.json())
          .then(responseJson => {
            this.list_event_hd = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_event_hd
            );
            let list_event_hd = JSON.parse(this.list_event_hd);
            this.biblefact = list_event_hd.length;
            this.setState({
              serverData: [...this.state.serverData, ...list_event_hd],
              fetching_from_server: false
            });
          });
      }, 1500);
    });
  };

  GoCallAPI() {
    this.page = 25;
    let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    var urlBibleFact =
      "https://sabdapro.com:3002/App/app_event_header?limit=" +
      this.page +
      "&skip=0&lang_code=" +
      this.language +
      "&entity_id=" +
      this.entity_id;
    fetch(urlBibleFact)
      .then(response => response.json())
      .then(responseJson => {
        this.list_event_hd = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_event_hd
        );
        let list_event_hd = JSON.parse(this.list_event_hd);
        this.biblefact = list_event_hd.length;
        if (this.biblefact > 0) this.ok = true;
        this.setState({
          serverData: [...this.state.serverData, ...list_event_hd],

          isLoading: true
        });
      });
  }

  EntityDetailBibleFact(entity_id, entity_mention, event, event_id, language) {
    const { push } = this.props.navigation;
    push("EntityDetailBibleFact", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      event: event,
      event_id: event_id,
      language: language,
      key: "Entity Detail Bible Fact" + Math.random
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
    fontFamily: "NotoSans-Bold"
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
export default connect(mapStateToProps, mapDispatchToProps)(EntityBibleFact);
