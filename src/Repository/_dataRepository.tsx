import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure'
import { template__data, template_train } from '../Entity/Entity';

import {
  selector,
  DefaultValue
} from 'recoil';

import DiagramRepository from './DiagramRepositpry';
import TrainRepository from './TrainRepository';

const _dataRepository = () => {
  const _data = selector<template__data | null>({
    key: "_data",
    get: ({get}) => {
      const Data: template_train = get(TrainRepository().train)
      const StationIndex = get(Infrastructure().StationIndex)
      return Data.timetable._data[StationIndex];
    },
    set: ({get, set}, newValue) => {
      const StationIndex = get(Infrastructure().StationIndex)
      set(
        _datas,
        newValue instanceof DefaultValue ? newValue :
        (prevState: (template__data | null)[]) => (
          prevState.map((data: template__data | null, mapIndex: number) => (
            mapIndex === StationIndex ? newValue : data
          ))
        )
      )
    },
  })

  const _datas = selector<(template__data | null)[]>({
    key: "_datas",
    get: ({get}) => {
      const Data: template_train = get(TrainRepository().train)
      return Data.timetable._data;
    },
    set: ({set}, newValue) => {
      set(
        TrainRepository().train,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_train) => (
          {...prevState, timetable:
            {...(prevState.timetable),
              _data: newValue
            }
          }
        )
      )
    },
  })

  return {_data};
}

export default _dataRepository;