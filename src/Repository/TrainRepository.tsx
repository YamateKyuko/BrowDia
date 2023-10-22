import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure'

import { template, template_diagram, template_displayProperty, template_railway, template_station, template_timetable, template_train } from '../Entity/Entity'
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
import DiagramRepository from './DiagramRepositpry';

const TrainRepository = () => {
  const trains = selector<template_train[][]>({
    key: "Trains",
    get: ({get}) => {
      const Data = get(DiagramRepository().Diagram)
      return Data.trains;
    },
    set: ({set}, newValue) => {
      set(
        DiagramRepository().Diagram,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_diagram) => ({...prevState, trains: newValue})
      )
    }
  })

  const directionalTrains = selector<template_train[]>({
    key: "DirectionalTrains",
    get: ({get}) => {
      const Data: template_train[][] = get(trains)
      const directionIndex = get(Infrastructure().DirectionIndex)
      return Data[directionIndex];
    },
    set: ({get, set}, newValue) => {
      const Data = get(trains)
      const directionIndex = get(Infrastructure().DirectionIndex)
      set(
        trains,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_train[][]) => (prevState.map((trains: template_train[], mapIndex: number) => (mapIndex == directionIndex ? newValue : trains)))
      )
    }
  })

  const train = selector<template_train>({
    key: "train",
    get: ({get}) => {
      const Data: template_train[] = get(directionalTrains)
      const trainIndex = get(Infrastructure().TrainIndex)
      return Data[trainIndex];
    },
    set: ({get, set}, newValue) => {
      const Data: template_train[] = get(directionalTrains)
      const trainIndex = get(Infrastructure().TrainIndex)
      set(
        directionalTrains,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_train[]) => (prevState.map((train: template_train, mapIndex: number) => (mapIndex == trainIndex ? newValue : train)))
      )
    }
  })

  return {trains, directionalTrains, train};
}

export default TrainRepository;