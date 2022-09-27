import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image, FlatList
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import PopToTopScreen from "./Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT * 1.6;
class StrongCommentary extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerTransparent: true,
      headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };

  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.strongcomment = this.props.navigation.getParam("strongcomment", []);
    this.handleChangeTab(DCT.getValue("menu_comment", this.language));
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
    var regexremove = /(<([^>]+)>)/gi;
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          {this.props.STORE_BIBLE.OFFLINE == false && (
            <FlatList
              style={{ width: "100%" }}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.commentdata}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
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
                        const { navigate } = this.props.navigation;
                        navigate("DetailCommentary", {
                          subentry_code: item.subentry_code,
                          language: this.language,
                          res_name: item.res_name,
                          key_commentary: item.key,
                          vref_commentary: item.vref,
                        });
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
                      <View
                        style={{
                          flexDirection: "column",
                          flexWrap: "nowrap",
                        }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {item.key.replace(regexremove, "")}
                        </Text>
                        <Text
                          style={{
                            fontSize: this.fsizeminusone,
                            paddingLeft: 15,
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {item.vref}
                        </Text>
                        <Text
                          style={{
                            fontSize: this.fsizeminusone,
                            paddingLeft: 15,
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {item.res_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={this.renderFooter.bind(this)}
            />
          )}
          {this.props.STORE_BIBLE.OFFLINE == true && (
            <FlatList
              style={{ width: "100%" }}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.commentdata}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
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
                        const { navigate } = this.props.navigation;
                        navigate("DetailCommentary", {
                          subentry_code: item.entry_code,
                          language: this.language,
                          res_name: item.res_name,
                          key_commentary: item.key,
                          vref_commentary: item.vref,
                        });
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
                      <View
                        style={{
                          flexDirection: "column",
                          flexWrap: "nowrap",
                        }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {item.key.replace(regexremove, "")}
                        </Text>
                        <Text
                          style={{
                            fontSize: this.fsizeminusone,
                            paddingLeft: 15,
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {item.vref}
                        </Text>
                        <Text
                          style={{
                            fontSize: this.fsizeminusone,
                            paddingLeft: 15,
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {item.res_name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListFooterComponent={this.renderFooter.bind(this)}
            />

          )}
          <View style={{ height: 160 }}></View>
        </ScrollView>
      );
    }
  }
  renderFooter() {
    return (
      <View style={styles.footer}>
      </View>
    );
  }
  GoCallAPI() {
    this.setState({
      commentdata: this.strongcomment,
      isLoading: true
    });
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  contentContainer: {
    paddingBottom: 30,
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
export default connect(mapStateToProps, mapDispatchToProps)(StrongCommentary);
