import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure';

import { template, template_station } from '../Entity/Entity';

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

import InImg from './../Tab/img/InImg.svg';
import OutImg from './../Tab/img/OutImg.svg';

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
      const directionName: string = get(DirectionNameSelector)[index];
      let directionImg: string = ""
      if (directionName == "上り") {directionImg = InImg}
      if (directionName == "上り") {directionImg = OutImg}
      return directionName;
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