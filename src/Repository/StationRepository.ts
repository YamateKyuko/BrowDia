import Infrastructure from '../Infrastructure/Infrastructure'

import { template, template_station } from '../Entity/Entity'
import {
  selector,
  DefaultValue,
  selectorFamily,
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

  const directionalStations = selectorFamily<template_station[], number>({
    key: "directionalStations",
    get: (index: number) => ({get}) => {

      const stations: template_station[] = get(Infrastructure().Atom).railway.stations
      if (index === 1) {return [...stations].reverse()}
      return stations;
    }
  });

  const Station = selector<template_station>({
    key: "Station",
    get: ({get}) => {
      const station: template_station[] = get(Stations);
      const index: number = get(Infrastructure().StationIndex);
      return station[index];
    },
    set:({get, set}, newValue) => {
      const index: number = get(Infrastructure().StationIndex);
      set(
        Stations,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_station[]) => (prevState.map((station: template_station, mapIndex: number) => (mapIndex === index ? newValue : station)))
      )
    }
  })

  return {Stations, Station, directionalStations}
}

export default StationRepository;