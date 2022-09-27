import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator, Platform, AsyncStorage
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
import * as FileSystem from 'expo-file-system';
import { withNavigation } from "react-navigation";
import * as SQLite from 'expo-sqlite';
const headerHeight = Header.HEIGHT * 1.6;
class OriginalLanguage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerTransparent: true,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      interlinearactive: true,
      greektextactive: true,
      originaltextactive: true,
      isLoading: false,
    };


    this.tr = false;
    this.tis = false;
    this.wh = false;
    this.whnu = false;
    this.wlc = false;
    this.bhsa = false;
    this.lxx = false;
    this.paralelgreek = false;
    this.paralelhebrew = false;
    this.hebrewtab = true;
    this.greektab = true;
    this.show_interliniear = true;
    this.hebrewinterliniear = true;
    this.greekinterliniar = true;
    this.is202_1 = false;
    this.is202_4 = false;
    this.is202_8 = false;
    this.is202_10 = false;
    this.is203_1 = false;
    this.is203_4 = false;
    this.is203_8 = false;
    this.is203_10 = false;
  }

  componentDidMount = () => {
    this._isMounted = true;
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {

      this.tr = false;
      this.tis = false;
      this.wh = false;
      this.whnu = false;
      this.wlc = false;
      this.bhsa = false;
      this.lxx = false;
      this.paralelgreek = false;
      this.paralelhebrew = false;
      this.hebrewtab = true;
      this.greektab = true;
      this.is202_1 = false;
      this.is202_4 = false;
      this.is202_8 = false;
      this.is202_10 = false;
      this.is203_1 = false;
      this.is203_4 = false;
      this.is203_8 = false;
      this.is203_10 = false;
      this.hebrewtab = true;
      this.greektab = true;
      this.show_interliniear = true;
      this.hebrewinterliniear = true;
      this.greekinterliniar = true;
      this._getData();
      this.book_id = this.props.navigation.getParam("book_id", "");
      this.chapter_no = this.props.navigation.getParam("chapter_no", "");
      this.bibleversion = this.props.navigation.getParam("bibleversion", "");
      this.language = this.props.STORE_BIBLE.LANG_CODE;
      this.handleChangeTab(DCT.getValue("originallanguage", this.language));
      this.props.navigation.setParams({
        titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
        backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
      });
      this.myversion = "";
      if (this.bibleversion.toLowerCase() === "esv")
        this.myversion = "English Standard Version";
      else if (this.bibleversion.toLowerCase() === "net")
        this.myversion = "New English Translation";
      else if (this.bibleversion.toLowerCase() === "av")
        this.myversion = "King James Version (Authorized)";
      else if (this.bibleversion.toLowerCase() === "tb")
        this.myversion = "Terjemahan Baru";
      else if (this.bibleversion.toLowerCase() === "ayt")
        this.myversion = "Alkitab Yang Terbuka";
      else if (this.bibleversion.toLowerCase() === "avb")
        this.myversion = "Alkitab Versi Borneo";

      this.originallanguagedata = [];
      let dborilanguage = SQLite.openDatabase('orilang.db');
      let sqlori = "";
      let number = "";
      if (this.book_id.toString().length == 2)
        number = this.book_id.toString();
      else
        number = "0" + this.book_id.toString();

      sqlori = "SELECT resource_orilang.version_id , ver_code, lang_id, ver_name, full_name from resource_orilang";
      console.log(sqlori);
      try {
        dborilanguage.transaction(
          tx => {
            tx.executeSql(sqlori,
              [],
              (_, { rows: { _array } }) => this.originallanguagedata = _array,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {

            for (let i = 0; i < this.originallanguagedata.length; i++) {

              if (this.originallanguagedata[i].ver_code == "tr")
                this.tr = true;
              if (this.originallanguagedata[i].ver_code == "tis")
                this.tis = true;
              if (this.originallanguagedata[i].ver_code == "wh")
                this.wh = true;
              if (this.originallanguagedata[i].ver_code == "whnu")
                this.whnu = true;
              if (this.originallanguagedata[i].ver_code == "wlc")
                this.wlc = true;
              if (this.originallanguagedata[i].ver_code == "bhsa")
                this.bhsa = true;


            }
            if (this.book_id <= 39) {
              this.tr = false;
              this.tis = false;
              this.wh = false;
              this.whnu = false;
            }
            else {
              this.wlc = false;
              this.bhsa = false;
            }
            if (this.wlc == false && this.bhsa == false) this.hebrewtab = false;
            if (this.tr == false && this.tis == false && this.wh == false && this.whnu == false) this.greektab = false;
           
            this.setState({ isLoading: false });
            this.setState({ isLoading: true });


          }
        );
      } catch (e) {
        console.log(e);
      }

    })

  };



  _getData = async () => {
    try {
      let is202_1 = await AsyncStorage.getItem("is202_1");
      if (is202_1 !== null) {
        if (is202_1 == "true")
          this.is202_1 = true
        else
          this.is202_1 = false
      } else {
        this.is202_1 = false
      }
    } catch (error) {
      console.log(error);
    }


    try {
      let is202_4 = await AsyncStorage.getItem("is202_4");
      if (is202_4 !== null) {
        if (is202_4 == "true")
          this.is202_4 = true
        else
          this.is202_4 = false
      } else {
        this.is202_4 = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let is202_8 = await AsyncStorage.getItem("is202_8");
      if (is202_8 !== null) {
        if (is202_8 == "true")
          this.is202_8 = true
        else
          this.is202_8 = false
      } else {
        this.is202_8 = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let is202_10 = await AsyncStorage.getItem("is202_10");
      if (is202_10 !== null) {
        if (is202_10 == "true")
          this.is202_10 = true
        else
          this.is202_10 = false
      } else {
        this.is202_10 = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let is203_1 = await AsyncStorage.getItem("is203_1");
      if (is203_1 !== null) {
        if (is203_1 == "true")
          this.is203_1 = true
        else
          this.is203_1 = false
      } else {
        this.is203_1 = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let is203_4 = await AsyncStorage.getItem("is203_4");
      if (is203_4 !== null) {
        if (is203_4 == "true")
          this.is203_4 = true
        else
          this.is203_4 = false
      } else {
        this.is203_4 = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let is203_8 = await AsyncStorage.getItem("is203_8");
      if (is203_8 !== null) {
        if (is203_8 == "true")
          this.is203_8 = true
        else
          this.is203_8 = false
      } else {
        this.is203_8 = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let is203_10 = await AsyncStorage.getItem("is203_10");
      if (is203_10 !== null) {
        if (is203_10 == "true")
          this.is203_10 = true
        else
          this.is203_10 = false
      } else {
        this.is203_10 = false
      }
    } catch (error) {
      console.log(error);
    }

    if (this.is202_1 == false && this.is202_4 == false && this.is202_8 == false && this.is202_10 == false) this.hebrewinterliniear = false;
    if (this.is203_1 == false && this.is203_4 == false && this.is203_8 == false && this.is203_10 == false) this.greekinterliniar = false;
    this.setState({ isLoading: false });
    this.setState({ isLoading: true });
  }
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
        <View style={[styles.containerActivityIndicator, styles.horizontal, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else if (this.props.STORE_BIBLE.OFFLINE == true && this.book_id <= 39) {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <List.Section>
            <List.Accordion
              title="Hebrew"
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.originaltextactive}
              onPress={() =>
                this.setState({
                  originaltextactive: !this.state.originaltextactive,
                })
              }
              style={{
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
            >
              {this.hebrewtab == false && (
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
                  }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("menu_orilang", this.language)}</Text>
                </View>
              )}
              {!this.show_interliniear && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("bhs")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15,
                          }}
                        >
                          Biblia Hebraica Stuttgartensia
                          </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {this.bhsa == true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("bhsa")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          ETCBC Biblia Hebraica Stuttgartensia (Amst.) v.4c
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {this.wlc == true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("wlc")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westminister Leningrad Codex
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
              {this.props.STORE_BIBLE.OFFLINE != true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-hebrew-text")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Hebrew Text
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
            </List.Accordion>
            {this.lxx == true || this.paralelgreek == true && (
              <List.Accordion
                title="Greek Text"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.greektextactive}
                onPress={() =>
                  this.setState({
                    greektextactive: !this.state.greektextactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                {this.lxx == true && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.SetOriginalVersion("lxx")}
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            LXX
                        </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>)}
                {this.paralelgreek == true && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.SetOriginalVersion("parallel-greek-text")
                        }
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                            }}
                          >
                            Parallel Greek Text
                        </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                )}
              </List.Accordion>
            )}
            {this.hebrewinterliniear == false && (
              <List.Accordion
                title="Interlinear"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.interlinearactive}
                onPress={() =>
                  this.setState({
                    interlinearactive: !this.state.interlinearactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
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
                  }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("interlinear", this.language)}</Text>
                </View>
              </List.Accordion>)}

            {this.hebrewinterliniear == true && (
              <List.Accordion
                title="Interlinear"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.interlinearactive}
                onPress={() =>
                  this.setState({
                    interlinearactive: !this.state.interlinearactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                {!this.show_interliniear && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.SetOriginalVersion("interlinear-biblia")
                        }
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15,
                            }}
                          >
                            {"Original - "}
                            {this.myversion}
                            {" -- "}
                            {"Biblia Hebraica Stuttgartensia ( Hebrew )"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {!this.show_interliniear && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.SetOriginalVersion("interlinear-biblia-reversed")
                        }
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15,
                            }}
                          >
                            {"Reversed  - "}
                            {this.myversion}
                            {" -- "}
                            {"Biblia Hebraica Stuttgartensia ( Hebrew )"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {((this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "tb" && this.is202_1 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "esv" && this.is202_4 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "net" && this.is202_8 == true) || (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "av" && this.is202_10 == true)) && (
                  <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("interlinear-westminister")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Original - "}
                          {this.myversion}
                          {" -- "}
                          {"Westminster Leningrad Codex ( Hebrew )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                )}
                
                {((this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "tb" && this.is202_1 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "esv" && this.is202_4 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "net" && this.is202_8 == true) || (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "av" && this.is202_10 == true)) && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion(
                          "interlinear-westminister-reversed"
                        )
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Reversed - "}
                          {this.myversion}
                          {" -- "}
                          {"Westminster Leningrad Codex ( Hebrew )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                )}
              </List.Accordion>
            )}
          </List.Section>
        </ScrollView>
      );
    }
    else if (this.props.STORE_BIBLE.OFFLINE == true && this.book_id > 39) {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <List.Section>
            <List.Accordion
              title="Greek Text"
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,

                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded={this.state.originaltextactive}
              onPress={() =>
                this.setState({
                  originaltextactive: !this.state.originaltextactive,
                })
              }
              style={{

                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
            >
              {this.greektab == false && (
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
                  }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("menu_orilang", this.language)}</Text>
                </View>
              )}
              {this.tr == true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("scrivener")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Scrievener's Textus Receptus 1894
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
              {this.tis == true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("tischendorf")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Tischendort 8th edition
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
              {this.wh == true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("westcott")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westcott-Hort 1881
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
              {this.whnu == true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("westcott-ubs4")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westcott-Hort with UBS4 variants
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>)}
              {this.paralelgreek == true && (
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-greek-text-greek")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Greek Text
                      </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </List.Accordion>
            {this.greekinterliniar == false && (
              <List.Accordion
                title="Interlinear"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.interlinearactive}
                onPress={() =>
                  this.setState({
                    interlinearactive: !this.state.interlinearactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
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
                  }}>{"  "}{DCT.getValue("download", this.language)}{" "} {DCT.getValue("interlinear", this.language)}</Text>
                </View>
              </List.Accordion>)}
            {this.greekinterliniar == true && (
              <List.Accordion
                title="Interlinear"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.interlinearactive}
                onPress={() =>
                  this.setState({
                    interlinearactive: !this.state.interlinearactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                 {((this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "tb" && this.is203_1 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "esv" && this.is203_4 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "net" && this.is203_8 == true) ||  (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "av" && this.is203_10 == true)) && (
               
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("esv-westcott-usb4")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Original - "}
                          {this.myversion}
                          {" -- "}
                          {"Westcott-Hort with UBS4 variants ( Greek )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                 )}
                  {((this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "tb" && this.is203_1 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "esv" && this.is203_4 == true) ||(this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "net" && this.is203_8 == true) ||  (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "av" && this.is203_10 == true)) && (
               
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("esv-westcott-usb4-reversed")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Reversed - "}
                          {this.myversion}
                          {" -- "}
                          {"Westcott-Hort with UBS4 variants ( Greek )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                  )}
              </List.Accordion>
            )}
          </List.Section>
        </ScrollView>
      )
    }
    else if (
      this.bibleversion === "esv" ||
      this.bibleversion === "net" ||
      this.bibleversion === "av" ||
      this.bibleversion === "tb"
    ) {
      if (this.book_id <= 39) {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
            <List.Section>
              <List.Accordion
                title="Hebrew"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.originaltextactive}
                onPress={() =>
                  this.setState({
                    originaltextactive: !this.state.originaltextactive,
                  })
                }
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                {!this.show_interliniear && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.SetOriginalVersion("bhs")}
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15,
                            }}
                          >
                            Biblia Hebraica Stuttgartensia
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("bhsa")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          ETCBC Biblia Hebraica Stuttgartensia (Amst.) v.4c
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("wlc")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westminister Leningrad Codex
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-hebrew-text")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Hebrew Text
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
              <List.Accordion
                title="Greek Text"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.greektextactive}
                onPress={() =>
                  this.setState({
                    greektextactive: !this.state.greektextactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("lxx")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          LXX
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-greek-text")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Greek Text
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
              <List.Accordion
                title="Interlinear"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.interlinearactive}
                onPress={() =>
                  this.setState({
                    interlinearactive: !this.state.interlinearactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                {!this.show_interliniear && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.SetOriginalVersion("interlinear-biblia")
                        }
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15,
                            }}
                          >
                            {"Original - "}
                            {this.myversion}
                            {" -- "}
                            {"Biblia Hebraica Stuttgartensia ( Hebrew )"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {!this.show_interliniear && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.SetOriginalVersion("interlinear-biblia-reversed")
                        }
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15,
                            }}
                          >
                            {"Reversed  - "}
                            {this.myversion}
                            {" -- "}
                            {"Biblia Hebraica Stuttgartensia ( Hebrew )"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("interlinear-westminister")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Original - "}
                          {this.myversion}
                          {" -- "}
                          {"Westminster Leningrad Codex ( Hebrew )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion(
                          "interlinear-westminister-reversed"
                        )
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Reversed - "}
                          {this.myversion}
                          {" -- "}
                          {"Westminster Leningrad Codex ( Hebrew )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
            <List.Section>
              <List.Accordion
                title="Greek Text"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.originaltextactive}
                onPress={() =>
                  this.setState({
                    originaltextactive: !this.state.originaltextactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("scrivener")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Scrievener's Textus Receptus 1894
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("tischendorf")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Tischendort 8th edition
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("westcott")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westcott-Hort 1881
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("westcott-ubs4")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westcott-Hort with UBS4 variants
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-greek-text-greek")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Greek Text
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
              <List.Accordion
                title="Interlinear"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.interlinearactive}
                onPress={() =>
                  this.setState({
                    interlinearactive: !this.state.interlinearactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("esv-westcott-usb4")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Original - "}
                          {this.myversion}
                          {" -- "}
                          {"Westcott-Hort with UBS4 variants ( Greek )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("esv-westcott-usb4-reversed")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {"Reversed - "}
                          {this.myversion}
                          {" -- "}
                          {"Westcott-Hort with UBS4 variants ( Greek )"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
          </ScrollView>
        );
      }
    } else {
      if (this.book_id <= 39) {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
            <List.Section>
              <List.Accordion
                title="Hebrew"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.originaltextactive}
                onPress={() =>
                  this.setState({
                    originaltextactive: !this.state.originaltextactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                {!this.show_interliniear && (
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        paddingTop: 7,
                        paddingRight: 7,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.SetOriginalVersion("bhs")}
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
                          style={{ flexDirection: "column", flexWrap: "nowrap" }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontFamily: "NotoSans-Bold",
                              paddingRight: 15,
                            }}
                          >
                            Biblia Hebraica Stuttgartensia
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("bhsa")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          ETCBC Biblia Hebraica Stuttgartensia (Amst.) v.4c
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("wlc")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westminister Leningrad Codex
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-hebrew-text")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Hebrew Text
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
              <List.Accordion
                title="Greek Text"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.interlinearactive}
                onPress={() =>
                  this.setState({
                    interlinearactive: !this.state.interlinearactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("lxx")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          LXX
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.EntityBibleFact(
                          this.entity_id,
                          this.entity_mention,
                          this.language
                        )
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          LXX
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-greek-text")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Greek Text
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
          </ScrollView>
        );
      } else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
            <List.Section>
              <List.Accordion
                title="Greek Text"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,

                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.originaltextactive}
                onPress={() =>
                  this.setState({
                    originaltextactive: !this.state.originaltextactive,
                  })
                }
                style={{

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("scrivener")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Scrievener's Textus Receptus 1894
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("tischendorf")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Tischendort 8th edition
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("westcott")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westcott-Hort 1881
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.SetOriginalVersion("westcott-ubs4")}
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Westcott-Hort with UBS4 variants
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      paddingTop: 7,
                      paddingRight: 7,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.SetOriginalVersion("parallel-greek-text-greek")
                      }
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
                        style={{ flexDirection: "column", flexWrap: "nowrap" }}
                      >
                        <Text
                          style={{
                            paddingLeft: 15,
                            fontFamily: "NotoSans-Bold",
                            paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          Parallel Greek Text
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
          </ScrollView>
        );
      }
    }
  }

  SetOriginalVersion(text) {
    this.props.ACT_SetOriginalVersion("");
    this.props.ACT_setBookChapterChange(true);
    this.props.ACT_SetOriginalVersion(text);
    this.props.navigation.navigate('Home');
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingBottom: 150,
  },
  contentContainer: {
    paddingBottom: 150,
  },
  containerBottom: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  containerBottomItem: {
    flex: 9,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
  },
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
  };
};
export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(OriginalLanguage));
