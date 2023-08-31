import React from 'react';
import StationRepository from '../../Repository/StationRepository';
import DirectionRepository from '../../Repository/DirectionRepositry';
import { template, template_station } from '../../Entity/Entity'
// import Presentation from '../Presentation/SetStationPresentation'
import { selector, selectorFamily, DefaultValue } from 'recoil';
import Infrastructure from '../../Infrastructure/Infrastructure';

type BrunchOrderType = {
  isMain: boolean;
  border: boolean;
  Brunch: BrunchOrderType[];
}

type Timetable = {

} 

const SetStaionUseCase = (() => {

  const StaionsUseCase = selector<template_station[]>({
    key: "StationsUseCase",
    get: ({get}) => {
      const staions: template_station[] = get(StationRepository().Stations)
      // const brunchList: BrunchOrderType[] = staions.map((station: template_station, index: number) => {
      //   const BrunchOrder: BrunchOrderType[] = []
      //   if (station.brunchCoreStationIndex != null) {
      //     for (let i: number = 0; i == index; i++) {

      //     }
      //   }

      //   return {
      //     isMain: station.isMain,
      //     border: station.border,
      //     Brunch: BrunchOrder,
      //   }
      // })
      // return staions;
    }
  })

  const StaionUseCase = selectorFamily<template_station, number>({
    key: "StationsUseCase",
    get: (index: number) => ({get}) => {
      const station = get(StationRepository().Station(index));
      return station;
    },
    set: (index: number) => ({set}, newValue) => {
      set(
        StationRepository().Stations,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_station[]) => (prevState.map((station: template_station, mapIndex: number) => (mapIndex == index ? newValue : station)))
      )
    }
  })

  // const getStation = (index: number) => {
  //   const station = StationRepository().find(index)
  //   return station;
  // }
  // : GetStation

  // const changeStation = (index, key, property) => {
  //   const result = StationRepository().change(index, "name", property)
  //   return result;
  // }
  // : ChangeStation

  // const getDirectionName: GetDirectionName = () => {
  //   const directions =  DirectionRepository().find()
  //   return directions;
  // }

  // return {getStation, changeStation, getDirectionName}
})

export default SetStaionUseCase;