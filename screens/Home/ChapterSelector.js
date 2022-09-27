import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import * as DCT from "../../dictionary";
import * as COBible from "../../common/COBible";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class ChapterSelector extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerBackTitle: "",
      headerTransparent: true,
      headerTintColor: params.titlecolor
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      data_view: [],
      list_comment_resource: [],
      commentary: []
    };
    global.data_book = [];
    this.chapter = [];
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.book_id = this.props.STORE_BIBLE.BOOK_ID;
    this.chapter_no = this.props.STORE_BIBLE.CHAPTER_NO;
    this.bible_version = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (this.bible_version === "tb" || this.bible_version === "ayt" || this.bible_version === "avb") {
      this.catalog_language = "ind";
    }
    else {
      this.catalog_language = "eng";
    }
    this.chapter_no_text = " Chapter " + this.chapter_no + " ";
    this.book_chapter = DCT.getValue("BL" + this.book_id, this.catalog_language);
    this.readfromstart = DCT.getValue("readfromstart", this.catalog_language);
    this.handleChangeTab(DCT.getValue("chaptermenu", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.GOCallAPI();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChangeTab = title => {
    this.props.navigation.setParams({
      title: title
    });
  };
  render() {
    return (
      <ScrollView style={[styles.header,{  backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
        <View style={{ paddingTop: 10,  marginLeft: 15,
              marginRight: 15, flexDirection: "row", backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR }}>
          <View
            style={{
              flex: 4.5,
              paddingBottom: 10,
            
            }}
          >
            <Text style={{ fontFamily: 'NotoSans-Bold', fontSize: 16, color:this.props.STORE_STYLE.TEXT_COLOR}}>
              {this.book_chapter}
            </Text>
          </View>
          <View
            style={{
              flex: 4.5,
              paddingBottom: 10
            }}

          >
            <TouchableOpacity
              key={"Chapter"}
              onPress={() => {
                this.SetChapter(1);
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  color:this.props.STORE_STYLE.TEXT_COLOR_URL,
                  paddingLeft: 10,
                  fontSize: 16
              
                }}
              >
                {this.readfromstart}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 15,
            marginRight: 15,
            paddingRight: 5
          }}
        >
          {this.chapter}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    );
  }
  SetChapter(value) {
    this.chapter_no = value;
    this._storeData();
    this.props.ACT_setChapterNo(value);
    this.props.ACT_setBookChapterChange(true);
    this.props.navigation.navigate('Home')
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("chapter_no", this.chapter_no.toString());
    } catch (error) {
      console.log(error);
    }
  };
  GOCallAPI() {
    this.chapter = [];
    let total_chapter = COBible.getBookChapter(this.book_id).end;
    for (let i = 1; i <= total_chapter; i++) {
      this.chapter.push(
        <TouchableOpacity
          key={i}
          onPress={() => {
            this.SetChapter(i);
          }}
        >
          <View
            style={{
              
              width: 45,
              height: 45,
              justifyContent: "center",
              color: this.props.STORE_STYLE.TEXT_COLOR,
              borderRadius: 1,
              borderWidth: 1,
              borderColor: this.props.STORE_STYLE.BORDER_COLOR,
              backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
            }}
            key={"view" + i}

          >

            <Text
              style={{
                fontSize: 13,
                textAlign: "center",
                paddingTop: 3,
                color: this.props.STORE_STYLE.TEXT_COLOR
              }}
            >
              {i.toString()}
            </Text>

          </View>
        </TouchableOpacity>
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
    paddingVertical: 20,
    paddingBottom: 30,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingVertical: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10
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
    ACT_setBookChapterChange: value =>
      dispatch(BibleAction.setBookChapterChange(value)),
    ACT_SetOriginalVersion: set_original_version =>
      dispatch(BibleAction.setOriginalVersion(set_original_version))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChapterSelector);
