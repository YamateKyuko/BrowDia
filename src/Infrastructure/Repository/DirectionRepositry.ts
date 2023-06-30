import React from "react";
import Infrastructure from "./../Infrastructure"

import { template, template_station } from "./UseCase/Presentation/Entity/Entity"

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  DefaultValue,
  selectorFamily,
  atomFamily,
  useSetRecoilState
} from 'recoil';

const DirectionNameRepository = () => {
  const DirectionNameSelector = selector<string[]>({
    key: "DirectionsSelector",
    get: ({get}) => {
      const Data: template = get(Infrastructure().Atom)
      return Data.railway.directionName;
    },
    set: ({set}, newValue) => {
      set(
        Infrastructure().Atom,
        newValue instanceof DefaultValue ? newValue : 
        (prevState: template) => ({...prevState, railway: {...(prevState.railway), directionName: newValue},})
      )
    },
  });
  
  const DirectionNameSelectorFamily = selectorFamily<string, number>({
    key: "StationSelectorFamily",
    get: (index: number) => ({get}) => {
      const directionName: string[] = get(DirectionNameSelector)
      return directionName[index];
    },
    set: (index: number) => ({set}, newValue) => {
      set(
        DirectionNameSelector,
        newValue instanceof DefaultValue ? newValue :
        (prevState: string[]) => (prevState.map((directionName: string, mapIndex: number) => (mapIndex == index ? newValue : directionName)))
      )
    }
  })

  return {DirectionNameSelector, DirectionNameSelectorFamily}
}

export default DirectionNameRepository;