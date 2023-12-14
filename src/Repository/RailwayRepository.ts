import Infrastructure from '../Infrastructure/Infrastructure'

import { template, template_railway } from '../Entity/Entity'
import {
  selector,
  DefaultValue,
} from 'recoil';

const RailwayRepository = () => {
  const Railway = selector<template_railway>({
    key: "Railway",
    get: ({get}) => {
      const Data: template = get(Infrastructure().Atom)
      return Data.railway;
    },
    set: ({set}, newValue) => {
      set(
        Infrastructure().Atom,
        newValue instanceof DefaultValue ? newValue : 
        (prev: template) => ({...prev, "railway": newValue})
      )
    },
  });

  const startTime = selector<number>({
    key: "startTime",
    get: ({get}) => {
      const Data: template_railway = get(Railway)
      return Data.startTime;
    }
  });

  return { Railway , startTime }
}

export default RailwayRepository;