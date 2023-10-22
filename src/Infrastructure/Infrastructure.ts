import JSON from '../Data.json'
import { template } from '../Entity/Entity';
import {
  atom,
} from 'recoil';

const Infrastructure = () => {
  const Atom = atom<template>({key: "Data", default: JSON as template,})

  const pageIndex = atom<number>({key: "pageIndex", default: 3,})
  const SettingIndex = atom<number>({key: "settingIndex", default: 0,})
  const sideIndex = atom<number>({key: "sideIndex", default: 0,})

  const DirectionIndex = atom<number>({key: "directionIndex", default: 0,})

  const DiagramIndex = atom<number>({key: "diagramIndex", default: 0,})

  const StationIndex = atom<number>({key: "StationIndex", default: 0,})
  const TrainTypeIndex = atom<number>({key: "TypeIndex", default: 0,})
  const ID = atom<number>({key: "ID", default: 0,})

  const TrainIndex = atom<number>({key: "TrainIndex", default: 0,})

  const FontSize = atom<number>({key: "FontSize", default: 16,})
  
  return { Atom, PageIndex: pageIndex, SettingIndex, sideIndex, DirectionIndex, StationIndex, TrainTypeIndex, ID, DiagramIndex, FontSize, TrainIndex };
}

export default Infrastructure;