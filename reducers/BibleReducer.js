const initialState = {
  SEARCH: {},
  LANG_CODE: "eng",
  BOOK_ID: "40",
  CHAPTER_NO: 1,
  BOOK_CHAPTER_CHANGE: true,
  ACTION_NO: "0",
  IS_LINE_VIEW: true,
  IS_SHOW_NOTES: true,
  IS_SHOW_PERICOPES: true,
  IS_SHOW_HIGHLIGHT: false,
  IS_SHOW_DARKMODE : false,
  BIBLE_PARALLEL: "TB",
  BIBLE_VERSION: "ESV",
  TEMP_BIBLE_VERSION: "",
  FONT_SIZE: "16",
  LEMMA: "",
  STRONG_NUMBER: "",
  WORD_STRONG: "",
  PARALLEL: "false",
  ORIGINAL_VERSION: "",
  SEARCH_LIMIT: "50",
  DAILY_BIBLE_START_DATE: "",
  DAILY_BIBLE_ID: "1",
  VREF_CHANGE: false,
  OFFLINE : false,
  CACHE_DATA: {
    dataset: [],
    isrender: true //default must be "false" before load page, after load it will be true
  }
};

export default (state = initialState, action) => {
  let result = {};

  switch (action.type) {
    case "SET_LANG_CHANGE":
      result = {
        ...state,
        LANG_CODE: action.data.lang_code
      };

      return result;

    case "SET_BOOK_ID":
      result = {
        ...state,
        BOOK_ID: action.data.book_id
      };

      return result;
    case "SET_CHAPTER_NO":
      result = {
        ...state,
        CHAPTER_NO: action.data.chapter_no
      };

      return result;

    case "SET_BOOK_CHAPTER_CHANGE":
      result = {
        ...state,
        BOOK_CHAPTER_CHANGE: action.data.book_chapter_change
      };

      return result;

    case "SET_IS_LINE_VIEW":
      result = {
        ...state,
        IS_LINE_VIEW: action.data.is_line_view
      };

      return result;

    case "SET_IS_SHOW_NOTES":
      result = {
        ...state,
        IS_SHOW_NOTES: action.data.is_show_notes
      };

      return result;

    case "SET_IS_SHOW_PERICOPES":
      result = {
        ...state,
        IS_SHOW_PERICOPES: action.data.is_show_pericopes
      };

      return result;

    case "SET_IS_SHOW_HIGHLIGHT":
      result = {
        ...state,
        IS_SHOW_HIGHLIGHT: action.data.is_show_highlight
      };

      return result;

      case "SET_IS_SHOW_DARKMODE":
        result = {
          ...state,
          IS_SHOW_DARKMODE: action.data.is_show_darkmode
        };
        return result;
        
    case "SET_FONT_SIZE":
      result = {
        ...state,
        FONT_SIZE: action.data.set_font_size
      };

      return result;

    case "SET_BIBLE_VERSION":
      result = {
        ...state,
        BIBLE_VERSION: action.data.set_bible_version
      };

      return result;
    case "SET_TEMP_BIBLE_VERSION":
      result = {
        ...state,
        TEMP_BIBLE_VERSION: action.data.set_temp_bible_version
      };

      return result;
    case "SET_BIBLE_PARALLEL":
      result = {
        ...state,
        BIBLE_PARALLEL: action.data.set_bible_parallel
      };

      return result;

    case "SET_LEMMA":
      result = {
        ...state,
        LEMMA: action.data.set_lemma
      };

      return result;

    case "SET_STRONG_NUMBER":
      result = {
        ...state,
        STRONG_NUMBER: action.data.set_strong_number
      };

      return result;

    case "SET_PARALLEL":
      result = {
        ...state,
        PARALLEL: action.data.set_parallel
      };

      return result;

    case "SET_ORIGINAL_VERSION":
      result = {
        ...state,
        ORIGINAL_VERSION: action.data.set_original_version
      };

      return result;

    case "SET_SEARCH_LIMIT":
      result = {
        ...state,
        SEARCH_LIMIT: action.data.set_search_limit
      };

      return result;

    case "SET_DAILY_BIBLE_START_DATE":
      result = {
        ...state,
        DAILY_BIBLE_START_DATE: action.data.set_daily_bible_start_date
      };

      return result;

    case "SET_DAILY_BIBLE_ID":
      result = {
        ...state,
        DAILY_BIBLE_ID: action.data.set_daily_bible_id
      };

      return result;

    case "SET_ACTION_NO":
      result = {
        ...state,
        ACTION_NO: action.data.set_action_no
      };

    return result;


    case "SET_VREF_CHANGE":
      result = {
        ...state,
        VREF_CHANGE: action.data.set_vref_change
      };

    return result;
    
    case "SET_OFFLINE":
        result = {
          ...state,
          OFFLINE: action.data.set_offline
        };
  
    return result;


    case "SET_CACHE_DATA":
      result = {
        ...state
      };
      result.CACHE_DATA.dataset[action.data.key] = action.data.list_data;
      result.CACHE_DATA.isrender = false;

      //return result
      return state;
    default:
      return state;
  }
};
