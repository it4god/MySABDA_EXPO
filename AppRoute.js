import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import HomeScreen from "./screens/HomeScreen";
import DrawerMenu from "./screens/DrawerMenu";
import DailyBible from "./screens/DailyBible";
import DailyReadingPlan from "./screens/DailyReadingPlan";

import Feedback from "./screens/Feedback";
import AboutUs from "./screens/AboutUs";
import BookChapterSelector from "./screens/Home/BookChapterSelector";
import ChapterSelector from "./screens/Home/ChapterSelector";
import Settings from "./screens/Home/Settings";
import AppLanguages from "./screens/AppLanguages";
import BibleVersion from "./screens/BibleVersion";
import ParallelBible from "./screens/ParallelBible";

import WordStudyScreen from "./screens/WordStudyScreen";
import SemanticDomain from "./screens/WordStudy/SemanticDomain";
import WordStudyDictionary from "./screens/WordStudy/WordStudyDictionary";
import SimilarHebrew from "./screens/WordStudy/SimilarHebrew";
import VerseOccurence from "./screens/WordStudy/VerseOccurence";
import Translations from "./screens/WordStudy/Translations";
import WordForms from "./screens/WordStudy/WordForms";

import DiscoveryScreen from "./screens/DiscoveryScreen";
import CommentaryScreen from "./screens/CommentaryScreen";
import DetailCommentaryScreen from "./screens/DetailCommentaryScreen";
import ChapterSummaryCommentaryScreen from "./screens/ChapterSummaryCommentaryScreen";
import BookSummaryCommentaryScreen from "./screens/BookSummaryCommentaryScreen";
import StrongCommentary from "./screens/StrongCommentary";
import VersePhraseCommentaryScreen from "./screens/VersePhraseCommentaryScreen";
import AdditionalResourceCommentary from "./screens/AdditionalResourceCommentary"

import CrossReferenceScreen from "./screens/CrossReferenceScreen";
import CrossReferenceVerse from "./screens/CrossReferenceVerse";

import EntityScreen from "./screens/EntityScreen";
import EntityBibleDictionary from "./screens/Entity/EntityBibleDictionary";
import EntityDetailBibleDictionary from "./screens/Entity/EntityDetailBibleDictionary";
import EntityBibleFact from "./screens/Entity/EntityBibleFact";
import EntityDetailBibleFact from "./screens/Entity/EntityDetailBibleFact";
import EntityCategory from "./screens/Entity/EntityCategory";
import EntityDetailCategory from "./screens/Entity/EntityDetailCategory";
import EntityLexicon from "./screens/Entity/EntityLexicon";

import ListEntityScreen from "./screens/ListEntityScreen";

import SearchScreen from "./screens/SearchScreen";
import QuestionAnswers from "./screens/Search/QuestionAnswers";
import EntityinBible from "./screens/Search/EntityinBible";
import EntityinCommentary from "./screens/Search/EntityinCommentary";
import EntityinDetailCommentary from "./screens/Search/EntityinDetailCommentary";
import EntityinDetailQuestionAnswers from "./screens/Search/EntityinDetailQuestionAnswers";
import EntityinDictionary from "./screens/Search/EntityinDictionary";
import EntityinDetailDictionary from "./screens/Search/EntityinDetailDictionary";
import EntityinLexicon from "./screens/Search/EntityinLexicon";

import More from "./screens/More";
import Download from "./screens/Download";

import OriginalLanguage from "./screens/OriginalLanguage";

import MediaScreen from "./screens/MediaScreen";
import DetailAudio from "./screens/DetailAudio";
import DetailYoutube from "./screens/DetailYoutube";

import VerseScreen from "./screens/VerseScreen";



const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Home: {
    screen: HomeScreen,
  },
  DrawerMenu: {
    screen: DrawerMenu,
  },
  DailyBible: {
    screen: DailyBible,
  },
  DailyReadingPlan: {
    screen: DailyReadingPlan,
  },
  Feedback: {
    screen: Feedback,
  },
  AboutUs: {
    screen: AboutUs,
  },
  BookChapterSelector: {
    screen: BookChapterSelector,
  },
  ChapterSelector: {
    screen: ChapterSelector,
  },
  Settings: {
    screen: Settings,
  },
  AppLanguages: {
    screen: AppLanguages,
  },
  BibleVersion: {
    screen: BibleVersion,
  },
  ParallelBible: {
    screen: ParallelBible,
  },

  WordStudy: {
    screen: WordStudyScreen,
  },
  SemanticDomain: {
    screen: SemanticDomain,
  },
  WordStudyDictionary: {
    screen: WordStudyDictionary,
  },
  SimilarHebrew: {
    screen: SimilarHebrew,
  },
  VerseOccurence: {
    screen: VerseOccurence,
  },
  Translations: {
    screen: Translations,
  },
  WordForms: {
    screen: WordForms,
  },

  Discovery: {
    screen: DiscoveryScreen,
  },
  Commentary: {
    screen: CommentaryScreen,
  },
  DetailCommentary: {
    screen: DetailCommentaryScreen,
  },
  ChapterSummaryCommentary: {
    screen: ChapterSummaryCommentaryScreen,
  },
  BookSummaryCommentary: {
    screen: BookSummaryCommentaryScreen,
  },
  StrongCommentary: {
    screen: StrongCommentary,
  },
  VersePhraseCommentaryScreen:{
    screen : VersePhraseCommentaryScreen
  },
  AdditionalResourceCommentary :{
    screen:AdditionalResourceCommentary
  },
  CrossReference: {
    screen: CrossReferenceScreen,
  },
  CrossReferenceVerse: {
    screen: CrossReferenceVerse,
  },
  Entity: {
    screen: EntityScreen,
  },

  EntityBibleDictionary: {
    screen: EntityBibleDictionary,
  },
  EntityDetailBibleDictionary: {
    screen: EntityDetailBibleDictionary,
  },
  EntityBibleFact: {
    screen: EntityBibleFact,
  },
  EntityDetailBibleFact: {
    screen: EntityDetailBibleFact,
  },
  EntityCategory: {
    screen: EntityCategory,
  },
  EntityDetailCategory: {
   screen: EntityDetailCategory,
  },

  EntityLexicon: {
    screen: EntityLexicon,
  },

  ListEntityScreen: {
    screen: ListEntityScreen,
  },

  Search: {
    screen: SearchScreen,
  },
  QuestionAnswers: {
    screen: QuestionAnswers,
  },
  EntityinDetailQuestionsAnswers: {
    screen: EntityinDetailQuestionAnswers,
  },
  EntityinBible: {
    screen: EntityinBible,
  },
  EntityinCommentary: {
    screen: EntityinCommentary,
  },
  EntityinDetailCommentary: {
    screen: EntityinDetailCommentary,
  },
  EntityinDictionary: {
    screen: EntityinDictionary,
  },
  EntityinDetailDictionary: {
    screen: EntityinDetailDictionary,
  },
  EntityinLexicon: {
    screen: EntityinLexicon,
  },
  More: {
    screen: More,
  },
  Download: {
    screen: Download,
  },
  OriginalLanguage: {
    screen: OriginalLanguage,
  },

  MediaScreen: {
    screen: MediaScreen,
  },
  DetailAudio: {
    screen: DetailAudio,
  },
  DetailYoutube: {
    screen: DetailYoutube,
  },
  VerseScreen: {
    screen: VerseScreen,
  },

  initialRouteName: "Home",
  
}, {
  navigationOptions: {
    headerTransparent: true,
  }
});
const entry = createStackNavigator({
  HomeScreen,
  Settings,

});
const DrawerNavigator = createDrawerNavigator({
  FirstActivity_StackNavigator,
});

const AppStack = createAppContainer(FirstActivity_StackNavigator);
export default class AppRoute extends React.Component {
  render() {
    return <AppStack />;
  }
}
