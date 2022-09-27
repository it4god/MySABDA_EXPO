import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  Image,
  Linking, Button

} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { Header } from 'react-navigation-stack';

const headerHeight = Header.HEIGHT * 1.6;
class AboutUs extends Component {
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
  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("menu_about", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this.donation = false;
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
      <ScrollView style={[styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2, }]}>
        <View style={[styles.container, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20
            }}
          >
            <Image
              style={{
                width: 150,
                height: 150,
                alignItems: "center",
                paddingBottom: 20
              }}
              source={require("../assets/icon.png")}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 15
            }}
          >
            <Text style={{ fontFamily: 'NotoSans-Bold', color: this.props.STORE_STYLE.TEXT_COLOR }}>
              What is MySABDA
            </Text>
          </View>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            - MySABDA is a fully integrated "Intelligent" Bible study system{"\n"}
            - MySABDA is a next generation SABDA Project{"\n"}
            - MySABDA is a new approach to integrated biblical data, tools, and Bible study system. {"\n"}
            - MySABDA is a bold envisioning of SABDA's current backend, data models, and interfaces.{"\n"}
            - MySABDA is multi-lingual, multi-platform, multi-media ... and a growing work in progress.{"\n"}
            - MySABDA is (prayerfully) equipping the Body of Christ to have a deeper, richer, and fuller Bible Study Experience!! {"\n"}
            - MySABDA is a labor of love, and hard work, built sacrificially by a remarkable small dynamic team. {"\n"}
            - MySABDA is yours and mine, and HIS. {"\n"}
            - MySABDA is resources; lots and lots of content. This represents continued work and agreements with many dozens of organizations and sources over 25+ years.  {"\n"}
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
            Copyright
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            By definition and by law, ALL of the materials in MySABDA have copyrights. Some are Public Domain works, others are under licenses permissive for non-commercial and personal use, while others are under much more protective/restrictive arrangements. Copyright permissions for all of the materials in MySABDA fall under the jurisdiction of SABDA {"\n"}
            Many copyright permissions are the results of years of ministry and cooperation between SABDA** and related parties. Our most heartfelt gratefulness on behalf of Indonesian believers and churches continues to go out to each of them, Thank You!!{"\n"}
            With regards to copyrights, we try our best to be responsible in this area, while also trying to bring as much benefit to you, our users. For all copyrighted materials, we (as you should too) ask for permissions. Otherwise, we will comply to the fair-use stipulation.{"\n"}
            Notes:{"\n"}{"\n"}
            All materials are presented as is, and permissions granted are only for study and personal use. Always, we try to be as accurate as possible, but are very open to any suggestions, corrections, or feedback. Thanks{"\n"}
            If you are interested in further details about any particular resource, please contact us at <Text style={{color:"#0000FF"}}  onPress={()=>{Linking.openURL('https://sabda.org/copy');}}>sabda.org</Text> 
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
           SABDA's Four Pillars
          </Text>
          <Text style={{ paddingBottom: 10, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
          • Digital Only (Non-Print)
          </Text>
          <Text style={{ paddingBottom: 10, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
          • Non-Commercial (Non-Profit, and Free to User)
          </Text>
          <Text style={{ paddingBottom: 10, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
          • Non-Exclusive (Further use/derivatives allowed via 1st Party)
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
          • Non Third-Party (Non-Assignable; permissions via 1st Party)
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
           Free to Use
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
           MySABDA is free to use, non-profit and non-commercial. We do not get any advertising fee or any other income from the site and app. There is no micro-transaction within the app. We believed that what we freely received, we freely give.
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
           Acknowledgements
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
           In the making of the app, we are supported by many organizations to whom we are deeply indebted to
          </Text>
          <Text style={{ paddingBottom: 10, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            Special thanks to:
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
            SABDA (Software, Alkitab, Biblika, dan Alat-Alat)
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            SABDA is the forerunner of online study bible in Indonesia. SABDA provided us with many resources, especially in Bahasa Indonesia. SABDA is a non-profit organization that rely fully on donation. If you are blessed by their ministry and wanting to support them financially, please follow this <Text style={{color:"#0000FF"}} onPress={()=>{ Linking.openURL('https://ylsa.org/donasi')}}>link</Text> to donate
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
            Lembaga Alkitab Indonesia (LAI)
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
          LAI's many bible texts continue to be a rich blessing both to Indonesians, and to many minority language speakers. We are glad to see them being used digitally and more widely. Together, our prayers are that God's Word would continue to be translated and distributed throughout Indonesia; and become freely available in every Tongue, and every Format, and every Platform, and every Media!!
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
            Publishers and Resource Contributors
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            Thanks to so many, and honestly, thanks are are sooo insufficient -- It is your belief that resources gain Kingdom Value as they are widely and effectively used (digitally) for HIS Purposes and HIS People that makes MySABDA possible; It is your continued generous participation and contribution of many valued resources that enriches us all. Thank You!!
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
            MySABDA Team
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
           MySABDA Team is made up of IT professionals closely affiliated to SABDA. We share SABDA’s vision and created this app to support their ministry. We are a dynamic team eager  to innovate for the future of bible study. As always, we are looking for programmers who have a Heart for Ministry and a Love of Bible -- if you are interested in joining an exciting and dynamic set of biblical computing projects – feel free to contact us
          </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
           Users
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
          You guys are the reason we do this ... and we love to hear from you, and get feedback ... tell us what you've learned, ... what is your experience ... or how MySABDA has helped you !! {"\n"}
          Tell a friend and spread the blessing -- teach a friend and multiply the impact -- train a friend and build the Kingdom ... {"\n"}
          Please feel free to share your story... or suggestions
           </Text>
           <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
           Partners
          </Text>
          <Text style={{ paddingBottom: 30, fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
          Special thanks to too many to count one by one{"\n"}
          Thanks to -- so many Individuals, users, supporters, (and fans to) {"\n"}
          Thanks to -- so many groups/organizations, formal and informal {"\n"}
          Thanks to -- so many Churches, as well as their Synods {"\n"}
          Thanks to -- so many Yayasan2, STT2, Penerbit2 ... and other partners .... {"\n"}
          Thanks for all your prayers, your encouragement, and continued support !!{"\n"}
           </Text>
          <Text style={{ fontFamily: 'NotoSans-Bold', paddingBottom: 20, color: this.props.STORE_STYLE.TEXT_COLOR }}>
            Highlighted Features
          </Text>
          <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}> • Bible Text</Text>
          <View style={{ paddingLeft: 25 }}>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Read parallel versions
            </Text>
            <Text style={{ fontWeight: "normal", paddingBottom: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Cross reference
            </Text>
          </View>
          <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}> • Word Study</Text>
          <View style={{ paddingLeft: 25 }}>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Tap a word to see the original Greek or Hebrew lemma with strong
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Get the definition of the word in the original context
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Read further description from various bible dictionaries
            </Text>
            <Text style={{ fontWeight: "normal", paddingBottom: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - If the word a name of people, place, or group, explore further
              information about the entity
            </Text>
          </View>
          <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            {" "}
            • Commentary and Expository Notes
          </Text>
          <View style={{ paddingLeft: 25 }}>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Commentaries in English and Bahasa Indonesia
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Read segments of commentaries that are relevant to a verse or
              range of verses
            </Text>
            <Text style={{ fontWeight: "normal", paddingBottom: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Read questions and answers related to a verse or range of verses
            </Text>
          </View>
          <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            {" "}
            • Entity (People, Place, Groups, Events)
          </Text>
          <View style={{ paddingLeft: 25 }}>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Bible facts: topical study of a person, place, or groups
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - See the relationship between people, place, groups and events
            </Text>
            <Text style={{ fontWeight: "normal", paddingBottom: 15 }}>
              - Read from various bible dictionaries that describe a particular
              entity
            </Text>
          </View>
          <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
            {" "}
            • Original Language Study
          </Text>
          <View style={{ paddingLeft: 25 }}>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Bible in Greek, Hebrew, and Aramaic with strong number
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Read and compare multiple texts in parallel
            </Text>
            <Text style={{ fontWeight: "normal", paddingBottom: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Interlinear and reversed interlinear
            </Text>
          </View>
          <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}> • Search</Text>
          <View style={{ paddingLeft: 25 }}>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Search from bible, commentaries, dictionaries, and many more
            </Text>
            <Text style={{ fontWeight: "normal", paddingBottom: 15, color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Search Greek or Hebrew word by original characters, or its Latin
              transliteration, or definition.
            </Text>
          </View>
          <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}> • Audio and Video</Text>
          <View style={{ paddingLeft: 25 }}>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Play audio bible
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Play sermon audios and videos relevant to the scripture passage (from Monergism, Thirdmill, SermonAudio, etc)
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Gospel films such as The Lumo Project
            </Text>
            <Text style={{ fontWeight: "normal", color: this.props.STORE_STYLE.TEXT_COLOR }}>
              - Bible outline and introductory videos such as the Bible Project.
            </Text>
          </View>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "column",
    flexWrap: "nowrap"
  },
  containertopRow: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBottom: {
    color: "#303030",
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
    shadowColor: "#303030",
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
      dispatch(BibleAction.setBibleVersion(set_bible_version))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
