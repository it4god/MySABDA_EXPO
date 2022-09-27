import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
import { withNavigation } from "react-navigation";
import { HeaderBackButton } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT * 1.6;
class BibleVersion extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerLeft: <HeaderBackButton tintColor={params.titlecolor} onPress={() => {

        navigation.navigate('Home')

      }} />,
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isenglish: true,
      isindonesian: true,
      ismalay: true,
      isLoading: false,

      isBibleESV: false,
      isBibleNET: false,
      isBibleTB: false,
      isBibleAV: false,

    };

    this.isBibleESV = false;
    this.isBibleNET = false;
    this.isBibleTB = false;
    this.isBibleAV = false;

  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("bibletext", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("masuk sini");
      this.setState(
        {
          isLoading: false
        }

      )
      this._getData();
    });


  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _getData = async () => {

    try {
      let isBibleESV = await AsyncStorage.getItem("isBibleESV");
      if (isBibleESV !== null) {
        if (isBibleESV === "true")
          this.isBibleESV = true
        else
          this.isBibleESV = false
      } else {
        this.isBibleESV = false
      }
    } catch (error) {
      console.log(error);
    }
    console.log("This Is BIBLE ESV " + this.isBibleESV)
    try {
      let isBibleNET = await AsyncStorage.getItem("isBibleNET");
      if (isBibleNET !== null) {
        if (isBibleNET === "true")
          this.isBibleNET = true
        else
          this.isBibleNET = false
      } else {
        this.isBibleNET = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isBibleTB = await AsyncStorage.getItem("isBibleTB");
      if (isBibleTB !== null) {
        if (isBibleTB === "true")
          this.isBibleTB = true
        else
          this.isBibleTB = false
      } else {
        this.isBibleTB = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isBibleAV = await AsyncStorage.getItem("isBibleAV");
      if (isBibleAV !== null) {
        if (isBibleAV === "true")
          this.isBibleAV = true
        else
          this.isBibleAV = false
      } else {
        this.isBibleAV = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isBibleAV = await AsyncStorage.getItem("isBibleAV");
      if (isBibleAV !== null) {
        if (isBibleAV === "true")
          this.isBibleAV = true

      } else {
        this.isBibleTB = false
      }
    } catch (error) {
      console.log(error);
    }

    this.setState(
      {
        isLoading: true
      }
    )
    this.props.ACT_setBookChapterChange(true);
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.isLoading) {
      return (
        <ScrollView style={[styles.containerActivityIndicator, styles.horizontal, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </ScrollView>
      );
    }
    else if (this.props.STORE_BIBLE.OFFLINE == true && this.isBibleTB == false && this.isBibleAV == false && this.isBibleESV == false && this.isBibleNET == false) {
      return (
        <ScrollView style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <View style={[styles.container, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
            <List.Accordion

              title={DCT.getValue("nobibledata", this.language)}
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR
              }}
              expanded={true}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingLeft: 20,
                  paddingRight: 10,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR
                }}
              ><Image
                  style={{
                    width: 25,
                    height: 25,
                    paddingLeft: 15,
                    paddingTop: 15,
                    paddingRight: 5
                  }}
                  source={require("../assets/images/download.png")}
                />
                <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR }} onPress={() => {
                  const { navigate } = this.props.navigation;
                  navigate("Download", {});
                }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("menu_bible", this.language)}</Text>
              </View>
            </List.Accordion>



          </View>
        </ScrollView>)
    }
    else {
      return (
        <ScrollView style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <View style={[styles.container, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
            <List.Section>
              <List.Accordion
                title="English"
                titleStyle={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.isenglish}
                onPress={() =>
                  this.setState({ isenglish: !this.state.isenglish })
                }
                style={{
                  borderTopWidth: 1,

                  borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                {this.props.STORE_BIBLE.OFFLINE == true && this.isBibleAV == true && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderTopWidth: 1,
                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View style={styles.containerBottom}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("AV");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            Authorized King James Version (AV)
                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
                {this.props.STORE_BIBLE.OFFLINE == false && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderTopWidth: 1,
                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View style={styles.containerBottom}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("AV");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            Authorized King James Version (AV)
                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
                {this.props.STORE_BIBLE.OFFLINE == true && this.isBibleESV == true && (

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      paddingTop: 5,
                      paddingBottom: 5
                    }}
                  >
                    <View style={styles.containerBottom}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("ESV");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            English Standard Version (ESV)
                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
                {this.props.STORE_BIBLE.OFFLINE == false && (

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      paddingTop: 5,
                      paddingBottom: 5
                    }}
                  >
                    <View style={styles.containerBottom}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("ESV");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            English Standard Version (ESV)
    </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
                {this.props.STORE_BIBLE.OFFLINE == true && this.isBibleNET == true && (

                  <View
                    style={{
                      flexDirection: "row",

                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <View style={styles.containerBottom2}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("NET");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            New English Translation (NETBible)
                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
                {this.props.STORE_BIBLE.OFFLINE == false && (

                  <View
                    style={{
                      flexDirection: "row",

                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <View style={styles.containerBottom2}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("NET");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            New English Translation (NETBible)
    </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
              </List.Accordion>
              <List.Accordion
                title="Indonesian"
                titleStyle={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.isindonesian}
                onPress={() =>
                  this.setState({ isindonesian: !this.state.isindonesian })
                }
                style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                {this.props.STORE_BIBLE.OFFLINE == true && this.isBibleTB == true && (

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderTopWidth: 1,
                      borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,

                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View style={styles.containerBottom}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("TB");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            Alkitab Terjemahan Baru (TB)
                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
                {this.props.STORE_BIBLE.OFFLINE == false && (

                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderTopWidth: 1,
                      borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,

                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View style={styles.containerBottom}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("TB");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            Alkitab Terjemahan Baru (TB)
    </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
                {this.props.STORE_BIBLE.OFFLINE == false && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderBottomWidth: 1,

                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                      paddingTop: 5,
                      paddingBottom: 5,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR

                    }}
                  >
                    <View style={styles.containerBottom2}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("AYT");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            Alkitab Yang Terbuka (AYT)
                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                )}
              </List.Accordion>
              {this.props.STORE_BIBLE.OFFLINE == false && (
                <List.Accordion
                  title="Malay"
                  titleStyle={{
                    fontFamily: 'NotoSans-Bold',
                    fontSize: 16,
                    color: this.props.STORE_STYLE.TEXT_COLOR
                  }}
                  expanded={this.state.ismalay}
                  onPress={() => this.setState({ ismalay: !this.state.ismalay })}
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                  left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    <View style={styles.containerBottom2}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setBibleVersion("AVB");
                        }}
                        style={styles.containerBottomItem}
                      >
                        <View style={styles.button}>
                          <Text style={[styles.txtBottom, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>
                            Alkitab Versi Borneo (AVB)
                      </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        paddingTop: 9,
                        flexDirection: "row-reverse",
                        paddingLeft: 10
                      }}
                    >
                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1 }}
                        source={require("../assets/images/info_purple.png")}
                      />
                    </View>
                  </View>
                  <View style={{ height: 5 }}></View>
                </List.Accordion>
              )}
            </List.Section>
          </View>
        </ScrollView>
      );
    }
  }
  setBibleVersion(value) {
    this.bibleversion = value;
    this._storeData();
    this.props.ACT_setBibleVersion(value);
    this.props.ACT_SetOriginalVersion("");
    this.props.ACT_setBookChapterChange(true);
    this.props.navigation.navigate('Home');
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("bibleversion", this.bibleversion);
    } catch (error) {
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8",
    paddingBottom: 100
  },
  containertopRow: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBottom: {
    color: "#353535",
    fontSize: 14,
    paddingLeft: 20
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2
      },
      android: {
        borderRadius: 80
      }
    })
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  button2: {
    shadowColor: "#353535",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  },
  containertopRowText: {
    flexDirection: "column",
    marginLeft: 5
  },

  containerBottom: {
    flex: 9
  },
  containerBottomItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  containerBottomItem2: {
    padding: 10,
    flexDirection: "row",
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
    ACT_setTempBibleVersion: (set_temp_bible_version) =>
      dispatch(BibleAction.setTempBibleVersion(set_temp_bible_version)),
    ACT_setLemma: (set_lemma) => dispatch(BibleAction.setLemma(set_lemma)),
    ACT_setStrongNumber: (set_strong_number) =>
      dispatch(BibleAction.setStrongNumber(set_strong_number)),
    ACT_setWordStrong: (set_word_strong) =>
      dispatch(BibleAction.setWordStrong(set_word_strong)),
    ACT_SetBibleParallel: (set_bible_parallel) =>
      dispatch(BibleAction.setBibleParallel(set_bible_parallel)),
    ACT_SetParallel: (set_parallel) =>
      dispatch(BibleAction.setParallel(set_parallel)),
    ACT_SetOriginalVersion: (set_original_version) =>
      dispatch(BibleAction.setOriginalVersion(set_original_version)),
    ACT_setSearchLimit: (set_search_limit) =>
      dispatch(BibleAction.setSearchLimit(set_search_limit)),
    ACT_SetDailyBibleStartDate: (set_daily_bible_start_date) =>
      dispatch(BibleAction.SetDailyBibleStartDate(set_daily_bible_start_date)),
    ACT_SetDailyBibleID: (set_daily_bible_id) =>
      dispatch(BibleAction.SetDailyBibleID(set_daily_bible_id)),
    ACT_SetActionNo: (set_action_no) =>
      dispatch(BibleAction.SetActionNo(set_action_no)),
    ACT_SetVrefChange: (set_vref_change) =>
      dispatch(BibleAction.SetVrefChange(set_vref_change)),
  };
};
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(BibleVersion));
