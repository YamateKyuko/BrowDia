import React from 'react';
import StationRepository from '../../../Repository/StationRepository';
import DirectionRepository from '../../../Repository/DirectionRepositry';
import { template, template_customTimetableStyle, template_station, template_timetable, template_timetableRow, template_timetableSide, template_rowKeyList } from '../../../Entity/Entity'
// import Presentation from '../Presentation/SetStationPresentation'
import { selector, selectorFamily, DefaultValue } from 'recoil';
import Infrastructure from '../../../Infrastructure/Infrastructure';

const TimetableUseCase = () => {

  type template_rowSettings = { 
    name: string;
    height: number;
  }

  const rowSettings: template_rowSettings[] = [
    {
      name: "運行番号",
      height: 1,
    }, 
    {
      name: "列車番号",
      height: 1,
    },
    {
      name: "列車種別",
      height: 1,
    },
    {
      name: "列車名",
      height: 5,
    },
    {
      name: "着",
      height: 1,
    },
    {
      name: "のりば",
      height: 1,
    },
    {
      name: "発",
      height: 1,
    },
    {
      name: "",
      height: 0,
    }
  ]

  const timetableRow = selector<template_timetableRow[]>({
    key: "timetableRow",
    get: ({get}) => {
      const stations = get(StationRepository().Stations)
      const directionIndex = get(Infrastructure().directionIndex)
      
      let timetableRow: template_timetableRow[] = []

      type template_rowOrder = {
        key: number;
        value: boolean[];
      }

      stations.map((station: template_station, index: number) => {

        const rowOrder: template_rowOrder[] = [
          {key: 0, value: station.customTimetableStyle.operationNumber}, 
          {key: 1, value: station.customTimetableStyle.trainNumber},
          {key: 2, value: station.customTimetableStyle.trainType},
          {key: 3, value: station.customTimetableStyle.trainName},
          {key: 4, value: station.customTimetableStyle.arrival},
          {key: 5, value: station.visibleTimetableTrack},
          {key: 6, value: station.customTimetableStyle.departure},
        ]

        rowOrder.map((value: template_rowOrder) => {

          if (value.value[directionIndex]) {
            timetableRow.push({
              type: value.key,
              stationIndex: index,
              height: 1,
            })
          }
        })
      })
      return timetableRow;
    }
  })

  const timetableSide = selector<template_timetableSide[]>({
    key: "timetableSide",
    get: ({get}) => {
      const timetableRow: template_timetableRow[] = get(TimetableUseCase().timetableRow)
      const timetableSide: template_timetableSide[] = []
      timetableRow.map((row: template_timetableRow, index: number) => {
        const station: template_station = get(StationRepository().Station(row.stationIndex))
        let value: string = rowSettings[row.type].name
        timetableSide.push({
          rowIndex: row.stationIndex,
          height: 1,
          value: value,
          name: station.name,
          type: row.type,
        })
      })
      return timetableSide;
    }
  })

  return {timetableRow, timetableSide}
}

export default TimetableUseCase;