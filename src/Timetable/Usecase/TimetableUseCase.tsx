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

const TimetableUseCase = (() => {

  // const TimetableUseCase = selector<template_


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
})

export default TimetableUseCase;