const initialState = {

  DARK_MODE: false,

  BG_WHITE: "#FFFFFF",
  BG_DARK_MODE: "#1F2021",
  BG_LIGHT_GREY: "#F4F5F8",
  BG_DARK_GREY: "#151516",

  BORDER_COLOR_LIGHTMODE: "#D3D3D3",
  BORDER_COLOR_DARKMODE : "#2D2D2D",
  TEXT_DARK_GREY: "#353535",
  TEXT_LIGHT_GREY: "#DDDDDD",


  TEXT_BLUE_URL: "#105B8E",
  TEXT_BLUE_URL_DARK_MODE: "#4CA7E5",

  TEXT_JESUS_WORD: "BE4228",
  TEXT_JESUS_WORD_DARK_MODE: "#F07178",


  BACKGROUND_COLOR: "#FFFFFF",
  BACKGROUND_COLOR2: "#F4F5F8",
  TEXT_COLOR:  "#353535",
  BORDER_COLOR : "#D3D3D3",
  TEXT_COLOR_URL:"#105B8E",
  TEXT_COLOR_JESUS:"#BE4228",


};

export default (state = initialState, action) => {
  let result = {};

  switch (action.type) {
    case "SET_DARK_MODE":
      if (!action.data.set_dark_mode) {
        result = ({
          BACKGROUND_COLOR: initialState.BG_WHITE,
          BACKGROUND_COLOR2:  initialState.BG_LIGHT_GREY,
          TEXT_COLOR: initialState.TEXT_DARK_GREY,
          TEXT_COLOR_URL: initialState.TEXT_BLUE_URL,
          TEXT_COLOR_JESUS: initialState.TEXT_JESUS_WORD,
          BORDER_COLOR :  initialState.BORDER_COLOR_LIGHTMODE,
        }
        );
      }
      else
        result = ({
          BACKGROUND_COLOR: initialState.BG_DARK_MODE,
          BACKGROUND_COLOR2: initialState.BG_DARK_GREY,
          TEXT_COLOR: initialState.TEXT_LIGHT_GREY,
          TEXT_COLOR_URL:initialState.TEXT_BLUE_URL_DARK_MODE,
          TEXT_COLOR_JESUS: initialState.TEXT_JESUS_WORD_DARK_MODE,
          BORDER_COLOR :  initialState.BORDER_COLOR_DARKMODE,

        }
        );
      return result;


      break;
    default:
      return state;
  }
};
