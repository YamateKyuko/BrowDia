import React from 'react';
import JSON from '../Data.json'
import { template } from '../Entity/Entity';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  DefaultValue,
  useSetRecoilState
} from 'recoil';

const Infrastructure = () => {
  const Atom = atom<template>({key: "Data", default: JSON as template,})

  const pageIndex = atom<number>({key: "pageIndex", default: 0,})
  const settingIndex = atom<number>({key: "settingIndex", default: 0,})
  const sideIndex = atom<number>({key: "sideIndex", default: 0,})

  const inOutIndex = atom<number>({key: "directionIndex", default: 0,})

  const stationIndex = atom<number>({key: "StationIndex", default: 2,})
  const typeIndex = atom<number>({key: "TypeIndex", default: 0,})
  const ID = atom<number>({key: "ID", default: 0,})
  
  return { Atom, PageIndex: pageIndex, SettingIndex: settingIndex, sideIndex, directionIndex: inOutIndex, StationIndex: stationIndex, TrainTypeIndex: typeIndex, ID };
}

export default Infrastructure;