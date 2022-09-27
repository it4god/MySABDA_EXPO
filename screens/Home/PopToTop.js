import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import * as BibleAction from "../../actions/BibleAction";
import { StackActions } from 'react-navigation';
class PopToTop extends Component {
  toggleDrawer = () => {

    
    this.props.myNavigation.navigate('Home')
  };
  render() {
    
    return (

      <View style={{ flexDirection: "row", paddingRight: 30 }}>
        {!this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Image
              source={require("../../assets/images/cross.png")}
              style={{ width: 15, height: 15, marginLeft: 8 }}
            />
          
        </TouchableOpacity>
        )}
        {this.props.STORE_BIBLE.IS_SHOW_DARKMODE&&(
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
            <Image
              source={require("../../assets/images/cross_darkmode.png")}
              style={{ width: 15, height: 15, marginLeft: 8 }}
            />
          
        </TouchableOpacity>
        )}
      </View>
    );
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(PopToTop);
