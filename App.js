import React from "react";
import AppRoute from "./AppRoute";
import { AsyncStorage, View } from "react-native";
import { Provider } from "react-redux";
import { DefaultTheme as theTheme, Provider as PaperProvider } from "react-native-paper";
import store from "./store";
import { setCustomText } from "react-native-global-props";
import * as SQLite from 'expo-sqlite';
import * as Font from "expo-font";
const theme = {
  ...theTheme,
  roundness: 2,
  colors: {
    ...theTheme.colors,
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      isloading: false,
    };
    this.fontsize = 0;
    this._retrieveData();
    this.makeSQLiteDirAsync();
  
  }
  _retrieveData = async () => {
    try {
      let fontsize = await AsyncStorage.getItem('fontsize');
      if (fontsize !== null) {
        this.fontsize = Number(fontsize);
      }
      else {
        this.fontsize = 16;

      }
      await Font.loadAsync({
        "NotoSans-Regular": require("./assets/fonts/NotoSans-Regular.ttf"),
        "NotoSans-Bold": require("./assets/fonts/NotoSans-Bold.ttf"),
        "NotoSans-Italic": require("./assets/fonts/NotoSans-Italic.ttf"),
        "NotoSans-BoldItalic": require("./assets/fonts/NotoSans-BoldItalic.ttf"),
      });
      this.setState({ fontLoaded: true });
      this.defaultFonts();
      this.setState({ isloading: true });


    } catch (error) {
      // Error retrieving data
    }
  }
  async makeSQLiteDirAsync() {

    let db = SQLite.openDatabase('dummy.db');
    try {
      await db.transaction(tx => tx.executeSql(''));
      console.log("success")
    } catch (e) {
      console.log(e);
    }

  }

  defaultFonts() {
    const customTextProps = {
      style: { fontSize: this.fontsize, fontFamily: "NotoSans-Regular" }
    };
    setCustomText(customTextProps);
  }

  render() {
    if (this.state.fontLoaded === true && this.state.isloading == true) {
      return (
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <AppRoute />
          </PaperProvider>
        </Provider>
      );
    } else {
      return <View></View>;
    }
  }
}
