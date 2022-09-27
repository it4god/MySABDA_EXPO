import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Dimensions,
  Text,
  AsyncStorage,
  Alert,
  Button
} from "react-native";
import * as resources from "../dictionary";
import { connect } from "react-redux";
import * as DCT from "../dictionary";
import * as BibleAction from "../actions/BibleAction";
import { List, Switch } from "react-native-paper";
import { Header } from 'react-navigation-stack';
import * as FileSystem from 'expo-file-system';
import { EncodingType } from "expo-file-system";
import * as SQLite from 'expo-sqlite';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { HeaderBackButton } from 'react-navigation-stack';
import { FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS } from "expo-av/build/Video";
const headerHeight = Header.HEIGHT * 1.6;
const barWidth = Dimensions.get('screen').width - 30;
var downloadResumable2 = {};
class Download extends Component {
  static navigationOptions = ({ navigation }) => {


    const { params = {} } = navigation.state;
    if (params.download == true) {
      return {
        title: " ",
        headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
        headerStyle: {
          backgroundColor: params.backgroundcolor,
        },
        headerLeft: <HeaderBackButton tintColor={params.titlecolor} onPress={() => {

          Alert.alert(
            "Download",
            "Download Data is in Progress...",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );

        }} />,
        headerBackTitle: "",
        headerTransparent: true,
        headerTintColor: params.titlecolor
      }
    }
    else {
      return {
        title: " ",
        headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
        headerStyle: {
          backgroundColor: params.backgroundcolor,
        },
        headerLeft: <HeaderBackButton tintColor={params.titlecolor} onPress={() => {

          navigation.goBack();

        }} />,
        headerBackTitle: "",
        headerTransparent: true,
        headerTintColor: params.titlecolor
      }


    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isbibletext: true,
      islexicon: true,
      isdictionary: true,
      iscommentary: true,
      isorilang: true,
      downloadProgress: 0,
      downloadProgress2: 0,
      downloadProgressBible: 0,

      isBibleESV: false,
      isBibleNET: false,
      isBibleTB: false,
      isBibleAV: false,

      isOriTR: false,
      isOriTIS: false,
      isOriWH: false,
      isOriLXX: false,
      isOriBHS: false,
      isOriWLC: false,
      isOriWHNU: false,
      isOriBHSA: false,

      isAbboth: false,
      isAVDefinitionEnglish: false,
      isAVDefinitionIndo: false,
      isBarclay: false,
      isBoeker: false,
      isTDNT: false,
      isTWOT: false,
      isYoppi: false,
      isTyndaleBrief: false,
      isLiddelScott: false,
      isStrongLexicon: false,
      isHitchcock: false,
      isEbd: false,
      isIsbe: false,
      isSmith: false,
      isNave: false,
      isNetmap: false,
      isPedoman: false,
      isGering: false,
      isHaag: false,
      isTokoh: false,
      isKecil: false,
      isLambang: false,
      isBrowning: false,
      isEnsiklopedia: false,

    };

    this.isBibleESV = false;
    this.isBibleNET = false;
    this.isBibleTB = false;
    this.isBibleAV = false;

    this.isOriTR = false;
    this.isOriTIS = false;
    this.isOriWH = false;
    this.isOriLXX = false;
    this.isOriBHS = false;
    this.isOriWLC = false;
    this.isOriWHNU = false;
    this.isOriBHSA = false;

    this.isAbboth = false;
    this.isAVDefinitionEnglish = false;
    this.isAVDefinitionIndo = false;
    this.isBarclay = false;
    this.isBoeker = false;
    this.isTDNT = false;
    this.isTWOT = false;
    this.isYoppi = false,
      this.isTyndaleBrief = false;
    this.isLiddelScott = false;
    this.isStrongLexicon = false

    this.isHitchcock = false;
    this.isEbd = false;
    this.isIsbe = false;
    this.isSmith = false;
    this.isNave = false;
    this.isNetmap = false;
    this.isPedoman = false;
    this.isGering = false;
    this.isHaag = false;
    this.isTokoh = false;
    this.isKecil = false;
    this.isLambang = false;
    this.isBrowning = false;
    this.isEnsiklopedia = false;

    this.isGill = false;
    this.isHagelberg = false;
    this.isCritics_ask = false;
    this.isBarclayCommentary = false;
    this.isJerusalem = false;
    this.isClarke = false;
    this.isSh = false;
    this.isMatthew_henry = false;
    this.isHaydock = false;
    this.isFull_life = false;
    this.is101contra = false;
    this.isWycliffe = false;
    this.isBible_query = false;
    this.isMaclaren = false;
    this.isAlbert_barnes = false;
    this.isGuzik = false;
    this.isConstable = false;
    this.isMhcc = false;
    this.isCalvin_complete = false;
    this.isNasb = false;
    this.isAv = false;
    this.isTb = false;
    this.isEsv = false;
    this.isNet = false;
    this.isCornelius = false;
    this.isMpoole = false;
    this.isWesley = false;
    this.isJamiefauss = false;
    this.isRobertson = false;
    this.isScofield = false;
    this.isCollege = false;
    this.progressdownload = 0;
    this.progressdownload2 = 0;

    this.downloadpart1 = "Download Part 1 :"
    this.downloadpart2 = "Download Part 2 :"
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(resources.getValue("download", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    this._getData();
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

  async PauseDownload() {
    await downloadResumable2.pauseAsync();
    this.setState({ downloadProgress2: 0 }); this.progressdownload2 = 0
    this._getData();
  }

  _getData = async () => {

    try {
      let isBibleESV = await AsyncStorage.getItem("isBibleESV");
      if (isBibleESV !== null) {
        if (isBibleESV === "true")
          this.isBibleESV = true
        else
          this.isBibleESV = false
      } else {
        this.isBibleESV = false
      }
    } catch (error) {
      console.log(error);
    }
    console.log("This Is BIBLE ESV " + this.isBibleESV)
    try {
      let isBibleNET = await AsyncStorage.getItem("isBibleNET");
      if (isBibleNET !== null) {
        if (isBibleNET === "true")
          this.isBibleNET = true
        else
          this.isBibleNET = false
      } else {
        this.isBibleNET = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isBibleTB = await AsyncStorage.getItem("isBibleTB");
      if (isBibleTB !== null) {
        if (isBibleTB === "true")
          this.isBibleTB = true
        else
          this.isBibleTB = false
      } else {
        this.isBibleTB = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isBibleAV = await AsyncStorage.getItem("isBibleAV");
      if (isBibleAV !== null) {
        if (isBibleAV === "true")
          this.isBibleAV = true
        else
          this.isBibleAV = false
      } else {
        this.isBibleAV = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isOriTR = await AsyncStorage.getItem("isOriTR");
      if (isOriTR !== null) {
        if (isOriTR === "true")
          this.isOriTR = true
        else
          this.isOriTR = false
      } else {
        this.isOriTR = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isOriTIS = await AsyncStorage.getItem("isOriTIS");
      if (isOriTIS !== null) {
        if (isOriTIS == "true")
          this.isOriTIS = true
        else
          this.isOriTIS = false
      } else {
        this.isOriTIS = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isOriWH = await AsyncStorage.getItem("isOriWH");
      if (isOriWH !== null) {
        if (isOriWH == "true")
          this.isOriWH = true
        else
          this.isOriWH = false
      } else {
        this.isOriWH = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isOriLXX = await AsyncStorage.getItem("isOriLXX");
      if (isOriLXX !== null) {
        if (isOriLXX == "true")
          this.isOriLXX = true
        else
          this.isOriLXX = false
      } else {
        this.isOriLXX = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isOriBHS = await AsyncStorage.getItem("isOriBHS");
      if (isOriBHS !== null) {
        if (isOriBHS == "true")
          this.isOriBHS = true
        else
          this.isOriBHS = false
      } else {
        this.isOriBHS = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isOriWLC = await AsyncStorage.getItem("isOriWLC");
      if (isOriWLC !== null) {
        if (isOriWLC == "true")
          this.isOriWLC = true
        else
          this.isOriWLC = false
      } else {
        this.isOriWLC = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isOriWHNU = await AsyncStorage.getItem("isOriWHNU");
      if (isOriWHNU !== null) {
        if (isOriWHNU == "true")
          this.isOriWHNU = true
        else
          this.isOriWHNU = false
      } else {
        this.isOriWHNU = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isOriBHSA = await AsyncStorage.getItem("isOriBHSA");
      if (isOriBHSA !== null) {
        if (isOriBHSA == "true")
          this.isOriBHSA = true
        else
          this.isOriBHSA = false
      } else {
        this.isOriBHSA = false
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isabboth = await AsyncStorage.getItem("isabboth");
      if (isabboth !== null) {
        if (isabboth === "true")
          this.isAbboth = true

      } else {
        this.isAbboth = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isavdefinitionenglish = await AsyncStorage.getItem("isavdefinitionenglish");
      if (isavdefinitionenglish !== null) {
        if (isavdefinitionenglish === "true")
          this.isAVDefinitionEnglish = true

      } else {
        this.isAVDefinitionEnglish = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isavdefinitionindo = await AsyncStorage.getItem("isavdefinitionindo");
      if (isavdefinitionindo !== null) {
        if (isavdefinitionindo === "true")
          this.isAVDefinitionIndo = true;

      } else {
        this.isAVDefinitionIndo = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isbarclay = await AsyncStorage.getItem("isbarclay");
      if (isbarclay !== null) {
        if (isbarclay === "true")
          this.isBarclay = true

      } else {
        this.isBarclay = false
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isboeker = await AsyncStorage.getItem("isboeker");
      if (isboeker !== null) {
        if (isboeker === "true")
          this.isBoeker = true
      } else {
        this.isBoeker = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let istdnt = await AsyncStorage.getItem("istdnt");
      if (istdnt !== null) {
        if (istdnt === "true")
          this.isTDNT = true;

      } else {
        this.isTDNT = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let istwot = await AsyncStorage.getItem("istwot");
      if (istwot !== null) {
        if (istwot === "true")
          this.isTWOT = true;
      } else {
        this.isTWOT = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isyoppi = await AsyncStorage.getItem("isyoppi");
      if (isyoppi !== null) {
        if (isyoppi === "true")
          this.isYoppi = true;

      } else {
        this.isYoppi = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let istyndalebrief = await AsyncStorage.getItem("istyndalebrief");
      if (istyndalebrief !== null) {
        if (istyndalebrief === "true")
          this.isTyndaleBrief = true;

      } else {
        this.isTyndaleBrief = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isliddelscott = await AsyncStorage.getItem("isliddelscott");
      if (isliddelscott !== null) {
        if (isliddelscott === "true")
          this.isLiddelScott = true;

      } else {
        this.isLiddelScott = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isstronglexicon = await AsyncStorage.getItem("isstronglexicon");
      if (isstronglexicon !== null) {
        if (isstronglexicon === "true")
          this.isStrongLexicon = true;
      } else {
        this.isStrongLexicon = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ishitchcock = await AsyncStorage.getItem("ishitchcock");
      if (ishitchcock !== null) {
        if (ishitchcock === "true")
          this.isHitchcock = true;
      } else {
        this.isHitchcock = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isebd = await AsyncStorage.getItem("isebd");
      if (isebd !== null) {
        if (isebd === "true")
          this.isEbd = true;
      } else {
        this.isEbd = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isisbe = await AsyncStorage.getItem("isisbe");
      if (isisbe !== null) {
        if (isisbe === "true")
          this.isIsbe = true;
      } else {
        this.isIsbe = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let issmith = await AsyncStorage.getItem("issmith");
      if (issmith !== null) {
        if (issmith === "true")
          this.isSmith = true;
      } else {
        this.isSmith = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isnave = await AsyncStorage.getItem("isnave");
      if (isnave !== null) {
        if (isnave === "true")
          this.isNave = true;
      } else {
        this.isNave = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isnetmap = await AsyncStorage.getItem("isnetmap");
      if (isnetmap !== null) {
        if (isnetmap === "true")
          this.isNetmap = true;
      } else {
        this.isNetmap = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let ispedoman = await AsyncStorage.getItem("ispedoman");
      if (ispedoman !== null) {
        if (ispedoman === "true")
          this.isPedoman = true;
      } else {
        this.isPedoman = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isgering = await AsyncStorage.getItem("isgering");
      if (isgering !== null) {
        if (isgering === "true")
          this.isGering = true;
      } else {
        this.isGering = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let ishaag = await AsyncStorage.getItem("ishaag");
      if (ishaag !== null) {
        if (ishaag === "true")
          this.isHaag = true;
      } else {
        this.isHaag = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let istokoh = await AsyncStorage.getItem("istokoh");
      if (istokoh !== null) {
        if (istokoh === "true")
          this.isTokoh = true;
      } else {
        this.isTokoh = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let iskecil = await AsyncStorage.getItem("iskecil");
      if (iskecil !== null) {
        if (iskecil === "true")
          this.isKecil = true;
      } else {
        this.isKecil = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let islambang = await AsyncStorage.getItem("islambang");
      if (islambang !== null) {
        if (islambang === "true")
          this.isLambang = true;
      } else {
        this.isLambang = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isbrowning = await AsyncStorage.getItem("isbrowning");
      if (isbrowning !== null) {
        if (isbrowning === "true")
          this.isBrowning = true;
      } else {
        this.isBrowning = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isensiklopedia = await AsyncStorage.getItem("isensiklopedia");
      if (isensiklopedia !== null) {
        if (isensiklopedia === "true")
          this.isEnsiklopedia = true;
      } else {
        this.isEnsiklopedia = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let isgill = await AsyncStorage.getItem("isgill");
      if (isgill !== null) {
        if (isgill === "true")
          this.isGill = true;
      } else {
        this.isGill = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ishagelberg = await AsyncStorage.getItem("ishagelberg");
      if (ishagelberg !== null) {
        if (ishagelberg === "true")
          this.isHagelberg = true;
      } else {
        this.isHagelberg = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let iscritics_ask = await AsyncStorage.getItem("iscritics_ask");
      if (iscritics_ask !== null) {
        if (iscritics_ask === "true")
          this.isCritics_ask = true;
      } else {
        this.isCritics_ask = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isbarclaycommentary = await AsyncStorage.getItem("isbarclaycommentary");
      if (isbarclaycommentary !== null) {
        if (isbarclaycommentary === "true")
          this.isBarclayCommentary = true;
      } else {
        this.isBarclayCommentary = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isjerusalem = await AsyncStorage.getItem("isjerusalem");
      if (isjerusalem !== null) {
        if (isjerusalem === "true")
          this.isJerusalem = true;
      } else {
        this.isJerusalem = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isclarke = await AsyncStorage.getItem("isclarke");
      if (isclarke !== null) {
        if (isclarke === "true")
          this.isClarke = true;
      } else {
        this.isClarke = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let issh = await AsyncStorage.getItem("issh");
      if (issh !== null) {
        if (issh === "true")
          this.isSh = true;
      } else {
        this.isSh = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ismatthew_henry = await AsyncStorage.getItem("ismatthew_henry");
      if (ismatthew_henry !== null) {
        if (ismatthew_henry === "true")
          this.isMatthew_henry = true;
      } else {
        this.isMatthew_henry = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ishaydock = await AsyncStorage.getItem("ishaydock");
      if (ishaydock !== null) {
        if (ishaydock === "true")
          this.isHaydock = true;
      } else {
        this.isHaydock = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isfull_life = await AsyncStorage.getItem("isfull_life");
      if (isfull_life !== null) {
        if (isfull_life === "true")
          this.isFull_life = true;
      } else {
        this.isFull_life = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let is101contra = await AsyncStorage.getItem("is101contra");
      if (is101contra !== null) {
        if (is101contra === "true")
          this.is101contra = true;
      } else {
        this.is101contra = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let iswycliffe = await AsyncStorage.getItem("iswycliffe");
      if (iswycliffe !== null) {
        if (iswycliffe === "true")
          this.isWycliffe = true;
      } else {
        this.isWycliffe = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isbible_query = await AsyncStorage.getItem("isbible_query");
      if (isbible_query !== null) {
        if (isbible_query === "true")
          this.isBible_query = true;
      } else {
        this.isBible_query = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ismaclaren = await AsyncStorage.getItem("ismaclaren");
      if (ismaclaren !== null) {
        if (ismaclaren === "true")
          this.isMaclaren = true;
      } else {
        this.isMaclaren = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isalbert_barnes = await AsyncStorage.getItem("isalbert_barnes");
      if (isalbert_barnes !== null) {
        if (isalbert_barnes === "true")
          this.isAlbert_barnes = true;
      } else {
        this.isAlbert_barnes = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isguzik = await AsyncStorage.getItem("isguzik");
      if (isguzik !== null) {
        if (isguzik === "true")
          this.isGuzik = true;
      } else {
        this.isGuzik = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isconstable = await AsyncStorage.getItem("isconstable");
      if (isconstable !== null) {
        if (isconstable === "true")
          this.isConstable = true;
      } else {
        this.isConstablek = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ismhcc = await AsyncStorage.getItem("ismhcc");
      if (ismhcc !== null) {
        if (ismhcc === "true")
          this.isMhcc = true;
      } else {
        this.isMhcc = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let iscalvin_complete = await AsyncStorage.getItem("iscalvin_complete");
      if (iscalvin_complete !== null) {
        if (iscalvin_complete === "true")
          this.isCalvin_complete = true;
      } else {
        this.isCalvin_complete = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isnasb = await AsyncStorage.getItem("isnasb");
      if (isnasb !== null) {
        if (isnasb === "true")
          this.isNasb = true;
      } else {
        this.isNasb = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isav = await AsyncStorage.getItem("isav");
      if (isav !== null) {
        if (isav === "true")
          this.isAv = true;
      } else {
        this.isAv = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let istb = await AsyncStorage.getItem("istb");
      if (istb !== null) {
        if (istb === "true")
          this.isTb = true;
      } else {
        this.isTb = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isesv = await AsyncStorage.getItem("isesv");
      if (isesv !== null) {
        if (isesv === "true")
          this.isEsv = true;
      } else {
        this.isEsv = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isnet = await AsyncStorage.getItem("isnet");
      if (isnet !== null) {
        if (isnet === "true")
          this.isNet = true;
      } else {
        this.isNet = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let iscornelius = await AsyncStorage.getItem("iscornelius");
      if (iscornelius !== null) {
        if (iscornelius === "true")
          this.isCornelius = true;
      } else {
        this.isCornelius = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let ismpoole = await AsyncStorage.getItem("ismpoole");
      if (ismpoole !== null) {
        if (ismpoole === "true")
          this.isMpoole = true;
      } else {
        this.isMpoole = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let iswesley = await AsyncStorage.getItem("iswesley");
      if (iswesley !== null) {
        if (iswesley === "true")
          this.isWesley = true;
      } else {
        this.isWesley = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isjamiefauss = await AsyncStorage.getItem("isjamiefauss");
      if (isjamiefauss !== null) {
        if (isjamiefauss === "true")
          this.isJamiefauss = true;
      } else {
        this.isJamiefauss = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isjamiefauss = await AsyncStorage.getItem("isjamiefauss");
      if (isjamiefauss !== null) {
        if (isjamiefauss === "true")
          this.isJamiefauss = true;
      } else {
        this.isJamiefauss = false;
      }
    } catch (error) {
      console.log(error);
    }


    try {
      let isrobertson = await AsyncStorage.getItem("isrobertson");
      if (isrobertson !== null) {
        if (isrobertson === "true")
          this.isRobertson = true;
      } else {
        this.isRobertson = false;
      }
    } catch (error) {
      console.log(error);
    }

    try {
      let isscofield = await AsyncStorage.getItem("isscofield");
      if (isscofield !== null) {
        if (isscofield === "true")
          this.isScofield = true;
      } else {
        this.isScofield = false;
      }
    } catch (error) {
      console.log(error);
    }
    try {
      let iscollege = await AsyncStorage.getItem("iscollege");
      if (iscollege !== null) {
        if (iscollege === "true")
          this.isCollege = true;
      } else {
        this.isCollege = false;
      }
    } catch (error) {
      console.log(error);
    }

    this.setState(
      {
        isBibleESV: this.isBibleESV,
        isBibleNET: this.isBibleNET,
        isBibleAV: this.isBibleAV,
        isBibleTB: this.isBibleTB,

        isOriTR: this.isOriTR,
        isOriTIS: this.isOriTIS,
        isOriWH: this.isOriWH,
        isOriLXX: this.isOriLXX,
        isOriBHS: this.isOriBHS,
        isOriWLC: this.isOriWLC,
        isOriWHNU: this.isOriWHNU,
        isOriBHSA: this.isOriBHSA,

        isAbboth: this.isAbboth,
        isAVDefinitionEnglish: this.isAVDefinitionEnglish,
        isAVDefinitionIndo: this.isAVDefinitionIndo,
        isBarclay: this.isBarclay,
        isBoeker: this.isBoeker,
        isTDNT: this.isTDNT,
        isTWOT: this.isTWOT,
        isYoppi: this.isYoppi,
        isTyndaleBrief: this.isTyndaleBrief,
        isLiddelScott: this.isLiddelScott,
        isStrongLexicon: this.isStrongLexicon,
        isHitchcock: this.isHitchcock,
        isEbd: this.isEbd,
        isIsbe: this.isIsbe,
        isSmith: this.isSmith,
        isNave: this.isNave,
        isNetmap: this.isNetmap,
        isPedoman: this.isPedoman,
        isGering: this.isGering,
        isHaag: this.isHaag,
        isTokoh: this.isTokoh,
        isKecil: this.isKecil,
        isLambang: this.isLambang,
        isBrowning: this.isBrowning,
        isEnsiklopedia: this.isEnsiklopedia,

        isGill: this.isGill,
        isHagelberg: this.isHagelberg,
        isCritics_ask: this.isCritics_ask,
        isBarclayCommentary: this.isBarclayCommentary,
        isJerusalem: this.isJerusalem,
        isClarke: this.isClarke,
        isSh: this.isSh,
        isMatthew_henry: this.isMatthew_henry,
        isHaydock: this.isHaydock,
        isFull_life: this.isFull_life,
        is101contra: this.is101contra,
        isWycliffe: this.isWycliffe,
        isBible_query: this.isBible_query,
        isMaclaren: this.isMaclaren,
        isAlbert_barnes: this.isAlbert_barnes,
        isGuzik: this.isGuzik,
        isConstable: this.isConstable,
        isMhcc: this.isMhcc,
        isCalvin_complete: this.isCalvin_complete,
        isNasb: this.isNasb,
        isAv: this.isAv,
        isTb: this.isTb,
        isEsv: this.isEsv,
        isNet: this.isNet,
        isCornelius: this.isCornelius,
        isMpoole: this.isMpoole,
        isWesley: this.isWesley,
        isJamiefauss: this.isJamiefauss,
        isRobertson: this.isRobertson,
        isScofield: this.isScofield,
        isCollege: this.isCollege

      }

    )



  };

  render() {
    const { navigate } = this.props.navigation;

    if (this.state.downloadProgress > 5 && this.state.downloadProgress < 10) this.progressdownload = 10;
    if (this.state.downloadProgress > 10 && this.state.downloadProgress < 20) this.progressdownload = 20;
    if (this.state.downloadProgress > 20 && this.state.downloadProgress < 30) this.progressdownload = 30;
    if (this.state.downloadProgress > 30 && this.state.downloadProgress < 40) this.progressdownload = 40;
    if (this.state.downloadProgress > 40 && this.state.downloadProgress < 50) this.progressdownload = 50;
    if (this.state.downloadProgress > 50 && this.state.downloadProgress < 60) this.progressdownload = 60;
    if (this.state.downloadProgress > 60 && this.state.downloadProgress < 70) this.progressdownload = 70;
    if (this.state.downloadProgress > 70 && this.state.downloadProgress < 80) this.progressdownload = 80;
    if (this.state.downloadProgress > 80 && this.state.downloadProgress < 90) this.progressdownload = 90;
    if (this.state.downloadProgress > 90 && this.state.downloadProgress < 100) this.progressdownload = 95;
    if (this.state.downloadProgress > 98 && this.state.downloadProgress <= 100) this.progressdownload = 100;

    if (this.state.downloadProgress2 > 5 && this.state.downloadProgress2 < 10) this.progressdownload2 = 10;
    if (this.state.downloadProgress2 > 10 && this.state.downloadProgress2 < 20) this.progressdownload2 = 20;
    if (this.state.downloadProgress2 > 20 && this.state.downloadProgress2 < 30) this.progressdownload2 = 30;
    if (this.state.downloadProgress2 > 30 && this.state.downloadProgress2 < 40) this.progressdownload2 = 40;
    if (this.state.downloadProgress2 > 40 && this.state.downloadProgress2 < 50) this.progressdownload2 = 50;
    if (this.state.downloadProgress2 > 50 && this.state.downloadProgress2 < 60) this.progressdownload2 = 60;
    if (this.state.downloadProgress2 > 60 && this.state.downloadProgress2 < 70) this.progressdownload2 = 70;
    if (this.state.downloadProgress2 > 70 && this.state.downloadProgress2 < 80) this.progressdownload2 = 80;
    if (this.state.downloadProgress2 > 80 && this.state.downloadProgress2 < 90) this.progressdownload2 = 90;
    if (this.state.downloadProgress2 > 90 && this.state.downloadProgress2 < 100) this.progressdownload2 = 95;
    if (this.state.downloadProgress2 > 98 && this.state.downloadProgress2 <= 100) this.progressdownload2 = 100;

    return (
      <View style={[styles.header, { flexDirection: "column", flex: 1, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR, }]}>
        {this.state.downloadProgress > 0 && (
          <View style={{ height: 70, flexDirection: "column", paddingHorizontal: 15 }}>
            <Text style={[styles.label, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>{this.downloadpart1} {this.progressdownload} {"%"}</Text>
            <ProgressBarAnimated
              barAnimationDuration={100}
              backgroundAnimationDuration={500}
              width={barWidth}
              value={this.progressdownload}
              backgroundColorOnComplete="#6CC644"
            />
            <View style={{ height: 5 }}></View>
          </View>

        )}
        {this.state.downloadProgress2 > 0 && (
          <View style={{ height: 70, flexDirection: "column", paddingHorizontal: 15 }}>
            <Text style={[styles.label, { color: this.props.STORE_STYLE.TEXT_COLOR }]}>{this.downloadpart2}  {this.progressdownload2} {"%"}</Text>
            <ProgressBarAnimated
              barAnimationDuration={100}
              backgroundAnimationDuration={500}
              width={barWidth}
              value={this.progressdownload2}
              backgroundColorOnComplete="#6CC644"
            />
            <View style={{ height: 5 }}></View>
          </View>

        )}
        <ScrollView style={{ flex: 9, flexDirection: "column" }}>
          <View style={[styles.container, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
            <List.Section>
              <List.Accordion
                title="Bible Text"
                titleStyle={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.isbibletext}
                onPress={() =>
                  this.setState({ isbibletext: !this.state.isbibletext })
                }
                style={{
                  borderTopWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBibleESV}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBibleESV: !this.state.isBibleESV });
                        this.IsDownloadOrRemove(this.state.isBibleESV, "BibleESV", "bible")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"ESV ( English Standard Version )"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBibleAV}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBibleAV: !this.state.isBibleAV });
                        this.IsDownloadOrRemove(this.state.isBibleAV, "BibleAV", "bible")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"AV ( Authorized Version )"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBibleNET}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBibleNET: !this.state.isBibleNET });
                        this.IsDownloadOrRemove(this.state.isBibleNET, "BibleNET", "bible")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"NET ( New English Translation )"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBibleTB}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBibleTB: !this.state.isBibleTB });
                        this.IsDownloadOrRemove(this.state.isBibleTB, "BibleTB", "bible")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"TB ( Terjemahan Baru )"}
                    </Text>
                  </View>
                </View>
              </List.Accordion>
              <List.Accordion
                title="Lexicons"
                titleStyle={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.islexicon}
                onPress={() =>
                  this.setState({ islexicon: !this.state.islexicon })
                }
                style={{
                  borderTopWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isAbboth}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isAbboth: !this.state.isAbboth });
                        this.IsDownloadOrRemove(this.state.isAbboth, "abbott_smith", "lexicon")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Abbott Smith Lexicon"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isAVDefinitionEnglish}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isAVDefinitionEnglish: !this.state.isAVDefinitionEnglish });
                        this.IsDownloadOrRemove(this.state.isAVDefinitionEnglish, "av_eng", "lexicon")
                      }
                    }
                    }
                    style={{ flex: 2 }}
                    color="#3B93DB"
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"AV Definition - English"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isAVDefinitionIndo}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isAVDefinitionIndo: !this.state.isAVDefinitionIndo });
                        this.IsDownloadOrRemove(this.state.isAVDefinitionIndo, "av_ind", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"AV Definition - Indonesia"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBarclay}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBarclay: !this.state.isBarclay });
                        this.IsDownloadOrRemove(this.state.isBarclay, "barclay", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Barclay Greek Dictionary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBoeker}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBoeker: !this.state.isBoeker });
                        this.IsDownloadOrRemove(this.state.isBoeker, "boeker", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Boeker"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isStrongLexicon}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isStrongLexicon: !this.state.isStrongLexicon });
                        this.IsDownloadOrRemove(this.state.isStrongLexicon, "strong", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Strong's Lexicon"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    paddingTop: 7,
                    paddingRight: 7
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      borderTopWidth: 1,
                      flex: 1,
                      borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      borderTopWidth: 1,
                      paddingTop: 7,
                      paddingBottom: 12, paddingLeft: 10,
                      paddingRight: 10,
                      flexWrap: "nowrap",
                      backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                    }}
                  >
                    <Switch
                      value={this.state.isTDNT}
                      onValueChange={() => {
                        if (this.progressdownload == 0) {
                          this.setState({ isTDNT: !this.state.isTDNT });
                          this.IsDownloadOrRemove(this.state.isTDNT, "tdnt", "lexicon")
                        }
                      }}
                      color="#3B93DB"
                      style={{ flex: 2 }}
                    />
                    <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                      <Text
                        style={{
                          paddingLeft: 10,
                          fontSize: 15,
                          paddingTop: 10,
                          color: this.props.STORE_STYLE.TEXT_COLOR,
                        }}
                      >
                        {"Theological Dictionary of the New Testament"}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isTWOT}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isTWOT: !this.state.isTWOT });
                        this.IsDownloadOrRemove(this.state.isTWOT, "twot", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,

                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Theological Wordbook of the Old Testament"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isYoppi}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isYoppi: !this.state.isYoppi });
                        this.IsDownloadOrRemove(this.state.isYoppi, "yoppi", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Yoppi"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isTyndaleBrief}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isTyndaleBrief: !this.state.isTyndaleBrief });
                        this.IsDownloadOrRemove(this.state.isTyndaleBrief, "tbesh", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Tyndale Brief Lexicon of Extended Strongs for Hebrew"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isLiddelScott}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isLiddelScott: !this.state.isLiddelScott });
                        this.IsDownloadOrRemove(this.state.isLiddelScott, "lsj", "lexicon")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Liddell-Scott-Jones Greek-English Lexicon"}
                    </Text>
                  </View>
                </View>
              </List.Accordion>
              <List.Accordion
                title="Dictionaries"
                titleStyle={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.isdictionary}
                onPress={() =>
                  this.setState({ isdictionary: !this.state.isdictionary })
                }
                style={{ borderTopWidth: 1, borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isHitchcock}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isHitchcock: !this.state.isHitchcock });
                        this.IsDownloadOrRemove(this.state.isHitchcock, "hitchcock", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Hitchcock's Dictionary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isEbd}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isEbd: !this.state.isEbd });
                        this.IsDownloadOrRemove(this.state.isEbd, "ebd", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Easton's Bible Dictionary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isIsbe}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isIsbe: !this.state.isIsbe });
                        this.IsDownloadOrRemove(this.state.isIsbe, "isbe", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"International Standard Bible Encyclopedia"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isSmith}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isSmith: !this.state.isSmith });
                        this.IsDownloadOrRemove(this.state.isSmith, "smith", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Smith's Dictionary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isNave}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isNave: !this.state.isNave });
                        this.IsDownloadOrRemove(this.state.isNave, "nave", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Nave's Topical Bible"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isNetmap}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isNetmap: !this.state.isNetmap });
                        this.IsDownloadOrRemove(this.state.isNetmap, "netmap", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Netmap"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isPedoman}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isPedoman: !this.state.isPedoman });
                        this.IsDownloadOrRemove(this.state.isPedoman, "pedoman", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Kamus Pedoman"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isGering}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isGering: !this.state.isGering });
                        this.IsDownloadOrRemove(this.state.isGering, "gering", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Kamus Gering"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isHaag}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isHaag: !this.state.isHaag });
                        this.IsDownloadOrRemove(this.state.isHaag, "haag", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Kamus Haag"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isTokoh}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isTokoh: !this.state.isTokoh });
                        this.IsDownloadOrRemove(this.state.isTokoh, "tokoh", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Kamus Tokoh"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isKecil}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isKecil: !this.state.isKecil });
                        this.IsDownloadOrRemove(this.state.isKecil, "kecil", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Kamus Kecil"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isLambang}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isLambang: !this.state.isLambang });
                        this.IsDownloadOrRemove(this.state.isLambang, "lambang", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Bahasa Lambang Alkitab"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBrowning}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBrowning: !this.state.isBrowning });
                        this.IsDownloadOrRemove(this.state.isBrowning, "browning", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Kamus Browning"}
                    </Text>
                  </View>

                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7, paddingBottom: 12, paddingLeft: 10, paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isEnsiklopedia}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isEnsiklopedia: !this.state.isEnsiklopedia });
                        this.IsDownloadOrRemove(this.state.isEnsiklopedia, "ensiklopedia", "dictionary")
                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Ensiklopedia Masa Kini"}
                    </Text>
                  </View>

                </View>
              </List.Accordion>
              <List.Accordion
                title="Commentaries"
                titleStyle={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.iscommentary}
                onPress={() => this.setState({ iscommentary: !this.state.iscommentary })}
                style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2 }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isGill}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isGill: !this.state.isGill });
                        this.IsDownloadOrRemove(this.state.isGill, "gill", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"John Gills Exposition of Bible"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isHagelberg}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isHagelberg: !this.state.isHagelberg });
                        this.IsDownloadOrRemove(this.state.isHagelberg, "hagelberg", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Hagelberg Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isCritics_ask}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isCritics_ask: !this.state.isCritics_ask });
                        this.IsDownloadOrRemove(this.state.isCritics_ask, "critics_ask", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"When Critics Ask"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBarclayCommentary}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBarclayCommentary: !this.state.isBarclayCommentary });
                        this.IsDownloadOrRemove(this.state.isBarclayCommentary, "barclaycommentary", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Barclay's Notes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isJerusalem}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isJerusalem: !this.state.isJerusalem });
                        this.IsDownloadOrRemove(this.state.isJerusalem, "jerusalem", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Jerusalem"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isClarke}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isClarke: !this.state.isClarke });
                        this.IsDownloadOrRemove(this.state.isClarke, "clarke", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Adam Clarke's Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isSh}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isSh: !this.state.isSh });
                        this.IsDownloadOrRemove(this.state.isSh, "sh", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Santapan Harian"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isMatthew_henry}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isMatthew_henry: !this.state.isMatthew_henry });
                        this.IsDownloadOrRemove(this.state.isMatthew_henry, "matthew_henry", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Matthew Henry's Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isHaydock}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isHaydock: !this.state.isHaydock });
                        this.IsDownloadOrRemove(this.state.isHaydock, "haydock", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Haydock's Catholic Bible Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isFull_life}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isFull_life: !this.state.isFull_life });
                        this.IsDownloadOrRemove(this.state.isFull_life, "full_life", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Full Life Bible Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.is101contra}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ is101contra: !this.state.is101contra });
                        this.IsDownloadOrRemove(this.state.is101contra, "101contra", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"101 Contradictions"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isWycliffe}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isWycliffe: !this.state.isWycliffe });
                        this.IsDownloadOrRemove(this.state.isWycliffe, "wycliffe", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Wycliffe Bible Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isBible_query}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isBible_query: !this.state.isBible_query });
                        this.IsDownloadOrRemove(this.state.isBible_query, "bible_query", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Bible Query"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isMaclaren}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isMaclaren: !this.state.isMaclaren });
                        this.IsDownloadOrRemove(this.state.isMaclaren, "maclaren", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"MacLaren's Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isAlbert_barnes}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isAlbert_barnes: !this.state.isAlbert_barnes });
                        this.IsDownloadOrRemove(this.state.isAlbert_barnes, "albert_barnes", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Albert Barnes Bible Notes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isGuzik}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isGuzik: !this.state.isGuzik });
                        this.IsDownloadOrRemove(this.state.isGuzik, "guzik", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Guzik Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isConstable}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isConstable: !this.state.isConstable });
                        this.IsDownloadOrRemove(this.state.isConstable, "constable", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Constable Expository Notes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isMhcc}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isMhcc: !this.state.isMhcc });
                        this.IsDownloadOrRemove(this.state.isMhcc, "mhcc", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Matthew Henry's Concise Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isCalvin_complete}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isCalvin_complete: !this.state.isCalvin_complete });
                        this.IsDownloadOrRemove(this.state.isCalvin_complete, "calvin_complete", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Calvin's Complete Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isNasb}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isNasb: !this.state.isNasb });
                        this.IsDownloadOrRemove(this.state.isNasb, "nasb", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"NASB Footnotes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isAv}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isAv: !this.state.isAv });
                        this.IsDownloadOrRemove(this.state.isAv, "av", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"AV Footnotes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isTb}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isTb: !this.state.isTb });
                        this.IsDownloadOrRemove(this.state.isTb, "tb", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Referensi Silang Terjemahan Baru"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isEsv}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isEsv: !this.state.isEsv });
                        this.IsDownloadOrRemove(this.state.isEsv, "esv", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"ESV Footnotes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isNet}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isNet: !this.state.isNet });
                        this.IsDownloadOrRemove(this.state.isNet, "net", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Net Bible Notes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isCornelius}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isCornelius: !this.state.isCornelius });
                        this.IsDownloadOrRemove(this.state.isCornelius, "cornelius", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Commentary of Cornelius à Lapide"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isMpoole}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isMpoole: !this.state.isMpoole });
                        this.IsDownloadOrRemove(this.state.isMpoole, "mpoole", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Matthew Poole's Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isWesley}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isWesley: !this.state.isWesley });
                        this.IsDownloadOrRemove(this.state.isWesley, "wesley", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Wesley's Explanatory Notes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isJamiefauss}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isJamiefauss: !this.state.isJamiefauss });
                        this.IsDownloadOrRemove(this.state.isJamiefauss, "jamiefauss", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Jamieson-Fausset-Brown Bible Commentary"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isRobertson}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isRobertson: !this.state.isRobertson });
                        this.IsDownloadOrRemove(this.state.isRobertson, "robertson", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Robertson's Word Pictures of the New Testament"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isScofield}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isScofield: !this.state.isScofield });
                        this.IsDownloadOrRemove(this.state.isScofield, "scofield", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Scofield Reference Notes"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isCollege}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isCollege: !this.state.isCollege });
                        this.IsDownloadOrRemove(this.state.isCollege, "college", "commentary")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"College"}
                    </Text>
                  </View>

                </View>
              </List.Accordion>
              <List.Accordion
                title="Original Languge"
                titleStyle={{
                  fontFamily: 'NotoSans-Bold',
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR
                }}
                expanded={this.state.isorilang}
                onPress={() =>
                  this.setState({ isorilang: !this.state.isorilang })
                }
                style={{
                  borderTopWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR, backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isOriTR}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isOriTR: !this.state.isOriTR });
                        this.IsDownloadOrRemove(this.state.isOriTR, "ori_tr", "orilang")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Scrivener's Textus Receptus 1894"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isOriTIS}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isOriTIS: !this.state.isOriTIS });
                        this.IsDownloadOrRemove(this.state.isOriTIS, "ori_tis", "orilang")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Tischendorf 8th edition"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isOriWH}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isOriWH: !this.state.isOriWH });
                        this.IsDownloadOrRemove(this.state.isOriWH, "ori_wh", "orilang")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Westcott-Hort 1881"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isOriWLC}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isOriWLC: !this.state.isOriWLC });
                        this.IsDownloadOrRemove(this.state.isOriWLC, "ori_wlc", "orilang")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Westminster Leningrad Codex"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isOriWHNU}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isOriWHNU: !this.state.isOriWHNU });
                        this.IsDownloadOrRemove(this.state.isOriWHNU, "ori_whnu", "orilang")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"Westcott-Hort with UBS4 variants"}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    borderTopWidth: 1,
                    flex: 1,
                    borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                    borderTopWidth: 1,
                    paddingTop: 7,
                    paddingBottom: 12, paddingLeft: 10,
                    paddingRight: 10,
                    flexWrap: "nowrap",
                    backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                  }}
                >
                  <Switch
                    value={this.state.isOriBHSA}
                    onValueChange={() => {
                      if (this.progressdownload == 0) {
                        this.setState({ isOriBHSA: !this.state.isOriBHSA });
                        this.IsDownloadOrRemove(this.state.isOriBHSA, "ori_bhsa", "orilang")
                      }
                      else {

                      }
                    }}
                    color="#3B93DB"
                    style={{ flex: 2 }}
                  />
                  <View style={{ flexDirection: "column", flexWrap: "nowrap", flex: 8 }}>
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 15,
                        paddingTop: 10,
                        color: this.props.STORE_STYLE.TEXT_COLOR,
                      }}
                    >
                      {"ETCBC Biblia Hebraica Stuttgartensia (Amst.) v.4c"}
                    </Text>
                  </View>
                </View>
              </List.Accordion>
            </List.Section>
          </View>
        </ScrollView>
      </View>
    );
  }
  Cancel(resources) {
    if (resources == "BibleESV") {
      this.setState({ isBibleESV: false })
    }

    if (resources == "BibleNET") {
      this.setState({ isBibleNET: false })
    }

    if (resources == "BibleAV") {
      this.setState({ isBibleAV: false })
    }
    if (resources == "BibleTB") {
      this.setState({ isBibleTB: false })
    }
    if (resources == "ori_tr") {
      this.setState({ isOriTR: false })
    }
    if (resources == "ori_tis") {
      this.setState({ isOriTIS: false })
    }
    if (resources == "ori_wh") {
      this.setState({ isOriWH: false })
    }
    if (resources == "ori_lxx") {
      this.setState({ isOriLXX: false })
    }
    if (resources == "ori_bhs") {
      this.setState({ isOriBHS: false })
    }
    if (resources == "ori_wlc") {
      this.setState({ isOriWLC: false })
    }
    if (resources == "ori_whnu") {
      this.setState({ isOriWHNU: false })
    }
    if (resources == "ori_bhsa") {
      this.setState({ isOriBHSA: false })
    }
    if (resources == "abbott_smith") {
      this.setState({ isAbboth: false })
    }
    if (resources == "av_eng") {
      this.setState({ isAVDefinitionEnglish: false })
    }
    if (resources == "av_ind") {
      this.setState({ isAVDefinitionIndo: false })
    }
    if (resources == "barclay") {
      this.setState({ isBarclay: false })
    }
    if (resources == "boeker") {
      this.setState({ isBoeker: false })
    }
    if (resources == "strong") {
      this.setState({ isStrongLexicon: false })
    }
    if (resources == "tdnt") {
      this.setState({ isTDNT: false })
    }
    if (resources == "twot") {
      this.setState({ isTWOT: false })
    }
    if (resources == "yoppi") {
      this.setState({ isYoppi: false })
    }
    if (resources == "tbesh") {
      this.setState({ isTyndaleBrief: false })
    }
    if (resources == "lsj") {
      this.setState({ isLiddelScott: false })
    }


    if (resources == "hitchcock") {
      this.setState({ isHitchcock: false })
    }
    if (resources == "ebd") {
      this.setState({ isEbd: false })
    }
    if (resources == "isbe") {
      this.setState({ isIsbe: false })
    }
    if (resources == "smith") {
      this.setState({ isSmith: false })
    }
    if (resources == "nave") {
      this.setState({ isNave: false })
    }
    if (resources == "netmap") {
      this.setState({ isNetmap: false })
    }
    if (resources == "pedoman") {
      this.setState({ isPedoman: false })
    }
    if (resources == "gering") {
      this.setState({ isGering: false })
    }
    if (resources == "haag") {
      this.setState({ isHaag: false })
    }
    if (resources == "tokoh") {
      this.setState({ isTokoh: false })
    }
    if (resources == "kecil") {
      this.setState({ isKecil: false })
    }
    if (resources == "lambang") {
      this.setState({ isLambang: false })
    }
    if (resources == "browning") {
      this.setState({ isBrowning: false })
    }
    if (resources == "ensiklopedia") {
      this.setState({ isEnsiklopedia: false })
    }
    if (resources == "gill") {
      this.setState({ isGill: false })
    }
    if (resources == "hagelberg") {
      this.setState({ isHagelberg: false })
    }
    if (resources == "critics_ask") {
      this.setState({ isCritics_ask: false })
    }
    if (resources == "barclaycommentary") {
      this.setState({ isBarclayCommentary: false })
    }
    if (resources == "jerusalem") {
      this.setState({ isJerusalem: false })
    }
    if (resources == "clarke") {
      this.setState({ isClarke: false })
    }
    if (resources == "sh") {
      this.setState({ isSh: false })
    }
    if (resources == "matthew_henry") {
      this.setState({ isMatthew_henry: false })
    }
    if (resources == "haydock") {
      this.setState({ isHaydock: false })
    }
    if (resources == "full_life") {
      this.setState({ isFull_life: false })
    }
    if (resources == "101contra") {
      this.setState({ is101contra: false })
    }
    if (resources == "wycliffe") {
      this.setState({ isWycliffe: false })
    }
    if (resources == "bible_query") {
      this.setState({ isBible_query: false })
    }
    if (resources == "maclaren") {
      this.setState({ isMaclaren: false })
    }
    if (resources == "albert_barnes") {
      this.setState({ isAlbert_barnes: false })
    }
    if (resources == "guzik") {
      this.setState({ isGuzik: false })
    }
    if (resources == "constable") {
      this.setState({ isConstable: false })
    }
    if (resources == "mhcc") {
      this.setState({ isMhcc: false })
    }
    if (resources == "calvin_complete") {
      this.setState({ isCalvin_complete: false })
    }
    if (resources == "nasb") {
      this.setState({ isNasb: false })
    }
    if (resources == "av") {
      this.setState({ isAv: false })
    }
    if (resources == "tb") {
      this.setState({ isTb: false })
    }
    if (resources == "esv") {
      this.setState({ isEsv: false })
    }
    if (resources == "net") {
      this.setState({ isNet: false })
    }
    if (resources == "cornelius") {
      this.setState({ isCornelius: false })
    }
    if (resources == "mpoole") {
      this.setState({ isMpoole: false })
    }
    if (resources == "wesley") {
      this.setState({ isWesley: false })
    }
    if (resources == "jamiefauss") {
      this.setState({ isJamiefauss: false })
    }
    if (resources == "robertson") {
      this.setState({ isRobertson: false })
    }
    if (resources == "scofield") {
      this.setState({ isScofield: false })
    }
    if (resources == "college") {
      this.setState({ isCollege: false })
    }



    this._storeData();
  }

  IsDownloadOrRemove(value, resources, type) {

    let map = "";
    let entry = "";

    if (resources == "BibleESV") {
      map = "bibtext_esv_entry.db"
      type = "bible"
    }

    if (resources == "BibleNET") {
      map = "bibtext_net_entry.db"
      type = "bible"
    }

    if (resources == "BibleAV") {
      map = "bibtext_av_entry.db"
      type = "bible"
    }
    if (resources == "BibleTB") {
      map = "bibtext_tb_entry.db"
      type = "bible"
    }
    if (resources == "ori_tr") {
      entry = "orilang_197_map"
      map = "orilang_197_entry.db"
      type = "orilang"

    }
    if (resources == "ori_tis") {
      entry = "orilang_198_map"
      map = "orilang_198_entry.db"
      type = "orilang"

    }
    if (resources == "ori_wh") {
      entry = "orilang_199_map"
      map = "orilang_199_entry.db"
      type = "orilang"

    }
    if (resources == "ori_lxx") {
      entry = "orilang_200_map"
      map = "orilang_200_entry.db"
      type = "orilang"

    }
    if (resources == "ori_bhs") {
      entry = "orilang_201_map"
      map = "orilang_201_entry.db"
      type = "orilang"

    }
    if (resources == "ori_wlc") {
      entry = "orilang_202_map"
      map = "orilang_202_entry.db"
      type = "orilang"

    }
    if (resources == "ori_whnu") {
      entry = "orilang_203_map"
      map = "orilang_203_entry.db"
      type = "orilang"

    }
    if (resources == "ori_bhsa") {
      entry = "orilang_206_map"
      map = "orilang_206_entry.db"
      type = "orilang"

    }
    if (resources == "abbott_smith") {
      map = "lexdef_01_map";
      entry = "lexdef_01_entry.json"
      type = "lexicon";
    }
    if (resources == "av_eng") {
      map = "lexdef_02_map";
      entry = "lexdef_02_entry.json"
      type = "lexicon";
    }
    if (resources == "av_ind") {
      map = "lexdef_03_map";
      entry = "lexdef_03_entry.json"
      type = "lexicon";
    }
    if (resources == "barclay") {
      map = "lexdef_04_map";
      entry = "lexdef_04_entry.json"
      type = "lexicon";
    }
    if (resources == "boeker") {
      map = "lexdef_05_map";
      entry = "lexdef_05_entry.json"
      type = "lexicon";
    }
    if (resources == "strong") {
      map = "lexdef_06_map";
      entry = "lexdef_06_entry.json"
      type = "lexicon";
    }

    if (resources == "tdnt") {
      map = "lexdef_07_map";
      entry = "lexdef_07_entry.json"
      type = "lexicon";
    }

    if (resources == "twot") {
      map = "lexdef_08_map";
      entry = "lexdef_08_entry.json"
      type = "lexicon";
    }

    if (resources == "yoppi") {
      map = "lexdef_09_map";
      entry = "lexdef_09_entry.json"
      type = "lexicon";
    }

    if (resources == "tbesh") {
      map = "lexdef_10_map"
      entry = "lexdef_10_entry.json"
      type = "lexicon";
    }

    if (resources == "lsj") {
      map = "lexdef_11_map";
      entry = "lexdef_11_entry.json"
      type = "lexicon";
    }

    if (resources == "hitchcock") {
      map = "dct_01_map";
      entry = "dct_01_entry.json"
      type = "dictionary";
    }
    if (resources == "ebd") {
      map = "dct_02_map";
      entry = "dct_02_entry.json"
      type = "dictionary";
    }
    if (resources == "isbe") {
      map = "dct_03_map";
      entry = "dct_03_entry.json"
      type = "dictionary";
    }
    if (resources == "smith") {
      map = "dct_04_map";
      entry = "dct_04_entry.json"
      type = "dictionary";
    }
    if (resources == "nave") {
      map = "dct_05_map";
      entry = "dct_05_entry.json"
      type = "dictionary";
    }
    if (resources == "netmap") {
      map = "dct_12_map";
      entry = "dct_12_entry.json"
      type = "dictionary";
    }
    if (resources == "pedoman") {
      map = "dct_15_map";
      entry = "dct_15_entry.json"
      type = "dictionary";
    }
    if (resources == "gering") {
      map = "dct_16_map";
      entry = "dct_16_entry.json"
      type = "dictionary";
    }
    if (resources == "haag") {
      map = "dct_17_map";
      entry = "dct_17_entry.json"
      type = "dictionary";
    }
    if (resources == "tokoh") {
      map = "dct_18_map";
      entry = "dct_18_entry.json"
      type = "dictionary";
    }
    if (resources == "kecil") {
      map = "dct_19_map";
      entry = "dct_19_entry.json"
      type = "dictionary";
    }
    if (resources == "lambang") {
      map = "dct_23_map";
      entry = "dct_23_entry.json"
      type = "dictionary";
    }
    if (resources == "browning") {
      map = "dct_24_map";
      entry = "dct_24_entry.json"
      type = "dictionary";
    }
    if (resources == "ensiklopedia") {
      map = "dct_27_map";
      entry = "dct_27_entry.json"
      type = "dictionary";
    }
    if (resources == "gill") {
      map = "cmt_01_map";
      entry = "cmt_01_entry.json"
      type = "commentary";
    }
    if (resources == "hagelberg") {
      map = "cmt_02_map";
      entry = "cmt_02_entry.json"
      type = "commentary";
    }
    if (resources == "critics_ask") {
      map = "cmt_03_map";
      entry = "cmt_03_entry.json"
      type = "commentary";
    }
    if (resources == "barclaycommentary") {
      map = "cmt_04_map";
      entry = "cmt_04_entry.json"
      type = "commentary";
    }
    if (resources == "jerusalem") {
      map = "cmt_05_map";
      entry = "cmt_05_entry.json"
      type = "commentary";
    }
    if (resources == "clarke") {
      map = "cmt_06_map";
      entry = "cmt_06_entry.json"
      type = "commentary";
    }
    if (resources == "sh") {
      map = "cmt_07_map";
      entry = "cmt_07_entry.json"
      type = "commentary";
    }
    if (resources == "matthew_henry") {
      map = "cmt_08_map";
      entry = "cmt_08_entry.json"
      type = "commentary";
    }
    if (resources == "haydock") {
      map = "cmt_09_map";
      entry = "cmt_09_entry.json"
      type = "commentary";
    }
    if (resources == "full_life") {
      map = "cmt_10_map";
      entry = "cmt_10_entry.json"
      type = "commentary";
    }
    if (resources == "101contra") {
      map = "cmt_11_map";
      entry = "cmt_11_entry.json"
      type = "commentary";
    }
    if (resources == "wycliffe") {
      map = "cmt_12_map";
      entry = "cmt_12_entry.json"
      type = "commentary";
    }
    if (resources == "bible_query") {
      map = "cmt_13_map";
      entry = "cmt_13_entry.json"
      type = "commentary";
    }
    if (resources == "maclaren") {
      map = "cmt_14_map";
      entry = "cmt_14_entry.json"
      type = "commentary";
    }
    if (resources == "albert_barnes") {
      map = "cmt_15_map";
      entry = "cmt_15_entry.json"
      type = "commentary";
    }
    if (resources == "guzik") {
      map = "cmt_16_map";
      entry = "cmt_16_entry.json"
      type = "commentary";
    }
    if (resources == "constable") {
      map = "cmt_17_map";
      entry = "cmt_17_entry.json"
      type = "commentary";
    }
    if (resources == "mhcc") {
      map = "cmt_18_map";
      entry = "cmt_18_entry.json"
      type = "commentary";
    }
    if (resources == "calvin_complete") {
      map = "cmt_19_map";
      entry = "cmt_19_entry.json"
      type = "commentary";
    }
    if (resources == "nasb") {
      map = "cmt_20_map";
      entry = "cmt_20_entry.json"
      type = "commentary";
    }
    if (resources == "av") {
      map = "cmt_21_map";
      entry = "cmt_21_entry.json"
      type = "commentary";
    }
    if (resources == "tb") {
      map = "cmt_22_map";
      entry = "cmt_22_entry.json"
      type = "commentary";
    }
    if (resources == "esv") {
      map = "cmt_23_map";
      entry = "cmt_23_entry.json"
      type = "commentary";
    }
    if (resources == "net") {
      map = "cmt_24_map";
      entry = "cmt_24_entry.json"
      type = "commentary";
    }
    if (resources == "cornelius") {
      map = "cmt_29_map";
      entry = "cmt_29_entry.json"
      type = "commentary";
    }
    if (resources == "mpoole") {
      map = "cmt_30_map";
      entry = "cmt_30_entry.json"
      type = "commentary";
    }
    if (resources == "wesley") {
      map = "cmt_31_map";
      entry = "cmt_31_entry.json"
      type = "commentary";
    }
    if (resources == "jamiefauss") {
      map = "cmt_32_map";
      entry = "cmt_32_entry.json"
      type = "commentary";
    }
    if (resources == "robertson") {
      map = "cmt_33_map";
      entry = "cmt_33_entry.json"
      type = "commentary";
    }
    if (resources == "scofield") {
      map = "cmt_34_map";
      entry = "cmt_34_entry.json"
      type = "commentary";
    }
    if (resources == "college") {
      map = "cmt_35_map";
      entry = "cmt_35_entry.json"
      type = "commentary";
    }

    if (!value) {
      Alert.alert(
        DCT.getValue(
          "download",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        DCT.getValue(
          "downloaddesc",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        [
          {
            text: DCT.getValue(
              "cancel",
              this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            ),
            onPress: () => {
              this.Cancel(resources);

            },
          },
          {
            text: "Download",
            onPress: () => {
              console.log("cmd(map, entry, type)")
              if (this.progressdownload2 == 0)
                this.Download(map, entry, type)
            },
          },
        ],
        { cancelable: false }
      );
    }
    else {

      Alert.alert(
        DCT.getValue(
          "remove",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        DCT.getValue(
          "removedesc",
          this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
        ),
        [
          {
            text: DCT.getValue(
              "cancel",
              this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
            ),
            onPress: () => {


            },
          },
          {
            text: "Remove",
            onPress: () => {
              this.setState({ downloadProgress2: 0 })
              this.Remove(map, type)

              this._storeData();
            },
          },
        ],
        { cancelable: false }
      );
    }
  }

  async Remove(resources, type) {
    if (type === "lexicon") {
      let db = SQLite.openDatabase('lexdef_map.db');
      let removetable = "";
      let res_id = "0"
      if (resources === "lexdef_01_map") {
        removetable = "abbott_smith";
        res_id = "1"
      }
      if (resources === "lexdef_02_map") {
        removetable = "av_eng";
        res_id = "2"
      }
      if (resources === "lexdef_03_map") {
        removetable = "av_ind";
        res_id = "3"
      }
      if (resources === "lexdef_04_map") {
        removetable = "barclay";
        res_id = "4"
      }
      if (resources === "lexdef_05_map") {
        removetable = "boeker";
        res_id = "5"
      }
      if (resources === "lexdef_06_map") {
        removetable = "strong";
        res_id = "6"
      }
      if (resources === "lexdef_07_map") {
        removetable = "tdnt";
        res_id = "7"
      }
      if (resources === "lexdef_08_map") {
        removetable = "twot";
        res_id = "8"
      }
      if (resources === "lexdef_09_map") {
        removetable = "yoppi";
        res_id = "9"
      }
      if (resources === "lexdef_10_map") {
        removetable = "tbesh";
        res_id = "10"
      }
      if (resources === "lexdef_11_map") {
        removetable = "lsj";
        res_id = "11"
      }

      try {
        db.transaction(
          tx => {

            tx.executeSql("DELETE From resource_lexdef  WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_lexdef_strong_01_G WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_lexdef_strong_02_G WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_lexdef_strong_01_H WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_lexdef_strong_02_H WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {

          }
        )
      }
      catch (e) {
        console.log(e);
      }
    }
    else if (type === "dictionary") {
      let db = SQLite.openDatabase('dct_map.db');
      let removetable = "";
      let res_id = "0"
      if (resources == "dct_01_map") {
        removetable = "hitchcock-";
        res_id = "1"
      }
      if (resources == "dct_02_map") {
        removetable = "ebd-";
        res_id = "2"
      }
      if (resources == "dct_03_map") {
        removetable = "isbe-";
        res_id = "3"
      }
      if (resources == "dct_04_map") {
        removetable = "smith-";
        res_id = "4"
      }
      if (resources == "dct_05_map") {
        removetable = "nave-";
        res_id = "5"
      }
      if (resources == "dct_12_map") {
        removetable = "netmap-";
        res_id = "12"
      }
      if (resources == "dct_15_map") {
        removetable = "pedoman-";
        res_id = "15"
      }
      if (resources == "dct_16_map") {
        removetable = "gering-";
        res_id = "16"
      }
      if (resources == "dct_17_map") {
        removetable = "haag-";
        res_id = "17"
      }
      if (resources == "dct_18_map") {
        removetable = "tokoh-";
        res_id = "18"
      }
      if (resources == "dct_19_map") {
        removetable = "kecil-";
        res_id = "19"
      }
      if (resources == "dct_20_map") {
        removetable = "peta-";
        res_id = "20"
      }
      if (resources == "dct_21_map") {
        removetable = "biotokohpb";
        res_id = "21"
      }
      if (resources == "dct_22_map") {
        removetable = "biotokohpl";
        res_id = "22"
      }
      if (resources == "dct_23_map") {
        removetable = "lambang-";
        res_id = "23"
      }
      if (resources == "dct_24_map") {
        removetable = "browning-";
        res_id = "24"
      }
      if (resources == "dct_27_map") {
        removetable = "ensiklopedia-";
        res_id = "27"
      }
      if (resources == "dct_38_map") {
        removetable = "wordnet";
        res_id = "38"
      }
      if (resources == "dct_39_map") {
        removetable = "kbbi";
        res_id = "39"
      }



      try {
        db.transaction(
          tx => {
            tx.executeSql("DELETE From resource_dct  WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_dct_strong_01_G WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_dct_strong_02_G WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_dct_strong_01_H WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            tx.executeSql("DELETE From map_dct_strong_02_H WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
          },
          error => {
            console.log(error);
          },
          () => {

          }
        )
      }
      catch (e) {
        console.log(e);
      }
    }
    else if (type === "commentary") {

      let db = SQLite.openDatabase('cmt_map.db');
      let res_id = "0";
      if (resources == "cmt_01_map") {
        res_id = "1"
      }
      if (resources == "cmt_02_map") {
        res_id = "2"
      }
      if (resources == "cmt_03_map") {
        res_id = "3"
      }
      if (resources == "cmt_04_map") {
        res_id = "4"
      }
      if (resources == "cmt_05_map") {
        res_id = "5"
      }
      if (resources == "cmt_06_map") {
        res_id = "6"
      }
      if (resources == "cmt_07_map") {
        res_id = "7"
      }
      if (resources == "cmt_08_map") {
        res_id = "8"
      }
      if (resources == "cmt_09_map") {
        res_id = "9"
      }
      if (resources == "cmt_10_map") {
        res_id = "10"
      }
      if (resources == "cmt_11_map") {
        res_id = "11"
      }
      if (resources == "cmt_12_map") {
        res_id = "12"
      }
      if (resources == "cmt_13_map") {
        res_id = "13"
      }
      if (resources == "cmt_14_map") {
        res_id = "14"
      }
      if (resources == "cmt_15_map") {
        res_id = "15"
      }
      if (resources == "cmt_16_map") {
        res_id = "16"
      }
      if (resources == "cmt_17_map") {
        res_id = "17"
      }
      if (resources == "cmt_18_map") {
        res_id = "18"
      }
      if (resources == "cmt_19_map") {
        res_id = "19"
      }
      if (resources == "cmt_20_map") {
        res_id = "20"
      }
      if (resources == "cmt_21_map") {
        res_id = "21"
      }
      if (resources == "cmt_22_map") {
        res_id = "22"
      }
      if (resources == "cmt_23_map") {
        res_id = "23"
      }
      if (resources == "cmt_24_map") {
        res_id = "24"
      }
      if (resources == "cmt_29_map") {
        res_id = "29"
      }
      if (resources == "cmt_30_map") {
        res_id = "30"
      }
      if (resources == "cmt_31_map") {
        res_id = "31"
      }
      if (resources == "cmt_32_map") {
        res_id = "32"
      }
      if (resources == "cmt_33_map") {
        res_id = "33"
      }
      if (resources == "cmt_34_map") {
        res_id = "34"
      }
      if (resources == "cmt_35_map") {
        res_id = "35"
      }


      try {
        db.transaction(
          tx => {
            tx.executeSql("DELETE From resource_cmt  WHERE res_id = " + res_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            let sqlitesql = "";
            let sqlitesql2 = "";

            for (let x = 1; x <= 2; x++) {

              for (let i = 1; i <= 66; i++) {
                let number = "";
                if (i.toString().length == 2)
                  number = i.toString();
                else
                  number = "0" + i.toString();

                sqlitesql = "DELETE From map_cmt_strong_0" + x.toString() + "_" + number + " WHERE res_id = " + res_id;
                sqlitesql2 = "DELETE From map_cmt_verse_0" + x.toString() + "_" + number + " WHERE res_id = " + res_id;
                console.log(sqlitesql);
                tx.executeSql(sqlitesql,
                  [],
                  (tx, results) => {
                    console.log(results);
                  },
                  (tx, error) => {
                    console.log(error);
                  }
                );
                console.log(sqlitesql2);
                tx.executeSql(sqlitesql2,
                  [],
                  (tx, results) => {
                    console.log(results);
                  },
                  (tx, error) => {
                    console.log(error);
                  }
                );
              }
            }
          },
          error => {
            console.log(error);
          },
          () => {

          }
        )
      }
      catch (e) {
        console.log(e);
      }


    }
    else if (type === "bible") {
      const sqlDir = FileSystem.documentDirectory + "SQLite/";
      if (resources === "BibleESV") {
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "esv")
          this.props.ACT_setBibleVersion("")
        await FileSystem.deleteAsync(sqlDir + "bibtext_esv_entry.db", { idempotent: false });
      }
      else if (resources === "BibleNET") {
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "net")
          this.props.ACT_setBibleVersion("")
        await FileSystem.deleteAsync(sqlDir + "bibtext_net_entry.db", { idempotent: false });
      }
      else if (resources === "BibleAV") {
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "av")
          this.props.ACT_setBibleVersion("")
        await FileSystem.deleteAsync(sqlDir + "bibtext_av_entry.db", { idempotent: false });
      }
      else if (resources === "BibleTB") {
        if (this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase() == "tb")
          this.props.ACT_setBibleVersion("")
        await FileSystem.deleteAsync(sqlDir + "bibtext_tb_entry.db", { idempotent: false });
      }

      this.props.ACT_setBookChapterChange(true);
    }
    else if (type === "orilang") {
      let ver_id = "0";
      if (resources == "orilang_197_entry.db") {
        ver_id = "197"
      }
      if (resources == "orilang_198_entry.db") {
        ver_id = "198"
      }
      if (resources == "orilang_199_entry.db") {
        ver_id = "199"
      }
      if (resources == "orilang_200_entry.db") {
        ver_id = "200"
      }
      if (resources == "orilang_201_entry.db") {
        ver_id = "201"
      }
      if (resources == "orilang_202_entry.db") {
        ver_id = "202"
      }
      if (resources == "orilang_203_entry.db") {
        ver_id = "203"
      }
      if (resources == "orilang_206_entry.db") {
        ver_id = "206"
      }
      let db = SQLite.openDatabase('orilang.db');

      try {
        db.transaction(
          tx => {
            tx.executeSql("DELETE From resource_orilang  WHERE version_id = " + ver_id,
              [],
              (tx, results) => {
                console.log(results);
              },
              (tx, error) => {
                console.log(error);
              }
            );
            let sqlitesql = "";
            for (let i = 1; i <= 66; i++) {
              let number = "";
              if (i.toString().length == 2)
                number = i.toString();
              else
                number = "0" + i.toString();

              sqlitesql = "DELETE From map_bookchap_orilang_" + number + " WHERE resource_id = " + ver_id;

              tx.executeSql(sqlitesql,
                [],
                (tx, results) => {
                  console.log(results);
                },
                (tx, error) => {
                  console.log(error);
                }
              );
            }
          },
          error => {
            console.log(error);
          },
          () => {

          }
        )
      }
      catch (e) {
        console.log(e);
      }



    }

  }

  _storeData = async () => {


    let isBibleESV = "true";
    if (this.state.isBibleESV === true) isBibleESV = "true";
    else isBibleESV = "false";

    let isBibleNET = "true";
    if (this.state.isBibleNET === true) isBibleNET = "true";
    else isBibleNET = "false";

    let isBibleAV = "true";
    if (this.state.isBibleAV === true) isBibleAV = "true";
    else isBibleAV = "false"

    let isBibleTB = "true";
    if (this.state.isBibleTB === true) isBibleTB = "true";
    else isBibleTB = "false"

    let isOriTR = "true";
    if (this.state.isOriTR === true) isOriTR = "true";
    else isOriTR = "false"

    let isOriTIS = "true";
    if (this.state.isOriTIS === true) isOriTIS = "true";
    else isOriTIS = "false"

    let isOriWLC = "true";
    if (this.state.isOriWLC === true) isOriWLC = "true";
    else isOriWLC = "false"


    let isOriWH = "true";
    if (this.state.isOriWH === true) isOriWH = "true";
    else isOriWH = "false"

    let isOriLXX = "true";
    if (this.state.isOriLXX === true) isOriLXX = "true";
    else isOriLXX = "false"

    let isOriBHS = "true";
    if (this.state.isOriBHS === true) isOriBHS = "true";
    else isOriBHS = "false"

    let isOriWHNU = "true";
    if (this.state.isOriWHNU === true) isOriWHNU = "true";
    else isOriWHNU = "false"

    let isOriBHSA = "true";
    if (this.state.isOriBHSA === true) isOriBHSA = "true";
    else isOriBHSA = "false"

    let isabboth = "true";
    if (this.state.isAbboth === true) isabboth = "true";
    else isabboth = "false";

    let isavdefinitionenglish = "true";
    if (this.state.isAVDefinitionEnglish === true) isavdefinitionenglish = "true";
    else isavdefinitionenglish = "false";

    let isavdefinitionindo = "true";
    if (this.state.isAVDefinitionIndo === true) isavdefinitionindo = "true";
    else isavdefinitionindo = "false";

    let isbarclay = "true";
    if (this.state.isBarclay === true) isbarclay = "true";
    else isbarclay = "false";

    let isboeker = "true";
    if (this.state.isBoeker === true) isboeker = "true";
    else isboeker = "false";

    let istdnt = "true";
    if (this.state.isTDNT === true) istdnt = "true";
    else istdnt = "false";

    let istwot = "true";
    if (this.state.isTWOT === true) istwot = "true";
    else istwot = "false";

    let isyoppi = "true";
    if (this.state.isYoppi === true) isyoppi = "true";
    else isyoppi = "false";

    let istyndalebrief = "true";
    if (this.state.isTyndaleBrief === true) istyndalebrief = "true";
    else istyndalebrief = "false";

    let isliddelscott = "true";
    if (this.state.isLiddelScott === true) isliddelscott = "true";
    else isliddelscott = "false";

    let isstronglexicon = "true";
    if (this.state.isStrongLexicon === true) isstronglexicon = "true";
    else isstronglexicon = "false";

    let ishitchcock = "true";
    if (this.state.isHitchcock === true) ishitchcock = "true";
    else ishitchcock = "false";

    let isebd = "true";
    if (this.state.isEbd === true) isebd = "true";
    else isebd = "false";

    let isisbe = "true";
    if (this.state.isIsbe === true) isisbe = "true";
    else isisbe = "false";

    let issmith = "true";
    if (this.state.isSmith === true) issmith = "true";
    else issmith = "false";

    let isnave = "true";
    if (this.state.isNave === true) isnave = "true";
    else isnave = "false";

    let isnetmap = "true";
    if (this.state.isNetmap === true) isnetmap = "true";
    else isnetmap = "false";

    let ispedoman = "true";
    if (this.state.isPedoman === true) ispedoman = "true";
    else ispedoman = "false";

    let isgering = "true";
    if (this.state.isGering === true) isgering = "true";
    else isgering = "false";

    let ishaag = "true";
    if (this.state.isHaag === true) ishaag = "true";
    else ishaag = "false";

    let istokoh = "true";
    if (this.state.isTokoh === true) istokoh = "true";
    else istokoh = "false";

    let iskecil = "true";
    if (this.state.isKecil === true) iskecil = "true";
    else iskecil = "false";

    let islambang = "true";
    if (this.state.isLambang === true) islambang = "true";
    else islambang = "false";

    let isbrowning = "true";
    if (this.state.isBrowning === true) isbrowning = "true";
    else isbrowning = "false";

    let isensiklopedia = "true";
    if (this.state.isEnsiklopedia === true) isensiklopedia = "true";
    else isensiklopedia = "false";

    let isgill = "true";
    if (this.state.isGill === true) isgill = "true";
    else isgill = "false";

    let ishagelberg = "true";
    if (this.state.isHagelberg === true) ishagelberg = "true";
    else ishagelberg = "false";

    let iscritics_ask = "true";
    if (this.state.isCritics_ask === true) iscritics_ask = "true";
    else iscritics_ask = "false";

    let isbarclaycommentary = "true";
    if (this.state.isBarclayCommentary === true) isbarclaycommentary = "true";
    else isbarclaycommentary = "false";

    let isjerusalem = "true";
    if (this.state.isJerusalem === true) isjerusalem = "true";
    else isjerusalem = "false";

    let isclarke = "true";
    if (this.state.isClarke === true) isclarke = "true";
    else isclarke = "false";

    let issh = "true";
    if (this.state.isSh === true) issh = "true";
    else issh = "false";

    let ismatthew_henry = "true";
    if (this.state.isMatthew_henry === true) ismatthew_henry = "true";
    else ismatthew_henry = "false";

    let ishaydock = "true";
    if (this.state.isHaydock === true) ishaydock = "true";
    else ishaydock = "false";

    let isfull_life = "true";
    if (this.state.isFull_life === true) isfull_life = "true";
    else isfull_life = "false";

    let is101contra = "true";
    if (this.state.is101contra === true) is101contra = "true";
    else is101contra = "false";

    let iswycliffe = "true";
    if (this.state.isWycliffe === true) iswycliffe = "true";
    else iswycliffe = "false";

    let isbible_query = "true";
    if (this.state.isBible_query === true) isbible_query = "true";
    else isbible_query = "false";

    let ismaclaren = "true";
    if (this.state.isMaclaren === true) ismaclaren = "true";
    else ismaclaren = "false";

    let isalbert_barnes = "true";
    if (this.state.isAlbert_barnes === true) isalbert_barnes = "true";
    else isalbert_barnes = "false";

    let isguzik = "true";
    if (this.state.isGuzik === true) isguzik = "true";
    else isguzik = "false";

    let isconstable = "true";
    if (this.state.isConstable === true) isconstable = "true";
    else isconstable = "false";

    let ismhcc = "true";
    if (this.state.isMhcc === true) ismhcc = "true";
    else ismhcc = "false";

    let iscalvin_complete = "true";
    if (this.state.isCalvin_complete === true) iscalvin_complete = "true";
    else iscalvin_complete = "false";

    let isnasb = "true";
    if (this.state.isNasb === true) isnasb = "true";
    else isnasb = "false";

    let isav = "true";
    if (this.state.isAv === true) isav = "true";
    else isav = "false";

    let istb = "true";
    if (this.state.isTb === true) istb = "true";
    else istb = "false";

    let isesv = "true";
    if (this.state.isEsv === true) isesv = "true";
    else isesv = "false";

    let isnet = "true";
    if (this.state.isNet === true) isnet = "true";
    else isnet = "false";

    let iscornelius = "true";
    if (this.state.isCornelius === true) iscornelius = "true";
    else iscornelius = "false";

    let ismpoole = "true";
    if (this.state.isMpoole === true) ismpoole = "true";
    else ismpoole = "false";

    let iswesley = "true";
    if (this.state.isWesley === true) iswesley = "true";
    else iswesley = "false";

    let isjamiefauss = "true";
    if (this.state.isJamiefauss === true) isjamiefauss = "true";
    else isjamiefauss = "false";

    let isrobertson = "true";
    if (this.state.isRobertson === true) isrobertson = "true";
    else isrobertson = "false";

    let isscofield = "true";
    if (this.state.isScofield === true) isscofield = "true";
    else isscofield = "false";

    let iscollege = "true";
    if (this.state.isCollege === true) iscollege = "true";
    else iscollege = "false";


    try {
      await AsyncStorage.setItem("isBibleESV", isBibleESV);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isBibleNET", isBibleNET);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isBibleAV", isBibleAV);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isBibleTB", isBibleTB);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isOriTR", isOriTR);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isOriTIS", isOriTIS);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isOriWH", isOriWH);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isOriLXX", isOriLXX);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isOriBHS", isOriBHS);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isOriWLC", isOriWLC);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isOriWHNU", isOriWHNU);
    } catch (error) {
      console.log(error);
    }    
    try {
      await AsyncStorage.setItem("isOriBHSA", isOriBHSA);
    } catch (error) {
      console.log(error);
    }






    try {
      await AsyncStorage.setItem("isabboth", isabboth);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isavdefinitionenglish", isavdefinitionenglish);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isavdefinitionindo", isavdefinitionindo);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isbarclay", isbarclay);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isboeker", isboeker);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("istdnt", istdnt);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("istwot", istwot);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isyoppi", isyoppi);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("istyndalebrief", istyndalebrief);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isliddelscott", isliddelscott);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isstronglexicon", isstronglexicon);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("ishitchcock", ishitchcock);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isebd", isebd);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isisbe", isisbe);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("issmith", issmith);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isnave", isnave);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("isnetmap", isnetmap);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("ispedoman", ispedoman);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isgering", isgering);
    } catch (error) {
      console.log(error);
    }


    try {
      await AsyncStorage.setItem("ishaag", ishaag);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("istokoh", istokoh);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("iskecil", iskecil);
    } catch (error) {
      console.log(error);
    }
    try {
      await AsyncStorage.setItem("islambang", islambang);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isbrowning", isbrowning);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isensiklopedia", isensiklopedia);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isgill", isgill);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("ishagelberg", ishagelberg);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("iscritics_ask", iscritics_ask);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isbarclaycommentary", isbarclaycommentary);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isjerusalem", isjerusalem);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isclarke", isclarke);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("issh", issh);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("ismatthew_henry", ismatthew_henry);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("ishaydock", ishaydock);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isfull_life", isfull_life);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("is101contra", is101contra);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("iswycliffe", iswycliffe);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isbible_query", isbible_query);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("ismaclaren", ismaclaren);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isalbert_barnes", isalbert_barnes);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isguzik", isguzik);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isconstable", isconstable);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("ismhcc", ismhcc);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("iscalvin_complete", iscalvin_complete);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isnasb", isnasb);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isav", isav);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("istb", istb);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isesv", isesv);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isnet", isnet);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("iscornelius", iscornelius);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("ismpoole", ismpoole);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("iswesley", iswesley);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isjamiefauss", isjamiefauss);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isrobertson", isrobertson);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("isscofield", isrobertson);
    } catch (error) {
      console.log(error);
    }

    try {
      await AsyncStorage.setItem("iscollege", isrobertson);
    } catch (error) {
      console.log(error);
    }


  };





  async Download(resources, entry, type) {

    if (type !== "bible") {


      this.downloadpart1 = "Download Part 1 :"
      this.downloadpart2 = "Download Part 2 :"

      if (type == "orilang") {
        console.log("orilanguage")
        this.props.navigation.setParams({
          download: true
        });
        try {
          const callback = downloadProgress => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
            this.setState({
              downloadProgress: progress,
            });
          };
          const downloadResumable = FileSystem.createDownloadResumable(
            'https://vocationfirst.net/mysabda/data/' + resources,
            FileSystem.documentDirectory + "SQLite/" + resources,
            {},
            callback
          );
  
          try {
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
            this.Remove(resources, type)

          } catch (e) {
            console.log(e);
          }
        }
        catch (error) {
          console.log(error)
        }
        try {
          const callback2 = downloadProgress2 => {
            const progress2 = downloadProgress2.totalBytesWritten / downloadProgress2.totalBytesExpectedToWrite * 100;

            this.setState({
              downloadProgress2: progress2,
            });
          };

          downloadResumable2 = FileSystem.createDownloadResumable(
            'https://vocationfirst.net/mysabda/data/' + entry,
            FileSystem.documentDirectory + entry,
            {},
            callback2
          );



          try {
            const { uri } = await downloadResumable2.downloadAsync();
            Alert.alert(
              DCT.getValue(
                "download",
                this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
              ),
              DCT.getValue(
                "downloadsuccess",
                this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
              ),
              [{
                text: "OK", onPress: () => {
                  this.setState({ downloadProgress: 0, downloadProgress2: 0 })
                  this.progressdownload = 0;
                  this.progressdownload2 = 0;
                  this.props.navigation.setParams({
                    download: false
                  });
                  this.props.ACT_setBookChapterChange(true);
                  this.InsertToTable(entry, type);
                  this.setState({ downloadProgress: 0, downloadProgress2: 0 })
                  this._storeData();
                }
              }],
              { cancelable: false }
            );
          } catch (e) {
            console.log(e);
          }
        }
        catch (error) {
          console.log(error);
        }
      }
      else {
        try {
          const callback = downloadProgress => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
            this.setState({
              downloadProgress: progress,
            });
          };
          const downloadResumable = FileSystem.createDownloadResumable(
            'https://vocationfirst.net/mysabda/data/' + resources,
            FileSystem.documentDirectory + resources,
            {},
            callback
          );

          try {
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
            this.Remove(resources, type)
            this.InsertToTable(resources, type);
          } catch (e) {
            console.log(e);
          }
        }
        catch (error) {
          console.log(error)
        }
        try {
          const callback2 = downloadProgress2 => {
            const progress2 = downloadProgress2.totalBytesWritten / downloadProgress2.totalBytesExpectedToWrite * 100;

            this.setState({
              downloadProgress2: progress2,
            });
          };

          downloadResumable2 = FileSystem.createDownloadResumable(
            'https://vocationfirst.net/mysabda/data/' + entry,
            FileSystem.documentDirectory + entry,
            {},
            callback2
          );



          try {
            const { uri } = await downloadResumable2.downloadAsync();
            Alert.alert(
              DCT.getValue(
                "download",
                this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
              ),
              DCT.getValue(
                "downloadsuccess",
                this.props.STORE_BIBLE.LANG_CODE.toLowerCase()
              ),
              [{
                text: "OK", onPress: () => {
                  this.setState({ downloadProgress: 0, downloadProgress2: 0 })
                  this.progressdownload = 0;
                  this.progressdownload2 = 0;
                  this.props.navigation.setParams({
                    download: false
                  });
                  this.props.ACT_setBookChapterChange(true);
                  this.setState({ downloadProgress: 0, downloadProgress2: 0 })
                  this._storeData();
                }
              }],
              { cancelable: false }
            );
          } catch (e) {
            console.log(e);
          }
        }
        catch (error) {
          console.log(error);
        }
      }

    }
    else {
      this.downloadpart1 = "Download :"
      this.downloadpart2 = "Download :"
      this.props.navigation.setParams({
        download: true
      });
      try {
        const callback = downloadProgress => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite * 100;
          this.setState({
            downloadProgress: progress,
          });
        };
        const downloadResumable = FileSystem.createDownloadResumable(
          'https://vocationfirst.net/mysabda/data/' + resources,
          FileSystem.documentDirectory + "SQLite/" + resources,
          {},
          callback
        );

        try {
          const { uri } = await downloadResumable.downloadAsync();
          this.progressdownload = 0;
          this.progressdownload2 = 0;
          this.props.navigation.setParams({
            download: false
          });
          this.setState({ downloadProgress: 0, downloadProgress2: 0 })
          this._storeData();
          console.log('Finished downloading to ', uri);
        } catch (e) {
          console.log(e);
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    console.log("Download")


  }

  async InsertToTable(resources, type) {

    if (type === "lexicon") {


      let db = SQLite.openDatabase('lexdef_map.db');
      let boolSuccess = false;
      let sql = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + resources, { encoding: EncodingType.UTF8 });
      const eol = require('eol')
      var sql_array = eol.split(sql)
      //var sql_array = sql.split("\n");
      for (let i = 0; i < sql_array.length; i++) {
        try {
          //  console.log(sql_array[i]);
          db.transaction(
            tx => {

              tx.executeSql(sql_array[i],
                [],
                (tx, results) => {
                  console.log(results);
                },
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log("Transaction error");
            },
            () => {
              boolSuccess = true;
            }
          );
          if (boolSuccess && i == sql_array.length - 1)
            alert("Download " + resources + " sucess !");
        } catch (e) {
          console.log(e);
        }
      }


    }
    else if (type === "dictionary") {
      let db = SQLite.openDatabase('dct_map.db');

      let boolSuccess = false;
      let sql = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + resources, { encoding: EncodingType.UTF8 });
      const eol = require('eol')
      var sql_array = eol.split(sql)
      //var sql_array = sql.split("\n");
      for (let i = 0; i < sql_array.length; i++) {
        try {
          //  console.log(sql_array[i]);
          db.transaction(
            tx => {

              tx.executeSql(sql_array[i],
                [],
                (tx, results) => {
                  console.log(results);
                },
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log("Transaction error");
            },
            () => {
              boolSuccess = true;
            }
          );
          if (boolSuccess && i == sql_array.length - 1) {
            alert("Download " + resources + " sucess !");

          }
        } catch (e) {
          console.log(e);
        }
      }

    }
    else if (type === "commentary") {

      let db = SQLite.openDatabase('cmt_map.db');

      let boolSuccess = false;
      let sql = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + resources, { encoding: EncodingType.UTF8 });
      const eol = require('eol')
      var sql_array = eol.split(sql)
      //var sql_array = sql.split("\n");
      for (let i = 0; i < sql_array.length; i++) {
        try {
          //  console.log(sql_array[i]);
          db.transaction(
            tx => {

              tx.executeSql(sql_array[i],
                [],
                (tx, results) => {
                  console.log(results);
                },
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log("Transaction error");
            },
            () => {
              boolSuccess = true;
            }
          );
          if (boolSuccess && i == sql_array.length - 1) {
            alert("Download " + resources + " sucess !");

          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    else if (type === "orilang") {
      let db = SQLite.openDatabase('orilang.db');

      let boolSuccess = false;
      let sql = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + resources, { encoding: EncodingType.UTF8 });
      const eol = require('eol')
      var sql_array = eol.split(sql)
      //var sql_array = sql.split("\n");
      for (let i = 0; i < sql_array.length; i++) {
        try {
          //  console.log(sql_array[i]);
          db.transaction(
            tx => {

              tx.executeSql(sql_array[i],
                [],
                (tx, results) => {
                  console.log(results);
                },
                (tx, error) => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log("Transaction error");
            },
            () => {
              boolSuccess = true;
            }
          );
          if (boolSuccess && i == sql_array.length - 1) {
            alert("Download " + resources + " sucess !");

          }
        } catch (e) {
          console.log(e);
        }
      }

    }
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8",
    paddingBottom: 100,
    flexDirection: "column"
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
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
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
    ACT_setLangChange: (lang_code) =>
      dispatch(BibleAction.setLangChange(lang_code)),
    ACT_setBookID: (book_id) => dispatch(BibleAction.setBookID(book_id)),
    ACT_setChapterNo: (chapter_no) =>
      dispatch(BibleAction.setChapterNo(chapter_no)),
    ACT_setBookChapterChange: (book_chapter_change) =>
      dispatch(BibleAction.setBookChapterChange(book_chapter_change)),
    ACT_setIsLineView: (is_line_view) =>
      dispatch(BibleAction.setIsLineView(is_line_view)),
    ACT_setIsShowNotes: (is_shownotes) =>
      dispatch(BibleAction.setIsShowNotes(is_shownotes)),
    ACT_setIsShowPericopes: (is_showpericopes) =>
      dispatch(BibleAction.setIsShowPericopes(is_showpericopes)),
    ACT_setIsShowHighlight: (is_showhighlight) =>
      dispatch(BibleAction.setIsShowHighlight(is_showhighlight)),
    ACT_setFontSize: (set_font_size) =>
      dispatch(BibleAction.setFontSize(set_font_size)),
    ACT_setBibleVersion: (set_bible_version) =>
      dispatch(BibleAction.setBibleVersion(set_bible_version)),
    ACT_setTempBibleVersion: (set_temp_bible_version) =>
      dispatch(BibleAction.setTempBibleVersion(set_temp_bible_version)),
    ACT_setLemma: (set_lemma) => dispatch(BibleAction.setLemma(set_lemma)),
    ACT_setStrongNumber: (set_strong_number) =>
      dispatch(BibleAction.setStrongNumber(set_strong_number)),
    ACT_setWordStrong: (set_word_strong) =>
      dispatch(BibleAction.setWordStrong(set_word_strong)),
    ACT_SetBibleParallel: (set_bible_parallel) =>
      dispatch(BibleAction.setBibleParallel(set_bible_parallel)),
    ACT_SetParallel: (set_parallel) =>
      dispatch(BibleAction.setParallel(set_parallel)),
    ACT_SetOriginalVersion: (set_original_version) =>
      dispatch(BibleAction.setOriginalVersion(set_original_version)),
    ACT_setSearchLimit: (set_search_limit) =>
      dispatch(BibleAction.setSearchLimit(set_search_limit)),
    ACT_SetDailyBibleStartDate: (set_daily_bible_start_date) =>
      dispatch(BibleAction.SetDailyBibleStartDate(set_daily_bible_start_date)),
    ACT_SetDailyBibleID: (set_daily_bible_id) =>
      dispatch(BibleAction.SetDailyBibleID(set_daily_bible_id)),
    ACT_SetActionNo: (set_action_no) =>
      dispatch(BibleAction.SetActionNo(set_action_no)),
    ACT_SetVrefChange: (set_vref_change) =>
      dispatch(BibleAction.SetVrefChange(set_vref_change)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Download);
