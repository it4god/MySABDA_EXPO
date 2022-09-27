import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions,
  Image,
  Slider,
  TouchableHighlight
} from "react-native";
import { Asset } from "expo-asset";
import { connect } from "react-redux";
import * as BibleAction from "../actions/BibleAction";
import { Audio, Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import PopToTopScreen from "./Home/PopToTop";
import * as Font from "expo-font";
import { Header } from 'react-navigation-stack';
const headerHeight = Header.HEIGHT *1.6;
class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}



const ICON_THROUGH_EARPIECE = "speaker-phone";
const ICON_THROUGH_SPEAKER = "speaker";

const ICON_PLAY_BUTTON = new Icon(
  require("../assets/images/play.png"),
  34,
  51
);
const ICON_PAUSE_BUTTON = new Icon(
  require("../assets/images/pause.png"),
  34,
  51
);
const ICON_STOP_BUTTON = new Icon(
  require("../assets/images/stop.png"),
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

const ICON_PLAY_DARKMODE_BUTTON = new Icon(
  require("../assets/images/play_darkmode.png"),
  34,
  51
);
const ICON_PAUSE_DARKMODE_BUTTON = new Icon(
  require("../assets/images/pause_darkmode.png"),
  34,
  51
);
const ICON_STOP_DARKMODE_BUTTON = new Icon(
  require("../assets/images/stop_darkmode.png"),
  22,
  22
);
const ICON_FORWARD_DARKMODE_BUTTON = new Icon(
  require("../assets/images/forward_button_darkmode.png"),
  33,
  25
);
const ICON_BACK_DARKMODE_BUTTON = new Icon(
  require("../assets/images/back_button_darkmode.png"),
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
  require("../assets/images/audio.png"),
  67,
  58
);
const ICON_MUTED_DARKMODE_BUTTON = new Icon(
  require("../assets/images/audio_darkmode.png"),
  67,
  58
);
const ICON_UNMUTED_BUTTON = new Icon(
  require("../assets/images/audio.png"),
  67,
  58
);
const ICON_UNMUTED_DARKMODE_BUTTON = new Icon(
  require("../assets/images/audio_darkmode.png"),
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

class DetailAudio extends Component {
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
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
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
  }

  componentDidMount = () => {
    this.title = this.props.navigation.getParam("title", "");
    this.desc = this.props.navigation.getParam("description", "");
    this.url = this.props.navigation.getParam("url", "");
    this.author = this.props.navigation.getParam("author", "");
    this.source = this.props.navigation.getParam("source", "");
    if (this.url.includes("mp3")) this.video = false;
    else this.video = true;
    this.PLAYLIST = [
      new PlaylistItem(
        this.title,
        this.url,
        this.video
      ),
    ];
    this.fsizeminusone = Number(this.props.STORE_BIBLE.FONT_SIZE) - 2;
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
    (async () => {
      await Font.loadAsync({
        ...MaterialIcons.font,
        "cutive-mono-regular": require("../assets/fonts/CutiveMono-Regular.ttf")
      });
      this.setState({ fontLoaded: true });
    })();
  };
  async componentWillUnmount() {
    await this.playbackInstance.unloadAsync();
    this.playbackInstance = null;

  }
  handleChangeTab = title => {
    /* Your tab switching logic goes here */

    this.props.navigation.setParams({
      title: title
    });
  };
  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    const source = { uri: this.PLAYLIST[this.index].uri };
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

    if (this.PLAYLIST[this.index].isVideo) {
      console.log(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate
      );
      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstancePosition: null,
        isLoading: true
      });
    } else {
      this.setState({
        playbackInstanceName: this.PLAYLIST[this.index].name,
        showVideo: this.PLAYLIST[this.index].isVideo,
        isLoading: false
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping ? LOOPING_TYPE_ONE : LOOPING_TYPE_ALL,
        shouldCorrectPitch: status.shouldCorrectPitch
      });
      if (status.didJustFinish && !status.isLooping) {
        this._advanceIndex(true);
        this._updatePlaybackInstanceForIndex(true);
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    const widestHeight =
      (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth:
          (VIDEO_CONTAINER_HEIGHT * event.naturalSize.width) /
          event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight:
          (DEVICE_WIDTH * event.naturalSize.height) / event.naturalSize.width
      });
    }
  };

  _onFullscreenUpdate = event => {
    console.log(
      `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
    );
  };

  _advanceIndex(forward) {
    this.index =
      (this.index + (forward ? 1 : this.PLAYLIST.length - 1)) % this.PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(
        this.state.loopingType !== LOOPING_TYPE_ONE
      );
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      );
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return "";
  }

  _onPosterPressed = () => {
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  _onSpeakerPressed = () => {
    this.setState(
      state => {
        return { throughEarpiece: !state.throughEarpiece };
      },
      ({ throughEarpiece }) =>
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: throughEarpiece
        })
    );
  };

  render() {
    return !this.state.fontLoaded ? (
      <View style={[styles.emptyContainer, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]} />
    ) : (
        <View style={[styles.container, styles.header, { backgroundColor: this.props.STORE_STYLE.BACKGROUND_COLOR }]}>
          <View />
          <View style={styles.nameContainer}>
            <Text style={{ fontFamily: "NotoSans-Bold", color: this.props.STORE_STYLE.TEXT_COLOR, fontSize: Number(this.props.STORE_BIBLE.FONT_SIZE) + 2 }}>
              {this.state.playbackInstanceName}
            </Text>
            <Text style={{ fontSize: this.fsizeminusone, color: this.props.STORE_STYLE.TEXT_COLOR, }}>
              {this.desc}
            </Text>
            <Text>
              {this.author}
            </Text>
            <Text style={{ color: this.props.STORE_STYLE.TEXT_COLOR, }}>
              {"Source : "}{this.source}
            </Text>
          </View>
          <View style={styles.space} />
          <View style={styles.videoContainer}>
            <Video
              ref={this._mountVideo}
              style={[
                styles.video,
                {
                  opacity: this.state.showVideo ? 1.0 : 0.0,
                  width: this.state.videoWidth,
                  height: this.state.videoHeight
                }
              ]}
              resizeMode={Video.RESIZE_MODE_CONTAIN}
              onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
              onLoadStart={this._onLoadStart}
              onLoad={this._onLoad}
              onError={this._onError}
              onFullscreenUpdate={this._onFullscreenUpdate}
              onReadyForDisplay={this._onReadyForDisplay}
              useNativeControls={this.state.useNativeControls}
            />
          </View>
          <View
            style={[
              styles.playbackContainer,
              {
                opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
              }
            ]}
          >
            <Slider
              style={styles.playbackSlider}
              value={this._getSeekSliderPosition()}
              onValueChange={this._onSeekSliderValueChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              disabled={this.state.isLoading}
            />
            <View style={styles.timestampRow}>
              <Text
                style={[
                  styles.text,
                  styles.buffering,
                  { fontFamily: "cutive-mono-regular", color: this.props.STORE_STYLE.TEXT_COLOR }
                ]}
              >
                {this.state.isBuffering ? BUFFERING_STRING : ""}
              </Text>
              <Text
                style={[
                  styles.text,
                  styles.timestamp,
                  { fontFamily: "cutive-mono-regular", color: this.props.STORE_STYLE.TEXT_COLOR }
                ]}
              >
                {this._getTimestamp()}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.buttonsContainerBase,
              styles.buttonsContainerTopRow,
              {
                opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0
              }
            ]}
          >
            {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onBackPressed}
                disabled={this.state.isLoading}
              >
                <Image style={styles.button2} source={ICON_BACK_BUTTON.module} />
              </TouchableHighlight>
            )}
            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onBackPressed}
                disabled={this.state.isLoading}
              >
                <Image style={styles.button2} source={ICON_BACK_DARKMODE_BUTTON.module} />
              </TouchableHighlight>
            )}
            {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onPlayPausePressed}
                disabled={this.state.isLoading}
              >
                <Image
                  style={styles.button2}
                  source={
                    this.state.isPlaying
                      ? ICON_PAUSE_BUTTON.module
                      : ICON_PLAY_BUTTON.module
                  }
                />
              </TouchableHighlight>)}
            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onPlayPausePressed}
                disabled={this.state.isLoading}
              >
                <Image
                  style={styles.button2}
                  source={
                    this.state.isPlaying
                      ? ICON_PAUSE_DARKMODE_BUTTON.module
                      : ICON_PLAY_DARKMODE_BUTTON.module
                  }
                />
              </TouchableHighlight>)}
            {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onStopPressed}
                disabled={this.state.isLoading}
              >
                <Image style={styles.button2} source={ICON_STOP_BUTTON.module} />
              </TouchableHighlight>
            )}
            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onStopPressed}
                disabled={this.state.isLoading}
              >
                <Image style={styles.button2} source={ICON_STOP_DARKMODE_BUTTON.module} />
              </TouchableHighlight>
            )}
            {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onForwardPressed}
                disabled={this.state.isLoading}
              >
                <Image style={styles.button2} source={ICON_FORWARD_BUTTON.module} />
              </TouchableHighlight>
            )}
            {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
              <TouchableHighlight
                underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onForwardPressed}
                disabled={this.state.isLoading}
              >
                <Image style={styles.button2} source={ICON_FORWARD_DARKMODE_BUTTON.module} />
              </TouchableHighlight>
            )}
          </View>
          <View
            style={[
              styles.buttonsContainerBase,
              styles.buttonsContainerMiddleRow
            ]}
          >
            <View style={styles.volumeContainer}>
              {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <TouchableHighlight
                  underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                  style={[styles.wrapper,{paddingLeft:20}]}
                >
                  <Image
                    style={styles.button}
                    source={
                      this.state.muted
                        ? ICON_MUTED_BUTTON.module
                        : ICON_UNMUTED_BUTTON.module
                    }
                  />
                </TouchableHighlight>
              )}
              {this.props.STORE_BIBLE.IS_SHOW_DARKMODE && (
                <TouchableHighlight
                  underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                  style={[styles.wrapper,{paddingLeft:20}]}
                >
                  <Image
                    style={styles.button}
                    source={
                      this.state.muted
                        ? ICON_MUTED_DARKMODE_BUTTON.module
                        : ICON_UNMUTED_DARKMODE_BUTTON.module
                    }
                  />
                </TouchableHighlight>
              )}
              <Slider
                style={styles.volumeSlider}
                value={1}
                onValueChange={this._onVolumeSliderValueChange}
              />
            </View>
          </View>
          <View
            style={[
              styles.buttonsContainerBase,
              styles.buttonsContainerBottomRow
            ]}
          >
            <TouchableHighlight
              underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={() => this._trySetRate(1.0, this.state.shouldCorrectPitch)}
            >
              <View>
                <Text
                  style={[styles.text, { fontFamily: "cutive-mono-regular", color: this.props.STORE_STYLE.TEXT_COLOR }]}
                >
                  Rate:
              </Text>
              </View>
            </TouchableHighlight>
            <Slider
              style={styles.rateSlider}
              value={this.state.rate / RATE_SCALE}
              onSlidingComplete={this._onRateSliderSlidingComplete}
            />


          </View>
          <View />
          {this.state.showVideo ? (
            <View>
              <View
                style={[
                  styles.buttonsContainerBase,
                  styles.buttonsContainerTextRow
                ]}
              >
                <View />
                <TouchableHighlight
                  underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onPosterPressed}
                >
                  <View style={styles.button}>
                    <Text
                      style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
                    >
                      Poster: {this.state.poster ? "yes" : "no"}
                    </Text>
                  </View>
                </TouchableHighlight>
                <View />
                <TouchableHighlight
                  underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onFullscreenPressed}
                >
                  <View style={styles.button}>
                    <Text
                      style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
                    >
                      Fullscreen
                  </Text>
                  </View>
                </TouchableHighlight>
                <View />
              </View>
              <View style={styles.space} />
              <View
                style={[
                  styles.buttonsContainerBase,
                  styles.buttonsContainerTextRow
                ]}
              >
                <View />
                <TouchableHighlight
                  underlayColor={this.props.STORE_STYLE.BACKGROUND_COLOR}
                  style={styles.wrapper}
                  onPress={this._onUseNativeControlsPressed}
                >
                  <View style={styles.button}>
                    <Text
                      style={[styles.text, { fontFamily: "cutive-mono-regular" }]}
                    >
                      Native Controls:{" "}
                      {this.state.useNativeControls ? "yes" : "no"}
                    </Text>
                  </View>
                </TouchableHighlight>
                <View />
              </View>
            </View>
          ) : null}
        </View>
      );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 80 : 95
  },
  emptyContainer: {
    alignSelf: "stretch",

  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",

  },
  wrapper: {},
  nameContainer: {
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 10
  },
  space: {
    height: FONT_SIZE
  },
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT
  },
  video: {
    maxWidth: DEVICE_WIDTH
  },
  playbackContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0
  },
  playbackSlider: {
    alignSelf: "stretch"
  },
  timestampRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    minHeight: FONT_SIZE
  },
  text: {
    fontSize: FONT_SIZE,
    minHeight: FONT_SIZE
  },
  buffering: {
    textAlign: "left",
    paddingLeft: 20
  },
  timestamp: {
    textAlign: "right",
    paddingRight: 20
  },
  button: {

    width: 25,
    height: 25

  },
  button2: {

    width: 25,
    height: 25
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0
  },
  buttonsContainerMiddleRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: "stretch",
    paddingRight: 20
  },
  volumeContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0
  },
  volumeSlider: {
    width: DEVICE_WIDTH - ICON_MUTED_BUTTON.width - 30
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: "stretch",
    paddingRight: 20,
    paddingLeft: 20
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0
  },
  buttonsContainerTextRow: {
    maxHeight: FONT_SIZE,
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH,
    maxWidth: DEVICE_WIDTH
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailAudio);
