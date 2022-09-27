import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { Header } from 'react-navigation-stack';
import { HeaderBackButton } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app_language: "English",
      day: "",
      daily_reading_date: "",
    };
    this.can_download = true;
    this.maintenance = false;
    this.how_to = false;
  }
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerTitle: (
      <Text
        style={{ fontSize: 16, color: "#FFFFFF", fontFamily: "NotoSans-Bold" }}
      >
        MySabda
      </Text>
    ),
    headerStyle: {
      backgroundColor: "#3B64DB",
    },
    headerLeft: <HeaderBackButton tintColor={"#FFFFFF"} onPress={() => {

      navigation.navigate('Home')

    }} />,
    headerTransparent: true,
    headerBackTitle: "",
    headerTintColor: "#FFFFFF",
  });

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    if (this.props.STORE_BIBLE.LANG_CODE === "eng")
      this.setState({ app_language: "English" });
    else this.setState({ app_language: "Indonesia" });
    this.props.ACT_setBookChapterChange(true);
    this.GoCallAPI();
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[styles.container,styles.header]}>
        <View style={{ flex: 9 }}>
          <View style={styles.containertopRow}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "NotoSans-Bold",
                color: "#ffffff",
              }}
            >
              MySABDA
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#D3D3D3",
              borderRadius: 5,
              marginRight: 15,
              marginLeft: 15,
              backgroundColor: "#ffffff",
            }}
          >
            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
              <Image
                style={{ width: 25, height: 25, paddingRight: 1 }}
                source={require("../assets/images/study_bible.png")}
              />
            </View>
            <View style={styles.containerBottom}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Home')
                }
                style={styles.containerBottomItem}
              >
                <View style={styles.button}>
                  <Text style={styles.txtBottom}>
                    {DCT.getValue("menu_study_bible", this.language)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 10 }}></View>
          {this.can_download && (
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#D3D3D3",
                borderRadius: 5,
                marginRight: 15,
                marginLeft: 15,
                backgroundColor: "#ffffff",
              }}
            >
              <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                <Image
                  style={{ width: 25, height: 25, paddingRight: 1 }}
                  source={require("../assets/images/download.png")}
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Download")}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      {DCT.getValue("download", this.language)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {this.can_download && <View style={{ height: 10 }}></View>}
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#D3D3D3",
              borderRadius: 5,
              marginRight: 15,
              marginLeft: 15,
              backgroundColor: "#ffffff",
            }}
          >
            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
              <Image
                style={{ width: 25, height: 25, paddingRight: 1 }}
                source={require("../assets/images/about.png")}
              />
            </View>
            <View style={styles.containerBottom}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("AboutUs")}
                style={styles.containerBottomItem}
              >
                <View style={styles.button}>
                  <Text style={styles.txtBottom}>
                    {DCT.getValue("menu_about", this.language)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 10 }}></View>
          {this.how_to && (
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#D3D3D3",
                borderRadius: 5,
                marginRight: 15,
                marginLeft: 15,
                backgroundColor: "#ffffff",
              }}
            >
              <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
                <Image
                  style={{ width: 25, height: 25, paddingRight: 1 }}
                  source={require("../assets/images/how_to.png")}
                />
              </View>
              <View style={styles.containerBottom}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Howto")}
                  style={styles.containerBottomItem}
                >
                  <View style={styles.button}>
                    <Text style={styles.txtBottom}>
                      {DCT.getValue("how_to", this.language)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {this.how_to && <View style={{ height: 10 }}></View>}
          <View
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderColor: "#D3D3D3",
              borderRadius: 5,
              marginRight: 15,
              marginLeft: 15,
              backgroundColor: "#ffffff",
            }}
          >
            <View style={{ flex: 2, paddingTop: 9, paddingLeft: 20 }}>
              <Image
                style={{ width: 25, height: 25, paddingRight: 1 }}
                source={require("../assets/images/how_to.png")}
              />
            </View>
            <View style={styles.containerBottom}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Feedback")}
                style={styles.containerBottomItem}
              >
                <View style={styles.button}>
                  <Text style={styles.txtBottom}>
                    {DCT.getValue("feedback", this.language)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 10 }}></View>
          <TouchableOpacity
            onPress={() =>
              this.Daily_Bible(this.state.daily_reading_date, this.state.day)
            }
          >
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#D3D3D3",
                borderRadius: 5,
                marginRight: 15,
                marginLeft: 15,
                paddingTop: 10,
                paddingBottom: 40,
                backgroundColor: "#ffffff",
              }}
            >
              <View style={{ flex: 7, paddingTop: 9, paddingLeft: 20 }}>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#105B8E" }}>
                    {DCT.getValue("dailybible", this.language)}
                  </Text>
                  <Text style={{ fontSize: 12, color: "#5D5D5D" }}>
                    {this.state.daily_reading_date}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 3, paddingTop: 9, paddingLeft: 20 }}>
                <Image
                  style={{ width: 50, height: 50, paddingRight: 1 }}
                  source={require("../assets/images/sun.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ height: 10 }}></View>
        </View>
        <Text
          style={{ fontSize: 14, textAlign:"center", color: "#FFFFFF", fontFamily: "NotoSans-Bold" }}
        > BETA version
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginRight: 15,
            marginLeft: 15,
            alignItems: "center",
            justifyContent: "center",

            borderWidth: 1,
            borderColor: "#D3D3D3",
            borderRadius: 5,
            backgroundColor: "#3B93DB",
            flex: 1,
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              flex: 4,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AppLanguages")}
            >
              <Image
                style={{ width: 25, height: 25 }}
                source={require("../assets/images/language_white.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 6, paddingLeft: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#FFFFFF",
              }}
              onPress={() => this.props.navigation.navigate("AppLanguages")}
            >
              {this.state.app_language}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  GoCallAPI() {
    let urldailyreading =
      "https://sabdapro.com:3002/App/app_daily_bible?limit=33&skip=0&month=" +
      (new Date().getMonth() + 1).toString();
    console.log(urldailyreading);
    fetch(urldailyreading)
      .then((response) => response.json())
      .then((responseJson) => {
        this.daily_bible = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_daily_bible
        );

        let daily_bible = JSON.parse(this.daily_bible);
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
      });
  }
  Daily_Bible(daily_reading_date, day) {
    if (!this.maintenance) {
      const { navigate } = this.props.navigation;
      navigate("DailyBible", {
        daily_reading_date: daily_reading_date,
        day: day,
      });
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
}

const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    backgroundColor: "#3B64DB",
    flexDirection: "column",
  },
  containertopRow: {
    marginTop: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  txtBottom: {
    color: "#353535",
    fontSize: 15,
    fontWeight: "100",
  },
  imageTopRow: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        borderRadius: 80 / 2,
      },
      android: {
        borderRadius: 80,
      },
    }),
  },
  icon: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  containertopRowText: {
    flexDirection: "column",
    marginLeft: 5,
  },

  containerBottom: {
    flex: 8,
    paddingRight: 20,
  },
  containerBottomItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: "#E6FAFF",
    borderBottomWidth: 0.5,
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
    ACT_setBookChapterChange: (book_chapter_change) =>
    dispatch(BibleAction.setBookChapterChange(book_chapter_change)),
    ACT_setCacheData: (key, listdata) =>
      dispatch(BibleAction.setCacheData(key, listdata)),
    ACT_setLangChange: (lang_code) =>
      dispatch(BibleAction.setLangChange(lang_code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
