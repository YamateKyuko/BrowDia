import React from 'react';
import logo from './logo.svg';
// import './App.css';
import SetStationPresentation from './SetStationPresentation';

import Infrastructure from './../../../../Infrastructure/Infrastructure';

import BrowDia from './img/BrowDia.svg';

import Set from './img/Set.svg';
import Timetable from './img/Timetable.svg'
import StationTimetable from './img/StationTimetable.svg'
import Dia from './img/Dia.svg';
import Save from './img/Save.svg';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { template , indexArrayType } from './Entity/Entity';

function Header() {
  const [PageIndex, SetPageIndex] = useRecoilState<number>(Infrastructure().PageIndex);

  const Atom = useRecoilValue<template>(Infrastructure().Atom)

  const settingIndexArray: indexArrayType[] = [
    {src: BrowDia, component: <></>},
    {src: Dia, component: <></>},
    {src: Timetable, component: <></>},
    {src: StationTimetable, component: <></>},
    {src: Atom.railway.name, component: <></>},
    {src: Save, component: <></>},
  ]

  return (
    <header>
      <nav>
        <ul>
          <li><img src={BrowDia} alt="BrowDia" /></li>
          <li><ImageInput src={Dia} alt="ダイヤ" /></li>
          <li><ImageInput src={Timetable} alt="時刻表" /></li>
          <li><ImageInput src={StationTimetable} alt="駅時刻表" /></li>
          <li><ImageInput src={Set} alt="設定" /></li>
          <li><h1>{Atom.railway.name}</h1></li>
          <li><ImageInput src={Save} alt="保存" /></li>
        </ul>
      </nav>
    </header>
  );
}

type ImageInputProps = {
  src: string;
  alt: string;
}

function ImageInput(props: ImageInputProps) {

  return (
    <input type="image" src={props.src} alt={props.alt} />
  )
}

export default Header;
