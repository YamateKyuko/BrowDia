import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure';

import { template, template_displayProperty, template_station } from '../Entity/Entity';
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

const DisplayPropertyRepository = () => {
  const DisplayProperty = selector<template_displayProperty>({
    key: "DisplayProperty",
    get: ({get}) => {
      const Data: template = get(Infrastructure().Atom)
      return Data.displayProperty;
    },
    set: ({set}, newValue) => {
      set(
        Infrastructure().Atom,
        newValue instanceof DefaultValue ? newValue : 
        (prevState: template) => ({...prevState, "displayProperty": newValue})
      )
    },
  });

  // const DisplayPropertyProp = selectorFamily<template_displayProperty, keyof template_displayProperty>({
  //   key: "DisplayPropertyProp",
  //   get: (key: keyof template_displayProperty) => ({get}) => {
  //     const Data: template = get(Infrastructure().Atom)
  //     return Data.displayProperty[key];
  //   },
  //   set: ({set}, newValue) => {
  //     set(
  //       Infrastructure().Atom,
  //       newValue instanceof DefaultValue ? newValue : 
  //       (prevState: template) => ({...prevState, "displayProperty": newValue})
  //     )
  //   },
  // })

  // selectorFamily<template_station, number>({
  //   key: "Station",
  //   get: (index: number) => ({get}) => {
  //     const station: template_station[] = get(Stations);
  //     return station[index];
  //   },
  //   set: (index: number) => ({set}, newValue) => {
  //     set(
  //       Stations,
  //       newValue instanceof DefaultValue ? newValue :
  //       (prevState: template_station[]) => (prevState.map((station: template_station, mapIndex: number) => (mapIndex == index ? newValue : station)))
  //     )
  //   }
  // })

  return {DisplayProperty}
}

export default DisplayPropertyRepository;