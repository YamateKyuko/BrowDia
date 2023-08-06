import React from "react";
import Infrastructure from "../Infrastructure"

import { template, template_displayProperty, template_railway, template_station } from "./UseCase/Presentation/Entity/Entity"
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
import DataRepository from "./DataRepository";

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

  // const RailwayProp = atomFamily({
  //   key: "RailwayProp",
  //   default: selectorFamily({
  //     key: "RailwayProp",
  //     get: <K extends keyof template_railway, P extends template_railway[K]>(key: K) => ({get}): template_railway[K] => {
  //       const railway: template_railway[K] = get(Railway)[key]
  //       return railway;
  //     },
  //   }),
  // })

  // const RailwayProp: <K extends keyof template_railway, P extends template_railway[K]>(param: K) => RecoilState<P> = selectorFamily({
  //   key: "Railway",
  //   get: <K extends keyof template_railway>(key: K) => ({get}) => {
  //     const railway: template_railway = get(Railway)
  //     return railway[key];
  //   },
  //   set: (key: keyof template_railway) => ({set}, newValue) => {
  //     set(
  //       Railway,
  //       newValue instanceof DefaultValue ? newValue : 
  //       (prev: template_railway) => ({...prev, [key]: newValue})
  //     )
  //   },
  // });

  return {Railway}
}

export default RailwayRepository;