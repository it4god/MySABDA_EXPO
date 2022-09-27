import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Platform,   ActivityIndicator, } from "react-native";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import TagParser from "../../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import PopToTopScreen from "../Home/PopToTop";
import { Header } from 'react-navigation-stack';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from "expo-file-system";
import CryptoJS from "react-native-crypto-js";
const headerHeight = Header.HEIGHT * 1.6;
class WordStudyDictionary extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerRight: <PopToTopScreen myNavigation={navigation} />,
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
      dictionary: [],
      loading : true,
    };
    global.data_book = [];
    this.commetary = [];
  }

  componentDidMount = () => {
    var regexremove = /<([^>]+?)([^>]*?)>(.*?)<\/\1>/gi;

    this._isMounted = true;
    this.MyParser = new TagParser(this);
    this.entry_id = this.props.navigation.getParam("entry_id", "");
    this.lang_code = "eng";
    this.version_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.version_code === "tb" ||
      this.version_code === "ayt" ||
      this.version_code === "avb"
    )
      this.lang_code = "ind";
    else this.lang_code = "eng";
    this.res_name = this.props.navigation
      .getParam("res_name", "")
      .replace(regexremove, "");
    this.term = this.props.navigation
      .getParam("term", "")
      .replace(regexremove, "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;

    this.handleChangeTab(this.res_name, this.language);
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.GoCallAPI();
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
    if (this.state.loading === true) {
      return (
        <View style={[styles.containerActivityIndicator, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else {
      return (
        <ScrollView
          style={[styles.header, {
            backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
            paddingLeft: 15,
            paddingRight: 15, paddingTop: 80
          }]}
          contentContainerStyle={styles.contentContainer}
        >
          <View
            style={{ flexDirection: "column", flexWrap: "nowrap", paddingTop: 20 }}
          >
            <Text style={{ fontSize: 22, fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR }}>{this.term}</Text>
          </View>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 20 }}
          >
            <Text style={{ fontSize: 16, color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
              {this.res_name}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 30 }}
          >
            {this.state.dictionary}
          </View>
        </ScrollView>
      );
    }
  }
  GoCallAPI() {

    if (this.props.STORE_BIBLE.OFFLINE == true) {


      this.OfflineDictionary();


    }
    else {
      var url_dictionary =
        "https://sabdapro.com:3002/App/app_lex_dictionary?lang_code=" +
        this.language +
        "&entry_id=" +
        this.entry_id +
        "&skip=0&limit=6";
      console.log(url_dictionary);
      fetch(url_dictionary)
        .then(response => response.json())
        .then(responseJson => {
          this.dictionary = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_dict
          );
          var list_dictionary = JSON.parse(this.dictionary);

          let text = list_dictionary[0].text + "\n\n\n";

          this.renderdata = this.MyParser.DoParserDiscovery(text, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);

          this.setState(
            {
              dictionary: this.renderdata,
              loading : false
            },
            () => { }
          );
        });
    }


  }
  async OfflineDictionary() {


    let datatext = this.entry_id;
    let manual_data_object = "";
    let manual_data_text = "";
    console.log(datatext)
    if (datatext.includes("hitchcock")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_01_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("ebd")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_02_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("isbe")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_03_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("smith")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_04_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("nave")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_05_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("netmap")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_12_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("pedoman")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_15_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("gering")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_16_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("haag")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_17_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("tokoh")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_18_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("kecil")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_19_entry.json", { encoding: EncodingType.UTF8 });
    }

    else if (datatext.includes("lambang")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_23_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("browning")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_24_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("ensiklopedia")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "dct_27_entry.json", { encoding: EncodingType.UTF8 });
    }

    var json = JSON.parse((manual_data_object));
    console.log(json)
    console.log(json[datatext.toString()].definition);
    manual_data_text = json[datatext].definition;

    var key = CryptoJS.enc.Hex.parse('2d4d6d615f79353444395f413133502d7a73306c69443351367152314168613d');
    var iv = CryptoJS.enc.Hex.parse(manual_data_text.substring(0, 32));
    var manual_data = (manual_data_text.substring(32));
    var decrypted = CryptoJS.AES.decrypt(
      manual_data, key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );




    let thedefinition = this.MyParser.DoParserDiscovery(
      decrypted.toString(CryptoJS.enc.Utf8).replace(/<\/vref>; /g, "</vref>").replace(/""/g, '"'), this.props.STORE_BIBLE.IS_SHOW_DARKMODE
    );

    this.setState(
      {
        dictionary: thedefinition,
        loading : false
      },
      () => { }
    );
  }

  ShowDialogVerse(text, verse) {
    DialogManager.show(
      {
        title: " ",
        titleAlign: "center",
        animationDuration: 200,
        ScaleAnimation: new ScaleAnimation(),
        children: (
          <DialogContent>
            <ScrollView>
              <View style={{ flexDirection: "row-reverse" }}>
                <TouchableOpacity onPress={() => {
                  DialogManager.dismissAll(() => { });
                }}>
                  {/*Donute Button Image */}
                  <Image
                    source={require("../../assets/images/cross.png")}
                    style={{ width: 15, height: 15, marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: "#353535",
                  fontSize: 25,
                  textAlign: "center"
                }}
              >
                {verse}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  paddingTop: 20,
                  paddingBottom: 150,
                  justifyContent: "flex-end"
                }}
              >
                {text}
              </View>
            </ScrollView>
          </DialogContent>
        )
      },
      () => { }
    );
  }

  ClickReaction(value, props) {
    var str = value.replace(/seterip/g, "-");
    var array = str.split("|");
    var classnumber = array[0];
    var ver_code = "esv"
    if (props.lang_code == "eng") ver_code = "esv"
    else ver_code = "tb";
    if (classnumber === "clsVref") {

      DialogManager.dismissAll(() => { });
      props.props.navigation.navigate("VerseScreen", {
        value: value
      });

      /*
      var vid = array[1];
      var verse = array[2];

      let urlvref =
        "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
        vid +
        "&ver_code="+ props.version_code;
      fetch(urlvref)
        .then(response => response.json())
        .then(responseJson => {
          this.vrefdata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_verse
          );
          let myvrefdata = JSON.parse(this.vrefdata);
          let text = "";
          for (let i = 0; i < myvrefdata.length; i++)
            text += myvrefdata[i].text;
          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");
          this.rendertext = props.MyParser.DoParserBibleFullVersion(text,true,false,true,false, props.props.STORE_BIBLE.FONT_SIZE, props.version_code);
          props.ShowDialogVerse(this.rendertext, verse);
        });
      /*
      this.strongnumberdata = [];
      var urlstrongnumber =
        "https://sabdapro.com:3002/App/app_lex_strong?&lang_code=" +
        props.state.language +
        "&strong_aug=" +
        strongnumber;

      let text = "";
      fetch(urlstrongnumber)
        .then(response => response.json())
        .then(responseJson => {
          this.strongnumberdata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.lex_data
          );
          var mystrongnumber = JSON.parse(this.strongnumberdata);
          this.strongnumber = mystrongnumber[0].strong;
          this.lemma = mystrongnumber[0].lemma;

          props.setState({
            snackIsVisible: true,
            snlabel: "        " + this.lemma + "     " + this.strongnumber,
            wordstrong: this.wordstrong,
            snumber: this.strongnumber
          });
        });
    */
    }
    if (classnumber === "clsCmt") {
      var strongnumber = array[1];
      strongnumber = strongnumber.replace("entry_code##", "");

      var urlcmtnumber =
        "https://sabdapro.com:3002/App/app_comment_detail?lang_code=" +
        props.language +
        "&entry_code=" +
        strongnumber;
      let text = "";

      fetch(urlcmtnumber)
        .then(response => response.json())
        .then(responseJson => {
          this.listcommentdata = JSON.stringify(
            JSON.parse(JSON.stringify(responseJson)).data.list_comment
          );
          var commentdata = JSON.parse(this.listcommentdata);
          let text = commentdata[0].text;
          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");

          this.rendertext = props.MyParser.DoParserDiscovery(text);
          props.GoShowCMT(this.rendertext);
        });
    }
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
            <ScrollView>
              <View
                style={{
                  flexDirection: "column",
                  paddingBottom: 10,
                  justifyContent: "center"
                }}
              >
                {value}
              </View>
            </ScrollView>
          </DialogContent>
        )
      },
      () => { }
    );
  }
}

const styles = StyleSheet.create({
  header: {
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
  },
  containerActivityIndicator: {
    flex: 1,
    justifyContent: "center"
  },
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
      dispatch(BibleAction.setLangChange(lang_code))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordStudyDictionary);
