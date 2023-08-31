import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure'

import { template, template_diagram, template_displayProperty, template_railway, template_station } from '../Entity/Entity'
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

const DiagramRepository = () => {
  const Diagrams = selector<template_diagram[]>({
    key: "Diagrams",
    get: ({get}) => {
      const Data: template_diagram[] = get(Infrastructure().Atom).railway.diagrams
      return Data;
    },
    set: ({set}, newValue) => {
      set(
        Infrastructure().Atom,
        newValue instanceof DefaultValue ? newValue : 
        (prevState: template) => ({...prevState, railway: {...(prevState.railway), diagrams: newValue},})
      )
    },
  });

  const Trains = selectorFamily<template_diagram, number>({
    key: "Trains",
    get: (index: number) => ({get}) => {
      const Data: template_diagram = get(Diagrams)[index]
      return Data;
    },
    set: (index: number) => ({set}, newValue) => {
      set(
        Diagrams,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_diagram[]) => (prevState.map((diagram: template_diagram, mapIndex: number) => (mapIndex == index ? newValue : diagram)))
      )
    }
  })

  return {Diagrams}
}

export default DiagramRepository;