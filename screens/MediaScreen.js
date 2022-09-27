import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  Dimensions, Linking, Platform
} from "react-native";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
import * as COBible from "../common/COBible";
import * as DCT from "../dictionary";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import PopToTopScreen from "./Home/PopToTop";
import { List } from "react-native-paper";
import { Dropdown } from  "react-native-material-dropdown"
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { Audio, Video } from "expo-av";
const ICON_THROUGH_EARPIECE = "speaker-phone";
const ICON_THROUGH_SPEAKER = "speaker";

const ICON_PLAY_BUTTON = new Icon(
  require("../assets/images/play_button.png"),
  34,
  51
);
const ICON_PAUSE_BUTTON = new Icon(
  require("../assets/images/pause_button.png"),
  34,
  51
);
const ICON_STOP_BUTTON = new Icon(
  require("../assets/images/stop_button.png"),
  22,
  22
);
const ICON_FORWARD_BUTTON = new Icon(
  require("../assets/images/forward_button.png"),
  33,
  25
);
const ICON_BACK_BUTTON = new Icon(
  require("../assets/images/back_button.png"),
  33,
  25
);

const ICON_LOOP_ALL_BUTTON = new Icon(
  require("../assets/images/loop_all_button.png"),
  77,
  35
);
const ICON_LOOP_ONE_BUTTON = new Icon(
  require("../assets/images/loop_one_button.png"),
  77,
  35
);

const ICON_MUTED_BUTTON = new Icon(
  require("../assets/images/muted_button.png"),
  67,
  58
);
const ICON_UNMUTED_BUTTON = new Icon(
  require("../assets/images/unmuted_button.png"),
  67,
  58
);

const ICON_TRACK_1 = new Icon(require("../assets/images/track_1.png"), 166, 5);
const ICON_THUMB_1 = new Icon(require("../assets/images/thumb_1.png"), 18, 19);
const ICON_THUMB_2 = new Icon(require("../assets/images/thumb_2.png"), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const BACKGROUND_COLOR = "#FFFFFF";
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "...buffering...";
const RATE_SCALE = 3.0;
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 - FONT_SIZE * 2;
class MediaScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: " ",
      headerTitle: (<View style={{ flexDirection: "row" }}><Text style={{ fontSize: 16, fontFamily: "NotoSans-Bold", color: params.titlecolor }}>{navigation.getParam("title", "")}</Text></View>),
      headerStyle: {
        backgroundColor: params.backgroundcolor,
      },
      headerTransparent: true,
      headerBackTitle: "",
      headerTintColor: params.titlecolor
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isshowoptions: false,
      mediatype: "",
      contenttype: "",
      serverData: [],
      fetching_from_server: false,
      audios: [],
      suggestions: [],
      title: "",
      author: "",
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false
    };
    this.playbackInstance = null;
    this.timer = -1;
    this.page = 0;
    this.skip = 0;
    this.datacontenttype = [
      {
        value: "All",
      },
      {
        value: "Sermon Exposition",
      },
    ];
    this.datamediatype = [
      {
        value: "All",
      },
      {
        value: "Audio",
      },
      {
        value: "Youtube",
      },
      {
        value: "WebLink",
      },
    ];
    this.contenttype = "All";
    this.mediatype = "All";
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.book_id = this.props.navigation.getParam("book_id", "");
    this.chapter_no = this.props.navigation.getParam("chapter_no", "");
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 2;
    this.list_vid = "";
    console.log(this.book_id);
    console.log(this.chapter_no);
    this.start_i = COBible.getChapterVerse(
      COBible.getBookChapter(parseInt(this.book_id, 10)).start +
      parseInt(this.chapter_no, 10)
    ).start;
    this.end_i =
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.book_id, 10)).start +
        parseInt(this.chapter_no, 10)
      ).start +
      COBible.getChapterVerse(
        COBible.getBookChapter(parseInt(this.book_id, 10)).start +
        parseInt(this.chapter_no, 10)
      ).end;

    for (let i = this.start_i + 1; i <= this.end_i; i++) {
      this.list_vid = this.list_vid + "," + i.toString();
    }
    this.list_vid = this.list_vid.substr(1);
    this.language = this.props.STORE_BIBLE.LANG_CODE;
    this.handleChangeTab(DCT.getValue("menu_media", this.language));
    this.props.navigation.setParams({
      titlecolor: this.props.STORE_STYLE.TEXT_COLOR,
      backgroundcolor: this.props.STORE_STYLE.BACKGROUND_COLOR
    });
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    this.GoCallAPI();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };
  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {

      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }


    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };
    const source = { uri: this.url };

    const { sound } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;


    this._updateScreenForLoading(false);
  }
  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT
    });

    this._loadNewPlaybackInstance(playing);
  }
  _onPlaybackStatusUpdate = status => {

    this.status = status.isLoaded;
  }

  playAudio() {
    const { push } = this.props.navigation;
    if (this.status) {
      push("DetailAudio", {
        title: this.title,
        description: this.description,
        url: this.url,
        thumb: this.thumb,
        author: this.author,
        source: this.source,
        language: this.language,
        key: "Detail Audio" + Math.random,
      });
      console.log("audio")
    }
    else {
      push("DetailYoutube", {
        title: this.title,
        description: this.description,
        url: this.url,
        thumb: this.thumb,
        author: this.author,
        source: this.source,
        language: this.language,
        key: "Detail Audio" + Math.random,
      });
      console.log("page")
    }

  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={[styles.containerActivityIndicator, styles.horizontal,styles.header, {backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.contentContainer} style={[styles.header,{ backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,}]}>
          <List.Section>
            <List.Accordion
              title="Show Options"
              titleStyle={{
                fontFamily: "NotoSans-Bold",
                fontSize: 16,
                color:this.props.STORE_STYLE.TEXT_COLOR_URL,
              }}
              expanded={this.state.isshowoptions}
              onPress={() =>
                this.setState({ isshowoptions: !this.state.isshowoptions })
              }
              style={{
                backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR2,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderLeftWidth: 1,
                borderLeftColor: this.props.STORE_STYLE.BORDER_COLOR,
                borderRightWidth: 1,
                borderRightColor: this.props.STORE_STYLE.BORDER_COLOR,
              }}
              left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
            >

                <View
                  style={{
                    flexDirection: "column",
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR,
                    paddingTop:20
                  }}
                >
                  <Text style={{ fontFamily: "NotoSans-Bold",     color:this.props.STORE_STYLE.TEXT_COLOR  }}>
                    {"Content Type"}
                  </Text>
                  <Dropdown
                    label="Select content type"
                    data={this.datacontenttype}
                    onChangeText={(contenttype) => {
                      if (contenttype === "Sermon Exposition") {
                        this.setState({ contenttype: "sermon_exposition" });
                        this.contenttype = "Sermon Exposition";
                      } else {
                        this.setState({ contenttype: "" });
                        this.contenttype = "All";
                      }
                    }}
                    textColor= {this.props.STORE_STYLE.TEXT_COLOR}
                    selectedItemColor={this.props.STORE_STYLE.TEXT_COLOR_URL}
                    disabledItemColor= {this.props.STORE_STYLE.TEXT_COLOR}
                    baseColor={this.props.STORE_STYLE.TEXT_COLOR_URL}
             
                    
                    value={this.contenttype}
                  />
                  <View style={{height:15}}></View>
                  <Text style={{ fontFamily: "NotoSans-Bold",   color:this.props.STORE_STYLE.TEXT_COLOR }}>
                    {"Media Type"}
                  </Text>
                  <Dropdown
                    label="Select media type"
                    data={this.datamediatype}
                    onChangeText={(mediatype) => {
                      if (mediatype === "Audio") {
                        this.setState({ mediatype: "audio" });
                        this.mediatype = "Audio";
                      } else if (mediatype === "Youtube") {
                        this.setState({ mediatype: "youtube" });
                        this.mediatype = "Youtube";
                      } else if (mediatype === "WebLink") {
                        this.setState({ mediatype: "web_page" });
                        this.mediatype = "WebLink";
                      } else {
                        this.setState({ mediatype: "" });
                        this.mediatype = "All";
                      }
                    }}
                    textColor= {this.props.STORE_STYLE.TEXT_COLOR}
                    selectedItemColor={this.props.STORE_STYLE.TEXT_COLOR_URL}
                    disabledItemColor= {this.props.STORE_STYLE.TEXT_COLOR}
                    baseColor={this.props.STORE_STYLE.TEXT_COLOR_URL}
                    value={this.mediatype}
                    
                       />
                           <View style={{height:15}}></View>
                  <Text style={{ fontFamily: "NotoSans-Bold",    color:this.props.STORE_STYLE.TEXT_COLOR }}>
                    {"Author"}
                  </Text>
                  <Input
                    placeholder=""
                    RightIcon={<Icon name="user" size={24} color="black" />}
                    onChangeText={(author) => this.setState({ author })}
                    value={this.state.author}
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR, paddingBottom: 10, }}
    
                   inputStyle={{color:this.props.STORE_STYLE.TEXT_COLOR}}
                  />
                  <Text style={{ paddingTop: 10, fontFamily: "NotoSans-Bold",    color:this.props.STORE_STYLE.TEXT_COLOR }}>
                    {"Title"}
                  </Text>
                  <Input
                    placeholder=""
                    RightIcon={<Icon name="user" size={24} color="black" />}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                    style={{ color: this.props.STORE_STYLE.TEXT_COLOR, paddingBottom: 10, }}
           
                    inputStyle={{color:this.props.STORE_STYLE.TEXT_COLOR}}
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      marginBottom: 15,
                      marginTop: 15,
                      paddingBottom: 5,
                    }}
                  >
                    <TouchableOpacity style={{}} onPress={() => this.Filter()}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginRight: 15,
                          marginLeft: 15,
                          alignItems: "center",
                          justifyContent: "center",

                          borderWidth: 1,
                          borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                          borderRadius: 5,
                          backgroundColor: "#3B93DB",
                          flex: 1,

                          paddingTop: 20,
                          paddingBottom: 20,
                        }}
                      >
                        <View
                          style={{
                            flex: 6,
                            paddingLeft: 10,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 16,
                              color: "#FFFFFF",
                            }}
                            onPress={() => {
                              this.Filter();
                            }}
                          >
                            {DCT.getValue("filter", this.language)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              
            </List.Accordion>
          </List.Section>
          {this.audio > 0 && (
            <List.Section>
              <List.Accordion
                title="All Media"
                titleStyle={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: 16,
                  color: this.props.STORE_STYLE.TEXT_COLOR_URL
                }}
                expanded={true}
                style={{
                  backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR2,
                  borderBottomWidth: 1,
                  borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                }}
                left={props => <List.Icon color={this.props.STORE_STYLE.TEXT_COLOR} icon="folder" />}
              >
                <FlatList
                  style={{ width: "100%" }}
                  keyExtractor={(item, index) => index.toString()}
                  data={this.state.serverData}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                        backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR,
                        borderBottomWidth:1,
                        borderColor: this.props.STORE_STYLE.BORDER_COLOR,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          paddingTop: 7,
                          paddingRight: 7,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            this.DetailAudio(
                              item.title,
                              item.description,
                              item.url,
                              item.thumbnail_url,
                              item.author,
                              item.source,
                              this.language
                            );
                          }}
                          style={styles.containerBottomItem}
                        >
                          {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
                          <Image
                            style={{
                              width: 25,
                              height: 25,
                              paddingLeft: 15,
                              paddingTop: 15,
                              paddingRight: 5,
                            }}
                            source={require("../assets/images/audio.png")}
                          />
                          )}
                                                    {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
                          <Image
                            style={{
                              width: 25,
                              height: 25,
                              paddingLeft: 15,
                              paddingTop: 15,
                              paddingRight: 5,
                            }}
                            source={require("../assets/images/audio_darkmode.png")}
                          />
                          )}
                          <View
                            style={{
                              flexDirection: "column",
                              flexWrap: "nowrap",backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR
                            }}
                          >
                            <Text
                              style={{
                                paddingLeft: 15,
                                fontFamily: "NotoSans-Bold",
                                paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                              }}
                            >
                              {item.title}
                            </Text>
                            {item.description.length > 200 && (
                              <Text
                                style={{
                                  fontSize: this.fsizeminusone,
                                  paddingLeft: 15,
                                  paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                                }}
                              >
                                {item.description.substring(0, 200) + " ... "}
                              </Text>
                            )}
                            {item.description.length < 200 && (
                              <Text
                                style={{
                                  fontSize: this.fsizeminusone,
                                  paddingLeft: 15,
                                  paddingRight: 15, color: this.props.STORE_STYLE.TEXT_COLOR
                                }}
                              >
                                {item.description}
                              </Text>
                            )}
                            <Text
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,
                                color: this.props.STORE_STYLE.TEXT_COLOR_URL,
                                textTransform: "capitalize",
                              }}
                            >
                              {item.author}
                              <Text
                                style={{
                                  color: this.props.STORE_STYLE.TEXT_COLOR,
                                  textTransform: "capitalize",
                                }}
                              >
                                {" in "}
                              </Text>
                              {item.content_type
                                .replace("_", " ")
                                .replace("exposition", "Exposition")}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  ListFooterComponent={this.renderFooter.bind(this)}
                />
              </List.Accordion>
            </List.Section>
          )}
          {this.audio == 0 && (
            <Text style={{ paddingTop: 10, paddingLeft: 15 }}>{DCT.getValue("00000002", this.language)}</Text>
          )}
                   <View style={{height:60,backgroundColor:this.props.STORE_STYLE.BACKGROUND_COLOR }}></View>
        </ScrollView>
      );
    }
  }
  handleChangeTab = (title) => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title,
    });
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
  loadMoreData = () => {
    this.page = 25;
    this.skip = this.skip + this.page;
    this.setState({ fetching_from_server: true }, () => {
      clearTimeout(this.timer);
      this.timer = -1;
      this.timer = setTimeout(() => {
        let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
        var urlAudio =
          "https://sabdapro.com:3002/app/app_audio_video?lang_code=" +
          this.language +
          "&limit=" +
          this.page +
          "&skip=" +
          this.skip +
          "&media_type=" +
          this.state.mediatype +
          "&content_type=" +
          this.state.contenttype +
          "&author=" +
          this.state.author +
          "&title=" +
          this.state.title +
          "&list_vid=" +
          this.list_vid;
        console.log(urlAudio);
        fetch(urlAudio)
          .then((response) => response.json())
          .then((responseJson) => {
            this.list_av = JSON.stringify(
              JSON.parse(JSON.stringify(responseJson)).data.list_av
            );
            let list_av = JSON.parse(this.list_av);

            this.setState({
              serverData: [...this.state.serverData, ...list_av],
              fetching_from_server: false,
            });
          });
      }, 1500);
    });
  };
  Filter() {
    this.setState({ isshowoptions: false, serverData: [] });
    this.GoCallAPI();
  }
  GoCallAPI() {
    this.page = 25;
    let ver_code = this.props.STORE_BIBLE.BIBLE_VERSION.toLowerCase();
    var urlAudio =
      "https://sabdapro.com:3002/app/app_audio_video?lang_code=" +
      this.language +
      "&limit=" +
      this.page +
      "&skip=0&media_type=" +
      this.state.mediatype +
      "&content_type=" +
      this.state.contenttype +
      "&author=" +
      this.state.author +
      "&title=" +
      this.state.title +
      "&list_vid=" +
      this.list_vid;
    console.log(urlAudio);
    fetch(urlAudio)
      .then((response) => response.json())
      .then((responseJson) => {
        this.list_av = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_av
        );
        let list_av = JSON.parse(this.list_av);
        this.audio = list_av.length;

        this.setState({
          serverData: [...this.state.serverData, ...list_av],

          isLoading: true,
        });
      });
  }

  DetailAudio(title, description, url, thumb, author, source, language) {
    const { push } = this.props.navigation;
    if (url.includes(".mp3")&&url.includes("download"))
    {

      Linking.openURL(url);
    }
    else if (url.includes(".mp3") && description.includes("Audio/MP3")) {
      push("DetailAudio", {
        title: title,
        description: description,
        url: url,
        thumb: thumb,
        author: author,
        source: source,
        language: language,
        key: "Detail Audio" + Math.random,
      });
    }
    else if (url.includes(".mp3")) {
      this.url = url;
      this.title = title;
      this.description = description;
      this.thumb = thumb;
      this.author = author;
      this.source = source;
      this.language = language;


      this._loadNewPlaybackInstance(false)

      setTimeout(() => {
        this.playAudio();
      }, 1500);

    } else if (url.includes("youtube")) {
      push("DetailYoutube", {
        title: title,
        description: description,
        url: url,
        thumb: thumb,
        author: author,
        source: source,
        language: language,
        key: "Detail Audio" + Math.random,
      });
    } else {
      push("DetailYoutube", {
        title: title,
        description: description,
        url: url,
        thumb: thumb,
        author: author,
        source: source,
        language: language,
        key: "Detail Audio" + Math.random,
      });
      //Linking.openURL(url);
    }
  }
  OpenSearchEntity(entity_id, entity_mention, language) {
    const { push } = this.props.navigation;
    push("Entity", {
      entity_id: entity_id,
      entity_mention: entity_mention,
      language: language,
      key: "Entity " + Math.random,
    });
  }
}
const styles = StyleSheet.create({
  header : {
    paddingTop: Platform.OS === 'ios' ? 70 : headerHeight
  },
  container: {
    flex: 1,

    paddingBottom: 50,
    paddingLeft: 25,
    paddingRight: 25,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    flex: 4,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    textAlign: "justify",
    color: "white",
    flex: 1,
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
  containerBottom: {
    flex: 9,
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  containerBottomItem: {
    flex: 9,
    padding: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
  },
  item: {
    padding: 10,
  },
  separator: {
    height: 1,
   
  },
  text: {
    fontSize: 20,
    color: "#353535",
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
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
    ACT_setCacheData: (key, listdata) =>
      dispatch(BibleAction.setCacheData(key, listdata)),
    ACT_setLangChange: (lang_code) =>
      dispatch(BibleAction.setLangChange(lang_code)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MediaScreen);
