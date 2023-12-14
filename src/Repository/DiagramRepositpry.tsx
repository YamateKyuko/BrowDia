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

  const Diagram = selector<template_diagram>({
    key: "Diagram",
    get: ({get}) => {
      const diagram: template_diagram[] = get(Diagrams)
      const diagramIndex: number = get(Infrastructure().DiagramIndex)
      return diagram[diagramIndex];
    },
    set: ({get, set}, newValue) => {
      const diagramIndex: number = get(Infrastructure().DiagramIndex)
      set(
        Diagrams,
        newValue instanceof DefaultValue ? newValue :
        (prevState: template_diagram[]) => (prevState.map((diagram: template_diagram, mapIndex: number) => (mapIndex === diagramIndex ? newValue : diagram)))
      )
    }
  })

  return {Diagrams, Diagram}
}

export default DiagramRepository;