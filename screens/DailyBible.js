"use strict";
import React, { Component } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import {
  TouchableHighlight,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  Alert
} from "react-native";
import * as CODailyBible from "../common/CODailyBible";
import SnackBar from "../screens/Home/SnackBar";
import TagParser from "../common/TagParser";
import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import * as DCT from "../dictionary";
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { withNavigation } from "react-navigation";
import Modal from "react-native-modalbox";
import { Calendar } from "react-native-calendars";
import { HeaderBackButton } from 'react-navigation-stack';
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
var self;
class DailyBible extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerLeft: <HeaderBackButton tintColor={params.titlecolor} onPress={() => {

        navigation.goBack();

      }} />,
      headerRight: (
        <View style={{ flexDirection: "row", paddingRight: 20, flex: 1, backgroundColor: params.backgroundcolor }}>
          {!params.darkmode && (
            <TouchableOpacity
              style={[styles.buttonsearch, { backgroundColor: params.backgroundcolor }]}
              key={"search"}
              onPress={() => params.handleSettings()}
            >

              <Image
                style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: params.backgroundcolor, }}
                source={require("../assets/images/settings.png")}
              />
            </TouchableOpacity>
          )}
          {params.darkmode && (
            <TouchableOpacity
              style={[styles.buttonsearch, { backgroundColor: params.backgroundcolor }]}
              key={"search"}
              onPress={() => params.handleSettings()}
            >

              <Image
                style={{ width: 25, height: 25, paddingRight: 1, backgroundColor: params.backgroundcolor, }}
                source={require("../assets/images/settings_darkmode.png")}
              />

            </TouchableOpacity>)}
        </View>
      ),
      headerTransparent: true,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };

  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  constructor(props) {
    super(props);
    this.state = {
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

      ]
    };
    this.canNavigate = false;
    self = this;
  }
  componentDidMount = () => {
    this.props.ACT_setBookChapterChange(true);
    const { navigation } = this.props;
    this.props.navigation.setParams({
      handleSettings: this.SettingHandler
    });
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR,
      darkmode: this.props.STORE_BIBLE.IS_SHOW_DARKMODE,


    });
    this._isMounted = true;
    this.MyParser = new TagParser(this);

    this.focusListener = navigation.addListener("didFocus", () => {

      this.daily_bible_id = this.props.STORE_BIBLE.DAILY_BIBLE_ID;
      console.log("this daily bible id " + this.daily_bible_id)
      this.myreadingplan = CODailyBible.getReadingPlan();


      this.duration_daily_bible = Number(
        this.myreadingplan[Number(this.daily_bible_id) - 1].duration
      );
      let date = new Date();
      this.today = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
      );
      console.log(this.today);
      this.daily_bible_start_date = new Date(
        this.props.STORE_BIBLE.DAILY_BIBLE_START_DATE
      );
      var msDiff =
        this.today.getTime() -
        new Date(this.props.STORE_BIBLE.DAILY_BIBLE_START_DATE).getTime(); //Future date - current date
      this.daydifference = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1;
      console.log(this.daydifference);
      this.fsizeplustwo = Number(this.props.STORE_BIBLE.FONT_SIZE) + 2;
      this.language = this.props.STORE_BIBLE.LANG_CODE;
      this.bible_version = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
      this.handleChangeTab(DCT.getValue("dailybible", this.language));
      this.verse_day = CODailyBible.getReadingBibleOneYear(
        this.daydifference.toString()
      );
      if (this.daily_bible_id === "1") {
        this.verse_day = CODailyBible.getDailyGospel(
          this.daydifference.toString()
        );
      } else if (this.daily_bible_id === "2") {
        this.verse_day = CODailyBible.getDailyPsalm(
          this.daydifference.toString()
        );
      } else if (this.daily_bible_id === "3") {
        this.verse_day = CODailyBible.getDailyWisdom(
          this.daydifference.toString()
        );
      } else if (this.daily_bible_id === "4") {
        this.verse_day = CODailyBible.getNT90D(this.daydifference.toString());
      } else if (this.daily_bible_id === "5") {
        this.verse_day = CODailyBible.getReadingBibleOneYear(
          this.daydifference.toString()
        );
      } else if (this.daily_bible_id === "6") {
        this.verse_day = CODailyBible.getReadingChronologicalNT(
          this.daydifference.toString()
        );
      } else if (this.daily_bible_id === "7") {
        this.verse_day = CODailyBible.getReadingBibleOTNT(
          this.daydifference.toString()
        );
      }

      this.daily_reading_date = this.props.navigation.getParam(
        "daily_reading_date",
        ""
      );
      this.daily_reading_date =
        "Day " + this.daydifference + " : " + this.daily_reading_date;
      if (
        this.daydifference <= 0 ||
        this.daydifference > this.duration_daily_bible
      ) {
        Alert.alert(
          DCT.getValue("change_date", this.language),
          DCT.getValue("daily_bible_error_date", this.language)
        );
        const { navigate } = this.props.navigation;

        navigate("DailyReadingPlan", {});
      } else if (this._isMounted === true) {
        this.setState(
          {
            original_language_flag: false,
            isLoadingOriginalLanguage: false,
            book_id: this.props.STORE_BIBLE.BOOK_ID,
            chapter_no: this.props.STORE_BIBLE.CHAPTER_NO,
            bibleversion: this.props.STORE_BIBLE.BIBLE_VERSION,
            bibleparallel: this.props.STORE_BIBLE.BIBLE_PARALLEL,
            is_parallel: this.props.STORE_BIBLE.PARALLEL,
            day: this.verse_day,
            daily_reading_date: this.daily_reading_date
          },

          () => {
            if (this.props.STORE_BIBLE.BOOK_CHAPTER_CHANGE) this.OnGOClick();
            else if (this.canNavigate === false) this.OnGOClick();
            else this.setState({ isLoading: true });
          }
        );
      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  SettingHandler() {
    const { navigate } = self.props.navigation;

    navigate("DailyReadingPlan", {});
  }
  render() {
    let myversion = "";
    if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "esv")
      myversion = "English Standard Version";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "net")
      myversion = "New English Translation";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "av")
      myversion = "King James Version (Authorized)";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "tb")
      myversion = "Terjemahan Baru";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "avb")
      myversion = "Alkitab Versi Borneo";
    else if (this.props.STORE_BIBLE.BIBLE_PARALLEL.toLowerCase() === "ayt")
      myversion = "Alkitab Yang Terbuka";

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
      detectSwipeUp: false,
      detectSwipeDown: false
    };
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

    return (
      <View style={[styles.container,styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, paddingTop: 85 }]}>
         <Modal
                ref={"modal2"}
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
                        this.refs.modal2.close();
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
                ref={"modal3"}
                position={"center"}
                backdrop={false}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}
                transparent={true}
              >
                <ScrollView  style={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}}>
              <TouchableOpacity
                style={{ flex: 2, paddingRight: 5, paddingTop:130 }}
                key={"to global close"}
                onPress={() => {
                 this.refs.modal3.close();
                }}
              >
                <Text
                  style={{
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                    fontSize: 22,
                    textAlign: "center"
                  }}
                >
                  {"X"}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "flex-end"
                }}
              >
                {this.state.bcv}
              </View>
            </ScrollView>
              </Modal>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 2,
              borderTopWidth: 1,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingBottom: 8,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{ flex: 8, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
              onPress={() => this.ChangeBibleVersion()}
              underlayColor="#353535"
            >
              <Text
                style={{
                  fontSize: 17,
                  paddingLeft: 15,
                  paddingTop: 10,
                  fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.props.STORE_BIBLE.BIBLE_VERSION}{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 2, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
              onPress={() => this.ChangeBibleVersion()}
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
              flex: 8,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingBottom: 8,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{ flex: 9, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }}
              onPress={() => this.refs.modal1.open()}
              underlayColor="#353535"
            >
              <Text
                style={{
                  fontSize: 17,
                  paddingLeft: 15,
                  paddingTop: 10,
                  fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.state.daily_reading_date}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }}
              onPress={() => this.refs.modal1.open()}
              underlayColor="#353535"
            >
              <Icon
                style={{ flex: 1, paddingTop: 16, paddingRight: 2, color: this.props.STORE_STYLE.TEXT_COLOR }}
                name="md-arrow-dropdown"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
            flexDirection: "column",
            flex: 1,
            paddingTop: 10
          }}
        >
          {this.state.isLoading && (
            <ScrollView
              style={{
                paddingTop: 10,
                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              <Modal
                style={{}}
                ref={"modal1"}
                position={"top"}
                backdrop={false}
                swipeToClose={this.state.swipeToClose}
                onClosed={this.onClose}
                onOpened={this.onOpen}
                onClosingState={this.onClosingState}
              >
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Calendar
                    // Initially visible month. Default = Date()
                    current={Date()}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                      console.log("selected day", day);
                      this.ChangeDate(day);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={day => {
                      console.log("selected day", day);
                      this.ChangeDate(day);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={month => {
                      console.log("month changed", month);
                    }}
                    // Hide month navigation arrows. Default = false
                    hideArrows={false}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={false}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={false}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={0}
                    // Hide day names. Default = false
                    hideDayNames={false}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={false}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                    // Disable left arrow. Default = false
                    disableArrowLeft={false}
                    // Disable right arrow. Default = false
                    disableArrowRight={false}
                  />
                </View>
              </Modal>
              <Text
                style={{
                  paddingTop: 10,
                  textAlign: "center",
                  fontSize: this.fsizeplustwo,
                  fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.state.day}
              </Text>
              <View style={{ height: 20 }}></View>
              {this.rendercontent}
            </ScrollView>
          )}
          {!this.state.isLoading && (
            <ScrollView
              style={{
                paddingTop: 10,
                paddingLeft: 5,
                paddingRight: 5
              }}
              contentContainerStyle={styles.contentContainer}
            >
              <ActivityIndicator size="large" color="#0000ff" />
            </ScrollView>
          )}
        </View>
        <View>
          <SnackBar
            ref="ReactNativeSnackBar"
            navigationProps={this.props.navigation}
          />
        </View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.BottomNavigationClick(newTab.key)}
          renderTab={this.renderTab}
          tabs={this.state.tabs}
        />
      </View>
    );
  }
  ClickReaction3(value, props) {

  }
  ShowDialogBookChapter(tabkey, title) {
    this.bcv = [];
    for (let x = 0; x < this.bookchapter.length; x++) {
      this.bcv.push(
        <View key={x} style={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}}>
          <TouchableOpacity
            style={{ flex: 2, paddingRight: 5 }}
            key={"to" + x}
            onPress={() => {
              this.refs.modal3.close();
              this.NavigationTo(
                tabkey,
                this.bookchapter[x].book_id,
                this.bookchapter[x].chapter_no
              );
            }}
          >
            <Text
              style={{
                color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                fontSize: 24,
                textAlign: "center",
                paddingBottom: 4
              }}
            >
              {this.bookchapter[x].book} {this.bookchapter[x].chapter_no}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    this.setState({
      bcv : this.bcv
    })
    this.refs.modal3.open();
    /*
    DialogManager.show(
      {
        title: " ",
        titleStyle: {backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR},
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent contentStyle={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}} style={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}}>
            <ScrollView  style={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}}>
              <TouchableOpacity
                style={{ flex: 2, paddingRight: 5 }}
                key={"to global close"}
                onPress={() => {
                  DialogManager.dismissAll(() => { });
                }}
              >
                <Text
                  style={{
                    color: this.props.STORE_STYLE.TEXT_COLOR,
                    fontSize: 22,
                    textAlign: "center"
                  }}
                >
                  {"X"}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "flex-end"
                }}
              >
                {this.bcv}
              </View>
            </ScrollView>
          </DialogContent>
        )
      },
      () => { }
    );
    */
  }
  BottomNavigationClick(tabkey) {
    let title = " ";
    this.ShowDialogBookChapter(tabkey, title);
  }
  NavigationTo(tabkey, book_id, chapter_no) {
    const { navigate } = this.props.navigation;
    if (tabkey === "discovery") {
      navigate("Discovery", {
        book_id: book_id,
        chapter_no: chapter_no,
        language: this.language
      });
    } else if (tabkey === "commentary") {
      navigate("Commentary", {
        book_id: book_id,
        chapter_no: chapter_no,
        language: this.language
      });
    } else if (tabkey === "xref") {
      var bibleversion = this.props.STORE_BIBLE.BIBLE_VERSION;
      bibleversion = bibleversion.toLowerCase();
      navigate("CrossReference", {
        book_id: book_id,
        chapter_no: chapter_no,
        language: this.language,
        version_code: bibleversion
      });
    } else if (tabkey === "entity") {
      this.OpenListEntity(book_id, chapter_no, this.language);
    } else if (tabkey === "parallel") {
      navigate("ParallelBible", {});
    } else if (tabkey === "original") {
      var bibleversion = this.state.bibleversion;
      bibleversion = bibleversion.toLowerCase();
      //this.ShowDialogEllipsisMore();

      const { navigate } = this.props.navigation;
      navigate("OriginalLanguage", {
        book_id: this.state.book_id,
        bibleversion: bibleversion,
        language: this.state.language
      });
    }
  }
  ChangeDate(day) {
    this.canNavigate = false;
    this.numbermonth = Number(day.month.toString());
    this.numberyear = Number(day.year.toString());
    this.numberday = Number(day.day.toString());

    console.log(
      this.numberyear + "     " + this.numbermonth + "      " + this.numberday
    );
    this.today = new Date(
      Date.UTC(this.numberyear, this.numbermonth - 1, this.numberday, 0, 0, 0)
    );
    console.log(this.today);
    var msDiff =
      this.today.getTime() -
      new Date(this.props.STORE_BIBLE.DAILY_BIBLE_START_DATE).getTime();
    //Future date - current date
    this.daydifference = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1;
    console.log(this.daydifference);
    this.verse_day = CODailyBible.getReadingBibleOneYear(
      this.daydifference.toString()
    );
    if (this.daily_bible_id === "1") {
      this.verse_day = CODailyBible.getDailyGospel(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === "2") {
      this.verse_day = CODailyBible.getDailyPsalm(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === "3") {
      this.verse_day = CODailyBible.getDailyWisdom(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === "4") {
      this.verse_day = CODailyBible.getNT90D(this.daydifference.toString());
    } else if (this.daily_bible_id === "5") {
      this.verse_day = CODailyBible.getReadingBibleOneYear(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === "6") {
      this.verse_day = CODailyBible.getReadingChronologicalNT(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === "7") {
      this.verse_day = CODailyBible.getReadingBibleOTNT(
        this.daydifference.toString()
      );
    }

    var now = this.today;
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
        "Dec"
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
        "Des"
      ];
    }

    var day = days[now.getDay()];
    var month = months[now.getMonth()];

    this.daily_reading_date =
      day +
      ", " +
      now.getDate() +
      " " +
      month +
      " " +
      now.getFullYear().toString();

    this.daily_reading_date =
      "Day " + this.daydifference + " : " + this.daily_reading_date;

    if (
      this.daydifference <= 0 ||
      this.daydifference > this.duration_daily_bible
    ) {
      Alert.alert(
        DCT.getValue("change_date", this.language),
        DCT.getValue("daily_bible_error_date", this.language)
      );
    } else {
      if (this._isMounted === true) {
        this.setState(
          {
            isLoading: false,
            day: this.verse_day,
            daily_reading_date: this.daily_reading_date
          },

          () => {
            if (
              this.daydifference <= 0 ||
              this.daydifference > this.duration_daily_bible
            )
              Alert.alert(
                DCT.getValue("change_date", this.language),
                DCT.getValue("daily_bible_error_date", this.language)
              );
            else if (this.canNavigate === false) this.OnGOClick();
            else this.setState({ isLoading: true });
          }
        );
      }
    }
    this.refs.modal1.close();
  }

  OpenCalendar() {
    console.log("haiya");
    this.refs.modal1.open();
  }

  ChangeBibleVersion() {
    this.props.navigation.navigate("BibleVersion");
    this.canNavigate = false;
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
      DialogManager.dismissAll(() => { });
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

          var commentdata = responseJson.data.list_comment
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
    setTimeout(() => {
      props.setState({
        canisscroll: true,
      });
    }, 1500);
  }
  DisplaySnackBar(lemma, strongnumber, wordstrong, verse_id) {
    this.refs.ReactNativeSnackBar.ShowSnackBarFunction(
      lemma,
      strongnumber,
      wordstrong,
      verse_id
    );
  }
  OnGOClick() {
    this.setState({ isLoading: false });
    this.list_hover_attr = [];
    this.list_tag_exception = ["eshigh", "hebrew", "greek"];
    this.is_highlight = false;

    let storeBible = this.props.STORE_BIBLE;
    let storeCache = storeBible.CACHE_DATA;
    let changeSettings =
      this.props.STORE_BIBLE.IS_LINE_VIEW.toString() +
      this.props.STORE_BIBLE.IS_SHOW_NOTES.toString() +
      this.props.STORE_BIBLE.IS_SHOW_PERICOPES.toString() +
      this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT.toString() +
      this.props.STORE_BIBLE.BOOK_CHAPTER_CHANGE;
    const { bibleversion, chapter_no, book_id, is_parallel } = this.state;

    let key =
      this.constructor.name +
      "_" +
      this.props.STORE_BIBLE.BIBLE_VERSION +
      " " +
      this.state.day +
      " " +
      this.state.daily_reading_date;
    /*
  if (storeCache.dataset[key] != null) {
    this.rendercontent = storeCache.dataset[key];
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
  } else {*/
    this.bookchapter = [];
    let urldailybible =
      "https://sabdapro.com:3002/App/app_bible_version?limit=200&get_book=Y&ver_code_search=" +
      this.bible_version +
      "&type_search=K&verse=" +
      this.verse_day;

    console.log(urldailybible);
    fetch(urldailybible)
      .then(response => response.json())
      .then(responseJson => {

        let mylist_vid = responseJson.data.list_vid
        this.list_vid = "";
        for (let i = 0; i < mylist_vid.length; i++) {
          this.list_vid = this.list_vid + "," + mylist_vid[i].toString();
        }
        this.list_vid = this.list_vid.substr(1);

        let urltextdailybible =
          "https://sabdapro.com:3002/App/app_verse_text?ver_code=" +
          this.bible_version +
          "&type_search=L&vid=" +
          this.list_vid;

        console.log(urltextdailybible);
        fetch(urltextdailybible)
          .then(response => response.json())
          .then(responseJson => {

            let text = "";
            var list_verse = responseJson.data.list_verse
            let book_id = list_verse[0].book_id.toString();
            let book = list_verse[0].book.toString();
            let chapter_no = list_verse[0].chapter.toString();
            this.bookchapter.push({
              book: book,
              book_id: book_id,
              chapter_no: chapter_no
            });
            for (let i = 0; i < list_verse.length; i++) {
              if (
                book_id !== list_verse[i].book_id.toString() ||
                chapter_no !== list_verse[i].chapter.toString()
              ) {
                book_id = list_verse[i].book_id.toString();
                book = list_verse[i].book.toString();
                chapter_no = list_verse[i].chapter.toString();
                this.bookchapter.push({
                  book: book,
                  book_id: book_id,
                  chapter_no: chapter_no
                });
              }
              text = text + list_verse[i].text;
            }

            this.rendercontent = this.MyParser.DoParserBibleFullVersion(
              text,
              this.props.STORE_BIBLE.IS_LINE_VIEW,
              this.props.STORE_BIBLE.IS_SHOW_NOTES,
              this.props.STORE_BIBLE.IS_SHOW_PERICOPES,
              this.props.STORE_BIBLE.IS_SHOW_HIGHLIGHT,
              this.props.STORE_BIBLE.FONT_SIZE,
              this.props.STORE_BIBLE.BIBLE_VERSION,
              false,
              false, "rendercontent1", this.props.STORE_BIBLE.IS_SHOW_DARKMODE
            );
            if (this._isMounted) {
              this.setState(
                {
                  isLoading: true,
                  renderID: Math.random()
                },
                () => {
                  this.props.ACT_setBookChapterChange(false);
                }
              );

              this.props.ACT_setCacheData(key, this.rendercontent);
            }
          });
      });
    //}
    this.canNavigate = true;
  }
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
  ShowDialogVerse(text, verse) {
    this.setState(
      {
        showdialogverse: verse,
        showdialogtext: text
      }
    )
    this.refs.modal2.open();
  }
 
  GoShowCMT(value) {
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
                justifyContent: "flex-end"
              }}
            >
              {value}
            </View>
            <View style={{ height: 10 }}></View>
          </DialogContent>
        )
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
                justifyContent: "flex-end"
              }}
            >
              <Text>{value}</Text>
            </View>
            <View style={{ height: 10 }}></View>
          </DialogContent>
        )
      },
      () => { }
    );
  }
  OpenListEntity(book_id, chapter_no, language) {
    const { navigate } = this.props.navigation;
    navigate("ListEntityScreen", {
      book_id: book_id,
      chapter_no: chapter_no,
      language: language
    });
  }
  tabs = [
    {
      key: "discovery",
      icon: "discovery",
      label: "",
      barColor: "#ffffff",
      pressColor: "rgba(255, 255, 255, 0)"
    },
    {
      key: "commentary",
      icon: "commentary",
      label: "",
      barColor: "#ffffff",
      pressColor: "rgba(255, 255, 255, 0)"
    },
    {
      key: "entity",
      icon: "entity",
      label: "",
      barColor: "#ffffff",
      pressColor: "rgba(255, 255, 255, 0)"
    },
    {
      key: "xref",
      icon: "xref",
      label: "",
      barColor: "#ffffff",
      pressColor: "rgba(255, 255, 255, 0)"
    }
  ];
  state = {
    activeTab: "discovery"
  };
}
const BASE = 8;
const NUMBER_OF_SIZES = 8;

const sizes = [];

for (let i = 1; i <= NUMBER_OF_SIZES; i++) {
  sizes.push(i * BASE);
}
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
      dispatch(BibleAction.setLangChange(lang_code)),
    ACT_setBookID: book_id => dispatch(BibleAction.setBookID(book_id)),
    ACT_setChapterNo: chapter_no =>
      dispatch(BibleAction.setChapterNo(chapter_no)),
    ACT_setBookChapterChange: book_chapter_change =>
      dispatch(BibleAction.setBookChapterChange(book_chapter_change)),
    ACT_setIsLineView: is_line_view =>
      dispatch(BibleAction.setIsLineView(is_line_view)),
    ACT_setIsShowNotes: is_shownotes =>
      dispatch(BibleAction.setIsShowNotes(is_shownotes)),
    ACT_setIsShowPericopes: is_showpericopes =>
      dispatch(BibleAction.setIsShowPericopes(is_showpericopes)),
    ACT_setIsShowHighlight: is_showhighlight =>
      dispatch(BibleAction.setIsShowHighlight(is_showhighlight)),
    ACT_setFontSize: set_font_size =>
      dispatch(BibleAction.setFontSize(set_font_size)),
    ACT_setBibleVersion: set_bible_version =>
      dispatch(BibleAction.setBibleVersion(set_bible_version)),
    ACT_setLemma: set_lemma => dispatch(BibleAction.setLemma(set_lemma)),
    ACT_setStrongNumber: set_strong_number =>
      dispatch(BibleAction.setStrongNumber(set_strong_number)),
    ACT_setWordStrong: set_word_strong =>
      dispatch(BibleAction.setWordStrong(set_word_strong)),
    ACT_SetBibleParallel: set_bible_parallel =>
      dispatch(BibleAction.setBibleParallel(set_bible_parallel)),
    ACT_SetParallel: set_parallel =>
      dispatch(BibleAction.setParallel(set_parallel)),
    ACT_SetOriginalVersion: set_original_version =>
      dispatch(BibleAction.setOriginalVersion(set_original_version)),
    ACT_setSearchLimit: set_search_limit =>
      dispatch(BibleAction.setSearchLimit(set_search_limit)),
    ACT_SetDailyBibleStartDate: set_daily_bible_start_date =>
      dispatch(BibleAction.SetDailyBibleStartDate(set_daily_bible_start_date)),
    ACT_SetDailyBibleID: set_daily_bible_id =>
      dispatch(BibleAction.SetDailyBibleID(set_daily_bible_id))
  };
};
export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(DailyBible)
);

const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0
  },
  containerdatepicker: {
    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    marginVertical: 16,
    marginHorizontal: 8,
    justifyContent: "center",
    borderRadius: 2,
    height: 50
  },
  placeholderText: {
    color: "#DDE2E2"
  },
  text: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#353535"
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
    paddingRight: 5
  },
  picker1: {
    width: 70,
    backgroundColor: "#FFFFFF",
    borderColor: "#353535",
    borderBottomColor: "#353535",
    borderBottomWidth: 2,
    borderRadius: 10,
    fontSize: 9,
    flex: 3,
    fontSize: 20,
    paddingLeft: 5,
    paddingTop: 10
  },
  picker2: {
    width: 160,
    backgroundColor: "#FFFFFF",
    borderColor: "#353535",
    borderBottomColor: "#353535",
    borderBottomWidth: 3,
    borderRadius: 10,
    fontSize: 9,
    flex: 6
  },
  picker3: {
    width: 60,
    backgroundColor: "#FFFFFF",
    borderColor: "#353535",
    borderBottomColor: "#353535",
    borderBottomWidth: 3,
    borderRadius: 10,
    fontSize: 9,
    flex: 3
  },
  buttonTouch: {
    width: 25,
    height: 25,
    backgroundColor: "#FFFFFF",
    flex: 0.5
  },
  button: {
    width: 37,
    height: 37,
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: "#F4F5F8",
    flex: 1
  },
  buttonsearch: {
    width: 30,
    paddingTop: 7,
    paddingLeft: 7,
    paddingRight: 7,
    flex: 1
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
    flex: 1
  },

  input: {
    margin: 15,
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    color: "#ffffff",
    flex: 4
  },
  submitButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    textAlign: "justify",
    color: "#353535",
    flex: 1,
    fontFamily: 'NotoSans-Bold'
  },
  splitView: {
    flexDirection: "column"
  },

  splitViewLeft: {
    flex: 3
  },

  splitViewRight: {
    flex: 2
  },
  contentContainer: {},
  contentContainerStyle: {
    flexGrow: 1
  }
});
