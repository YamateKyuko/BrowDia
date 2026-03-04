import StationRepository from '../../../Repository/StationRepository';
import TrainRepository from '../../../Repository/TrainRepository';
import { template_station, template_timetableRow, template_timetableSide, template_train, template_timetableCell, template__data, template_trainType } from '../../../Entity/Entity'
// import Presentation from '../Presentation/SetStationPresentation'
import { selector } from 'recoil';
import Infrastructure from '../../../Infrastructure/Infrastructure';
import { MinutesConverter, RgbConverter, ToString } from '../../Presentation/SharedFunction';
import TrainTypeRepository from '../../../Repository/TrainTypeRepository';

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
      const directionIndex = get(Infrastructure().DirectionIndex)
      const directionalStations = get(StationRepository().directionalStations(directionIndex))
      
      let timetableRow: template_timetableRow[] = []

      type template_rowOrder = {
        key: number;
        value: boolean[];
      }

      const directionalStationIndex = (index: number): number => {
        if (directionIndex === 1) return directionalStations.length - index - 1
        return index
      } 

      directionalStations.map((station: template_station, mapIndex: number) => {

        const index: number = directionalStationIndex(mapIndex)

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
        const station: template_station = get(StationRepository().Stations)[row.stationIndex]
        
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

  
  const timetableCells = selector<template_timetableCell[][]>({
    key: "timetableCell",
    get: ({get}) => {
      const timetableRow: template_timetableRow[] = get(TimetableUseCase().timetableRow)
      const timetableCell: template_timetableCell[][] = [[]]
      const directionalTrains = get(TrainRepository().directionalTrains)

      const conv = (key: number, train: template_train, _dataCall: (key: keyof template__data) => string): string => {
        switch (key) {
          case 0:
            return ToString(train.operations);
          case 1:
            return train.number;
          case 2:
            return get(TrainTypeRepository().trainType(train.type)).name;
          case 3:
            return train.name;
          case 4:
            return _dataCall("arrival");
          case 5:
            return _dataCall("track");
          case 6:
            return _dataCall("departure");
          default:
            return "Error";
        }
      }

      directionalTrains.map((train: template_train, index: number) => {
        const timetableColumn: template_timetableCell[] = []

        const trainType: template_trainType = get(TrainTypeRepository().trainType(train.type))

        const isRange = (index: number): boolean => {
          if (
            train.timetable.firstStationIndex <= index &&
            train.timetable.terminalStationIndex >= index
          ) {
            return true
          }
          return false
        }

        timetableRow.map((row: template_timetableRow, index: number) => {
          let color = RgbConverter(trainType.textColor)
          
          const _dataCall = (key: keyof template__data): string => {
            const _data = train.timetable._data[row.stationIndex]
            
            if (_data) {
              if (key === "arrival" || key === "departure") {
                switch (_data.stopType) {
                  case 0:
                    return isRange(row.stationIndex) ? "║" : "…";
                  case 1:
                    return MinutesConverter(_data[key]);
                  case 2:
                    return "⇂";
                }
              }
              
              return ToString(_data[key]);
            } else {
              return isRange(row.stationIndex) ? "║" : "…"
            }
          }
          let value: string = conv(row.type, train, _dataCall)

          timetableColumn.push({
            height: 1,
            value: value,
            stationIndex: row.stationIndex,
            color: color,
            backgroundColor: RgbConverter(trainType.backgroundColor),
          })
        })
        timetableCell.push(timetableColumn)
      })

      return timetableCell;
    }
  })

  return {timetableRow, timetableSide, timetableCells}
}

export default TimetableUseCase;