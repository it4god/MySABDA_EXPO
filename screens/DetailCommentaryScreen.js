import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity, Image, Platform, ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import TagParser from "../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import PopToTopScreen from "./Home/PopToTop";
import { Header } from 'react-navigation-stack';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from "expo-file-system";
import CryptoJS from "react-native-crypto-js";
const headerHeight = Header.HEIGHT * 1.6;
class DetailCommentaryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      }, headerRight: <PopToTopScreen myNavigation={navigation} />,
      headerTransparent: true,
      headerBackTitle: "",
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
    this.commetary = [];
    this.loading = true;
  }

  componentDidMount = () => {
    var regexremove = /(<([^>]+)>)/gi;

    this._isMounted = true;
    this.subentry_code = this.props.navigation.getParam("subentry_code", "");
    this.entry_code = this.props.navigation.getParam("entry_code", "");
    this.res_name = this.props.navigation
      .getParam("res_name", "")
      .replace(regexremove, "").replace('/<para>/g', "");
    this.key_commentary = this.props.navigation
      .getParam("key_commentary", "")
    if (this.key_commentary !== null)
      this.key_commentary = this.key_commentary
        .replace(regexremove, "")
        .replace("()", "")
        .replace("()", "")
        .replace("()", "")
        .replace(/<para>/g, "").trim();
    this.vref_commentary = this.props.navigation.getParam(
      "vref_commentary",
      ""
    );
    console.log(this.key_commentary)
    if (this.key_commentary === "Divided") this.key_commentary = "";
    this.version_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    if (
      this.version_code === "tb" ||
      this.version_code === "ayt" ||
      this.version_code === "avb"
    )
      this.lang_code = "ind";
    else this.lang_code = "eng";
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.MyParser = new TagParser(this);
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
    if(this.state.commentary.length == 0)
    {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header, {backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    else
    {
    return (
      
      <ScrollView
        style={[styles.header, {
          backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
          paddingLeft: 15,
          paddingRight: 15,

        }]}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={{ flexDirection: "column", flexWrap: "nowrap", paddingTop: 20 }}
        >
          <Text style={{ fontSize: 22, fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR }}>
            {this.key_commentary}
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 20 }}
        >
          <Text style={{ fontSize: 16, color: this.props.STORE_STYLE.TEXT_COLOR }}>
            {this.res_name}
            {" on "}
            <Text style={{ fontSize: 16, color: this.props.STORE_STYLE.TEXT_COLOR_URL }}>
              {this.vref_commentary}
            </Text>
          </Text>
        </View>
    

        {this.state.commentary.length > 0 && (
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", paddingBottom: 30 }}
          >
            {this.state.commentary}
          </View>)}

      </ScrollView>
    );
  }
  }
  GoCallAPI() {

    if (this.props.STORE_BIBLE.OFFLINE == true) {

      this.CMTOffline();

    }
    else {
      var url_commentary =
        "https://sabdapro.com:3002/App/app_comment_detail?lang_code=" +
        this.language +
        "&subentry_code=" +
        this.subentry_code;
      console.log(url_commentary);
      fetch(url_commentary)
        .then(response => response.json())
        .then(responseJson => {
          let list_comment_resource = responseJson.data.list_comment
          let text = list_comment_resource[0].text + "\n\n\n";

          if (list_comment_resource[0].entry_code.includes('barnes') === true) {
            text = text.replace(/<para>/g, "\n");
            text = text.replace(/<b>/g, "");
            text = text.replace(/<\/b>/g, "");
            text = text.replace(/<i>/g, "");
            text = text.replace(/<\/i>/g, "");
          }

          this.renderdata = this.MyParser.DoParserDiscovery(text, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
          this.setState(
            {
              commentary: this.renderdata
            },
            () => { }
          );
        });
    }
  }
  async CMTOffline() {


    let datatext = this.subentry_code;
    let manual_data_object = "";
    let manual_data_text = "";
    console.log(datatext)
    if (datatext.includes("gill-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_01_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("hagelberg-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_02_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("critics-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_03_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("barclay-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_04_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("jerusalem-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_05_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("clarke-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_06_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("sh-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_07_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("mhenry-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_08_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("haydock-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_09_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("full-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_10_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("101contra-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_11_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("wycliffe-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_12_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("bibquery-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_13_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("maclaren-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_14_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("barnes-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_15_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("guzik-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_16_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("constable-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_17_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("mhcc-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_18_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("calvincomp-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_19_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("nasb-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_20_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("av-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_21_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("tb-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_22_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("esv-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_23_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("net-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_24_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("cornel-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_29_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("mpoole-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_30_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("wesley-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_31_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("jfauss-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_32_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("robertson-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_33_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("scofield-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_34_entry.json", { encoding: EncodingType.UTF8 });
    }
    else if (datatext.includes("college-")) {
      manual_data_object = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "cmt_35_entry.json", { encoding: EncodingType.UTF8 });
      console.log("35");
    }



    var json = JSON.parse((manual_data_object));
    
    var mydata = json[datatext];

    for(let i=0;i<mydata.length;i++)
    {
      manual_data_text += mydata[i].text;
    }
    

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


    let text = decrypted.toString(CryptoJS.enc.Utf8).replace(/<\/vref>; /g, "</vref>").replace(/""/g, '"') + "\n\n\n";;


    if (datatext.includes('barnes') === true) {
      text = text.replace(/<para>/g, "\n");
      text = text.replace(/<b>/g, "");
      text = text.replace(/<\/b>/g, "");
      text = text.replace(/<i>/g, "");
      text = text.replace(/<\/i>/g, "");
    }

    this.renderdata = this.MyParser.DoParserDiscovery(text, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);
    this.setState(
      {
        commentary: this.renderdata
      },
    )



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

                  <View style={{ alignItems: "center", justifyContent: "center", height: 50, width: 100 }}>
                    <Image
                      source={require("../assets/images/cross.png")}
                      style={{ width: 15, height: 15, marginLeft: 8 }}
                    />
                  </View>

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
    var ver_code = "esv";
    if (props.lang_code == "eng") ver_code = "esv";
    else ver_code = "tb";
    if (classnumber === "clsVref") {
      DialogManager.dismissAll(() => { });
      props.props.navigation.navigate("VerseScreen", {
        value: value
      });
      /*
            var vid = array[1];
            var verse = array[2];
            let array_vid = [];
            if (vid.indexOf(",") > 0) {
              array_vid = vid.split(",");
            }
            if (array_vid.length === 0) {
              let urlvref =
                "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
                vid +
                "&ver_code=" + ver_code;
              console.log(urlvref);
              fetch(urlvref)
                .then(response => response.json())
                .then(responseJson => {
                  this.vrefdata = JSON.stringify(
                    JSON.parse(JSON.stringify(responseJson)).data.list_verse
                  );
                  let myvrefdata = JSON.parse(this.vrefdata);
                  let text = "";
                  let texttemp = "";
                  for (let i = 0; i < myvrefdata.length; i++)
                    {
                      texttemp = myvrefdata[i].text;
                      texttemp = texttemp.replace(/<para>/g,"");
                      texttemp = texttemp.replace(/<\/para>/g,"");
                      text += texttemp
                    }
      
                  let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
                  this.rendertext = props.MyParser.DoParserBibleFullVersion(text,true,false,true,false, props.props.STORE_BIBLE.FONT_SIZE, props.version_code, true);
                  props.ShowDialogVerse(this.rendertext, verse);
                });
            } else {
              this.rendertext = [];
      
              for (let x = 0; x < array_vid.length; x++) {
                this.versevref = " ";
                let urlvref =
                  "https://sabdapro.com:3002/App/app_verse_text?type_search=L&vid=" +
                  array_vid[x] +
                  "&ver_code=" + ver_code;
                console.log(urlvref);
                fetch(urlvref)
                  .then(response => response.json())
                  .then(responseJson => {
                    this.vrefdata = JSON.stringify(
                      JSON.parse(JSON.stringify(responseJson)).data.list_verse
                    );
                    let myvrefdata = JSON.parse(this.vrefdata);
                    let text = "";
                    let texttemp = "";
                    for (let i = 0; i < myvrefdata.length; i++)
                    {
                      texttemp = myvrefdata[i].text;
                      texttemp = texttemp.replace(/<para>/g,"");
                      texttemp = texttemp.replace(/<\/para>/g,"");
                      text += texttemp
                    }
                 
      
                    
      
                    let verse = myvrefdata[0].book + " " + myvrefdata[0].chapter;
                    this.rendertext.push(
                      <View key={array_vid[x] + " title"} style={{ height: 40 }}>
                        <Text
                          style={{
                            color: "#353535",
                            fontSize: 25,
                            textAlign: "center"
                          }}
                        >
                          {verse}
                        </Text>
                      </View>
                    );
                    this.rendertext.push(props.MyParser.DoParserBibleFullVersion(text,true,false,true,false, props.props.STORE_BIBLE.FONT_SIZE, props.version_code, true));
                    this.rendertext.push(
                      <View key={array_vid[x]} style={{ height: 20 }}></View>
                    );
               
                  });
              }
      
              setTimeout(() => {
                props.ShowDialogVerse(this.rendertext, " ");
              }, 600);
            }
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
    justifyContent: "center",
  },
  fontEntityMention: {
    fontSize: 13,
    fontFamily: "NotoSans-Bold",
  },
  fontEntityCategory: {
    fontSize: 11,
    fontWeight: "normal",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
)(DetailCommentaryScreen);
