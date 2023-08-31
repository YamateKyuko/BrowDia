import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure'

import { template, template_station } from '../Entity/Entity'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  DefaultValue,
  selectorFamily,
  atomFamily,
  useSetRecoilState,
  RecoilState
} from 'recoil';

const StationRepository = () => {
  const Stations: RecoilState<template_station[]> = selector<template_station[]>({
    key: "stations",
    get: ({get}) => {
      const Data: template = get(Infrastructure().Atom)
      return Data.railway.stations;
    },
    set: ({set}, newValue) => {
      set(
        Infrastructure().Atom,
        newValue instanceof DefaultValue ? newValue : 
        (prevState: template) => ({...prevState, railway: {...(prevState.railway), stations: newValue},})
      )
    },
  });

  const Station = selectorFamily<template_station, number>({
    key: "Station",
    get: (index: number) => ({get}) => {
      const station: template_station[] = get(Stations);
      return station[index];
    },
    set: (index: number) => ({set}, newValue) => {
      set(
        Stations,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_station[]) => (prevState.map((station: template_station, mapIndex: number) => (mapIndex == index ? newValue : station)))
      )
    }
  })

  return {Stations, Station}
}

export default StationRepository;