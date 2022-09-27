import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity, Image,
  Platform
} from "react-native";
import PopToTopScreen from "../Home/PopToTop";
import * as DCT from "../../dictionary";
import TagParser from "../../common/TagParser";
import DialogManager, {
  ScaleAnimation,
  DialogContent
} from "react-native-dialog-component";
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class EntityDetailBibleDictionary extends Component {
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
      res_name: "",
      term: "",
      text: [],
      isLoading: false
    };
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.entry_id = this.props.navigation.getParam("entry_id", "");
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.MyParser = new TagParser(this);
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
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row", flexWrap: "nowrap", paddingBottom: 20, }}>
              <Text
                style={{
                  paddingLeft: 5,
                  fontSize: 20,
                  flex: 3,
                  color: "#353535",
                  fontFamily: 'NotoSans-Bold', color:this.props.STORE_STYLE.TEXT_COLOR
                }}
              >
                {this.state.term}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  flex: 7,
                  color:this.props.STORE_STYLE.TEXT_COLOR_URL,
                  fontWeight: "normal"
                }}
              >
                {this.state.res_name}
              </Text>
            </View>
            {this.state.text}
          </View>
          <View style={{height : 60}}></View>
        </ScrollView>
      );
    }
  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  GoCallAPI() {

    var urlEntityDetailBibleDictionary =
      "https://sabdapro.com:3002/App/app_lex_dictionary?lang_code=" +
      this.language +
      "&entry_id=" +
      this.entry_id +
      "&skip=0&limit=100";

    fetch(urlEntityDetailBibleDictionary)
      .then(response => response.json())
      .then(responseJson => {
        this.list_dict = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_dict
        );
        let list_dict_data = JSON.parse(this.list_dict);
        let mytext = this.MyParser.DoParserDiscovery(list_dict_data[0].text, this.props.STORE_BIBLE.IS_SHOW_DARKMODE);

        this.handleChangeTab(
          DCT.getValue("dictionaryabout", this.language) + " " + list_dict_data[0].term
        );
        if (this._isMounted) {
          this.setState({
            res_name: list_dict_data[0].res_name,
            term: list_dict_data[0].term,
            text: mytext,
            isLoading: true
          });
        }
      });

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
      }*/
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


}
const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25
  },
  contentContainer: {
    paddingVertical: 15,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20
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
      dispatch(BibleAction.setLangChange(lang_code))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityDetailBibleDictionary);

