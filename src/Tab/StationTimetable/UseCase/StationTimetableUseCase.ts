import { selector } from 'recoil';
import RailwayRepository from '../../../Repository/RailwayRepository';
import Infrastructure from '../../../Infrastructure/Infrastructure';
import TrainRepository from '../../../Repository/TrainRepository';
import { template__data, template_station, template_stationTimetable_data, template_train } from '../../../Entity/Entity';
import { RgbConverter, StationTimetableTimeConverter } from '../../Presentation/SharedFunction';
import TrainTypeRepository from '../../../Repository/TrainTypeRepository';
import StationRepository from '../../../Repository/StationRepository';

const StationTimetableUseCase = () => {
  const stationTimetableRow = selector({
    key: "stationTimetableRow",
    get: ({get}) => {
      const startTime: number = get(RailwayRepository().startTime)

      const offset = startTime - startTime % 3600

      const rowTimeList: number[] = []

      for (let i = 0; i < 24; i++) {
        rowTimeList.push(offset + i * 3600)
      }

      return { offset, rowTimeList };
    }
  })

  const stationTimetableSide = selector<number[]>({
    key: "stationTimetableTime",
    get: ({get}) => {
      const rowTimeList: number[] = get(stationTimetableRow).rowTimeList
      const StationTimetableSide: number[] = rowTimeList.map<number>((value: number) => {
        return value / 3600
      })

      return StationTimetableSide;
    }
  })

  const stationTimetable = selector<template_stationTimetable_data[][]>({
    key: "stationTimetable",
    get: ({get}) => {
      const stationIndex = get(Infrastructure().StationIndex)
      const directionalTrains = get(TrainRepository().directionalTrains)
      const stationTimetable_data: (template_stationTimetable_data)[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
      const offset = get(stationTimetableRow).offset
      

      directionalTrains.map((train: template_train, index: number): void => {
        const trainType = get(TrainTypeRepository().trainType(train.type))
        const _data: null | template__data = train.timetable._data[stationIndex]
        const terminalStation: template_station = get(StationRepository().Stations)[train.timetable.terminalStationIndex]
        if (_data) {
          if (_data.stopType === 1 || _data.stopType === 2) {
            
            const value: number = _data.stopType !== 2 && _data.departure ? _data.departure : _data.arrival ? _data.arrival : 0
            const spliceIndex: number = Math.trunc((value - offset) / 3600)
            stationTimetable_data.splice(spliceIndex, 1, [...stationTimetable_data[spliceIndex], {
              value: StationTimetableTimeConverter(value),
              stopType: _data.stopType,
              color: RgbConverter(trainType.textColor),
              backgroundColor: RgbConverter(trainType.backgroundColor),
              traintype: trainType.name,
              terminalStation: terminalStation.name,
            }])
          }
        }
      })

      stationTimetable_data.map((value: template_stationTimetable_data[], index: number): void => {
        value.sort(function(a, b) {
          if(a.value<b.value) return -1;
          if(a.value > b.value) return 1;
          return 0;
        })
      })

      
      return stationTimetable_data;
    }
  })

  return { stationTimetableRow, stationTimetableSide, stationTimetable }
}

export default StationTimetableUseCase;