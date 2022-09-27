export const getReadingPlan = () => {
  return readingplan;
};
const readingplan = [
  {
    id: "1",
    name: "My Daily Gospel",
    duration: "45",
    desc:
      "This plan focuses on the record of the life of Christ. You'll read through all four gospels in 45 days.",
    type: "Bible Verse"
  }, // DONE
  {
    id: "2",
    name: "My Daily Psalms",
    duration: "150",
    desc: "Read one Psalm per day for a spiritual boost",
    type: "Bible Verse"
  }, // DONE
  {
    id: "3",
    name: "My Daily Wisdom",
    duration: "60",
    desc:
      "Find wisdom each day as you read straight through the Psalms, Proverbs, and Song of Solomon in 60 days.",
    type: "Bible Verse"
  }, // DONE
  {
    id: "4",
    name: "New Testament in 90 days.",
    duration: "90",
    desc: "Read straight through the New Testament in 90 days.",
    type: "Bible Verse"
  }, // DONE
  {
    id: "5",
    name: "Genesis to Revelation in one year",
    duration: "365",
    desc: "Read the Bible in the order that the events happened.",
    type: "Bible Verse"
  }, // DONE
  {
    id: "6",
    name: "Chronological New Testament",
    duration:  "92",
    desc : "In only 3 months you can read the New Testament in the order that the events happened.",
    type: "Bible Verse"
  }, // DONE
  {
    id: "7",
    name: "Old and New Testament each day",
    duration: "365",
    desc: "Read one passage from the Old Testament and one from the New Testament each day.",
    type: "Bible Verse"
  } // DONE
];

// MyDaily Gospel
export const getDailyGospel = value => {
  var daily_gospel = " ";
  switch (value) {
    case "1":
      daily_gospel = "Matthew 1-2";
      break;
    case "2":
      daily_gospel = "Matthew 3-4";
      break;
    case "3":
      daily_gospel = "Matthew 5-6";
      break;
    case "4":
      daily_gospel = "Matthew 7-8";
      break;
    case "5":
      daily_gospel = "Matthew 9-10";
      break;
    case "6":
      daily_gospel = "Matthew 11-12";
      break;
    case "7":
      daily_gospel = "Matthew 13-14";
      break;
    case "8":
      daily_gospel = "Matthew 15-16";
      break;
    case "9":
      daily_gospel = "Matthew 17-18";
      break;
    case "10":
      daily_gospel = "Matthew 19-20";
      break;
    case "11":
      daily_gospel = "Matthew 21-22";
      break;
    case "12":
      daily_gospel = "Matthew 23-24";
      break;
    case "13":
      daily_gospel = "Matthew 25-26";
      break;
    case "14":
      daily_gospel = "Matthew 27-28";
      break;
    case "15":
      daily_gospel = "Mark 1-2";
      break;
    case "16":
      daily_gospel = "Mark 3-4";
      break;
    case "17":
      daily_gospel = "Mark 5-6";
      break;
    case "18":
      daily_gospel = "Mark 7-8";
      break;
    case "19":
      daily_gospel = "Mark 9-10";
      break;
    case "20":
      daily_gospel = "Mark 11-12";
      break;
    case "21":
      daily_gospel = "Mark 13-14";
      break;
    case "22":
      daily_gospel = "Mark 15-16";
      break;
    case "23":
      daily_gospel = "Luke 1-2";
      break;
    case "24":
      daily_gospel = "Luke 3-4";
      break;
    case "25":
      daily_gospel = "Luke 5-6";
      break;
    case "26":
      daily_gospel = "Luke 7-8";
      break;
    case "27":
      daily_gospel = "Luke 9-10";
      break;
    case "28":
      daily_gospel = "Luke 11-12";
      break;
    case "29":
      daily_gospel = "Luke 13-14";
      break;
    case "30":
      daily_gospel = "Luke 15-16";
      break;
    case "31":
      daily_gospel = "Luke 17-18";
      break;
    case "32":
      daily_gospel = "Luke 19-20";
      break;
    case "33":
      daily_gospel = "Luke 21-22";
      break;
    case "34":
      daily_gospel = "Luke 23-24";
      break;
    case "35":
      daily_gospel = "John 1-2";
      break;
    case "36":
      daily_gospel = "John 3-4";
      break;
    case "37":
      daily_gospel = "John 5-6";
      break;
    case "38":
      daily_gospel = "John 7-8";
      break;
    case "39":
      daily_gospel = "John 9-10";
      break;
    case "40":
      daily_gospel = "John 11-12";
      break;
    case "41":
      daily_gospel = "John 13-14";
      break;
    case "42":
      daily_gospel = "John 15-16";
      break;
    case "43":
      daily_gospel = "John 17-18";
      break;
    case "44":
      daily_gospel = "John 19-20";
      break;
    case "45":
      daily_gospel = "John 21";
      break;
    default:
      daily_gospel = "Matthew 1-2";
  }
  return daily_gospel;
};

// My Daily Psalm
export const getDailyPsalm = value => {
  var daily_psalms = "Psalms";
  switch (value) {
    case "1":
      daily_psalms = daily_psalms + " " + "1";
      break;
    case "2":
      daily_psalms = daily_psalms + " " + "2";
      break;
    case "3":
      daily_psalms = daily_psalms + " " + "3";
      break;
    case "4":
      daily_psalms = daily_psalms + " " + "4";
      break;
    case "5":
      daily_psalms = daily_psalms + " " + "5";
      break;
    case "6":
      daily_psalms = daily_psalms + " " + "6";
      break;
    case "7":
      daily_psalms = daily_psalms + " " + "7";
      break;
    case "8":
      daily_psalms = daily_psalms + " " + "8";
      break;
    case "9":
      daily_psalms = daily_psalms + " " + "9";
      break;
    case "10":
      daily_psalms = daily_psalms + " " + "10";
      break;
    case "11":
      daily_psalms = daily_psalms + " " + "11";
      break;
    case "12":
      daily_psalms = daily_psalms + " " + "12";
      break;
    case "13":
      daily_psalms = daily_psalms + " " + "13";
      break;
    case "14":
      daily_psalms = daily_psalms + " " + "14";
      break;
    case "15":
      daily_psalms = daily_psalms + " " + "15";
      break;
    case "16":
      daily_psalms = daily_psalms + " " + "16";
      break;
    case "17":
      daily_psalms = daily_psalms + " " + "17";
      break;
    case "18":
      daily_psalms = daily_psalms + " " + "18";
      break;
    case "19":
      daily_psalms = daily_psalms + " " + "19";
      break;
    case "20":
      daily_psalms = daily_psalms + " " + "20";
      break;
    case "21":
      daily_psalms = daily_psalms + " " + "21";
      break;
    case "22":
      daily_psalms = daily_psalms + " " + "22";
      break;
    case "23":
      daily_psalms = daily_psalms + " " + "23";
      break;
    case "24":
      daily_psalms = daily_psalms + " " + "24";
      break;
    case "25":
      daily_psalms = daily_psalms + " " + "25";
      break;
    case "26":
      daily_psalms = daily_psalms + " " + "26";
      break;
    case "27":
      daily_psalms = daily_psalms + " " + "27";
      break;
    case "28":
      daily_psalms = daily_psalms + " " + "28";
      break;
    case "29":
      daily_psalms = daily_psalms + " " + "29";
      break;
    case "30":
      daily_psalms = daily_psalms + " " + "30";
      break;
    case "31":
      daily_psalms = daily_psalms + " " + "31";
      break;
    case "32":
      daily_psalms = daily_psalms + " " + "32";
      break;
    case "33":
      daily_psalms = daily_psalms + " " + "33";
      break;
    case "34":
      daily_psalms = daily_psalms + " " + "34";
      break;
    case "35":
      daily_psalms = daily_psalms + " " + "35";
      break;
    case "36":
      daily_psalms = daily_psalms + " " + "36";
      break;
    case "37":
      daily_psalms = daily_psalms + " " + "37";
      break;
    case "38":
      daily_psalms = daily_psalms + " " + "38";
      break;
    case "39":
      daily_psalms = daily_psalms + " " + "39";
      break;
    case "40":
      daily_psalms = daily_psalms + " " + "40";
      break;
    case "41":
      daily_psalms = daily_psalms + " " + "41";
      break;
    case "42":
      daily_psalms = daily_psalms + " " + "42";
      break;
    case "43":
      daily_psalms = daily_psalms + " " + "43";
      break;
    case "44":
      daily_psalms = daily_psalms + " " + "44";
      break;
    case "45":
      daily_psalms = daily_psalms + " " + "45";
      break;
    case "46":
      daily_psalms = daily_psalms + " " + "46";
      break;
    case "47":
      daily_psalms = daily_psalms + " " + "47";
      break;
    case "48":
      daily_psalms = daily_psalms + " " + "48";
      break;
    case "49":
      daily_psalms = daily_psalms + " " + "49";
      break;
    case "50":
      daily_psalms = daily_psalms + " " + "50";
      break;
    case "51":
      daily_psalms = daily_psalms + " " + "51";
      break;
    case "52":
      daily_psalms = daily_psalms + " " + "52";
      break;
    case "53":
      daily_psalms = daily_psalms + " " + "53";
      break;
    case "54":
      daily_psalms = daily_psalms + " " + "54";
      break;
    case "55":
      daily_psalms = daily_psalms + " " + "55";
      break;
    case "56":
      daily_psalms = daily_psalms + " " + "56";
      break;
    case "57":
      daily_psalms = daily_psalms + " " + "57";
      break;
    case "58":
      daily_psalms = daily_psalms + " " + "58";
      break;
    case "59":
      daily_psalms = daily_psalms + " " + "59";
      break;
    case "60":
      daily_psalms = daily_psalms + " " + "60";
      break;
    case "61":
      daily_psalms = daily_psalms + " " + "61";
      break;
    case "62":
      daily_psalms = daily_psalms + " " + "62";
      break;
    case "63":
      daily_psalms = daily_psalms + " " + "63";
      break;
    case "64":
      daily_psalms = daily_psalms + " " + "64";
      break;
    case "65":
      daily_psalms = daily_psalms + " " + "65";
      break;
    case "66":
      daily_psalms = daily_psalms + " " + "66";
      break;
    case "67":
      daily_psalms = daily_psalms + " " + "67";
      break;
    case "68":
      daily_psalms = daily_psalms + " " + "68";
      break;
    case "69":
      daily_psalms = daily_psalms + " " + "69";
      break;
    case "70":
      daily_psalms = daily_psalms + " " + "70";
      break;
    case "71":
      daily_psalms = daily_psalms + " " + "71";
      break;
    case "72":
      daily_psalms = daily_psalms + " " + "72";
      break;
    case "73":
      daily_psalms = daily_psalms + " " + "73";
      break;
    case "74":
      daily_psalms = daily_psalms + " " + "74";
      break;
    case "75":
      daily_psalms = daily_psalms + " " + "75";
      break;
    case "76":
      daily_psalms = daily_psalms + " " + "76";
      break;
    case "77":
      daily_psalms = daily_psalms + " " + "77";
      break;
    case "78":
      daily_psalms = daily_psalms + " " + "78";
      break;
    case "79":
      daily_psalms = daily_psalms + " " + "79";
      break;
    case "80":
      daily_psalms = daily_psalms + " " + "80";
      break;
    case "81":
      daily_psalms = daily_psalms + " " + "81";
      break;
    case "82":
      daily_psalms = daily_psalms + " " + "82";
      break;
    case "83":
      daily_psalms = daily_psalms + " " + "83";
      break;
    case "84":
      daily_psalms = daily_psalms + " " + "84";
      break;
    case "85":
      daily_psalms = daily_psalms + " " + "85";
      break;
    case "86":
      daily_psalms = daily_psalms + " " + "86";
      break;
    case "87":
      daily_psalms = daily_psalms + " " + "87";
      break;
    case "88":
      daily_psalms = daily_psalms + " " + "88";
      break;
    case "89":
      daily_psalms = daily_psalms + " " + "89";
      break;
    case "90":
      daily_psalms = daily_psalms + " " + "90";
      break;
    case "91":
      daily_psalms = daily_psalms + " " + "91";
      break;
    case "92":
      daily_psalms = daily_psalms + " " + "92";
      break;
    case "93":
      daily_psalms = daily_psalms + " " + "93";
      break;
    case "94":
      daily_psalms = daily_psalms + " " + "94";
      break;
    case "95":
      daily_psalms = daily_psalms + " " + "95";
      break;
    case "96":
      daily_psalms = daily_psalms + " " + "96";
      break;
    case "97":
      daily_psalms = daily_psalms + " " + "97";
      break;
    case "98":
      daily_psalms = daily_psalms + " " + "98";
      break;
    case "99":
      daily_psalms = daily_psalms + " " + "99";
      break;
    case "100":
      daily_psalms = daily_psalms + " " + "100";
      break;
    case "101":
      daily_psalms = daily_psalms + " " + "101";
      break;
    case "102":
      daily_psalms = daily_psalms + " " + "102";
      break;
    case "103":
      daily_psalms = daily_psalms + " " + "103";
      break;
    case "104":
      daily_psalms = daily_psalms + " " + "104";
      break;
    case "105":
      daily_psalms = daily_psalms + " " + "105";
      break;
    case "106":
      daily_psalms = daily_psalms + " " + "106";
      break;
    case "107":
      daily_psalms = daily_psalms + " " + "107";
      break;
    case "108":
      daily_psalms = daily_psalms + " " + "108";
      break;
    case "109":
      daily_psalms = daily_psalms + " " + "109";
      break;
    case "110":
      daily_psalms = daily_psalms + " " + "110";
      break;
    case "111":
      daily_psalms = daily_psalms + " " + "111";
      break;
    case "112":
      daily_psalms = daily_psalms + " " + "112";
      break;
    case "113":
      daily_psalms = daily_psalms + " " + "113";
      break;
    case "114":
      daily_psalms = daily_psalms + " " + "114";
      break;
    case "115":
      daily_psalms = daily_psalms + " " + "115";
      break;
    case "116":
      daily_psalms = daily_psalms + " " + "116";
      break;
    case "117":
      daily_psalms = daily_psalms + " " + "117";
      break;
    case "118":
      daily_psalms = daily_psalms + " " + "118";
      break;
    case "119":
      daily_psalms = daily_psalms + " " + "119";
      break;
    case "120":
      daily_psalms = daily_psalms + " " + "120";
      break;
    case "121":
      daily_psalms = daily_psalms + " " + "121";
      break;
    case "122":
      daily_psalms = daily_psalms + " " + "122";
      break;
    case "123":
      daily_psalms = daily_psalms + " " + "123";
      break;
    case "124":
      daily_psalms = daily_psalms + " " + "124";
      break;
    case "125":
      daily_psalms = daily_psalms + " " + "125";
      break;
    case "126":
      daily_psalms = daily_psalms + " " + "126";
      break;
    case "127":
      daily_psalms = daily_psalms + " " + "127";
      break;
    case "128":
      daily_psalms = daily_psalms + " " + "128";
      break;
    case "129":
      daily_psalms = daily_psalms + " " + "129";
      break;
    case "130":
      daily_psalms = daily_psalms + " " + "130";
      break;
    case "131":
      daily_psalms = daily_psalms + " " + "131";
      break;
    case "132":
      daily_psalms = daily_psalms + " " + "132";
      break;
    case "133":
      daily_psalms = daily_psalms + " " + "133";
      break;
    case "134":
      daily_psalms = daily_psalms + " " + "134";
      break;
    case "135":
      daily_psalms = daily_psalms + " " + "135";
      break;
    case "136":
      daily_psalms = daily_psalms + " " + "136";
      break;
    case "137":
      daily_psalms = daily_psalms + " " + "137";
      break;
    case "138":
      daily_psalms = daily_psalms + " " + "138";
      break;
    case "139":
      daily_psalms = daily_psalms + " " + "139";
      break;
    case "140":
      daily_psalms = daily_psalms + " " + "140";
      break;
    case "141":
      daily_psalms = daily_psalms + " " + "141";
      break;
    case "142":
      daily_psalms = daily_psalms + " " + "142";
      break;
    case "143":
      daily_psalms = daily_psalms + " " + "143";
      break;
    case "144":
      daily_psalms = daily_psalms + " " + "144";
      break;
    case "145":
      daily_psalms = daily_psalms + " " + "145";
      break;
    case "146":
      daily_psalms = daily_psalms + " " + "146";
      break;
    case "147":
      daily_psalms = daily_psalms + " " + "147";
      break;
    case "148":
      daily_psalms = daily_psalms + " " + "148";
      break;
    case "149":
      daily_psalms = daily_psalms + " " + "149";
      break;
    case "150":
      daily_psalms = daily_psalms + " " + "150";
      break;
    default:
      daily_psalms = "Psalms 1";
  }
  return daily_psalms;
};

// My Daily Wisdom
export const getDailyWisdom = value => {
  var daily_wisdom = " ";
  switch (value) {
    case "1":
      daily_wisdom = "Psalms 1-4";
      break;
    case "2":
      daily_wisdom = "Psalms 5-8";
      break;
    case "3":
      daily_wisdom = "Psalms 9-12";
      break;
    case "4":
      daily_wisdom = "Psalms 13-16";
      break;
    case "5":
      daily_wisdom = "Psalms 17-20";
      break;
    case "6":
      daily_wisdom = "Psalms 21-24";
      break;
    case "7":
      daily_wisdom = "Psalms 25-28";
      break;
    case "8":
      daily_wisdom = "Psalms 29-32";
      break;
    case "9":
      daily_wisdom = "Psalms 33-36";
      break;
    case "10":
      daily_wisdom = "Psalms 37-39";
      break;
    case "11":
      daily_wisdom = "Psalms 40-42";
      break;
    case "12":
      daily_wisdom = "Psalms 43-45";
      break;
    case "13":
      daily_wisdom = "Psalms 46-48";
      break;
    case "14":
      daily_wisdom = "Psalms 49-51";
      break;
    case "15":
      daily_wisdom = "Psalms 52-54";
      break;
    case "16":
      daily_wisdom = "Psalms 55-57";
      break;
    case "17":
      daily_wisdom = "Psalms 58-60";
      break;
    case "18":
      daily_wisdom = "Psalms 61-63";
      break;
    case "19":
      daily_wisdom = "Psalms 64-66";
      break;
    case "20":
      daily_wisdom = "Psalms 67-69";
      break;
    case "21":
      daily_wisdom = "Psalms 70-72";
      break;
    case "22":
      daily_wisdom = "Psalms 73-75";
      break;
    case "23":
      daily_wisdom = "Psalms 76-78";
      break;
    case "24":
      daily_wisdom = "Psalms 79-81";
      break;
    case "25":
      daily_wisdom = "Psalms 82-84";
      break;
    case "26":
      daily_wisdom = "Psalms 85-87";
      break;
    case "27":
      daily_wisdom = "Psalms 88-90";
      break;
    case "28":
      daily_wisdom = "Psalms 91-93";
      break;
    case "29":
      daily_wisdom = "Psalms 94-96";
      break;
    case "30":
      daily_wisdom = "Psalms 97-99";
      break;
    case "31":
      daily_wisdom = "Psalms 100-102";
      break;
    case "32":
      daily_wisdom = "Psalms 103-105";
      break;
    case "33":
      daily_wisdom = "Psalms 106-108";
      break;
    case "34":
      daily_wisdom = "Psalms 109-111";
      break;
    case "35":
      daily_wisdom = "Psalms 112-114";
      break;
    case "36":
      daily_wisdom = "Psalms 115-117";
      break;
    case "37":
      daily_wisdom = "Psalms 118-120";
      break;
    case "38":
      daily_wisdom = "Psalms 121-123";
      break;
    case "39":
      daily_wisdom = "Psalms 124-126";
      break;
    case "40":
      daily_wisdom = "Psalms 127-129";
      break;
    case "41":
      daily_wisdom = "Psalms 130-132";
      break;
    case "42":
      daily_wisdom = "Psalms 133-135";
      break;
    case "43":
      daily_wisdom = "Psalms 136-138";
      break;
    case "44":
      daily_wisdom = "Psalms 139-141";
      break;
    case "45":
      daily_wisdom = "Psalms 142-144";
      break;
    case "46":
      daily_wisdom = "Psalms 145-147";
      break;
    case "47":
      daily_wisdom = "Psalms 148-150";
      break;
    case "48":
      daily_wisdom = "Proverbs 1-3";
      break;
    case "49":
      daily_wisdom = "Proverbs 4-6";
      break;
    case "50":
      daily_wisdom = "Proverbs 7-9";
      break;
    case "51":
      daily_wisdom = "Proverbs 10-12";
      break;
    case "52":
      daily_wisdom = "Proverbs 13-15";
      break;
    case "53":
      daily_wisdom = "Proverbs 16-18";
      break;
    case "54":
      daily_wisdom = "Proverbs 19-21";
      break;
    case "55":
      daily_wisdom = "Proverbs 22-24";
      break;
    case "56":
      daily_wisdom = "Proverbs 25-27";
      break;
    case "57":
      daily_wisdom = "Proverbs 28-30";
      break;
    case "58":
      daily_wisdom = "Proverbs 31:1-Songs 2";
      break;
    case "59":
      daily_wisdom = "Songs 3-5";
      break;
    case "60":
      daily_wisdom = "Songs 6-8";
      break;

    default:
      daily_wisdom = "Psalms 1-4";
  }
  return daily_wisdom;
};

//New Testament in 90 days.
export const getNT90D = value => {
  var daily_new_testament = " ";
  switch (value) {
    case "1":
      daily_new_testament = "Matthew 1-3";
      break;
    case "2":
      daily_new_testament = "Matthew 4-6";
      break;
    case "3":
      daily_new_testament = "Matthew 7-9";
      break;
    case "4":
      daily_new_testament = "Matthew 10-12";
      break;
    case "5":
      daily_new_testament = "Matthew 13-15";
      break;
    case "6":
      daily_new_testament = "Matthew 16-18";
      break;
    case "7":
      daily_new_testament = "Matthew 19-21";
      break;
    case "8":
      daily_new_testament = "Matthew 22-24";
      break;
    case "9":
      daily_new_testament = "Matthew 25-27";
      break;
    case "10":
      daily_new_testament = "Matthew 29-Mark 2";
      break;
    case "11":
      daily_new_testament = "Mark 3-5";
      break;
    case "12":
      daily_new_testament = "Mark 6-8";
      break;
    case "13":
      daily_new_testament = "Mark 9-11";
      break;
    case "14":
      daily_new_testament = "Mark 12-14";
      break;
    case "15":
      daily_new_testament = "Mark 15-Luke 1";
      break;
    case "16":
      daily_new_testament = "Luke 2-4";
      break;
    case "17":
      daily_new_testament = "Luke 5-7";
      break;
    case "18":
      daily_new_testament = "Luke 8-10";
      break;
    case "19":
      daily_new_testament = "Luke 11-13";
      break;
    case "20":
      daily_new_testament = "Luke 14-16";
      break;
    case "21":
      daily_new_testament = "Luke 17-19";
      break;
    case "22":
      daily_new_testament = "Luke 20-22";
      break;
    case "23":
      daily_new_testament = "Luke 23-John 1";
      break;
    case "24":
      daily_new_testament = "John 2-4";
      break;
    case "25":
      daily_new_testament = "John 5-7";
      break;
    case "26":
      daily_new_testament = "John 8-10";
      break;
    case "27":
      daily_new_testament = "John 11-13";
      break;
    case "28":
      daily_new_testament = "John 14-16";
      break;
    case "29":
      daily_new_testament = "John 17-19";
      break;
    case "30":
      daily_new_testament = "John 20-Acts 1";
      break;
    case "31":
      daily_new_testament = "Acts 2-4";
      break;
    case "32":
      daily_new_testament = "Acts 5-7";
      break;
    case "33":
      daily_new_testament = "Acts 8-10";
      break;
    case "34":
      daily_new_testament = "Acts 11-13";
      break;
    case "35":
      daily_new_testament = "Acts 14-16";
      break;
    case "36":
      daily_new_testament = "Acts 17-19";
      break;
    case "37":
      daily_new_testament = "Acts 20-22";
      break;
    case "38":
      daily_new_testament = "Acts 23-25";
      break;
    case "39":
      daily_new_testament = "Acts 26-28";
      break;
    case "40":
      daily_new_testament = "Romans 1-3";
      break;
    case "41":
      daily_new_testament = "Romans 4-6";
      break;
    case "42":
      daily_new_testament = "Romans 7-9";
      break;
    case "43":
      daily_new_testament = "Romans 10-12";
      break;
    case "44":
      daily_new_testament = "Romans 13-15";
      break;
    case "45":
      daily_new_testament = "Romans 16-1Corinthians 2";
      break;
    case "46":
      daily_new_testament = "1Corinthians 3-5";
      break;
    case "47":
      daily_new_testament = "1Corinthians 6-8";
      break;
    case "48":
      daily_new_testament = "1Corinthians 9-11";
      break;
    case "49":
      daily_new_testament = "1Corinthians 12-14";
      break;
    case "50":
      daily_new_testament = "1Corinthians 15-2 Corinthians 1";
      break;
    case "51":
      daily_new_testament = "2Corinthians 2-4";
      break;
    case "52":
      daily_new_testament = "2Corinthians 5-7";
      break;
    case "53":
      daily_new_testament = "2Corinthians 8-10";
      break;
    case "54":
      daily_new_testament = "2Corinthians 11-13";
      break;
    case "55":
      daily_new_testament = "Galatians 1-3";
      break;
    case "56":
      daily_new_testament = "Galatians 4-6";
      break;
    case "57":
      daily_new_testament = "Ephesians 1-3";
      break;
    case "58":
      daily_new_testament = "Ephesians 4-6";
      break;
    case "59":
      daily_new_testament = "Philippians 1-3";
      break;
    case "60":
      daily_new_testament = "Philippians 4-Colossians 2";
      break;
    case "61":
      daily_new_testament = "Colossians 3-1Thessalonians 1";
      break;
    case "62":
      daily_new_testament = "1Thessalonians 2-4";
      break;
    case "63":
      daily_new_testament = "1Thessalonians 5-2Thessalonians 2";
      break;
    case "64":
      daily_new_testament = "2Thessalonians 3-1Timothy2";
      break;
    case "65":
      daily_new_testament = "1Timothy 3-5";
      break;
    case "66":
      daily_new_testament = "1Timothy 6-2 Timothy 2";
      break;
    case "67":
      daily_new_testament = "2Timothy 3-Titus 1";
      break;
    case "68":
      daily_new_testament = "Titus 2-Philemon 1";
      break;
    case "69":
      daily_new_testament = "Hebrews 1-3";
      break;
    case "70":
      daily_new_testament = "Hebrews 4-6";
      break;
    case "71":
      daily_new_testament = "Hebrews 7-9";
      break;
    case "72":
      daily_new_testament = "Hebrews 10-12";
      break;
    case "73":
      daily_new_testament = "Hebrews 13-James 2";
      break;
    case "74":
      daily_new_testament = "James 3-5";
      break;
    case "75":
      daily_new_testament = "1Matthew 1-3 Peter 1-3";
      break;
    case "76":
      daily_new_testament = "1Peter 4-2Peter 1";
      break;
    case "77":
      daily_new_testament = "2Peter 2-1John 1";
      break;
    case "78":
      daily_new_testament = "1John 2-4";
      break;
    case "79":
      daily_new_testament = "1John 5-3 John 1";
      break;
    case "80":
      daily_new_testament = "Jude 1-Revelation 2";
      break;
    case "81":
      daily_new_testament = "Revelation 3-4";
      break;
    case "82":
      daily_new_testament = "Revelation 5-6";
      break;
    case "83":
      daily_new_testament = "Revelation 7-8";
      break;
    case "84":
      daily_new_testament = "Revelation 9-10";
      break;
    case "85":
      daily_new_testament = "Revelation 11-12";
      break;
    case "86":
      daily_new_testament = "Revelation 13-14";
      break;
    case "87":
      daily_new_testament = "Revelation 15-16";
      break;
    case "88":
      daily_new_testament = "Revelation 17-18";
      break;
    case "89":
      daily_new_testament = "Revelation 19-20";
      break;
    case "90":
      daily_new_testament = "Revelation 21-22";
      break;

    default:
      daily_new_testament = "Genesis 1-4";
  }
  return daily_new_testament;
};

//Genesis to Revelation in one year
export const getReadingBibleOneYear = value => {
  var daily_bible = " ";
  switch (value) {
    case "1":
      daily_bible = "Genesis 1-4";
      break;
    case "2":
      daily_bible = "Genesis 5-8";
      break;
    case "3":
      daily_bible = "Genesis 9-12";
      break;
    case "4":
      daily_bible = "Genesis 13-17";
      break;
    case "5":
      daily_bible = "Genesis 18-20";
      break;
    case "6":
      daily_bible = "Genesis 21-23";
      break;
    case "7":
      daily_bible = "Genesis 24-25";
      break;
    case "8":
      daily_bible = "Genesis 26-28";
      break;
    case "9":
      daily_bible = "Genesis 29-31";
      break;
    case "10":
      daily_bible = "Genesis 32-35";
      break;
    case "11":
      daily_bible = "Genesis 36-38";
      break;
    case "12":
      daily_bible = "Genesis 39-41";
      break;
    case "13":
      daily_bible = "Genesis 42-43";
      break;
    case "14":
      daily_bible = "Genesis 44-46";
      break;
    case "15":
      daily_bible = "Genesis 47-50";
      break;
    case "16":
      daily_bible = "Exodus 1-4";
      break;
    case "17":
      daily_bible = "Exodus 5-7";
      break;
    case "18":
      daily_bible = "Exodus 8-10";
      break;
    case "19":
      daily_bible = "Exodus 11-13";
      break;
    case "20":
      daily_bible = "Exodus 14-16";
      break;
    case "21":
      daily_bible = "Exodus 17-20";
      break;
    case "22":
      daily_bible = "Exodus 21-23";
      break;
    case "23":
      daily_bible = "Exodus 24-27";
      break;
    case "24":
      daily_bible = "Exodus 28-30";
      break;
    case "25":
      daily_bible = "Exodus 31-34";
      break;
    case "26":
      daily_bible = "Exodus 35-37";
      break;
    case "27":
      daily_bible = "Exodus 38-40";
      break;
    case "28":
      daily_bible = "Leviticus 1-4";
      break;
    case "29":
      daily_bible = "Leviticus 5-7";
      break;
    case "30":
      daily_bible = "Leviticus 8-10";
      break;
    case "31":
      daily_bible = "Leviticus 11-13";
      break;
    case "32":
      daily_bible = "Leviticus 14-15";
      break;
    case "33":
      daily_bible = "Leviticus 16-18";
      break;
    case "34":
      daily_bible = "Leviticus 19-21";
      break;
    case "35":
      daily_bible = "Leviticus 22-23";
      break;
    case "36":
      daily_bible = "Leviticus 24-25";
      break;
    case "37":
      daily_bible = "Leviticus 26-27";
      break;
    case "38":
      daily_bible = "Numbers 1-2";
      break;
    case "39":
      daily_bible = "Numbers 3-4";
      break;
    case "40":
      daily_bible = "Numbers 5-6";
      break;
    case "41":
      daily_bible = "Numbers 7";
      break;
    case "42":
      daily_bible = "Numbers 8-10";
      break;
    case "43":
      daily_bible = "Numbers 11-13";
      break;
    case "44":
      daily_bible = "Numbers 14-15";
      break;
    case "45":
      daily_bible = "Numbers 16-18";
      break;
    case "46":
      daily_bible = "Numbers 19-21";
      break;
    case "47":
      daily_bible = "Numbers 22-24";
      break;
    case "48":
      daily_bible = "Numbers 25-26";
      break;
    case "49":
      daily_bible = "Numbers 27-29";
      break;
    case "50":
      daily_bible = "Numbers 30-32";
      break;
    case "51":
      daily_bible = "Numbers 33-36";
      break;
    case "52":
      daily_bible = "Deuteronomy 1-2";
      break;
    case "53":
      daily_bible = "Deuteronomy 3-4";
      break;
    case "54":
      daily_bible = "Deuteronomy 5-8";
      break;
    case "55":
      daily_bible = "Deuteronomy 9-11";
      break;
    case "56":
      daily_bible = "Deuteronomy 12-15";
      break;
    case "57":
      daily_bible = "Deuteronomy 16-19";
      break;
    case "58":
      daily_bible = "Deuteronomy 20-22";
      break;
    case "59":
      daily_bible = "Deuteronomy 23-25";
      break;
    case "60":
      daily_bible = "Deuteronomy 26-27";
      break;
    case "61":
      daily_bible = "Deuteronomy 28-29";
      break;
    case "62":
      daily_bible = "Deuteronomy 30-32";
      break;
    case "63":
      daily_bible = "Deuteronomy 33-34";
      break;
    case "64":
      daily_bible = "Joshua 1-4";
      break;
    case "65":
      daily_bible = "Josnua 5-7";
      break;
    case "66":
      daily_bible = "Joshua 8-10";
      break;
    case "67":
      daily_bible = "Joshua 11-13";
      break;
    case "68":
      daily_bible = "Joshua 14-17";
      break;
    case "69":
      daily_bible = "Joshua 18-20";
      break;
    case "70":
      daily_bible = "Joshua 21-22";
      break;
    case "71":
      daily_bible = "Joshua 23-24";
      break;
    case "72":
      daily_bible = "Judges 1-3";
      break;
    case "73":
      daily_bible = "Judges 4-5";
      break;
    case "74":
      daily_bible = "Judges 6-8";
      break;
    case "75":
      daily_bible = "Judges 9-10";
      break;
    case "76":
      daily_bible = "Judges 11-13";
      break;
    case "77":
      daily_bible = "Judges 14-16";
      break;
    case "78":
      daily_bible = "Judges 17-19";
      break;
    case "79":
      daily_bible = "Judges 20-21";
      break;
    case "80":
      daily_bible = "Ruth 1-4";
      break;
    case "81":
      daily_bible = "1Samuel 1-3";
      break;
    case "82":
      daily_bible = "1Samuel 4-7";
      break;
    case "83":
      daily_bible = "1Samuel 8-12";
      break;
    case "84":
      daily_bible = "1Samuel 13-14";
      break;
    case "85":
      daily_bible = "1Samuel 15-16";
      break;
    case "86":
      daily_bible = "1Samuel 17-18";
      break;
    case "87":
      daily_bible = "1Samuel 19-21";
      break;
    case "88":
      daily_bible = "1Samuel 22-24";
      break;
    case "89":
      daily_bible = "1Samuel 25-27";
      break;
    case "90":
      daily_bible = "1Samuel 28-31";
      break;
    case "91":
      daily_bible = "2Samuel 1-3";
      break;
    case "92":
      daily_bible = "2Samuel 4-7";
      break;
    case "93":
      daily_bible = "2Samuel 8-11";
      break;
    case "94":
      daily_bible = "2Samuel 12-13";
      break;
    case "95":
      daily_bible = "2Samuel 14-16";
      break;
    case "96":
      daily_bible = "2Samuel 17-19";
      break;
    case "97":
      daily_bible = "2Samuel 20-22";
      break;
    case "98":
      daily_bible = "2Samuel 23-24";
      break;
    case "99":
      daily_bible = "1Kings 1-2";
      break;
    case "100":
      daily_bible = "1Kings 3-5";
      break;
    case "101":
      daily_bible = "1Kings 6-7";
      break;
    case "102":
      daily_bible = "1Kings 8-9";
      break;
    case "103":
      daily_bible = "1Kings 10-12";
      break;
    case "104":
      daily_bible = "1Kings 13-15";
      break;
    case "105":
      daily_bible = "1Kings 16-18";
      break;
    case "106":
      daily_bible = "1Kings 19-20";
      break;
    case "107":
      daily_bible = "1Kings 21-22";
      break;
    case "108":
      daily_bible = "2Kings 1-3";
      break;
    case "109":
      daily_bible = "2Kings 4-5";
      break;
    case "110":
      daily_bible = "2Kings 6-8";
      break;
    case "111":
      daily_bible = "2Kings 9-10";
      break;
    case "112":
      daily_bible = "2Kings 11-13";
      break;
    case "113":
      daily_bible = "2Kings 14-16";
      break;
    case "114":
      daily_bible = "2Kings 17-18";
      break;
    case "115":
      daily_bible = "2Kings 19-21";
      break;
    case "116":
      daily_bible = "2Kings 22-23";
      break;
    case "117":
      daily_bible = "2Kings 24-25";
      break;
    case "118":
      daily_bible = "1Chronicles 1-2";
      break;
    case "119":
      daily_bible = "1Chronicles 3-4";
      break;
    case "120":
      daily_bible = "1Chronicles 5-6";
      break;
    case "121":
      daily_bible = "1Chronicles 7-9";
      break;
    case "122":
      daily_bible = "1Chronicles 10-12";
      break;
    case "123":
      daily_bible = "1Chronicles 13-16";
      break;
    case "124":
      daily_bible = "1Chronicles 17-19";
      break;
    case "125":
      daily_bible = "1Chronicles 20-23";
      break;
    case "126":
      daily_bible = "1Chronicles 24-26";
      break;
    case "127":
      daily_bible = "1Chronicles 27-29";
      break;
    case "128":
      daily_bible = "2Chronicles 1-4";
      break;
    case "129":
      daily_bible = "2Chronicles 5-7";
      break;
    case "130":
      daily_bible = "2Chronicles 8-11";
      break;
    case "131":
      daily_bible = "2Chronicles 12-16";
      break;
    case "132":
      daily_bible = "2Chronicles 17-20";
      break;
    case "133":
      daily_bible = "2Chronicles 21-24";
      break;
    case "134":
      daily_bible = "2Chronicles 25-28";
      break;
    case "135":
      daily_bible = "2Chronicles 29-31";
      break;
    case "136":
      daily_bible = "2Chronicles 32-34";
      break;
    case "137":
      daily_bible = "2Chronicles 35-36";
      break;
    case "138":
      daily_bible = "Ezra 1-4";
      break;
    case "139":
      daily_bible = "Ezra 5-7";
      break;
    case "140":
      daily_bible = "Ezra 8-10";
      break;
    case "141":
      daily_bible = "Nehemiah 1-3";
      break;
    case "142":
      daily_bible = "Nehemiah 4-7";
      break;
    case "143":
      daily_bible = "Nehemiah 8-10";
      break;
    case "144":
      daily_bible = "Nehemiah 11-13";
      break;
    case "145":
      daily_bible = "Esther 1-5";
      break;
    case "146":
      daily_bible = "Esther 6-10";
      break;
    case "147":
      daily_bible = "Job 1-4";
      break;
    case "148":
      daily_bible = "Job 5-8";
      break;
    case "149":
      daily_bible = "Job 9-12";
      break;
    case "150":
      daily_bible = "Job 13-16";
      break;
    case "151":
      daily_bible = "Job 17-20";
      break;
    case "152":
      daily_bible = "Job 21-24";
      break;
    case "153":
      daily_bible = "Job 25-30";
      break;
    case "154":
      daily_bible = "Job 31-34";
      break;
    case "155":
      daily_bible = "Job 35-38";
      break;
    case "156":
      daily_bible = "Job 39-42";
      break;
    case "157":
      daily_bible = "Psalms 1-8";
      break;
    case "158":
      daily_bible = "Psalms 9-17";
      break;
    case "159":
      daily_bible = "Psalms 18-21";
      break;
    case "160":
      daily_bible = "Psalms 22-27";
      break;
    case "161":
      daily_bible = "Psalms 28-33";
      break;
    case "162":
      daily_bible = "Psalms 34-37";
      break;
    case "163":
      daily_bible = "Psalms 38-42";
      break;
    case "164":
      daily_bible = "Psalms 43-49";
      break;
    case "165":
      daily_bible = "Psalms 50-55";
      break;
    case "166":
      daily_bible = "Psalms 56-61";
      break;
    case "167":
      daily_bible = "Psalms 62-68";
      break;
    case "168":
      daily_bible = "Psalms 69-72";
      break;
    case "169":
      daily_bible = "Psalms 73-77";
      break;
    case "170":
      daily_bible = "Psalms 78-80";
      break;
    case "171":
      daily_bible = "Psalms 81-88";
      break;
    case "172":
      daily_bible = "Psalms 89-94";
      break;
    case "173":
      daily_bible = "Psalms 95-103";
      break;
    case "174":
      daily_bible = "Psalms 104-106";
      break;
    case "175":
      daily_bible = "Psalms 107-111";
      break;
    case "176":
      daily_bible = "Psalms 112-118";
      break;
    case "177":
      daily_bible = "Psalms 119";
      break;
    case "178":
      daily_bible = "Psalms 120-133";
      break;
    case "179":
      daily_bible = "Psalms 134-140";
      break;
    case "180":
      daily_bible = "Psalms 141-150";
      break;
    case "181":
      daily_bible = "Proverbs 1-3";
      break;
    case "182":
      daily_bible = "Proverbs 4-7";
      break;
    case "183":
      daily_bible = "Proverbs 8-11";
      break;
    case "184":
      daily_bible = "Proverbs 12-14";
      break;
    case "185":
      daily_bible = "Proverbs 15-17";
      break;
    case "186":
      daily_bible = "Proverbs 18-20";
      break;
    case "187":
      daily_bible = "Proverbs 21-23";
      break;
    case "188":
      daily_bible = "Proverbs 24-26";
      break;
    case "189":
      daily_bible = "Proverbs 27-29";
      break;
    case "190":
      daily_bible = "Proverbs 30-31";
      break;
    case "191":
      daily_bible = "Ecclesiastes 1-4";
      break;
    case "192":
      daily_bible = "Ecclesiastes 5-8";
      break;
    case "193":
      daily_bible = "Ecclesiastes 9-12";
      break;
    case "194":
      daily_bible = "Songs 1-4";
      break;
    case "195":
      daily_bible = "Songs 5-8";
      break;
    case "196":
      daily_bible = "Isaiah 1-3";
      break;
    case "197":
      daily_bible = "Isaiah 4-8";
      break;
    case "198":
      daily_bible = "Isaiah 9-11";
      break;
    case "199":
      daily_bible = "Isaiah 12-14";
      break;
    case "200":
      daily_bible = "Isaiah 15-19";
      break;
    case "201":
      daily_bible = "Isaiah 20-24";
      break;
    case "202":
      daily_bible = "Isaiah 25-28";
      break;
    case "203":
      daily_bible = "Isaiah 29-31";
      break;
    case "204":
      daily_bible = "Isaiah 32-34";
      break;
    case "205":
      daily_bible = "Isaiah 35-37";
      break;
    case "206":
      daily_bible = "Isaiah 38-40";
      break;
    case "207":
      daily_bible = "Isaiah 41-43";
      break;
    case "208":
      daily_bible = "Isaiah 44-46";
      break;
    case "209":
      daily_bible = "Isaiah 47-49";
      break;
    case "210":
      daily_bible = "Isaiah 50-52";
      break;
    case "211":
      daily_bible = "Isaiah 53-56";
      break;
    case "212":
      daily_bible = "Isaiah 57-59";
      break;
    case "213":
      daily_bible = "Isaiah 60-63";
      break;
    case "214":
      daily_bible = "Isaiah 64-66";
      break;
    case "215":
      daily_bible = "Jeremiah 1-3";
      break;
    case "216":
      daily_bible = "Jeremiah 4-5";
      break;
    case "217":
      daily_bible = "Jeremiah 6-8";
      break;
    case "218":
      daily_bible = "Jeremiah 9-11";
      break;
    case "219":
      daily_bible = "Jeremiah 12-14";
      break;
    case "220":
      daily_bible = "Jeremiah 15-17";
      break;
    case "221":
      daily_bible = "Jeremiah 18-21";
      break;
    case "222":
      daily_bible = "Jeremiah 22-24";
      break;
    case "223":
      daily_bible = "Jeremiah 25-27";
      break;
    case "224":
      daily_bible = "Jeremiah 28-30";
      break;
    case "225":
      daily_bible = "Jeremiah 31-32";
      break;
    case "226":
      daily_bible = "Jeremiah 33-36";
      break;
    case "227":
      daily_bible = "Jeremiah 37-39";
      break;
    case "228":
      daily_bible = "Jeremiah 40-43";
      break;
    case "229":
      daily_bible = "Jeremiah 44-46";
      break;
    case "230":
      daily_bible = "Jeremiah 47-48";
      break;
    case "231":
      daily_bible = "Jeremiah 49";
      break;
    case "232":
      daily_bible = "Jeremiah 50";
      break;
    case "233":
      daily_bible = "Jeremiah 51-52";
      break;
    case "234":
      daily_bible = "Lamentations 1-2";
      break;
    case "235":
      daily_bible = "Lamentations 3-5";
      break;
    case "236":
      daily_bible = "Ezekiel 1-4";
      break;
    case "237":
      daily_bible = "Ezekiel 5-8";
      break;
    case "238":
      daily_bible = "Ezekiel 9-12";
      break;
    case "239":
      daily_bible = "Ezekiel 13-15";
      break;
    case "240":
      daily_bible = "Ezekiel 16-17";
      break;
    case "241":
      daily_bible = "Ezekiel 18-20";
      break;
    case "242":
      daily_bible = "Ezekiel 21-22";
      break;
    case "243":
      daily_bible = "Ezekiel 23-24";
      break;
    case "244":
      daily_bible = "Ezekiel 25-27";
      break;
    case "245":
      daily_bible = "Ezekiel 28-30";
      break;
    case "246":
      daily_bible = "Ezekiel 31-32";
      break;
    case "247":
      daily_bible = "Ezekiel 33-35";
      break;
    case "248":
      daily_bible = "Ezekiel 36-38";
      break;
    case "249":
      daily_bible = "Ezekiel 39-40";
      break;
    case "250":
      daily_bible = "Ezekiel 41-43";
      break;
    case "251":
      daily_bible = "Ezekiel 44-46";
      break;
    case "252":
      daily_bible = "Ezekiel 47-48";
      break;
    case "253":
      daily_bible = "Daniel 1-3";
      break;
    case "254":
      daily_bible = "Daniel 4-5";
      break;
    case "255":
      daily_bible = "Daniel 6-8";
      break;
    case "256":
      daily_bible = "Daniel 9-12";
      break;
    case "257":
      daily_bible = "Hosea 1-4";
      break;
    case "258":
      daily_bible = "Hosea 5-9";
      break;
    case "259":
      daily_bible = "Hosea 10-14";
      break;
    case "260":
      daily_bible = "Joel 1-3";
      break;
    case "261":
      daily_bible = "Amos 1-4";
      break;
    case "262":
      daily_bible = "Amos 5-9";
      break;
    case "263":
      daily_bible = "Obadiah 1";
      break;
    case "264":
      daily_bible = "Jonah 1-4";
      break;
    case "265":
      daily_bible = "Micah 1-4";
      break;
    case "266":
      daily_bible = "Micah 5-7";
      break;
    case "267":
      daily_bible = "Nahum 1-3";
      break;
    case "268":
      daily_bible = "Habakkuk 1-3";
      break;
    case "269":
      daily_bible = "Zephaniah 1-3";
      break;
    case "270":
      daily_bible = "Hagai 1-2";
      break;
    case "271":
      daily_bible = "Zechariah 1-5";
      break;
    case "272":
      daily_bible = "Zechariah 6-10";
      break;
    case "273":
      daily_bible = "Zechariah 11-14";
      break;
    case "274":
      daily_bible = "Malachi 1-4";
      break;
    case "275":
      daily_bible = "Matthew 1-4";
      break;
    case "276":
      daily_bible = "Matthew 5-6";
      break;
    case "277":
      daily_bible = "Matthew 7-9";
      break;
    case "278":
      daily_bible = "Matthew 10-11";
      break;
    case "279":
      daily_bible = "Matthew 12-13";
      break;
    case "280":
      daily_bible = "Matthew 14-17";
      break;
    case "281":
      daily_bible = "Matthew 19-20";
      break;
    case "282":
      daily_bible = "Matthew 21-22";
      break;
    case "283":
      daily_bible = "Matthew 23-24";
      break;
    case "284":
      daily_bible = "Matthew 25-26";
      break;
    case "285":
      daily_bible = "Matthew 27-28";
      break;
    case "286":
      daily_bible = "Mark 1-3";
      break;
    case "287":
      daily_bible = "Mark 4-5";
      break;
    case "288":
      daily_bible = "Mark 6-7";
      break;
    case "289":
      daily_bible = "Mark 8-9";
      break;
    case "290":
      daily_bible = "Mark 10-11";
      break;
    case "291":
      daily_bible = "Mark 12-13";
      break;
    case "292":
      daily_bible = "Mark 14";
      break;
    case "293":
      daily_bible = "Mark 15-16";
      break;
    case "294":
      daily_bible = "Luke 1-2";
      break;
    case "295":
      daily_bible = "Luke 3-4";
      break;
    case "296":
      daily_bible = "Luke 5-6";
      break;
    case "297":
      daily_bible = "Luke 7-8";
      break;
    case "298":
      daily_bible = "Luke 9-10";
      break;
    case "299":
      daily_bible = "Luke 11-12";
      break;
    case "300":
      daily_bible = "Luke 13-15";
      break;
    case "301":
      daily_bible = "Luke 16-18";
      break;
    case "302":
      daily_bible = "Luke 19-20";
      break;
    case "303":
      daily_bible = "Luke 21-22";
      break;
    case "304":
      daily_bible = "Luke 23-24";
      break;
    case "305":
      daily_bible = "John 1-2";
      break;
    case "306":
      daily_bible = "John 3-4";
      break;
    case "307":
      daily_bible = "John 5-6";
      break;
    case "308":
      daily_bible = "John 7-8";
      break;
    case "309":
      daily_bible = "John 9-10";
      break;
    case "310":
      daily_bible = "John 11-12";
      break;
    case "311":
      daily_bible = "John 13-15";
      break;
    case "312":
      daily_bible = "John 16-17";
      break;
    case "313":
      daily_bible = "John 18-19";
      break;
    case "314":
      daily_bible = "John 20-21";
      break;
    case "315":
      daily_bible = "Acts 1-3";
      break;
    case "316":
      daily_bible = "Acts 4-5";
      break;
    case "317":
      daily_bible = "Acts 6-7";
      break;
    case "318":
      daily_bible = "Acts 8-9";
      break;
    case "319":
      daily_bible = "Acts 10-11";
      break;
    case "320":
      daily_bible = "Acts 12-13";
      break;
    case "321":
      daily_bible = "Acts 14-15";
      break;
    case "322":
      daily_bible = "Acts 16-17";
      break;
    case "323":
      daily_bible = "Acts 18-19";
      break;
    case "324":
      daily_bible = "Acts 20-21";
      break;
    case "325":
      daily_bible = "Acts 22-23";
      break;
    case "326":
      daily_bible = "Acts 24-26";
      break;
    case "327":
      daily_bible = "Acts 27-28";
      break;
    case "328":
      daily_bible = "Romans 1-3";
      break;
    case "329":
      daily_bible = "Romans 4-7";
      break;
    case "330":
      daily_bible = "Romans 8-10";
      break;
    case "331":
      daily_bible = "Romans 11-14";
      break;
    case "332":
      daily_bible = "Romans 15-16";
      break;
    case "333":
      daily_bible = "1Corinthians 1-4";
      break;
    case "334":
      daily_bible = "1Corinthians 5-9";
      break;
    case "335":
      daily_bible = "1Corinthians 10-13";
      break;
    case "336":
      daily_bible = "1Corinthians 14-16";
      break;
    case "337":
      daily_bible = "2Corinthians 1-4";
      break;
    case "338":
      daily_bible = "2Corinthians 5-9";
      break;
    case "339":
      daily_bible = "2Corinthians 10-13";
      break;
    case "340":
      daily_bible = "Galatians 1-3";
      break;
    case "341":
      daily_bible = "Galatians 4-6";
      break;
    case "342":
      daily_bible = "Ephesians 1-3";
      break;
    case "343":
      daily_bible = "Ephesians 4-6";
      break;
    case "344":
      daily_bible = "Phillippians 1-4";
      break;
    case "345":
      daily_bible = "Colossians 1-4";
      break;
    case "346":
      daily_bible = "1Thessalonians 1-5";
      break;
    case "347":
      daily_bible = "2Thessalonians 1-3";
      break;
    case "348":
      daily_bible = "1Timothy 1-6";
      break;
    case "349":
      daily_bible = "2Timothy 1-4";
      break;
    case "350":
      daily_bible = "Philemon 1;Titus 1-3";
      break;
    case "351":
      daily_bible = "Hebrew 1-4";
      break;
    case "352":
      daily_bible = "Hebrew 5-8";
      break;
    case "353":
      daily_bible = "Hebrew 9-10";
      break;
    case "354":
      daily_bible = "Hebrew 11-13";
      break;
    case "355":
      daily_bible = "James 1-5";
      break;
    case "356":
      daily_bible = "1Peter 1-5;2Peter 1-3";
      break;
    case "357":
      daily_bible = "1John 1-5";
      break;
    case "358":
      daily_bible = "2John 1;3John 1;Jude 1";
      break;
    case "359":
      daily_bible = "Revelation 1-3";
      break;
    case "360":
      daily_bible = "Revelation 4-7";
      break;
    case "361":
      daily_bible = "Revelation 8-11";
      break;
    case "362":
      daily_bible = "Revelation 12-14";
      break;
    case "363":
      daily_bible = "Revelation 15-17";
      break;
    case "364":
      daily_bible = "Revelation 18-19";
      break;
    case "365":
      daily_bible = "Revelation 20-22";
      break;

    default:
      daily_bible = "Matthew 1-3";
  }
  return daily_bible;
};

//Old and New Testament each day
export const getReadingBibleOTNT = value => {
  var daily_bible = " ";
  switch (value) {
    case "1":
      daily_bible = "Genesis 1-2;Matthew 1";
      break;
    case "2":
      daily_bible = "Genesis 3-5;Matthew 2";
      break;
    case "3":
      daily_bible = "Genesis 6-8;Matthew 3";
      break;
    case "4":
      daily_bible = "Genesis 9-11;Matthew 4";
      break;
    case "5":
      daily_bible = "Genesis 12-14;Matthew 5:1-26";
      break;
    case "6":
      daily_bible = "Genesis 15-17;Matthew 5:27-48";
      break;
    case "7":
      daily_bible = "Genesis 18-19;Matthew 6";
      break;
    case "8":
      daily_bible = "Genesis 20-22;Matthew 7";
      break;
    case "9":
      daily_bible = "Genesis 23-24;Matthew 8";
      break;
    case "10":
      daily_bible = "Genesis 25-26;Matthew 9:1-17";
      break;
    case "11":
      daily_bible = "Genesis 27-28;Matthew 9:18-38";
      break;
    case "12":
      daily_bible = "Genesis 29-30;Matthew 10:1-23";
      break;
    case "13":
      daily_bible = "Genesis 31-32;Matthew 10:24-42";
      break;
    case "14":
      daily_bible = "Genesis 33-35;Matthew 11";
      break;
    case "15":
      daily_bible = "Genesis 36-37;Matthew 12:1-21";
      break;
    case "16":
      daily_bible = "Genesis 38-40;Matthew 12:22-50";
      break;
    case "17":
      daily_bible = "Genesis 41;Matthew 13:1-32";
      break;
    case "18":
      daily_bible = "Genesis 42-43;Matthew 13:33-58";
      break;
    case "19":
      daily_bible = "Genesis 44-45;Matthew 14:1-21";
      break;
    case "20":
      daily_bible = "Genesis 46-48;Matthew 14:22-36";
      break;
    case "21":
      daily_bible = "Genesis 49-50;Matthew 15:1-20";
      break;
    case "22":
      daily_bible = "Exodus 1-3;Matthew 15:21-39";
      break;
    case "23":
      daily_bible = "Exodus 4-6;Matthew 16";
      break;
    case "24":
      daily_bible = "Exodus 7-8;Matthew 17";
      break;
    case "25":
      daily_bible = "Exodus 9-10;Matthew 18:1-20";
      break;
    case "26":
      daily_bible = "Exodus 11-12;Matthew 18:21-35";
      break;
    case "27":
      daily_bible = "Exodus 13-15;Matthew 19:1-15";
      break;
    case "28":
      daily_bible = "Exodus 16-18;Matthew 19:16-30";
      break;
    case "29":
      daily_bible = "Exodus 19-21;Matthew 20:1-16";
      break;
    case "30":
      daily_bible = "Exodus 22-24;Matthew 20:17-34";
      break;
    case "31":
      daily_bible = "Exodus 25-26;Matthew 21:1-22";
      break;
    case "32":
      daily_bible = "Exodus 27-28;Matthew 21:23-46";
      break;
    case "33":
      daily_bible = "Exodus 29-30;Matthew 22:1-22";
      break;
    case "34":
      daily_bible = "Exodus 31-33;Matthew 22:23-46";
      break;
    case "35":
      daily_bible = "Exodus 34-36;Matthew 23:1-22";
      break;
    case "36":
      daily_bible = "Exodus 37-38;Matthew 23:23-39";
      break;
    case "37":
      daily_bible = "Exodus 39-40;Matthew 24:1-22";
      break;
    case "38":
      daily_bible = "Leviticus 1-3;Matthew 24:23-51";
      break;
    case "39":
      daily_bible = "Leviticus 4-6;Matthew 25:1-30";
      break;
    case "40":
      daily_bible = "Leviticus 7-9;Matthew 25:31-46";
      break;
    case "41":
      daily_bible = "Leviticus 10-12;Matthew 26:1-19";
      break;
    case "42":
      daily_bible = "Leviticus 13;Matthew 26:20-54";
      break;
    case "43":
      daily_bible = "Leviticus 14;Matthew 26:55-75";
      break;
    case "44":
      daily_bible = "Leviticus 15-17;Matthew 27:1-31";
      break;
    case "45":
      daily_bible = "Leviticus 18-19;Matthew 27:32-66";
      break;
    case "46":
      daily_bible = "Leviticus 20-21;Matthew 28";
      break;
    case "47":
      daily_bible = "Leviticus 22-23;Mark 1:1-22";
      break;
    case "48":
      daily_bible = "Leviticus 24-25;Mark 1:23-45";
      break;
    case "49":
      daily_bible = "Leviticus 26-27;Mark 2";
      break;
    case "50":
      daily_bible = "Numbers 1-2;Mark 3:1-21";
      break;
    case "51":
      daily_bible = "Numbers 3-4;Mark 3:22-35";
      break;
    case "52":
      daily_bible = "Numbers 5-6;Mark 4:1-20";
      break;
    case "53":
      daily_bible = "Numbers 7;Mark 4:21-41";
      break;
    case "54":
      daily_bible = "Numbers 8-10;Mark 5:1-20";
      break;
    case "55":
      daily_bible = "Numbers 11-13;Mark 5:21-43";
      break;
    case "56":
      daily_bible = "Numbers 14-15;Mark 6:1-32";
      break;
    case "57":
      daily_bible = "Numbers 16-17;Mark 6:33-56";
      break;
    case "58":
      daily_bible = "Numbers 18-20;Mark 7:1-132";
      break;
    case "59":
      daily_bible = "Numbers 21-25;Mark 7:14-37;Mark 8:1-21";
      break;
    case "60":
      daily_bible = "Numbers 26-27;Mark 8:22-38";
      break;
    case "61":
      daily_bible = "Numbers 28-29;Mark 9:1-29";
      break;
    case "62":
      daily_bible = "Numbers 30-31;Mark 9:30-50";
      break;
    case "63":
      daily_bible = "Numbers 32-33;Mark 10:1-31";
      break;
    case "64":
      daily_bible = "Numbers 34-36;Mark 10:32-52";
      break;
    case "65":
      daily_bible = "Deuteronomy 1-2;Mark 11:1-19";
      break;
    case "66":
      daily_bible = "Deuteronomy 3-4;Mark 11:20-33";
      break;
    case "67":
      daily_bible = "Deuteronomy 5-7;Mark 12:1-27";
      break;
    case "68":
      daily_bible = "Deuteronomy 8-10;Mark 12:28-44";
      break;
    case "69":
      daily_bible = "Deuteronomy 11-13;Mark 13:1-13";
      break;
    case "70":
      daily_bible = "Deuteronomy 14-16;Mark 13:14-37";
      break;
    case "71":
      daily_bible = "Deuteronomy 17-19;Mark 14:1-25";
      break;
    case "72":
      daily_bible = "Deuteronomy 20-22;Mark 14:26-50";
      break;
    case "73":
      daily_bible = "Deuteronomy 23-25;Mark 14:51-72";
      break;
    case "74":
      daily_bible = "Deuteronomy 26-27;Mark 15:1-26";
      break;
    case "75":
      daily_bible = "Deuteronomy 28;Mark 15:27-47";
      break;
    case "76":
      daily_bible = "Deuteronomy 29-30;Mark 16";
      break;
    case "77":
      daily_bible = "Deuteronomy 31-32;Luke 1:1-23";
      break;
    case "78":
      daily_bible = "Deuteronomy 33-34;Luke 1:24-56";
      break;
    case "79":
      daily_bible = "Joshua 1-3;Luke 1:57-80";
      break;
    case "80":
      daily_bible = "Joshua 4-6;Luke 2:1-24";
      break;
    case "81":
      daily_bible = "Joshua 7-8;Luke 2:25-52";
      break;
    case "82":
      daily_bible = "Joshua 9-10;Luke 3";
      break;
    case "83":
      daily_bible = "Joshua 11-13;Luke 4:1-32";
      break;
    case "84":
      daily_bible = "Joshua 14-15;Luke 4:33-44";
      break;
    case "85":
      daily_bible = "Joshua 16-18;Luke 5:1-16";
      break;
    case "86":
      daily_bible = "Joshua 19-20;Luke 5:17-39";
      break;
    case "87":
      daily_bible = "Joshua 21-22;Luke 6:1-26";
      break;
    case "88":
      daily_bible = "Joshua 23-24;Luke 6:27-49";
      break;
    case "89":
      daily_bible = "Judges 1-2;Luke 7:1-30";
      break;
    case "90":
      daily_bible = "Judges 3-5;Luke 7:31-50";
      break;
    case "91":
      daily_bible = "Judges 6-7;Luke 8:1-21";
      break;
    case "92":
      daily_bible = "Judges 8-9;Luke 8:22-56";
      break;
    case "93":
      daily_bible = "Judges 10-11;Luke 9:1-36";
      break;
    case "94":
      daily_bible = "Judges 12-14;Luke 9:37-62";
      break;
    case "95":
      daily_bible = "Judges 15-17;Luke 10:1-24";
      break;
    case "96":
      daily_bible = "Judges 18-19;Luke 10:25-42";
      break;
    case "97":
      daily_bible = "Judges 20-21;Luke 11:1-28";
      break;
    case "98":
      daily_bible = "Ruth 1-4;Luke 11:29-54";
      break;
    case "99":
      daily_bible = "1Samuel 1-3;Luke 12:1-34";
      break;
    case "100":
      daily_bible = "1Samuel 4-6;Luke 12:35-59";
      break;
    case "101":
      daily_bible = "1Samuel 7-9;Luke 13:1-21";
      break;
    case "102":
      daily_bible = "1Samuel 10-12;Luke 13:22-35";
      break;
    case "103":
      daily_bible = "1Samuel 13-14;Luke 14:1-24";
      break;
    case "104":
      daily_bible = "1Samuel 15-16;Luke 14:25-35";
      break;
    case "105":
      daily_bible = "1Samuel 17-18;Luke 15:1-10";
      break;
    case "106":
      daily_bible = "1Samuel 19-21;Luke 15:11-32";
      break;
    case "107":
      daily_bible = "1Samuel 22-24;Luke 16:1-18";
      break;
    case "108":
      daily_bible = "1Samuel 25-26;Luke 16:19-31";
      break;
    case "109":
      daily_bible = "1Samuel 27-29;Luke 17:1-19";
      break;
    case "110":
      daily_bible = "1Samuel 30-31;Luke 17:20-37";
      break;
    case "111":
      daily_bible = "2Samuel 1-3;Luke 18:1-17";
      break;
    case "112":
      daily_bible = "2Samuel 4-6;Luke 18:18-43";
      break;
    case "113":
      daily_bible = "2Samuel 7-9;Luke 19:1-28";
      break;
    case "114":
      daily_bible = "2Samuel 10-12;Luke 19:29-48";
      break;
    case "115":
      daily_bible = "2Samuel 13-14;Luke 20:1-26";
      break;
    case "116":
      daily_bible = "2Samuel 15-16;Luke 20:27-47";
      break;
    case "117":
      daily_bible = "2Samuel 17-18;Luke 21:1-19";
      break;
    case "118":
      daily_bible = "2Samuel 19-20;Luke 21:20-38";
      break;
    case "119":
      daily_bible = "2Samuel 21-22;Luke 22:1-30";
      break;
    case "120":
      daily_bible = "2Samuel 23-24;Luke 22:31-53";
      break;
    case "121":
      daily_bible = "1Kings 1-2;Luke 22:54-71";
      break;
    case "122":
      daily_bible = "1Kings 3-5;Luke 23:1-26";
      break;
    case "123":
      daily_bible = "1Kings 6-7;Luke 23:27-38";
      break;
    case "124":
      daily_bible = "1Kings 8-9;Luke 23:39-56";
      break;
    case "125":
      daily_bible = "1Kings 10-11;Luke 24:1-35";
      break;
    case "126":
      daily_bible = "1Kings 12-13;Luke 24:36-53";
      break;
    case "127":
      daily_bible = "1Kings 14-15;John 1:1-28";
      break;
    case "128":
      daily_bible = "1Kings 16-18;John 1:29-51";
      break;
    case "129":
      daily_bible = "1Kings 19-20;John 2";
      break;
    case "130":
      daily_bible = "1Kings 21-22;John 3:1-21";
      break;
    case "131":
      daily_bible = "2Kings 1-3;John 3:22-36";
      break;
    case "132":
      daily_bible = "2Kings 4-5;John 4:1-30";
      break;
    case "133":
      daily_bible = "2Kings 6-8;John 4:31-54";
      break;
    case "134":
      daily_bible = "2Kings 9-11;John 5:1-24";
      break;
    case "135":
      daily_bible = "2Kings 12-14;John 5:25-47";
      break;
    case "136":
      daily_bible = "2Kings 15-17;John 6:1-21";
      break;
    case "137":
      daily_bible = "2Kings 18-19;John 6:22-44";
      break;
    case "138":
      daily_bible = "2Kings 20-22;John 6:45-71";
      break;
    case "139":
      daily_bible = "2Kings 23-25;John 7:1-31";
      break;
    case "140":
      daily_bible = "1Chronicles 1-2;John 7:32-53";
      break;
    case "141":
      daily_bible = "1Chronicles 3-5;John 8:1-20";
      break;
    case "142":
      daily_bible = "1Chronicles 6-7;John 8:21-36";
      break;
    case "143":
      daily_bible = "1Chronicles 8-10;John 8:37-59";
      break;
    case "144":
      daily_bible = "1Chronicles 11-13;John 9:1-23";
      break;
    case "145":
      daily_bible = "1Chronicles 14-16;John 9:24-41";
      break;
    case "146":
      daily_bible = "1Chronicles 17-19;John 10:1-21";
      break;
    case "147":
      daily_bible = "1Chronicles 20-22;John 10:22-42";
      break;
    case "148":
      daily_bible = "1Chronicles 23-25;John 11:1-17";
      break;
    case "149":
      daily_bible = "1Chronicles 26-27;John 11:18-46";
      break;
    case "150":
      daily_bible = "1Chronicles 28-29;John 11:47-57";
      break;
    case "151":
      daily_bible = "2Chronicles 1-3;John 12:1-19";
      break;
    case "152":
      daily_bible = "2Chronicles 4-6;John 12:20-50";
      break;
    case "153":
      daily_bible = "2Chronicles 7-9;John 13:1-17";
      break;
    case "154":
      daily_bible = "2Chronicles 10-12;John 13:18-38";
      break;
    case "155":
      daily_bible = "2Chronicles 13-16;John 14";
      break;
    case "156":
      daily_bible = "2Chronicles 17-19;John 15";
      break;
    case "157":
      daily_bible = "2Chronicles 20-22;John 16:1-15";
      break;
    case "158":
      daily_bible = "2Chronicles 23-25;John 16:16-33";
      break;
    case "159":
      daily_bible = "2Chronicles 26-28;John 17";
      break;
    case "160":
      daily_bible = "2Chronicles 29-31;John 18:1-23";
      break;
    case "161":
      daily_bible = "2Chronicles 32-33;John 18:24-40";
      break;
    case "162":
      daily_bible = "2Chronicles 34-36;John 19:1-22";
      break;
    case "163":
      daily_bible = "Ezra 1-2;John 19:23-42";
      break;
    case "164":
      daily_bible = "Ezra 3-5;John 20";
      break;
    case "165":
      daily_bible = "Ezra 6-8;John 21";
      break;
    case "166":
      daily_bible = "Ezra 9-10;Acts 1";
      break;
    case "167":
      daily_bible = "Nehemiah 1-3;Acts 2:1-13";
      break;
    case "168":
      daily_bible = "Nehemiah 4-6;Acts 2:14-47";
      break;
    case "169":
      daily_bible = "Nehemiah 7-8;Acts 3";
      break;
    case "170":
      daily_bible = "Nehemiah 9-11;Acts 4:1-22";
      break;
    case "171":
      daily_bible = "Nehemiah 12-13;Acts 4:23-37";
      break;
    case "172":
      daily_bible = "Esther 1-3;Acts 5:1-16";
      break;
    case "173":
      daily_bible = "Esther 4-6;Acts 5:17-42";
      break;
    case "174":
      daily_bible = "Esther 7-10;Acts 6";
      break;
    case "175":
      daily_bible = "Job 1-3;Acts 7:1-19";
      break;
    case "176":
      daily_bible = "Job 4-6;Acts 7:20-43";
      break;
    case "177":
      daily_bible = "Job 7-9;Acts 7:44-60";
      break;
    case "178":
      daily_bible = "Job 10-12;Acts 8:1-25";
      break;
    case "179":
      daily_bible = "Job 13-15;Acts 8:26-40";
      break;
    case "180":
      daily_bible = "Job 16-18;Acts 9:1-22";
      break;
    case "181":
      daily_bible = "Job 19-20;Acts 9:23-43";
      break;
    case "182":
      daily_bible = "Job 21-22;Acts 10:1-23";
      break;
    case "183":
      daily_bible = "Job 23-25;Acts 10:24-48";
      break;
    case "184":
      daily_bible = "Job 26-28;Acts 11";
      break;
    case "185":
      daily_bible = "Job 29-30;Acts 12";
      break;
    case "186":
      daily_bible = "Job 31-32;Acts 13:1-23";
      break;
    case "187":
      daily_bible = "Job 33-34;Acts 13:24-52";
      break;
    case "188":
      daily_bible = "Job 35-37;Acts 14";
      break;
    case "189":
      daily_bible = "Job 38-39;Acts 15:1-21";
      break;
    case "190":
      daily_bible = "Job 40-42;Acts 15:22-41";
      break;
    case "191":
      daily_bible = "Psalm 1-3;Acts 16:1-15";
      break;
    case "192":
      daily_bible = "Psalm 4-6;Acts 16:16-40";
      break;
    case "193":
      daily_bible = "Psalm 7-9;Acts 17:1-15";
      break;
    case "194":
      daily_bible = "Psalm 10-12;Acts 17:16-34";
      break;
    case "195":
      daily_bible = "Psalm 13-16;Acts 18";
      break;
    case "196":
      daily_bible = "Psalm 17-18;Acts 19:1-20";
      break;
    case "197":
      daily_bible = "Psalm 19-21;Acts 19:21-41";
      break;
    case "198":
      daily_bible = "Psalm 22-24;Acts 20:1-16";
      break;
    case "199":
      daily_bible = "Psalm 25-27;Acts 20:17-38";
      break;
    case "200":
      daily_bible = "Psalm 28-30;Acts 21:1-14";
      break;
    case "201":
      daily_bible = "Psalm 31-33;Acts 21:15-40";
      break;
    case "202":
      daily_bible = "Psalm 34-35;Acts 22";
      break;
    case "203":
      daily_bible = "Psalm 36-37;Acts 23:1-11";
      break;
    case "204":
      daily_bible = "Psalm 38-40;Acts 23:12-35";
      break;
    case "205":
      daily_bible = "Psalm 41-43;Acts 24";
      break;
    case "206":
      daily_bible = "Psalm 44-46;Acts 25";
      break;
    case "207":
      daily_bible = "Psalm 47-49;Acts 26";
      break;
    case "208":
      daily_bible = "Psalm 50-52;Acts 27:1-25";
      break;
    case "209":
      daily_bible = "Psalm 53-55;Acts 27:26-44";
      break;
    case "210":
      daily_bible = "Psalm 56-58;Acts 28:1-15";
      break;
    case "211":
      daily_bible = "Psalm 59-61;Acts 28:16-31";
      break;
    case "212":
      daily_bible = "Psalm 62-64;Romans 1";
      break;
    case "213":
      daily_bible = "Psalm 65-67;Romans 2";
      break;
    case "214":
      daily_bible = "Psalm 68-69;Romans 3";
      break;
    case "215":
      daily_bible = "Psalm 70-72;Romans 4";
      break;
    case "216":
      daily_bible = "Psalm 73-74;Romans 5";
      break;
    case "217":
      daily_bible = "Psalm 75-77;Romans 6";
      break;
    case "218":
      daily_bible = "Psalm 78;Romans 7";
      break;
    case "219":
      daily_bible = "Psalm 79-81;Romans 8:1-18";
      break;
    case "220":
      daily_bible = "Psalm 82-84;Romans 8:19-39";
      break;
    case "221":
      daily_bible = "Psalm 85-87;Romans 9";
      break;
    case "222":
      daily_bible = "Psalm 88-89;Romans 10";
      break;
    case "223":
      daily_bible = "Psalm 90-92;Romans 11:1-21";
      break;
    case "224":
      daily_bible = "Psalm 93-95;Romans 11:22-36";
      break;
    case "225":
      daily_bible = "Psalm 96-98;Romans 12";
      break;
    case "226":
      daily_bible = "Psalm 99-102;Romans 13";
      break;
    case "227":
      daily_bible = "Psalm 103-104;Romans 14";
      break;
    case "228":
      daily_bible = "Psalm 105-106;Romans 15:1-21";
      break;
    case "229":
      daily_bible = "Psalm 107-108;Romans 15:22-33";
      break;
    case "230":
      daily_bible = "Psalm 109-111;Romans 16";
      break;
    case "231":
      daily_bible = "Psalm 112-115;1Corinthians 1";
      break;
    case "232":
      daily_bible = " Psalm 116-118;1Corinthians 2";
      break;
    case "233":
      daily_bible = "Psalm 119:1-48;1Corinthians 3";
      break;
    case "234":
      daily_bible = "Psalm 119:49-104;1Corinthians 4";
      break;
    case "235":
      daily_bible = "Psalm 119:105-176;1Corinthians 5";
      break;
    case "236":
      daily_bible = "Psalm 120-123;1Corinthians 6";
      break;
    case "237":
      daily_bible = "Psalm 124-127;1Corinthians 7:1-24";
      break;
    case "238":
      daily_bible = "Psalm 128-131;1Corinthians 7:25-40";
      break;
    case "239":
      daily_bible = "Psalm 132-135;1Corinthians 8";
      break;
    case "240":
      daily_bible = "Psalm 136-138;1Corinthians 9";
      break;
    case "241":
      daily_bible = "Psalm 139-141;1Corinthians 10:1-13";
      break;
    case "242":
      daily_bible = "Psalm 142-144;1Corinthians 10:14-33";
      break;
    case "243":
      daily_bible = "Psalm 145-147;1Corinthians 11:1-15";
      break;
    case "244":
      daily_bible = "Psalm 148-150;1Corinthians 11:16-34";
      break;
    case "245":
      daily_bible = "Proverbs 1-2;1Corinthians 12";
      break;
    case "246":
      daily_bible = "Proverbs 3-4;1Corinthians 13";
      break;
    case "247":
      daily_bible = "Proverbs 5-6;1Corinthians 14:1-20";
      break;
    case "248":
      daily_bible = "Proverbs 7-8;1Corinthians 14:21-40";
      break;
    case "249":
      daily_bible = "Proverbs 9-10;1Corinthians 15:1-32";
      break;
    case "250":
      daily_bible = "Proverbs 11-12;1orinthians 15:33-58";
      break;
    case "251":
      daily_bible = "Proverbs 13-14;1Corinthians 16";
      break;
    case "252":
      daily_bible = "Proverbs 15-16;2Corinthians 1";
      break;
    case "253":
      daily_bible = "Proverbs 17-18;2Corinthians 2";
      break;
    case "254":
      daily_bible = "Proverbs 19-20;2Corinthians 3";
      break;
    case "255":
      daily_bible = "Proverbs 21-22;2Corinthians 4";
      break;
    case "256":
      daily_bible = "Proverbs 23-24;2Corinthians 5";
      break;
    case "257":
      daily_bible = "Proverbs 25-27;2Corinthians 6";
      break;
    case "258":
      daily_bible = "Proverbs 28-29;2Corinthians 7";
      break;
    case "259":
      daily_bible = "Proverbs 30-31;2Corinthians 8";
      break;
    case "260":
      daily_bible = "Ecclesiastes 1-3;2Corinthians 9";
      break;
    case "261":
      daily_bible = "Ecclesiastes 4-6;2Corinthians 10";
      break;
    case "262":
      daily_bible = "Ecclesiastes 7-9;2Corinthians 11:1-15";
      break;
    case "263":
      daily_bible = "Ecclesiastes 10-12;2Corinthians 11:16-33";
      break;
    case "264":
      daily_bible = "Songs 1-3;2Corinthians 12";
      break;
    case "265":
      daily_bible = "Songs 4-5;2Corinthians 13";
      break;
    case "266":
      daily_bible = "Songs 6-8;Galatians 1";
      break;
    case "267":
      daily_bible = "Isaiah 1-3;Galatians 2";
      break;
    case "268":
      daily_bible = "Isaiah 4-6;Galatians 3";
      break;
    case "269":
      daily_bible = "Isaiah 7-9;Galatians 4";
      break;
    case "270":
      daily_bible = "Isaiah 10-12;Galatians 5";
      break;
    case "271":
      daily_bible = "Isaiah 13-15;Galatians 6";
      break;
    case "272":
      daily_bible = "Isaiah 16-18;Ephesians 1";
      break;
    case "273":
      daily_bible = "Isaiah 19-21;Ephesians 2";
      break;
    case "274":
      daily_bible = "Isaiah 22-23;Ephesians 3";
      break;
    case "275":
      daily_bible = "Isaiah 24-26;Ephesians 4";
      break;
    case "276":
      daily_bible = "Isaiah 27-28;Ephesians 5";
      break;
    case "277":
      daily_bible = "Isaiah 29-30;Ephesians 6";
      break;
    case "278":
      daily_bible = "Isaiah 31-33;Philippians 1";
      break;
    case "279":
      daily_bible = "Isaiah 34-36;Philippians 2";
      break;
    case "280":
      daily_bible = "Isaiah 37-38;Philippians 3";
      break;
    case "281":
      daily_bible = "Isaiah 39-40;Philippians 4";
      break;
    case "282":
      daily_bible = "Isaiah 41-42;Colossians 1";
      break;
    case "283":
      daily_bible = "Isaiah 43-44;Colossians 2";
      break;
    case "284":
      daily_bible = "Isaiah 45-47;Colossians 3";
      break;
    case "285":
      daily_bible = " Isaiah 48-49;Colossians 4";
      break;
    case "286":
      daily_bible = "Isaiah 50-52;1Thessalonians 1";
      break;
    case "287":
      daily_bible = "Isaiah 53-55;1Thessalonians 2";
      break;
    case "288":
      daily_bible = "Isaiah 56-58;1Thessalonians 3";
      break;
    case "289":
      daily_bible = "Isaiah 59-61;1Thessalonians 4";
      break;
    case "290":
      daily_bible = "Isaiah 62-64;1Thessalonians 5";
      break;
    case "291":
      daily_bible = "Isaiah 65-66;2Thessalonians 1";
      break;
    case "292":
      daily_bible = "Jeremiah 1-2;2Thessalonians 2";
      break;
    case "293":
      daily_bible = "Jeremiah 3-4;2Thessalonians 3";
      break;
    case "294":
      daily_bible = "Jeremiah 5-6;1Timothy 1";
      break;
    case "295":
      daily_bible = "Jeremiah 7-8;1Timothy 2";
      break;
    case "296":
      daily_bible = "Jeremiah 9-10;1Timothy 3";
      break;
    case "297":
      daily_bible = "Jeremiah 11-13;1Timothy 4";
      break;
    case "298":
      daily_bible = " Jeremiah 14-16;1Timothy 5";
      break;
    case "299":
      daily_bible = "Jeremiah 17-19;1Timothy 6";
      break;
    case "300":
      daily_bible = "Jeremiah 20-22;2Timothy 1";
      break;
    case "301":
      daily_bible = "Jeremiah 23-24;2Timothy 2";
      break;
    case "302":
      daily_bible = "Jeremiah 25-26;2Timothy 3";
      break;
    case "303":
      daily_bible = "Jeremiah 27-28;2Timothy 4";
      break;
    case "304":
      daily_bible = "Jeremiah 29-30;Titus 1";
      break;
    case "305":
      daily_bible = "Jeremiah 31-32;Titus 2";
      break;
    case "306":
      daily_bible = "Jeremiah 33-35;Titus 3";
      break;
    case "307":
      daily_bible = "Jeremiah 36-37;Philemon";
      break;
    case "308":
      daily_bible = "Jeremiah 38-39;Hebrews 1";
      break;
    case "309":
      daily_bible = "Jeremiah 40-42;Hebrews 2";
      break;
    case "310":
      daily_bible = "Jeremiah 43-45;Hebrews 3";
      break;
    case "311":
      daily_bible = "Jeremiah 46-48;Hebrews 4";
      break;
    case "312":
      daily_bible = "Jeremiah 49-50;Hebrews 5";
      break;
    case "313":
      daily_bible = "Jeremiah 51-52;Hebrews 6";
      break;
    case "314":
      daily_bible = "Lamentations 1-2;Hebrews 7";
      break;
    case "315":
      daily_bible = "Lamentations 3-5;Hebrews 8";
      break;
    case "316":
      daily_bible = "Ezekiel 1-3;Hebrews 9";
      break;
    case "317":
      daily_bible = "Ezekiel 4-6;Hebrews 10:1-23";
      break;
    case "318":
      daily_bible = "Ezekiel 7-9;Hebrews 10:24-39";
      break;
    case "319":
      daily_bible = "Ezekiel 10-12;Hebrews 11:1-19";
      break;
    case "320":
      daily_bible = "Ezekiel 13-15;Hebrews 11:20-40";
      break;
    case "321":
      daily_bible = "Ezekiel 16;Hebrews 12";
      break;
    case "322":
      daily_bible = "Ezekiel 17-19;Hebrews 13";
      break;
    case "323":
      daily_bible = "Ezekiel 20-21;James 1";
      break;
    case "324":
      daily_bible = "Ezekiel 22-23;James 2";
      break;
    case "325":
      daily_bible = "Ezekiel 24-26;James 3";
      break;
    case "326":
      daily_bible = "Ezekiel 27-28;James 4";
      break;
    case "327":
      daily_bible = "Ezekiel 29-31;James 5";
      break;
    case "328":
      daily_bible = "Ezekiel 32-33;1Peter 1";
      break;
    case "329":
      daily_bible = "Ezekiel 34-35;1Peter 2";
      break;
    case "330":
      daily_bible = "Ezekiel 36-37;1Peter 3";
      break;
    case "331":
      daily_bible = "Ezekiel 38-39;1Peter 4";
      break;
    case "332":
      daily_bible = "Ezekiel 40;1Peter 5";
      break;
    case "333":
      daily_bible = "Ezekiel 41-42;2Peter 1";
      break;
    case "334":
      daily_bible = "Ezekiel 43-44;2Peter 2";
      break;
    case "335":
      daily_bible = "Ezekiel 45-46;2Peter 3";
      break;
    case "336":
      daily_bible = "Ezekiel 47-48;1John 1";
      break;
    case "337":
      daily_bible = "Daniel 1-2;1John 2";
      break;
    case "338":
      daily_bible = "Daniel 3-4;1John 3";
      break;
    case "339":
      daily_bible = "Daniel 5-6;1John 4";
      break;
    case "340":
      daily_bible = "Daniel 7-8;1John 5";
      break;
    case "341":
      daily_bible = "Daniel 9-10;2John 1";
      break;
    case "342":
      daily_bible = "Daniel 11-12;3John 1";
      break;
    case "343":
      daily_bible = "Hosea 1-4;Jude 1";
      break;
    case "344":
      daily_bible = "Hosea 5-8;Revelation 1";
      break;
    case "345":
      daily_bible = "Hosea 9-11;Revelation 2";
      break;
    case "346":
      daily_bible = "Hosea 12-14;Revelation 3";
      break;
    case "347":
      daily_bible = "Joel;Revelation 4";
      break;
    case "348":
      daily_bible = "Amos 1-3;Revelation 5";
      break;
    case "349":
      daily_bible = "Amos 4-6;Revelation 6";
      break;
    case "350":
      daily_bible = "Amos 7-9;Revelation 7";
      break;
    case "351":
      daily_bible = "Obadiah;Revelation 8";
      break;
    case "352":
      daily_bible = "Jonah;Revelation 9";
      break;
    case "353":
      daily_bible = "Micah 1-3;Revelation 10";
      break;
    case "354":
      daily_bible = "Micah 4-5;Revelation 11";
      break;
    case "355":
      daily_bible = "Micah 6-7;Revelation 12";
      break;
    case "356":
      daily_bible = "Nahum 1-3;Revelation 13";
      break;
    case "357":
      daily_bible = "Habakkuk 1-3;Revelation 14";
      break;
    case "358":
      daily_bible = "Zephaniah 1-3;Revelation 15";
      break;
    case "359":
      daily_bible = "Haggai 1-2;Revelation 16";
      break;
    case "360":
      daily_bible = "Zechariah 1-3;Revelation 17";
      break;
    case "361":
      daily_bible = "Zechariah 4-6;Revelation 18";
      break;
    case "362":
      daily_bible = "Zechariah 7-9;Revelation 19";
      break;
    case "363":
      daily_bible = "Zechariah 10-12;Revelation 20";
      break;
    case "364":
      daily_bible = "Zechariah 13-14;Revelation 21";
      break;
    case "365":
      daily_bible = "Malachi 1-4;Revelation 22";
      break;

    default:
      daily_bible = "Genesis 1-2;Matthew 1";
  }
  return daily_bible;
};

//Old and New Testament each day
export const getReadingChronologicalNT = value => {
  var daily_bible = " ";
  switch (value) {
    case "1":
      daily_bible = "Luke 1;John 1:1-14";
      break;
    case "2":
      daily_bible = "Matthew 1;Luke 2:1-38";
      break;
    case "3":
      daily_bible = "Matthew 2;Luke 2:39-52";
      break;
    case "4":
      daily_bible = "Matthew 3;Mark 1;Luke 3";
      break;
    case "5":
      daily_bible = "Matthew 4;Luke 4-5;John 1:15-51";
      break;
    case "6":
      daily_bible = "John 2-4";
      break;
    case "7":
      daily_bible = "Mark 2";
      break;
    case "8":
      daily_bible = "John 5";
      break;
    case "9":
      daily_bible = "Matthew 12:1-21;Mark 3;Luke 6";
      break;
    case "10":
      daily_bible = "Matthew 5-7";
      break;
    case "11":
      daily_bible = "Matthew 8:1-13;Luke 7";
      break;
    case "12":
      daily_bible = "Matthew 11";
      break;
    case "13":
      daily_bible = "Matthew 12:22-50;Luke 11";
      break;
    case "14":
      daily_bible = "Matthew 13;Luke 8";
      break;
    case "15":
      daily_bible = "Matthew 8:14-34;Mark 4-5";
      break;
    case "16":
      daily_bible = "Matthew 9-10";
      break;
    case "17":
      daily_bible = "Matthew 14;Mark 6;Luke 9:1-17";
      break;
    case "18":
      daily_bible = "John 6";
      break;
    case "19":
      daily_bible = "Matthew 15;Mark 7";
      break;
    case "20":
      daily_bible = "Matthew 16;Mark 8;Luke 9:18-27";
      break;
    case "21":
      daily_bible = "Matthew 17;Mark 9;Luke 9:28-62";
      break;
    case "22":
      daily_bible = "Matthew 18";
      break;
    case "23":
      daily_bible = "John 7-8";
      break;
    case "24":
      daily_bible = "John 9:1-41;John 10:1-21";
      break;
    case "25":
      daily_bible = "Luke 10;John 10:22-42";
      break;
    case "26":
      daily_bible = "Luke 12-13";
      break;
    case "27":
      daily_bible = "Luke 14-15";
      break;
    case "28":
      daily_bible = "Luke 16;Luke 17:1-10";
      break;
    case "29":
      daily_bible = "John 11";
      break;
    case "30":
      daily_bible = "Luke 17:11-37;Luke 18:1-14";
      break;
    case "31":
      daily_bible = "Matthew 19;Mark 10";
      break;
    case "32":
      daily_bible = "Matthew 20-21";
      break;
    case "33":
      daily_bible = "Luke 18:15-43;Luke 19:1-48";
      break;
    case "34":
      daily_bible = "Mark 11;John 12";
      break;
    case "35":
      daily_bible = "Matthew 22;Mark 12";
      break;
    case "36":
      daily_bible = "Matthew 23;Luke 20-21";
      break;
    case "37":
      daily_bible = "Mark 13";
      break;
    case "38":
      daily_bible = "Matthew 24";
      break;
    case "39":
      daily_bible = "Matthew 25";
      break;
    case "40":
      daily_bible = "Matthew 26;Mark 14";
      break;
    case "41":
      daily_bible = "Luke 22;John 13";
      break;
    case "42":
      daily_bible = "John 14-17";
      break;
    case "43":
      daily_bible = "Matthew 27;Mark 15";
      break;
    case "44":
      daily_bible = "Luke 23;John 18-19";
      break;
    case "45":
      daily_bible = "Matthew 28;Mark 16";
      break;
    case "46":
      daily_bible = "Luke 24;John 20-21";
      break;
    case "47":
      daily_bible = "Acts 1-3";
      break;
    case "48":
      daily_bible = "Acts 4-6";
      break;
    case "49":
      daily_bible = "Acts 7-8";
      break;
    case "50":
      daily_bible = "Acts 9-10";
      break;
    case "51":
      daily_bible = "Acts 11-12";
      break;
    case "52":
      daily_bible = "Acts 13-14";
      break;
    case "53":
      daily_bible = "James 1-5";
      break;
    case "54":
      daily_bible = "Acts 15-16";
      break;
    case "55":
      daily_bible = "Galatians 1-3";
      break;
    case "56":
      daily_bible = "Galatians 4-6";
      break;
    case "57":
      daily_bible = "Acts 17;Acts 18:1-18";
      break;
    case "58":
      daily_bible = "1Thessalonians 1-5;2Thessalonians 1-3";
      break;
    case "59":
      daily_bible = "Acts 18:19-28;Acts 19:1-41";
      break;
    case "60":
      daily_bible = "1Corinthians 1-4";
      break;
    case "61":
      daily_bible = "1Corinthians 5-8";
      break;
    case "62":
      daily_bible = "1Corinthians 9-11";
      break;
    case "63":
      daily_bible = "1Corinthians 12-14";
      break;
    case "64":
      daily_bible = "1Corinthians 15-16";
      break;
    case "65":
      daily_bible = "2Corinthians 1-4";
      break;
    case "66":
      daily_bible = "2Corinthians 5-9";
      break;
    case "67":
      daily_bible = "2Corinthians 10-13";
      break;
    case "68":
      daily_bible = "Acts 20:1-3;Romans 1-3";
      break;
    case "69":
      daily_bible = "Romans 4-7";
      break;
    case "70":
      daily_bible = "Romans 8-10";
      break;
    case "71":
      daily_bible = "Romans 11-13";
      break;
    case "72":
      daily_bible = "Romans 14-16";
      break;
    case "73":
      daily_bible = "Acts 20:4-38;Acts 21;Acts 22;Acts 23:1-35";
      break;
    case "74":
      daily_bible = "Acts 24-26";
      break;
    case "75":
      daily_bible = "Acts 27-28";
      break;
    case "76":
      daily_bible = "Colossians 1-4;Philemon";
      break;
    case "77":
      daily_bible = "Ephesians 1-6";
      break;
    case "78":
      daily_bible = "Philippians 1-4";
      break;
    case "79":
      daily_bible = "1Timothy 1-6";
      break;
    case "80":
      daily_bible = "Titus 1-3";
      break;
    case "81":
      daily_bible = "1Peter 1-5";
      break;
    case "82":
      daily_bible = "Hebrews 1-6";
      break;
    case "83":
      daily_bible = "Hebrews 7-10";
      break;
    case "84":
      daily_bible = "Hebrews 11-13";
      break;
    case "85":
      daily_bible = "2Timothy 1-4";
      break;
    case "86":
      daily_bible = "2Peter 1-3;Jude 1";
      break;
    case "87":
      daily_bible = "1John 1-5";
      break;
    case "88":
      daily_bible = "2John 1;3John 1";
      break;
    case "89":
      daily_bible = "Revelation 1-5";
      break;
    case "90":
      daily_bible = "Revelation 6-11";
      break;
    case "91":
      daily_bible = "Revelation 12-18";
      break;
    case "92":
      daily_bible = "Revelation 19-22";
      break;

    default:
      daily_bible = "Luke 1;John 1:1-14";
  }
  return daily_bible;
};
