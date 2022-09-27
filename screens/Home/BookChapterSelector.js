import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Platform,
} from "react-native";
import * as DCT from "../../dictionary";
import * as COBible from "../../common/COBible";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";

import { List } from "react-native-paper";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class BookChapterSelector extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "NotoSans-Bold",
              color: params.titlecolor,
            }}
          >
            {navigation.getParam("title", "")}
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data_view: [],
      list_comment_resource: [],
      isnewtest: true,
      isoldtest: true,
      expanded: true,
    };
    global.data_book = [];
    this.commetary = [];
  }
  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded,
    });

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.book_id = this.props.STORE_BIBLE.BOOK_ID;
    this.chapter_no = this.props.STORE_BIBLE.CHAPTER_NO;
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
    this.chapter_no_text = " Chapter " + this.chapter_no + " ";
    this.handleChangeTab(DCT.getValue("bookchaptermenu", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR,
    });
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
    return (
      <ScrollView
        style={[
          styles.header,
          { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 5,
            borderWidth: 1,
            borderColor: this.props.STORE_STYLE.BORDER_COLOR,
            borderRadius: 5,
            marginRight: 15,
            marginLeft: 15,
          }}
        >
          <View
            style={{
              flex: 4.5,
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 17,
                fontFamily: "NotoSans-Bold",
                color: this.props.STORE_STYLE.TEXT_COLOR,
              }}
            >
              {" "}
              {DCT.getValue("BL" + this.book_id, this.catalog_language)}
            </Text>
          </View>
          <View
            style={{
              flex: 4.5,
              paddingBottom: 10,
            }}
          >
            <TouchableOpacity
              key={"Chapter"}
              onPress={() => {
                const { navigate } = this.props.navigation;

                navigate("ChapterSelector", {});
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 16,
                }}
              >
                {this.chapter_no_text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <List.Section>
          <List.Accordion
            title={DCT.getValue("oldtest", this.catalog_language)}
            titleStyle={{
              fontFamily: "NotoSans-Bold",
              fontSize: 16,
              color: this.props.STORE_STYLE.TEXT_COLOR,
            }}
            expanded={this.state.isoldtest}
            onPress={() => this.setState({ isoldtest: !this.state.isoldtest })}
            style={{ marginLeft: 15 }}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingRight: 5,
                paddingLeft : 10,
                marginLeft: 15,
                backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book1"}
                  onPress={() => {
                    this.SetBibleBook("Kej");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B1", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book2"}
                  onPress={() => {
                    this.SetBibleBook("Kel");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",

                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B2", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book3"}
                  onPress={() => {
                    this.SetBibleBook("Im");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B3", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book4"}
                  onPress={() => {
                    this.SetBibleBook("Bil");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B4", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book5"}
                  onPress={() => {
                    this.SetBibleBook("Ul");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B5", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book6"}
                  onPress={() => {
                    this.SetBibleBook("Yos");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B6", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book7"}
                  onPress={() => {
                    this.SetBibleBook("Hak");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B7", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book8"}
                  onPress={() => {
                    this.SetBibleBook("Rut");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B8", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book9"}
                  onPress={() => {
                    this.SetBibleBook("1Sam");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B9", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book10"}
                  onPress={() => {
                    this.SetBibleBook("2Sam");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B10", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book11"}
                  onPress={() => {
                    this.SetBibleBook("1Raj");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B11", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book12"}
                  onPress={() => {
                    this.SetBibleBook("2Raj");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B12", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book13"}
                  onPress={() => {
                    this.SetBibleBook("1Taw");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B13", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book14"}
                  onPress={() => {
                    this.SetBibleBook("2Taw");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B14", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book15"}
                  onPress={() => {
                    this.SetBibleBook("Ezr");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B15", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book16"}
                  onPress={() => {
                    this.SetBibleBook("Neh");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B16", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book17"}
                  onPress={() => {
                    this.SetBibleBook("Est");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B17", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book18"}
                  onPress={() => {
                    this.SetBibleBook("Ayb");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B18", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book19"}
                  onPress={() => {
                    this.SetBibleBook("Mzm");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B19", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book20"}
                  onPress={() => {
                    this.SetBibleBook("Ams");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B20", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book21"}
                  onPress={() => {
                    this.SetBibleBook("Pkh");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B21", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book22"}
                  onPress={() => {
                    this.SetBibleBook("Kid");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B22", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book23"}
                  onPress={() => {
                    this.SetBibleBook("Yes");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B23", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book24"}
                  onPress={() => {
                    this.SetBibleBook("Yer");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B24", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book25"}
                  onPress={() => {
                    this.SetBibleBook("Rat");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B25", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book26"}
                  onPress={() => {
                    this.SetBibleBook("Yeh");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B26", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book27"}
                  onPress={() => {
                    this.SetBibleBook("Dan");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B27", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book28"}
                  onPress={() => {
                    this.SetBibleBook("Hos");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B28", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book29"}
                  onPress={() => {
                    this.SetBibleBook("Yl");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B29", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book30"}
                  onPress={() => {
                    this.SetBibleBook("Am");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B30", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book31"}
                  onPress={() => {
                    this.SetBibleBook("Ob");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B31", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book32"}
                  onPress={() => {
                    this.SetBibleBook("Yun");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B32", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book33"}
                  onPress={() => {
                    this.SetBibleBook("Mi");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B33", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book34"}
                  onPress={() => {
                    this.SetBibleBook("Nah");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B34", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book35"}
                  onPress={() => {
                    this.SetBibleBook("Hab");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B35", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book36"}
                  onPress={() => {
                    this.SetBibleBook("Zef");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B36", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book37"}
                  onPress={() => {
                    this.SetBibleBook("Hag");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B37", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book38"}
                  onPress={() => {
                    this.SetBibleBook("Za");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B38", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book39"}
                  onPress={() => {
                    this.SetBibleBook("Mal");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B39", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </List.Accordion>
          <List.Accordion
            title={DCT.getValue("newtest", this.catalog_language)}
            titleStyle={{
              fontFamily: "NotoSans-Bold",
              fontSize: 16,
              color: this.props.STORE_STYLE.TEXT_COLOR,
            }}
            expanded={this.state.isnewtest}
            onPress={() => this.setState({ isnewtest: !this.state.isnewtest })}
            style={{             marginLeft: 15,}}
          >
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingRight: 5,
                marginLeft: 15,
                paddingLeft : 10,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book40"}
                  onPress={() => {
                    this.SetBibleBook("Mat");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",

                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B40", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book41"}
                  onPress={() => {
                    this.SetBibleBook("Mrk");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B41", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book42"}
                  onPress={() => {
                    this.SetBibleBook("Luk");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B42", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book43"}
                  onPress={() => {
                    this.SetBibleBook("Yoh");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B43", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book44"}
                  onPress={() => {
                    this.SetBibleBook("Kis");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B44", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book45"}
                  onPress={() => {
                    this.SetBibleBook("Rom");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B45", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book46"}
                  onPress={() => {
                    this.SetBibleBook("1Kor");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B46", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book47"}
                  onPress={() => {
                    this.SetBibleBook("2Kor");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B47", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book48"}
                  onPress={() => {
                    this.SetBibleBook("Gal");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B48", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book49"}
                  onPress={() => {
                    this.SetBibleBook("Ef");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B49", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book50"}
                  onPress={() => {
                    this.SetBibleBook("Flp");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B50", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book51"}
                  onPress={() => {
                    this.SetBibleBook("Kol");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B51", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book52"}
                  onPress={() => {
                    this.SetBibleBook("1Tes");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B52", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book53"}
                  onPress={() => {
                    this.SetBibleBook("2Tes");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B53", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book54"}
                  onPress={() => {
                    this.SetBibleBook("1Tim");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B54", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book55"}
                  onPress={() => {
                    this.SetBibleBook("2Tim");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B55", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book56"}
                  onPress={() => {
                    this.SetBibleBook("Tit");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B56", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book57"}
                  onPress={() => {
                    this.SetBibleBook("Flm");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B57", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book58"}
                  onPress={() => {
                    this.SetBibleBook("Ibr");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B58", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book59"}
                  onPress={() => {
                    this.SetBibleBook("Yak");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B59", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book60"}
                  onPress={() => {
                    this.SetBibleBook("1Ptr");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B60", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book61"}
                  onPress={() => {
                    this.SetBibleBook("2Ptr");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B61", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book62"}
                  onPress={() => {
                    this.SetBibleBook("1Yoh");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B62", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book63"}
                  onPress={() => {
                    this.SetBibleBook("2Yoh");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B63", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book64"}
                  onPress={() => {
                    this.SetBibleBook("3Yoh");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B64", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book65"}
                  onPress={() => {
                    this.SetBibleBook("Yud");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B65", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 52,
                  height: 38,
                  justifyContent: "center",
                  color: this.props.STORE_STYLE.TEXT_COLOR,
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                }}
              >
                <TouchableOpacity
                  key={"book66"}
                  onPress={() => {
                    this.SetBibleBook("Why");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: "center",
                      paddingTop: 0,
                      color: this.props.STORE_STYLE.TEXT_COLOR,
                    }}
                  >
                    {DCT.getValue("B66", this.catalog_language)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </List.Accordion>
        </List.Section>
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  }
  SetBibleBook(value) {
    var book_id = COBible.getBookID(value);
    this.props.ACT_setBookID(book_id);
    this.book_id = book_id;
    this.chapter_no = 1;
    this._storeData();
    this.chapter_no_text = " Chapter " + this.chapter_no + " ";

    const { navigate } = this.props.navigation;

    navigate("ChapterSelector", {});
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("book_id", this.book_id.toString());
      await AsyncStorage.setItem("chapter_no", "1");
    } catch (error) {
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "ios" ? 70 : 85,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    STORE_BIBLE: state.bible,
    STORE_STYLE: state.style,
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookChapterSelector);
