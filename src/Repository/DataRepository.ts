import React from 'react';
import Infrastructure from '../Infrastructure/Infrastructure'

import { template, template_displayProperty, template_station } from '../Entity/Entity'
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

const DataRepository = () => {
  const Data = selector<template>({
    key: "Data",
    get: ({get}) => {
      const Data: template = get(Infrastructure().Atom)
      return Data;
    },
    set: ({set}, newValue) => {
      set(
        Infrastructure().Atom,
        newValue
      )
    },
  });

  return {Data}
}

export default DataRepository;