//"use strict"
import React, { Component } from "react";
import { TouchableHighlight, View, Text } from "react-native";
import * as COMethods from "./COMethods";
import { ThemeConsumer } from "react-native-elements";

export default class OriginalLanguage extends Component {
  constructor(props) {
    super(props);
    this.THIS_PARENT = props;
    this.state = {
      textoriginal : ""
    };
  }
  componentDidMount = () => {

    this._isMounted = true;

  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  GetOriginalLanguageText(lang_code, ver_code, book_lang_code, list_vid) {
    urloriginallanguage =
      "https://sabdapro.com:3002/App/app_orilang_token?limit=100&skip=0&ver_code=" +
      ver_code +
      "&lang_code=" +
      lang_code +
      "&book_lang_code=" +
      book_lang_code +
      "&type_search=L&list_vid=" +
      list_vid;

    fetch(urloriginallanguage)
      .then(response => response.json())
      .then(responseJson => {
        this.listtoken = JSON.stringify(
          JSON.parse(JSON.stringify(responseJson)).data.list_token
        );
        let listtoken = JSON.parse(this.listtoken);
        this.verse_line = "";
        let bcv = "";
        let oldbcv = "";
        this.textori = [];

        for (let i = 0; i < listtoken.length; i++) {
          oldbcv =
            listtoken[i].book_abbr +
            " " +
            listtoken[i].chapter +
            " " +
            listtoken[i].verse_id;

            
          if (oldbcv !== bcv) {
            bcv =
              listtoken[i].book_abbr +
              " " +
              listtoken[i].chapter +
              " " +
              listtoken[i].verse_id;

            this.textori.push(
              <View key={"token " + i} style={{ flexDirection: "column" }}>
                <Text>{bcv}</Text>
                <Text>{listtoken[i].token}</Text>
                <Text>{listtoken[i].translit_ascii}</Text>
                <Text>{listtoken[i].strong}</Text>
              </View>
            );
          } else {
            this.textori.push(
              <View key={"token " + i} style={{ flexDirection: "column" }}>
                <Text></Text>
                <Text>{listtoken[i].token}</Text>
                <Text>{listtoken[i].translit_ascii}</Text>
                <Text>{listtoken[i].strong}</Text>
              </View>
            );
          }
        }

        this.textori2 = [];
        this.textori2.push(
          <View key={"text original"}
            style={{
              flexDirection: "row-reverse",
              borderTopWidth: 1,
              borderBottomWidth: 1,
              flexWrap: "wrap"
            }}
          >
            {this.textori}
          </View>
        );


        if (this._isMounted) {
        this.setState(
          {
            textoriginal : this.textori2
          },
          () => {return this.state.textoriginal}
        );
        }
      });

    
  }
}
