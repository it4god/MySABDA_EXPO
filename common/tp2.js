//"use strict"
import React, { Component } from "react";
import { View, Text } from "react-native";
import * as COMethods from "./COMethods";

export default class TagParser extends Component {
  constructor(props, darkmode) {
    super(props);
    this.setFirstLoadVar();
    this.setStaticVar();
    this.THIS_PARENT = props;
    this.is_line_view = false;
    this.is_show_notes = true;
    this.is_show_pericopes = true;
    this.is_show_highlight = false;
    this.darkmode = darkmode;
    this.textclick = [];

    if (darkmode != null) {

      if (darkmode != true) {
        this.BACKGROUND_COLOR = "#FFFFFF";
        this.TEXT_COLOR = "#353535";
        this.TEXT_COLOR_URL = "#105B8E";
        this.TEXT_COLOR_JESUS = "BE4228"
      }
      else if (darkmode == true) {
        this.BACKGROUND_COLOR = "#1F2021"
        this.TEXT_COLOR = "#DDDDDD";
        this.TEXT_COLOR_URL = "#4CA7E5";
        this.TEXT_COLOR_JESUS = "#F07178"

      }
    
    }
  }
  componentDidMount = () => { };
  setFirstLoadVar() {
    this._isMounted = false;
    this.totalMinData = 20; //COMethods.getMinShowDFata();

    this.countBR = 0;
    this.Max_BR = 3;

    this.is_highlight = false;
    this.list_tag_exception = ["eshigh", "hebrew", "greek"];
    this.list_tag_br_exception = [
      "ul",
      "ol",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
    ];

    this.list_hover = [];
    this.list_hover_attr = [];
    this.list_strong_bib = [];

    this.delay_mouse_enter = 1000;
    this.delay_mouse_leave = 1500;
  }
  setStaticVar() { }

  DoParser(text, param_parent) {
    text = text.replace(/verse/g, "chapverse");
    text = text.replace(/<br\/>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/-/g, "seterip");
    if (COMethods.isStringEmpty(text) || typeof text === "object") return "";
    var DomParser = require("react-native-html-parser").DOMParser;
    let doc = new DomParser().parseFromString(text, "text/html");
    return this.ParserTag(doc, param_parent);
  }
  DoParserBibleFullVersion(
    text,
    is_line_view,
    is_show_notes,
    is_show_pericopes,
    is_show_highlight,
    fontsize,
    bibleversion,
    ispartial,
    is_vref_only,
    rendercontent
  ) {
    this.rendercontent = "";
    if (rendercontent !== null)
      this.rendercontent = rendercontent;

    // console.log(this.rendercontent);
    if (this.rendercontent == "rendercontent1")
      this.textclick = [];


    //    console.log("total text click " + this.textclick.length)
    this.is_line_view = is_line_view;
    this.is_show_notes = is_show_notes;
    this.is_show_pericopes = is_show_pericopes;
    this.is_show_highlight = is_show_highlight;
    this.fontSize = fontsize;
    this.bibleversion = bibleversion;
    this.partial = ispartial;
    this.is_vref_only = is_vref_only;

    //console.log("\n\n" + text)
    {
      text = text.replace(/undefined/g, "");
      text = text.replace(/<para><para>/g, "");
      text = text.replace(/<\/para><\/para>/g, "");

      if (this.bibleversion.toLowerCase() === "tb") {
        text = text.replace(/<pericope>/g, "</para><pericope>");
        text = text.replace(/<\/pericope>/g, "</pericope><para>");
        text = text.replace("<para></para><pericope>", "<pericope>");
        text = text.replace(/<verse/g, "</para><para><verse");
        text = text.replace(/<\/pericope>/g, "</pericope><para>");
        text = text.replace(/<para><para>/g, "<para>");
        text = text.replace(/<para> <\/para>/g, "");
        text = text.replace(/<para><\/para>/g, "");
        text = text.replace(/<\/para><\/para>/g, "</para>");
        text = text.replace("<pericope><pericope>", "<pericope>");
        text = text.replace(/<para><para>/g, "<para>");
        text = "<paragraph>" + text + "</para></paragraph><para></para>";
        text = text.replace("<paragraph></para>", "<paragraph>");
      }
      if (this.bibleversion.toLowerCase() === "ayt") {
        text = text.replace(/<pericope>/g, "</para><pericope>");
        text = text.replace(/<\/pericope>/g, "</pericope><para>");
        text = text.replace("<para></para><pericope>", "<pericope>");
        text = text.replace(/<verse/g, "</para><para><verse");
        text = text.replace(/<\/pericope>/g, "</pericope><para>");
        text = text.replace(/<para><para>/g, "<para>");
        text = text.replace(/<para> <\/para>/g, "");
        text = text.replace(/<para><\/para>/g, "");
        text = text.replace(/<\/para><\/para>/g, "</para>");
        text = text.replace("<pericope><pericope>", "<pericope>");
        text = text.replace(/<para><para>/g, "<para>");
        text = "<paragraph>" + text + "</para></paragraph><para></para>";
        text = text.replace("<paragraph></para>", "<paragraph>");
      }

      if (this.bibleversion.toLowerCase() === "avb") {
        text = text.replace(/<pericope>/g, "</para><pericope>");
        text = text.replace(/<\/pericope>/g, "</pericope><para>");
        text = text.replace("<para></para><pericope>", "<pericope>");
        text = text.replace(/<verse/g, "</para><para><verse");
        text = text.replace(/<\/pericope>/g, "</pericope><para>");
        text = text.replace(/<para><para>/g, "<para>");
        text = text.replace(/<para> <\/para>/g, "");
        text = text.replace(/<para><\/para>/g, "");
        text = text.replace(/<\/para><\/para>/g, "</para>");
        text = text.replace("<pericope><pericope>", "<pericope>");
        text = text.replace(/<para><para>/g, "<para>");
        text = "<paragraph>" + text + "</para></paragraph><para></para>";
        text = text.replace("<paragraph></para>", "<paragraph>");
      }
      if (this.bibleversion.toLowerCase() === "esv") {
        text = text.replace(/<para> <\/J><\/para>/g, "</J>");
        text = text.replace(
          '<pericope>Jesus Again Foretells Death, Resurrection</pericope><verse vid="23722">17:21</verse> [OMITTED TEXT]</para>',
          '<verse vid="23722">17:21</verse> [OMITTED TEXT]</para><pericope>Jesus Again Foretells Death, Resurrection</pericope>'
        );
        text = text.replace(
          '<pericope>The Authority of Jesus Challenged</pericope><verse vid="24667">11:26</verse> [OMITTED TEXT]</para>',
          '<verse vid="24667">11:26</verse> [OMITTED TEXT]</para><pericope>The Authority of Jesus Challenged</pericope>'
        );
        text = text.replace(
          '<pericope>Pilate Delivers Jesus to Be Crucified</pericope><verse vid="25953">23:17</verse> [OMITTED TEXT]</para>',
          '<verse vid="25953">23:17</verse> [OMITTED TEXT]</para><pericope>Pilate Delivers Jesus to Be Crucified</pericope>'
        );
        text = text.replace(
          '<pericope>Doxology</pericope><verse vid="28361">16:24</verse> [OMITTED TEXT]</para>',
          '<verse vid="28361">16:24</verse> [OMITTED TEXT]</para><pericope>Doxology</pericope>'
        );
      }

      if (this.bibleversion.toLowerCase() === "av" && !this.is_line_view) {
        text = "<paragraph><para>" + text + "</para></paragraph>";
      }
      text = text.replace(/@<\/pericope>/g, "</pericope>");
      text = text.replace(/@/g, "");

      let textindo = false;
      if (
        this.bibleversion.toLowerCase() == "tb" ||
        this.bibleversion.toLowerCase() == "ayt" ||
        this.bibleversion.toLowerCase() == "avb"
      )
        textindo = true;
      if (
        this.is_line_view ||
        textindo ||
        this.bibleversion.toLowerCase() === "net"
      ) {
        text = text.replace(/<para>/g, "");
        text = text.replace(/<\/para>/g, "");

        text = text.replace(/<poetry>/g, "");
        text = text.replace(/<\/poetry>/g, " ");

        text = text.replace(/<verse/g, "</para><para><verse");
        text = "<inlineview>" + text + "</para></inlineview>";
        text = text.replace(/<pericope>/g, "</para><pericope>");
        text = text.replace(/<\/pericope>/g, "</pericope><para>");
        text = text.replace("<inlineview></para>", "<inlineview>");
        text = text.replace(/<para><para>/g, "<para>");
        text = text.replace(/<para> <\/para>/g, "");
        text = text.replace(/<para><\/para>/g, "");
        text = text.replace("</paragraph>", "");
        text = text.replace("<paragraph></para>", "");
        text = text.replace(/<para><br2><\/para>/g, "");
      } else {
        if (textindo) {
          text = text.replace(/<para> <\/para>/g, "");
          text = text.replace(/<para><\/para>/g, "");
          text = text.replace(/<\/para><\/para>/g, "");

          text = text.replace(/<para>/g, "");
          text = text.replace(/<\/para>/g, "");
        }
      }
      text = text.replace(/<quote>/g, "'");
      text = text.replace(/<\/quote>/g, "'");
      text = text.replace(/<br\/>/g, "\n");
      text = text.replace(/<\/br>/g, "\n");
      text = text.replace(/{/g, "<var>");
      text = text.replace(/}/g, "</var>");
      text = text.replace(/-/g, "seterip");

      //      console.log("\nthis.bibleversion = " + this.bibleversion.toLowerCase());

      //text = text.replace(/<\/i>/g, "");
      //text = text.replace(/<i>/g, "\n\n");
      text = text.replace(/<br2><\/para>/g, "</para>");
    }
    //  console.log("\n" + text);
    if (COMethods.isStringEmpty(text) || typeof text === "object") return "";
    var DomParser = require("react-native-html-parser").DOMParser;

    let doc = new DomParser({
      locator: {},
      errorHandler: {
        warning: function (w) {
          console.log(w + "hahaha");
        },
      },
    }).parseFromString(text, "text/html");

    return this.ParserTagBiblex(doc);
  }
  DoParserBibleTextOnly(
    text,
    is_line_view,
    is_show_notes,
    is_show_pericopes,
    is_show_highlight,
    fontsize,
    bibleversion
  ) {
    this.is_line_view = is_line_view;
    this.is_show_notes = is_show_notes;
    this.is_show_pericopes = is_show_pericopes;
    this.is_show_highlight = is_show_highlight;
    this.fontSize = fontsize;
    this.bibleversion = bibleversion;
    text = text.replace(/undefined/g, "");
    text = text.replace(/<para><para>/g, "");
    text = text.replace(/<\/para><\/para>/g, "");
    if (this.bibleversion.toLowerCase() === "tb") {
      text = text.replace(/<pericope>/g, "</para><pericope>");
      text = text.replace(/<\/pericope>/g, "</pericope><para>");
      text = text.replace("<para></para><pericope>", "<pericope>");
      text = text.replace(/<verse/g, "</para><para><verse");
      text = text.replace(/<\/pericope>/g, "</pericope><para>");
      text = text.replace(/<para><para>/g, "<para>");
      text = text.replace(/<para> <\/para>/g, "");
      text = text.replace(/<para><\/para>/g, "");
      text = text.replace(/<\/para><\/para>/g, "</para>");
      text = text.replace("<pericope><pericope>", "<pericope>");
      text = text.replace(/<para><para>/g, "<para>");
      text = "<paragraph>" + text + "</para></paragraph><para></para>";
      text = text.replace("<paragraph></para>", "<paragraph>");
    }
    if (this.bibleversion.toLowerCase() === "ayt") {
      text = text.replace(/<pericope>/g, "</para><pericope>");
      text = text.replace(/<\/pericope>/g, "</pericope><para>");
      text = text.replace("<para></para><pericope>", "<pericope>");
      text = text.replace(/<verse/g, "</para><para><verse");
      text = text.replace(/<\/pericope>/g, "</pericope><para>");
      text = text.replace(/<para><para>/g, "<para>");
      text = text.replace(/<para> <\/para>/g, "");
      text = text.replace(/<para><\/para>/g, "");
      text = text.replace(/<\/para><\/para>/g, "</para>");
      text = text.replace("<pericope><pericope>", "<pericope>");
      text = text.replace(/<para><para>/g, "<para>");
      text = "<paragraph>" + text + "</para></paragraph><para></para>";
      text = text.replace("<paragraph></para>", "<paragraph>");
    }

    if (this.bibleversion.toLowerCase() === "avb") {
      text = text.replace(/<pericope>/g, "</para><pericope>");
      text = text.replace(/<\/pericope>/g, "</pericope><para>");
      text = text.replace("<para></para><pericope>", "<pericope>");
      text = text.replace(/<verse/g, "</para><para><verse");
      text = text.replace(/<\/pericope>/g, "</pericope><para>");
      text = text.replace(/<para><para>/g, "<para>");
      text = text.replace(/<para> <\/para>/g, "");
      text = text.replace(/<para><\/para>/g, "");
      text = text.replace(/<\/para><\/para>/g, "</para>");
      text = text.replace("<pericope><pericope>", "<pericope>");
      text = text.replace(/<para><para>/g, "<para>");
      text = "<paragraph>" + text + "</para></paragraph><para></para>";
      text = text.replace("<paragraph></para>", "<paragraph>");
    }

    if (this.bibleversion.toLowerCase() === "av" && !this.is_line_view) {
      text = "<paragraph><para>" + text + "</para></paragraph>";
    }
    text = text.replace(/@<\/pericope>/g, "</pericope>");
    text = text.replace(/@/g, "");
    if (this.is_line_view) {
      text = text.replace(/<para>/g, "");
      text = text.replace(/<\/para>/g, "");
      text = text.replace(/<poetry>/g, "<br2");
      text = text.replace(/<\/poetry>/g, "<br2>");
      text = text.replace(/<verse/g, "</para><para><verse");
      text = "<inlineview>" + text + "</para></inlineview>";
      text = text.replace(/<pericope>/g, "</para><pericope>");
      text = text.replace(/<\/pericope>/g, "</pericope><para>");
      text = text.replace("<inlineview></para>", "<inlineview>");
      text = text.replace(/<para><para>/g, "<para>");
      text = text.replace(/<para> <\/para>/g, "");
      text = text.replace(/<para><\/para>/g, "");
      text = text.replace("</paragraph>", "");
      text = text.replace("<paragraph></para>", "");
    }

    //text = text.replace(/verse/g, "chapverse");
    text = text.replace(/<br\/>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/{/g, "<var>");
    text = text.replace(/}/g, "</var>");
    text = text.replace(/-/g, "seterip");
    if (COMethods.isStringEmpty(text) || typeof text === "object") return "";
    var DomParser = require("react-native-html-parser").DOMParser;

    let doc = new DomParser({
      locator: {},
      errorHandler: {
        warning: function (w) {
          console.log(w + "hahaha");
        },
      },
    }).parseFromString(text, "text/html");

    return this.ParserTagBibleTextOnly(doc);
  }
  DoParserDiscovery(text, param_parent) {
    text = text.replace(/undefined/g, "");
    //text = text.replace(/verse/g, "chapverse");
    text = text.replace(/<br\/>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/<i\/>/g, "");
    text = text.replace(/<\/i>/g, "");
    text = text.replace(/<i>/g, "");
    text = text.replace(/<para>/g, "");
    text = text.replace(/<\/para>/g, "");

    text = "<para>" + text + "</para>";
    text = text.replace(/<pericope>/g, "</para><pericope>");
    text = text.replace(/<\/pericope>/g, "</pericope><para>");
    text = text.replace("<para></para>", "");
    text = text.replace(/@<\/pericope>/g, "</pericope>");
    text = text.replace(/{/g, "<var>");
    text = text.replace(/}/g, "</var>");
    text = text.replace(/<td>/g, "");
    text = text.replace(/<\/td>/g, "");
    text = text.replace(/<tr>/g, "");
    text = text.replace(/<\/tr>/g, "");
    text = text.replace(/<table>/g, "");
    text = text.replace(/<\/table>/g, "");
    text = text.replace(/-/g, "seterip");
    this.is_highlight = false;
    this.is_show_notes = false;

    if (COMethods.isStringEmpty(text) || typeof text === "object") return "";
    var DomParser = require("react-native-html-parser").DOMParser;

    let doc = new DomParser({
      locator: {},
      errorHandler: {
        warning: function (w) {
          console.log(w + "hahaha");
        },
      },
    }).parseFromString(text, "text/html");

    //let doc = new DomParser().parseFromString(text, "text/html");

    return this.ParserTagDiscovery(doc, param_parent);
  }
  DoParserWord(text, param_parent) {
    text = text.replace(/verse/g, "chapverse");
    text = text.replace(/<br\/>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/<\/br>/g, "\n");
    text = text.replace(/-/g, "seterip");
    if (COMethods.isStringEmpty(text) || typeof text === "object") return "";
    var DomParser = require("react-native-html-parser").DOMParser;
    let doc = new DomParser().parseFromString(text, "text/html");
    return this.ParserTagDiscovery(doc, param_parent);
  }
  DoParserBible(list_verse, param_parent) {
    let listRender = [];
    if (!COMethods.isObjectEmpty(list_verse)) {
      let text = this.onSetBibleClean(list_verse, param_parent);
      listRender.push(this.DoParser(text, param_parent));
    }
    return listRender;
  }

  onSetBibleClean(list_verse, param_parent) {
    let currBook = "",
      currChapter = "",
      newText = "";
    let totalVerse = list_verse.length;
    let new_str = "";
    // let storeBible = this.props.STORE_BIBLE;
    //let stoMenuBible = storeBible.MENU_BIBLE;
    for (let i = 0; i < totalVerse; i++) {
      let objVerse = list_verse[i];
      if (objVerse.verse_type === "pericope") {
        //if(!stoMenuBible.show_pericope) continue;
        if (!COMethods.isObjectEmpty(param_parent) && param_parent.from_link) {
          objVerse.text = objVerse.text.replace(
            /<pericope>/g,
            "<pericopelink>"
          );
          objVerse.text = objVerse.text.replace(
            /<\/pericope>/g,
            "</pericopelink>"
          );
        }
      }

      if (currBook !== objVerse.book || currChapter !== objVerse.chapter) {
        if (!COMethods.isStringEmpty(newText)) {
          newText += "</versetext>";
          new_str += newText;
        }
        newText = "";
        newText += "<versetext>";

        if (!COMethods.isObjectEmpty(param_parent) && param_parent.from_link) {
          newText += "<bookchplink>" + objVerse.book + " " + objVerse.chapter;
          if (totalVerse < 2) newText += " : " + objVerse.verse;
          newText += "</bookchplink>";
        } else {
          newText += "<bookchp>" + objVerse.book + " " + objVerse.chapter;
          if (totalVerse < 2) newText += " : " + objVerse.verse;
          newText += "</bookchp>";
        }

        currBook = objVerse.book;
        currChapter = objVerse.chapter;
      }

      newText += objVerse.text;
      newText = newText.replace(/[@*]/g, "");
      if (this.is_print) {
        newText = this.doCleanVerse(newText);

        newText = newText.replace(
          "<verse>",
          "<bcprint>" + objVerse.chapter + ":" + objVerse.verse + "</bcprint>"
        );
        newText = newText.replace(/(<lex)/g, "<lexprint");

        newText = newText.replace(/(\|vid)/g, " verse_id");
        newText = newText.replace(/(<\/lex>)/g, "</lexprint>");
      } else {
        //if(!stoMenuBible.show_note){
        //newText = this.doCleanVerse(newText);
        // }

        newText = newText.replace(
          "<verse>",
          "<chapverse vid=" +
          objVerse.verse_id +
          ">&nbsp" +
          objVerse.chapter +
          ":" +
          objVerse.verse +
          "&nbsp</chapverse>"
        );
        newText = newText.replace(/(\|vid)/g, " verse_id");
      }

      //if(stoMenuBible.show_line){
      //    newText += '<p></p>';
      // }

      //console.log(newText)

      if (i === totalVerse - 1) {
        newText += "</versetext>";
        new_str += newText;
      }

      //console.log(new_str);
    }
    return new_str;
  }

  ParserTag(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              if (nodeValue == " ") listRender.push(<Text key={id}> </Text>);
              else listRender.push(this.RenderNodeValue(nodeValue));
              break;
            default:
              listRender.push(this.RenderTag(nodeName, objChild, param));
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagDiscovery(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              if (nodeValue == " ") listRender.push([]);
              else listRender.push(this.RenderNodeValue(nodeValue));
              break;
            default:
              listRender.push(
                this.RenderTagDiscovery(nodeName, objChild, param)
              );
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagBibleTextOnly(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              let id = COMethods.getUniqueId(nodeName);

              if (nodeValue == " ") listRender.push([]);
              else listRender.push(this.RenderNodeValueBiblex(nodeValue));

              break;
            default:
              listRender.push(
                this.RenderTagBibleTextOnly(nodeName, objChild, param)
              );
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagBiblex(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              let id = COMethods.getUniqueId(nodeName);

              if (nodeValue == " ") listRender.push([]);
              else listRender.push(this.RenderNodeValueBiblex(nodeValue));

              break;
            default:
              listRender.push(this.RenderTagBiblex(nodeName, objChild, param));
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagBiblexJesus(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              let id = COMethods.getUniqueId(nodeName);

              if (nodeValue == " ") listRender.push([]);
              else listRender.push(this.RenderNodeValueBiblexJesus(nodeValue));

              break;
            default:
              listRender.push(
                this.RenderTagBiblexJesus(nodeName, objChild, param)
              );
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagOriginalLanguage(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              listRender.push(this.RenderNodeValueOriginalLanguage(nodeValue));
              break;
            default:
              listRender.push(this.RenderTag(nodeName, objChild, param));
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagPericope(parent, param) {
    let listRender = [];
    listRender.push(<Text key={Math.random()}> {"\n"}</Text>);
    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              listRender.push(this.RenderNodeValuePericope(nodeValue));
              break;
            default:
              listRender.push(this.RenderTag(nodeName, objChild, param));
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagVerseNumber(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              listRender.push(this.RenderNodeValueVerseNumber(nodeValue));
              break;
            default:
              listRender.push(this.RenderTag(nodeName, objChild, param));
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagPoetry(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              listRender.push(this.RenderNodeValuePoetry(nodeValue));
              break;
            default:
              listRender.push(this.RenderTagPoetry(nodeName, objChild, param));
              break;
          }
        }
      }
    }

    return listRender;
  }
  ParserTagWordDefinition(parent, param) {
    let listRender = [];

    // seq MUST BE NOT Changed !!
    if (!COMethods.isObjectEmpty(parent)) {
      let list_child = parent.childNodes;
      if (!COMethods.isStringEmpty(list_child, false)) {
        let total_child = list_child.length;

        for (var i = 0; i < total_child; i++) {
          let objChild = list_child[i];
          let nodeName = "";
          let nodeValue = null;

          if (!COMethods.isStringEmpty(objChild.nodeName))
            nodeName = objChild.nodeName.toLowerCase();
          if (!COMethods.isStringEmpty(objChild.nodeValue, false))
            nodeValue = objChild.nodeValue;

          switch (nodeName) {
            case "text":
            case "#text":
              if (nodeValue == " ") listRender.push(<Text key={id}> </Text>);
              else
                listRender.push(this.RenderNodeValueWordDefinition(nodeValue));
              break;
            default:
              listRender.push(this.RenderTag(nodeName, objChild, param));
              break;
          }
        }
      }
    }

    return listRender;
  }
  RenderNodeValueTes(value) {
    let id = COMethods.getUniqueId(value);
    value = value.replace(/seterip/g, "-");
    return (
      '<Text key={id} style={{ fontWeight: "normal" }}>' +
      value +
      '{"\n"}</Text>'
    );
  }
  RenderNodeValueOriginalLanguage(value) {
    let id = COMethods.getUniqueId(value);
    value = value.replace(/seterip/g, "-");
    return (
      <Text
        key={id}
        style={{ display: "flex", fontWeight: "normal", textAlign: "left" }}
      >
        <Text
          style={{ display: "flex", fontWeight: "normal", textAlign: "left", color:this.TEXT_COLOR  }}
        >
          {value}
        </Text>
      </Text>
    );
  }
  RenderNodeValueWordDefinition(value) {
    let id = COMethods.getUniqueId(value);
    value = value.replace(/seterip/g, "-");
    return (
      <Text
        key={id}
        style={{
          display: "flex",
          paddingBottom: 7,
          fontWeight: "normal",
          textAlign: "left",
          fontSize: 14,
          color:this.TEXT_COLOR
        }}
      >
        {value}
      </Text>
    );
  }
  RenderNodeValue(value) {
    let id = COMethods.getUniqueId(value);
    value = value.replace(/seterip/g, "-");
    /*
    return (
      <Text
        key={id}
        style={{ display: "flex", fontWeight: "normal", textAlign: "left" }}
      >
        <Text
          style={{
            display: "flex",
            paddingBottom: 7,
            fontWeight: "normal",
            textAlign: "left"
          }}
        >
          {value}
        </Text>
      </Text>
    );
    */
    return (
      <Text
        key={id}
        style={{
          display: "flex",
          paddingBottom: 7,
          fontWeight: "normal",
          textAlign: "left",
          color:this.TEXT_COLOR
        }}
      >
        {value}
      </Text>
    );
  }
  RenderNodeValueBiblex(value) {
    let id = COMethods.getUniqueId(value);
    value = value.replace(/seterip/g, "-");
    return (
      <Text
        key={id}
        style={{
          display: "flex",
          fontWeight: "normal",
          textAlign: "left",
        }}
      >
        <Text
          style={{
            display: "flex",
            fontWeight: "normal",
            textAlign: "left",
            color:this.TEXT_COLOR
          }}
        >
          {value}
        </Text>
      </Text>
    );

    return (
      <Text key={id} style={{ fontWeight: "normal", paddingBottom: 7 }}>
        {value}
      </Text>
    );
  }
  RenderNodeValueBiblexJesus(value) {
    let id = COMethods.getUniqueId(value);
    value = value.replace(/seterip/g, "-");
    if (this.is_vref_only) {
      <Text
        key={id}
        style={{
          display: "flex",
          fontWeight: "normal",
          textAlign: "left",
          
        }}
      >
        <Text
          style={{
            display: "flex",
            fontWeight: "normal",
            textAlign: "left",
            color:this.TEXT_COLOR
          }}
        >
          {value}
        </Text>
      </Text>;
    } else {
      return (
        <Text
          key={id}
          style={{
            display: "flex",
            fontWeight: "normal",
            textAlign: "left",
            color:this.TEXT_COLOR_JESUS
          }}
        >
          <Text
            style={{
              display: "flex",
              fontWeight: "normal",
              textAlign: "left",
              color:this.TEXT_COLOR_JESUS
            }}
          >
            {value}
          </Text>
        </Text>
      );
    }
    return (
      <Text key={id} style={{ fontWeight: "normal", paddingBottom: 7,color:this.TEXT_COLOR }}>
        {value}
      </Text>
    );
  }
  RenderNodeValuePericope(value) {
    value = value.replace(/seterip/g, "-");
    let id = COMethods.getUniqueId(value);
    let fsize = Number(this.fontSize) + 2;
    if (isNaN(fsize)) fsize = 16;
    return (
      <Text
        key={id}
        style={{ fontFamily: "NotoSans-Bold", fontSize: fsize, paddingTop: 0,color:this.TEXT_COLOR }}
      >
        {value}
      </Text>
    );
  }
  RenderNodeValueVerseNumber(value) {
    value = value.replace(/seterip/g, "-");
    let id = COMethods.getUniqueId(value);
    return (
      <Text style={{ color: "#105B8E", fontWeight: "normal", color:this.TEXT_COLOR_URL}} key={id}>
        {" "}
        {value}{" "}
      </Text>
    );
  }
  RenderNodeValuePoetry(value) {
    let id = COMethods.getUniqueId(value);
    value = value.replace(/seterip/g, "-");
    return (
      <Text key={id} style={{ fontStyle: "italic", color:this.TEXT_COLOR }}>
        {value}
      </Text>
    );
  }
  RenderTag(tag, objChild, param) {
    // let storeBible = this.props.STORE_BIBLE;
    //let stoMenuBible = storeBible.MENU_BIBLE;

    let objStyle = this.onGetTagName(tag);
    let id = COMethods.getUniqueId(tag);
    let node_attribute,
      nodeValue,
      id_tag = 0,
      value_tag = "";
    let param_link = {},
      objAttr = {};

    if (tag === "br") this.countBR++;
    else this.countBR = 0;

    switch (tag) {
      case "br":
        return <Text key={id}>{"\n"}</Text>;
        break;
      case "eshigh":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        return (
          <Text
            key={id}
            style={{
              flexWrap: "wrap",
              color:this.TEXT_COLOR,
              fontFamily: "NotoSans-Bold",
            }}
          >
            {value}
          </Text>
        );
        break;
      case "pericope":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              paddingTop: 3,
              paddingBottom: 3,
              flexWrap: "nowrap",
            }}
          >
            {this.ParserTagPericope(objChild, param)}
          </View>
        );
        break;
      case "quote":
      case "poetry":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 10,
              flexWrap: "wrap",
            }}
          >
            {this.ParserTagPoetry(objChild, param)}
          </View>
        );
      case "bookchp":
      case "bookchplink":
      case "pericope":
      case "pericopelink":
      case "subtitle":

      case "para":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            {this.ParserTag(objChild, param)}
          </View>
        );
        break;
      case "versetext":
        return (
          <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text> {this.ParserTag(objChild, param)}</Text>
          </View>
        );
        break;
      case "p":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return this.ParserTag(objChild, param);
        break;
      case "table":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, { table_id: id, is_from_table: true })
        );
      case "caption":
      case "thead":
      case "tbody":
      case "tfoot":
      case "tr":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.tr_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "td":
      case "th":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.td_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "col":
      case "colgroup":
      case "ul":
      case "ol":
      case "li":
      case "sub":
      case "sup":
        return (
          <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.ParserTag(objChild, param)}
          </View>
        );

        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "vref":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeVref(tag, param_link);
        return this.onLink_SetAttribute(tag, param_link);
      case "xref": //same like cmt tag
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "entry_code" ||
            node_attribute.nodeName === "subentry_code")
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;
        value_tag = "*";
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeWithSpace(tag, param_link);
      case "cmt":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "entry_code" ||
            node_attribute.nodeName === "subentry_code")
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;
        value_tag = "*";
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return <Text key={id}>{""}</Text>;
      case "entity":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);

      case "lex":
        node_attribute = objChild.attributes[0];
        let translit = "";
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
            if (!COMethods.isStringEmpty(split[1])) translit = " " + split[1];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag + translit,
          id: id_tag,
          property: param,
        };

        objAttr.key = id;
        objAttr.onClick = (e) => {
          this.onLex_MouseClick(id_tag);
          e.preventDefault();
        };

        return this.onLink_SetAttributeBiblex(tag, param_link);
      case "louwnida":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "lex_def":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "strong" ||
            node_attribute.nodeName === "code")
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "hebrew":
      case "greek":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          id_tag = node_attribute.nodeName + " " + node_attribute.nodeValue;

          value_tag = objChild.textContent;

          param_link = {
            value: value_tag,
            id: id_tag,
            property: param,
          };

          return this.onLink_SetAttribute(tag, param_link);
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
          value = objChild.textContent;
          value = value.replace(/seterip/g, "-");
          return this.ParserTagOriginalLanguage(objChild, param);
          return (
            <Text key={id} style={{ color: "#353535" }}>
              {value}{" "}
            </Text>
          );
          return (
            <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {this.ParserTagOriginalLanguage(objChild, param)}
            </View>
          );
        }
      case "biblex":
        node_attribute = objChild.attributes[0];
        let node_attributeVerse = objChild.attributes[1];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong" &&
          !COMethods.isObjectEmpty(node_attributeVerse) &&
          node_attributeVerse.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          let verse_id = node_attributeVerse.nodeValue;

          let strong_text = objChild.textContent.match(
            /([A-Za-z"“”,.;!']|\s)*/g
          );
          if (!COMethods.isObjectEmpty(strong_text)) {
            for (var idx = 0; idx < strong_text.length; idx++) {
              // if (!COMethods.isStringEmpty(strong_text[idx])) {
              value_tag += " " + strong_text[idx];
              //  }
            }
          }
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeBiblex(tag, param_link);
        return this.ParserTag(objChild, param);
      case "verse":
        textvalue = objChild.textContent;
        value = value.replace(/seterip/g, "-");

        node_attribute = objChild.attributes[0];
        node_attributeVerse = objChild.attributes[1];
        verse_id = textvalue;

        id_tag = node_attribute.nodeValue;
        value_tag = objChild.textContent;

        return this.onLink_SetAttributeVerseNumber(
          id_tag,
          param_link,
          textvalue,
          verse_id
        );
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          value_tag = objChild.textContent;
          objAttr.key = id;
          objAttr.className = objStyle.classname + " " + id_tag;
          if (!this.is_print) {
            objAttr.onClick = (e) => {
              this.onVerse_MouseClick(id_tag, value_tag);
              e.preventDefault();
            };
          }
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }

        return this.ParserTagVerseNumber(objChild, param);

      default:
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return this.ParserTag(objChild, param);
    }
  }
  RenderTagDiscovery(tag, objChild, param) {
    // let storeBible = this.props.STORE_BIBLE;
    //let stoMenuBible = storeBible.MENU_BIBLE;

    let objStyle = this.onGetTagName(tag);
    let id = COMethods.getUniqueId(tag);
    let node_attribute,
      nodeValue,
      id_tag = 0,
      value_tag = "";
    let param_link = {},
      objAttr = {};

    if (tag === "br") this.countBR++;
    else this.countBR = 0;

    switch (tag) {
      case "addbackground":
        <Text key={id} style={{ flexWrap: "wrap", backgroundColor: "yellow" }}>
          {value}
        </Text>;
        break;
      case "var":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");

        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap", color:this.TEXT_COLOR, fontWeight: "normal" }}
          >
            {value}
          </Text>
        );
        break;
      case "br":
        return <Text>{"\n"}</Text>;
        break;
      case "b":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        return (
          <Text
            key={id}
            style={{
              flexWrap: "wrap",
              color:this.TEXT_COLOR,
              fontFamily: "NotoSans-Bold",
            }}
          >
            {value}{" "}
          </Text>
        );
        break;
      case "i":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap",  color:this.TEXT_COLOR_URL, fontStyle: "italic" }}
          >
            {value}
          </Text>
        );
        break;
      case "eshigh":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        return (
          <Text
            key={id}
            style={{
              flexWrap: "wrap",
              color:this.TEXT_COLOR_URL,
              fontFamily: "NotoSans-Bold",
            }}
          >
            {value}
          </Text>
        );
        break;
      case "pericope":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              paddingBottom: 10,
              paddingTop: 3,
              flexWrap: "wrap",
              color:this.TEXT_COLOR_URL
            }}
          >
            <Text>{this.ParserTagPericope(objChild, param)}</Text>
          </View>
        );
        break;
      case "quote":
      case "poetry":
        return (
          <Text
            key={id}
            style={{
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 10,

              flexWrap: "wrap",
            }}
          >
            {this.ParserTagPoetry(objChild, param)}
          </Text>
        );
      case "bookchp":
      case "bookchplink":
      case "pericope":
      case "pericopelink":
      case "subtitle":

      case "para":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            <Text style={{ textAlign: "left",  }}>
              {this.ParserTagDiscovery(objChild, param)}
            </Text>
          </View>
        );
        break;
      case "versetext":
        return (
          <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text> {this.ParserTag(objChild, param)}</Text>
          </View>
        );
        break;
      case "p":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return this.ParserTag(objChild, param);
        break;
      case "table":
        break;
      case "caption":
      case "thead":
      case "tbody":
      case "tfoot":
      case "tr":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.tr_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "td":
      case "th":
        break;
      case "col":
      case "colgroup":
      case "ul":
      case "ol":
      case "li":
      case "sub":
      case "sup":
        return <Text key={id}>{this.ParserTagDiscovery(objChild, param)}</Text>;

        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "vref":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeVref(tag, param_link);
        return this.onLink_SetAttribute(tag, param_link);
      case "xref": //same like cmt tag
      case "cmt":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "entry_code" ||
            node_attribute.nodeName === "subentry_code")
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;
        value_tag = "*";
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeWithSpace(tag, param_link);
      case "entity":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);

      case "lex":
        node_attribute = objChild.attributes[0];
        let translit = "";
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
            if (!COMethods.isStringEmpty(split[1])) translit = " " + split[1];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag + translit,
          id: id_tag,
          property: param,
        };

        objAttr.key = id;
        objAttr.onClick = (e) => {
          this.onLex_MouseClick(id_tag);
          e.preventDefault();
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "louwnida":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "lex_def":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "strong" ||
            node_attribute.nodeName === "code")
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "hebrew":
      case "greek":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          id_tag = node_attribute.nodeName + " " + node_attribute.nodeValue;

          value_tag = objChild.textContent;

          param_link = {
            value: value_tag,
            id: id_tag,
            property: param,
          };

          return this.onLink_SetAttribute(tag, param_link);
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
          value = objChild.textContent;
          value = value.replace(/seterip/g, "-");
          return this.ParserTagOriginalLanguage(objChild, param);
          return (
            <Text key={id} style={{ color: "#353535" }}>
              {value}{" "}
            </Text>
          );
          return (
            <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {this.ParserTagOriginalLanguage(objChild, param)}
            </View>
          );
        }
      case "biblex":
        node_attribute = objChild.attributes[0];
        let node_attributeVerse = objChild.attributes[1];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong" &&
          !COMethods.isObjectEmpty(node_attributeVerse) &&
          node_attributeVerse.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          let verse_id = node_attributeVerse.nodeValue;

          let strong_text = objChild.textContent.match(
            /([A-Za-z"“”,.;!']|\s)*/g
          );
          if (!COMethods.isObjectEmpty(strong_text)) {
            for (var idx = 0; idx < strong_text.length; idx++) {
              if (!COMethods.isStringEmpty(strong_text[idx])) {
                value_tag += " " + strong_text[idx];
              }
            }
          }

          let list_strong_id = id_tag.split(",");
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeBiblex(tag, param_link);
        return this.ParserTag(objChild, param);
      case "verse":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          value_tag = objChild.textContent;
          objAttr.key = id;
          objAttr.className = objStyle.classname + " " + id_tag;
          if (!this.is_print) {
            objAttr.onClick = (e) => {
              this.onVerse_MouseClick(id_tag, value_tag);
              e.preventDefault();
            };
          }
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }

        return this.ParserTagVerseNumber(objChild, param);

      default:
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return this.ParserTagDiscovery(objChild, param);
    }
  }
  RenderTagBiblex(tag, objChild, param) {
    // let storeBible = this.props.STORE_BIBLE;
    //let stoMenuBible = storeBible.MENU_BIBLE;

    let objStyle = this.onGetTagName(tag);
    let id = COMethods.getUniqueId(tag);
    let node_attribute,
      nodeValue,
      id_tag = 0,
      value_tag = "";
    let param_link = {},
      objAttr = {};
    if (tag === "br") this.countBR++;
    else this.countBR = 0;

    switch (tag) {
      case "inlineview":
        return (
          <View
            key={id}
            style={{
              flexDirection: "column",
              flexWrap: "nowrap",
              display: "flex",
              paddingBottom: 20,
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );
        break;
      case "var":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        var regexremove = /(<([^>]+)>)/gi;
        value = value.replace(regexremove, "");
        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap",  color:this.TEXT_COLOR, fontWeight: "normal" }}
          >
            {value}
          </Text>
        );
        break;
      case "br":
        return <Text key={id}>{"\n"}</Text>;
        break;
      case "br2":
        return <Text key={id}>{"\n"}</Text>;
        break;
      case "j":
        if (this.is_vref_only)
          return (
            <Text key={id} style={{ color:this.TEXT_COLOR }}>
              {this.ParserTagBiblexJesus(objChild, param)}
            </Text>
          );
        else
          return (
            <Text key={id} style={{color:this.TEXT_COLOR_JESUS}}>
              {this.ParserTagBiblexJesus(objChild, param)}
            </Text>
          );
        break;
      case "pericope":
        value = objChild.textContent.replace(/seterip/g, "-");

        objAttr.key = id;
        objAttr.className = objStyle.classname;
        let fsize = Number(this.fontSize) + 2;
        if (isNaN(fsize)) fsize = 16;
        if (!this.is_line_view) {
          if (this.is_show_pericopes) {
            return (
              <View
                key={id}
                style={{
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  paddingBottom: 10,
                  paddingTop: 10,
                  flex: 10,
                }}
              >
                <Text
                  key={id}
                  style={{
                    fontFamily: "NotoSans-Bold",
                    fontSize: fsize,
                    paddingTop: 0,
                    flex: 1,
                    color:this.TEXT_COLOR
                  }}
                >
                  {value}
                </Text>
              </View>
            );
          } else {
            return <View key={id}></View>;
          }
        } else {
          if (this.is_show_pericopes) {
            return (
              <View
                key={id}
                style={{
                  flexDirection: "column",
                  flexWrap: "nowrap",
                  paddingBottom: 10,
                  paddingTop: 10,
                  flex: 1,
                }}
              >
                <Text
                  key={id}
                  style={{
                    fontFamily: "NotoSans-Bold",
                    fontSize: fsize,
                    paddingTop: 0,
                    color:this.TEXT_COLOR
                  }}
                >
                  {value}
                </Text>
              </View>
            );
          } else {
            return <View key={id}></View>;
          }
        }
        if (this.is_show_pericopes) {
          return (
            <View
              key={id}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <Text
                key={id}
                style={{
                  fontFamily: "NotoSans-Bold",
                  fontSize: fsize,
                  paddingTop: 0,
                }}
              >
                {value}
              </Text>
            </View>
          );
        } else {
          return <View key={id}></View>;
        }
        break;
      case "paragraph":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
            }}
          >
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );

        break;
      case "quote":
      case "poetry":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 10,

              flexWrap: "wrap",
            }}
          >
            {this.ParserTagPoetry(objChild, param)}
          </View>
        );
      case "bookchp":
      case "bookchplink":
      case "pericopelink":
      case "subtitle":

      case "para":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            <Text style={{ textAlign: "left", lineHeight: 27 }}>
              {this.ParserTagBiblex(objChild, param)}
            </Text>
          </View>
        );

        break;
      case "versetext":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );

      case "p":
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          "p",
          objAttr,
          this.ParserTag(objChild, param)
        );
      case "table":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, { table_id: id, is_from_table: true })
        );
      case "caption":
      case "thead":
      case "tbody":
      case "tfoot":
      case "tr":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.tr_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "td":
      case "th":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.td_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );
        break;
      case "b":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        return (
          <Text
            key={id}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              color:this.TEXT_COLOR,
              
              fontFamily: "NotoSans-Bold",
            }}
          >
            {value}{" "}
          </Text>
        );
        break;
      case "col":
      case "colgroup":
      case "ul":
      case "ol":
      case "li":
      case "sub":
      case "sup":
        return (
          <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );

        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "vref":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeVref(tag, param_link);
        return this.onLink_SetAttribute(tag, param_link);
      case "xref": //same like cmt tag
      case "cmt":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "entry_code" ||
            node_attribute.nodeName === "subentry_code")
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;
        value_tag = value_tag.replace(/seterip/g, "-");
        value_tag = "*";
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttributeWithSpace(tag, param_link);
        break;
      case "entity":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);

      case "lex":
        node_attribute = objChild.attributes[0];
        let translit = "";
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
            if (!COMethods.isStringEmpty(split[1])) translit = " " + split[1];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag + translit,
          id: id_tag,
          property: param,
        };

        objAttr.key = id;
        objAttr.onClick = (e) => {
          this.onLex_MouseClick(id_tag);
          e.preventDefault();
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "louwnida":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "lex_def":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "strong" ||
            node_attribute.nodeName === "code")
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "hebrew":
      case "greek":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          id_tag = node_attribute.nodeName + " " + node_attribute.nodeValue;

          value_tag = objChild.textContent;

          param_link = {
            value: value_tag,
            id: id_tag,
            property: param,
          };

          return this.onLink_SetAttribute(tag, param_link);
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
          value = objChild.textContent;
          value = value.replace(/seterip/g, "-");
          return (
            <Text key={id} style={{ flexWrap: "wrap", color:this.TEXT_COLOR }}>
              {value}{" "}
            </Text>
          );
        }
      case "biblex":
        textvalue = objChild.textContent;
        textvalue = textvalue.replace(/seterip/g, "-");
        node_attribute = objChild.attributes[0];
        node_attributeVerse = objChild.attributes[1];
        verse_id = "";
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong" &&
          !COMethods.isObjectEmpty(node_attributeVerse) &&
          node_attributeVerse.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;

          verse_id = node_attributeVerse.nodeValue;

          let strong_text = objChild.textContent.match(
            /([A-Za-z"“”,.;!']|\s)*/g
          );
          if (!COMethods.isObjectEmpty(strong_text)) {
            for (var idx = 0; idx < strong_text.length; idx++) {
              if (!COMethods.isStringEmpty(strong_text[idx])) {
                value_tag += " " + strong_text[idx];
              }
            }
          }

          let list_strong_id = id_tag.split(",");
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttributeBiblex(
          tag,
          param_link,
          textvalue,
          verse_id
        );
        break;
      case "verse":
        if (!this.is_vref_only) {
          textvalue = objChild.textContent;
          textvalue = textvalue.replace(/seterip/g, "-");

          node_attribute = objChild.attributes[0];
          node_attributeVerse = objChild.attributes[1];
          verse_id = textvalue;

          id_tag = node_attribute.nodeValue;
          value_tag = objChild.textContent;

          return this.onLink_SetAttributeVerseNumber(
            id_tag,
            param_link,
            textvalue,
            verse_id
          );
        } else {
          return this.ParserTagVerseNumber(objChild, param);
          break;
        }
      default:
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return this.ParserTagDiscovery(objChild, param);
    }
  }

  RenderTagBiblexJesus(tag, objChild, param) {
    // let storeBible = this.props.STORE_BIBLE;
    //let stoMenuBible = storeBible.MENU_BIBLE;

    let objStyle = this.onGetTagName(tag);
    let id = COMethods.getUniqueId(tag);
    let node_attribute,
      nodeValue,
      id_tag = 0,
      value_tag = "";
    let param_link = {},
      objAttr = {};

    let node_attributeVerse = objChild.attributes[1];
    let verse_id = "";
    if (tag === "br") this.countBR++;
    else this.countBR = 0;

    switch (tag) {
      case "inlineview":
        return (
          <View
            key={id}
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              display: "flex",
              paddingBottom: 70,
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );
        break;
      case "var":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        var regexremove = /(<([^>]+)>)/gi;
        value = value.replace(regexremove, "");
        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap",color:this.TEXT_COLOR, fontWeight: "normal" }}
          >
            {value}
          </Text>
        );
        break;
      case "br":
        return <Text key={id}>{"\n"}</Text>;
        break;

      case "j":
        if (this.is_vref_only)
          return (
            <Text key={id} style={{ color:this.TEXT_COLOR}}>
              {this.ParserTagBiblexJesus(objChild, param)}
            </Text>
          );
        else
          return (
            <Text key={id} style={{ color:this.TEXT_COLOR_JESUS }}>
              {this.ParserTagBiblexJesus(objChild, param)}
            </Text>
          );
        break;
      case "pericope":
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        if (this.is_show_pericopes) {
          return (
            <View
              key={id}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingBottom: 3,
                paddingTop: 3,
              }}
            >
              {this.ParserTagPericope(objChild, param)}
            </View>
          );
        } else {
          return <View key={id}></View>;
        }
        break;
      case "quote":
      case "poetry":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 10,
              color:this.TEXT_COLOR,
              flexWrap: "wrap",
            }}
          >
            {this.ParserTagPoetry(objChild, param)}
          </View>
        );
      case "bookchp":
      case "bookchplink":
      case "pericopelink":
      case "subtitle":

      case "para":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            <Text style={{ textAlign: "left", lineHeight: 30, paddingTop: 5 }}>
              {this.ParserTagBiblex(objChild, param)}
            </Text>
          </View>
        );

        break;
      case "versetext":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );

      case "p":
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          "p",
          objAttr,
          this.ParserTag(objChild, param)
        );
      case "table":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, { table_id: id, is_from_table: true })
        );
      case "caption":
      case "thead":
      case "tbody":
      case "tfoot":
      case "tr":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.tr_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "td":
      case "th":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.td_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "col":
      case "colgroup":
      case "ul":
      case "ol":
      case "li":
      case "sub":
      case "sup":
        return (
          <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );

        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "vref":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeVref(tag, param_link);
        return this.onLink_SetAttribute(tag, param_link);
      case "xref": //same like cmt tag
      case "cmt":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "entry_code" ||
            node_attribute.nodeName === "subentry_code")
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;
        value_tag = "*";
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeWithSpace(tag, param_link);
        break;
      case "entity":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);

      case "lex":
        node_attribute = objChild.attributes[0];
        let translit = "";
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
            if (!COMethods.isStringEmpty(split[1])) translit = " " + split[1];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag + translit,
          id: id_tag,
          property: param,
        };

        objAttr.key = id;
        objAttr.onClick = (e) => {
          this.onLex_MouseClick(id_tag);
          e.preventDefault();
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "louwnida":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "lex_def":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "strong" ||
            node_attribute.nodeName === "code")
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "hebrew":
      case "greek":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          id_tag = node_attribute.nodeName + " " + node_attribute.nodeValue;

          value_tag = objChild.textContent;

          param_link = {
            value: value_tag,
            id: id_tag,
            property: param,
          };

          return this.onLink_SetAttribute(tag, param_link);
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
          value = objChild.textContent;
          value = value.replace(/seterip/g, "-");
          return (
            <Text key={id} style={{ flexWrap: "wrap", color: "#353535" }}>
              {value}{" "}
            </Text>
          );
        }
      case "biblex":
        node_attribute = objChild.attributes[0];
        textvalue = objChild.textContent;
        textvalue = textvalue.replace(/seterip/g, "-");
        let node_attributeVerse = objChild.attributes[1];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong" &&
          !COMethods.isObjectEmpty(node_attributeVerse) &&
          node_attributeVerse.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          let verse_id = node_attributeVerse.nodeValue;

          let strong_text = objChild.textContent.match(
            /([A-Za-z"“”,.;!']|\s)*/g
          );
          if (!COMethods.isObjectEmpty(strong_text)) {
            for (var idx = 0; idx < strong_text.length; idx++) {
              if (!COMethods.isStringEmpty(strong_text[idx])) {
                value_tag += " " + strong_text[idx];
              }
            }
          }

          let list_strong_id = id_tag.split(",");
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttributeBiblexJesus(tag, textvalue, param_link);

      case "verse":
        textvalue = objChild.textContent;
        value = value.replace(/seterip/g, "-");

        node_attribute = objChild.attributes[0];
        node_attributeVerse = objChild.attributes[1];
        verse_id = textvalue;

        id_tag = node_attribute.nodeValue;
        value_tag = objChild.textContent;

        return this.onLink_SetAttributeVerseNumber(
          id_tag,
          param_link,
          textvalue,
          verse_id
        );

        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          value_tag = objChild.textContent;
          objAttr.key = id;
          objAttr.className = objStyle.classname + " " + id_tag;
          if (!this.is_print) {
            objAttr.onClick = (e) => {
              this.onVerse_MouseClick(id_tag, value_tag);
              e.preventDefault();
            };
          }
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }

        return this.ParserTagVerseNumber(objChild, param);

      default:
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return this.ParserTagDiscovery(objChild, param);
    }
  }
  RenderTagBibleTextOnly(tag, objChild, param) {
    // let storeBible = this.props.STORE_BIBLE;
    //let stoMenuBible = storeBible.MENU_BIBLE;

    let objStyle = this.onGetTagName(tag);
    let id = COMethods.getUniqueId(tag);
    let node_attribute,
      nodeValue,
      id_tag = 0,
      value_tag = "";
    let param_link = {},
      objAttr = {};
    if (tag === "br") this.countBR++;
    else this.countBR = 0;

    switch (tag) {
      case "inlineview":
        return (
          <View
            key={id}
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              display: "flex",
              paddingBottom: 70,
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            {this.ParserTagBibleTextOnly(objChild, param)}
          </View>
        );
        break;
      case "var":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        var regexremove = /(<([^>]+)>)/gi;
        value = value.replace(regexremove, "");
        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap", color:this.TEXT_COLOR, fontWeight: "normal" }}
          >
            {value}
          </Text>
        );
        break;
      case "br":
        return <Text key={id}>{"\n"}</Text>;
        break;

      case "j":
        if (this.is_vref_only)
          return (
            <Text key={id} style={{color:this.TEXT_COLOR}}>
              {this.ParserTagBiblexJesus(objChild, param)}
            </Text>
          );
        else
          return (
            <Text key={id} style={{color:this.TEXT_COLOR_JESUS }}>
              {this.ParserTagBiblexJesus(objChild, param)}
            </Text>
          );
        break;
      case "pericope":
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        if (this.is_show_pericopes) {
          return (
            <View
              key={id}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingBottom: 3,
                paddingTop: 3,
              }}
            >
              {this.ParserTagPericope(objChild, param)}
            </View>
          );
        } else {
          return <View key={id}></View>;
        }
        break;
      case "quote":
      case "poetry":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 10,

              flexWrap: "wrap",
            }}
          >
            {this.ParserTagPoetry(objChild, param)}
          </View>
        );
      case "bookchp":
      case "bookchplink":
      case "pericopelink":
      case "subtitle":

      case "para":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            <Text style={{ textAlign: "left", lineHeight: 27 }}>
              {this.ParserTagBibleTextOnly(objChild, param)}
            </Text>
          </View>
        );

        break;
      case "versetext":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {this.ParserTagBibleTextOnly(objChild, param)}
          </View>
        );

      case "p":
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          "p",
          objAttr,
          this.ParserTag(objChild, param)
        );
      case "table":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, { table_id: id, is_from_table: true })
        );
      case "caption":
      case "thead":
      case "tbody":
      case "tfoot":
      case "tr":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.tr_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "td":
      case "th":
        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.id = id;
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        param.td_id = id;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "col":
      case "colgroup":
      case "ul":
      case "ol":
      case "li":
      case "sub":
      case "sup":
        return (
          <View key={id} style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.ParserTagBibleTextOnly(objChild, param)}
          </View>
        );

        objAttr = this.onGetTagAttrFromSTR(objChild);
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return React.createElement(
          tag,
          objAttr,
          this.ParserTag(objChild, param)
        );

      case "vref":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        var regexremove = /(<([^>]+)>)/gi;
        value = value.replace(regexremove, "");
        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap", color:this.TEXT_COLOR, fontWeight: "normal" }}
          >
            {value}
          </Text>
        );
        return this.onLink_SetAttributeVref(tag, param_link);
        return this.onLink_SetAttribute(tag, param_link);
      case "xref": //same like cmt tag
      case "cmt":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "entry_code" ||
            node_attribute.nodeName === "subentry_code")
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;
        value_tag = "*";
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        var regexremove = /(<([^>]+)>)/gi;
        value = value.replace(regexremove, "");
        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap", color:this.TEXT_COLOR, fontWeight: "normal" }}
          ></Text>
        );
        return this.onLink_SetAttributeWithSpace(tag, param_link);
        break;
      case "entity":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);

      case "lex":
        node_attribute = objChild.attributes[0];
        let translit = "";
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          nodeValue = node_attribute.nodeValue;

          if (!COMethods.isStringEmpty(nodeValue)) {
            let split = nodeValue.split("|");
            id_tag = split[0];
            if (!COMethods.isStringEmpty(split[1])) translit = " " + split[1];
          }
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag + translit,
          id: id_tag,
          property: param,
        };

        objAttr.key = id;
        objAttr.onClick = (e) => {
          this.onLex_MouseClick(id_tag);
          e.preventDefault();
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "louwnida":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "id"
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "lex_def":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "strong" ||
            node_attribute.nodeName === "code")
        ) {
          id_tag = node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;

        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttribute(tag, param_link);
      case "hebrew":
      case "greek":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong"
        ) {
          id_tag = node_attribute.nodeName + " " + node_attribute.nodeValue;

          value_tag = objChild.textContent;

          param_link = {
            value: value_tag,
            id: id_tag,
            property: param,
          };

          return this.onLink_SetAttribute(tag, param_link);
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
          value = objChild.textContent;
          value = value.replace(/seterip/g, "-");
          return (
            <Text key={id} style={{ flexWrap: "wrap",color:this.TEXT_COLOR}}>
              {value}{" "}
            </Text>
          );
        }
      case "biblex":
        node_attribute = objChild.attributes[0];
        let node_attributeVerse = objChild.attributes[1];
        let verse_id = "";
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong" &&
          !COMethods.isObjectEmpty(node_attributeVerse) &&
          node_attributeVerse.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          verse_id = node_attributeVerse.nodeValue;

          let strong_text = objChild.textContent.match(
            /([A-Za-z"“”,.;!']|\s)*/g
          );
          if (!COMethods.isObjectEmpty(strong_text)) {
            for (var idx = 0; idx < strong_text.length; idx++) {
              if (!COMethods.isStringEmpty(strong_text[idx])) {
                value_tag += " " + strong_text[idx];
              }
            }
          }

          let list_strong_id = id_tag.split(",");
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        var regexremove = /(<([^>]+)>)/gi;
        value = value.replace(regexremove, "");
        return (
          <Text
            key={id}
            style={{ flexWrap: "wrap", color:this.TEXT_COLOR, fontWeight: "normal" }}
          >
            {value}
          </Text>
        );
        return this.onLink_SetAttributeBiblex(tag, param_link, verse_id);

      case "verse":
        textvalue = objChild.textContent;
        value = value.replace(/seterip/g, "-");

        node_attribute = objChild.attributes[0];
        node_attributeVerse = objChild.attributes[1];
        verse_id = textvalue;

        id_tag = node_attribute.nodeValue;
        value_tag = objChild.textContent;

        return this.onLink_SetAttributeVerseNumber(
          id_tag,
          param_link,
          textvalue,
          verse_id
        );
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          value_tag = objChild.textContent;
          objAttr.key = id;
          objAttr.className = objStyle.classname + " " + id_tag;
          if (!this.is_print) {
            objAttr.onClick = (e) => {
              this.onVerse_MouseClick(id_tag, value_tag);
              e.preventDefault();
            };
          }
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }

        return this.ParserTagVerseNumber(objChild, param);

      default:
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return this.ParserTagBibleTextOnly(objChild, param);
    }
  }
  RenderTagPoetry(tag, objChild, param) {
    // let storeBible = this.props.STORE_BIBLE;
    //let stoMenuBible = storeBible.MENU_BIBLE;

    let objStyle = this.onGetTagName(tag);
    let id = COMethods.getUniqueId(tag);
    let node_attribute,
      nodeValue,
      id_tag = 0,
      value_tag = "";
    let param_link = {},
      objAttr = {};

    if (tag === "br") this.countBR++;
    else this.countBR = 0;

    switch (tag) {
      case "inlineview":
        return (
          <View
            key={id}
            style={{
              flexDirection: "column",
              flexWrap: "wrap",
              display: "flex",
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );
        break;
      case "br":
        return <Text>{"\n"}</Text>;
        break;
      case "br2":
        return <Text key={id}> </Text>;
        break;
      case "pericope":
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        if (this.is_show_pericopes) {
          return (
            <View
              key={id}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingBottom: 3,
                paddingTop: 3,
              }}
            >
              {this.ParserTagPericope(objChild, param)}
            </View>
          );
        } else {
          return <View key={id}></View>;
        }
        break;
      case "b":
        value = objChild.textContent;
        value = value.replace(/seterip/g, "-");
        return (
          <Text
            key={id}
            style={{
              flexWrap: "wrap",
              color:this.TEXT_COLOR,
              fontFamily: "NotoSans-Bold",
            }}
          >
            {value}{" "}
          </Text>
        );
        break;
      case "quote":
      case "poetry":
        return (
          <View
            key={id}
            style={{
              flexDirection: "row",
              paddingLeft: 20,
              paddingRight: 10,

              flexWrap: "wrap",
            }}
          >
            {this.ParserTagPoetry(objChild, param)}
          </View>
        );
      case "bookchp":
      case "bookchplink":
      case "pericope":
      case "pericopelink":
      case "subtitle":

      case "para":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
              paddingBottom: 5,
              backgroundColor: this.BACKGROUND_COLOR
            }}
          >
            <Text style={{ textAlign: "left", lineHeight: 27 }}>
              {this.ParserTagBiblex(objChild, param)}
            </Text>
          </View>
        );

        break;
      case "paragraph":
        objAttr.key = id;
        objAttr.className = objStyle.classname;

        return (
          <View
            key={id}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              flex: 1,
              alignItems: "flex-start",
            }}
          >
            {this.ParserTagBiblex(objChild, param)}
          </View>
        );

        break;
      case "verse":
        textvalue = objChild.textContent;
        textvalue = textvalue.replace(/seterip/g, "-");

        node_attribute = objChild.attributes[0];
        node_attributeVerse = objChild.attributes[1];
        verse_id = textvalue;

        id_tag = node_attribute.nodeValue;
        value_tag = objChild.textContent;

        return this.onLink_SetAttributeVerseNumber(
          id_tag,
          param_link,
          textvalue,
          verse_id
        );
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          value_tag = objChild.textContent;
          objAttr.key = id;
          objAttr.className = objStyle.classname + " " + id_tag;
          if (!this.is_print) {
            objAttr.onClick = (e) => {
              this.onVerse_MouseClick(id_tag, value_tag);
              e.preventDefault();
            };
          }
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }

        return this.ParserTagVerseNumber(objChild, param);
      case "cmt":
        node_attribute = objChild.attributes[0];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          (node_attribute.nodeName === "entry_code" ||
            node_attribute.nodeName === "subentry_code")
        ) {
          id_tag = node_attribute.nodeName + "##" + node_attribute.nodeValue;
        }

        value_tag = objChild.textContent;
        value_tag = "*";
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };

        return this.onLink_SetAttributeWithSpace(tag, param_link);
      case "biblex":
        node_attribute = objChild.attributes[0];
        let verse_id = "";
        let node_attributeVerse = objChild.attributes[1];
        if (
          !COMethods.isObjectEmpty(node_attribute) &&
          node_attribute.nodeName === "strong" &&
          !COMethods.isObjectEmpty(node_attributeVerse) &&
          node_attributeVerse.nodeName === "vid"
        ) {
          id_tag = node_attribute.nodeValue;
          verse_id = node_attributeVerse.nodeValue;

          let strong_text = objChild.textContent.match(
            /([A-Za-z"“”,.;!']|\s)*/g
          );
          if (!COMethods.isObjectEmpty(strong_text)) {
            for (var idx = 0; idx < strong_text.length; idx++) {
              if (!COMethods.isStringEmpty(strong_text[idx])) {
                value_tag += " " + strong_text[idx];
              }
            }
          }

          let list_strong_id = id_tag.split(",");
        } else {
          objAttr.key = id;
          objAttr.className = objStyle.classname;
        }
        param_link = {
          value: value_tag,
          id: id_tag,
          property: param,
        };
        return this.onLink_SetAttribute_Poetry(tag, param_link, verse_id);
        return this.ParserTag(objChild, param);

      default:
        objAttr.key = id;
        objAttr.className = objStyle.classname;
        return this.ParserTagPoetry(objChild, param);
    }
  }
  onGetTagName(tag) {
    var objStyle = {};

    if (this.is_highlight && !this.list_tag_exception.includes(tag))
      return objStyle;

    switch (tag) {
      case "para":
        objStyle.key = "para";
        if (this.onlyverse) objStyle.classname = "clsParagraph_onlyverse";
        else objStyle.classname = "clsParagraph";
        break;
      case "table":
        objStyle.key = "table";
        objStyle.classname = "clsTable";
        break;
      case "thead":
        objStyle.key = "thead";
        //objStyle.classname = 'clsTable';
        break;
      case "tbody":
        objStyle.key = "tbody";
        //objStyle.classname = 'clsTable';
        break;
      case "tfoot":
        objStyle.key = "tfoot";
        //objStyle.classname = 'clsTable';
        break;
      case "caption":
        objStyle.key = "caption";
        //objStyle.classname = 'clsTable';
        break;
      case "col":
        objStyle.key = "col";
        //objStyle.classname = 'clsTable';
        break;
      case "colgroup":
        objStyle.key = "colgroup";
        //objStyle.classname = 'clsTable';
        break;

      case "tr":
        objStyle.key = "tr";
        //objStyle.classname = 'clsTable';
        break;
      case "th":
        objStyle.key = "th";
        //objStyle.classname = 'clsTable';
        break;
      case "td":
        objStyle.key = "td";
        //objStyle.classname = 'clsTable';
        break;
      case "quote":
        objStyle.key = "quote";
        if (this.onlyverse) objStyle.classname = "clsQuote_onlyverse";
        else objStyle.classname = "clsQuote";
        break;
      case "poetry":
        objStyle.key = "poetry";
        if (this.onlyverse) objStyle.classname = "clsPoetry_onlyverse";
        else objStyle.classname = "clsPoetry";
        break;

      case "ul":
        objStyle.key = "ul";
        objStyle.classname = "clsUL";
        break;
      case "ol":
        objStyle.key = "ol";
        objStyle.classname = "clsOL";
        break;
      case "li":
        objStyle.key = "li";
        //objStyle.classname = 'clsLI';
        break;
      case "br":
        objStyle.key = "br";
        objStyle.classname = "clsBR";
        break;
      case "sup":
        objStyle.key = "sup";
        objStyle.classname = "clsSup";
        break;
      case "sub":
        objStyle.key = "sub";
        objStyle.classname = "clsSub";
        break;
      case "b":
        objStyle.key = "bold";
        objStyle.classname = "clsBold";
        break;
      case "u":
        objStyle.key = "underline";
        objStyle.classname = "clsUnderline";
        break;
      case "i":
        objStyle.key = "italic";
        objStyle.classname = "clsItalic";
        break;
      case "hebrew":
      case "greek":
        objStyle.key = "grkhrw";
        objStyle.classname = "clsGrkhrw";
        break;
      case "vref":
        objStyle.key = "vref";
        objStyle.classname =
          "clsVref" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "xref":
        objStyle.key = "xref";
        objStyle.classname =
          "clsXref" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "cmt":
        objStyle.key = "cmt";
        objStyle.classname =
          "clsCmt" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "entity":
        objStyle.key = "entity";
        objStyle.classname =
          "clsEntity" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "lex":
        objStyle.key = "lex";
        objStyle.classname =
          "clsLex" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "lex_def":
        objStyle.key = "lex_def";
        objStyle.classname =
          "clsLexDef" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "louwnida":
        objStyle.key = "louwnida";
        objStyle.classname = "clsLouw";

        //  "clsLouw" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "biblex":
        objStyle.key = "biblelex";
        objStyle.classname = "clsBibleLex";
        break;

      case "bookchp":
        objStyle.key = "bookchp";
        objStyle.classname = "clsBookChapter";
        break;
      case "bookchplink":
        objStyle.key = "bookchplink";
        objStyle.classname = "clsBookChapter_link";
        break;

      case "pericope":
        objStyle.key = "pericope";
        objStyle.classname = "clsPericope";
        break;
      case "pericopelink":
        objStyle.key = "pericope_link";
        objStyle.classname = "clsPericope_link";
        break;

      case "subtitle":
        objStyle.key = "subtitle";
        objStyle.classname = "clsSubtitle";
        break;

      case "versetext":
        objStyle.key = "versetext";
        if (this.onlyverse) objStyle.classname = "clsVerseText_onlyverse";
        else objStyle.classname = "clsVerseText";
        break;

      case "verse":
        objStyle.key = "chapverse";
        objStyle.classname =
          "clsChapVerse" + (this.theme_color === "B" ? "Black" : "");
        break;
      case "j":
        objStyle.key = "JWord";
        objStyle.classname = "clsJWord";
        break;
      case "p":
        objStyle.key = "p";
        objStyle.classname = "clsP";
        break;
      case "eshigh":
        objStyle.key = "esHigh";
        objStyle.classname = "clsESHigh";
        break;
      case "bcprint":
        objStyle.key = "bcprint";
        objStyle.classname = "clsBCPrint";
        break;
      default:
        objStyle.key = "unkw";
        objStyle.classname = "";
        break;
    }
    return objStyle;
  }

  onGetTagAttrFromSTR(objChild) {
    var objAttr = {};
    if (!COMethods.isObjectEmpty(objChild)) {
      //NOT USED
      // if(!COMethods.isStringEmpty(objChild.className)){
      //   objAttr['className'] = objChild.className;
      // }

      if (!COMethods.isObjectEmpty(objChild).attributes) {
        if (objChild.attributes.length > 0) {
          for (let a in objChild.attributes) {
            let nodeName = objChild.attributes[a].nodeName;
            if (!COMethods.isStringEmpty(nodeName) && nodeName !== "length") {
              if (nodeName === "style") {
                objAttr[nodeName] = this.onGetTagStyleFromSTR(objChild);
              } else {
                nodeName = nodeName.replace(/cellpadding/gi, "cellPadding");
                nodeName = nodeName.replace(/cellspacing/gi, "cellSpacing");
                nodeName = nodeName.replace(/colspan/gi, "colSpan");
                nodeName = nodeName.replace(/class/gi, "className");
                objAttr[nodeName] = objChild.attributes[a].nodeValue;
              }
            }
          }
        }
      }
    }

    return objAttr;
  }
  onLink_SetAttributeVref(tag, param) {
    if (!COMethods.isObjectEmpty(param)) {
      let objAttr = {};
      let value = param.value,
        id = param.id;

      if (!COMethods.isStringEmpty(value) && !COMethods.isStringEmpty(id)) {
        if (COMethods.isObjectEmpty(this.list_hover_attr[id]))
          this.list_hover_attr[id] = {};

        let objStyle = this.onGetTagName(tag);
        let span_id = COMethods.getUniqueId(objStyle.key);
        let classname = objStyle.classname;

        let contparam = {
          type: objStyle.key,
          id: id,
          span_id: span_id,
        };

        if (!COMethods.isObjectEmpty(param.property)) {
          if (!COMethods.isObjectEmpty(param.property.is_from_table))
            contparam.is_from_table = true;
          if (!COMethods.isObjectEmpty(param.property.table_id))
            contparam.table_id = param.property.table_id;
          if (!COMethods.isObjectEmpty(param.property.tr_id))
            contparam.tr_id = param.property.tr_id;
          if (!COMethods.isObjectEmpty(param.property.td_id))
            contparam.td_id = param.property.td_id;

          if (!COMethods.isObjectEmpty(param.property.id_hover_link))
            contparam.id_hover_link = param.property.id_hover_link;
        }
        value = value.replace(/seterip/g, "-");
        objAttr.id = span_id;
        objAttr.key = span_id;
        objAttr.className = classname;

        var { ClickReaction } = this.props;
        return (
          <Text
            key={span_id + id}
            style={{ color:this.TEXT_COLOR_URL, display: "flex" }}
            onPress={() => {
              ClickReaction(classname + "|" + id + "|" + value, this.props);
            }}
          >
            {" "}
            {value}{" "}
          </Text>
        );
      }
    }
  }
  onLink_SetAttribute(tag, param) {
    if (!COMethods.isObjectEmpty(param)) {
      let objAttr = {};
      let value = param.value,
        id = param.id;

      if (!COMethods.isStringEmpty(value) && !COMethods.isStringEmpty(id)) {
        if (COMethods.isObjectEmpty(this.list_hover_attr[id]))
          this.list_hover_attr[id] = {};

        let objStyle = this.onGetTagName(tag);
        let span_id = COMethods.getUniqueId(objStyle.key);
        let classname = objStyle.classname;

        let contparam = {
          type: objStyle.key,
          id: id,
          span_id: span_id,
        };

        if (!COMethods.isObjectEmpty(param.property)) {
          if (!COMethods.isObjectEmpty(param.property.is_from_table))
            contparam.is_from_table = true;
          if (!COMethods.isObjectEmpty(param.property.table_id))
            contparam.table_id = param.property.table_id;
          if (!COMethods.isObjectEmpty(param.property.tr_id))
            contparam.tr_id = param.property.tr_id;
          if (!COMethods.isObjectEmpty(param.property.td_id))
            contparam.td_id = param.property.td_id;

          if (!COMethods.isObjectEmpty(param.property.id_hover_link))
            contparam.id_hover_link = param.property.id_hover_link;
        }
        if (value.substring(0) === "")
          value = value.substring(1).replace(/seterip/g, "-");
        else value = value.substring(0).replace(/seterip/g, "-");
        objAttr.id = span_id;
        objAttr.key = span_id;
        objAttr.className = classname;

        var { ClickReaction } = this.props;
        return (
          <Text
            key={span_id}
            style={{ color:this.TEXT_COLOR_URL }}
            onPress={() => {
              ClickReaction(classname + "|" + id + "|" + value, this.props);
            }}
          >
            {value}
          </Text>
        );
      }
    }
  }
  onLink_SetAttributeVerseNumber(vid, param, textvalue, verse_id) {
    if (!COMethods.isObjectEmpty(param)) {
      let objAttr = {};
      let value = param.value,
        id = param.id;
      let textindo = false;
      if (
        this.bibleversion.toLowerCase() == "tb" ||
        this.bibleversion.toLowerCase() == "ayt" ||
        this.bibleversion.toLowerCase() == "avb"
      ) {
        textindo = true;
        value = param.value;
      } else value = textvalue;

      let span_id = COMethods.getUniqueId(vid);
      this.textclick.push({ id: vid, span_id: span_id });
      let ok = true;
      if (
        verse_id.includes(":10") ||
        verse_id.includes(":11") ||
        verse_id.includes(":12") ||
        verse_id.includes(":13") ||
        verse_id.includes(":14") ||
        verse_id.includes(":15") ||
        verse_id.includes(":16") ||
        verse_id.includes(":17") ||
        verse_id.includes(":18") ||
        verse_id.includes(":19")
      ) {
        ok = false;
      }

      var { ClickReaction3 } = this.props;
      if (
        this.is_line_view ||
        textindo ||
        this.bibleversion.toLowerCase() === "net"
      ) {
        return (
          <Text
            ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
            key={span_id}
            onPress={() => {
              this.clearTextVerseNumber(span_id, true, vid);
              ClickReaction3(vid + "|" + value, this.props);
            }}
            style={{ color:this.TEXT_COLOR_URL, textAlign: "left" }}
          >
            {verse_id}{" "}
          </Text>
        );
      } else if (ok && !this.is_line_view && verse_id.includes(":1")) {
        return (
          <Text
            ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
            key={span_id}
            onPress={() => {
              this.clearTextVerseNumber(span_id, true, vid);
              ClickReaction3(vid + "|" + value, this.props);
            }}
            style={{ color:this.TEXT_COLOR_URL, textAlign: "left" }}
          >
            {verse_id}{" "}
          </Text>
        );
      } else {
        return (
          <Text
            ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
            key={span_id}
            onPress={() => {
              this.clearTextVerseNumber(span_id, true, vid);
              ClickReaction3(vid + "|" + value, this.props);
            }}
            style={{ color:this.TEXT_COLOR_URL, textAlign: "left" }}
          >
            {" "}
            {verse_id}{" "}
          </Text>
        );
      }
    }
  }
  onLink_SetAttributeBiblex(tag, param, textvalue, verse_id) {
    if (!COMethods.isObjectEmpty(param)) {
      let objAttr = {};
      let value = param.value,
        id = param.id;
      if (
        this.bibleversion.toLowerCase() == "tb" ||
        this.bibleversion.toLowerCase() == "ayt" ||
        this.bibleversion.toLowerCase() == "avb"
      )
        value = param.value;
      else value = textvalue;

      if (!COMethods.isStringEmpty(value) && !COMethods.isStringEmpty(id)) {
        if (COMethods.isObjectEmpty(this.list_hover_attr[id]))
          this.list_hover_attr[id] = {};

        let objStyle = this.onGetTagName(tag);
        let span_id = COMethods.getUniqueId(objStyle.key);
        let classname = objStyle.classname;

        let contparam = {
          type: objStyle.key,
          id: id,
          span_id: span_id,
        };

        if (!COMethods.isObjectEmpty(param.property)) {
          if (!COMethods.isObjectEmpty(param.property.is_from_table))
            contparam.is_from_table = true;
          if (!COMethods.isObjectEmpty(param.property.table_id))
            contparam.table_id = param.property.table_id;
          if (!COMethods.isObjectEmpty(param.property.tr_id))
            contparam.tr_id = param.property.tr_id;
          if (!COMethods.isObjectEmpty(param.property.td_id))
            contparam.td_id = param.property.td_id;

          if (!COMethods.isObjectEmpty(param.property.id_hover_link))
            contparam.id_hover_link = param.property.id_hover_link;
        }

        objAttr.id = span_id;
        objAttr.key = span_id;

        this.textclick.push({ id: id, span_id: span_id });
        objAttr.className = classname;
        if (value.substring(0) === "")
          value = value.substring(1).replace(/seterip/g, "-");
        else value = value.substring(0).replace(/seterip/g, "-");

        var { ClickReaction } = this.props;

        value = value.replace(/\*/g, "");

        if (this.is_vref_only) {
          return (
            <Text key={span_id} style={{ color:this.TEXT_COLOR, textAlign: "left" }}>
              {value}
            </Text>
          );
        } else if (this.is_show_highlight) {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                this.clearText(span_id, this.is_show_highlight, id);
                ClickReaction(
                  classname + "|" + id + "|" + value + "|" + verse_id,
                  this.props
                );
              }}
              style={{ color:this.TEXT_COLOR_URL, textAlign: "left" }}
            >
              {value}
            </Text>
          );
        } else {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                this.clearText(span_id, this.is_show_highlight, id);
                ClickReaction(
                  classname + "|" + id + "|" + value + "|" + verse_id,
                  this.props
                );
              }}
              style={{ color:this.TEXT_COLOR, textAlign: "left" }}
            >
              {value}
            </Text>
          );
        }
      }
    }
  }
  clearTextVerseNumber(span_id, is_show_highlight, id) {
    const item_id = "item-" + span_id;
    this[item_id].setNativeProps({
      style: { color:this.TEXT_COLOR, backgroundColor: "yellow" },
    });

    setTimeout(() => {
      this[item_id].setNativeProps({
        style: { color:this.TEXT_COLOR_URL, backgroundColor: "#fff" },
      });
    }, 1500);
  }
  clearText(span_id, is_show_highlight, id) {
    for (let x = 0; x < this.textclick.length; x++) {


      if (this.textclick[x].id === id) {
        const item_id = "item-" + this.textclick[x].span_id;
        this[item_id].setNativeProps({
          style: {color:this.TEXT_COLOR, backgroundColor: "yellow" },
        });

        if (is_show_highlight)
          setTimeout(() => {
            this[item_id].setNativeProps({
              style: { color:this.TEXT_COLOR_URL, backgroundColor: "#fff" },
            });
          }, 1500);
        else
          setTimeout(() => {
            this[item_id].setNativeProps({
              style: { color:this.TEXT_COLOR, backgroundColor: "#fff" },
            });
          }, 1500);
      }
    }
  }
  onLink_SetAttributeBiblexJesus(tag, textvalue, param) {
    if (!COMethods.isObjectEmpty(param)) {
      let objAttr = {};
      let value = param.value,
        id = param.id;
      if (
        this.bibleversion.toLowerCase() == "tb" ||
        this.bibleversion.toLowerCase() == "ayt" ||
        this.bibleversion.toLowerCase() == "avb"
      )
        value = param.value;
      else value = textvalue;

      if (!COMethods.isStringEmpty(value) && !COMethods.isStringEmpty(id)) {
        if (COMethods.isObjectEmpty(this.list_hover_attr[id]))
          this.list_hover_attr[id] = {};

        let objStyle = this.onGetTagName(tag);
        let span_id = COMethods.getUniqueId(objStyle.key);
        let classname = objStyle.classname;

        let contparam = {
          type: objStyle.key,
          id: id,
          span_id: span_id,
        };

        if (!COMethods.isObjectEmpty(param.property)) {
          if (!COMethods.isObjectEmpty(param.property.is_from_table))
            contparam.is_from_table = true;
          if (!COMethods.isObjectEmpty(param.property.table_id))
            contparam.table_id = param.property.table_id;
          if (!COMethods.isObjectEmpty(param.property.tr_id))
            contparam.tr_id = param.property.tr_id;
          if (!COMethods.isObjectEmpty(param.property.td_id))
            contparam.td_id = param.property.td_id;

          if (!COMethods.isObjectEmpty(param.property.id_hover_link))
            contparam.id_hover_link = param.property.id_hover_link;
        }

        objAttr.id = span_id;
        objAttr.key = span_id;
        objAttr.className = classname;
        if (value.substring(0) === "")
          value = value.substring(1).replace(/seterip/g, "-");
        else value = value.substring(0).replace(/seterip/g, "-");
        var { ClickReaction } = this.props;
        if (this.is_vref_only) {
          return (
            <Text key={span_id} style={{color:this.TEXT_COLOR, textAlign: "left" }}>
              {value}
            </Text>
          );
        } else if (this.is_show_highlight) {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                this.clearText(span_id, this.is_show_highlight);
                ClickReaction(classname + "|" + id + "|" + value, this.props);
              }}
              style={{ color:this.TEXT_COLOR_URL , textAlign: "left" }}
            >
              {value}
            </Text>
          );
        } else {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                this.clearTextJesus(span_id, this.is_show_highlight);
                ClickReaction(classname + "|" + id + "|" + value, this.props);
              }}
              style={{color:this.TEXT_COLOR_JESUS, textAlign: "left" }}
            >
              {value}
            </Text>
          );
        }
      }
    }
  }
  clearTextJesus(span_id, is_show_highlight) {
    const item_id = "item-" + span_id;
    this[item_id].setNativeProps({
      style: { color:this.TEXT_COLOR, backgroundColor: "yellow" },
    });

    if (is_show_highlight)
      setTimeout(() => {
        this[item_id].setNativeProps({
          style: { color:this.TEXT_COLOR_URL, backgroundColor: "#fff" },
        });
      }, 1000);
    else
      setTimeout(() => {
        this[item_id].setNativeProps({
          style: { color:this.TEXT_COLOR_JESUS, backgroundColor: "#fff" },
        });
      }, 1000);
  }
  onLink_SetAttributeWithSpace(tag, param) {
    if (!COMethods.isObjectEmpty(param)) {
      let objAttr = {};
      let value = param.value,
        id = param.id;

      if (!COMethods.isStringEmpty(value) && !COMethods.isStringEmpty(id)) {
        if (COMethods.isObjectEmpty(this.list_hover_attr[id]))
          this.list_hover_attr[id] = {};

        let objStyle = this.onGetTagName(tag);
        let span_id = COMethods.getUniqueId(objStyle.key);
        let classname = objStyle.classname;

        let contparam = {
          type: objStyle.key,
          id: id,
          span_id: span_id,
        };

        if (!COMethods.isObjectEmpty(param.property)) {
          if (!COMethods.isObjectEmpty(param.property.is_from_table))
            contparam.is_from_table = true;
          if (!COMethods.isObjectEmpty(param.property.table_id))
            contparam.table_id = param.property.table_id;
          if (!COMethods.isObjectEmpty(param.property.tr_id))
            contparam.tr_id = param.property.tr_id;
          if (!COMethods.isObjectEmpty(param.property.td_id))
            contparam.td_id = param.property.td_id;

          if (!COMethods.isObjectEmpty(param.property.id_hover_link))
            contparam.id_hover_link = param.property.id_hover_link;
        }
        if (value.substring(0) === "")
          value = value.substring(1).replace(/seterip/g, "-");
        else value = value.substring(0).replace(/seterip/g, "-");
        objAttr.id = span_id;
        objAttr.key = span_id;
        objAttr.className = classname;
        if (!this.is_show_notes) {
          return <Text key={id}> </Text>;
        } else {
          var { ClickReaction } = this.props;
          return (
            <Text
              key={span_id}
              onPress={() => {
                ClickReaction(classname + "|" + id + "|" + value, this.props);
              }}
              style={{ color:this.TEXT_COLOR_URL }}
            >
              {" "}
              {value}{" "}
            </Text>
          );
        }
      }
    }
  }
  onLink_SetAttribute_Poetry(tag, param, verse_id) {
    if (!COMethods.isObjectEmpty(param)) {
      let objAttr = {};
      let value = param.value,
        id = param.id;

      if (!COMethods.isStringEmpty(value) && !COMethods.isStringEmpty(id)) {
        if (COMethods.isObjectEmpty(this.list_hover_attr[id]))
          this.list_hover_attr[id] = {};

        let objStyle = this.onGetTagName(tag);
        let span_id = COMethods.getUniqueId(objStyle.key);
        let classname = objStyle.classname;

        let contparam = {
          type: objStyle.key,
          id: id,
          span_id: span_id,
        };
        this.textclick.push({ id: id, span_id: span_id });
        if (!COMethods.isObjectEmpty(param.property)) {
          if (!COMethods.isObjectEmpty(param.property.is_from_table))
            contparam.is_from_table = true;
          if (!COMethods.isObjectEmpty(param.property.table_id))
            contparam.table_id = param.property.table_id;
          if (!COMethods.isObjectEmpty(param.property.tr_id))
            contparam.tr_id = param.property.tr_id;
          if (!COMethods.isObjectEmpty(param.property.td_id))
            contparam.td_id = param.property.td_id;

          if (!COMethods.isObjectEmpty(param.property.id_hover_link))
            contparam.id_hover_link = param.property.id_hover_link;
        }
        if (value.substring(0) === "")
          value = value.substring(1).replace(/seterip/g, "-");
        else value = value.substring(0).replace(/seterip/g, "-");
        objAttr.id = span_id;
        objAttr.key = span_id;
        objAttr.className = classname;

        var { ClickReaction } = this.props;
        if (this.is_show_highlight) {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                this.clearText(span_id, this.is_show_highlight, id);
                ClickReaction(
                  classname + "|" + id + "|" + value + "|" + verse_id,
                  this.props
                );
              }}
              style={{
                color:this.TEXT_COLOR_URL,
                fontStyle: "italic",
                paddingBottom: 10,
              }}
            >
              {value}
            </Text>
          );
        } else {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                this.clearText(span_id, this.is_show_highlight, id);
                ClickReaction(
                  classname + "|" + id + "|" + value + "|" + verse_id,
                  this.props
                );
              }}
              style={{
                color:this.TEXT_COLOR,
                fontStyle: "italic",
                paddingBottom: 10,
              }}
            >
              {value}
            </Text>
          );
        }
        if (this.is_show_highlight) {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                ClickReaction(classname + "|" + id + "|" + value, this.props);
              }}
              style={{
                color: "#105B8E",
                fontStyle: "italic",
                paddingBottom: 10,
              }}
            >
              {value}
            </Text>
          );
        } else {
          return (
            <Text
              ref={(thisItem) => (this[`item-${span_id}`] = thisItem)}
              key={span_id}
              onPress={() => {
                ClickReaction(classname + "|" + id + "|" + value, this.props);
              }}
              style={{
                color: "#353535",
                fontStyle: "italic",
                paddingBottom: 10,
              }}
            >
              {value}
            </Text>
          );
        }
      }
    }
  }
}
