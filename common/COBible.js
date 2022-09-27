export const getBookChapter = bookId => {
  if (bookId < 1) bookId = 1;
  if (bookId > 66) bookId = 66;
  return bookChapter[bookId];
};

export const getChapterVerse = chapId => {
  if (chapId < 1) chapId = 1;
  if (chapId > 31102) chapId = 31102;
  return chapterVerse[chapId];
};

export const getVid = (chapter, verseId) =>
{

  return chapterVerse[chapter].start + verseId;
}


export const getBookID = (value) =>  {
  var book_id = 40;
  switch (value)
  {
    case "Kej" : book_id =1; break;
    case "Kel" : book_id = 2; break;
    case "Im" : book_id = 3; break;
    case "Bil" : book_id = 4; break;
    case "Ul" : book_id = 5; break;
    case "Yos" : book_id = 6; break;
    case "Hak" : book_id = 7; break;
    case "Rut" : book_id = 8; break;
    case "1Sam" : book_id = 9; break;
    case "2Sam" : book_id = 10; break;
    case "1Raj" : book_id = 11; break;
    case "2Raj" : book_id = 12; break;
    case "1Taw" : book_id = 13; break;
    case "2Taw" : book_id = 14; break;
    case "Ezr" : book_id = 15; break;
    case "Neh" : book_id = 16; break;
    case "Est" : book_id = 17; break;
    case "Ayb" : book_id = 18; break;
    case "Mzm" : book_id = 19; break;
    case "Ams" : book_id = 20; break;
    case "Pkh" : book_id = 21; break;
    case "Kid" : book_id = 22; break;
    case "Yes" : book_id = 23; break;
    case "Yer" : book_id = 24; break;
    case "Rat" : book_id = 25; break;
    case "Yeh" : book_id = 26; break;  
    case "Dan" : book_id = 27; break;
    case "Hos" : book_id = 28; break;
    case "Yl" : book_id = 29; break;
    case "Am" : book_id = 30; break;
    case "Ob" : book_id = 31; break;
    case "Yun" : book_id = 32; break;
    case "Mi" : book_id = 33; break;
    case "Nah" : book_id = 34; break;
    case "Hab" : book_id = 35; break;
    case "Zef" : book_id = 36; break;
    case "Hag" : book_id = 37; break;
    case "Za" : book_id = 38; break;
    case "Mal" : book_id = 39; break;
    case "Mat" : book_id = 40; break;
    case "Mrk" : book_id = 41; break;
    case "Luk" : book_id = 42; break;
    case "Yoh" : book_id = 43; break;
    case "Kis" : book_id = 44; break;
    case "Rom" : book_id = 45; break;
    case "1Kor" : book_id = 46; break;
    case "2Kor" : book_id = 47; break;
    case "Gal" : book_id = 48; break;
    case "Ef" : book_id = 49; break;
    case "Flp" : book_id = 50; break;
    case "Kol" : book_id = 51; break;
    case "1Tes" : book_id = 52; break;
    case "2Tes" : book_id = 53; break;
    case "1Tim" : book_id = 54; break;
    case "2Tim" : book_id = 55; break;
    case "Tit" : book_id = 56; break;
    case "Flm" : book_id = 57; break;
    case "Ibr" : book_id = 58; break;
    case "Yak" : book_id = 59; break;
    case "1Ptr" : book_id = 60; break;
    case "2Ptr" : book_id = 61; break;
    case "1Yoh" : book_id = 62; break;
    case "2Yoh" : book_id = 63; break;
    case "3Yoh" : book_id = 64; break;
    case "Yud" : book_id = 65; break;
    case "Why" : book_id = 66; break;

    default:
      book_id = 40;
  }
      return book_id;

};
export const getBooks = () => {
  return mybooks;
};


const bookChapter = [];

bookChapter[1] = {
  end: 50,
  start: 0
};
bookChapter[2] = {
  end: 40,
  start: 50
};
bookChapter[3] = {
  end: 27,
  start: 90
};
bookChapter[4] = {
  end: 36,
  start: 117
};
bookChapter[5] = {
  end: 34,
  start: 153
};
bookChapter[6] = {
  end: 24,
  start: 187
};
bookChapter[7] = {
  end: 21,
  start: 211
};
bookChapter[8] = {
  end: 4,
  start: 232
};
bookChapter[9] = {
  end: 31,
  start: 236
};
bookChapter[10] = {
  end: 24,
  start: 267
};
bookChapter[11] = {
  end: 22,
  start: 291
};
bookChapter[12] = {
  end: 25,
  start: 313
};
bookChapter[13] = {
  end: 29,
  start: 338
};
bookChapter[14] = {
  end: 36,
  start: 367
};
bookChapter[15] = {
  end: 10,
  start: 403
};
bookChapter[16] = {
  end: 13,
  start: 413
};
bookChapter[17] = {
  end: 10,
  start: 426
};
bookChapter[18] = {
  end: 42,
  start: 436
};
bookChapter[19] = {
  end: 150,
  start: 478
};
bookChapter[20] = {
  end: 31,
  start: 628
};
bookChapter[21] = {
  end: 12,
  start: 659
};
bookChapter[22] = {
  end: 8,
  start: 671
};
bookChapter[23] = {
  end: 66,
  start: 679
};
bookChapter[24] = {
  end: 52,
  start: 745
};
bookChapter[25] = {
  end: 5,
  start: 797
};
bookChapter[26] = {
  end: 48,
  start: 802
};
bookChapter[27] = {
  end: 12,
  start: 850
};
bookChapter[28] = {
  end: 14,
  start: 862
};
bookChapter[29] = {
  end: 3,
  start: 876
};
bookChapter[30] = {
  end: 9,
  start: 879
};
bookChapter[31] = {
  end: 1,
  start: 888
};
bookChapter[32] = {
  end: 4,
  start: 889
};
bookChapter[33] = {
  end: 7,
  start: 893
};
bookChapter[34] = {
  end: 3,
  start: 900
};
bookChapter[35] = {
  end: 3,
  start: 903
};
bookChapter[36] = {
  end: 3,
  start: 906
};
bookChapter[37] = {
  end: 2,
  start: 909
};
bookChapter[38] = {
  end: 14,
  start: 911
};
bookChapter[39] = {
  end: 4,
  start: 925
};
bookChapter[40] = {
  end: 28,
  start: 929
};
bookChapter[41] = {
  end: 16,
  start: 957
};
bookChapter[42] = {
  end: 24,
  start: 973
};
bookChapter[43] = {
  end: 21,
  start: 997
};
bookChapter[44] = {
  end: 28,
  start: 1018
};
bookChapter[45] = {
  end: 16,
  start: 1046
};
bookChapter[46] = {
  end: 16,
  start: 1062
};
bookChapter[47] = {
  end: 13,
  start: 1078
};
bookChapter[48] = {
  end: 6,
  start: 1091
};
bookChapter[49] = {
  end: 6,
  start: 1097
};
bookChapter[50] = {
  end: 4,
  start: 1103
};
bookChapter[51] = {
  end: 4,
  start: 1107
};
bookChapter[52] = {
  end: 5,
  start: 1111
};
bookChapter[53] = {
  end: 3,
  start: 1116
};
bookChapter[54] = {
  end: 6,
  start: 1119
};
bookChapter[55] = {
  end: 4,
  start: 1125
};
bookChapter[56] = {
  end: 3,
  start: 1129
};
bookChapter[57] = {
  end: 1,
  start: 1132
};
bookChapter[58] = {
  end: 13,
  start: 1133
};
bookChapter[59] = {
  end: 5,
  start: 1146
};
bookChapter[60] = {
  end: 5,
  start: 1151
};
bookChapter[61] = {
  end: 3,
  start: 1156
};
bookChapter[62] = {
  end: 5,
  start: 1159
};
bookChapter[63] = {
  end: 1,
  start: 1164
};
bookChapter[64] = {
  end: 1,
  start: 1165
};
bookChapter[65] = {
  end: 1,
  start: 1166
};
bookChapter[66] = {
  end: 22,
  start: 1167
};

let chapterVerse = [];

chapterVerse[1] = {
  end: 31,
  start: 0
};
chapterVerse[2] = {
  end: 25,
  start: 31
};
chapterVerse[3] = {
  end: 24,
  start: 56
};
chapterVerse[4] = {
  end: 26,
  start: 80
};
chapterVerse[5] = {
  end: 32,
  start: 106
};
chapterVerse[6] = {
  end: 22,
  start: 138
};
chapterVerse[7] = {
  end: 24,
  start: 160
};
chapterVerse[8] = {
  end: 22,
  start: 184
};
chapterVerse[9] = {
  end: 29,
  start: 206
};
chapterVerse[10] = {
  end: 32,
  start: 235
};
chapterVerse[11] = {
  end: 32,
  start: 267
};
chapterVerse[12] = {
  end: 20,
  start: 299
};
chapterVerse[13] = {
  end: 18,
  start: 319
};
chapterVerse[14] = {
  end: 24,
  start: 337
};
chapterVerse[15] = {
  end: 21,
  start: 361
};
chapterVerse[16] = {
  end: 16,
  start: 382
};
chapterVerse[17] = {
  end: 27,
  start: 398
};
chapterVerse[18] = {
  end: 33,
  start: 425
};
chapterVerse[19] = {
  end: 38,
  start: 458
};
chapterVerse[20] = {
  end: 18,
  start: 496
};
chapterVerse[21] = {
  end: 34,
  start: 514
};
chapterVerse[22] = {
  end: 24,
  start: 548
};
chapterVerse[23] = {
  end: 20,
  start: 572
};
chapterVerse[24] = {
  end: 67,
  start: 592
};
chapterVerse[25] = {
  end: 34,
  start: 659
};
chapterVerse[26] = {
  end: 35,
  start: 693
};
chapterVerse[27] = {
  end: 46,
  start: 728
};
chapterVerse[28] = {
  end: 22,
  start: 774
};
chapterVerse[29] = {
  end: 35,
  start: 796
};
chapterVerse[30] = {
  end: 43,
  start: 831
};
chapterVerse[31] = {
  end: 55,
  start: 874
};
chapterVerse[32] = {
  end: 32,
  start: 929
};
chapterVerse[33] = {
  end: 20,
  start: 961
};
chapterVerse[34] = {
  end: 31,
  start: 981
};
chapterVerse[35] = {
  end: 29,
  start: 1012
};
chapterVerse[36] = {
  end: 43,
  start: 1041
};
chapterVerse[37] = {
  end: 36,
  start: 1084
};
chapterVerse[38] = {
  end: 30,
  start: 1120
};
chapterVerse[39] = {
  end: 23,
  start: 1150
};
chapterVerse[40] = {
  end: 23,
  start: 1173
};
chapterVerse[41] = {
  end: 57,
  start: 1196
};
chapterVerse[42] = {
  end: 38,
  start: 1253
};
chapterVerse[43] = {
  end: 34,
  start: 1291
};
chapterVerse[44] = {
  end: 34,
  start: 1325
};
chapterVerse[45] = {
  end: 28,
  start: 1359
};
chapterVerse[46] = {
  end: 34,
  start: 1387
};
chapterVerse[47] = {
  end: 31,
  start: 1421
};
chapterVerse[48] = {
  end: 22,
  start: 1452
};
chapterVerse[49] = {
  end: 33,
  start: 1474
};
chapterVerse[50] = {
  end: 26,
  start: 1507
};
chapterVerse[51] = {
  end: 22,
  start: 1533
};
chapterVerse[52] = {
  end: 25,
  start: 1555
};
chapterVerse[53] = {
  end: 22,
  start: 1580
};
chapterVerse[54] = {
  end: 31,
  start: 1602
};
chapterVerse[55] = {
  end: 23,
  start: 1633
};
chapterVerse[56] = {
  end: 30,
  start: 1656
};
chapterVerse[57] = {
  end: 25,
  start: 1686
};
chapterVerse[58] = {
  end: 32,
  start: 1711
};
chapterVerse[59] = {
  end: 35,
  start: 1743
};
chapterVerse[60] = {
  end: 29,
  start: 1778
};
chapterVerse[61] = {
  end: 10,
  start: 1807
};
chapterVerse[62] = {
  end: 51,
  start: 1817
};
chapterVerse[63] = {
  end: 22,
  start: 1868
};
chapterVerse[64] = {
  end: 31,
  start: 1890
};
chapterVerse[65] = {
  end: 27,
  start: 1921
};
chapterVerse[66] = {
  end: 36,
  start: 1948
};
chapterVerse[67] = {
  end: 16,
  start: 1984
};
chapterVerse[68] = {
  end: 27,
  start: 2000
};
chapterVerse[69] = {
  end: 25,
  start: 2027
};
chapterVerse[70] = {
  end: 26,
  start: 2052
};
chapterVerse[71] = {
  end: 36,
  start: 2078
};
chapterVerse[72] = {
  end: 31,
  start: 2114
};
chapterVerse[73] = {
  end: 33,
  start: 2145
};
chapterVerse[74] = {
  end: 18,
  start: 2178
};
chapterVerse[75] = {
  end: 40,
  start: 2196
};
chapterVerse[76] = {
  end: 37,
  start: 2236
};
chapterVerse[77] = {
  end: 21,
  start: 2273
};
chapterVerse[78] = {
  end: 43,
  start: 2294
};
chapterVerse[79] = {
  end: 46,
  start: 2337
};
chapterVerse[80] = {
  end: 38,
  start: 2383
};
chapterVerse[81] = {
  end: 18,
  start: 2421
};
chapterVerse[82] = {
  end: 35,
  start: 2439
};
chapterVerse[83] = {
  end: 23,
  start: 2474
};
chapterVerse[84] = {
  end: 35,
  start: 2497
};
chapterVerse[85] = {
  end: 35,
  start: 2532
};
chapterVerse[86] = {
  end: 38,
  start: 2567
};
chapterVerse[87] = {
  end: 29,
  start: 2605
};
chapterVerse[88] = {
  end: 31,
  start: 2634
};
chapterVerse[89] = {
  end: 43,
  start: 2665
};
chapterVerse[90] = {
  end: 38,
  start: 2708
};
chapterVerse[91] = {
  end: 17,
  start: 2746
};
chapterVerse[92] = {
  end: 16,
  start: 2763
};
chapterVerse[93] = {
  end: 17,
  start: 2779
};
chapterVerse[94] = {
  end: 35,
  start: 2796
};
chapterVerse[95] = {
  end: 19,
  start: 2831
};
chapterVerse[96] = {
  end: 30,
  start: 2850
};
chapterVerse[97] = {
  end: 38,
  start: 2880
};
chapterVerse[98] = {
  end: 36,
  start: 2918
};
chapterVerse[99] = {
  end: 24,
  start: 2954
};
chapterVerse[100] = {
  end: 20,
  start: 2978
};
chapterVerse[101] = {
  end: 47,
  start: 2998
};
chapterVerse[102] = {
  end: 8,
  start: 3045
};
chapterVerse[103] = {
  end: 59,
  start: 3053
};
chapterVerse[104] = {
  end: 57,
  start: 3112
};
chapterVerse[105] = {
  end: 33,
  start: 3169
};
chapterVerse[106] = {
  end: 34,
  start: 3202
};
chapterVerse[107] = {
  end: 16,
  start: 3236
};
chapterVerse[108] = {
  end: 30,
  start: 3252
};
chapterVerse[109] = {
  end: 37,
  start: 3282
};
chapterVerse[110] = {
  end: 27,
  start: 3319
};
chapterVerse[111] = {
  end: 24,
  start: 3346
};
chapterVerse[112] = {
  end: 33,
  start: 3370
};
chapterVerse[113] = {
  end: 44,
  start: 3403
};
chapterVerse[114] = {
  end: 23,
  start: 3447
};
chapterVerse[115] = {
  end: 55,
  start: 3470
};
chapterVerse[116] = {
  end: 46,
  start: 3525
};
chapterVerse[117] = {
  end: 34,
  start: 3571
};
chapterVerse[118] = {
  end: 54,
  start: 3605
};
chapterVerse[119] = {
  end: 34,
  start: 3659
};
chapterVerse[120] = {
  end: 51,
  start: 3693
};
chapterVerse[121] = {
  end: 49,
  start: 3744
};
chapterVerse[122] = {
  end: 31,
  start: 3793
};
chapterVerse[123] = {
  end: 27,
  start: 3824
};
chapterVerse[124] = {
  end: 89,
  start: 3851
};
chapterVerse[125] = {
  end: 26,
  start: 3940
};
chapterVerse[126] = {
  end: 23,
  start: 3966
};
chapterVerse[127] = {
  end: 36,
  start: 3989
};
chapterVerse[128] = {
  end: 35,
  start: 4025
};
chapterVerse[129] = {
  end: 16,
  start: 4060
};
chapterVerse[130] = {
  end: 33,
  start: 4076
};
chapterVerse[131] = {
  end: 45,
  start: 4109
};
chapterVerse[132] = {
  end: 41,
  start: 4154
};
chapterVerse[133] = {
  end: 50,
  start: 4195
};
chapterVerse[134] = {
  end: 13,
  start: 4245
};
chapterVerse[135] = {
  end: 32,
  start: 4258
};
chapterVerse[136] = {
  end: 22,
  start: 4290
};
chapterVerse[137] = {
  end: 29,
  start: 4312
};
chapterVerse[138] = {
  end: 35,
  start: 4341
};
chapterVerse[139] = {
  end: 41,
  start: 4376
};
chapterVerse[140] = {
  end: 30,
  start: 4417
};
chapterVerse[141] = {
  end: 25,
  start: 4447
};
chapterVerse[142] = {
  end: 18,
  start: 4472
};
chapterVerse[143] = {
  end: 65,
  start: 4490
};
chapterVerse[144] = {
  end: 23,
  start: 4555
};
chapterVerse[145] = {
  end: 31,
  start: 4578
};
chapterVerse[146] = {
  end: 40,
  start: 4609
};
chapterVerse[147] = {
  end: 16,
  start: 4649
};
chapterVerse[148] = {
  end: 54,
  start: 4665
};
chapterVerse[149] = {
  end: 42,
  start: 4719
};
chapterVerse[150] = {
  end: 56,
  start: 4761
};
chapterVerse[151] = {
  end: 29,
  start: 4817
};
chapterVerse[152] = {
  end: 34,
  start: 4846
};
chapterVerse[153] = {
  end: 13,
  start: 4880
};
chapterVerse[154] = {
  end: 46,
  start: 4893
};
chapterVerse[155] = {
  end: 37,
  start: 4939
};
chapterVerse[156] = {
  end: 29,
  start: 4976
};
chapterVerse[157] = {
  end: 49,
  start: 5005
};
chapterVerse[158] = {
  end: 33,
  start: 5054
};
chapterVerse[159] = {
  end: 25,
  start: 5087
};
chapterVerse[160] = {
  end: 26,
  start: 5112
};
chapterVerse[161] = {
  end: 20,
  start: 5138
};
chapterVerse[162] = {
  end: 29,
  start: 5158
};
chapterVerse[163] = {
  end: 22,
  start: 5187
};
chapterVerse[164] = {
  end: 32,
  start: 5209
};
chapterVerse[165] = {
  end: 32,
  start: 5241
};
chapterVerse[166] = {
  end: 18,
  start: 5273
};
chapterVerse[167] = {
  end: 29,
  start: 5291
};
chapterVerse[168] = {
  end: 23,
  start: 5320
};
chapterVerse[169] = {
  end: 22,
  start: 5343
};
chapterVerse[170] = {
  end: 20,
  start: 5365
};
chapterVerse[171] = {
  end: 22,
  start: 5385
};
chapterVerse[172] = {
  end: 21,
  start: 5407
};
chapterVerse[173] = {
  end: 20,
  start: 5428
};
chapterVerse[174] = {
  end: 23,
  start: 5448
};
chapterVerse[175] = {
  end: 30,
  start: 5471
};
chapterVerse[176] = {
  end: 25,
  start: 5501
};
chapterVerse[177] = {
  end: 22,
  start: 5526
};
chapterVerse[178] = {
  end: 19,
  start: 5548
};
chapterVerse[179] = {
  end: 19,
  start: 5567
};
chapterVerse[180] = {
  end: 26,
  start: 5586
};
chapterVerse[181] = {
  end: 68,
  start: 5612
};
chapterVerse[182] = {
  end: 29,
  start: 5680
};
chapterVerse[183] = {
  end: 20,
  start: 5709
};
chapterVerse[184] = {
  end: 30,
  start: 5729
};
chapterVerse[185] = {
  end: 52,
  start: 5759
};
chapterVerse[186] = {
  end: 29,
  start: 5811
};
chapterVerse[187] = {
  end: 12,
  start: 5840
};
chapterVerse[188] = {
  end: 18,
  start: 5852
};
chapterVerse[189] = {
  end: 24,
  start: 5870
};
chapterVerse[190] = {
  end: 17,
  start: 5894
};
chapterVerse[191] = {
  end: 24,
  start: 5911
};
chapterVerse[192] = {
  end: 15,
  start: 5935
};
chapterVerse[193] = {
  end: 27,
  start: 5950
};
chapterVerse[194] = {
  end: 26,
  start: 5977
};
chapterVerse[195] = {
  end: 35,
  start: 6003
};
chapterVerse[196] = {
  end: 27,
  start: 6038
};
chapterVerse[197] = {
  end: 43,
  start: 6065
};
chapterVerse[198] = {
  end: 23,
  start: 6108
};
chapterVerse[199] = {
  end: 24,
  start: 6131
};
chapterVerse[200] = {
  end: 33,
  start: 6155
};
chapterVerse[201] = {
  end: 15,
  start: 6188
};
chapterVerse[202] = {
  end: 63,
  start: 6203
};
chapterVerse[203] = {
  end: 10,
  start: 6266
};
chapterVerse[204] = {
  end: 18,
  start: 6276
};
chapterVerse[205] = {
  end: 28,
  start: 6294
};
chapterVerse[206] = {
  end: 51,
  start: 6322
};
chapterVerse[207] = {
  end: 9,
  start: 6373
};
chapterVerse[208] = {
  end: 45,
  start: 6382
};
chapterVerse[209] = {
  end: 34,
  start: 6427
};
chapterVerse[210] = {
  end: 16,
  start: 6461
};
chapterVerse[211] = {
  end: 33,
  start: 6477
};
chapterVerse[212] = {
  end: 36,
  start: 6510
};
chapterVerse[213] = {
  end: 23,
  start: 6546
};
chapterVerse[214] = {
  end: 31,
  start: 6569
};
chapterVerse[215] = {
  end: 24,
  start: 6600
};
chapterVerse[216] = {
  end: 31,
  start: 6624
};
chapterVerse[217] = {
  end: 40,
  start: 6655
};
chapterVerse[218] = {
  end: 25,
  start: 6695
};
chapterVerse[219] = {
  end: 35,
  start: 6720
};
chapterVerse[220] = {
  end: 57,
  start: 6755
};
chapterVerse[221] = {
  end: 18,
  start: 6812
};
chapterVerse[222] = {
  end: 40,
  start: 6830
};
chapterVerse[223] = {
  end: 15,
  start: 6870
};
chapterVerse[224] = {
  end: 25,
  start: 6885
};
chapterVerse[225] = {
  end: 20,
  start: 6910
};
chapterVerse[226] = {
  end: 20,
  start: 6930
};
chapterVerse[227] = {
  end: 31,
  start: 6950
};
chapterVerse[228] = {
  end: 13,
  start: 6981
};
chapterVerse[229] = {
  end: 31,
  start: 6994
};
chapterVerse[230] = {
  end: 30,
  start: 7025
};
chapterVerse[231] = {
  end: 48,
  start: 7055
};
chapterVerse[232] = {
  end: 25,
  start: 7103
};
chapterVerse[233] = {
  end: 22,
  start: 7128
};
chapterVerse[234] = {
  end: 23,
  start: 7150
};
chapterVerse[235] = {
  end: 18,
  start: 7173
};
chapterVerse[236] = {
  end: 22,
  start: 7191
};
chapterVerse[237] = {
  end: 28,
  start: 7213
};
chapterVerse[238] = {
  end: 36,
  start: 7241
};
chapterVerse[239] = {
  end: 21,
  start: 7277
};
chapterVerse[240] = {
  end: 22,
  start: 7298
};
chapterVerse[241] = {
  end: 12,
  start: 7320
};
chapterVerse[242] = {
  end: 21,
  start: 7332
};
chapterVerse[243] = {
  end: 17,
  start: 7353
};
chapterVerse[244] = {
  end: 22,
  start: 7370
};
chapterVerse[245] = {
  end: 27,
  start: 7392
};
chapterVerse[246] = {
  end: 27,
  start: 7419
};
chapterVerse[247] = {
  end: 15,
  start: 7446
};
chapterVerse[248] = {
  end: 25,
  start: 7461
};
chapterVerse[249] = {
  end: 23,
  start: 7486
};
chapterVerse[250] = {
  end: 52,
  start: 7509
};
chapterVerse[251] = {
  end: 35,
  start: 7561
};
chapterVerse[252] = {
  end: 23,
  start: 7596
};
chapterVerse[253] = {
  end: 58,
  start: 7619
};
chapterVerse[254] = {
  end: 30,
  start: 7677
};
chapterVerse[255] = {
  end: 24,
  start: 7707
};
chapterVerse[256] = {
  end: 42,
  start: 7731
};
chapterVerse[257] = {
  end: 15,
  start: 7773
};
chapterVerse[258] = {
  end: 23,
  start: 7788
};
chapterVerse[259] = {
  end: 29,
  start: 7811
};
chapterVerse[260] = {
  end: 22,
  start: 7840
};
chapterVerse[261] = {
  end: 44,
  start: 7862
};
chapterVerse[262] = {
  end: 25,
  start: 7906
};
chapterVerse[263] = {
  end: 12,
  start: 7931
};
chapterVerse[264] = {
  end: 25,
  start: 7943
};
chapterVerse[265] = {
  end: 11,
  start: 7968
};
chapterVerse[266] = {
  end: 31,
  start: 7979
};
chapterVerse[267] = {
  end: 13,
  start: 8010
};
chapterVerse[268] = {
  end: 27,
  start: 8023
};
chapterVerse[269] = {
  end: 32,
  start: 8050
};
chapterVerse[270] = {
  end: 39,
  start: 8082
};
chapterVerse[271] = {
  end: 12,
  start: 8121
};
chapterVerse[272] = {
  end: 25,
  start: 8133
};
chapterVerse[273] = {
  end: 23,
  start: 8158
};
chapterVerse[274] = {
  end: 29,
  start: 8181
};
chapterVerse[275] = {
  end: 18,
  start: 8210
};
chapterVerse[276] = {
  end: 13,
  start: 8228
};
chapterVerse[277] = {
  end: 19,
  start: 8241
};
chapterVerse[278] = {
  end: 27,
  start: 8260
};
chapterVerse[279] = {
  end: 31,
  start: 8287
};
chapterVerse[280] = {
  end: 39,
  start: 8318
};
chapterVerse[281] = {
  end: 33,
  start: 8357
};
chapterVerse[282] = {
  end: 37,
  start: 8390
};
chapterVerse[283] = {
  end: 23,
  start: 8427
};
chapterVerse[284] = {
  end: 29,
  start: 8450
};
chapterVerse[285] = {
  end: 33,
  start: 8479
};
chapterVerse[286] = {
  end: 43,
  start: 8512
};
chapterVerse[287] = {
  end: 26,
  start: 8555
};
chapterVerse[288] = {
  end: 22,
  start: 8581
};
chapterVerse[289] = {
  end: 51,
  start: 8603
};
chapterVerse[290] = {
  end: 39,
  start: 8654
};
chapterVerse[291] = {
  end: 25,
  start: 8693
};
chapterVerse[292] = {
  end: 53,
  start: 8718
};
chapterVerse[293] = {
  end: 46,
  start: 8771
};
chapterVerse[294] = {
  end: 28,
  start: 8817
};
chapterVerse[295] = {
  end: 34,
  start: 8845
};
chapterVerse[296] = {
  end: 18,
  start: 8879
};
chapterVerse[297] = {
  end: 38,
  start: 8897
};
chapterVerse[298] = {
  end: 51,
  start: 8935
};
chapterVerse[299] = {
  end: 66,
  start: 8986
};
chapterVerse[300] = {
  end: 28,
  start: 9052
};
chapterVerse[301] = {
  end: 29,
  start: 9080
};
chapterVerse[302] = {
  end: 43,
  start: 9109
};
chapterVerse[303] = {
  end: 33,
  start: 9152
};
chapterVerse[304] = {
  end: 34,
  start: 9185
};
chapterVerse[305] = {
  end: 31,
  start: 9219
};
chapterVerse[306] = {
  end: 34,
  start: 9250
};
chapterVerse[307] = {
  end: 34,
  start: 9284
};
chapterVerse[308] = {
  end: 24,
  start: 9318
};
chapterVerse[309] = {
  end: 46,
  start: 9342
};
chapterVerse[310] = {
  end: 21,
  start: 9388
};
chapterVerse[311] = {
  end: 43,
  start: 9409
};
chapterVerse[312] = {
  end: 29,
  start: 9452
};
chapterVerse[313] = {
  end: 53,
  start: 9481
};
chapterVerse[314] = {
  end: 18,
  start: 9534
};
chapterVerse[315] = {
  end: 25,
  start: 9552
};
chapterVerse[316] = {
  end: 27,
  start: 9577
};
chapterVerse[317] = {
  end: 44,
  start: 9604
};
chapterVerse[318] = {
  end: 27,
  start: 9648
};
chapterVerse[319] = {
  end: 33,
  start: 9675
};
chapterVerse[320] = {
  end: 20,
  start: 9708
};
chapterVerse[321] = {
  end: 29,
  start: 9728
};
chapterVerse[322] = {
  end: 37,
  start: 9757
};
chapterVerse[323] = {
  end: 36,
  start: 9794
};
chapterVerse[324] = {
  end: 21,
  start: 9830
};
chapterVerse[325] = {
  end: 21,
  start: 9851
};
chapterVerse[326] = {
  end: 25,
  start: 9872
};
chapterVerse[327] = {
  end: 29,
  start: 9897
};
chapterVerse[328] = {
  end: 38,
  start: 9926
};
chapterVerse[329] = {
  end: 20,
  start: 9964
};
chapterVerse[330] = {
  end: 41,
  start: 9984
};
chapterVerse[331] = {
  end: 37,
  start: 10025
};
chapterVerse[332] = {
  end: 37,
  start: 10062
};
chapterVerse[333] = {
  end: 21,
  start: 10099
};
chapterVerse[334] = {
  end: 26,
  start: 10120
};
chapterVerse[335] = {
  end: 20,
  start: 10146
};
chapterVerse[336] = {
  end: 37,
  start: 10166
};
chapterVerse[337] = {
  end: 20,
  start: 10203
};
chapterVerse[338] = {
  end: 30,
  start: 10223
};
chapterVerse[339] = {
  end: 54,
  start: 10253
};
chapterVerse[340] = {
  end: 55,
  start: 10307
};
chapterVerse[341] = {
  end: 24,
  start: 10362
};
chapterVerse[342] = {
  end: 43,
  start: 10386
};
chapterVerse[343] = {
  end: 26,
  start: 10429
};
chapterVerse[344] = {
  end: 81,
  start: 10455
};
chapterVerse[345] = {
  end: 40,
  start: 10536
};
chapterVerse[346] = {
  end: 40,
  start: 10576
};
chapterVerse[347] = {
  end: 44,
  start: 10616
};
chapterVerse[348] = {
  end: 14,
  start: 10660
};
chapterVerse[349] = {
  end: 47,
  start: 10674
};
chapterVerse[350] = {
  end: 40,
  start: 10721
};
chapterVerse[351] = {
  end: 14,
  start: 10761
};
chapterVerse[352] = {
  end: 17,
  start: 10775
};
chapterVerse[353] = {
  end: 29,
  start: 10792
};
chapterVerse[354] = {
  end: 43,
  start: 10821
};
chapterVerse[355] = {
  end: 27,
  start: 10864
};
chapterVerse[356] = {
  end: 17,
  start: 10891
};
chapterVerse[357] = {
  end: 19,
  start: 10908
};
chapterVerse[358] = {
  end: 8,
  start: 10927
};
chapterVerse[359] = {
  end: 30,
  start: 10935
};
chapterVerse[360] = {
  end: 19,
  start: 10965
};
chapterVerse[361] = {
  end: 32,
  start: 10984
};
chapterVerse[362] = {
  end: 31,
  start: 11016
};
chapterVerse[363] = {
  end: 31,
  start: 11047
};
chapterVerse[364] = {
  end: 32,
  start: 11078
};
chapterVerse[365] = {
  end: 34,
  start: 11110
};
chapterVerse[366] = {
  end: 21,
  start: 11144
};
chapterVerse[367] = {
  end: 30,
  start: 11165
};
chapterVerse[368] = {
  end: 17,
  start: 11195
};
chapterVerse[369] = {
  end: 18,
  start: 11212
};
chapterVerse[370] = {
  end: 17,
  start: 11230
};
chapterVerse[371] = {
  end: 22,
  start: 11247
};
chapterVerse[372] = {
  end: 14,
  start: 11269
};
chapterVerse[373] = {
  end: 42,
  start: 11283
};
chapterVerse[374] = {
  end: 22,
  start: 11325
};
chapterVerse[375] = {
  end: 18,
  start: 11347
};
chapterVerse[376] = {
  end: 31,
  start: 11365
};
chapterVerse[377] = {
  end: 19,
  start: 11396
};
chapterVerse[378] = {
  end: 23,
  start: 11415
};
chapterVerse[379] = {
  end: 16,
  start: 11438
};
chapterVerse[380] = {
  end: 22,
  start: 11454
};
chapterVerse[381] = {
  end: 15,
  start: 11476
};
chapterVerse[382] = {
  end: 19,
  start: 11491
};
chapterVerse[383] = {
  end: 14,
  start: 11510
};
chapterVerse[384] = {
  end: 19,
  start: 11524
};
chapterVerse[385] = {
  end: 34,
  start: 11543
};
chapterVerse[386] = {
  end: 11,
  start: 11577
};
chapterVerse[387] = {
  end: 37,
  start: 11588
};
chapterVerse[388] = {
  end: 20,
  start: 11625
};
chapterVerse[389] = {
  end: 12,
  start: 11645
};
chapterVerse[390] = {
  end: 21,
  start: 11657
};
chapterVerse[391] = {
  end: 27,
  start: 11678
};
chapterVerse[392] = {
  end: 28,
  start: 11705
};
chapterVerse[393] = {
  end: 23,
  start: 11733
};
chapterVerse[394] = {
  end: 9,
  start: 11756
};
chapterVerse[395] = {
  end: 27,
  start: 11765
};
chapterVerse[396] = {
  end: 36,
  start: 11792
};
chapterVerse[397] = {
  end: 27,
  start: 11828
};
chapterVerse[398] = {
  end: 21,
  start: 11855
};
chapterVerse[399] = {
  end: 33,
  start: 11876
};
chapterVerse[400] = {
  end: 25,
  start: 11909
};
chapterVerse[401] = {
  end: 33,
  start: 11934
};
chapterVerse[402] = {
  end: 27,
  start: 11967
};
chapterVerse[403] = {
  end: 23,
  start: 11994
};
chapterVerse[404] = {
  end: 11,
  start: 12017
};
chapterVerse[405] = {
  end: 70,
  start: 12028
};
chapterVerse[406] = {
  end: 13,
  start: 12098
};
chapterVerse[407] = {
  end: 24,
  start: 12111
};
chapterVerse[408] = {
  end: 17,
  start: 12135
};
chapterVerse[409] = {
  end: 22,
  start: 12152
};
chapterVerse[410] = {
  end: 28,
  start: 12174
};
chapterVerse[411] = {
  end: 36,
  start: 12202
};
chapterVerse[412] = {
  end: 15,
  start: 12238
};
chapterVerse[413] = {
  end: 44,
  start: 12253
};
chapterVerse[414] = {
  end: 11,
  start: 12297
};
chapterVerse[415] = {
  end: 20,
  start: 12308
};
chapterVerse[416] = {
  end: 32,
  start: 12328
};
chapterVerse[417] = {
  end: 23,
  start: 12360
};
chapterVerse[418] = {
  end: 19,
  start: 12383
};
chapterVerse[419] = {
  end: 19,
  start: 12402
};
chapterVerse[420] = {
  end: 73,
  start: 12421
};
chapterVerse[421] = {
  end: 18,
  start: 12494
};
chapterVerse[422] = {
  end: 38,
  start: 12512
};
chapterVerse[423] = {
  end: 39,
  start: 12550
};
chapterVerse[424] = {
  end: 36,
  start: 12589
};
chapterVerse[425] = {
  end: 47,
  start: 12625
};
chapterVerse[426] = {
  end: 31,
  start: 12672
};
chapterVerse[427] = {
  end: 22,
  start: 12703
};
chapterVerse[428] = {
  end: 23,
  start: 12725
};
chapterVerse[429] = {
  end: 15,
  start: 12748
};
chapterVerse[430] = {
  end: 17,
  start: 12763
};
chapterVerse[431] = {
  end: 14,
  start: 12780
};
chapterVerse[432] = {
  end: 14,
  start: 12794
};
chapterVerse[433] = {
  end: 10,
  start: 12808
};
chapterVerse[434] = {
  end: 17,
  start: 12818
};
chapterVerse[435] = {
  end: 32,
  start: 12835
};
chapterVerse[436] = {
  end: 3,
  start: 12867
};
chapterVerse[437] = {
  end: 22,
  start: 12870
};
chapterVerse[438] = {
  end: 13,
  start: 12892
};
chapterVerse[439] = {
  end: 26,
  start: 12905
};
chapterVerse[440] = {
  end: 21,
  start: 12931
};
chapterVerse[441] = {
  end: 27,
  start: 12952
};
chapterVerse[442] = {
  end: 30,
  start: 12979
};
chapterVerse[443] = {
  end: 21,
  start: 13009
};
chapterVerse[444] = {
  end: 22,
  start: 13030
};
chapterVerse[445] = {
  end: 35,
  start: 13052
};
chapterVerse[446] = {
  end: 22,
  start: 13087
};
chapterVerse[447] = {
  end: 20,
  start: 13109
};
chapterVerse[448] = {
  end: 25,
  start: 13129
};
chapterVerse[449] = {
  end: 28,
  start: 13154
};
chapterVerse[450] = {
  end: 22,
  start: 13182
};
chapterVerse[451] = {
  end: 35,
  start: 13204
};
chapterVerse[452] = {
  end: 22,
  start: 13239
};
chapterVerse[453] = {
  end: 16,
  start: 13261
};
chapterVerse[454] = {
  end: 21,
  start: 13277
};
chapterVerse[455] = {
  end: 29,
  start: 13298
};
chapterVerse[456] = {
  end: 29,
  start: 13327
};
chapterVerse[457] = {
  end: 34,
  start: 13356
};
chapterVerse[458] = {
  end: 30,
  start: 13390
};
chapterVerse[459] = {
  end: 17,
  start: 13420
};
chapterVerse[460] = {
  end: 25,
  start: 13437
};
chapterVerse[461] = {
  end: 6,
  start: 13462
};
chapterVerse[462] = {
  end: 14,
  start: 13468
};
chapterVerse[463] = {
  end: 23,
  start: 13482
};
chapterVerse[464] = {
  end: 28,
  start: 13505
};
chapterVerse[465] = {
  end: 25,
  start: 13533
};
chapterVerse[466] = {
  end: 31,
  start: 13558
};
chapterVerse[467] = {
  end: 40,
  start: 13589
};
chapterVerse[468] = {
  end: 22,
  start: 13629
};
chapterVerse[469] = {
  end: 33,
  start: 13651
};
chapterVerse[470] = {
  end: 37,
  start: 13684
};
chapterVerse[471] = {
  end: 16,
  start: 13721
};
chapterVerse[472] = {
  end: 33,
  start: 13737
};
chapterVerse[473] = {
  end: 24,
  start: 13770
};
chapterVerse[474] = {
  end: 41,
  start: 13794
};
chapterVerse[475] = {
  end: 30,
  start: 13835
};
chapterVerse[476] = {
  end: 24,
  start: 13865
};
chapterVerse[477] = {
  end: 34,
  start: 13889
};
chapterVerse[478] = {
  end: 17,
  start: 13923
};
chapterVerse[479] = {
  end: 6,
  start: 13940
};
chapterVerse[480] = {
  end: 12,
  start: 13946
};
chapterVerse[481] = {
  end: 8,
  start: 13958
};
chapterVerse[482] = {
  end: 8,
  start: 13966
};
chapterVerse[483] = {
  end: 12,
  start: 13974
};
chapterVerse[484] = {
  end: 10,
  start: 13986
};
chapterVerse[485] = {
  end: 17,
  start: 13996
};
chapterVerse[486] = {
  end: 9,
  start: 14013
};
chapterVerse[487] = {
  end: 20,
  start: 14022
};
chapterVerse[488] = {
  end: 18,
  start: 14042
};
chapterVerse[489] = {
  end: 7,
  start: 14060
};
chapterVerse[490] = {
  end: 8,
  start: 14067
};
chapterVerse[491] = {
  end: 6,
  start: 14075
};
chapterVerse[492] = {
  end: 7,
  start: 14081
};
chapterVerse[493] = {
  end: 5,
  start: 14088
};
chapterVerse[494] = {
  end: 11,
  start: 14093
};
chapterVerse[495] = {
  end: 15,
  start: 14104
};
chapterVerse[496] = {
  end: 50,
  start: 14119
};
chapterVerse[497] = {
  end: 14,
  start: 14169
};
chapterVerse[498] = {
  end: 9,
  start: 14183
};
chapterVerse[499] = {
  end: 13,
  start: 14192
};
chapterVerse[500] = {
  end: 31,
  start: 14205
};
chapterVerse[501] = {
  end: 6,
  start: 14236
};
chapterVerse[502] = {
  end: 10,
  start: 14242
};
chapterVerse[503] = {
  end: 22,
  start: 14252
};
chapterVerse[504] = {
  end: 12,
  start: 14274
};
chapterVerse[505] = {
  end: 14,
  start: 14286
};
chapterVerse[506] = {
  end: 9,
  start: 14300
};
chapterVerse[507] = {
  end: 11,
  start: 14309
};
chapterVerse[508] = {
  end: 12,
  start: 14320
};
chapterVerse[509] = {
  end: 24,
  start: 14332
};
chapterVerse[510] = {
  end: 11,
  start: 14356
};
chapterVerse[511] = {
  end: 22,
  start: 14367
};
chapterVerse[512] = {
  end: 22,
  start: 14389
};
chapterVerse[513] = {
  end: 28,
  start: 14411
};
chapterVerse[514] = {
  end: 12,
  start: 14439
};
chapterVerse[515] = {
  end: 40,
  start: 14451
};
chapterVerse[516] = {
  end: 22,
  start: 14491
};
chapterVerse[517] = {
  end: 13,
  start: 14513
};
chapterVerse[518] = {
  end: 17,
  start: 14526
};
chapterVerse[519] = {
  end: 13,
  start: 14543
};
chapterVerse[520] = {
  end: 11,
  start: 14556
};
chapterVerse[521] = {
  end: 5,
  start: 14567
};
chapterVerse[522] = {
  end: 26,
  start: 14572
};
chapterVerse[523] = {
  end: 17,
  start: 14598
};
chapterVerse[524] = {
  end: 11,
  start: 14615
};
chapterVerse[525] = {
  end: 9,
  start: 14626
};
chapterVerse[526] = {
  end: 14,
  start: 14635
};
chapterVerse[527] = {
  end: 20,
  start: 14649
};
chapterVerse[528] = {
  end: 23,
  start: 14669
};
chapterVerse[529] = {
  end: 19,
  start: 14692
};
chapterVerse[530] = {
  end: 9,
  start: 14711
};
chapterVerse[531] = {
  end: 6,
  start: 14720
};
chapterVerse[532] = {
  end: 7,
  start: 14726
};
chapterVerse[533] = {
  end: 23,
  start: 14733
};
chapterVerse[534] = {
  end: 13,
  start: 14756
};
chapterVerse[535] = {
  end: 11,
  start: 14769
};
chapterVerse[536] = {
  end: 11,
  start: 14780
};
chapterVerse[537] = {
  end: 17,
  start: 14791
};
chapterVerse[538] = {
  end: 12,
  start: 14808
};
chapterVerse[539] = {
  end: 8,
  start: 14820
};
chapterVerse[540] = {
  end: 12,
  start: 14828
};
chapterVerse[541] = {
  end: 11,
  start: 14840
};
chapterVerse[542] = {
  end: 10,
  start: 14851
};
chapterVerse[543] = {
  end: 13,
  start: 14861
};
chapterVerse[544] = {
  end: 20,
  start: 14874
};
chapterVerse[545] = {
  end: 7,
  start: 14894
};
chapterVerse[546] = {
  end: 35,
  start: 14901
};
chapterVerse[547] = {
  end: 36,
  start: 14936
};
chapterVerse[548] = {
  end: 5,
  start: 14972
};
chapterVerse[549] = {
  end: 24,
  start: 14977
};
chapterVerse[550] = {
  end: 20,
  start: 15001
};
chapterVerse[551] = {
  end: 28,
  start: 15021
};
chapterVerse[552] = {
  end: 23,
  start: 15049
};
chapterVerse[553] = {
  end: 10,
  start: 15072
};
chapterVerse[554] = {
  end: 12,
  start: 15082
};
chapterVerse[555] = {
  end: 20,
  start: 15094
};
chapterVerse[556] = {
  end: 72,
  start: 15114
};
chapterVerse[557] = {
  end: 13,
  start: 15186
};
chapterVerse[558] = {
  end: 19,
  start: 15199
};
chapterVerse[559] = {
  end: 16,
  start: 15218
};
chapterVerse[560] = {
  end: 8,
  start: 15234
};
chapterVerse[561] = {
  end: 18,
  start: 15242
};
chapterVerse[562] = {
  end: 12,
  start: 15260
};
chapterVerse[563] = {
  end: 13,
  start: 15272
};
chapterVerse[564] = {
  end: 17,
  start: 15285
};
chapterVerse[565] = {
  end: 7,
  start: 15302
};
chapterVerse[566] = {
  end: 18,
  start: 15309
};
chapterVerse[567] = {
  end: 52,
  start: 15327
};
chapterVerse[568] = {
  end: 17,
  start: 15379
};
chapterVerse[569] = {
  end: 16,
  start: 15396
};
chapterVerse[570] = {
  end: 15,
  start: 15412
};
chapterVerse[571] = {
  end: 5,
  start: 15427
};
chapterVerse[572] = {
  end: 23,
  start: 15432
};
chapterVerse[573] = {
  end: 11,
  start: 15455
};
chapterVerse[574] = {
  end: 13,
  start: 15466
};
chapterVerse[575] = {
  end: 12,
  start: 15479
};
chapterVerse[576] = {
  end: 9,
  start: 15491
};
chapterVerse[577] = {
  end: 9,
  start: 15500
};
chapterVerse[578] = {
  end: 5,
  start: 15509
};
chapterVerse[579] = {
  end: 8,
  start: 15514
};
chapterVerse[580] = {
  end: 28,
  start: 15522
};
chapterVerse[581] = {
  end: 22,
  start: 15550
};
chapterVerse[582] = {
  end: 35,
  start: 15572
};
chapterVerse[583] = {
  end: 45,
  start: 15607
};
chapterVerse[584] = {
  end: 48,
  start: 15652
};
chapterVerse[585] = {
  end: 43,
  start: 15700
};
chapterVerse[586] = {
  end: 13,
  start: 15743
};
chapterVerse[587] = {
  end: 31,
  start: 15756
};
chapterVerse[588] = {
  end: 7,
  start: 15787
};
chapterVerse[589] = {
  end: 10,
  start: 15794
};
chapterVerse[590] = {
  end: 10,
  start: 15804
};
chapterVerse[591] = {
  end: 9,
  start: 15814
};
chapterVerse[592] = {
  end: 8,
  start: 15823
};
chapterVerse[593] = {
  end: 18,
  start: 15831
};
chapterVerse[594] = {
  end: 19,
  start: 15849
};
chapterVerse[595] = {
  end: 2,
  start: 15868
};
chapterVerse[596] = {
  end: 29,
  start: 15870
};
chapterVerse[597] = {
  end: 176,
  start: 15899
};
chapterVerse[598] = {
  end: 7,
  start: 16075
};
chapterVerse[599] = {
  end: 8,
  start: 16082
};
chapterVerse[600] = {
  end: 9,
  start: 16090
};
chapterVerse[601] = {
  end: 4,
  start: 16099
};
chapterVerse[602] = {
  end: 8,
  start: 16103
};
chapterVerse[603] = {
  end: 5,
  start: 16111
};
chapterVerse[604] = {
  end: 6,
  start: 16116
};
chapterVerse[605] = {
  end: 5,
  start: 16122
};
chapterVerse[606] = {
  end: 6,
  start: 16127
};
chapterVerse[607] = {
  end: 8,
  start: 16133
};
chapterVerse[608] = {
  end: 8,
  start: 16141
};
chapterVerse[609] = {
  end: 3,
  start: 16149
};
chapterVerse[610] = {
  end: 18,
  start: 16152
};
chapterVerse[611] = {
  end: 3,
  start: 16170
};
chapterVerse[612] = {
  end: 3,
  start: 16173
};
chapterVerse[613] = {
  end: 21,
  start: 16176
};
chapterVerse[614] = {
  end: 26,
  start: 16197
};
chapterVerse[615] = {
  end: 9,
  start: 16223
};
chapterVerse[616] = {
  end: 8,
  start: 16232
};
chapterVerse[617] = {
  end: 24,
  start: 16240
};
chapterVerse[618] = {
  end: 13,
  start: 16264
};
chapterVerse[619] = {
  end: 10,
  start: 16277
};
chapterVerse[620] = {
  end: 7,
  start: 16287
};
chapterVerse[621] = {
  end: 12,
  start: 16294
};
chapterVerse[622] = {
  end: 15,
  start: 16306
};
chapterVerse[623] = {
  end: 21,
  start: 16321
};
chapterVerse[624] = {
  end: 10,
  start: 16342
};
chapterVerse[625] = {
  end: 20,
  start: 16352
};
chapterVerse[626] = {
  end: 14,
  start: 16372
};
chapterVerse[627] = {
  end: 9,
  start: 16386
};
chapterVerse[628] = {
  end: 6,
  start: 16395
};
chapterVerse[629] = {
  end: 33,
  start: 16401
};
chapterVerse[630] = {
  end: 22,
  start: 16434
};
chapterVerse[631] = {
  end: 35,
  start: 16456
};
chapterVerse[632] = {
  end: 27,
  start: 16491
};
chapterVerse[633] = {
  end: 23,
  start: 16518
};
chapterVerse[634] = {
  end: 35,
  start: 16541
};
chapterVerse[635] = {
  end: 27,
  start: 16576
};
chapterVerse[636] = {
  end: 36,
  start: 16603
};
chapterVerse[637] = {
  end: 18,
  start: 16639
};
chapterVerse[638] = {
  end: 32,
  start: 16657
};
chapterVerse[639] = {
  end: 31,
  start: 16689
};
chapterVerse[640] = {
  end: 28,
  start: 16720
};
chapterVerse[641] = {
  end: 25,
  start: 16748
};
chapterVerse[642] = {
  end: 35,
  start: 16773
};
chapterVerse[643] = {
  end: 33,
  start: 16808
};
chapterVerse[644] = {
  end: 33,
  start: 16841
};
chapterVerse[645] = {
  end: 28,
  start: 16874
};
chapterVerse[646] = {
  end: 24,
  start: 16902
};
chapterVerse[647] = {
  end: 29,
  start: 16926
};
chapterVerse[648] = {
  end: 30,
  start: 16955
};
chapterVerse[649] = {
  end: 31,
  start: 16985
};
chapterVerse[650] = {
  end: 29,
  start: 17016
};
chapterVerse[651] = {
  end: 35,
  start: 17045
};
chapterVerse[652] = {
  end: 34,
  start: 17080
};
chapterVerse[653] = {
  end: 28,
  start: 17114
};
chapterVerse[654] = {
  end: 28,
  start: 17142
};
chapterVerse[655] = {
  end: 27,
  start: 17170
};
chapterVerse[656] = {
  end: 28,
  start: 17197
};
chapterVerse[657] = {
  end: 27,
  start: 17225
};
chapterVerse[658] = {
  end: 33,
  start: 17252
};
chapterVerse[659] = {
  end: 31,
  start: 17285
};
chapterVerse[660] = {
  end: 18,
  start: 17316
};
chapterVerse[661] = {
  end: 26,
  start: 17334
};
chapterVerse[662] = {
  end: 22,
  start: 17360
};
chapterVerse[663] = {
  end: 16,
  start: 17382
};
chapterVerse[664] = {
  end: 20,
  start: 17398
};
chapterVerse[665] = {
  end: 12,
  start: 17418
};
chapterVerse[666] = {
  end: 29,
  start: 17430
};
chapterVerse[667] = {
  end: 17,
  start: 17459
};
chapterVerse[668] = {
  end: 18,
  start: 17476
};
chapterVerse[669] = {
  end: 20,
  start: 17494
};
chapterVerse[670] = {
  end: 10,
  start: 17514
};
chapterVerse[671] = {
  end: 14,
  start: 17524
};
chapterVerse[672] = {
  end: 17,
  start: 17538
};
chapterVerse[673] = {
  end: 17,
  start: 17555
};
chapterVerse[674] = {
  end: 11,
  start: 17572
};
chapterVerse[675] = {
  end: 16,
  start: 17583
};
chapterVerse[676] = {
  end: 16,
  start: 17599
};
chapterVerse[677] = {
  end: 13,
  start: 17615
};
chapterVerse[678] = {
  end: 13,
  start: 17628
};
chapterVerse[679] = {
  end: 14,
  start: 17641
};
chapterVerse[680] = {
  end: 31,
  start: 17655
};
chapterVerse[681] = {
  end: 22,
  start: 17686
};
chapterVerse[682] = {
  end: 26,
  start: 17708
};
chapterVerse[683] = {
  end: 6,
  start: 17734
};
chapterVerse[684] = {
  end: 30,
  start: 17740
};
chapterVerse[685] = {
  end: 13,
  start: 17770
};
chapterVerse[686] = {
  end: 25,
  start: 17783
};
chapterVerse[687] = {
  end: 22,
  start: 17808
};
chapterVerse[688] = {
  end: 21,
  start: 17830
};
chapterVerse[689] = {
  end: 34,
  start: 17851
};
chapterVerse[690] = {
  end: 16,
  start: 17885
};
chapterVerse[691] = {
  end: 6,
  start: 17901
};
chapterVerse[692] = {
  end: 22,
  start: 17907
};
chapterVerse[693] = {
  end: 32,
  start: 17929
};
chapterVerse[694] = {
  end: 9,
  start: 17961
};
chapterVerse[695] = {
  end: 14,
  start: 17970
};
chapterVerse[696] = {
  end: 14,
  start: 17984
};
chapterVerse[697] = {
  end: 7,
  start: 17998
};
chapterVerse[698] = {
  end: 25,
  start: 18005
};
chapterVerse[699] = {
  end: 6,
  start: 18030
};
chapterVerse[700] = {
  end: 17,
  start: 18036
};
chapterVerse[701] = {
  end: 25,
  start: 18053
};
chapterVerse[702] = {
  end: 18,
  start: 18078
};
chapterVerse[703] = {
  end: 23,
  start: 18096
};
chapterVerse[704] = {
  end: 12,
  start: 18119
};
chapterVerse[705] = {
  end: 21,
  start: 18131
};
chapterVerse[706] = {
  end: 13,
  start: 18152
};
chapterVerse[707] = {
  end: 29,
  start: 18165
};
chapterVerse[708] = {
  end: 24,
  start: 18194
};
chapterVerse[709] = {
  end: 33,
  start: 18218
};
chapterVerse[710] = {
  end: 9,
  start: 18251
};
chapterVerse[711] = {
  end: 20,
  start: 18260
};
chapterVerse[712] = {
  end: 24,
  start: 18280
};
chapterVerse[713] = {
  end: 17,
  start: 18304
};
chapterVerse[714] = {
  end: 10,
  start: 18321
};
chapterVerse[715] = {
  end: 22,
  start: 18331
};
chapterVerse[716] = {
  end: 38,
  start: 18353
};
chapterVerse[717] = {
  end: 22,
  start: 18391
};
chapterVerse[718] = {
  end: 8,
  start: 18413
};
chapterVerse[719] = {
  end: 31,
  start: 18421
};
chapterVerse[720] = {
  end: 29,
  start: 18452
};
chapterVerse[721] = {
  end: 25,
  start: 18481
};
chapterVerse[722] = {
  end: 28,
  start: 18506
};
chapterVerse[723] = {
  end: 28,
  start: 18534
};
chapterVerse[724] = {
  end: 25,
  start: 18562
};
chapterVerse[725] = {
  end: 13,
  start: 18587
};
chapterVerse[726] = {
  end: 15,
  start: 18600
};
chapterVerse[727] = {
  end: 22,
  start: 18615
};
chapterVerse[728] = {
  end: 26,
  start: 18637
};
chapterVerse[729] = {
  end: 11,
  start: 18663
};
chapterVerse[730] = {
  end: 23,
  start: 18674
};
chapterVerse[731] = {
  end: 15,
  start: 18697
};
chapterVerse[732] = {
  end: 12,
  start: 18712
};
chapterVerse[733] = {
  end: 17,
  start: 18724
};
chapterVerse[734] = {
  end: 13,
  start: 18741
};
chapterVerse[735] = {
  end: 12,
  start: 18754
};
chapterVerse[736] = {
  end: 21,
  start: 18766
};
chapterVerse[737] = {
  end: 14,
  start: 18787
};
chapterVerse[738] = {
  end: 21,
  start: 18801
};
chapterVerse[739] = {
  end: 22,
  start: 18822
};
chapterVerse[740] = {
  end: 11,
  start: 18844
};
chapterVerse[741] = {
  end: 12,
  start: 18855
};
chapterVerse[742] = {
  end: 19,
  start: 18867
};
chapterVerse[743] = {
  end: 12,
  start: 18886
};
chapterVerse[744] = {
  end: 25,
  start: 18898
};
chapterVerse[745] = {
  end: 24,
  start: 18923
};
chapterVerse[746] = {
  end: 19,
  start: 18947
};
chapterVerse[747] = {
  end: 37,
  start: 18966
};
chapterVerse[748] = {
  end: 25,
  start: 19003
};
chapterVerse[749] = {
  end: 31,
  start: 19028
};
chapterVerse[750] = {
  end: 31,
  start: 19059
};
chapterVerse[751] = {
  end: 30,
  start: 19090
};
chapterVerse[752] = {
  end: 34,
  start: 19120
};
chapterVerse[753] = {
  end: 22,
  start: 19154
};
chapterVerse[754] = {
  end: 26,
  start: 19176
};
chapterVerse[755] = {
  end: 25,
  start: 19202
};
chapterVerse[756] = {
  end: 23,
  start: 19227
};
chapterVerse[757] = {
  end: 17,
  start: 19250
};
chapterVerse[758] = {
  end: 27,
  start: 19267
};
chapterVerse[759] = {
  end: 22,
  start: 19294
};
chapterVerse[760] = {
  end: 21,
  start: 19316
};
chapterVerse[761] = {
  end: 21,
  start: 19337
};
chapterVerse[762] = {
  end: 27,
  start: 19358
};
chapterVerse[763] = {
  end: 23,
  start: 19385
};
chapterVerse[764] = {
  end: 15,
  start: 19408
};
chapterVerse[765] = {
  end: 18,
  start: 19423
};
chapterVerse[766] = {
  end: 14,
  start: 19441
};
chapterVerse[767] = {
  end: 30,
  start: 19455
};
chapterVerse[768] = {
  end: 40,
  start: 19485
};
chapterVerse[769] = {
  end: 10,
  start: 19525
};
chapterVerse[770] = {
  end: 38,
  start: 19535
};
chapterVerse[771] = {
  end: 24,
  start: 19573
};
chapterVerse[772] = {
  end: 22,
  start: 19597
};
chapterVerse[773] = {
  end: 17,
  start: 19619
};
chapterVerse[774] = {
  end: 32,
  start: 19636
};
chapterVerse[775] = {
  end: 24,
  start: 19668
};
chapterVerse[776] = {
  end: 40,
  start: 19692
};
chapterVerse[777] = {
  end: 44,
  start: 19732
};
chapterVerse[778] = {
  end: 26,
  start: 19776
};
chapterVerse[779] = {
  end: 22,
  start: 19802
};
chapterVerse[780] = {
  end: 19,
  start: 19824
};
chapterVerse[781] = {
  end: 32,
  start: 19843
};
chapterVerse[782] = {
  end: 21,
  start: 19875
};
chapterVerse[783] = {
  end: 28,
  start: 19896
};
chapterVerse[784] = {
  end: 18,
  start: 19924
};
chapterVerse[785] = {
  end: 16,
  start: 19942
};
chapterVerse[786] = {
  end: 18,
  start: 19958
};
chapterVerse[787] = {
  end: 22,
  start: 19976
};
chapterVerse[788] = {
  end: 13,
  start: 19998
};
chapterVerse[789] = {
  end: 30,
  start: 20011
};
chapterVerse[790] = {
  end: 5,
  start: 20041
};
chapterVerse[791] = {
  end: 28,
  start: 20046
};
chapterVerse[792] = {
  end: 7,
  start: 20074
};
chapterVerse[793] = {
  end: 47,
  start: 20081
};
chapterVerse[794] = {
  end: 39,
  start: 20128
};
chapterVerse[795] = {
  end: 46,
  start: 20167
};
chapterVerse[796] = {
  end: 64,
  start: 20213
};
chapterVerse[797] = {
  end: 34,
  start: 20277
};
chapterVerse[798] = {
  end: 22,
  start: 20311
};
chapterVerse[799] = {
  end: 22,
  start: 20333
};
chapterVerse[800] = {
  end: 66,
  start: 20355
};
chapterVerse[801] = {
  end: 22,
  start: 20421
};
chapterVerse[802] = {
  end: 22,
  start: 20443
};
chapterVerse[803] = {
  end: 28,
  start: 20465
};
chapterVerse[804] = {
  end: 10,
  start: 20493
};
chapterVerse[805] = {
  end: 27,
  start: 20503
};
chapterVerse[806] = {
  end: 17,
  start: 20530
};
chapterVerse[807] = {
  end: 17,
  start: 20547
};
chapterVerse[808] = {
  end: 14,
  start: 20564
};
chapterVerse[809] = {
  end: 27,
  start: 20578
};
chapterVerse[810] = {
  end: 18,
  start: 20605
};
chapterVerse[811] = {
  end: 11,
  start: 20623
};
chapterVerse[812] = {
  end: 22,
  start: 20634
};
chapterVerse[813] = {
  end: 25,
  start: 20656
};
chapterVerse[814] = {
  end: 28,
  start: 20681
};
chapterVerse[815] = {
  end: 23,
  start: 20709
};
chapterVerse[816] = {
  end: 23,
  start: 20732
};
chapterVerse[817] = {
  end: 8,
  start: 20755
};
chapterVerse[818] = {
  end: 63,
  start: 20763
};
chapterVerse[819] = {
  end: 24,
  start: 20826
};
chapterVerse[820] = {
  end: 32,
  start: 20850
};
chapterVerse[821] = {
  end: 14,
  start: 20882
};
chapterVerse[822] = {
  end: 49,
  start: 20896
};
chapterVerse[823] = {
  end: 32,
  start: 20945
};
chapterVerse[824] = {
  end: 31,
  start: 20977
};
chapterVerse[825] = {
  end: 49,
  start: 21008
};
chapterVerse[826] = {
  end: 27,
  start: 21057
};
chapterVerse[827] = {
  end: 17,
  start: 21084
};
chapterVerse[828] = {
  end: 21,
  start: 21101
};
chapterVerse[829] = {
  end: 36,
  start: 21122
};
chapterVerse[830] = {
  end: 26,
  start: 21158
};
chapterVerse[831] = {
  end: 21,
  start: 21184
};
chapterVerse[832] = {
  end: 26,
  start: 21205
};
chapterVerse[833] = {
  end: 18,
  start: 21231
};
chapterVerse[834] = {
  end: 32,
  start: 21249
};
chapterVerse[835] = {
  end: 33,
  start: 21281
};
chapterVerse[836] = {
  end: 31,
  start: 21314
};
chapterVerse[837] = {
  end: 15,
  start: 21345
};
chapterVerse[838] = {
  end: 38,
  start: 21360
};
chapterVerse[839] = {
  end: 28,
  start: 21398
};
chapterVerse[840] = {
  end: 23,
  start: 21426
};
chapterVerse[841] = {
  end: 29,
  start: 21449
};
chapterVerse[842] = {
  end: 49,
  start: 21478
};
chapterVerse[843] = {
  end: 26,
  start: 21527
};
chapterVerse[844] = {
  end: 20,
  start: 21553
};
chapterVerse[845] = {
  end: 27,
  start: 21573
};
chapterVerse[846] = {
  end: 31,
  start: 21600
};
chapterVerse[847] = {
  end: 25,
  start: 21631
};
chapterVerse[848] = {
  end: 24,
  start: 21656
};
chapterVerse[849] = {
  end: 23,
  start: 21680
};
chapterVerse[850] = {
  end: 35,
  start: 21703
};
chapterVerse[851] = {
  end: 21,
  start: 21738
};
chapterVerse[852] = {
  end: 49,
  start: 21759
};
chapterVerse[853] = {
  end: 30,
  start: 21808
};
chapterVerse[854] = {
  end: 37,
  start: 21838
};
chapterVerse[855] = {
  end: 31,
  start: 21875
};
chapterVerse[856] = {
  end: 28,
  start: 21906
};
chapterVerse[857] = {
  end: 28,
  start: 21934
};
chapterVerse[858] = {
  end: 27,
  start: 21962
};
chapterVerse[859] = {
  end: 27,
  start: 21989
};
chapterVerse[860] = {
  end: 21,
  start: 22016
};
chapterVerse[861] = {
  end: 45,
  start: 22037
};
chapterVerse[862] = {
  end: 13,
  start: 22082
};
chapterVerse[863] = {
  end: 11,
  start: 22095
};
chapterVerse[864] = {
  end: 23,
  start: 22106
};
chapterVerse[865] = {
  end: 5,
  start: 22129
};
chapterVerse[866] = {
  end: 19,
  start: 22134
};
chapterVerse[867] = {
  end: 15,
  start: 22153
};
chapterVerse[868] = {
  end: 11,
  start: 22168
};
chapterVerse[869] = {
  end: 16,
  start: 22179
};
chapterVerse[870] = {
  end: 14,
  start: 22195
};
chapterVerse[871] = {
  end: 17,
  start: 22209
};
chapterVerse[872] = {
  end: 15,
  start: 22226
};
chapterVerse[873] = {
  end: 12,
  start: 22241
};
chapterVerse[874] = {
  end: 14,
  start: 22253
};
chapterVerse[875] = {
  end: 16,
  start: 22267
};
chapterVerse[876] = {
  end: 9,
  start: 22283
};
chapterVerse[877] = {
  end: 20,
  start: 22292
};
chapterVerse[878] = {
  end: 32,
  start: 22312
};
chapterVerse[879] = {
  end: 21,
  start: 22344
};
chapterVerse[880] = {
  end: 15,
  start: 22365
};
chapterVerse[881] = {
  end: 16,
  start: 22380
};
chapterVerse[882] = {
  end: 15,
  start: 22396
};
chapterVerse[883] = {
  end: 13,
  start: 22411
};
chapterVerse[884] = {
  end: 27,
  start: 22424
};
chapterVerse[885] = {
  end: 14,
  start: 22451
};
chapterVerse[886] = {
  end: 17,
  start: 22465
};
chapterVerse[887] = {
  end: 14,
  start: 22482
};
chapterVerse[888] = {
  end: 15,
  start: 22496
};
chapterVerse[889] = {
  end: 21,
  start: 22511
};
chapterVerse[890] = {
  end: 17,
  start: 22532
};
chapterVerse[891] = {
  end: 10,
  start: 22549
};
chapterVerse[892] = {
  end: 10,
  start: 22559
};
chapterVerse[893] = {
  end: 11,
  start: 22569
};
chapterVerse[894] = {
  end: 16,
  start: 22580
};
chapterVerse[895] = {
  end: 13,
  start: 22596
};
chapterVerse[896] = {
  end: 12,
  start: 22609
};
chapterVerse[897] = {
  end: 13,
  start: 22621
};
chapterVerse[898] = {
  end: 15,
  start: 22634
};
chapterVerse[899] = {
  end: 16,
  start: 22649
};
chapterVerse[900] = {
  end: 20,
  start: 22665
};
chapterVerse[901] = {
  end: 15,
  start: 22685
};
chapterVerse[902] = {
  end: 13,
  start: 22700
};
chapterVerse[903] = {
  end: 19,
  start: 22713
};
chapterVerse[904] = {
  end: 17,
  start: 22732
};
chapterVerse[905] = {
  end: 20,
  start: 22749
};
chapterVerse[906] = {
  end: 19,
  start: 22769
};
chapterVerse[907] = {
  end: 18,
  start: 22788
};
chapterVerse[908] = {
  end: 15,
  start: 22806
};
chapterVerse[909] = {
  end: 20,
  start: 22821
};
chapterVerse[910] = {
  end: 15,
  start: 22841
};
chapterVerse[911] = {
  end: 23,
  start: 22856
};
chapterVerse[912] = {
  end: 21,
  start: 22879
};
chapterVerse[913] = {
  end: 13,
  start: 22900
};
chapterVerse[914] = {
  end: 10,
  start: 22913
};
chapterVerse[915] = {
  end: 14,
  start: 22923
};
chapterVerse[916] = {
  end: 11,
  start: 22937
};
chapterVerse[917] = {
  end: 15,
  start: 22948
};
chapterVerse[918] = {
  end: 14,
  start: 22963
};
chapterVerse[919] = {
  end: 23,
  start: 22977
};
chapterVerse[920] = {
  end: 17,
  start: 23000
};
chapterVerse[921] = {
  end: 12,
  start: 23017
};
chapterVerse[922] = {
  end: 17,
  start: 23029
};
chapterVerse[923] = {
  end: 14,
  start: 23046
};
chapterVerse[924] = {
  end: 9,
  start: 23060
};
chapterVerse[925] = {
  end: 21,
  start: 23069
};
chapterVerse[926] = {
  end: 14,
  start: 23090
};
chapterVerse[927] = {
  end: 17,
  start: 23104
};
chapterVerse[928] = {
  end: 18,
  start: 23121
};
chapterVerse[929] = {
  end: 6,
  start: 23139
};
chapterVerse[930] = {
  end: 25,
  start: 23145
};
chapterVerse[931] = {
  end: 23,
  start: 23170
};
chapterVerse[932] = {
  end: 17,
  start: 23193
};
chapterVerse[933] = {
  end: 25,
  start: 23210
};
chapterVerse[934] = {
  end: 48,
  start: 23235
};
chapterVerse[935] = {
  end: 34,
  start: 23283
};
chapterVerse[936] = {
  end: 29,
  start: 23317
};
chapterVerse[937] = {
  end: 34,
  start: 23346
};
chapterVerse[938] = {
  end: 38,
  start: 23380
};
chapterVerse[939] = {
  end: 42,
  start: 23418
};
chapterVerse[940] = {
  end: 30,
  start: 23460
};
chapterVerse[941] = {
  end: 50,
  start: 23490
};
chapterVerse[942] = {
  end: 58,
  start: 23540
};
chapterVerse[943] = {
  end: 36,
  start: 23598
};
chapterVerse[944] = {
  end: 39,
  start: 23634
};
chapterVerse[945] = {
  end: 28,
  start: 23673
};
chapterVerse[946] = {
  end: 27,
  start: 23701
};
chapterVerse[947] = {
  end: 35,
  start: 23728
};
chapterVerse[948] = {
  end: 30,
  start: 23763
};
chapterVerse[949] = {
  end: 34,
  start: 23793
};
chapterVerse[950] = {
  end: 46,
  start: 23827
};
chapterVerse[951] = {
  end: 46,
  start: 23873
};
chapterVerse[952] = {
  end: 39,
  start: 23919
};
chapterVerse[953] = {
  end: 51,
  start: 23958
};
chapterVerse[954] = {
  end: 46,
  start: 24009
};
chapterVerse[955] = {
  end: 75,
  start: 24055
};
chapterVerse[956] = {
  end: 66,
  start: 24130
};
chapterVerse[957] = {
  end: 20,
  start: 24196
};
chapterVerse[958] = {
  end: 45,
  start: 24216
};
chapterVerse[959] = {
  end: 28,
  start: 24261
};
chapterVerse[960] = {
  end: 35,
  start: 24289
};
chapterVerse[961] = {
  end: 41,
  start: 24324
};
chapterVerse[962] = {
  end: 43,
  start: 24365
};
chapterVerse[963] = {
  end: 56,
  start: 24408
};
chapterVerse[964] = {
  end: 37,
  start: 24464
};
chapterVerse[965] = {
  end: 38,
  start: 24501
};
chapterVerse[966] = {
  end: 50,
  start: 24539
};
chapterVerse[967] = {
  end: 52,
  start: 24589
};
chapterVerse[968] = {
  end: 33,
  start: 24641
};
chapterVerse[969] = {
  end: 44,
  start: 24674
};
chapterVerse[970] = {
  end: 37,
  start: 24718
};
chapterVerse[971] = {
  end: 72,
  start: 24755
};
chapterVerse[972] = {
  end: 47,
  start: 24827
};
chapterVerse[973] = {
  end: 20,
  start: 24874
};
chapterVerse[974] = {
  end: 80,
  start: 24894
};
chapterVerse[975] = {
  end: 52,
  start: 24974
};
chapterVerse[976] = {
  end: 38,
  start: 25026
};
chapterVerse[977] = {
  end: 44,
  start: 25064
};
chapterVerse[978] = {
  end: 39,
  start: 25108
};
chapterVerse[979] = {
  end: 49,
  start: 25147
};
chapterVerse[980] = {
  end: 50,
  start: 25196
};
chapterVerse[981] = {
  end: 56,
  start: 25246
};
chapterVerse[982] = {
  end: 62,
  start: 25302
};
chapterVerse[983] = {
  end: 42,
  start: 25364
};
chapterVerse[984] = {
  end: 54,
  start: 25406
};
chapterVerse[985] = {
  end: 59,
  start: 25460
};
chapterVerse[986] = {
  end: 35,
  start: 25519
};
chapterVerse[987] = {
  end: 35,
  start: 25554
};
chapterVerse[988] = {
  end: 32,
  start: 25589
};
chapterVerse[989] = {
  end: 31,
  start: 25621
};
chapterVerse[990] = {
  end: 37,
  start: 25652
};
chapterVerse[991] = {
  end: 43,
  start: 25689
};
chapterVerse[992] = {
  end: 48,
  start: 25732
};
chapterVerse[993] = {
  end: 47,
  start: 25780
};
chapterVerse[994] = {
  end: 38,
  start: 25827
};
chapterVerse[995] = {
  end: 71,
  start: 25865
};
chapterVerse[996] = {
  end: 56,
  start: 25936
};
chapterVerse[997] = {
  end: 53,
  start: 25992
};
chapterVerse[998] = {
  end: 51,
  start: 26045
};
chapterVerse[999] = {
  end: 25,
  start: 26096
};
chapterVerse[1000] = {
  end: 36,
  start: 26121
};
chapterVerse[1001] = {
  end: 54,
  start: 26157
};
chapterVerse[1002] = {
  end: 47,
  start: 26211
};
chapterVerse[1003] = {
  end: 71,
  start: 26258
};
chapterVerse[1004] = {
  end: 53,
  start: 26329
};
chapterVerse[1005] = {
  end: 59,
  start: 26382
};
chapterVerse[1006] = {
  end: 41,
  start: 26441
};
chapterVerse[1007] = {
  end: 42,
  start: 26482
};
chapterVerse[1008] = {
  end: 57,
  start: 26524
};
chapterVerse[1009] = {
  end: 50,
  start: 26581
};
chapterVerse[1010] = {
  end: 38,
  start: 26631
};
chapterVerse[1011] = {
  end: 31,
  start: 26669
};
chapterVerse[1012] = {
  end: 27,
  start: 26700
};
chapterVerse[1013] = {
  end: 33,
  start: 26727
};
chapterVerse[1014] = {
  end: 26,
  start: 26760
};
chapterVerse[1015] = {
  end: 40,
  start: 26786
};
chapterVerse[1016] = {
  end: 42,
  start: 26826
};
chapterVerse[1017] = {
  end: 31,
  start: 26868
};
chapterVerse[1018] = {
  end: 25,
  start: 26899
};
chapterVerse[1019] = {
  end: 26,
  start: 26924
};
chapterVerse[1020] = {
  end: 47,
  start: 26950
};
chapterVerse[1021] = {
  end: 26,
  start: 26997
};
chapterVerse[1022] = {
  end: 37,
  start: 27023
};
chapterVerse[1023] = {
  end: 42,
  start: 27060
};
chapterVerse[1024] = {
  end: 15,
  start: 27102
};
chapterVerse[1025] = {
  end: 60,
  start: 27117
};
chapterVerse[1026] = {
  end: 40,
  start: 27177
};
chapterVerse[1027] = {
  end: 43,
  start: 27217
};
chapterVerse[1028] = {
  end: 48,
  start: 27260
};
chapterVerse[1029] = {
  end: 30,
  start: 27308
};
chapterVerse[1030] = {
  end: 25,
  start: 27338
};
chapterVerse[1031] = {
  end: 52,
  start: 27363
};
chapterVerse[1032] = {
  end: 28,
  start: 27415
};
chapterVerse[1033] = {
  end: 41,
  start: 27443
};
chapterVerse[1034] = {
  end: 40,
  start: 27484
};
chapterVerse[1035] = {
  end: 34,
  start: 27524
};
chapterVerse[1036] = {
  end: 28,
  start: 27558
};
chapterVerse[1037] = {
  end: 41,
  start: 27586
};
chapterVerse[1038] = {
  end: 38,
  start: 27627
};
chapterVerse[1039] = {
  end: 40,
  start: 27665
};
chapterVerse[1040] = {
  end: 30,
  start: 27705
};
chapterVerse[1041] = {
  end: 35,
  start: 27735
};
chapterVerse[1042] = {
  end: 27,
  start: 27770
};
chapterVerse[1043] = {
  end: 27,
  start: 27797
};
chapterVerse[1044] = {
  end: 32,
  start: 27824
};
chapterVerse[1045] = {
  end: 44,
  start: 27856
};
chapterVerse[1046] = {
  end: 31,
  start: 27900
};
chapterVerse[1047] = {
  end: 32,
  start: 27931
};
chapterVerse[1048] = {
  end: 29,
  start: 27963
};
chapterVerse[1049] = {
  end: 31,
  start: 27992
};
chapterVerse[1050] = {
  end: 25,
  start: 28023
};
chapterVerse[1051] = {
  end: 21,
  start: 28048
};
chapterVerse[1052] = {
  end: 23,
  start: 28069
};
chapterVerse[1053] = {
  end: 25,
  start: 28092
};
chapterVerse[1054] = {
  end: 39,
  start: 28117
};
chapterVerse[1055] = {
  end: 33,
  start: 28156
};
chapterVerse[1056] = {
  end: 21,
  start: 28189
};
chapterVerse[1057] = {
  end: 36,
  start: 28210
};
chapterVerse[1058] = {
  end: 21,
  start: 28246
};
chapterVerse[1059] = {
  end: 14,
  start: 28267
};
chapterVerse[1060] = {
  end: 23,
  start: 28281
};
chapterVerse[1061] = {
  end: 33,
  start: 28304
};
chapterVerse[1062] = {
  end: 27,
  start: 28337
};
chapterVerse[1063] = {
  end: 31,
  start: 28364
};
chapterVerse[1064] = {
  end: 16,
  start: 28395
};
chapterVerse[1065] = {
  end: 23,
  start: 28411
};
chapterVerse[1066] = {
  end: 21,
  start: 28434
};
chapterVerse[1067] = {
  end: 13,
  start: 28455
};
chapterVerse[1068] = {
  end: 20,
  start: 28468
};
chapterVerse[1069] = {
  end: 40,
  start: 28488
};
chapterVerse[1070] = {
  end: 13,
  start: 28528
};
chapterVerse[1071] = {
  end: 27,
  start: 28541
};
chapterVerse[1072] = {
  end: 33,
  start: 28568
};
chapterVerse[1073] = {
  end: 34,
  start: 28601
};
chapterVerse[1074] = {
  end: 31,
  start: 28635
};
chapterVerse[1075] = {
  end: 13,
  start: 28666
};
chapterVerse[1076] = {
  end: 40,
  start: 28679
};
chapterVerse[1077] = {
  end: 58,
  start: 28719
};
chapterVerse[1078] = {
  end: 24,
  start: 28777
};
chapterVerse[1079] = {
  end: 24,
  start: 28801
};
chapterVerse[1080] = {
  end: 17,
  start: 28825
};
chapterVerse[1081] = {
  end: 18,
  start: 28842
};
chapterVerse[1082] = {
  end: 18,
  start: 28860
};
chapterVerse[1083] = {
  end: 21,
  start: 28878
};
chapterVerse[1084] = {
  end: 18,
  start: 28899
};
chapterVerse[1085] = {
  end: 16,
  start: 28917
};
chapterVerse[1086] = {
  end: 24,
  start: 28933
};
chapterVerse[1087] = {
  end: 15,
  start: 28957
};
chapterVerse[1088] = {
  end: 18,
  start: 28972
};
chapterVerse[1089] = {
  end: 33,
  start: 28990
};
chapterVerse[1090] = {
  end: 21,
  start: 29023
};
chapterVerse[1091] = {
  end: 14,
  start: 29044
};
chapterVerse[1092] = {
  end: 24,
  start: 29058
};
chapterVerse[1093] = {
  end: 21,
  start: 29082
};
chapterVerse[1094] = {
  end: 29,
  start: 29103
};
chapterVerse[1095] = {
  end: 31,
  start: 29132
};
chapterVerse[1096] = {
  end: 26,
  start: 29163
};
chapterVerse[1097] = {
  end: 18,
  start: 29189
};
chapterVerse[1098] = {
  end: 23,
  start: 29207
};
chapterVerse[1099] = {
  end: 22,
  start: 29230
};
chapterVerse[1100] = {
  end: 21,
  start: 29252
};
chapterVerse[1101] = {
  end: 32,
  start: 29273
};
chapterVerse[1102] = {
  end: 33,
  start: 29305
};
chapterVerse[1103] = {
  end: 24,
  start: 29338
};
chapterVerse[1104] = {
  end: 30,
  start: 29362
};
chapterVerse[1105] = {
  end: 30,
  start: 29392
};
chapterVerse[1106] = {
  end: 21,
  start: 29422
};
chapterVerse[1107] = {
  end: 23,
  start: 29443
};
chapterVerse[1108] = {
  end: 29,
  start: 29466
};
chapterVerse[1109] = {
  end: 23,
  start: 29495
};
chapterVerse[1110] = {
  end: 25,
  start: 29518
};
chapterVerse[1111] = {
  end: 18,
  start: 29543
};
chapterVerse[1112] = {
  end: 10,
  start: 29561
};
chapterVerse[1113] = {
  end: 20,
  start: 29571
};
chapterVerse[1114] = {
  end: 13,
  start: 29591
};
chapterVerse[1115] = {
  end: 18,
  start: 29604
};
chapterVerse[1116] = {
  end: 28,
  start: 29622
};
chapterVerse[1117] = {
  end: 12,
  start: 29650
};
chapterVerse[1118] = {
  end: 17,
  start: 29662
};
chapterVerse[1119] = {
  end: 18,
  start: 29679
};
chapterVerse[1120] = {
  end: 20,
  start: 29697
};
chapterVerse[1121] = {
  end: 15,
  start: 29717
};
chapterVerse[1122] = {
  end: 16,
  start: 29732
};
chapterVerse[1123] = {
  end: 16,
  start: 29748
};
chapterVerse[1124] = {
  end: 25,
  start: 29764
};
chapterVerse[1125] = {
  end: 21,
  start: 29789
};
chapterVerse[1126] = {
  end: 18,
  start: 29810
};
chapterVerse[1127] = {
  end: 26,
  start: 29828
};
chapterVerse[1128] = {
  end: 17,
  start: 29854
};
chapterVerse[1129] = {
  end: 22,
  start: 29871
};
chapterVerse[1130] = {
  end: 16,
  start: 29893
};
chapterVerse[1131] = {
  end: 15,
  start: 29909
};
chapterVerse[1132] = {
  end: 15,
  start: 29924
};
chapterVerse[1133] = {
  end: 25,
  start: 29939
};
chapterVerse[1134] = {
  end: 14,
  start: 29964
};
chapterVerse[1135] = {
  end: 18,
  start: 29978
};
chapterVerse[1136] = {
  end: 19,
  start: 29996
};
chapterVerse[1137] = {
  end: 16,
  start: 30015
};
chapterVerse[1138] = {
  end: 14,
  start: 30031
};
chapterVerse[1139] = {
  end: 20,
  start: 30045
};
chapterVerse[1140] = {
  end: 28,
  start: 30065
};
chapterVerse[1141] = {
  end: 13,
  start: 30093
};
chapterVerse[1142] = {
  end: 28,
  start: 30106
};
chapterVerse[1143] = {
  end: 39,
  start: 30134
};
chapterVerse[1144] = {
  end: 40,
  start: 30173
};
chapterVerse[1145] = {
  end: 29,
  start: 30213
};
chapterVerse[1146] = {
  end: 25,
  start: 30242
};
chapterVerse[1147] = {
  end: 27,
  start: 30267
};
chapterVerse[1148] = {
  end: 26,
  start: 30294
};
chapterVerse[1149] = {
  end: 18,
  start: 30320
};
chapterVerse[1150] = {
  end: 17,
  start: 30338
};
chapterVerse[1151] = {
  end: 20,
  start: 30355
};
chapterVerse[1152] = {
  end: 25,
  start: 30375
};
chapterVerse[1153] = {
  end: 25,
  start: 30400
};
chapterVerse[1154] = {
  end: 22,
  start: 30425
};
chapterVerse[1155] = {
  end: 19,
  start: 30447
};
chapterVerse[1156] = {
  end: 14,
  start: 30466
};
chapterVerse[1157] = {
  end: 21,
  start: 30480
};
chapterVerse[1158] = {
  end: 22,
  start: 30501
};
chapterVerse[1159] = {
  end: 18,
  start: 30523
};
chapterVerse[1160] = {
  end: 10,
  start: 30541
};
chapterVerse[1161] = {
  end: 29,
  start: 30551
};
chapterVerse[1162] = {
  end: 24,
  start: 30580
};
chapterVerse[1163] = {
  end: 21,
  start: 30604
};
chapterVerse[1164] = {
  end: 21,
  start: 30625
};
chapterVerse[1165] = {
  end: 13,
  start: 30646
};
chapterVerse[1166] = {
  end: 14,
  start: 30659
};
chapterVerse[1167] = {
  end: 25,
  start: 30673
};
chapterVerse[1168] = {
  end: 20,
  start: 30698
};
chapterVerse[1169] = {
  end: 29,
  start: 30718
};
chapterVerse[1170] = {
  end: 22,
  start: 30747
};
chapterVerse[1171] = {
  end: 11,
  start: 30769
};
chapterVerse[1172] = {
  end: 14,
  start: 30780
};
chapterVerse[1173] = {
  end: 17,
  start: 30794
};
chapterVerse[1174] = {
  end: 17,
  start: 30811
};
chapterVerse[1175] = {
  end: 13,
  start: 30828
};
chapterVerse[1176] = {
  end: 21,
  start: 30841
};
chapterVerse[1177] = {
  end: 11,
  start: 30862
};
chapterVerse[1178] = {
  end: 19,
  start: 30873
};
chapterVerse[1179] = {
  end: 17,
  start: 30892
};
chapterVerse[1180] = {
  end: 18,
  start: 30909
};
chapterVerse[1181] = {
  end: 20,
  start: 30927
};
chapterVerse[1182] = {
  end: 8,
  start: 30947
};
chapterVerse[1183] = {
  end: 21,
  start: 30955
};
chapterVerse[1184] = {
  end: 18,
  start: 30976
};
chapterVerse[1185] = {
  end: 24,
  start: 30994
};
chapterVerse[1186] = {
  end: 21,
  start: 31018
};
chapterVerse[1187] = {
  end: 15,
  start: 31039
};
chapterVerse[1188] = {
  end: 27,
  start: 31054
};
chapterVerse[1189] = {
  end: 21,
  start: 31081
};


const morphologyDictionary = {
	greek: {
		partOfSpeech: {
			N: 'Noun',
			A: 'Adjective',
			T: 'Definite Article',
			V: 'Verb',
			P: 'Personal pronoun',
			R: 'Relative pronoun',
			C: 'Reciprocal pronoun',
			D: 'Demonstrative pronoun',
			K: 'Correlative pronoun',
			I: 'Interrogative pronoun',
			X: 'Indefinite pronoun',
			Q: 'Correlative or Interrogative pronoun',
			F: 'Reflexive pronoun',
			S: 'Possessive pronoun',
			ADV: 'Adverb',
			CONJ: 'Conjunction',
			COND: 'Cond',
			PRT: 'Particle',
			PREP: 'Preposition',
			INJ: 'Interjection',
			ARAM: 'Aramaic',
			HEB: 'Hebrew'
		},
		Case: {
			N: 'Nominative',
			V: 'Vocative',
			G: 'Genitive',
			D: 'Dative',
			A: 'Accusative',
			PRI: 'Proper noun indeclinable',
			NUI: 'Numeral indeclinable',
			LI: 'Letter indeclinable',
			OI: 'Noun other type indeclinable',
			tense: {
				P  : 'Present',
				I  : 'Imperfect',
				F  : 'Future',
				'2F' : 'Second future',
				A  : 'Aorist',
				'2A' : 'Second aorist',
				R  : 'Perfect',
				'2R' : 'Second perfect',
				L  : 'Pluperfect',
				'2L' : 'Second pluperfect',
				X  : 'No tense stated'
			},
			voice: {
				A : 'Active',
				M : 'Middle',
				P : 'Passive',
				E : 'Middle or Passive',
				D : 'Middle deponent',
				O : 'Passive deponent',
				N : 'Middle or Passive deponent',
				Q : 'Impersonal active',
				X : 'No voice'
			},
			mood: {
				I: 'Indicative',
				S: 'Subjunctive',
				O: 'Optative',
				M: 'Imperative',
				N: 'Infinitive',
				P: 'Participle',
				R: 'Imperative participle'
			}
		},
		number: {
			S: 'Singular',
			P: 'Plural'
		},
		gender: {
			M: 'Masculine',
			F: 'Feminine',
			N: 'Neuter'
		},
		person: {
			1: 'First person',
			2: 'Second person',
			3 : 'Third person'
		}
	}
};

export const parseGreekMorph = (morph) => {
	var result = '',
		gender,
		morphArray,
		number,
		Case,
		person,
		Person,
		case2,
		mood,
		voice,
		tense,
		partOfSpeech;

    morphArray = morph.split('-');
    partOfSpeech = morphArray[0];
    result += morphologyDictionary.greek.partOfSpeech[partOfSpeech] + ' ';
    Case = morphArray[1];
    if (partOfSpeech === 'V') { //for verbs
        if (Case !== undefined) {
            if (morphologyDictionary.greek.Case[Case] !== undefined) {
                result += morphologyDictionary.greek.Case[Case] + ' ';
            } else {
                if (parseInt(Case[0], 10) > 0) { // second future, second aorist and second perfect
                    tense = Case[0] + Case[1];
                    voice = Case[2];
                    mood = Case[3];
                } else {
                    tense = Case[0];
                    voice = Case[1];
                    mood = Case[2];
                }
                result += morphologyDictionary.greek.Case.tense[tense] + ' ';
                result += morphologyDictionary.greek.Case.voice[voice] + ' ';
                result += morphologyDictionary.greek.Case.mood[mood];
            }
        }
        if (morphArray[2] !== undefined) {
            result += ' ';
            if (mood === "P" || mood === "R") {
                case2 = morphArray[2][0];
                result += morphologyDictionary.greek.Case[case2] + ' ';
                number = morphArray[2][1];
                result += morphologyDictionary.greek.number[number] + ' ';
                gender = morphArray[2][2];
                result += morphologyDictionary.greek.gender[gender];
            } else {
                person = morphArray[2][0];
                result += morphologyDictionary.greek.person[person] + ' ';
                number = morphArray[2][1];
                result += morphologyDictionary.greek.number[number];
            }
        }
    } else {
        if (morphArray[1] !== undefined) {
            if (morphologyDictionary.greek.Case[Case] !== undefined) { //there are some nouns that have a 3 letter case code
                result += morphologyDictionary.greek.Case[Case];
            } else {
                if ( parseInt( morphArray[1][0] ) > 0 ) {
                    Person = morphArray[1][0];
                    Case = morphArray[1][1];
                    number = morphArray[1][2];
                    gender = morphArray[1][3];
                } else {
                    Case = morphArray[1][0];
                    number = morphArray[1][1];
                    gender = morphArray[1][2];
                }

                if ( typeof Person !== 'undefined' ) {
                    result += morphologyDictionary.greek.person[Person] + ' ';
                }
                result += morphologyDictionary.greek.Case[Case] + ' ';
                result += morphologyDictionary.greek.number[number] + ' ';
                if ( gender ) {
                    result += morphologyDictionary.greek.gender[gender];
                }
            }
        }
    }

    return result;
};

const mybooks = [
  { id: "1", indo: "Kejadian", english: "Genesis", chinese: "", pasal: "50" },
  { id: "2", indo: "Keluaran", english: "Exodus", chinese: "", pasal: "40" },
  { id: "3", indo: "Imamat", english: "Leviticus", chinese: "", pasal: "27" },
  { id: "4", indo: "Bilangan", english: "Numbers", chinese: "", pasal: "36" },
  {
    id: "5",
    indo: "Ulangan",
    english: "Deuteronomy",
    chinese: "",
    pasal: "34"
  },
  { id: "6", indo: "Yosua", english: "Joshua", chinese: "", pasal: "24" },
  { id: "7", indo: "Hakim-hakim", english: "Judges", chinese: "", pasal: "21" },
  { id: "8", indo: "Rut", english: "Ruth", chinese: "", pasal: "4" },
  { id: "9", indo: "1 Samuel", english: "1 Samuel", chinese: "", pasal: "31" },
  { id: "10", indo: "2 Samuel", english: "2 Samuel", chinese: "", pasal: "24" },
  {
    id: "11",
    indo: "1 Raja-raja",
    english: "1 Kings",
    chinese: "",
    pasal: "22"
  },
  {
    id: "12",
    indo: "2 Raja-raja",
    english: "2 Kings",
    chinese: "",
    pasal: "25"
  },
  {
    id: "13",
    indo: "1 Tawarikh",
    english: "1 Chronicles",
    chinese: "",
    pasal: "29"
  },
  {
    id: "14",
    indo: "2 Tawarikh",
    english: "2 Chronicles",
    chinese: "",
    pasal: "36"
  },
  { id: "15", indo: "Ezra", english: "Ezra", chinese: "", pasal: "10" },
  { id: "16", indo: "Nehemia", english: "Nehemiah", chinese: "", pasal: "13" },
  { id: "17", indo: "Ester", english: "Esther", chinese: "", pasal: "10" },
  { id: "18", indo: "Ayub", english: "Job", chinese: "", pasal: "42" },
  { id: "19", indo: "Mazmur", english: "Psalm", chinese: "", pasal: "150" },
  { id: "20", indo: "Amsal", english: "Proverbs", chinese: "", pasal: "31" },
  {
    id: "21",
    indo: "Pengkhotbah",
    english: "Eccelesiastes",
    chinese: "",
    pasal: "12"
  },
  {
    id: "22",
    indo: "Kidung Agung",
    english: "Song of songs",
    chinese: "",
    pasal: "8"
  },
  { id: "23", indo: "Yesaya", english: "Isaiah", chinese: "", pasal: "66" },
  { id: "24", indo: "Yeremia", english: "Jeremiah", chinese: "", pasal: "52" },
  {
    id: "25",
    indo: "Ratapan",
    english: "Lamentations",
    chinese: "",
    pasal: "5"
  },
  { id: "26", indo: "Yehezkiel", english: "Ezekiel", chinese: "", pasal: "48" },
  { id: "27", indo: "Daniel", english: "Daniel", chinese: "", pasal: "12" },
  { id: "28", indo: "Hosea", english: "Hosea", chinese: "", pasal: "14" },
  { id: "29", indo: "Yoel", english: "Joel", chinese: "", pasal: "3" },
  { id: "30", indo: "Amos", english: "Amos", chinese: "", pasal: "9" },
  { id: "31", indo: "Obaja", english: "Obadiah", chinese: "", pasal: "1" },
  { id: "32", indo: "Yunus", english: "Jonah", chinese: "", pasal: "4" },
  { id: "33", indo: "Mikha", english: "Mikha", chinese: "", pasal: "7" },
  { id: "34", indo: "Nahum", english: "Nahum", chinese: "", pasal: "3" },
  { id: "35", indo: "Habakuk", english: "Habakkuk", chinese: "", pasal: "3" },
  { id: "36", indo: "Zefanya", english: "Zefanya", chinese: "", pasal: "3" },
  { id: "37", indo: "Hagai", english: "Hagai", chinese: "", pasal: "2" },
  { id: "38", indo: "Zakharia", english: "Zakharia", chinese: "", pasal: "14" },
  { id: "39", indo: "Maleakhi", english: "Maleachi", chinese: "", pasal: "4" },
  { id: "40", indo: "Matius", english: "Matthew", chinese: "", pasal: "28" },
  { id: "41", indo: "Markus", english: "Mark", chinese: "", pasal: "16" },
  { id: "42", indo: "Lukas", english: "Luke", chinese: "", pasal: "24" },
  { id: "43", indo: "Yohanes", english: "John", chinese: "", pasal: "21" },
  {
    id: "44",
    indo: "Kisah Para Rasul",
    english: "Acts",
    chinese: "",
    pasal: "28"
  },
  { id: "45", indo: "Roma", english: "Rome", chinese: "", pasal: "16" },
  {
    id: "46",
    indo: "1 Korintus",
    english: "1 Corinthians",
    chinese: "",
    pasal: "16"
  },
  {
    id: "47",
    indo: "2 Korintus",
    english: "2 Corinthians",
    chinese: "",
    pasal: "13"
  },
  { id: "48", indo: "Galatia", english: "Galatia", chinese: "", pasal: "6" },
  { id: "49", indo: "Efesus", english: "Ephesians", chinese: "", pasal: "6" },
  { id: "50", indo: "Filipi", english: "Philipians", chinese: "", pasal: "4" },
  { id: "51", indo: "Kolose", english: "Colossians", chinese: "", pasal: "4" },
  {
    id: "52",
    indo: "1 Tesalonika",
    english: "1 Thessalonians",
    chinese: "",
    pasal: "5"
  },
  {
    id: "53",
    indo: "2 Tesalonika",
    english: "2 Thessalonians",
    chinese: "",
    pasal: "3"
  },
  {
    id: "54",
    indo: "1 Timotius",
    english: "1 Timothy",
    chinese: "",
    pasal: "6"
  },
  {
    id: "55",
    indo: "2 Timotius",
    english: "2 Timothy",
    chinese: "",
    pasal: "4"
  },
  { id: "56", indo: "Titus", english: "Titus", chinese: "", pasal: "3" },
  { id: "57", indo: "Filemon", english: "Philemon", chinese: "", pasal: "1" },
  { id: "58", indo: "Ibrani", english: "Hebrew", chinese: "", pasal: "13" },
  { id: "59", indo: "Yakobus", english: "James", chinese: "", pasal: "5" },
  { id: "60", indo: "1 Petrus", english: "1 Peter", chinese: "", pasal: "5" },
  { id: "61", indo: "2 Petrus", english: "2 Peter", chinese: "", pasal: "3" },
  { id: "62", indo: "1 Yohanes", english: "1 John", chinese: "", pasal: "1" },
  { id: "63", indo: "2 Yohanes", english: "2 John", chinese: "", pasal: "1" },
  { id: "64", indo: "3 Yohanes", english: "3 John", chinese: "", pasal: "1" },
  { id: "65", indo: "Yudas", english: "Jude", chinese: "", pasal: "1" },
  { id: "66", indo: "Wahyu", english: "Revelation", chinese: "", pasal: "22" }
];


