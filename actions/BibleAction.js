//import * as COMethods from '../common/COMethods';


export const setLangChange = (lang_code) => {
	return {
		type: 'SET_LANG_CHANGE',
		data: {
			lang_code: lang_code,
		}
	}

};
export const setBookID = (book_id) => {
	return {
		type: 'SET_BOOK_ID',
		data: {
			book_id: book_id,
		}
	}

};
export const setChapterNo = (chapter_no) => {
	return {
		type: 'SET_CHAPTER_NO',
		data: {
			chapter_no: chapter_no,
		}
	}

};
export const setBookChapterChange = (book_chapter_change) => {
	return {
		type: 'SET_BOOK_CHAPTER_CHANGE',
		data: {
			book_chapter_change: book_chapter_change,
		}
	}

};

export const setIsLineView = (is_line_view) => {
	return {
		type: 'SET_IS_LINE_VIEW',
		data: {
			is_line_view: is_line_view,
		}
	}

};
export const setIsShowNotes = (is_show_notes) => {
	return {
		type: 'SET_IS_SHOW_NOTES',
		data: {
			is_show_notes: is_show_notes,
		}
	}

};
export const setIsShowPericopes = (is_show_pericopes) => {
	return {
		type: 'SET_IS_SHOW_PERICOPES',
		data: {
			is_show_pericopes: is_show_pericopes,
		}
	}

};
export const setIsShowHighlight = (is_show_highlight) => {
	return {
		type: 'SET_IS_SHOW_HIGHLIGHT',
		data: {
			is_show_highlight: is_show_highlight,
		}
	}

};
export const setIsShowDarkMode = (is_show_darkmode) => {
	return {
		type: 'SET_IS_SHOW_DARKMODE',
		data: {
			is_show_darkmode: is_show_darkmode,
		}
	}

};
export const setFontSize = (set_font_size) => {
	return {
		type: 'SET_FONT_SIZE',
		data: {
			set_font_size: set_font_size,
		}
	}

};

export const setBibleVersion = (set_bible_version) => {
	return {
		type: 'SET_BIBLE_VERSION',
		data: {
			set_bible_version: set_bible_version,
		}
	}

};
export const setTempBibleVersion = (set_temp_bible_version) => {
	return {
		type: 'SET_TEMP_BIBLE_VERSION',
		data: {
			set_temp_bible_version: set_temp_bible_version,
		}
	}

};



export const setLemma = (set_lemma) => {
	return {
		type: 'SET_LEMMA',
		data: {
			set_lemma: set_lemma,
		}
	}

};

export const setStrongNumber = (set_strong_number) => {
	return {
		type: 'SET_STRONG_NUMBER',
		data: {
			set_strong_number: set_strong_number,
		}
	}

};
export const setWordStrong = (set_word_strong) => {
	return {
		type: 'SET_WORD_STRONG',
		data: {
			set_word_strong: set_word_strong,
		}
	}

};

export const setBibleParallel = (set_bible_parallel) => {
	return {
		type: 'SET_BIBLE_PARALLEL',
		data: {
			set_bible_parallel: set_bible_parallel,
		}
	}

};

export const setParallel = (set_parallel) => {
	return {
		type: 'SET_PARALLEL',
		data: {
			set_parallel: set_parallel,
		}
	}

};
export const setOriginalVersion = (set_original_version) => {
	return {
		type: 'SET_ORIGINAL_VERSION',
		data: {
			set_original_version: set_original_version,
		}
	}

};

export const setSearchLimit = (set_search_limit) => {
	return {
		type: 'SET_SEARCH_LIMIT',
		data: {
			set_search_limit: set_search_limit
		}
	}

};
export const SetDailyBibleStartDate = (set_daily_bible_start_date) => {
	return {
		type: 'SET_DAILY_BIBLE_START_DATE',
		data: {
			set_daily_bible_start_date: set_daily_bible_start_date
		}
	}
};
export const SetDailyBibleID = (set_daily_bible_id) => {
	return {
		type: 'SET_DAILY_BIBLE_ID',
		data: {
			set_daily_bible_id: set_daily_bible_id
		}
	}
};
export const SetActionNo = (set_action_no) => {
	return {
		type: 'SET_ACTION_NO',
		data: {
			set_action_no: set_action_no
		}
	}
};
export const SetVrefChange = (set_vref_change) => {
	return {
		type: 'SET_VREF_CHANGE',
		data: {
			set_vref_change: set_vref_change
		}
	}
};
export const SetOffline = (set_offline) => {
	return {
		type: 'SET_OFFLINE',
		data: {
			set_offline: set_offline
		}
	}
};



export const setCacheData = (key, list_data) => {
	return {
		type: 'SET_CACHE_DATA',
		data: {
			key: key,
			list_data: list_data
		}
	}
};












