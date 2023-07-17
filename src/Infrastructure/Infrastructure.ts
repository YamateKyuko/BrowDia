import React from "react";
import JSON from "../Data.json"
import { template } from "./Repository/UseCase/Presentation/Entity/Entity";
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

  const PageIndex = atom<number>({key: "PageIndex", default: 0,})
  const SettingIndex = atom<number>({key: "SettingIndex", default: 2,})

  const StationIndex = atom<number>({key: "StationIndex", default: 2,})
  const TypeIndex = atom<number>({key: "TypeIndex", default: 0,})
  const ID = atom<number>({key: "ID", default: 0,})
  
  return { Atom, PageIndex, SettingIndex, StationIndex, TypeIndex, ID };
}

export default Infrastructure;