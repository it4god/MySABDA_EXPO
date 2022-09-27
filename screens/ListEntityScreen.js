import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator, 
  Platform
} from "react-native";
import * as COMethods from "../common/COMethods";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import PopToTopScreen from "./Home/PopToTop";
import { Card } from "react-native-elements";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class ListEntity extends Component {
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
      verse_list: [],
      entity_list: [],
      see_also: [],
      isLoading: false
    };
    this.totalentity = 0;
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.book_id = this.props.navigation.getParam("book_id", "");
    this.chapter_no = this.props.navigation.getParam("chapter_no", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.fsize = Number(this.props.STORE_BIBLE.FONT_SIZE) + 1;
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 1;
    this.handleChangeTab(DCT.getValue("entity", this.language));
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
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header, { backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      if (this.state.entity_list.length > 0) {
        return (
          <ScrollView
            style={[styles.container,styles.header, { backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, borderBottomWidth : 1, borderColor: this.props.STORE_STYLE.BORDER_COLOR}]}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={{borderTopWidth: 1, borderColor: this.props.STORE_STYLE.BORDER_COLOR}}></View>
            <View style={{   flexDirection: "column", flexWrap: "nowrap",backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, borderWidth :1,  borderColor :  this.props.STORE_STYLE.BORDER_COLOR, }}>
              {this.state.entity_list}
            </View>
            <View style={{height:160,backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR }}></View>
          </ScrollView>
        );
      }
      else {
        return (
          <ScrollView contentContainerStyle={styles.contentContainer}  style={[styles.container, styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
            <Text style={{ paddingLeft: 20 }}>{DCT.getValue("00000029", this.language)}</Text>
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
  GoCallAPI() {
    var urlListEntity =
      "https://sabdapro.com:3002/App/app_entity_verse?limit=100&skip=0&lang_code=" +
      this.language +
      "&type_search=BC&book_id=" +
      this.book_id +
      "&chapter_no=" +
      this.chapter_no;

    fetch(urlListEntity)
      .then(response => response.json())
      .then(responseJson => {
        this.list_entity = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_entity
        );
        let list_entity = JSON.parse(this.list_entity);
        this.entity_list = [];
        this.totalentity > list_entity.length;
        for (let i = 0; i < list_entity.length; i++) {
          span_id = COMethods.getUniqueId("ListEntity");
          let entity_id = list_entity[i].entity_id;
          // category = list_entity[i].category;
          let category = list_entity[i].definition;
          let entity_mention = list_entity[i].entity_mention;
          let thumb = list_entity[i].thumb120_file;
          let thumbnail = "http://mysabda.net/media/entity/thumb-120px/" + thumb;

          if (thumb != null) {
            this.entity_list.push(
              <Card containerStyle={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, borderColor : this.props.STORE_STYLE.BORDER_COLOR, }} style={{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, flex: 1, borderColor : this.props.STORE_STYLE.BORDER_COLOR, borderWidth : 1}} key={span_id + "card " + i.toString}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    flexWrap: "nowrap", 
                  }}
                  key={span_id + "view " + i.toString}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenSearchEntity(
                        entity_id,
                        entity_mention,
                        this.language
                      );
                    }}
                    style={{ flex: 3 }}
                  >
                    <Image
                      key={span_id + "image " + i.toString}
                      source={{
                        uri: thumbnail
                      }}
                      style={{ width: 70, height: 70 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.OpenSearchEntity(
                        entity_id,
                        entity_mention,
                        this.language
                      );
                    }}
                    style={{ flex: 7 }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        paddingLeft: 1
                      }}
                    >
                      <Text
                        style={{ fontSize: this.fsize, fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR }}
                        key={span_id + "entity_mention " + i.toString}
                      >
                        {entity_mention}
                      </Text>
                      <Text
                        style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                        key={span_id + "category " + i.toString}
                      >
                        {category}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          } else {
            if (category === "world" || category == "location") {
              this.entity_list.push(
                <Card containerStyle={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,borderColor : this.props.STORE_STYLE.BORDER_COLOR,}}  style={{ flex: 1,backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }} key={span_id + "card " + i.toString}>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      flexWrap: "nowrap", backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                    key={span_id + "view " + i.toString}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                      style={{ flex: 3 }}
                    >
                      <Image
                        style={{ width: 70, height: 70 }}
                        fill="black"
                        source={require("../assets/images/ic_world.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                      style={{ flex: 7 }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          flexWrap: "nowrap",
                          paddingLeft: 1
                        }}
                      >
                        <Text
                          style={{ fontSize: this.fsize, fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR  }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "category " + i.toString}
                        >
                          {category}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            } else if (category === "person") {
              this.entity_list.push(
                <Card  containerStyle={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}}  style={{ flex: 1,backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }} key={span_id + "card " + i.toString}>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      flexWrap: "nowrap" , backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                    key={span_id + "view " + i.toString}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                      style={{ flex: 3 }}
                    >
                      <Image
                        style={{ width: 70, height: 70 }}
                        fill="black"
                        source={require("../assets/images/ic_person.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                      style={{ flex: 7 }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          flexWrap: "nowrap",
                          paddingLeft: 1
                        }}
                      >
                        <Text
                          style={{ fontSize: this.fsize, fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR  }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone , color:this.props.STORE_STYLE.TEXT_COLOR  }}
                          key={span_id + "category " + i.toString}
                        >
                          {category}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            } else if (category === "people") {
              this.entity_list.push(
                <Card  containerStyle={{backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}}  style={{ flex: 1, backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,  }} key={span_id + "card " + i.toString}>
                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      flexWrap: "nowrap" , backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                    key={span_id + "view " + i.toString}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                      style={{ flex: 3 }}
                    >
                      <Image
                        style={{ width: 70, height: 70 }}
                        fill="black"
                        source={require("../assets/images/ic_people.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.OpenSearchEntity(
                          entity_id,
                          entity_mention,
                          this.language
                        );
                      }}
                      style={{ flex: 7 }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          flexWrap: "nowrap",
                          paddingLeft: 1
                        }}
                      >
                        <Text
                          style={{ fontSize: this.fsize, fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR  }}
                          key={span_id + "entity_mention " + i.toString}
                        >
                          {entity_mention}
                        </Text>
                        <Text
                          style={{ fontSize: this.fsizeminusone, color:this.props.STORE_STYLE.TEXT_COLOR }}
                          key={span_id + "category " + i.toString}
                        >
                          {category}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Card>
              );
            }
          }
        }

        if (this._isMounted) {
          this.setState({
            entity_list: this.entity_list,
            isLoading: true
          });
        }
      });
  }

  OpenSearchEntity(entity_id, entity_mention, language) {
    // const {navigate } = this.props.navigation;
    /*
    navigate("Search", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Search Screen " + Math.random
    });
    */
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
    paddingBottom: 50
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 50
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
    ACT_SetBibleParallel: set_bible_paralell =>
      dispatch(BibleAction.setBibleParallel(set_bible_paralell)),
    ACT_SetParallel: set_parallel =>
      dispatch(BibleAction.setParallel(set_parallel))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListEntity);
