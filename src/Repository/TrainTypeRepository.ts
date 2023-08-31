import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure';

import { template, template_trainType } from '../Entity/Entity';
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

const TrainTypeRepository = () => {
  const TrainTypes: RecoilState<template_trainType[]> = selector<template_trainType[]>({
    key: "trainTypes",
    get: ({get}) => {
      const Data: template = get(Infrastructure().Atom)
      return Data.railway.trainTypes;
    },
    set: ({set}, newValue) => {
      set(
        Infrastructure().Atom,
        newValue instanceof DefaultValue ? newValue : 
        (prevState: template) => ({...prevState, railway: {...(prevState.railway), trainTypes: newValue},})
      )
    },
  });

  const TrainType = selectorFamily<template_trainType, number>({
    key: "TrainType",
    get: (index: number) => ({get}) => {
      const trainType: template_trainType[] = get(TrainTypes);
      return trainType[index];
    },
    set: (index: number) => ({set}, newValue) => {
      set(
        TrainTypes,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_trainType[]) => (prevState.map((trainType: template_trainType, mapIndex: number) => (mapIndex == index ? newValue : trainType)))
      )
    }
  })

  return {TrainTypes, TrainType}
}

export default TrainTypeRepository;