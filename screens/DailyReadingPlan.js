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
  Alert
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import Icon from "react-native-vector-icons/Ionicons";
import { List } from "react-native-paper";
import * as CODailyBible from "../common/CODailyBible";
import Modal from "react-native-modalbox";
import { Calendar } from "react-native-calendars";
import PopToTopScreen from "./Home/PopToTop";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class DailyReadingPlan extends Component {
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
    this.state = {};
    this.myreadingplan = CODailyBible.getReadingPlan();
    this.dailybibleid = this.props.STORE_BIBLE.DAILY_BIBLE_ID;
  }

  componentDidMount = () => {
    this.props.ACT_setBookChapterChange(true);
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("reading_plan", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.start_date = new Date(this.props.STORE_BIBLE.DAILY_BIBLE_START_DATE);
    let now = this.start_date;
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
          daily_reading_date: daily_reading_date
        },

        () => { }
      );
    }
    this.readingplan = [];
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[styles.header,{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }]}>
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 3.5,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
              borderTopWidth:1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingBottom: 8,
              flexDirection: "row"
            }}
          >
            <Text
              style={{
                fontSize: 17,
                paddingLeft: 15,
                paddingTop: 10,
                fontFamily: 'NotoSans-Bold',
                color : this.props.STORE_STYLE.TEXT_COLOR
              }}
            >
              {DCT.getValue("start_from", this.language)}{" "}
            </Text>
          </View>
          <View
            style={{
              flex: 6.5,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
              borderTopWidth:1,
              borderBottomWidth: 1,
              borderRightWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              paddingBottom: 8,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{ flex: 9, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
              onPress={() => this.refs.modal1.open()}
              underlayColor="#353535"
            >
              <Text
                style={{
                  fontSize: 17,
                  paddingLeft: 15,
                  paddingTop: 10,
                  fontFamily: 'NotoSans-Bold',
                  textAlign: "center",color : this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.state.daily_reading_date}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }}
              onPress={() => this.refs.modal1.open()}
              underlayColor="#353535"
            >
              <Icon
                style={{ flex: 1, paddingTop: 16, paddingRight: 2, color : this.props.STORE_STYLE.TEXT_COLOR }}
                name="md-arrow-dropdown"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>

          <Modal
            ref={"modal1"}
            position={"top"}
            backdrop={false}
            swipeToClose={this.state.swipeToClose}
            onClosed={this.onClose}
            onOpened={this.onOpen}
            onClosingState={this.onClosingState}
            style={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR}}
          >
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: "#FFFFFF" }}
              onPress={() => {
                this.refs.modal1.close();
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}
              >
                <Text style={{ fontSize: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>{"X"}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flex: 9, paddingLeft: 10, paddingRight: 10 }}>
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
                // If firstDay=1 week starts from MondChronay. Note that dayNames and dayNamesShort should still start from Sunday.
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

          <List.Section>
            <List.Accordion
              title="Bible Verse"
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded="true"
              style={{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
                }}
              >
                <View style={styles.containerBottom}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("1");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>My Daily Gospel</Text>
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("1");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1 }}
                      source={require("../assets/images/info_purple.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
                      this.setReadingPlan("2");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>My Daily Psalms</Text>
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("2");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1 }}
                      source={require("../assets/images/info_purple.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                  backgroundColor:  this.props.STORE_STYLE.BACKGROUND_COLOR,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
              >
                <View style={styles.containerBottom2}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("3");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>My Daily Wisdom</Text>
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("3");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1 }}
                      source={require("../assets/images/info_purple.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                  backgroundColor:  this.props.STORE_STYLE.BACKGROUND_COLOR,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
              >
                <View style={styles.containerBottom2}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("4");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>
                        New Testament in 90 days
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("4");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1 }}
                      source={require("../assets/images/info_purple.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                  backgroundColor:  this.props.STORE_STYLE.BACKGROUND_COLOR,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
              >
                <View style={styles.containerBottom2}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("5");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>
                        Genesis to Revelation in one year
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("5");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1 }}
                      source={require("../assets/images/info_purple.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
                <View style={styles.containerBottom2}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("6");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>
                        Chronological New Testament
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("6");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1 }}
                      source={require("../assets/images/info_purple.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,

                  backgroundColor:  this.props.STORE_STYLE.BACKGROUND_COLOR,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
              >
                <View style={styles.containerBottom2}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("7");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>
                        Old and New Testament each day
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
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("7");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <Image
                      style={{ width: 25, height: 25, paddingRight: 1 }}
                      source={require("../assets/images/info_purple.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </List.Accordion>
            <List.Accordion
              title="Thematic"
              titleStyle={{
                fontFamily: 'NotoSans-Bold',
                fontSize: 16,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
              expanded="true"
              style={{ backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  
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
                      this.setReadingPlan("1");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                      <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>Will be added soon</Text>
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
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  
                  borderTopWidth: 1,
                  borderTopColor: this.props.STORE_STYLE.BORDER_COLOR,

                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                }}
              >
                <View style={styles.containerBottom2}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setReadingPlan("1");
                    }}
                    style={styles.containerBottomItem}
                  >
                    <View style={styles.button}>
                    <Text style={[styles.txtBottom,{color:this.props.STORE_STYLE.TEXT_COLOR}]}>Will be added soon</Text>
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
            </List.Accordion>
          </List.Section>
        </View>
      </ScrollView>
    );
  }

  ChangeDate(day) {
    this.canNavigate = false;
    this.numbermonth = Number(day.month.toString());
    this.numberyear = Number(day.year.toString());
    this.numberday = Number(day.day.toString());

    this.today = new Date(
      Date.UTC(this.numberyear, this.numbermonth - 1, this.numberday, 0, 0, 0)
    );
    var msDiff =
      this.today.getTime() -
      new Date(this.props.STORE_BIBLE.DAILY_BIBLE_START_DATE).getTime(); //Future date - current date
    this.daydifference = Math.floor(msDiff / (1000 * 60 * 60 * 24)) + 1;
    this.verse_day = CODailyBible.getReadingBibleOneYear(
      this.daydifference.toString()
    );
    if (this.daily_bible_id === 1) {
      this.verse_day = CODailyBible.getDailyGospel(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === 2) {
      this.verse_day = CODailyBible.getDailyPsalm(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === 3) {
      this.verse_day = CODailyBible.getDailyWisdom(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === 4) {
      this.verse_day = CODailyBible.getNT90D(this.daydifference.toString());
    } else if (this.daily_bible_id === 5) {
      this.verse_day = CODailyBible.getReadingBibleOneYear(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === 6) {
      this.verse_day = CODailyBible.getReadingChronologicalNT(
        this.daydifference.toString()
      );
    } else if (this.daily_bible_id === 7) {
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
    this.setState({
      daily_reading_date: this.daily_reading_date
    });
    console.log(this.today);
    this.OnGOClick(this.daily_reading_date, this.today);
  }
  OnGOClick(date, today) {
    this.props.ACT_SetDailyBibleStartDate(today);
    this._storeData1();
    this.refs.modal1.close();
    Alert.alert(
      "Start Date of Reading Plan",
      "The Current Start Date of Reading Plan is : " + date
    );
    this.props.ACT_setBookChapterChange(true);
  }
  OpenCalendar() {
    this.refs.modal1.open();
  }
  setReadingPlan(readingplan) {
    Alert.alert(
      this.myreadingplan[readingplan - 1].name,
      this.myreadingplan[readingplan - 1].desc +
      "\n" +
      DCT.getValue("duration", this.language) +
      " : " +
      this.myreadingplan[readingplan - 1].duration +
      " " +
      DCT.getValue("days", this.language),
      [
        {
          text: DCT.getValue("close", this.language),
          onPress: () => console.log("Tutup"),
          style: "cancel"
        },
        {
          text: DCT.getValue("setting_reading_plan", this.language),

          onPress: () => this.ReadingPlanSetup(readingplan)
        }
      ],
      { cancelable: false }
    );
  }

  ReadingPlanSetup(readingplan) {
    this.dailybibleid = readingplan;
    this.props.ACT_SetDailyBibleID(readingplan);
    this._storeData2();
    Alert.alert(
      "Setting up Reading Plan",
      "The Current Reading Plan is : \n" +
      this.myreadingplan[readingplan - 1].name,
    );
    this.props.ACT_setBookChapterChange(true);
  }
  _storeData1 = async () => {
    try {
      await AsyncStorage.setItem(
        "daily_bible_start_date",
        this.today.toString()
      );
    } catch (error) {
      console.log(error);
    }
  };
  _storeData2 = async () => {
    try {
      await AsyncStorage.setItem("daily_bible_id", this.dailybibleid);
    } catch (error) {
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  header : {
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
export default connect(mapStateToProps, mapDispatchToProps)(DailyReadingPlan);
