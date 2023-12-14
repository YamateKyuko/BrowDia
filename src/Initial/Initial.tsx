import { template } from "../Entity/Entity";

export const initial: template = {
  "fileType": "OuDia.1.07",
  "fileTypeAppComment": "CloudDia 1.0",
  "displayProperty": {
    "timetableFont": [
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      },
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      },
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      },
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      },
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      },
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      },
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      },
      {
        "height": 9,
        "family": "MS ゴシック",
        "bold": false,
        "italic": false
      }
    ],
    "timetableVFont": {
      "height": 9,
      "family": "MS ゴシック",
      "bold": false,
      "italic": false
    },
    "diagramStationFont": {
      "height": 9,
      "family": "MS ゴシック",
      "bold": false,
      "italic": false
    },
    "diagramTimeFont": {
      "height": 9,
      "family": "MS ゴシック",
      "bold": false,
      "italic": false
    },
    "commentFont": {
      "height": 9,
      "family": "MS ゴシック",
      "bold": false,
      "italic": false
    },
    "diagramTrainFont": {
      "height": 9,
      "family": "MS ゴシック",
      "bold": false,
      "italic": false
    },
    "diagramTextColor": {
      "r": 0,
      "g": 0,
      "b": 0
    },
    "diagramBackgroundColor": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "diagramTrainColor": {
      "r": 0,
      "g": 0,
      "b": 0
    },
    "diagramAxisColor": {
      "r": 191,
      "g": 191,
      "b": 191
    },
    "stdOpeTimeLowerColor": {
      "r": 255,
      "g": 191,
      "b": 191
    },
    "stdOpeTimeHigherColor": {
      "r": 191,
      "g": 191,
      "b": 255
    },
    "stdOpeTimeUndefColor": {
      "r": 255,
      "g": 255,
      "b": 191
    },
    "stdOpeTimeIllegalColor": {
      "r": 191,
      "g": 191,
      "b": 191
    },
    "stationNameLength": 6,
    "timetableTrainWidth": 5,
    "anySecondIncDec1": 5,
    "anySecondIncDec2": 15,
    "visibleTrainName": true,
    "visibleOuterTerminalOriginSide": false,
    "visibleOuterTerminalTerminalSide": false,
    "visibleOuterTerminal": false
  },
  "railway": {
    "name": "新規路線",
    "directionName": [
      "下り",
      "上り"
    ],
    "startTime": 14400,
    "stationInterval": 60,
    "enableOperation": false,
    "comment": "",
    "stations": [],
    "trainTypes": [],
    "diagrams": [
      {
        "name": "新規ダイヤ",
        "mainBackgroundColorIndex": 0,
        "subBackgroundColorIndex": 0,
        "backgroundPatternIndex": 0,
        "trains": [
          [],
          []
        ]
      }
    ]
  }
}

export const initial_trainType = {
  "name": "新規種別",
  "abbrName": "新規",
  "textColor": {
    "r": 0,
    "g": 0,
    "b": 0
  },
  "fontIndex": 0,
  "backgroundColor": {
    "r": 255,
    "g": 255,
    "b": 255
  },
  "strokeColor": {
    "r": 0,
    "g": 0,
    "b": 0
  },
  "lineStyle": "Jissen",
  "isBoldLine": false,
  "stopMark": false,
  "parentIndex": null
}