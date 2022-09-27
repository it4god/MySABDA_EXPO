import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class BibleVersion extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: " ",
    headerTitle: <Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", }}>{navigation.getParam("title", "")}</Text>,
    headerStyle: {
      backgroundColor: "#FFFFFF"
    },
    headerTransparent: true,
    headerBackTitle: "",
    headerTintColor: "#353535"
  });
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      wa: "",
      feedback: ""
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("feedback", this.language));
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
      <ScrollView style={[styles.horizontal,styles.header,{ backgroundColor: "#F4F5F8", }]}>
        <View style={styles.container}>
          <Text>{DCT.getValue("00000021", this.language)}</Text>
        </View>
        <Input
          style={{ paddingLeft: 20 }}
          label="Your Full Name"
          placeholder="Full Name"
          leftIcon={<Icon name="user" size={24} color="black" />}
          leftIconContainerStyle={{ paddingRight: 20 }}
          onChangeText={fullname => this.setState({ fullname })}
          value={this.state.fullname}
        />
        <Input
          style={{ paddingLeft: 20 }}
          label="Your Email Address"
          placeholder="Email Address"
          leftIcon={<Icon name="envelope" size={24} color="black" />}
          leftIconContainerStyle={{ paddingRight: 20 }}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          style={{ paddingLeft: 20 }}
          label="Your WhatsApp Number"
          placeholder="WhatsApp Number ( optional )"
          leftIcon={<Icon name="whatsapp" size={24} color="black" />}
          leftIconContainerStyle={{ paddingRight: 20 }}
          onChangeText={wa => this.setState({ wa })}
          value={this.state.wa}
        />
        <Input
          style={{ paddingLeft: 20 }}
          label="Your Feedback"
          placeholder="Feedback"
          multiline={true}
          leftIcon={<Icon name="paper-plane" size={24} color="black" />}
          leftIconContainerStyle={{ paddingRight: 20 }}
          onChangeText={feedback => this.setState({ feedback })}
          value={this.state.feedback}
          onSubmitEditing={() => { this.SendFeedback() }}
        />
        <TouchableOpacity onPress={() => this.SendFeedback()}>
          <View
            style={{
              flexDirection: "row",
              marginRight: 15,
              marginLeft: 15,
              alignItems: "center",
              justifyContent: "center",

              borderWidth: 1,
              borderColor: "3D3D3D",
              borderRadius: 5,
              backgroundColor: "#3B93DB",
              flex: 1,
              marginBottom: 15,
              marginTop: 15,
              paddingTop: 10,
              paddingBottom: 10
            }}
          >

            <View
              style={{
                flexDirection: "row-reverse",
                flex: 4
              }}
            ></View>
            <View
              style={{
                flex: 6,
                paddingLeft: 20,
                paddingTop: 10,
                paddingBottom: 10
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#FFFFFF"
                }}
                onPress={() => {
                  this.SendFeedback();
                }}
              >
                {DCT.getValue("send", this.language)}
              </Text>
            </View>

          </View>
        </TouchableOpacity>
        <View style={{ height: 600 }}></View>
      </ScrollView>
    );
  }
  SendFeedback() {
    if (this.state.fullname != "") {
      //Check for the Name TextInput
      if (this.state.email != "") {
        if (this.state.feedback != "") {
          fetch(
            "https://mysabda.vocationfirst.net/crud/InsertFeedbackData.php",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                fullname: this.state.fullname,
                email: this.state.email,
                wa: this.state.wa,
                feedback: this.state.feedback
              })
            }
          )
            .then(response => response.json())
            .then(responseJson => {
              // Showing response message coming from server after inserting records.
              Alert.alert(responseJson);
              this.props.navigation.navigate('Home');
            })
            .catch(error => {
              Alert.alert(error);
            });
        } else {
          Alert.alert("Please Enter Feedback");
        }
      } else {
        Alert.alert("Please Enter Email");
      }
    } else {
      Alert.alert("Please Enter Full Name");
    }
  }
}

const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F5F8",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15
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
    STORE_BIBLE: state.bible
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
export default connect(mapStateToProps, mapDispatchToProps)(BibleVersion);
