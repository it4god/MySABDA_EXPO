"use strict";
import React, { Component } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Image,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import * as COBible from "../common/COBible";
import SnackBar from "../screens/Home/SnackBar";
import SnackBarVerse from "../screens/Home/SnackBarVerse";
import { Audio } from "expo-av";
import TagParser from "../common/TagParser";
import BottomNavigation, {
  FullTab,
} from "react-native-material-bottom-navigation";
import DialogManager, {
  ScaleAnimation,
  DialogContent,
} from "react-native-dialog-component";
import * as DCT from "../dictionary";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import * as BibleStyle from "../actions/BibleStyleAction"
import AppIntroSlider from "react-native-app-intro-slider";
import { Dropdown } from "react-native-material-dropdown";
import { withNavigation } from "react-navigation";
import Modal from "react-native-modalbox";
import greek from "../assets/greek.json";
import hebrew from "../assets/hebrew.json";
import verse_info from "../assets/verse_id.json";
import { FAB } from "react-native-paper";
export const BAR_HEIGHT_ANDROID = 56;
export const BAR_HEIGHT_IOS = 49;
import { Header } from 'react-navigation-stack';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
const whitecolor = {WhiteColor: 'rgba(214, 219, 224, 1)'};
const headerHeight = Header.HEIGHT * 1.6;
const barWidth = Dimensions.get('screen').width - 30;
var self;
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 70,
  detectSwipeUp: false,
  detectSwipeDown: false,
};
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 30;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
const slides = [
  {
    key: 1,
    title: "",
    text: "",
    image: require("../assets/icon.png"),
    backgroundColor: "#273f7a",
  },
  {
    key: 2,
    title: "Hint 1",
    text: "You can tap a Word to open WordStudy. Most words are tapable",
    image: require("../assets/images/hint-1.jpg"),
    backgroundColor: "#273f7a",
  },
  {
    key: 3,
    title: "Hint 2",
    text: "You can tap Verse Numbers to open Commentary and Cross Reference",
    image: require("../assets/images/hint-2.jpg"),
    backgroundColor: "#273f7a",
  },
];
class Homescreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    if (params.showRealApp != true) {
      return {
        header: null,
      };
    }
    else {
      if (params.isDarkMode == true) {
        return {
          title: " ",
          headerLeft: (<View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => params.toggleDrawer()}>
              {/*Donute Button Image */}
              <Image
                source={require("../assets/images/drawer_darkmode.png")}
                style={{ width: 16, height: 16, marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>),
          headerRight: (
            <View style={{ backgroundColor: params.backgroundcolor, flexDirection: "row", paddingRight: 20, flex: 1 }}>
              <TouchableOpacity
                style={[styles.buttonsearch, { backgroundColor: params.backgroundcolor, }]}
                key={"search"}
                onPress={() => params.handleSearch()}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../assets/images/ic_search_darkmode.png")}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (<View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 19, paddingTop: 5, fontFamily: "NotoSans-Bold", color: params.colortitle }}>
              MySabda
          </Text>
            <Text style={{ backgroundColor: "red", paddingTop: 2, fontSize: 10, color: "#FFFFFF", margin: 7, borderRadius: 5, }}> BETA </Text>
          </View>
          ),
          headerStyle: {
            fontFamily: "NotoSans-Bold",
            paddingTop: 0,
            backgroundColor: params.backgroundcolor,
          },
          headerTransparent: true,
          headerTintColor: "#353535",
        };
      }
      else {
        return {
          title: " ",
          headerLeft: (<View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => params.toggleDrawer()}>
              {/*Donute Button Image */}
              <Image
                source={require("../assets/images/drawer.png")}
                style={{ width: 16, height: 16, marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>),
          headerRight: (
            <View style={{ backgroundColor: params.backgroundcolor, flexDirection: "row", paddingRight: 20, flex: 1 }}>
              <TouchableOpacity
                style={[styles.buttonsearch, { backgroundColor: params.backgroundcolor, }]}
                key={"search"}
                onPress={() => params.handleSearch()}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require("../assets/images/ic_search.png")}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: (<View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 19, paddingTop: 5, fontFamily: "NotoSans-Bold", color: params.colortitle }}>
              MySabda
          </Text>
            <Text style={{ backgroundColor: "red", paddingTop: 2, fontSize: 10, color: "#FFFFFF", margin: 7, borderRadius: 5, }}> BETA </Text>
          </View>
          ),
          headerStyle: {
            fontFamily: "NotoSans-Bold",
            paddingTop: 0,
            backgroundColor: params.backgroundcolor,
          },
          headerTransparent: true,
          headerTintColor: "#353535",
        };
      }

    }
  };

  constructor(props) {
    super(props);
    this.mybooks = COBible.getBooks();
    this.state = {
      isLoading: false,
      isLoadingOriginalLanguage: false,
      snackIsVisible: false,
      bibleversion: "",
      bibleversion_text: "",
      chapter_no: "",
      selected1: 1,
      book_id: 0,
      language: "eng",
      isReady: false,
      original_language_flag: false,
      is_parallel: "false",
      parallel_loaded: false,
      gestureName: "none",
      isplay: false,
      isLoaded: true,
      daily_reading_date: "",
      canisscroll: true,
      showRealApp: true,
      showdialogverse: "",
      showdialogtext: [],
      forthefirstime: false,
      cmt:false,
      tabs: [
        {
          key: "discovery",
          icon: "discovery",
          label: "",
          barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
          pressColor: "rgba(255, 255, 255, 0)",
        },
        {
          key: "parallel",
          icon: "parallel",
          label: "",
          barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
          pressColor: "rgba(255, 255, 255, 0)",
        },
        {
          key: "commentary",
          icon: "commentary",
          label: "",
          barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
          pressColor: "rgba(255, 255, 255, 0)",
        },
        {
          key: "entity",
          icon: "entity",
          label: "",
          barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
          pressColor: "rgba(255, 255, 255, 0)",
        },
        {
          key: "audio",
          icon: "audio",
          label: "",
          barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
          pressColor: "rgba(255, 255, 255, 0)",
        },
        {
          key: "more",
          icon: "more",
          label: "",
          barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
          pressColor: "rgba(255, 255, 255, 0.16)",
        },
      ]
    };
    //
    self = this;
    this.progressdownload = 0;
    this.counter = 0;
    this.content = [];
    this.pasal = 1;
    this.rendercontent = [];
    this.rendercontent2 = [];
    this.language = "English";
    this.isplaying = false;
    this.original_language = [];
    this.leftIsScrolling = false;
    this.rigthIsScrolling = false;
    this.playbackObject = new Audio.Sound();
    this.total_audio_play = 0;
    this.total_tap = 0;
    this.maintenance = false;
    this.showfab = false;
    this.temporary_bible_version = "";
    this.originalbookname = "";
    this.databibleversion = [
      {
        value: "Authorized King James Version (AV)",
      },
      {
        value: "English Standard Version (ESV)",
      },
      {
        value: "New English Translation (NETBible)",
      },
      {
        value: "Alkitab Terjemahan Baru (TB)",
      },
      {
        value: "Alkitab Yang Terbuka (AYT)",
      },
      {
        value: "Alkitab Versi Borneo (AVB)",
      },
    ];
    this.mydatabibleversion = "English Standard Version (ESV)";
    this.myapplanguage = "English";
    this.dataapplanguage = [
      {
        value: "English",
      },
      {
        value: "Indonesia",
      },
    ];
    this.isBibleESV = false;
    this.isBibleNET = false;
    this.isBibleTB = false;
    this.isBibleAV = false;
    this._realApp();

  }


  _realApp = async () => {

    try {
      let showrealapp = await AsyncStorage.getItem("showrealapp");
      if (showrealapp !== null) {
        if (showrealapp === "true") {

        }
        else {
          this.setState({
            showRealApp: false
          })
          this.CopyDatabase();
        }
      } else {
        this.setState({
          showRealApp: false
        })
        this.CopyDatabase();
      }
    } catch (error) {
      console.log(error);
    }

  }
  _renderItem = ({ item, index }) => {
    if (index == 0) {
      return (
        <View
          style={[
            styles.slide,
            {
              backgroundColor: item.backgroundColor,
            },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
              source={item.image}
              style={{
                width: 100,
                height: 100,
                marginVertical: 20,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Dropdown
              label="Setting Bible Version"
              style={{color:"white"}}
              textColor="white"
              baseColor="white"
              selectedItemColor="#353535"
              data={this.databibleversion}
              onChangeText={(databibleversion) => {
                if (databibleversion === "Authorized King James Version (AV)") {
                  this.props.ACT_setBibleVersion("AV");
                  this.mydatabibleversion =
                    "Authorized King James Version (AV)";
                } else if (
                  databibleversion === "English Standard Version (ESV)"
                ) {
                  this.mydatabibleversion = "English Standard Version (ESV)";
                  this.props.ACT_setBibleVersion("ESV");
                } else if (
                  databibleversion === "New English Translation (NETBible)"
                ) {
                  this.mydatabibleversion =
                    "New English Translation (NETBible)";
                  this.props.ACT_setBibleVersion("NET");
                } else if (
                  databibleversion === "Alkitab Terjemahan Baru (TB)"
                ) {
                  this.mydatabibleversion = "Alkitab Terjemahan Baru (TB)";
                  this.props.ACT_setBibleVersion("TB");
                } else if (databibleversion === "Alkitab Yang Terbuka (AYT)") {
                  this.mydatabibleversion = "Alkitab Yang Terbuka (AYT)";
                  this.props.ACT_setBibleVersion("AYT");
                } else if (databibleversion === "Alkitab Versi Borneo (AVB)") {
                  this.mydatabibleversion = "Alkitab Versi Borneo (AVB)";
                  this.props.ACT_setBibleVersion("AVB");
                }
                this._storeDataBibleVersion();
              }}
              value={this.mydatabibleversion}
            />
               <View style={{ height: 10 }}></View>
            <Dropdown
            style={{color:"white"}}
              label="Setting App Language"
              baseColor="white"
              textColor="white"
              selectedItemColor="#353535"
              data={this.dataapplanguage}
              onChangeText={(dataapplanguage) => {
                if (dataapplanguage === "English") {
                  this.props.ACT_setLangChange("eng");
                  this.applanguage = "English";
                } else if (dataapplanguage === "Indonesia") {
                  this.props.ACT_setLangChange("ind");
                  this.applanguage = "Indonesia";
                }
                this._storeDataAppLanguage();
                this.props.ACT_SetOriginalVersion("");
                this._storeDataBibleVersion();
              }}
              value={this.myapplanguage}
            />

            <View style={{ height: 100 }}></View>
            <Text style={styles.text}>{"* Most of the Resources are in English Language"}</Text>
            <View style={{ height: 100 }}></View>
          </View>
        </View>
      );
    } else if (index == 1) {
      return (
        <View
          style={[
            styles.slide,
            {
              backgroundColor: item.backgroundColor,
            },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <View style={{ alignItems: "center", paddingHorizontal: 10, justifyContent: "center" }}>
            <Image
              source={item.image}
              style={{
                width: 210,
                height: 400,
                marginVertical: 20,
                borderRadius: 5
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      );
    } else if (index == 2) {
      return (
        <View
          style={[
            styles.slide,
            {
              backgroundColor: item.backgroundColor,
            },
          ]}
        >
          <Text style={styles.title}>{item.title}</Text>
          <View style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 10, borderRadius: 5 }}>
            <Image
              source={item.image}
              style={{
                width: 210,
                height: 400,
                marginVertical: 20,
                padding: 10,
                borderRadius: 5
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      );
    }
  };


  _SetBibleVersion() {
    this._retrieveData();

    this.props.ACT_setBookChapterChange(false);

    this.bible_version = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.bible_version === "tb" ||
      this.bible_version === "ayt" ||
      this.bible_version === "avb"
    ) {
      this.catalog_language = "ind";
    } else {
      this.catalog_language = "eng";
    }
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  render() {
    console.log(this.counter++);

    if (!this.state.showRealApp) {
      return (
        <View style={{ flex: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}>
          <AppIntroSlider
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
            data={slides}
            onDone={() => this.EndFirstTime()}
            renderNextButton={this._renderNextButton}
            renderDoneButton={this._renderDoneButton}
            showNextButton={true}
            showDoneButton={true}
          />
        </View>
      );
    } else {
      if (this.state.forthefirstime === true) {
        return (

          <View style={[styles.container, styles.header, { backgroundColor: "#273f7a" }]}>
            <View style={{ flex: 1, flexDirection: "column", height: 120, flexDirection: "column", paddingHorizontal: 15, }}>
              <View style={{ flex: 4 }}></View>
              <View style={{ flex: 6 }}>
                <Text style={{ color: "#ffffff", textAlign: "center", fontSize: 15 }}>{this.state.firstimetext}{this.progressdownload} {"%"}</Text>
                <View style={{ height: 5 }}></View>
                <ProgressBarAnimated
                  barAnimationDuration={100}
                  backgroundAnimationDuration={500}
                  width={barWidth}
                  value={this.progressdownload}
                  backgroundColorOnComplete="#6CC644"
                />
              </View>
            </View>
          </View>
        )
      }
      else if (this.state.isLoaded === true) {
        return (
          <View style={[styles.containerActivityIndicator, styles.horizontal, { backgroundColor: "#273f7a" }]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )

      }
      else if (this.state.isLoading === false || this.state.isloaded === false) {
        return (
          <View style={[styles.container, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flex: 4.25,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  paddingBottom: 8,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                  onPress={this.ChangeBibleVersion}
                  underlayColor="#353535"
                >
                  <Text
                    style={{
                      fontSize: 17,
                      paddingLeft: 15,
                      paddingTop: 10,
                      fontFamily: "NotoSans-Bold",
                      color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {this.state.bibleversion}{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 2, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                  onPress={this.ChangeBibleVersion}
                  underlayColor="#353535"
                >
                  <Icon
                    style={{ flex: 1, paddingTop: 16, paddingRight: 2, color: this.props.STORE_STYLE.TEXT_COLOR }}
                    name="md-arrow-dropdown"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 4.25,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  paddingBottom: 8,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                  onPress={this.BookChapterSelector}
                  underlayColor="#353535"
                >
                  <Text
                    style={{
                      fontSize: 17,
                      paddingLeft: 15,
                      paddingTop: 10,
                      fontFamily: "NotoSans-Bold",
                      color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {DCT.getValue(
                      "B" + this.state.book_id.toString(),
                      this.catalog_language
                    )}{" "}
                    {this.state.chapter_no}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flex: 2, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                  onPress={this.BookChapterSelector}
                  underlayColor="#353535"
                >
                  <Icon
                    style={{ flex: 1, paddingTop: 16, paddingRight: 2, color: this.props.STORE_STYLE.TEXT_COLOR }}
                    name="md-arrow-dropdown"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1.5,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  paddingBottom: 8,
                  flexDirection: "row",
                }}
              >
                {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }]}
                    key={"setting"}
                    onPress={this.Settings}
                  >

                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                      source={require("../assets/images/settings.png")}
                    />
                  </TouchableOpacity>

                )}
                {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }]}
                    key={"setting"}
                    onPress={this.Settings}

                  >

                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                      source={require("../assets/images/settings_darkmode.png")}
                    />

                  </TouchableOpacity>
                )}
              </View>
            </View>
            <ScrollView
              style={{
                paddingTop: 10,
                paddingLeft: 5,
                paddingRight: 5,
                backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
              }}
              contentContainerStyle={styles.contentContainer}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </ScrollView>
            <View>
              <SnackBar
                ref="ReactNativeSnackBar"
                navigationProps={this.props.navigation}
              />
            </View>
            <View>
              <SnackBarVerse
                ref="ReactNativeSnackBarVerse"
                navigationProps={this.props.navigation}
              />
            </View>
            <BottomNavigation

              onTabPress={(newTab) => this.BottomNavigationClick(newTab.key)}
              renderTab={this.renderTab}
              tabs={this.state.tabs}
            />
          </View>)


      } else {

        if (
          this.state.original_language_flag === false
        ) {
          return (

            <View style={[styles.container, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
              <Modal
                ref={"modal1"}
                isOpen={this.state.isOpen}
                position={"center"}
                backdrop={false}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}
                transparent={true}
              >
                <ScrollView style={{ paddingHorizontal: 15, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                  <View style={{ flexDirection: "row-reverse", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                    <TouchableOpacity
                      style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                      onPress={() => {
                        this.refs.modal1.close();
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          height: 50,
                          width: 100,
                          paddingTop: 100,
                          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                        }}
                      >
                        {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                          <Image
                            source={require("../assets/images/cross.png")}
                            style={{ width: 15, height: 15, marginLeft: 8 }}
                          />
                        )}
                        {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                          <Image
                            source={require("../assets/images/cross_darkmode.png")}
                            style={{ width: 15, height: 15, marginLeft: 8 }}
                          />
                        )}
                      </View>

                      {/*Donute Button Image */}
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: "#353535",
                      fontSize: 25,
                      textAlign: "center",
                    }}
                  >
                    {this.state.showdialogverse}
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      paddingTop: 20,
                      paddingBottom: 150,
                      justifyContent: "flex-end",
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    {this.state.showdialogtext}
                  </View>
                </ScrollView>
              </Modal>
              <Modal
                style={[styles.audioplayermodal, {

                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }]}
                ref={"modal2"}
                isOpen={this.state.isplay}
                position={"top"}
                backdrop={false}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}
                transparent={true}
              >
                <View
                  style={[styles.audioplayer, {
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                  }]}
                >
                  <View style={{ flex: 7, flexDirection: "row", backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}>
                    <View style={{ paddingLeft: 20, }}>
                      <TouchableOpacity
                        style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
                        onPress={() => this.PlayAudio()}
                      >
                        {this.state.isplay && !this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={require("../assets/images/stop.png")}
                          />
                        )}
                        {!this.state.isplay && !this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={require("../assets/images/play.png")}
                          />
                        )}
                        {this.state.isplay && this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={require("../assets/images/stop_darkmode.png")}
                          />
                        )}
                        {!this.state.isplay && this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                          <Image
                            style={{ width: 20, height: 20 }}
                            source={require("../assets/images/play_darkmode.png")}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.book_chapter_text}
                    </Text>
                  </View>
                  <View style={{ flex: 3, flexDirection: "row-reverse" }}>
                    <Text
                      style={{
                        color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                        paddingLeft: 10,
                        paddingRight: 20,
                      }}
                      onPress={() => {
                        this.refs.modal2.close();
                        this.PlayAudio();
                      }}
                    >
                      {DCT.getValue("close", this.catalog_language)}
                    </Text>
                  </View>
                </View>
              </Modal>

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 4.25,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingBottom: 8,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.ChangeBibleVersion}
                    underlayColor="#353535"
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        paddingLeft: 15,
                        paddingTop: 10,
                        fontFamily: "NotoSans-Bold",
                        color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.state.bibleversion}{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 2, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.ChangeBibleVersion}
                    underlayColor="#353535"
                  >
                    <Icon
                      style={{ flex: 1, paddingTop: 16, paddingRight: 2, color: this.props.STORE_STYLE.TEXT_COLOR }}
                      name="md-arrow-dropdown"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 4.25,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingBottom: 8,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.BookChapterSelector}
                    underlayColor="#353535"
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        paddingLeft: 15,
                        paddingTop: 10,
                        fontFamily: "NotoSans-Bold",
                        color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {DCT.getValue(
                        "B" + this.state.book_id.toString(),
                        this.catalog_language
                      )}{" "}
                      {this.state.chapter_no}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 2, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.BookChapterSelector}
                    underlayColor="#353535"
                  >
                    <Icon
                      style={{ flex: 1, paddingTop: 16, paddingRight: 2, color: this.props.STORE_STYLE.TEXT_COLOR }}
                      name="md-arrow-dropdown"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1.5,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingBottom: 8,
                    flexDirection: "row",
                  }}
                >
                  {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }]}
                      key={"setting"}
                      onPress={this.Settings}
                    >

                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                        source={require("../assets/images/settings.png")}
                      />
                    </TouchableOpacity>

                  )}
                  {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }]}
                      key={"setting"}
                      onPress={this.Settings}

                    >

                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                        source={require("../assets/images/settings_darkmode.png")}
                      />

                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                  flexDirection: "column",
                  flex: 1,
                  paddingTop: 0,
                }}>

                <ScrollView
                  style={{
                    paddingLeft: 15,
                    paddingTop: 20,
                    paddingRight: 15,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                    flex: 4.5,
                  }}
                  onMomentumScrollEnd={({ nativeEvent }) => {
                    /*
                    if (isCloseToBottom(nativeEvent) && (this.state.parallel_loaded === false)) {
                      this.setState({ isscroll: true });
                      this.showfab = true;
                    } else {
                      this.setState({ isscroll: false });
                      this.showfab = false;
                    }
                    */
                  }}
                  contentContainerStyle={styles.contentContainer}
                  scrollEventThrottle={16}
                  ref={(scrollView) => {
                    this._leftView = scrollView;
                  }}
                  onScroll={(e) => {
                    if (!this.leftIsScrolling) {
                      this.rigthIsScrolling = true;
                      var scrollY = e.nativeEvent.contentOffset.y;
                      if (this.state.parallel_loaded === true && this.state.is_parallel === "true") this._rightView.scrollTo({ y: scrollY });
                    }
                    this.leftIsScrolling = false;

                  }}
                >
                  <CardStack horizontalThreshold={Dimensions.get('screen').width / 5} verticalSwipe={false} onSwipedLeft={this.onSwipeLeft} onSwipedRight={this.onSwipeRight}>
                    <Card>
                      {this.rendercontent}
                    </Card>
                  </CardStack>
                  <View style={{ height: 100 }}></View>
                </ScrollView>

                {this.state.is_parallel === "true" && (
                  <View
                    style={{
                      height: 45,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderTopWidth: 1,
                      borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderBottomWidth: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                    }}
                  >
                    <TouchableOpacity
                      key={"touchopacity_parallel1"}
                      style={{ flex: 1.5, paddingLeft: 10, paddingTop: 3 }}
                      onPress={() => {
                        this.props.navigation.navigate("ParallelBible", {});
                      }}
                    >
                      {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                        <Image
                          style={{ width: 16, height: 16, paddingLeft: 20 }}
                          source={require("../assets/images/arrow_left_black.png")}
                        />
                      )}
                      {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                        <Image
                          style={{ width: 16, height: 16, paddingLeft: 20 }}
                          source={require("../assets/images/arrow_left_darkmode.png")}
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={"touchopacity_parallel2"}
                      style={{ flex: 7 }}
                      onPress={() => { }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: "NotoSans-Bold",
                          textAlign: "center",
                          justifyContent: "center",
                          paddingBottom: 10,
                          color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {this.myversion}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={"touchopacity_parallel3"}
                      style={{ flex: 1.5, paddingTop: 3 }}
                      onPress={() => {
                        this._storeDataToFalse();
                      }}
                    >
                      {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                        <Image
                          style={{ width: 16, height: 16, paddingRight: 2 }}
                          source={require("../assets/images/cross_small_black.png")}
                        />
                      )}
                      {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                        <Image
                          style={{ width: 16, height: 16, paddingRight: 2 }}
                          source={require("../assets/images/cross_darkmode.png")}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                {this.state.parallel_loaded == true && this.state.is_parallel === "true" && (

                  <ScrollView
                    style={{
                      paddingLeft: 15,
                      paddingTop: 20,
                      paddingRight: 15,
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                      flex: 4.5,
                    }}
                    contentContainerStyle={styles.contentContainer}
                    ref={(scrollView) => {
                      this._rightView = scrollView;
                    }}

                  >
                    <CardStack horizontalThreshold={Dimensions.get('screen').width / 5} verticalSwipe={false} onSwipedLeft={this.onSwipeLeft} onSwipedRight={this.onSwipeRight}>
                      <Card>
                        {this.rendercontent2}
                      </Card>
                    </CardStack>
                  </ScrollView>
                )}
                {this.state.parallel_loaded === false && this.state.is_parallel === "true" && (
                  <ScrollView
                    style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}
                    contentContainerStyle={styles.contentContainer}
                  >
                    <ActivityIndicator size="large" color="#0000ff" />
                  </ScrollView>
                )}
              </View>

              {
                this.showfab && (
                  <FAB
                    style={styles.fab_left}
                    color="white"
                    icon="chevron-left"
                    onPress={() => this.onSwipeRight()}
                  />
                )
              }
              {
                this.showfab && (
                  <FAB
                    style={styles.fab_right}
                    color="white"
                    icon="chevron-right"
                    onPress={() => this.onSwipeLeft()}
                  />
                )
              }
              <View>
                <SnackBar
                  ref="ReactNativeSnackBar"
                  navigationProps={this.props.navigation}
                />
              </View>
              <View>
                <SnackBarVerse
                  ref="ReactNativeSnackBarVerse"
                  navigationProps={this.props.navigation}
                />
              </View>
              <BottomNavigation

                onTabPress={(newTab) => this.BottomNavigationClick(newTab.key)}
                renderTab={this.renderTab}
                tabs={this.state.tabs}
              />
            </View >

          );
        } else {
          return (
            <View style={[styles.container, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 4.25,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingBottom: 8,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.ChangeBibleVersion}
                    underlayColor="#353535"
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        paddingLeft: 15,
                        paddingTop: 10,
                        fontFamily: "NotoSans-Bold",
                        color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.state.bibleversion}{" "}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 2, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.ChangeBibleVersion}
                    underlayColor="#353535"
                  >
                    <Icon
                      style={{ flex: 1, paddingTop: 16, paddingRight: 2, color: this.props.STORE_STYLE.TEXT_COLOR }}
                      name="md-arrow-dropdown"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 4.25,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingBottom: 8,
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.BookChapterSelector}
                    underlayColor="#353535"
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        paddingLeft: 15,
                        paddingTop: 10,
                        fontFamily: "NotoSans-Bold",
                        color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {DCT.getValue(
                        "B" + this.state.book_id.toString(),
                        this.catalog_language
                      )}{" "}
                      {this.state.chapter_no}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 2, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
                    onPress={this.BookChapterSelector}
                    underlayColor="#353535"
                  >
                    <Icon
                      style={{ flex: 1, paddingTop: 16, paddingRight: 2, color: this.props.STORE_STYLE.TEXT_COLOR }}
                      name="md-arrow-dropdown"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1.5,
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingBottom: 8,
                    flexDirection: "row",
                  }}
                >
                  {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }]}
                      key={"setting"}
                      onPress={this.Settings}
                    >

                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                        source={require("../assets/images/settings.png")}
                      />
                    </TouchableOpacity>

                  )}
                  {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }]}
                      key={"setting"}
                      onPress={this.Settings}

                    >

                      <Image
                        style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                        source={require("../assets/images/settings_darkmode.png")}
                      />

                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View
                style={{
                  height: 45,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                }}
              >
                <TouchableOpacity
                  key={"touchopacity_original_show"}
                  style={{ flex: 1.5, paddingLeft: 10, paddingTop: 3 }}
                  onPress={() => {
                    var bibleversion = this.state.bibleversion;
                    bibleversion = bibleversion.toLowerCase();
                    //this.ShowDialogEllipsisMore();

                    const { navigate } = this.props.navigation;
                    navigate("OriginalLanguage", {
                      book_id: this.state.book_id,
                      chapter_no: this.state.chapter_no,
                      bibleversion: this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase(),
                      language: this.state.language,
                    });
                  }}
                >
                  {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <Image
                      style={{ width: 16, height: 16, paddingLeft: 20 }}
                      source={require("../assets/images/arrow_left_black.png")}
                    />
                  )}
                  {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <Image
                      style={{ width: 16, height: 16, paddingLeft: 20 }}
                      source={require("../assets/images/arrow_left_darkmode.png")}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  key={"to global text original"}
                  style={{ flex: 7 }}
                  onPress={() => { }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "NotoSans-Bold",
                      textAlign: "center",
                      justifyContent: "center",
                      paddingBottom: 10,
                      color: this.props.STORE_STYLE.TEXT_COLOR
                    }}
                  >
                    {this.originalbookname.toUpperCase()}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  key={"to global text original 2"}
                  style={{ flex: 1.5, paddingTop: 3 }}
                  onPress={() => {
                    this.setState(
                      {
                        isLoading: false,
                        original_language_flag: false,
                        bibleversion: this.props.STORE_BIBLE.TEMP_BIBLE_VERSION,
                      },
                      () => {
                        this.props.ACT_setBibleVersion(
                          this.props.STORE_BIBLE.BIBLE_VERSION
                        );
                        this.props.ACT_SetOriginalVersion("");
                        this.OnGOClick();
                      }
                    );
                  }}
                >
                  {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <Image
                      style={{ width: 16, height: 16, paddingRight: 13 }}
                      source={require("../assets/images/cross_small_black.png")}
                    />
                  )}
                  {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                    <Image
                      style={{ width: 16, height: 16, paddingRight: 13 }}
                      source={require("../assets/images/cross_darkmode.png")}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {!this.state.isLoadingOriginalLanguage && (
                <ScrollView
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}
                  contentContainerStyle={styles.contentContainer}
                >
                  <ActivityIndicator size="large" color="#0000ff" />
                </ScrollView>
              )}
              {this.state.isLoadingOriginalLanguage && (
                <ScrollView
                  style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }}

                  onMomentumScrollEnd={({ nativeEvent }) => {
                    /*
                    if (isCloseToBottom(nativeEvent) && (this.state.parallel_loaded === false)) {
                      this.setState({ isscroll: true });
                      this.showfab = true;
                    } else {
                      this.setState({ isscroll: false });
                      this.showfab = false;
                    }
                    */
                  }}
                >
                  <View
                    key={"global text original 2"}
                    style={{ flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingHorizontal: 15,
                        fontFamily: "NotoSans-Bold",
                        color: this.props.STORE_STYLE.TEXT_COLOR
                      }}
                    >
                      {this.ori_book_name}
                    </Text>
                  </View>
                  <CardStack horizontalThreshold={Dimensions.get('screen').width / 5} verticalSwipe={false} onSwipedLeft={this.onSwipeLeft} onSwipedRight={this.onSwipeRight}>
                    <Card>
                      {this.textori2}
                    </Card>
                  </CardStack>
                  <View style={{ height: 100 }}></View>
                </ScrollView>
              )}
              {this.showfab && (
                <FAB
                  style={styles.fab_left}
                  color="white"
                  icon="chevron-left"
                  onPress={() => this.onSwipeRight()}
                />
              )}
              {this.showfab && (
                <FAB
                  style={styles.fab_right}
                  color="white"
                  icon="chevron-right"
                  onPress={() => this.onSwipeLeft()}
                />
              )}
              <View>
                <SnackBar
                  ref="ReactNativeSnackBar"
                  navigationProps={this.props.navigation}
                />
              </View>
              <View>
                <SnackBarVerse
                  ref="ReactNativeSnackBarVerse"
                  navigationProps={this.props.navigation}
                />
              </View>

              <BottomNavigation

                onTabPress={(newTab) => this.BottomNavigationClick(newTab.key)}
                renderTab={this.renderTab}
                tabs={this.state.tabs}
              />
            </View>
          );

        }
      }



    }
  }
  clearText = () => {
    props._textInput.setNativeProps({ color: "red" });
  };

  _storeDataAppLanguage = async () => {
    try {
      await AsyncStorage.setItem(
        "applanguage",
        this.props.STORE_BIBLE.LANG_CODE
      );
    } catch (error) {
      console.log(error);
    }
  };
  _storeDataBibleVersion = async () => {
    try {
      await AsyncStorage.setItem(
        "bibleversion",
        this.props.STORE_BIBLE.BIBLE_VERSION
      );
    } catch (error) {
      console.log(error);
    }
  };

  _retriveDataBible = async () => {
    try {
      let bibleversion = await AsyncStorage.getItem("bibleversion");
      if (bibleversion !== null) {
        this.props.ACT_setBibleVersion(bibleversion);
        this.bibleversionnow = bibleversion;
      } else {
        this.props.ACT_setBibleVersion("ESV");
        this.bibleversionnow = "ESV";
      }
    } catch (error) {
      console.log(error);
    }
  };
  _retrieveDataIsDarkMode = async () => {

    try {
      let is_showdarkmode = await AsyncStorage.getItem("is_show_darkmode");
      if (is_showdarkmode !== null) {
        if (is_showdarkmode === "true") {
          this.props.ACT_setIsShowDarkMode(true);
          this.props.ACT_setDarkMode(true);
        }
        else {
          this.props.ACT_setIsShowDarkMode(false)
          this.props.ACT_setDarkMode(false);
        }

      }
    } catch (error) {
      console.log(error);
    }
    this.SettingDarkOrLightMode();
  };
  _retrieveData = async () => {
    this.setState(
      {
        isLoading: false

      })

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
    if (this.props.STORE_BIBLE.VREF_CHANGE === true) {

      console.log("This is : " + this.props.STORE_BIBLE.book_id);

      console.log("This is : " + this.props.STORE_BIBLE.chapter_no);



      this.props.ACT_SetVrefChange(false);

    } else {

      try {
        let is_offline = await AsyncStorage.getItem("is_offline");
        if (is_offline !== null) {
          if (is_offline === "true") {
            this.props.ACT_setOffline(true)
          }
          else {

            this.props.ACT_setOffline(false)
          }

        }
      } catch (error) {
        console.log(error);
      }



      try {
        let book_id = await AsyncStorage.getItem("book_id");
        if (book_id !== null) {
          this.props.ACT_setBookID(Number(book_id));
        } else {
          this.props.ACT_setBookID(40);
        }
      } catch (error) {
        console.log(error);
      }
      try {
        let chapter_no = await AsyncStorage.getItem("chapter_no");
        if (chapter_no !== null) {
          this.props.ACT_setChapterNo(Number(chapter_no));
        } else {
          this.props.ACT_setChapterNo(1);
        }
      } catch (error) {
        console.log(error);
      }
    }
    try {
      let fontsize = await AsyncStorage.getItem("fontsize");
      if (fontsize !== null) {
        this.props.ACT_setFontSize(fontsize);
      } else {
        this.props.ACT_setFontSize("16");
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let applanguage = await AsyncStorage.getItem("applanguage");
      if (applanguage !== null) {
        this.props.ACT_setLangChange(applanguage);
      } else {
        this.props.ACT_setLangChange("eng");
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let is_lineview = await AsyncStorage.getItem("is_line_view");
      if (is_lineview !== null) {
        if (is_lineview === "true") this.props.ACT_setIsLineView(true);
        else this.props.ACT_setIsLineView(false);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let is_shownotes = await AsyncStorage.getItem("is_show_notes");
      if (is_shownotes !== null) {
        if (is_shownotes === "true") this.props.ACT_setIsShowNotes(true);
        else this.props.ACT_setIsShowNotes(false);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let is_showpericopes = await AsyncStorage.getItem("is_show_pericopes");
      if (is_showpericopes !== null) {
        if (is_showpericopes === "true")
          this.props.ACT_setIsShowPericopes(true);
        else this.props.ACT_setIsShowPericopes(false);
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let is_showhighlight = await AsyncStorage.getItem("is_show_highlight");
      if (is_showhighlight !== null) {
        if (is_showhighlight === "true")
          this.props.ACT_setIsShowHighlight(true);
        else this.props.ACT_setIsShowHighlight(false);
      }
    } catch (error) {
      console.log(error);
    }



    if (this.props.STORE_BIBLE.ORIGINAL_VERSION == "") {
      try {
        let bibleversion = await AsyncStorage.getItem("bibleversion");
        if (bibleversion !== null) {
          this.props.ACT_setBibleVersion(bibleversion);
          this.bibleversionnow = bibleversion;
        } else {
          this.props.ACT_setBibleVersion("ESV");
          this.bibleversionnow = "ESV";
        }
      } catch (error) {
        console.log(error);
      }
    }
    try {
      let parallelbible = await AsyncStorage.getItem("bibleparallel");
      if (parallelbible !== null) {
        this.props.ACT_SetBibleParallel(parallelbible);
      } else {
        this.props.ACT_SetBibleParallel("TB");
      }
    } catch (error) {
      console.log(error);
    }


    try {
      let daily_bible_start_date = await AsyncStorage.getItem(
        "daily_bible_start_date"
      );
      if (daily_bible_start_date !== null) {
        this.props.ACT_SetDailyBibleStartDate(daily_bible_start_date);
      } else {
        let date = new Date();
        this.props.ACT_SetDailyBibleStartDate(
          new Date(
            Date.UTC(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              0,
              0,
              0
            )
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let daily_bible_id = await AsyncStorage.getItem("daily_bible_id");
      if (daily_bible_id !== null) {
        this.props.ACT_SetDailyBibleID(daily_bible_id);
      } else {
        this.props.ACT_SetDailyBibleID("5");
      }
    } catch (error) {
      console.log(error);
    }

    this.setState(
      {

        original_language_flag: false,
        isLoadingOriginalLanguage: false,
        book_id: this.props.STORE_BIBLE.BOOK_ID,
        chapter_no: this.props.STORE_BIBLE.CHAPTER_NO,
        bibleparallel: this.props.STORE_BIBLE.BIBLE_PARALLEL,
        is_parallel: this.props.STORE_BIBLE.PARALLEL,
        bibleversion: this.props.STORE_BIBLE.BIBLE_VERSION,

      },
      () => { }
    );
    await this.executeAfterRetrive();
  };

  SettingDarkOrLightMode() {
    this.props.navigation.setParams({
      handleSearch: this.searchHandler,
      handleAudio: this.audioHandler,
      handleVideo: this.videoHandler,
      showRealApp: this.state.showRealApp,
      colortitle: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });

    this.tabs = [
      {
        key: "discovery",
        icon: "discovery",
        label: "",
        barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
        pressColor: "rgba(255, 255, 255, 0)",
      },
      {
        key: "parallel",
        icon: "parallel",
        label: "",
        barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
        pressColor: "rgba(255, 255, 255, 0)",
      },
      {
        key: "commentary",
        icon: "commentary",
        label: "",
        barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
        pressColor: "rgba(255, 255, 255, 0)",
      },
      {
        key: "entity",
        icon: "entity",
        label: "",
        barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
        pressColor: "rgba(255, 255, 255, 0)",
      },
      {
        key: "audio",
        icon: "audio",
        label: "",
        barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
        pressColor: "rgba(255, 255, 255, 0)",
      },
      {
        key: "more",
        icon: "more",
        label: "",
        barColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
        pressColor: "rgba(255, 255, 255, 0.16)",
      },
    ];


    this.setState(
      {
        isLoaded: false,
        tabs: this.tabs,
      })
    this.props.navigation.setParams({
      handleSearch: this.searchHandler, toggleDrawer: this.DrawerToogle,
      handleAudio: this.audioHandler,
      isDarkMode: this.props.STORE_BIBLE.IS_SHOW_DARKMODE,
      showRealApp: this.state.showRealApp,
      colortitle: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
  }

  async executeAfterRetrive() {
    if (this.props.STORE_BIBLE.ORIGINAL_VERSION !== "") {
      this.ITLGreekSetup();
      this.ITLHebrewSetup();
      setTimeout(() => {
        this.SetOriginalVersion(this.props.STORE_BIBLE.ORIGINAL_VERSION);
      }, 1000);
    } else {
      await this.OnGOClick();
      if (this.isplaying == true) {
        if (this.total_audio_play === 4) {
          Alert.alert(
            DCT.getValue(
              "continue",
              this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            ),
            DCT.getValue(
              "wantcontinue",
              this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            ),
            [
              {
                text: DCT.getValue(
                  "cancel",
                  this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                ),
                onPress: () => {
                  this._Stop();
                  this.total_audio_play = 0;
                  this.setState({ isplay: false });
                  this.isplaying = false;
                },
              },
              {
                text: "OK",
                onPress: () => {
                  this.total_audio_play = 0;
                  this._Stop();
                  this._Play();
                },
              },
            ],
            { cancelable: false }
          );
        } else if (this.total_audio_play < 4) {
          this._Stop();
          this._Play();
        } else {
          this.PlayAudio();
        }
      }
    }
  }


  _storeDataToFalse = async () => {
    try {
      await AsyncStorage.setItem("parallel", "false");
    } catch (error) {
      console.log(error);
    }
    this.props.ACT_SetParallel("false");
    this.setState({
      isLoading: false,
      is_parallel: this.props.STORE_BIBLE.PARALLEL,
    });
    await this.executeOnGOClick();
  };
  async executeOnGOClick() {
    await this.OnGOClick();
  }
  onSwipeLeft = () => {

    let temp_chapter_no = this.props.STORE_BIBLE.CHAPTER_NO;
    let temp_book_id = this.props.STORE_BIBLE.BOOK_ID;

    temp_chapter_no = temp_chapter_no + 1;
    if (temp_chapter_no > COBible.getBookChapter(temp_book_id).end) {
      temp_book_id = temp_book_id + 1;
      if (temp_book_id > 66) temp_book_id = 66;
      if (
        temp_book_id === 66 &&
        temp_chapter_no > COBible.getBookChapter(temp_book_id).end
      )
        temp_chapter_no = 22;
      else temp_chapter_no = 1;
    }
    this.chapter_no = temp_chapter_no;
    this.book_id = temp_book_id;
    if (
      !(
        this.book_id === this.props.STORE_BIBLE.BOOK_ID &&
        this.chapter_no === this.props.STORE_BIBLE.CHAPTER_NO
      )
    ) {

      this._storeDataSwipe();

    }


  };

  onSwipeRight = () => {

    let temp_chapter_no = this.props.STORE_BIBLE.CHAPTER_NO;
    let temp_book_id = this.props.STORE_BIBLE.BOOK_ID;
    temp_chapter_no = temp_chapter_no - 1;
    if (temp_chapter_no === 0) {
      temp_book_id = temp_book_id - 1;
      if (temp_book_id === 0) {
        temp_book_id = 1;
        temp_chapter_no = 1;
      } else {
        temp_chapter_no = COBible.getBookChapter(temp_book_id).end;
      }
    }
    this.chapter_no = temp_chapter_no;
    this.book_id = temp_book_id;
    if (
      !(
        this.book_id === this.props.STORE_BIBLE.BOOK_ID &&
        this.chapter_no === this.props.STORE_BIBLE.CHAPTER_NO
      )
    ) {

      this._storeDataSwipe();

    }

  };

  _storeDataSwipe = async () => {
    try {
      await AsyncStorage.setItem("chapter_no", this.chapter_no.toString());
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("book_id", this.book_id.toString());
    } catch (error) {
      console.log(error);
    }
    this.props.ACT_setBookChapterChange(true);
    this.props.ACT_setBookID(this.book_id.toString());
    this.props.ACT_setChapterNo(Number(this.chapter_no.toString()));
    this.setState(
      {
        isLoading: false,
        book_id: this.book_id,
        chapter_no: this.chapter_no,
      }
    )
    this.OnGOClick();
  }


  state = {
    activeTab: "discovery",
  };

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={() => this.rendericon_buttomnavigation(tab.icon)}
    />
  );

  rendericon_buttomnavigation(tabvalue) {

    if (!this.props.STORE_BIBLE.IS_SHOW_DARKMODE) {
      switch (tabvalue) {
        case "discovery":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/discovery.png")}
            />
          );
        case "parallel":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/parallel.png")}
            />
          );
        case "commentary":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/commentary.png")}
            />
          );
        case "entity":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/entity.png")}
            />
          );

        case "audio":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/audio.png")}
            />
          );

        case "more":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/more.png")}
            />
          );

        default:
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/originallanguage.png")}
            />
          );

      }
    }
    else {
      switch (tabvalue) {
        case "discovery":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/discovery_darkmode.png")}
            />
          );
        case "parallel":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/parallel_darkmode.png")}
            />
          );
        case "commentary":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/commentary_darkmode.png")}
            />
          );
        case "entity":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/entity_darkmode.png")}
            />
          );

        case "audio":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/audio_darkmode.png")}
            />
          );

        case "more":
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/more_darkmode.png")}
            />
          );

        default:
          return (
            <Image
              style={styles.button2}
              fill="#FFFFFF"
              source={require("../assets/images/originallanguage_darkmode.png")}
            />
          );


      }
    }

  }
  searchHandler() {
    if (!self.maintenance) {
      const { navigate } = self.props.navigation;
      navigate("Search", {});
    } else {
      Alert.alert(
        DCT.getValue(
          "maintenance",
          self.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        DCT.getValue(
          "maintenancedesc",
          self.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }
  DrawerToogle() {
    const { navigate } = self.props.navigation;
    navigate('DrawerMenu');
  }
  audioHandler() {
    if (!self.maintenance) {
      self.refs.modal2.open();
      self.PlayAudio();
    } else {
      Alert.alert(
        DCT.getValue(
          "maintenance",
          self.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        DCT.getValue(
          "maintenancedesc",
          self.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }
  videoHandler() {
    const { navigate } = self.props.navigation;
    Alert.alert(
      "Coming Soon",
      "We will develop this feature as soon as possible ! Keep update with us !"
    );
  }
  Searching(text) {
    const language = this.props.STORE_BIBLE.LANG_CODE;
    let isfuzzy = "N";
    let isindefinition = "N";

    if (this.state.isfuzzy === true) isfuzzy = "Y";
    if (this.state.isindefinition === true) isindefinition = "Y";
    this.props.navigation.navigate("Search", {
      searchtext: text,
      fuzzy: isfuzzy,
      indefinition: isindefinition,
      language: language,
    });
  }
  handleSearching = (text) => {
    this.setState({ searchtext: text });
  };
  componentWillUnmount() {

    this.focusListener.remove();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.parallel_loaded != nextState.parallel_loaded) {
      return true;
    }
    if (this.state.book_id != nextState.book_id || this.state.chapter_no != nextState.chapter_no) {
      return true;
    }
    if (this.state.tick != nextState.tick) {
      return true;
    }
    if (this.state.forthefirstime != nextState.forthefirstime) {
      return true;
    }
    if (this.state.isplay != nextState.isplay) {
      return true;
    }
    if(this.state.cmt !=  nextState.cmt)
    {
      return true;
    }
    if (this.state.isLoading === nextState.isLoading) {
      return false;
    }

    return true


  }
  componentDidMount = () => {
    this.myversion = "";
    if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "esv")
      this.myversion = "English Standard Version";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "net")
      this.myversion = "New English Translation";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "av")
      this.myversion = "King James Version (Authorized)";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "tb")
      this.myversion = "Terjemahan Baru";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "avb")
      this.myversion = "Alkitab Versi Borneo";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "ayt")
      this.myversion = "Alkitab Yang Terbuka";

    this.bible_version = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.bible_version === "tb" ||
      this.bible_version === "ayt" ||
      this.bible_version === "avb"
    ) {
      this.catalog_language = "ind";
    } else {
      this.catalog_language = "eng";
    }
    this.book_chapter = DCT.getValue(
      "BL" + this.state.book_id,
      this.catalog_language
    );
    this.book_chapter_text = this.book_chapter + " " + this.state.chapter_no;
    if (this.state.showRealApp === false) {
      this.props.ACT_setBibleVersion("ESV");
    }
    this._isMounted = true;

    this.MyParser = new TagParser(this, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {

      this.change_book_chapter = this.props.STORE_BIBLE.BOOK_CHAPTER_CHANGE;

      if (this.props.STORE_BIBLE.ACTION_NO !== "0") {
        let action_no = this.props.STORE_BIBLE.ACTION_NO;

        this.props.ACT_SetActionNo("0");
        const { navigate } = this.props.navigation;
        if (action_no === "1") {
          navigate("Discovery", {
            book_id: this.state.book_id,
            chapter_no: this.state.chapter_no,
            language: this.state.language,
          });
        } else if (action_no === "2") {
          navigate("Commentary", {
            book_id: this.state.book_id,
            chapter_no: this.state.chapter_no,
            language: this.state.language,
          });
        } else if (action_no === "5") {
          var bibleversion = this.state.bibleversion;
          bibleversion = bibleversion.toLowerCase();
          navigate("CrossReference", {
            book_id: this.state.book_id,
            chapter_no: this.state.chapter_no,
            language: this.state.language,
            version_code: bibleversion,
          });
        } else if (action_no === "4") {
          this.OpenListEntity(
            this.state.book_id,
            this.state.chapter_no,
            this.state.language
          );
        } else if (action_no === "3") {
          navigate("ParallelBible", {});
        } else if (action_no === "6") {
          var bibleversion = this.state.bibleversion;
          bibleversion = bibleversion.toLowerCase();
          //this.ShowDialogEllipsisMore();

          const { navigate } = this.props.navigation;
          navigate("OriginalLanguage", {
            book_id: this.state.book_id,
            chapter_no: this.state.chapter_no,
            bibleversion: this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase(),
            language: this.state.language,
          });
        } else if (action_no === "7") {
          const { navigate } = self.props.navigation;
          navigate("MediaScreen", {
            book_id: this.state.book_id,
            chapter_no: this.state.chapter_no,
            language: this.state.language,
          });
        } else if (action_no === "8") {
          if (
            this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb" ||
            this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "esv" ||
            this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "av"
          ) {
            this.setState({ isplay: false });
            this._Stop();
            this.isplaying = false;
            this.refs.modal2.open();
            this.PlayAudio();
          } else {
            Alert.alert(
              DCT.getValue(
                "noaudio",
                this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
              ),
              this.props.STORE_BIBLE.BIBLE_VERSION +
              " " +
              DCT.getValue(
                "noaudiodesc",
                this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
              ),
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
          }
        } else if (action_no === "9") {
          let urldailyreading =
            "https://sabdapro.com:3002/App/app_daily_bible?limit=33&skip=0&month=" +
            (new Date().getMonth() + 1).toString();
          console.log(urldailyreading);
          fetch(urldailyreading)
            .then((response) => response.json())
            .then((responseJson) => {

              let daily_bible = responseJson.data.list_daily_bible;
              this.day = daily_bible[new Date().getDate() - 1].passage;

              var now = new Date();
              var days = [];
              if (this.props.STORE_BIBLE.LANG_CODE === "eng") {
                days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              } else if (this.props.STORE_BIBLE.LANG_CODE === "ind") {
                days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
              }
              var months = [];
              if (this.props.STORE_BIBLE.LANG_CODE === "eng") {
                months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];
              } else if (this.props.STORE_BIBLE.LANG_CODE === "ind") {
                months = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "Mei",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Okt",
                  "Nov",
                  "Des",
                ];
              }

              var day = days[now.getDay()];
              var month = months[now.getMonth()];

              let daily_reading_date =
                day +
                ", " +
                now.getDate() +
                " " +
                month +
                " " +
                now.getFullYear().toString();

              if (this._isMounted === true) {
                this.setState(
                  {
                    day: this.day,
                    daily_reading_date: daily_reading_date,
                  },

                  () => { }
                );
              }
              const { navigate } = this.props.navigation;
              navigate("DailyBible", {
                daily_reading_date: daily_reading_date,
                day: day,
              });
            });
        }
      } else if (this.change_book_chapter) {
        this.setState(
          {
            isLoading: false
          }
        )
        this.setState(
          {
            isLoading: true
          }
        )
        console.log("Change !");
        this._retrieveDataIsDarkMode()
        this._retrieveData();

        this.props.ACT_setBookChapterChange(false);

      }
      else {
        /*
        this.props.navigation.setParams({
          handleSearch: this.searchHandler, toggleDrawer: this.DrawerToogle,
          handleAudio: this.audioHandler,
          isDarkMode: this.props.STORE_BIBLE.IS_SHOW_DARKMODE,
          showRealApp: this.state.showRealApp,
          colortitle: this.props.STORE_STYLE.TEXT_COLOR,
          backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
        });
        */
      }
      this.bible_version = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
      if (
        this.bible_version === "tb" ||
        this.bible_version === "ayt" ||
        this.bible_version === "avb"
      ) {
        this.catalog_language = "ind";
      } else {
        this.catalog_language = "eng";
      }
    });

  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  DisplaySnackBar(lemma, strongnumber, wordstrong, verse_id, book_id, language) {
    this.setState({
      canisscroll: false,
    });
    this.showfab = false;
    this.refs.ReactNativeSnackBar.ShowSnackBarFunction(
      lemma,
      strongnumber,
      wordstrong,
      verse_id,
      book_id,
      language
    );
  }

  DisplaySnackBarVerse(vid, bibleversion, book_id, language) {
    this.setState({
      canisscroll: false,
    });
    this.showfab = false;
    this.refs.ReactNativeSnackBarVerse.ShowSnackBarFunction(
      vid,
      bibleversion,
      book_id,
      language
    );
  }

  ChangeBibleVersion = () => {
    this.props.navigation.navigate("BibleVersion");
  }

  BookChapterSelector = () => {
    const { navigate } = this.props.navigation;
    navigate("BookChapterSelector", {});
  }
  Settings = () => {
    const { navigate } = this.props.navigation;
    navigate("Settings", {});
  }
  ScrollToTheBottom = () => {


  }


  async SetBibleVersion(value) {
    this.setState(
      {
        bibleversion: value,
        isLoading: false,
      },
      () => { }
    );
    await this.OnGOClick();
  }
  ChangeBibleBook() {
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 0,
        ScaleAnimation: new ScaleAnimation(),
        children: <DialogContent></DialogContent>,
      },
      () => { }
    );
  }
  SetBibleBook(value) {
    var book_id = COBible.getBookID(value);
    DialogManager.dismissAll(() => { });

    this.setState({
      book: value,
      book_id: book_id,
    });
  }

  SetLanguage(value) {
    this.props.navigation.setParams({ LangParam: value });
    this.props.ACT_setLangChange(value);

    DialogManager.dismissAll(() => { });
  }
  ShowDialogEllipsisMore() {
    this.ITLHebrewSetup();
    this.ITLGreekSetup();
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <View
              style={{
                flexDirection: "column",
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  key={"touchopacity_entity"}
                  onPress={() => {
                    DialogManager.dismissAll(() => { });
                    this.OpenListEntity(
                      this.state.book_id,
                      this.state.chapter_no,
                      this.state.language
                    );
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../assets/images/ic_person.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  key={"touchopacity_entity 2"}
                  onPress={() => {
                    DialogManager.dismissAll(() => { });
                    this.OpenListEntity(
                      this.state.book_id,
                      this.state.chapter_no,
                      this.state.language
                    );
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 20,
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {" "}
                      {DCT.getValue("entity", this.language)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 25,
                }}
              >
                <TouchableOpacity
                  key={"touchopacity_entity 3"}
                  onPress={() => {
                    DialogManager.dismissAll(() => { });
                    this.OpenListEntity(
                      this.state.book_id,
                      this.state.chapter_no,
                      this.state.language
                    );
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../assets/images/ic_greek.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  key={"touchopacity_entity 4"}
                  onPress={() => {
                    DialogManager.dismissAll(() => { });
                    this.OpenOriginalLanguage(
                      this.state.book_id,
                      this.state.language
                    );
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingLeft: 20,
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {" "}
                      {DCT.getValue("menu_orilang", this.language)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </DialogContent>
        ),
      },
      () => { }
    );
  }
  OpenListEntity(book_id, chapter_no, language) {
    const { navigate } = this.props.navigation;
    navigate("ListEntityScreen", {
      book_id: book_id,
      chapter_no: chapter_no,
      language: language,
    });
  }

  SetOriginalVersion(text) {
    // this.props.ACT_SetOriginalVersion(text);
    this.setState(
      {
        isLoading: false,

      },
      () => { }
    );
    let originalversion = this.props.STORE_BIBLE.ORIGINAL_VERSION.toLowerCase();
    const bibleversion = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    let myversion = "";
    if (bibleversion.toLowerCase() === "esv")
      myversion = "English Standard Version";
    else if (bibleversion.toLowerCase() === "net")
      myversion = "New English Translation";
    else if (bibleversion.toLowerCase() === "av")
      myversion = "King James Version (Authorized)";
    else if (bibleversion.toLowerCase() === "tb")
      myversion = "Terjemahan Baru";

    switch (originalversion) {
      case "bhs":
        this.ori_lang_code = "hbo";
        this.ori_ver_code = "bhs";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Biblia Hebraica Stuttgartensia";
        this.originalbookname = "bhs";
        break;
      case "bhsa":
        this.ori_lang_code = "hbo";
        this.ori_ver_code = "bhsa";
        this.ori_book_lang_code = "eng";
        this.ori_book_name =
          "ETCBC Biblia Hebraica Stuttgartensia (Amst.) v.4c";
        this.originalbookname = "bhsa";
        break;
      case "wlc":
        this.ori_lang_code = "hbo";
        this.ori_ver_code = "wlc";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Westminster Leningrad Codex";
        this.originalbookname = "wlc";

        break;
      case "parallel-hebrew-text":
        this.ori_lang_code = "parallel-hebrew-text";
        this.ori_ver_code = "";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Parallel Hebrew Text";
        this.originalbookname = "Parallel Hebrew Text";
        break;
      case "lxx":
        this.ori_lang_code = "grc";
        this.ori_ver_code = "lxx";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "lxx";
        this.originalbookname = "LXX";
        break;
      case "parallel-greek-text":
        this.ori_lang_code = "parallel-greek-text";
        this.ori_ver_code = "";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Parallel Greek Text";
        this.originalbookname = "Parallel Greek ext";
        break;
      case "interlinear-biblia":
        this.ori_lang_code = "interlinear-biblia";
        this.ori_ver_code = "bhs";
        this.ori_book_lang_code = "eng";
        this.ori_book_name =
          "Original - " +
          myversion +
          "-- Biblia Hebraica Stuttgartensia ( Hebrew )";
        this.originalbookname = "BHS";
        break;
      case "interlinear-westminister":
        this.ori_lang_code = "interlinear-westminister";
        this.ori_ver_code = "wlc";
        this.ori_book_lang_code = "eng";
        this.ori_book_name =
          "Original - " +
          myversion +
          "-- Westminster Leningrad Codex ( Hebrew )";
        this.originalbookname = "WLC";
        break;
      case "interlinear-biblia-reversed":
        this.ori_lang_code = "interlinear-biblia-reversed";
        this.ori_ver_code = "bhs";
        this.ori_book_lang_code = "eng";
        this.ori_book_name =
          "Reversed - " +
          myversion +
          "-- Biblia Hebraica Stuttgartensia ( Hebrew )";
        this.originalbookname = "BHS";
        break;
      case "interlinear-westminister-reversed":
        this.ori_lang_code = "interlinear-westminister-reversed";
        this.ori_ver_code = "wlc";
        this.ori_book_lang_code = "eng";
        this.ori_book_name =
          "Reversed - " +
          myversion +
          "-- Westminster Leningrad Codex ( Hebrew )";
        this.originalbookname = "WLC";
        break;
      case "scrivener":
        this.ori_lang_code = "grc";
        this.ori_ver_code = "tr";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Scrivener's Textus Receptus 1894";
        this.originalbookname = "TR";
        break;
      case "tischendorf":
        this.ori_lang_code = "grc";
        this.ori_ver_code = "tis";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Tischendorf 8th edition";
        this.originalbookname = "TIS";
        break;
      case "westcott":
        this.ori_lang_code = "grc";
        this.ori_ver_code = "wh";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Westcott-Hort 1881";
        this.originalbookname = "WH";
        break;
      case "westcott-ubs4":
        this.ori_lang_code = "grc";
        this.ori_ver_code = "whnu";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Westcott-Hort with UBS4 variants";
        this.originalbookname = "WHNU";
        break;
      case "parallel-greek-text-greek":
        this.ori_lang_code = "parallel-greek-text-greek";
        this.ori_ver_code = "";
        this.ori_book_lang_code = "eng";
        this.ori_book_name = "Parallel Greek Text";
        this.originalbookname = "Parallel Greek Text";

        break;
      case "esv-westcott-usb4":
        this.ori_lang_code = "esv-westcott-usb4";
        this.ori_ver_code = "whnu";
        this.ori_book_lang_code = "eng";
        this.ori_book_name =
          "Original - " +
          myversion +
          "-- Westcott-Hort with UBS4 variants ( Greek )";
        this.originalbookname = "WHNU";
        break;
      case "esv-westcott-usb4-reversed":
        this.ori_lang_code = "esv-westcott-usb4-reversed";
        this.ori_ver_code = "whnu";
        this.ori_book_lang_code = "eng";
        this.ori_book_name =
          "Reversed - " +
          myversion +
          "-- Westcott-Hort with UBS4 variants ( Greek )";
        this.originalbookname = "WHNU";
        break;
      default:
    }

    this.GetOriginalLanguageText(
      this.ori_lang_code,
      this.ori_ver_code,
      this.ori_book_lang_code,
      this.ori_book_name, this.originalbookname
    );
  }
  OriMorph(morph) {
    if (morph != "X") {
      let morphology = COBible.parseGreekMorph(morph)
      Alert.alert(
        morph.toString(),
        morphology,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );

    }

  }
  GetOfflineOriginalLanguageText(lang_code, ver_code) {
    this.listtoken = [];
    if (lang_code == "hbo") {

      this.textori = [];
      this.textori2 = [];
      let db = "";
      if (ver_code == "bhsa")
        db = "orilang_206_entry.db"
      else if (ver_code == "wlc")
        db = "orilang_202_entry.db"
      let dboriginallanguage = SQLite.openDatabase(db);

      let number = "";
      if (this.props.STORE_BIBLE.BOOK_ID.length == 2)
        number = this.props.STORE_BIBLE.BOOK_ID.toString();
      else
        number = "0" + this.props.STORE_BIBLE.BOOK_ID.toString();

      let sqlori_map = "SELECT id, seq, bookid, chapter,verse, token, translit, strong from entry_orilang_" + number + " WHERE chapter = " + this.props.STORE_BIBLE.CHAPTER_NO.toString() + " ORDER BY ID ASC";

      console.log(db + " " + sqlori_map);
      try {
        dboriginallanguage.transaction(
          tx => {
            tx.executeSql(sqlori_map,
              [],
              (_, { rows: { _array } }) => this.listtoken = _array,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {
            let listtoken = this.listtoken
            this.verse_line = "";
            let bcv = "";
            let oldbcv = "";
            let oldv = "";
            let newv = "";
            for (let i = 0; i < listtoken.length; i++) {
              oldbcv =
                DCT.getValue(
                  "B" + listtoken[i].bookid,
                  this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                ) +
                " " +
                listtoken[i].chapter +
                ":" +
                listtoken[i].verse;

              oldv = listtoken[i].verse;
              if (
                (listtoken[i].seq === 1 && i !== 0) ||
                i + 1 == listtoken.length
              ) {
                this.textori2.push(
                  <View
                    key={"text original" + i}
                    style={{
                      flexDirection: "row-reverse",
                      flexWrap: "wrap",
                      textAlign: "right",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = listtoken[i].verse;
              }
              if (oldbcv !== bcv) {
                bcv =
                  DCT.getValue(
                    "B" + listtoken[i].bookid,
                    this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                  ) +
                  " " +
                  listtoken[i].chapter +
                  ":" +
                  listtoken[i].verse;
                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 4,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {bcv}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].token}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].translit}
                    </Text>
                    <TouchableOpacity
                      key={"to strong bhs " + i}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: listtoken[i].strong,
                          wordstrong: listtoken[i].token,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                        {" "}
                        {listtoken[i].strong}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 4,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {" "}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].token}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].translit}
                    </Text>
                    <TouchableOpacity
                      key={"to strong bhs " + i}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: listtoken[i].strong,
                          wordstrong: listtoken[i].token,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                        {" "}
                        {listtoken[i].strong}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
              if (i + 1 == listtoken.length) {
                this.textori2.push(
                  <View
                    key={"text original 2" + i}
                    style={{
                      flexDirection: "row-reverse",
                      flexWrap: "wrap",
                      textAlign: "right",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = listtoken[i].verse;
              }
            }


            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
    else if (ver_code == "lxx") {

      this.listtoken = [];
      this.textori = [];
      this.textori2 = [];
      let db = "orilang_200_entry.db";
      let dboriginallanguage = SQLite.openDatabase(db);

      let number = "";
      if (this.props.STORE_BIBLE.BOOK_ID.length == 2)
        number = this.props.STORE_BIBLE.BOOK_ID.toString();
      else
        number = "0" + this.props.STORE_BIBLE.BOOK_ID.toString();

      let sqlori_map = "SELECT id, seq, bookid, chapter,verse, token, translit, strong from entry_orilang_" + number + " WHERE chapter = " + this.props.STORE_BIBLE.CHAPTER_NO.toString() + " ORDER BY ID ASC";

      console.log(db + " " + sqlori_map);
      try {
        dboriginallanguage.transaction(
          tx => {
            tx.executeSql(sqlori_map,
              [],
              (_, { rows: { _array } }) => this.listtoken = _array,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {


            let listtoken = this.listtoken
            this.verse_line = "";
            let bcv = "";
            let oldbcv = "";
            let oldv = "";
            let newv = "";
            for (let i = 0; i < listtoken.length; i++) {
              oldbcv =
                DCT.getValue(
                  "B" + listtoken[i].bookid,
                  this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                ) +
                " " +
                listtoken[i].chapter +
                ":" +
                listtoken[i].verse;

              oldv = listtoken[i].verse;
              if (
                (listtoken[i].seq === 0 && i !== 0) ||
                i + 1 == listtoken.length
              ) {
                this.textori2.push(
                  <View
                    key={"text original" + i}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      textAlign: "right",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = listtoken[i].verse;
              }
              if (oldbcv !== bcv) {
                bcv =
                  DCT.getValue(
                    "B" + listtoken[i].bookid,
                    this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                  ) +
                  " " +
                  listtoken[i].chapter +
                  ":" +
                  listtoken[i].verse;
                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 4,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {bcv}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].token}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].translit}
                    </Text>
                    <TouchableOpacity
                      key={"to strong bhs " + i}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: listtoken[i].strong,
                          wordstrong: listtoken[i].token,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                        {" "}
                        {listtoken[i].strong}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              } else {
                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 4,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {" "}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].token}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listtoken[i].translit}
                    </Text>
                    <TouchableOpacity
                      key={"to strong bhs " + i}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: listtoken[i].strong,
                          wordstrong: listtoken[i].token,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                        {" "}
                        {listtoken[i].strong}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }

              if (i + 1 == listtoken.length) {
                this.textori2.push(
                  <View
                    key={"text original 2" + i}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      textAlign: "right",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = listtoken[i].verse;
              }
            }

            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );





          }
        );
      } catch (e) {
        console.log(e);
      }

    }
    else if (lang_code == "grc") {


      this.listtoken = [];
      this.textori = [];
      this.textori2 = [];
      let db = "";
      if (ver_code == "tr") db = "orilang_197_entry.db"
      else if (ver_code == "tis") db = "orilang_198_entry.db"
      else if (ver_code == "wh") db = "orilang_199_entry.db"
      else if (ver_code == "whnu") db = "orilang_203_entry.db"
      let dboriginallanguage = SQLite.openDatabase(db);

      let number = "";
      if (this.props.STORE_BIBLE.BOOK_ID.toString().length == 2)
        number = this.props.STORE_BIBLE.BOOK_ID.toString();
      else
        number = "0" + this.props.STORE_BIBLE.BOOK_ID.toString();

      let sqlori_map = "SELECT id, seq, bookid, chapter,verse, token, translit, pos, strong from entry_orilang_" + number + " WHERE chapter = " + this.props.STORE_BIBLE.CHAPTER_NO.toString() + " ORDER BY ID ASC";

      console.log(db + " " + sqlori_map);
      try {
        dboriginallanguage.transaction(
          tx => {
            tx.executeSql(sqlori_map,
              [],
              (_, { rows: { _array } }) => this.listtoken = _array,
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {

            let listtoken = this.listtoken
            this.verse_line = "";
            let bcv = "";
            let oldbcv = "";
            let oldv = "";
            let newv = "";
            let strong_numbers = "";
            let text_token = "";
            let text_translit_ascii = "";
            for (let i = 0; i < listtoken.length; i++) {
              oldbcv =
                DCT.getValue(
                  "B" + listtoken[i].bookid,
                  this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                ) +
                listtoken[i].chapter +
                ":" +
                listtoken[i].verse;

              oldv = listtoken[i].verse;
              this.textstrong = [];
              if (listtoken[i].strong !== null) {
                strong_numbers = listtoken[i].strong;
                this.text_token = listtoken[i].token;
                this.text_translit_ascii = listtoken[i].translit;
              }

              let array_strong = strong_numbers.split(";");
              for (let j = 0; j < array_strong.length; j++) {
                this.textstrong.push(
                  <TouchableOpacity
                    key={"to strong bhs " + i + j}
                    onPress={() => {
                      const { navigate } = this.props.navigation;
                      navigate("WordStudy", {
                        strongnumber: array_strong[j],
                        wordstrong: listtoken[i].token,
                        language: this.state.language,
                      });
                    }}
                  >
                    <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left", }}>
                      {array_strong[j]}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              }
              let listrelationtoken = listtoken[i].token;
              if (
                listrelationtoken.indexOf("{") > -1 &&
                listrelationtoken.indexOf("}" > -1)
              ) {
                listrelationtoken = listrelationtoken
                  .replace(/{VAR/g, "\nVAR")
                  .replace(/}/g, "")
                  .replace(/<(?!\/?a>)[^>]*>/g, "");
                if (
                  (listtoken[i].seq === 1 && i !== 0) ||
                  i + 1 == listtoken.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    DCT.getValue(
                      "B" + listtoken[i].bookid,
                      this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                    ) +
                    listtoken[i].chapter +
                    ":" +
                    listtoken[i].verse;
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {bcv}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                          paddingTop: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                        onPress={() => {
                          this.ClickReaction2(listrelationtoken);
                        }}
                      >
                        {"\n\n\n"}
                        {"var"}
                      </Text>

                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {" "}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                          paddingTop: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                        onPress={() => {
                          this.ClickReaction2(listrelationtoken);
                        }}
                      >
                        {"\n\n\n"}
                        {"var"}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                    </View>
                  );
                }

                if (i + 1 == listtoken.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
              } else {
                if (
                  (listtoken[i].seq === 1 && i !== 0) ||
                  i + 1 == listtoken.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    DCT.getValue(
                      "B" + listtoken[i].bookid,
                      this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
                    ) +
                    listtoken[i].chapter +
                    ":" +
                    listtoken[i].verse;

                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {bcv}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit}
                      </Text>
                      <Text onPress={() => { this.OriMorph(listtoken[i].pos) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].pos}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {" "}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit}
                      </Text>
                      <Text onPress={() => { this.OriMorph(listtoken[i].pos) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].pos}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                    </View>
                  );
                }

                if (i + 1 == listtoken.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
              }
            }


            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );



          }
        );
      } catch (e) {
        console.log(e);
      }

    }



  }

  GetOfflineITLTextGreek(order, itl_id, rel_lang_code, ver_code_src, ver_code_tgt, lang_code_tgt) {
    console.log("Book ID : " + this.props.STORE_BIBLE.BOOK_ID)
    this.start_i = COBible.getChapterVerse(
      COBible.getBookChapter(parseInt(this.props.STORE_BIBLE.BOOK_ID, 10)).start +
      parseInt(this.props.STORE_BIBLE.CHAPTER_NO, 10)
    ).start + 1;
    this.end_i =
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.props.STORE_BIBLE.BOOK_ID, 10)).start +
        parseInt(this.props.STORE_BIBLE.CHAPTER_NO, 10)
      ).start +
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.props.STORE_BIBLE.BOOK_ID, 10)).start +
        parseInt(this.props.STORE_BIBLE.CHAPTER_NO, 10)
      ).end;
    this.textori = [];
    this.textori2 = [];
    let db = "";

    let ver_code = this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase();
    console.log('ver_code' + ver_code);
    if (ver_code == "tb")
      db = "itl_203_1_entry.db"
    else if (ver_code == "esv")
      db = "itl_203_4_entry.db"
    else if (ver_code == "net")
      db = "itl_203_8_entry.db"
    else if (ver_code == "av")
      db = "itl_203_10_entry.db"
    let dbitl = SQLite.openDatabase(db);

    let number = "";
    number = this.props.STORE_BIBLE.BOOK_ID.toString();

    let sqlori_map = ""
    if (order == "original")
      sqlori_map = "SELECT * from entry_itl_" + number + " WHERE seq_type_id_src = 1 AND  token_src !='' AND verse_id >= " + this.start_i + " AND verse_id <= " + this.end_i + " ORDER BY verse_id, seq_src"
    else if (order == "reversed")
      sqlori_map = "SELECT * from entry_itl_" + number + " WHERE seq_type_id_tgt = 1 AND token_tgt !='' AND verse_id >= " + this.start_i + " AND verse_id <= " + this.end_i + " ORDER BY verse_id, seq_tgt"
    console.log(sqlori_map);
    try {
      dbitl.transaction(
        tx => {
          tx.executeSql(sqlori_map,
            [],
            (_, { rows: { _array } }) => this.listtoken = _array,
            (tx, error) => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        },
        () => {
          let listrelation = this.listtoken;
          if (order === "original") {
            let bcv = "";
            let oldbcv = "";
            let oldv = "";
            let newv = "";
            let vid = "";
            for (let i = 0; i < listrelation.length; i++) {

              if (listrelation[i].token_src == null) continue;
              vid = listrelation[i].verse_id;
              let book_info = verse_info.find(x => x.verse_id == vid);

              let itl_book_lang = "eng";
              if (this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() == "tb")
                itl_book_lang = "ind"
              let book_abbr = DCT.getValue(
                "B" + book_info.bookid,
                itl_book_lang
              )
              oldbcv =
                book_abbr +
                " " +
                book_info.chapter +
                ":" +
                book_info.verse;

              oldv = book_info.verse;

              this.textstrong = [];
              this.text_token = listrelation[i].token_tgt
              this.textstrong.push(
                <TouchableOpacity
                  key={"to strong bhs " + i}
                  onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate("WordStudy", {
                      strongnumber: listrelation[i].strong,
                      wordstrong: listrelation[i].translit,
                      language: this.state.language,
                    });
                  }}
                >
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left", }}>
                    {listrelation[i].strong}{" "}
                  </Text>
                </TouchableOpacity>
              );

              let listrelationtoken = listrelation[i].token_src;
              if (
                listrelationtoken.indexOf("{") > -1 &&
                listrelationtoken.indexOf("}" > -1)
              ) {
                listrelationtoken = listrelationtoken
                  .replace(/{VAR/g, "\nVAR")
                  .replace(/}/g, "")
                  .replace(/<(?!\/?a>)[^>]*>/g, "");
                if (
                  (listrelation[i].seq_src === 1 && i !== 0) ||
                  i + 1 == listrelation.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = book_info.verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    book_abbr +
                    " " +
                    book_info.chapter +
                    ":" +
                    book_info.verse;


                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {bcv}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                          paddingTop: 20,
                        }}
                        onPress={() => {
                          this.ClickReaction2(listrelationtoken);
                        }}
                      >
                        {"\n\n\n"}
                        {"var"}
                      </Text>
                      <Text style={{ textAlign: "left" }}>
                        {listrelation[i].translit}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text onPress={() => { this.OriMorph(listrelation[i].morpho) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].morpho}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_token}
                      </Text>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {" "}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                          paddingTop: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                        onPress={() => {
                          this.ClickReaction2(listrelationtoken);
                        }}
                      >
                        {"\n\n\n"}
                        {"var"}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].translit_ascii}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text onPress={() => { this.OriMorph(listrelation[i].morpho) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].morpho}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_token}
                      </Text>
                    </View>
                  );
                }
                if (i + 1 == listrelation.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = book_info.verse;
                }
              } else {
                if (
                  (listrelation[i].seq_src === 1 && i !== 0) ||
                  i + 1 == listrelation.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listrelation[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    book_abbr +
                    " " +
                    book_info.chapter +
                    ":" +
                    book_info.verse;

                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {bcv}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token_src}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].translit}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text onPress={() => { this.OriMorph(listrelation[i].morpho) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].morpho}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_token}
                      </Text>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {" "}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token_src}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].translit}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text onPress={() => { this.OriMorph(listrelation[i].morpho) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].morpho}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_token}
                      </Text>
                    </View>
                  );
                }
                if (i + 1 == listrelation.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = book_info.verse;
                }
              }
            }


            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );
          }
          else if (order === "reversed") {


            let min_seq_tgt = listrelation.filter(x => parseInt(x.seq_tgt, 10) > 0).reduce((a, c) => Math.min(a, c.seq_tgt))

            let bcv = "";
            let oldbcv = "";
            let oldv = "";
            let newv = "";
            let vid = "";
            let newtoken = "";
            let oldtoken = "";
            for (let i = 0; i < listrelation.length; i++) {
              vid = listrelation[i].verse_id;
              let book_info = verse_info.find(x => x.verse_id == vid);

              let itl_book_lang = "eng";
              if (this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() == "tb")
                itl_book_lang = "ind"
              let book_abbr = DCT.getValue(
                "B" + book_info.bookid,
                itl_book_lang
              )
              oldbcv =
                book_abbr +
                " " +
                book_info.chapter +
                ":" +
                book_info.verse;

              oldv = book_info.verse;

              this.textstrong = [];
              this.text_token = listrelation[i].token_src
              this.text_translit_ascii = "";
              let strong_numbers = "";
              strong_numbers = listrelation[i].strong
              newtoken = listrelation[i].token_tgt;
              if (oldtoken === newtoken) newtoken = "";
              oldtoken = listrelation[i].token_tgt;
              this.text_translit = listrelation[i].translit;



              this.textstrong.push(
                <TouchableOpacity
                  key={"to strong bhs " + i }
                  onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate("WordStudy", {
                      strongnumber: listrelation[i].strong,
                      wordstrong: listrelation[i].translit,
                      language: this.state.language,
                    });
                  }}
                >
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                    {listrelation[i].strong}{" "}
                  </Text>
                </TouchableOpacity>
              );


              if (
                (listrelation[i].seq_tgt === min_seq_tgt && i !== 0) ||
                i + 1 == listrelation.length
              ) {
                this.textori2.push(
                  <View
                    key={"text original" + i}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      textAlign: "left",
                      paddingHorizontal: 15,
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = book_info.verse;
              }
              if (oldbcv !== bcv) {
                bcv =
                  book_abbr +
                  " " +
                  book_info.chapter +
                  ":" +
                  book_info.verse;

                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 5,
                      paddingBottom: 10,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {bcv}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {newtoken}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                    <View
                      key={"token 3" + i}
                      style={{
                        flexDirection: "row",
                        textAlign: "left",
                      }}
                    >
                      {this.textstrong}
                    </View>
                    <Text onPress={() => { this.OriMorph(listrelation[i].morpho) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].morpho}
                      </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {this.text_translit}
                    </Text>
                  </View>
                );
              } else {
                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 5,
                      paddingBottom: 10,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {" "}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {newtoken}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                    <View
                      key={"token 3" + i}
                      style={{
                        flexDirection: "row",
                        textAlign: "left",
                      }}
                    >
                      {this.textstrong}
                    </View>
                    <Text onPress={() => { this.OriMorph(listrelation[i].morpho) }} style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].morpho}
                      </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {this.text_translit}
                    </Text>
                  </View>
                );
              }
              if (i + 1 == listrelation.length) {
                this.textori2.push(
                  <View
                    key={"text original 2" + i}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      textAlign: "left",
                      paddingHorizontal: 15,
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = book_info.verse;
              }
            }


            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );

          }

        })

    }
    catch (e) {

    }







  }

  GetOfflineITLTextHebrew(order, itl_id, rel_lang_code, ver_code, ver_code_tgt, lang_code_tgt) {
    this.start_i = COBible.getChapterVerse(
      COBible.getBookChapter(parseInt(this.props.STORE_BIBLE.BOOK_ID, 10)).start +
      parseInt(this.props.STORE_BIBLE.CHAPTER_NO, 10)
    ).start + 1;
    this.end_i =
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.props.STORE_BIBLE.BOOK_ID, 10)).start +
        parseInt(this.props.STORE_BIBLE.CHAPTER_NO, 10)
      ).start +
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.props.STORE_BIBLE.BOOK_ID, 10)).start +
        parseInt(this.props.STORE_BIBLE.CHAPTER_NO, 10)
      ).end;
    this.textori = [];
    this.textori2 = [];
    let db = "";

    ver_code = this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase();
    console.log('ver_code' + ver_code);
    if (ver_code == "tb")
      db = "itl_202_1_entry.db"
    else if (ver_code == "esv")
      db = "itl_202_4_entry.db"
    else if (ver_code == "net")
      db = "itl_202_8_entry.db"
    else if (ver_code == "av")
      db = "itl_202_10_entry.db"
    let dbitl = SQLite.openDatabase(db);

    let number = "";
    if (this.props.STORE_BIBLE.BOOK_ID.toString().length == 2)
      number = this.props.STORE_BIBLE.BOOK_ID.toString();
    else
      number = "0" + this.props.STORE_BIBLE.BOOK_ID.toString();

    let sqlori_map = ""
    if (order == "original")
      sqlori_map = "SELECT * from entry_itl_" + number + " WHERE seq_type_id_src = 1 AND  token_src !='' AND verse_id >= " + this.start_i + " AND verse_id <= " + this.end_i + " ORDER BY verse_id, seq_src"
    else if (order == "reversed")
      sqlori_map = "SELECT * from entry_itl_" + number + " WHERE seq_type_id_tgt = 1 AND token_tgt !='' AND verse_id >= " + this.start_i + " AND verse_id <= " + this.end_i + " ORDER BY verse_id, seq_tgt"
    console.log(sqlori_map);
    try {
      dbitl.transaction(
        tx => {
          tx.executeSql(sqlori_map,
            [],
            (_, { rows: { _array } }) => this.listtoken = _array,
            (tx, error) => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        },
        () => {


          let listrelation = this.listtoken;
          if (order === "original") {

            let bcv = "";
            let oldbcv = "";
            let oldv = "";
            let newv = "";
            let vid = "";
            for (let i = 0; i < listrelation.length; i++) {
              if (listrelation[i].token_src == null) continue;
              vid = listrelation[i].verse_id;
              let book_info = verse_info.find(x => x.verse_id == vid);

              let itl_book_lang = "eng";
              if (this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() == "tb")
                itl_book_lang = "ind"
              let book_abbr = DCT.getValue(
                "B" + book_info.bookid,
                itl_book_lang
              )
              oldbcv =
                book_abbr +
                " " +
                book_info.chapter +
                ":" +
                book_info.verse;

              oldv = book_info.verse;

              this.textstrong = [];
              this.text_token = listrelation[i].token_tgt
              this.textstrong.push(
                <TouchableOpacity
                  key={"to strong bhs " + i}
                  onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate("WordStudy", {
                      strongnumber: listrelation[i].strong,
                      wordstrong: listrelation[i].translit,
                      language: this.state.language,
                    });
                  }}
                >
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left", }}>
                    {listrelation[i].strong}{" "}
                  </Text>
                </TouchableOpacity>
              );


              if (
                (listrelation[i].seq_src === 1 && i !== 0) ||
                i + 1 == listrelation.length
              ) {
                this.textori2.push(
                  <View
                    key={"text original" + i}
                    style={{
                      flexDirection: "row-reverse",
                      flexWrap: "wrap",
                      textAlign: "right",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = book_info.verse;
              }
              if (oldbcv !== bcv) {
                bcv =
                  book_abbr +
                  " " +
                  book_info.chapter +
                  ":" +
                  book_info.verse;

                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 10,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {bcv}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listrelation[i].token_src}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listrelation[i].translit}
                    </Text>
                    <View
                      key={"token 3" + i}
                      style={{
                        flexDirection: "row",
                        textAlign: "left",
                      }}
                    >
                      {this.textstrong}
                    </View>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                  </View>
                );
              } else {
                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 10,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {" "}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listrelation[i].token_src}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listrelation[i].translit}
                    </Text>
                    <View
                      key={"token 3" + i}
                      style={{
                        flexDirection: "row",
                        textAlign: "left",
                      }}
                    >
                      {this.textstrong}
                    </View>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                  </View>
                );
              }
              if (i + 1 == listrelation.length) {
                this.textori2.push(
                  <View
                    key={"text original 2" + i}
                    style={{
                      flexDirection: "row-reverse",
                      flexWrap: "wrap",
                      textAlign: "right",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = book_info.verse;
              }
            }

            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );
          }
          else if (order === "reversed") {

            let min_seq_tgt = listrelation.filter(x => parseInt(x.seq_tgt, 10) > 0).reduce((a, c) => Math.min(a, c.seq_tgt))
            console.log("min : " + min_seq_tgt)
            let bcv = "";
            let oldbcv = "";
            let oldv = "";
            let newv = "";
            let vid = "";
            let oldtoken = "";
            let newtoken = "";
            for (let i = 0; i < listrelation.length; i++) {
              if (listrelation[i].token_tgt == null) continue;
              vid = listrelation[i].verse_id;
              let book_info = verse_info.find(x => x.verse_id == vid);
              let itl_book_lang = "eng";
              if (this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() == "tb")
                itl_book_lang = "ind"
              let book_abbr = DCT.getValue(
                "B" + book_info.bookid,
                itl_book_lang
              )
              oldbcv =
                book_abbr +
                " " +
                book_info.chapter +
                ":" +
                book_info.verse;

              oldv = book_info.verse;

              this.textstrong = [];
              this.text_token = listrelation[i].token_src
              this.text_translit_ascii = "";
              newtoken = listrelation[i].token_tgt;
              if (oldtoken === newtoken) newtoken = "";
              oldtoken = listrelation[i].token_tgt;


              this.textstrong.push(
                <TouchableOpacity
                  key={"to strong bhs " + i}
                  onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate("WordStudy", {
                      strongnumber: listrelation[i].strong,
                      wordstrong: listrelation[i].translit,
                      language: this.state.language,
                    });
                  }}
                >
                  <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                    {listrelation[i].strong}{" "}
                  </Text>
                </TouchableOpacity>
              );


              if (
                (listrelation[i].seq_tgt === min_seq_tgt && i !== 0) ||
                i + 1 == listrelation.length
              ) {
                this.textori2.push(
                  <View
                    key={"text original" + i}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      textAlign: "left",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = book_info.verse;
              }
              if (oldbcv !== bcv) {
                bcv =
                  book_abbr +
                  " " +
                  book_info.chapter +
                  ":" +
                  book_info.verse;

                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 10,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {bcv}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {newtoken}
                    </Text>
                    <Text style={{ textAlign: "left" }}>{this.text_token}</Text>
                    <View
                      key={"token 3" + i}
                      style={{
                        flexDirection: "row",
                        textAlign: "left",
                      }}
                    >
                      {this.textstrong}
                    </View>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listrelation[i].translit}
                    </Text>
                  </View>
                );
              } else {
                this.textori.push(
                  <View
                    key={"token 2" + i}
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 15,
                      paddingBottom: 10,
                      textAlign: "left",
                    }}
                  >
                    <Text
                      style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                    >
                      {" "}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {newtoken}
                    </Text>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                    <View
                      key={"token 3" + i}
                      style={{
                        flexDirection: "row",
                        textAlign: "left",
                      }}
                    >
                      {this.textstrong}
                    </View>
                    <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                      {listrelation[i].translit}
                    </Text>
                  </View>
                );
              }
              if (i + 1 == listrelation.length) {
                this.textori2.push(
                  <View
                    key={"text original 2" + i}
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      textAlign: "left",
                    }}
                  >
                    {this.textori}
                  </View>
                );
                this.textori = [];

                newv = book_info.verse;
              }
            }


            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );
          }





        }
      );
    }
    catch (e) {
      console.log(e);
    }
  }



  GetOriginalLanguageText(lang_code, ver_code, book_lang_code, book_name, originalbook_name) {
    this.list_vid = "";

    this.start_i = COBible.getChapterVerse(
      COBible.getBookChapter(parseInt(this.state.book_id, 10)).start +
      parseInt(this.state.chapter_no, 10)
    ).start;
    this.end_i =
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.state.book_id, 10)).start +
        parseInt(this.state.chapter_no, 10)
      ).start +
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.state.book_id, 10)).start +
        parseInt(this.state.chapter_no, 10)
      ).end;

    for (let i = this.start_i + 1; i <= this.end_i; i++) {
      this.list_vid = this.list_vid + "," + i.toString();
    }
    this.list_vid = this.list_vid.substr(1);

    this.props.ACT_setTempBibleVersion(this.props.STORE_BIBLE.BIBLE_VERSION);
    this.temporary_bible_version = this.state.bibleversion;
    this.props.SetTemp;
    this.original_language = [];
    this.setState({
      isLoading: false,
      original_language_flag: true,
      bibleversion: this.ori_ver_code.toUpperCase(),
      isLoadingOriginalLanguage: false,

    });
    let key =
      this.constructor.name +
      "_" +
      lang_code +
      ver_code +
      book_lang_code +
      this.list_vid +
      book_name + originalbook_name;
    console.log(key);
    let storeBible = this.props.STORE_BIBLE;
    let storeCache = storeBible.CACHE_DATA;
    {
      if (
        lang_code == "hbo" &&
        Number(this.state.book_id) < 40 &&
        (ver_code === "bhs" || ver_code === "wlc" || ver_code === "bhsa")
      ) {



        if (this.props.STORE_BIBLE.OFFLINE == true) {
          this.GetOfflineOriginalLanguageText(lang_code, ver_code);
        }
        else {

          let urloriginallanguage =
            "https://sabdapro.com:3002/App/app_orilang_token?limit=100&skip=0&ver_code=" +
            ver_code +
            "&lang_code=" +
            lang_code +
            "&book_lang_code=" +
            book_lang_code +
            "&type_search=L&list_vid=" +
            this.list_vid;
          this.textori = [];
          this.textori2 = [];
          fetch(urloriginallanguage)
            .then((response) => response.json())
            .then((responseJson) => {
              let listtoken = responseJson.data.list_token
              this.verse_line = "";
              let bcv = "";
              let oldbcv = "";
              let oldv = "";
              let newv = "";
              for (let i = 0; i < listtoken.length; i++) {
                oldbcv =
                  listtoken[i].book_abbr +
                  " " +
                  listtoken[i].chapter +
                  ":" +
                  listtoken[i].verse;

                oldv = listtoken[i].verse;
                if (
                  (listtoken[i].seq === 1 && i !== 0) ||
                  i + 1 == listtoken.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    listtoken[i].book_abbr +
                    " " +
                    listtoken[i].chapter +
                    ":" +
                    listtoken[i].verse;
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {bcv}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit_ascii}
                      </Text>
                      <TouchableOpacity
                        key={"to strong bhs " + i}
                        onPress={() => {
                          const { navigate } = this.props.navigation;
                          navigate("WordStudy", {
                            strongnumber: listtoken[i].strong,
                            wordstrong: listtoken[i].translit_ascii,
                            language: this.state.language,
                          });
                        }}
                      >
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                          {" "}
                          {listtoken[i].strong}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {" "}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit_ascii}
                      </Text>
                      <TouchableOpacity
                        key={"to strong bhs " + i}
                        onPress={() => {
                          const { navigate } = this.props.navigation;
                          navigate("WordStudy", {
                            strongnumber: listtoken[i].strong,
                            wordstrong: listtoken[i].translit_ascii,
                            language: this.state.language,
                          });
                        }}
                      >
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                          {" "}
                          {listtoken[i].strong}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
                if (i + 1 == listtoken.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
              }

              this.props.ACT_setCacheData(key, this.original_language);
              this.setState(
                {
                  isLoading: true,
                  isLoadingOriginalLanguage: true,

                },
                () => { }
              );
            });
        }

      } else if (
        lang_code === "parallel-hebrew-text" &&
        Number(this.state.book_id) < 40
      ) {
        let urloriginallanguage =
          "https://sabdapro.com:3002/App/app_par_orilang?limit=100&skip=0&lang_type=H&book_lang_code=eng&fg_bib_type=O&type_search=L&list_vid=" +
          this.list_vid;

        fetch(urloriginallanguage)
          .then((response) => response.json())
          .then((responseJson) => {
            let listverse = responseJson.data.list_verse
            let listres = responseJson.data.list_res

            this.textori2 = [];

            let bcv = "";
            this.textori = "";
            for (let z = 0; z < listverse.length; z++) {
              this.textori1A = [];
              this.textori1B = [];

              for (let i = 0; i < listverse[z].list_token.length; i++) {
                if (listverse[z].list_token[i].ver_code === "bhsa") {
                  this.textori1A.push(
                    <View
                      key={"token 2" + z + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,

                        textAlign: "right",
                      }}
                    >
                      <Text style={{ textAlign: "right", fontSize: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listverse[z].list_token[i].token}
                      </Text>
                    </View>
                  );
                }
                if (listverse[z].list_token[i].ver_code === "wlc") {
                  {
                    this.textori1B.push(
                      <View
                        key={"token 2" + z + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,

                          textAlign: "right",
                        }}
                      >
                        <Text style={{ textAlign: "right", fontSize: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listverse[z].list_token[i].token}
                        </Text>
                      </View>
                    );
                  }
                }

                if (listverse[z].list_token[i].seq === 1 && i !== 0) {
                  bcv =
                    listverse[z].list_token[i].book_abbr +
                    " " +
                    listverse[z].list_token[i].chapter +
                    ":" +
                    listverse[z].list_token[i].verse;
                  this.textori = bcv;
                }
              }

              this.textori2.push(
                <View
                  key={"text original" + z}
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    textAlign: "right",
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                  >
                    {this.textori}
                  </Text>

                  <View
                    key={"text original A" + z}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View key={"text original A1" + z}>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {"BHSA"}
                      </Text>
                    </View>
                    <View
                      key={"text original A2" + z}
                      style={{
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori1A}
                    </View>
                  </View>
                  <View
                    key={"text original B" + z}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View key={"text original B1" + z}>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {"WLC"}
                      </Text>
                    </View>
                    <View
                      key={"text original B2" + z}
                      style={{
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                      }}
                    >
                      {this.textori1B}
                    </View>
                  </View>
                </View>
              );
            }

            this.props.ACT_setCacheData(key, this.original_language);
            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );
          });
      } else if (ver_code === "lxx" && Number(this.state.book_id) < 40) {

        if (this.props.STORE_BIBLE.OFFLINE == true) {

          this.GetOfflineOriginalLanguageText("grc", ver_code)
        }
        else {
          let urloriginallanguage =
            "https://sabdapro.com:3002/App/app_orilang_token?limit=10&skip=0&ver_code=" +
            ver_code +
            "&lang_code=" +
            lang_code +
            "&book_lang_code=" +
            book_lang_code +
            "&type_search=L&list_vid=" +
            this.list_vid;

          this.textori = [];
          this.textori2 = [];
          fetch(urloriginallanguage)
            .then((response) => response.json())
            .then((responseJson) => {

              let listtoken = responseJson.data.list_token
              this.verse_line = "";
              let bcv = "";
              let oldbcv = "";
              let oldv = "";
              let newv = "";
              for (let i = 0; i < listtoken.length; i++) {
                oldbcv =
                  listtoken[i].book_abbr +
                  " " +
                  listtoken[i].chapter +
                  ":" +
                  listtoken[i].verse;

                oldv = listtoken[i].verse;
                if (
                  (listtoken[i].seq === 0 && i !== 0) ||
                  i + 1 == listtoken.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    listtoken[i].book_abbr +
                    " " +
                    listtoken[i].chapter +
                    ":" +
                    listtoken[i].verse;
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {bcv}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit_ascii}
                      </Text>
                      <TouchableOpacity
                        key={"to strong bhs " + i}
                        onPress={() => {
                          const { navigate } = this.props.navigation;
                          navigate("WordStudy", {
                            strongnumber: listtoken[i].strong,
                            wordstrong: listtoken[i].translit_ascii,
                            language: this.state.language,
                          });
                        }}
                      >
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                          {" "}
                          {listtoken[i].strong}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 4,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {" "}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listtoken[i].translit_ascii}
                      </Text>
                      <TouchableOpacity
                        key={"to strong bhs " + i}
                        onPress={() => {
                          const { navigate } = this.props.navigation;
                          navigate("WordStudy", {
                            strongnumber: listtoken[i].strong,
                            wordstrong: listtoken[i].translit_ascii,
                            language: this.state.language,
                          });
                        }}
                      >
                        <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                          {" "}
                          {listtoken[i].strong}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }

                if (i + 1 == listtoken.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listtoken[i].verse;
                }
              }

              this.props.ACT_setCacheData(key, this.original_language);
              this.setState(
                {
                  isLoading: true,
                  isLoadingOriginalLanguage: true,

                },
                () => { }
              );
            });
        }


      } else if (
        lang_code === "parallel-greek-text" &&
        Number(this.state.book_id) < 40
      ) {
        let urloriginallanguage =
          "https://sabdapro.com:3002/App/app_par_orilang?limit=6&skip=0&lang_type=G&book_lang_code=eng&fg_bib_type=O&type_search=L&list_vid=" +
          this.list_vid;

        fetch(urloriginallanguage)
          .then((response) => response.json())
          .then((responseJson) => {

            let listverse = responseJson.data.list_verse
            let listres = responseJson.data.list_res

            this.textori2 = [];

            let bcv = "";
            this.textori = "";
            for (let z = 0; z < listverse.length; z++) {
              this.textori1A = [];

              for (let i = 0; i < listverse[z].list_token.length; i++) {
                if (listverse[z].list_token[i].ver_code === "lxx") {
                  this.textori1A.push(
                    <View
                      key={"token 2" + z + i}
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 15,
                        textAlign: "left",
                      }}
                    >
                      <Text style={{ textAlign: "left", fontSize: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listverse[z].list_token[i].token}
                      </Text>
                    </View>
                  );
                }

                if (listverse[z].list_token[i].seq === 1 && i !== 0) {
                  bcv =
                    listverse[z].list_token[i].book_abbr +
                    " " +
                    listverse[z].list_token[i].chapter +
                    ":" +
                    listverse[z].list_token[i].verse;
                  this.textori = bcv;
                }
              }

              this.textori2.push(
                <View
                  key={"text original" + z}
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    textAlign: "left",
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingHorizontal: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                  >
                    {this.textori}
                  </Text>

                  <View
                    key={"text original A" + z}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View key={"text original A1" + z}>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {"LXX"}
                      </Text>
                    </View>
                    <View
                      key={"text original A2" + z}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      {this.textori1A}
                    </View>
                  </View>
                </View>
              );
            }

            this.props.ACT_setCacheData(key, this.original_language);
            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );
          });
      } else if (
        Number(this.state.book_id) < 40 &&
        (lang_code === "interlinear-biblia" ||
          lang_code === "interlinear-westminister")
      ) {
        if (lang_code === "interlinear-biblia") this.itl_id = this.itl_id_bhs;
        if (lang_code === "interlinear-westminister")
          this.itl_id = this.itl_id_wlc;

        let rel_lang_code = "eng";
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb")
          rel_lang_code = "ind";

        if (this.props.STORE_BIBLE.OFFLINE == true) {
          this.GetOfflineITLTextHebrew("original", this.itl_id, rel_lang_code, ver_code, this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase(), rel_lang_code)
        }
        else {
          let urloriginallanguage =
            "https://sabdapro.com:3002/App/app_itl_data?limit=100&skip=0&itl_id=" +
            this.itl_id +
            "&rel_lang_code=" +
            rel_lang_code +
            "&ver_code_src=" +
            ver_code +
            "&lang_code_src=hbo&ver_code_tgt=" +
            this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() +
            "&lang_code_tgt=" +
            rel_lang_code +
            "&book_lang_code=" +
            rel_lang_code +
            "&type_search=L&list_vid=" +
            this.list_vid;
          this.textori = [];
          this.textori2 = [];
          console.log(urloriginallanguage);
          fetch(urloriginallanguage)
            .then((response) => response.json())
            .then((responseJson) => {

              let listrelation = responseJson.data.list_relation
              let bcv = "";
              let oldbcv = "";
              let oldv = "";
              let newv = "";
              for (let i = 0; i < listrelation.length; i++) {
                oldbcv =
                  listrelation[i].book_abbr +
                  " " +
                  listrelation[i].chapter +
                  ":" +
                  listrelation[i].verse;

                oldv = listrelation[i].verse;

                this.textstrong = [];
                this.text_token = "";
                let strong_numbers = "";
                if (
                  !(
                    listrelation[i].data_tgt === undefined ||
                    listrelation[i].data_tgt.length == 0
                  )
                ) {
                  strong_numbers = listrelation[i].data_tgt[0].strong;
                  this.text_token = listrelation[i].data_tgt[0].token;
                }
                let array_strong = strong_numbers.split(",");
                for (let j = 0; j < array_strong.length; j++) {
                  this.textstrong.push(
                    <TouchableOpacity
                      key={"to strong bhs " + i + j}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: array_strong[j],
                          wordstrong: listrelation[i].translit_ascii,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left", }}>
                        {array_strong[j]}{" "}
                      </Text>
                    </TouchableOpacity>
                  );
                }

                if (
                  (listrelation[i].seq === 1 && i !== 0) ||
                  i + 1 == listrelation.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listrelation[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    listrelation[i].book_abbr +
                    " " +
                    listrelation[i].chapter +
                    ":" +
                    listrelation[i].verse;
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {bcv}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].translit_ascii}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {" "}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].translit_ascii}
                      </Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                    </View>
                  );
                }
                if (i + 1 == listrelation.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row-reverse",
                        flexWrap: "wrap",
                        textAlign: "right",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listrelation[i].verse;
                }
              }

              this.props.ACT_setCacheData(key, this.original_language);
              this.setState(
                {
                  isLoading: true,
                  isLoadingOriginalLanguage: true,

                },
                () => { }
              );
            });

        }

      } else if (
        Number(this.state.book_id) < 40 &&
        (lang_code === "interlinear-biblia-reversed" ||
          lang_code === "interlinear-westminister-reversed")
      ) {
        if (lang_code === "interlinear-biblia-reversed")
          this.itl_id = this.itl_id_bhs;
        if (lang_code === "interlinear-westminister-reversed")
          this.itl_id = this.itl_id_wlc;

        let rel_lang_code = "eng";
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb") this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase()
        rel_lang_code = "ind";

        if (this.props.STORE_BIBLE.OFFLINE == true) {
          this.GetOfflineITLTextHebrew("reversed", this.itl_id, rel_lang_code, ver_code)
        }
        else {
          let urloriginallanguage =
            "https://sabdapro.com:3002/App/app_itl_data?limit=100&skip=0&itl_id=" +
            this.itl_id +
            "&rel_lang_code=" +
            rel_lang_code +
            "&ver_code_src=" +
            this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() +
            "&lang_code_src=" +
            rel_lang_code +
            "&ver_code_tgt=" +
            ver_code +
            "&lang_code_tgt=hbo" +
            "&book_lang_code=" +
            rel_lang_code +
            "&type_search=L&list_vid=" +
            this.list_vid;
          this.textori = [];
          this.textori2 = [];

          fetch(urloriginallanguage)
            .then((response) => response.json())
            .then((responseJson) => {
              let listrelation = responseJson.data.list_relation
              let bcv = "";
              let oldbcv = "";
              let oldv = "";
              let newv = "";
              for (let i = 0; i < listrelation.length; i++) {
                oldbcv =
                  listrelation[i].book_abbr +
                  " " +
                  listrelation[i].chapter +
                  ":" +
                  listrelation[i].verse;

                oldv = listrelation[i].verse;

                this.textstrong = [];
                this.text_token = "";
                this.text_translit_ascii = "";
                let strong_numbers = "";
                if (
                  !(
                    listrelation[i].data_tgt === undefined ||
                    listrelation[i].data_tgt.length == 0
                  )
                ) {
                  strong_numbers = listrelation[i].data_tgt[0].strong;
                  this.text_token = listrelation[i].data_tgt[0].token;
                  this.text_translit_ascii =
                    listrelation[i].data_tgt[0].translit_ascii;
                }
                let array_strong = strong_numbers.split(",");
                for (let j = 0; j < array_strong.length; j++) {
                  this.textstrong.push(
                    <TouchableOpacity
                      key={"to strong bhs " + i + j}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: array_strong[j],
                          wordstrong: listrelation[i].translit_ascii,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                        {array_strong[j]}{" "}
                      </Text>
                    </TouchableOpacity>
                  );
                }

                if (
                  (listrelation[i].seq === 1 && i !== 0) ||
                  i + 1 == listrelation.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listrelation[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    listrelation[i].book_abbr +
                    " " +
                    listrelation[i].chapter +
                    ":" +
                    listrelation[i].verse;
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {bcv}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token}
                      </Text>
                      <Text style={{ textAlign: "left" }}>{this.text_token}</Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_translit_ascii}
                      </Text>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {" "}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_translit_ascii}
                      </Text>
                    </View>
                  );
                }
                if (i + 1 == listrelation.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listrelation[i].verse;
                }
              }

              this.props.ACT_setCacheData(key, this.original_language);
              this.setState(
                {
                  isLoading: true,
                  isLoadingOriginalLanguage: true,

                },
                () => { }
              );
            });

        }


      } else if (
        Number(this.state.book_id) > 39 &&
        lang_code !== "esv-westcott-usb4" &&
        lang_code !== "esv-westcott-usb4-reversed" &&
        (ver_code === "tr" ||
          ver_code === "tis" ||
          ver_code === "wh" ||
          ver_code === "whnu")

      ) {
        if (this.props.STORE_BIBLE.OFFLINE == true) {

          this.GetOfflineOriginalLanguageText("grc", ver_code)
        }
        else {
          let urloriginallanguage =
            "https://sabdapro.com:3002/App/app_orilang_token?limit=10&skip=0&ver_code=" +
            ver_code +
            "&lang_code=" +
            lang_code +
            "&book_lang_code=" +
            book_lang_code +
            "&type_search=L&list_vid=" +
            this.list_vid;

          this.textori = [];
          this.textori2 = [];

          fetch(urloriginallanguage)
            .then((response) => response.json())
            .then((responseJson) => {

              let listtoken = responseJson.data.list_token
              this.verse_line = "";
              let bcv = "";
              let oldbcv = "";
              let oldv = "";
              let newv = "";
              let strong_numbers = "";
              let text_token = "";
              let text_translit_ascii = "";
              for (let i = 0; i < listtoken.length; i++) {
                oldbcv =
                  listtoken[i].book_abbr +
                  " " +
                  listtoken[i].chapter +
                  ":" +
                  listtoken[i].verse;

                oldv = listtoken[i].verse;
                this.textstrong = [];
                if (listtoken[i].strong !== null) {
                  strong_numbers = listtoken[i].strong;
                  this.text_token = listtoken[i].token;
                  this.text_translit_ascii = listtoken[i].translit_ascii;
                }

                let array_strong = strong_numbers.split(";");
                for (let j = 0; j < array_strong.length; j++) {
                  this.textstrong.push(
                    <TouchableOpacity
                      key={"to strong bhs " + i + j}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: array_strong[j],
                          wordstrong: listtoken[i].translit_ascii,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left", }}>
                        {array_strong[j]}{" "}
                      </Text>
                    </TouchableOpacity>
                  );
                }
                let listrelationtoken = listtoken[i].token;
                if (
                  listrelationtoken.indexOf("{") > -1 &&
                  listrelationtoken.indexOf("}" > -1)
                ) {
                  listrelationtoken = listrelationtoken
                    .replace(/{VAR/g, "\nVAR")
                    .replace(/}/g, "")
                    .replace(/<(?!\/?a>)[^>]*>/g, "");
                  if (
                    (listtoken[i].seq === 1 && i !== 0) ||
                    i + 1 == listtoken.length
                  ) {
                    this.textori2.push(
                      <View
                        key={"text original" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "right",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listtoken[i].verse;
                  }
                  if (oldbcv !== bcv) {
                    bcv =
                      listtoken[i].book_abbr +
                      " " +
                      listtoken[i].chapter +
                      ":" +
                      listtoken[i].verse;
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 4,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {bcv}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                            paddingTop: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                          onPress={() => {
                            this.ClickReaction2(listrelationtoken);
                          }}
                        >
                          {"\n\n\n"}
                          {"var"}
                        </Text>

                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listtoken[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                      </View>
                    );
                  } else {
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 4,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {" "}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                            paddingTop: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                          onPress={() => {
                            this.ClickReaction2(listrelationtoken);
                          }}
                        >
                          {"\n\n\n"}
                          {"var"}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listtoken[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                      </View>
                    );
                  }

                  if (i + 1 == listtoken.length) {
                    this.textori2.push(
                      <View
                        key={"text original 2" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "right",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listtoken[i].verse;
                  }
                } else {
                  if (
                    (listtoken[i].seq === 1 && i !== 0) ||
                    i + 1 == listtoken.length
                  ) {
                    this.textori2.push(
                      <View
                        key={"text original" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "right",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listtoken[i].verse;
                  }
                  if (oldbcv !== bcv) {
                    bcv =
                      listtoken[i].book_abbr +
                      " " +
                      listtoken[i].chapter +
                      ":" +
                      listtoken[i].verse;
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 4,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {bcv}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listtoken[i].token}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listtoken[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                      </View>
                    );
                  } else {
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 4,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {" "}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listtoken[i].token}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listtoken[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                      </View>
                    );
                  }

                  if (i + 1 == listtoken.length) {
                    this.textori2.push(
                      <View
                        key={"text original 2" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "right",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listtoken[i].verse;
                  }
                }
              }

              this.props.ACT_setCacheData(key, this.original_language);
              this.setState(
                {
                  isLoading: true,
                  isLoadingOriginalLanguage: true,

                },
                () => { }
              );
            });
        }
      } else if (
        lang_code === "parallel-greek-text-greek" &&
        Number(this.state.book_id) > 39
      ) {
        let urloriginallanguage =
          "https://sabdapro.com:3002/App/app_par_orilang?limit=6&skip=0&lang_type=G&book_lang_code=eng&fg_bib_type=N&type_search=L&list_vid=" +
          this.list_vid;

        fetch(urloriginallanguage)
          .then((response) => response.json())
          .then((responseJson) => {

            let listverse = responseJson.data.list_verse
            let listres = responseJson.data.list_res

            this.textori2 = [];

            let bcv = "";
            this.textori = "";
            for (let z = 0; z < listverse.length; z++) {
              this.textori1A = [];
              this.textori1B = [];
              this.textori1C = [];
              this.textori1D = [];
              for (let i = 0; i < listverse[z].list_token.length; i++) {
                if (listverse[z].list_token[i].ver_code === "tr") {
                  this.textori1A.push(
                    <View
                      key={"token 2" + z + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,

                        textAlign: "left",
                      }}
                    >
                      <Text style={{ textAlign: "left", fontSize: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listverse[z].list_token[i].token}
                      </Text>
                    </View>
                  );
                }
                if (listverse[z].list_token[i].ver_code === "tis") {
                  this.textori1B.push(
                    <View
                      key={"token 2" + z + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,

                        textAlign: "left",
                      }}
                    >
                      <Text style={{ textAlign: "left", fontSize: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listverse[z].list_token[i].token}
                      </Text>
                    </View>
                  );
                }
                if (listverse[z].list_token[i].ver_code === "wh") {
                  this.textori1C.push(
                    <View
                      key={"token 2" + z + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,

                        textAlign: "left",
                      }}
                    >
                      <Text style={{ textAlign: "left", fontSize: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listverse[z].list_token[i].token}
                      </Text>
                    </View>
                  );
                }
                if (listverse[z].list_token[i].ver_code === "whnu") {
                  this.textori1D.push(
                    <View
                      key={"token 2" + z + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 15,

                        textAlign: "left",
                      }}
                    >
                      <Text style={{ textAlign: "left", fontSize: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listverse[z].list_token[i].token}
                      </Text>
                    </View>
                  );
                }

                if (listverse[z].list_token[i].seq === 1 && i !== 0) {
                  bcv =
                    listverse[z].list_token[i].book_abbr +
                    " " +
                    listverse[z].list_token[i].chapter +
                    ":" +
                    listverse[z].list_token[i].verse;
                  this.textori = bcv;
                }
              }

              this.textori2.push(
                <View
                  key={"text original" + z}
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    textAlign: "left",
                    borderTopWidth: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingHorizontal: 15,
                  }}
                >
                  <Text
                    style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                  >
                    {this.textori}
                  </Text>

                  <View
                    key={"text original A" + z}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View key={"text original A1" + z}>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {"TR (1984)"}
                      </Text>
                    </View>
                    <View
                      key={"text original A2" + z}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                      }}
                    >
                      {this.textori1A}
                    </View>
                  </View>
                  <View
                    key={"text original B" + z}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View key={"text original B1" + z}>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {"TIS"}
                      </Text>
                    </View>
                    <View
                      key={"text original B2" + z}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {this.textori1B}
                    </View>
                  </View>
                  <View
                    key={"text original C" + z}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View key={"text original C1" + z}>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {"WH (1881)"}
                      </Text>
                    </View>
                    <View
                      key={"text original C2" + z}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {this.textori1C}
                    </View>
                  </View>
                  <View
                    key={"text original D" + z}
                    style={{
                      flexDirection: "column",
                    }}
                  >
                    <View key={"text original D1" + z}>
                      <Text
                        style={{
                          textAlign: "left",
                          fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                        }}
                      >
                        {"WHNU"}
                      </Text>
                    </View>
                    <View
                      key={"text original D2" + z}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {this.textori1D}
                    </View>
                  </View>
                </View>
              );
            }

            this.props.ACT_setCacheData(key, this.original_language);
            this.setState(
              {
                isLoading: true,
                isLoadingOriginalLanguage: true,

              },
              () => { }
            );
          });
      } else if (
        lang_code === "esv-westcott-usb4" &&
        Number(this.state.book_id) > 39
      ) {
        if (lang_code === "esv-westcott-usb4") this.itl_id = this.itl_id_whnu;

        let rel_lang_code = "eng";
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb")
          rel_lang_code = "ind";

        if (this.props.STORE_BIBLE.OFFLINE == true) {
          this.GetOfflineITLTextGreek("original", this.itl_id, rel_lang_code, ver_code, this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase(), rel_lang_code)
        }
        else {
          let urloriginallanguage =
            "https://sabdapro.com:3002/App/app_itl_data?limit=11&skip=0&itl_id=" +
            this.itl_id +
            "&rel_lang_code=" +
            rel_lang_code +
            "&ver_code_src=" +
            ver_code +
            "&lang_code_src=grc&ver_code_tgt=" +
            this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() +
            "&lang_code_tgt=" +
            rel_lang_code +
            "&book_lang_code=" +
            rel_lang_code +
            "&type_search=L&list_vid=" +
            this.list_vid;
          this.textori = [];
          this.textori2 = [];
          console.log(urloriginallanguage);
          fetch(urloriginallanguage)
            .then((response) => response.json())
            .then((responseJson) => {

              let listrelation = responseJson.data.list_relation
              let bcv = "";
              let oldbcv = "";
              let oldv = "";
              let newv = "";
              for (let i = 0; i < listrelation.length; i++) {
                oldbcv =
                  listrelation[i].book_abbr +
                  " " +
                  listrelation[i].chapter +
                  ":" +
                  listrelation[i].verse;

                oldv = listrelation[i].verse;

                this.textstrong = [];
                this.text_token = "";
                let strong_numbers = "";
                if (
                  !(
                    listrelation[i].data_tgt === undefined ||
                    listrelation[i].data_tgt.length == 0
                  )
                ) {
                  strong_numbers = listrelation[i].data_tgt[0].strong;
                  this.text_token = listrelation[i].data_tgt[0].token;
                }
                let array_strong = strong_numbers.split(";");
                for (let j = 0; j < array_strong.length; j++) {
                  this.textstrong.push(
                    <TouchableOpacity
                      key={"to strong bhs " + i + j}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: array_strong[j],
                          wordstrong: listrelation[i].translit_ascii,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left", }}>
                        {array_strong[j]}{" "}
                      </Text>
                    </TouchableOpacity>
                  );
                }
                let listrelationtoken = listrelation[i].token;
                if (
                  listrelationtoken.indexOf("{") > -1 &&
                  listrelationtoken.indexOf("}" > -1)
                ) {
                  listrelationtoken = listrelationtoken
                    .replace(/{VAR/g, "\nVAR")
                    .replace(/}/g, "")
                    .replace(/<(?!\/?a>)[^>]*>/g, "");
                  if (
                    (listrelation[i].seq === 1 && i !== 0) ||
                    i + 1 == listrelation.length
                  ) {
                    this.textori2.push(
                      <View
                        key={"text original" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "right",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listrelation[i].verse;
                  }
                  if (oldbcv !== bcv) {
                    bcv =
                      listrelation[i].book_abbr +
                      " " +
                      listrelation[i].chapter +
                      ":" +
                      listrelation[i].verse;
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 10,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {bcv}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                            paddingTop: 20,
                          }}
                          onPress={() => {
                            this.ClickReaction2(listrelationtoken);
                          }}
                        >
                          {"\n\n\n"}
                          {"var"}
                        </Text>
                        <Text style={{ textAlign: "left" }}>
                          {listrelation[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {this.text_token}
                        </Text>
                      </View>
                    );
                  } else {
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 10,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {" "}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                            paddingTop: 20, color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                          onPress={() => {
                            this.ClickReaction2(listrelationtoken);
                          }}
                        >
                          {"\n\n\n"}
                          {"var"}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listrelation[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {this.text_token}
                        </Text>
                      </View>
                    );
                  }
                  if (i + 1 == listrelation.length) {
                    this.textori2.push(
                      <View
                        key={"text original 2" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "left",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listrelation[i].verse;
                  }
                } else {
                  if (
                    (listrelation[i].seq === 1 && i !== 0) ||
                    i + 1 == listrelation.length
                  ) {
                    this.textori2.push(
                      <View
                        key={"text original" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "right",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listrelation[i].verse;
                  }
                  if (oldbcv !== bcv) {
                    bcv =
                      listrelation[i].book_abbr +
                      " " +
                      listrelation[i].chapter +
                      ":" +
                      listrelation[i].verse;
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 10,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {bcv}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listrelation[i].token}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listrelation[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {this.text_token}
                        </Text>
                      </View>
                    );
                  } else {
                    this.textori.push(
                      <View
                        key={"token 2" + i}
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 15,
                          paddingBottom: 10,
                          textAlign: "left",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR
                          }}
                        >
                          {" "}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listrelation[i].token}
                        </Text>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {listrelation[i].translit_ascii}
                        </Text>
                        <View
                          key={"token 3" + i}
                          style={{
                            flexDirection: "row",
                            textAlign: "left",
                          }}
                        >
                          {this.textstrong}
                        </View>
                        <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                          {this.text_token}
                        </Text>
                      </View>
                    );
                  }
                  if (i + 1 == listrelation.length) {
                    this.textori2.push(
                      <View
                        key={"text original 2" + i}
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          textAlign: "left",
                        }}
                      >
                        {this.textori}
                      </View>
                    );
                    this.textori = [];

                    newv = listrelation[i].verse;
                  }
                }
              }

              this.props.ACT_setCacheData(key, this.original_language);
              this.setState(
                {
                  isLoading: true,
                  isLoadingOriginalLanguage: true,

                },
                () => { }
              );
            });
        }

      } else if (
        lang_code === "esv-westcott-usb4-reversed" &&
        Number(this.state.book_id) > 39
      ) {
        if (lang_code === "esv-westcott-usb4-reversed")
          this.itl_id = this.itl_id_whnu;



        let rel_lang_code = "eng";
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb")
          rel_lang_code = "ind";

        if (this.props.STORE_BIBLE.OFFLINE == true) {
          this.GetOfflineITLTextGreek("reversed", this.itl_id, rel_lang_code, ver_code, this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase(), rel_lang_code)
        }
        else {
          let urloriginallanguage =
            "https://sabdapro.com:3002/App/app_itl_data?limit=100&skip=0&itl_id=" +
            this.itl_id +
            "&rel_lang_code=" +
            rel_lang_code +
            "&ver_code_src=" +
            this.props.STORE_BIBLE.TEMP_BIBLE_VERSION.toLowerCase() +
            "&lang_code_src=" +
            rel_lang_code +
            "&ver_code_tgt=" +
            ver_code +
            "&lang_code_tgt=grc" +
            "&book_lang_code=" +
            rel_lang_code +
            "&type_search=L&list_vid=" +
            this.list_vid;
          this.textori = [];
          this.textori2 = [];

          fetch(urloriginallanguage)
            .then((response) => response.json())
            .then((responseJson) => {

              let listrelation = responseJson.data.list_relation
              let bcv = "";
              let oldbcv = "";
              let oldv = "";
              let newv = "";
              for (let i = 0; i < listrelation.length; i++) {
                oldbcv =
                  listrelation[i].book_abbr +
                  " " +
                  listrelation[i].chapter +
                  ":" +
                  listrelation[i].verse;

                oldv = listrelation[i].verse;

                this.textstrong = [];
                this.text_token = "";
                this.text_translit_ascii = "";
                let strong_numbers = "";
                if (
                  !(
                    listrelation[i].data_tgt === undefined ||
                    listrelation[i].data_tgt.length == 0
                  )
                ) {
                  strong_numbers = listrelation[i].data_tgt[0].strong;
                  this.text_token = listrelation[i].data_tgt[0].token;

                  this.text_translit_ascii =
                    listrelation[i].data_tgt[0].translit_ascii;
                }
                let array_strong = strong_numbers.split(";");
                for (let j = 0; j < array_strong.length; j++) {
                  this.textstrong.push(
                    <TouchableOpacity
                      key={"to strong bhs " + i + j}
                      onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate("WordStudy", {
                          strongnumber: array_strong[j],
                          wordstrong: listrelation[i].translit_ascii,
                          language: this.state.language,
                        });
                      }}
                    >
                      <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR_URL, textAlign: "left" }}>
                        {array_strong[j]}{" "}
                      </Text>
                    </TouchableOpacity>
                  );
                }

                if (
                  (listrelation[i].seq === 1 && i !== 0) ||
                  i + 1 == listrelation.length
                ) {
                  this.textori2.push(
                    <View
                      key={"text original" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                        paddingHorizontal: 15,
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listrelation[i].verse;
                }
                if (oldbcv !== bcv) {
                  bcv =
                    listrelation[i].book_abbr +
                    " " +
                    listrelation[i].chapter +
                    ":" +
                    listrelation[i].verse;
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 5,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {bcv}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_translit_ascii}
                      </Text>
                    </View>
                  );
                } else {
                  this.textori.push(
                    <View
                      key={"token 2" + i}
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 5,
                        paddingBottom: 10,
                        textAlign: "left",
                      }}
                    >
                      <Text
                        style={{ textAlign: "left", fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR }}
                      >
                        {" "}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {listrelation[i].token}
                      </Text>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.text_token}</Text>
                      <View
                        key={"token 3" + i}
                        style={{
                          flexDirection: "row",
                          textAlign: "left",
                        }}
                      >
                        {this.textstrong}
                      </View>
                      <Text style={{ textAlign: "left", color: this.props.STORE_STYLE.TEXT_COLOR }}>
                        {this.text_translit_ascii}
                      </Text>
                    </View>
                  );
                }
                if (i + 1 == listrelation.length) {
                  this.textori2.push(
                    <View
                      key={"text original 2" + i}
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        textAlign: "left",
                        paddingHorizontal: 15,
                      }}
                    >
                      {this.textori}
                    </View>
                  );
                  this.textori = [];

                  newv = listrelation[i].verse;
                }
              }

              this.props.ACT_setCacheData(key, this.original_language);
              this.setState(
                {
                  isLoading: true,
                  isLoadingOriginalLanguage: true,

                },
                () => { }
              );
            });
        }


      } else {
        this.textori2 = [];
        this.textori2.push(
          <View
            key={"wrong book and chapter"}
            style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          >
            <Text style={{ fontFamily: "NotoSans-Bold" }}>
              {DCT.getValue(
                "wrongbookchapter",
                this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
              )}
            </Text>
          </View>
        );

        this.setState(
          {
            isLoading: true,
            isLoadingOriginalLanguage: true,

          },
          () => { }
        );
      }
    }
  }
  _storeDataShowRealApp = async () => {
    this.setState({
      forthefirstime: false,

    });
    try {
      await AsyncStorage.setItem("showrealapp", "true");
    } catch (error) {
      console.log(error);
    }
  };
  async EndFirstTime() {
    this.setState({
      showRealApp: true,
      forthefirstime: true,
      firstimetext: DCT.getValue(
        "forthefirstime",
        this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
      )
    });

    setTimeout(() => {

      this.progressdownload += 20;
      this.setState({
        tick: 1
      });
    }, 2500);
    setTimeout(() => {

      this.progressdownload += 20;
      this.setState({
        tick: 2,
        firstimetext: DCT.getValue(
          "forthefirstime2",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        )
      });
    }, 5000);
    setTimeout(() => {

      this.progressdownload += 20;
      this.setState({
        tick: 3
      });
    }, 7500);
    setTimeout(() => {

      this.progressdownload += 20;
      this.setState({
        tick: 4,
        firstimetext: DCT.getValue(
          "forthefirstime3",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        )
      });
    }, 10000);
    setTimeout(() => {

      this.progressdownload += 20;
      this.setState({
        tick: 5,
        firstimetext: DCT.getValue(
          "done",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        )
      });
    }, 13500);
    setTimeout(() => {

      this._storeDataShowRealApp();
      this.props.navigation.setParams({
        handleSearch: this.searchHandler, toggleDrawer: this.DrawerToogle,
        handleAudio: this.audioHandler,
        isDarkMode: this.props.STORE_BIBLE.IS_SHOW_DARKMODE,
        showRealApp: true,
      });
      this._retriveDataBible();
      this.OnGOClick();

    }, 14000);

  }
  BottomNavigationClick(tabkey) {
    if (!this.maintenance || !this.state.isLoading) {
      const { navigate } = this.props.navigation;
      if (tabkey === "discovery") {
        navigate("Discovery", {
          book_id: this.state.book_id,
          chapter_no: this.state.chapter_no,
          language: this.state.language,
        });
      } else if (tabkey === "commentary") {
        navigate("Commentary", {
          book_id: this.state.book_id,
          chapter_no: this.state.chapter_no,
          language: this.state.language,
        });
      } else if (tabkey === "audio") {
        if (
          this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb" ||
          this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "esv" ||
          this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "av"
        ) {
          this.setState({ isplay: false });
          this._Stop();
          this.isplaying = false;
          this.refs.modal2.open();
          this.PlayAudio();
        } else {
          Alert.alert(
            DCT.getValue(
              "noaudio",
              this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            ),
            this.props.STORE_BIBLE.BIBLE_VERSION +
            " " +
            DCT.getValue(
              "noaudiodesc",
              this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            ),
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      } else if (tabkey === "entity") {
        this.OpenListEntity(
          this.state.book_id,
          this.state.chapter_no,
          this.state.language
        );
      } else if (tabkey === "parallel") {
        navigate("ParallelBible", {});
      } else if (tabkey === "more") {
        const { navigate } = this.props.navigation;
        navigate("More", {
          book_id: this.state.book_id,
          chapter_no: this.state.chapter_no,
          bibleversion: bibleversion,
          language: this.state.language,
        });
      } else if (tabkey === "original") {
        var bibleversion = this.state.bibleversion;
        bibleversion = bibleversion.toLowerCase();
        //this.ShowDialogEllipsisMore();

        const { navigate } = this.props.navigation;
        navigate("OriginalLanguage", {
          book_id: this.state.book_id,
          bibleversion: bibleversion,
          language: this.state.language,
        });
      }
    } else {
      Alert.alert(
        DCT.getValue(
          "maintenance",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        DCT.getValue(
          "maintenancedesc",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }
  ShowDialogVerse(text, verse) {
    this.setState(
      {

        cmt : true,
      }
    )
    this.setState(
      {
        showdialogverse: verse,
        showdialogtext: text,
        cmt : false,
      }
    )
    this.refs.modal1.open();
  }

  GoShowCMT(value) {
    alert(value);
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
                  justifyContent: "center",
                }}
              >
                {value}
              </View>
            </ScrollView>
          </DialogContent>
        ),
      },
      () => { }
    );
  }
  GoShowCMT2(value) {
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <View
              style={{
                flexDirection: "column",
                paddingTop: 20,
                paddingBottom: 150,
                justifyContent: "flex-end",
              }}
            >
              <Text>{value}</Text>
            </View>
            <View style={{ height: 10 }}></View>
          </DialogContent>
        ),
      },
      () => { }
    );
  }
  OpenCommentary(subentry_code) {
    const { navigate } = this.props.navigation;
    navigate("DetailCommentary", {
      entry_code: subentry_code,
      language: this.language,
      props: this.props,
    });
  }
  ClickReaction3(value, props) {
    props.setState({
      snackIsVisible: false,
      canisscroll: false,
    });
    var str = value.replace(/seterip/g, "-");
    var array = str.split("|");
    var vid = array[0];
    var verse = array[1];
    props.DisplaySnackBarVerse(
      vid,
      props.state.bibleversion.toLowerCase(),
      props.state.book_id,
      props.props.STORE_BIBLE.LANG_CODE.toLowerCase()
    );

  }
  ClickReaction2(token) {
    this.GoShowCMT2(token);
  }
  ClickReaction(value, props) {
    console.log(value);
    var str = value.replace(/seterip/g, "-");
    var array = str.split("|");
    var classnumber = array[0];
    var strongnumber = array[1];
    var wordstrong = array[2];
    var ver_code = "esv";
    if (props.props.STORE_BIBLE.LANG_CODE.toLowerCase() == "eng")
      ver_code = "esv";
    else ver_code = "tb";
    props.setState({
      snackIsVisible: false,
      canisscroll: false,
    });
    if (classnumber === "clsVref") {

      props.props.navigation.navigate("VerseScreen", {
        value: value,
      });
    } else if (classnumber === "clsCmt") {
      var strongnumber = array[1];
      strongnumber = strongnumber.replace("entry_code##", "");

      var urlcmtnumber =
        "https://sabdapro.com:3002/App/app_comment_detail?lang_code=" +
        props.catalog_language +
        "&entry_code=" +
        strongnumber;
      console.log(urlcmtnumber);
      fetch(urlcmtnumber)
        .then((response) => response.json())
        .then((responseJson) => {

          let commentdata = responseJson.data.list_comment
          if (commentdata.length > 0) {
            let text = commentdata[0].text;
            text = text.replace(/<para>/g, "");
            text = text.replace(/<\/para>/g, "");

            let rendertext = props.MyParser.DoParserDiscovery(text, props.props.STORE_BIBLE.IS_SHOW_DARKMODE);
            props.ShowDialogVerse(rendertext, " ");
          } else {
            console.log("error" + strongnumber);
          }
        });
    } else {
      var verse_id = array[3];
      let indexmorethanone = strongnumber.indexOf(",");
      console.log("strongnumber first time : " + strongnumber);
      let firsttimestrongnumber = strongnumber;
      while (indexmorethanone > 0) {
        indexmorethanone = strongnumber.indexOf(",");
        strongnumber = strongnumber.substring(Number(indexmorethanone) + 1);
      }
      console.log("strongnumber real : " + strongnumber);
      let mystrongnumber = "";
      if (Number(indexmorethanone) > 0) {
        console.log(indexmorethanone);
        console.log("Strong Greek " + strongnumber);
        mystrongnumber = strongnumber.substring(Number(indexmorethanone) + 1);
        console.log("Strong Greek " + mystrongnumber);
      } else {
        mystrongnumber = strongnumber;
      }
      try {
        if (strongnumber.substring(0, 1) === "H") {
          let mystrongnumber = JSON.stringify(
            JSON.parse(JSON.stringify(hebrew))[strongnumber]
          );

          let mytextstrongnumber = JSON.parse(mystrongnumber);
          props.refs.ReactNativeSnackBar.SnackBarClose();
          props.DisplaySnackBar(
            mytextstrongnumber[0].lemma,
            strongnumber,
            wordstrong,
            verse_id,
            props.state.book_id,
            props.props.STORE_BIBLE.LANG_CODE.toLowerCase()
          );
        } else if (strongnumber.substring(0, 1) === "G") {
          let mystrongnumber = JSON.stringify(
            JSON.parse(JSON.stringify(greek))[strongnumber]
          );

          let mytextstrongnumber = JSON.parse(mystrongnumber);

          props.refs.ReactNativeSnackBar.SnackBarClose();
          props.DisplaySnackBar(
            mytextstrongnumber[0].lemma,
            strongnumber,
            wordstrong,
            verse_id,
            props.state.book_id,
            props.props.STORE_BIBLE.LANG_CODE.toLowerCase()
          );
        }
      } catch (error) {
        indexmorethanone = firsttimestrongnumber.indexOf(",");
        firsttimestrongnumber = firsttimestrongnumber.substring(
          0,
          Number(indexmorethanone)
        );
        try {
          if (firsttimestrongnumber.substring(0, 1) === "H") {
            let mystrongnumber = JSON.stringify(
              JSON.parse(JSON.stringify(hebrew))[firsttimestrongnumber]
            );

            let mytextstrongnumber = JSON.parse(mystrongnumber);
            props.refs.ReactNativeSnackBar.SnackBarClose();
            props.DisplaySnackBar(
              mytextstrongnumber[0].lemma,
              firsttimestrongnumber,
              wordstrong,
              verse_id,
              props.state.book_id,
              props.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            );
          } else if (firsttimestrongnumber.substring(0, 1) === "G") {
            let mystrongnumber = JSON.stringify(
              JSON.parse(JSON.stringify(greek))[firsttimestrongnumber]
            );

            let mytextstrongnumber = JSON.parse(mystrongnumber);

            props.refs.ReactNativeSnackBar.SnackBarClose();
            props.DisplaySnackBar(
              mytextstrongnumber[0].lemma,
              firsttimestrongnumber,
              wordstrong,
              verse_id,
              props.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            );
          }
        } catch (error) {
          console.log("error : " + error);
        }
      }
      /*  
      setTimeout(() => {
  
        
        var urlstrongnumber =
          "https://sabdapro.com:3002/App/app_lex_strong?&lang_code=" +
          props.state.language +
          "&strong_aug=" +
          strongnumber;
  
        let text = "";
        fetch(urlstrongnumber)
          .then(response => response.json())
          .then(responseJson => {
            let strongnumberdata = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.lex_data
            );
            let mystrongnumber = JSON.parse(strongnumberdata);
            let strongnumberdisplay = mystrongnumber[0].strong;
            let lemma = mystrongnumber[0].lemma;
            
  
            props.refs.ReactNativeSnackBar.SnackBarClose();
            props.DisplaySnackBar(lemma, strongnumberdisplay, wordstrong);
          }, 700);
      }
      
      );
     */
    }

  }

  async OnGOClick() {
    console.log(this.isBibleESV)
    this.myversion = "";
    if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "esv")
      this.myversion = "English Standard Version";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "net")
      this.myversion = "New English Translation";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "av")
      this.myversion = "King James Version (Authorized)";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "tb")
      this.myversion = "Terjemahan Baru";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "avb")
      this.myversion = "Alkitab Versi Borneo";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "ayt")
      this.myversion = "Alkitab Yang Terbuka";

    this.bible_version = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.bible_version === "tb" ||
      this.bible_version === "ayt" ||
      this.bible_version === "avb"
    ) {
      this.catalog_language = "ind";
    } else {
      this.catalog_language = "eng";
    }
    this.book_chapter = DCT.getValue(
      "BL" + this.state.book_id,
      this.catalog_language
    );
    this.book_chapter_text = this.book_chapter + " " + this.state.chapter_no;
    {
      if (!this.maintenance) {
        this.setState({
          bibleversion: this.props.STORE_BIBLE.BIBLE_VERSION,
        });
        this.list_hover_attr = [];
        this.list_tag_exception = ["eshigh", "hebrew", "greek"];
        this.is_highlight = false;

        let storeBible = this.props.STORE_BIBLE;
        let storeCache = storeBible.CACHE_DATA;
        let changeSettings =
          this.props.STORE_BIBLE.IS_LINE_VIEW.toString() +
          this.props.STORE_BIBLE.IS_SHOW_NOTES.toString() +
          this.props.STORE_BIBLE.IS_SHOW_PERICOPES.toString() +
          this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT.toString();
        const { chapter_no, book_id } = this.state;

        let key =
          this.constructor.name +
          "_" +
          this.props.STORE_BIBLE.BIBLE_VERSION +
          chapter_no +
          book_id +
          changeSettings;
        /*
      if (storeCache.dataset[key] != null) {
        this.rendercontent = storeCache.dataset[key];
        if (this._isMounted) {
          this.setState(
            {
              isLoading: true,
              isloaded: true,
              original_language_flag: false,
             
            },
            () => { }
          );
          if (this.props.STORE_BIBLE.PARALLEL === "true")
            await this.OnGOClick2();
        }
        return;
      } else {*/

        if (this.props.STORE_BIBLE.OFFLINE == true) {
          let exit = "false"
          if (this.props.STORE_BIBLE.BIBLE_VERSION == "") exit = "true"
          if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "esv" && this.isBibleESV == false) exit = "true";
          if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "tb" && this.isBibleTB == false) exit = "true";
          if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "av" && this.isBibleAV == false) exit = "true";
          if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "net" && this.isBibleNET == false) exit = "true";
          if (exit == "false") {
            this.sqlbible1 = [];
            let dbname = "bibtext_" + this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() + "_entry.db";

            let dbbible = SQLite.openDatabase(dbname);
            let sqlbible_map = "";
            let number = "";
            if (this.props.STORE_BIBLE.BOOK_ID.toString().length == 2)
              number = this.props.STORE_BIBLE.BOOK_ID.toString();
            else
              number = "0" + this.props.STORE_BIBLE.BOOK_ID.toString();

            sqlbible_map = "SELECT * from entry_bibtext_" + number + " WHERE bookid = " + this.props.STORE_BIBLE.BOOK_ID + " AND chapter = " + this.props.STORE_BIBLE.CHAPTER_NO + " ORDER BY ID ASC"
            console.log(sqlbible_map);
            try {
              dbbible.transaction(
                tx => {
                  tx.executeSql(sqlbible_map,
                    [],
                    (_, { rows: { _array } }) => this.sqlbible1 = _array,
                    (tx, error) => {
                      console.log(error);
                    }
                  );
                },
                error => {
                  console.log(error);
                },
                () => {
                  let text = "";
                  for (let i = 0; i < this.sqlbible1.length; i++) {
                    text = text + this.sqlbible1[i].text;
                  }
                  if (
                    this.state.book_id === 19 ||
                    this.state.book_id === 18 ||
                    this.state.book_id === 22 ||
                    this.state.book_id == 20 ||
                    this.state.book_id == 23 ||
                    this.state.book_id == 24 ||
                    this.state.book_id == 25
                  )
                    this.rendercontent = this.MyParser.DoParserBibleFullVersion(
                      text,
                      this.props.STORE_BIBLE.IS_LINE_VIEW,
                      this.props.STORE_BIBLE.IS_SHOW_NOTES,
                      this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
                      this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
                      this.props.STORE_BIBLE.FONT_SIZE,
                      this.props.STORE_BIBLE.BIBLE_VERSION,
                      false,
                      false,
                      "rendercontent1",
                      this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                    );
                  else
                    this.rendercontent = this.MyParser.DoParserBibleFullVersion(
                      text,
                      this.props.STORE_BIBLE.IS_LINE_VIEW,
                      this.props.STORE_BIBLE.IS_SHOW_NOTES,
                      this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
                      this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
                      this.props.STORE_BIBLE.FONT_SIZE,
                      this.props.STORE_BIBLE.BIBLE_VERSION,
                      true,
                      false,
                      "rendercontent1",
                      this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                    );

                  if (this._isMounted) {
                    this.setState(
                      {
                        isLoading: true,
                        original_language_flag: false,
                      }
                    );
                    //this.props.ACT_setCacheData(key, this.rendercontent);
                  }
                }
              );
            } catch (e) {
              console.log(e);
            }
          }
        }
        else {
          var urlbible =
            "https://sabdapro.com:3002/App/app_verse_text?ver_code=" +
            this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() +
            "&type_search=BC&book_id=" +
            this.props.STORE_BIBLE.BOOK_ID +
            "&chapter_no=" +
            this.props.STORE_BIBLE.CHAPTER_NO;
          console.log(urlbible)
          await fetch(urlbible)

            .then((response) => response.json())
            .then((responseJson) => {
              let mylist_verse = responseJson.data.list_verse
              let text = "";
              for (let i = 0; i < mylist_verse.length; i++) {
                text = text + mylist_verse[i].text;
              }
              if (
                this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() !== "esv" &&
                this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() !== "net"
              ) {
                // text = "<para>" + text + "</para>";
              }
              if (
                this.state.book_id === 19 ||
                this.state.book_id === 18 ||
                this.state.book_id === 22 ||
                this.state.book_id == 20 ||
                this.state.book_id == 23 ||
                this.state.book_id == 24 ||
                this.state.book_id == 25
              )
                this.rendercontent = this.MyParser.DoParserBibleFullVersion(
                  text,
                  this.props.STORE_BIBLE.IS_LINE_VIEW,
                  this.props.STORE_BIBLE.IS_SHOW_NOTES,
                  this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
                  this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
                  this.props.STORE_BIBLE.FONT_SIZE,
                  this.props.STORE_BIBLE.BIBLE_VERSION,
                  false,
                  false,
                  "rendercontent1",
                  this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                );
              else
                this.rendercontent = this.MyParser.DoParserBibleFullVersion(
                  text,
                  this.props.STORE_BIBLE.IS_LINE_VIEW,
                  this.props.STORE_BIBLE.IS_SHOW_NOTES,
                  this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
                  this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
                  this.props.STORE_BIBLE.FONT_SIZE,
                  this.props.STORE_BIBLE.BIBLE_VERSION,
                  true,
                  false,
                  "rendercontent1",
                  this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                );

              if (this._isMounted) {
                this.setState(
                  {
                    isLoading: true,
                    original_language_flag: false,
                  }
                );
                //this.props.ACT_setCacheData(key, this.rendercontent);
              }
            }
            );

        }

        if (this.props.STORE_BIBLE.PARALLEL === "true") await this.OnGOClick2();
        // }
        // AV Deu 28

        /*
    setTimeout(() => {
      
    this.onSwipeLeft()
      
    }, 3500);
  */

      }
      else {
        Alert.alert(
          DCT.getValue(
            "maintenance",
            this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
          ),
          DCT.getValue(
            "maintenancedesc",
            this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
          ),
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }

    }
  }
  async OnGOClick2() {
    this.myversion = "";
    if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "esv")
      this.myversion = "English Standard Version";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "net")
      this.myversion = "New English Translation";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "av")
      this.myversion = "King James Version (Authorized)";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "tb")
      this.myversion = "Terjemahan Baru";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "avb")
      this.myversion = "Alkitab Versi Borneo";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "ayt")
      this.myversion = "Alkitab Yang Terbuka";

    this.bible_version = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.bible_version === "tb" ||
      this.bible_version === "ayt" ||
      this.bible_version === "avb"
    ) {
      this.catalog_language = "ind";
    } else {
      this.catalog_language = "eng";
    }
    this.book_chapter = DCT.getValue(
      "BL" + this.state.book_id,
      this.catalog_language
    );
    this.book_chapter_text = this.book_chapter + " " + this.state.chapter_no;
    this.setState(
      {
        parallel_loaded: false,
        original_language_flag: false,
      },
      () => { }
    );
    this.list_hover_attr = [];
    this.list_tag_exception = ["eshigh", "hebrew", "greek"];
    this.is_highlight = false;

    let storeBible = this.props.STORE_BIBLE;
    let storeCache = storeBible.CACHE_DATA;

    let changeSettings =
      this.props.STORE_BIBLE.IS_LINE_VIEW.toString() +
      this.props.STORE_BIBLE.IS_SHOW_NOTES.toString() +
      this.props.STORE_BIBLE.IS_SHOW_PERICOPES.toString() +
      this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT.toString();
    const { bibleparallel, chapter_no, book_id } = this.state;

    let key =
      this.constructor.name +
      "_" +
      bibleparallel +
      chapter_no +
      book_id +
      changeSettings +
      " parallel bible " +
      this.statebibleversion;
    console.log(key);

    if (this.props.STORE_BIBLE.OFFLINE == true) {
      let exit = "false"
      if (bibleparallel.toLowerCase() == "esv" && this.isBibleESV == false) exit = "true";
      if (bibleparallel.toLowerCase() == "tb" && this.isBibleTB == false) exit = "true";
      if (bibleparallel.toLowerCase() == "av" && this.isBibleAV == false) exit = "true";
      if (bibleparallel.toLowerCase() == "net" && this.isBibleNET == false) exit = "true";
      if (exit == "false") {
        this.sqlbible2 = [];
        let dbname = "bibtext_" + bibleparallel.toLowerCase() + "_entry.db";

        let dbbible = SQLite.openDatabase(dbname);
        let sqlbible_map = "";
        let number = "";
        if (this.props.STORE_BIBLE.BOOK_ID.toString().length == 2)
          number = this.props.STORE_BIBLE.BOOK_ID.toString();
        else
          number = "0" + this.props.STORE_BIBLE.BOOK_ID.toString();

        sqlbible_map = "SELECT * from entry_bibtext_" + number + " WHERE bookid = " + this.props.STORE_BIBLE.BOOK_ID + " AND chapter = " + this.props.STORE_BIBLE.CHAPTER_NO + " ORDER BY ID ASC"
        console.log(sqlbible_map);
        try {
          dbbible.transaction(
            tx => {
              tx.executeSql(sqlbible_map,
                [],
                (_, { rows: { _array } }) => this.sqlbible2 = _array,
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);
            },
            () => {
              let text = "";
              for (let i = 0; i < this.sqlbible2.length; i++) {
                text = text + this.sqlbible2[i].text;
              }
              if (
                this.state.book_id === 19 ||
                this.state.book_id === 18 ||
                this.state.book_id === 22 ||
                this.state.book_id == 20 ||
                this.state.book_id == 23 ||
                this.state.book_id == 24 ||
                this.state.book_id == 25
              )
                this.rendercontent2 = this.MyParser.DoParserBibleFullVersion(
                  text,
                  this.props.STORE_BIBLE.IS_LINE_VIEW,
                  this.props.STORE_BIBLE.IS_SHOW_NOTES,
                  this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
                  this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
                  this.props.STORE_BIBLE.FONT_SIZE,
                  this.props.STORE_BIBLE.BIBLE_VERSION,
                  false,
                  false,
                  "rendercontent2",
                  this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                );
              else
                this.rendercontent2 = this.MyParser.DoParserBibleFullVersion(
                  text,
                  this.props.STORE_BIBLE.IS_LINE_VIEW,
                  this.props.STORE_BIBLE.IS_SHOW_NOTES,
                  this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
                  this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
                  this.props.STORE_BIBLE.FONT_SIZE,
                  this.props.STORE_BIBLE.BIBLE_VERSION,
                  true,
                  false,
                  "rendercontent2",
                  this.props.STORE_BIBLE.IS_SHOW_DARKMODE
                );

              if (this._isMounted) {
                this.setState(
                  {
                    isLoading: true,
                    original_language_flag: false,
                    parallel_loaded: true,
                  }
                );
              }
            }
          );
        } catch (e) {
          console.log(e);
        }

      }
    }
    else {
      var urlbible =
        "https://sabdapro.com:3002/App/app_verse_text?ver_code=" +
        bibleparallel +
        "&type_search=BC&book_id=" +
        this.props.STORE_BIBLE.BOOK_ID +
        "&chapter_no=" +
        this.props.STORE_BIBLE.CHAPTER_NO;

      await fetch(urlbible)
        .then((response) => response.json())
        .then((responseJson) => {
          let mylist_verse = responseJson.data.list_verse
          let text = "";
          for (let i = 0; i < mylist_verse.length; i++) {
            text = text + mylist_verse[i].text;
          }

          if (
            bibleparallel.toLowerCase() !== "esv" &&
            bibleparallel.toLowerCase() !== "net"
          ) {
            //text = "<para>" + text + "</para>";
          }
          console.log(this.state.book_id);
          if (
            this.state.book_id === 19 ||
            this.state.book_id === 18 ||
            this.state.book_id === 22 ||
            this.state.book_id == 20 ||
            this.state.book_id == 23 ||
            this.state.book_id == 24 ||
            this.state.book_id == 25
          )
            this.rendercontent2 = this.MyParser.DoParserBibleFullVersion(
              text,
              this.props.STORE_BIBLE.IS_LINE_VIEW,
              this.props.STORE_BIBLE.IS_SHOW_NOTES,
              this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
              this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
              this.props.STORE_BIBLE.FONT_SIZE,
              bibleparallel,
              false,
              false,
              "rendercontent2",
              this.props.STORE_BIBLE.IS_SHOW_DARKMODE
            );
          else
            this.rendercontent2 = this.MyParser.DoParserBibleFullVersion(
              text,
              this.props.STORE_BIBLE.IS_LINE_VIEW,
              this.props.STORE_BIBLE.IS_SHOW_NOTES,
              this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
              this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
              this.props.STORE_BIBLE.FONT_SIZE,
              bibleparallel,
              true,
              false,
              "rendercontent2",
              this.props.STORE_BIBLE.IS_SHOW_DARKMODE
            );

          if (this._isMounted) {
            this.setState(
              {
                isLoading: true,
                original_language_flag: false,
                parallel_loaded: true,
              }
            );

            this.props.ACT_setCacheData(key, this.rendercontent2);
          }
        });
    }

  }
  async _cacheResourcesAsync() {
    return Asset.loadAsync([]);
  }
  async removeDatabase() {
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    await FileSystem.deleteAsync(sqlDir + "lexicon.db", { idempotent: true });
    await FileSystem.deleteAsync(sqlDir + "cmd_map.db", { idempotent: true });
    await FileSystem.deleteAsync(sqlDir + "lexdef_map.db", { idempotent: true });
    await FileSystem.deleteAsync(sqlDir + "dct_map.db", { idempotent: true });
    await FileSystem.deleteAsync(sqlDir + "orilang.db", { idempotent: true });
  }
  async CopyDatabase() {

    try {
      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/lexicon.db')).uri,
        FileSystem.documentDirectory + "SQLite/lexicon.db")
        .then(function () {
        })
    }
    catch (e) {
      console.log(e);
    }

    try {
      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/cmt_map.db')).uri,
        FileSystem.documentDirectory + "SQLite/cmt_map.db")
        .then(function () {
        })
    }
    catch (e) {
      console.log(e);
    }

    try {
      // await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`, {idempotent : true})
      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/lexdef_map.db')).uri,
        FileSystem.documentDirectory + "SQLite/lexdef_map.db")
        .then(function () {
        })
    }
    catch (e) {
      console.log(e);
    }

    try {
      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/dct_map.db')).uri,
        FileSystem.documentDirectory + "SQLite/dct_map.db")
        .then(function () {
        })
    }
    catch (e) {
      console.log(e);
    }
    try {
      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/orilang.db')).uri,
        FileSystem.documentDirectory + "SQLite/orilang.db")
        .then(function () {
        })
    }
    catch (e) {
      console.log(e);
    }
    try {
      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/itl.db')).uri,
        FileSystem.documentDirectory + "SQLite/itl.db")
        .then(function () {
        })
    }
    catch (e) {
      console.log(e);
    }
    try {
      await FileSystem.downloadAsync(
        Asset.fromModule(require('../assets/db/bible_info.db')).uri,
        FileSystem.documentDirectory + "SQLite/bible_info.db")
        .then(function () {
        })
    }
    catch (e) {
      console.log(e);
    }

  }
  getItemsOne(val) {
    var items = [];
    val = val.toLowerCase();
    for (var i = 0; i < this.mybooks.length; i++) {
      if (val === "esv" || val === "av" || val === "net") {
        items.push(this.mybooks[i].english);
      } else if (val === "cuv" || val === "cuvs") {
        items.push(this.mybooks[i].chinese);
      } else if (val === "tb" || val === "ayt" || val === "avb") {
        items.push(this.mybooks[i].indo);
      }
    }

    return items;
  }
  getItemsTwo(val) {
    var items = [];
    var pasal = this.mybooks[this.state.book_id - 1].pasal;

    for (var i = 1; i <= pasal; i++) {
      items.push(i.toString());
    }

    return items;
  }

  ITLHebrewSetup() {
    let ver_id = "";
    if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb") ver_id = 1;
    else if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "av")
      ver_id = 10;
    else if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "esv")
      ver_id = 4;
    else if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "net")
      ver_id = 8;

    let lang_code = "eng";
    if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb")
      lang_code = "ind";

    let urlitl =
      "https://sabdapro.com:3002/App/app_itl_res?limit=11&skip=0&lang_code=" +
      lang_code +
      "&ver_id_src=" +
      ver_id +
      "&type_search=BC&book_id=" +
      this.state.book_id +
      "&chapter_no=" +
      this.state.chapter_no;
    this.itl_id_bhs = "";
    this.itl_id_wlc = "";

    fetch(urlitl)
      .then((response) => response.json())
      .then((responseJson) => {

        let listres = responseJson.data.list_res

        for (let i = 0; i < listres.length; i++) {
          if (listres[i].ver_code_tgt === "bhs")
            this.itl_id_bhs = listres[i].itl_id;
          if (listres[i].ver_code_tgt === "bhsa")
            this.itl_id_bhs = listres[i].itl_id;
          if (listres[i].ver_code_tgt === "wlc")
            this.itl_id_wlc = listres[i].itl_id;
        }
      });
  }

  ITLGreekSetup() {
    let ver_id = "";
    if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb") ver_id = 1;
    else if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "av")
      ver_id = 10;
    else if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "esv")
      ver_id = 4;
    else if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "net")
      ver_id = 8;

    let lang_code = "eng";
    if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb")
      lang_code = "ind";

    let urlitl =
      "https://sabdapro.com:3002/App/app_itl_res?limit=11&skip=0&lang_code=" +
      lang_code +
      "&ver_id_src=" +
      ver_id +
      "&type_search=BC&book_id=" +
      this.state.book_id +
      "&chapter_no=" +
      this.state.chapter_no;
    this.itl_id_whnu = "";

    fetch(urlitl)
      .then((response) => response.json())
      .then((responseJson) => {

        let listres = responseJson.data.list_res

        for (let i = 0; i < listres.length; i++) {
          if (listres[i].ver_code_tgt === "whnu")
            this.itl_id_whnu = listres[i].itl_id;
        }
      });
  }

  PlayAudio() {
    if (
      this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb" ||
      this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "esv" ||
      this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "av"
    ) {
      if (this.state.isplay === true) {
        this.setState({ isplay: false });
        this._Stop();
        this.isplaying = false;
      } else {
        this.setState({ isplay: true });
        this._Play();
        this.isplaying = true;
      }
    } else {
      Alert.alert(
        DCT.getValue("noaudio", this.props.STORE_BIBLE.LANG_CODE.toLowerCase()),
        this.props.STORE_BIBLE.BIBLE_VERSION +
        " " +
        DCT.getValue(
          "noaudiodesc",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }
  async _Stop() {
    this.playbackObject.stopAsync();
  }
  async _Play() {
    try {
      this.playbackObject = new Audio.Sound();
      this.playbackObject.setOnPlaybackStatusUpdate(
        this._onPlaybackStatusUpdate
      );
      let url = "";
      if (
        this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "tb" ||
        this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() === "esv"
      ) {
        url = "http://vocationfirst.net/audio/";
      } else {
        url = "http://vocationfirst.net/audio/";
      }
      url = url + this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();

      if (this.state.book_id < 40) url = url + "/pl/";
      else url = url + "/pb/";

      url = url.toString();
      let mp3file = "";
      if (this.state.chapter_no > 100) {
        mp3file =
          DCT.getValue("B" + this.state.book_id.toString(), "ind") +
          "" +
          this.state.chapter_no.toString() +
          ".mp3";
      } else if (this.state.chapter_no < 100 && this.state.chapter_no > 9) {
        mp3file =
          DCT.getValue("B" + this.state.book_id.toString(), "ind") +
          "0" +
          this.state.chapter_no.toString() +
          ".mp3";
      } else {
        mp3file =
          DCT.getValue("B" + this.state.book_id.toString(), "ind") +
          "00" +
          this.state.chapter_no.toString() +
          ".mp3";
      }
      if (mp3file.includes("2kor")) mp3file = mp3file.replace(/2kor/g, "2Kor");

      url = url + mp3file;
      url = url.toString();
      console.log(url);

      await this.playbackObject.loadAsync({ uri: url });
      await this.playbackObject.playAsync();
      this.total_audio_play = this.total_audio_play + 1;
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  }

  _onPlaybackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        this.onSwipeLeft();
      }
    }
  };
  onResponderRelease() {
    //do stuff
  }
}

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
    ACT_setIsShowDarkMode: (is_showdarkmode) =>
      dispatch(BibleAction.setIsShowDarkMode(is_showdarkmode)),
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
    ACT_setDarkMode: (set_dark_mode) =>
      dispatch(BibleStyle.setDarkMode(set_dark_mode)),
    ACT_setOffline: (set_offline) =>
      dispatch(BibleAction.SetOffline(set_offline))
  };
};
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Homescreen)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight,
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
  containerPara: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonTouch: {
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    flex: 0.5,
  },
  button: {
    width: 37,
    height: 37,
    paddingTop: 10,
    paddingLeft: 10,
    flex: 1,
  },
  buttonsearch: {
    width: 40,
    paddingTop: 7,
    paddingLeft: 7,
    paddingRight: 20,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  button2: {
    width: 20,
    height: 20,
  },
  button3: {
    width: 60,
    paddingTop: 5,
    paddingLeft: 2,
    paddingBottom: 5,
    flex: 1,
  },
  fab_left: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 100,
    backgroundColor: "#3B93DB",
  },
  fab_right: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 100,
    backgroundColor: "#3B93DB",
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    color: "#ffffff",
    flex: 4,
  },
  submitButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    textAlign: "justify",
    color: "#353535",
    flex: 1,
    fontFamily: "NotoSans-Bold",
  },
  splitView: {
    flexDirection: "column",
  },

  splitViewLeft: {
    flex: 3,
  },

  splitViewRight: {
    flex: 2,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flex: 1,

    justifyContent: "center",
    backgroundColor: "blue",
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    paddingTop: 10,
  },
  audioplayermodal: {
    height: Platform.OS === 'ios' ? 126 : 141,
  },
  audioplayer: {
    flexDirection: "row",
    marginTop: Platform.OS === 'ios' ? 75 : 90,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    paddingRight: 10,
    paddingLeft: 10,
    flex: 10,

  },
  player: {
    backgroundColor: "#ffffff",
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-start",
    left: 0,
    bottom: 0,
    right: 0,
    paddingRight: 10,
    paddingLeft: 10,
    ...Platform.select({
      ios: {
        height: BAR_HEIGHT_IOS * 0.9 + 9,
      },
      android: {
        height: BAR_HEIGHT_ANDROID * 0.9 + 10,
      },
    }),
  },
});
