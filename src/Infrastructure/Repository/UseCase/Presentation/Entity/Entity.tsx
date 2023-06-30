import React from "react"

// export type template = {
//   "fileType": string,
//   "fileTypeAppComment": string,
//   "displayProperty": {
//     "timetableFont": [
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       },
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       },
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       },
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       },
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       },
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       },
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       },
//       {
//         "height": number,
//         "family": string,
//         "bold": boolean,
//         "italic": boolean
//       }
//     ],
//     "timetableVFont": {
//       "height": number,
//       "family": string,
//       "bold": boolean,
//       "italic": boolean
//     },
//     "diagramStationFont": {
//       "height": number,
//       "family": string,
//       "bold": boolean,
//       "italic": boolean
//     },
//     "diagramTimeFont": {
//       "height": number,
//       "family": string,
//       "bold": boolean,
//       "italic": boolean
//     },
//     "commentFont": {
//       "height": number,
//       "family": string,
//       "bold": boolean,
//       "italic": boolean
//     },
//     "diagramTrainFont": {
//       "height": number,
//       "family": string,
//       "bold": boolean,
//       "italic": boolean
//     },
//     "diagramTextColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "diagramBackgroundColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "diagramTrainColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "diagramAxisColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "stdOpeTimeLowerColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "stdOpeTimeHigherColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "stdOpeTimeUndefColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "stdOpeTimeIllegalColor": {
//       "r": number,
//       "g": number,
//       "b": number
//     },
//     "stationNameLength": number,
//     "timetableTrainWidth": number,
//     "anySecondIncDec1": number,
//     "anySecondIncDec2": number,
//     "visibleTrainName": true,
//     "visibleOuterTerminalOriginSide": boolean,
//     "visibleOuterTerminalTerminalSide": boolean,
//     "visibleOuterTerminal": boolean
//   },
//   "railway": {
//     "name": string
//     "directionName": [
//       string,
//       string
//     ],
//     "startTime": number,
//     "stationInterval": number,
//     "enableOperation": boolean,
//     "comment": string,
//     "stations": [],
//     "trainTypes": [
//       {
//         "name": string,
//         "abbrName": string,
//         "textColor": {
//           "r": number,
//           "g": number,
//           "b": number
//         },
//         "fontIndex": number,
//         "backgroundColor": {
//           "r": number,
//           "g": number,
//           "b": number
//         },
//         "strokeColor": {
//           "r": number,
//           "g": number,
//           "b": number
//         },
//         "lineStyle": string,
//         "isBoldLine": boolean,
//         "stopMark": boolean,
//         "parentIndex": null
//       }
//     ],
//     "diagrams": [
//       {
//         "name": string,
//         "mainBackgroundColorIndex": number,
//         "subBackgroundColorIndex": number,
//         "backgroundPatternIndex": number,
//         "trains": [
//           [],
//           []
//         ]
//       }
//     ]
//   }
// };

// 型宣言ファイル
// ここの型宣言の解釈が間違っていましたらご一報ください。

export type template = {
  "fileType": string, // clowddia 0.1.0 のみ対応
  "fileTypeAppComment": string, // oudia(バージョン)
  "displayProperty": template_displayProperty, // スタイル設定 非対応
  "railway": {
    "name": string, // 鉄道路線系統名など
    "directionName": string[], // 方向文字
    "startTime": number, // ダイヤの最初にくる時刻
    "stationInterval": number, // 駅間隔初期設定
    "enableOperation": boolean, // ?
    "comment": string, // 路線コメント
    "stations": template_station[], // 駅リスト
    "trainTypes": template_trainType[], // 種別リスト
    "diagrams": template_diagram[] // 時刻等データ
  }
};

type template_displayProperty = { // スタイル設定 非対応
  "timetableFont": template_timetableFont[],
  "timetableVFont": { // ? 時刻表フォント?
    "height": number, // 高さ
    "family": string, // フォント種類
    "bold": boolean, // 太字
    "italic": boolean // 斜体
  },
  "diagramStationFont": { // ダイヤ駅フォント
    "height": number,
    "family": string,
    "bold": boolean,
    "italic": boolean
  },
  "diagramTimeFont": { // ダイヤ時間フォント
    "height": number,
    "family": string,
    "bold": boolean,
    "italic": boolean
  },
  "commentFont": { // コメント用フォント
    "height": number,
    "family": string,
    "bold": boolean,
    "italic": boolean
  },
  "diagramTrainFont": { // ダイヤ駅フォント
    "height": number,
    "family": string,
    "bold": boolean,
    "italic": boolean
  },
  "diagramTextColor": { // ダイヤ文字色
    "r": number,
    "g": number,
    "b": number
  },
  "diagramBackgroundColor": { // ダイヤ背景色
    "r": number,
    "g": number,
    "b": number
  },
  "diagramTrainColor": { // ? ダイヤ列車色?
    "r": number,
    "g": number,
    "b": number
  },
  "diagramAxisColor": { // ?
    "r": number,
    "g": number,
    "b": number
  },
  "stdOpeTimeLowerColor": { // ?
    "r": number,
    "g": number,
    "b": number
  },
  "stdOpeTimeHigherColor": { // ?
    "r": number,
    "g": number,
    "b": number
  },
  "stdOpeTimeUndefColor": { // ?
    "r": number,
    "g": number,
    "b": number
  },
  "stdOpeTimeIllegalColor": { // ?
    "r": number,
    "g": number,
    "b": number
  },
  "stationNameLength": number, // ?
  "timetableTrainWidth": number, // 時刻表列車セル幅
  "anySecondIncDec1": number, // 任意秒移動1
  "anySecondIncDec2": number, // 任意秒移動2
  "visibleTrainName": boolean, // ?
  "visibleOuterTerminalOriginSide": boolean, // ?
  "visibleOuterTerminalTerminalSide": boolean, // ?
  "visibleOuterTerminal": boolean // ?
}

export type template_timetableFont = {
  "height": number,
  "family": string,
  "bold": boolean,
  "italic": boolean
}

export type template_station = { // 駅リスト
  "name": string, // 駅名
  "abbrName": string, // 駅名略称
  "timetableStyle": { // 時刻表時刻表示
    "arrival": boolean[],
    "departure": boolean[]
  },
  "isMain": boolean, // 主要駅判定
  "border": boolean, // ボーダーライン
  "visibleDiagramInfo": string[], // ダイヤ列車情報
  "mainTrack": number[], // 本線
  "tracks": template_track[], // ホームリスト
  "outerTerminal": template_outerTerminal[] | null, // 路線外発着駅
  "brunchCoreStationIndex": number | null, // 支線分岐駅番号
  "isBrunchOpposite": boolean, // ? 分岐駅反転
  "loopOriginStationIndex": number | null, // ? 環状線開始駅
  "isLoopOpposite": boolean, // ? 環状線反転駅
  "visibleTimetableTrack": boolean[], // 時刻表番線表示
  "visibleDiagramTrack": boolean, // ダイヤグラム番線表示
  "nextStaionDistance": null | number, // 次駅間隔
  "timetableTrackOmit": boolean, // 番線名省略
  "operationLength": number[], // ? 下り前・上り後作業欄数
  "customTimetableStyle": { // 時刻表各種表示
    "arrival": boolean[], // timetableStyle
    "departure": boolean[], // timetableStyle
    "trainNumber": boolean[],
    "operationNumber": boolean[],
    "trainType": boolean[],
    "trainName": boolean[]
  }
};

export type template_outerTerminal = {
  "name": string,
  "timetableName": string | null,
  "diagramName": string | null
}

export type template_track = { // ホームリスト
  "name": string,
  "abbrName": string[]
}

export type template_trainType = { // 種別
  "name": string, // 名称
  "abbrName": string, // 略称
  "textColor": { // テキスト色
    "r": number,
    "g": number,
    "b": number
  },
  "fontIndex": number, // フォント番号 未対応
  "backgroundColor": { // 背景色
    "r": number,
    "g": number,
    "b": number
  },
  "strokeColor": { // 線色
    "r": number,
    "g": number,
    "b": number
  },
  "lineStyle": string, // 線のスタイル
  "isBoldLine": boolean, // 太線
  "stopMark": boolean, // ?
  "parentIndex": null // ?
}

export type template_diagram = { // ダイヤ
  "name": string, // ダイヤ名
  "mainBackgroundColorIndex": number, // 背景色
  "subBackgroundColorIndex": number, // ?
  "backgroundPatternIndex": number, // 背景画像
  "trains": template_train[][] // 方向別列車リスト
}

export type template_train = { // 列車
  "direction": number, // 方向
  "type": number, // 種別
  "number": string, // 列車番号
  "name": string, // 列車名
  "count": string, // 列車番号
  "timetable": {
    "firstStationIndex": number, // 最初の駅番号
    "terminalStationIndex": number, // 最後の駅番号
    "_data": (null | template__data)[] // 駅毎発着刻等リスト
  },
  "note": null | string, // 情報
  "operations": null | string // 時刻表備考
}

export type template__data = {
  "stopType": number, // 停車種類
  "arrival": number | null, // 着刻
  "departure": number | null, // 発刻
  "track": number // 番線
}










type LoadContextInterface = {readonly Load: any;}
export const LoadContext = React.createContext<LoadContextInterface | undefined>(undefined);

