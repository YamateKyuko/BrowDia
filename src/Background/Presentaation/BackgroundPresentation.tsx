import React from 'react';

import Infrastructure from '../../Infrastructure/Infrastructure';

import { navArray , template } from '../../Entity/Entity';

import BrowDiaImg from './../../img/BrowDiaImg.svg'
import SetImg from './../../img/SetImg.svg';
import TimetableImg from './../../img/TimetableImg.svg'
import StationTimetableImg from './../../img/StationTimetableImg.svg'
import DiaImg from './../../img/DiaImg.svg';
import SaveImg from './../../img/SaveImg.svg';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater,
} from 'recoil';

import Setting from '../../Setting/Presentation/SettingPresentation';
import Home from '../../Home/Presentation/HomePresentation';
import Side from '../../Side/Presentation/SidePresentation';
import Timetable from '../../Timetable/Presentation/TimetablePresentation';
import { Input, NavMolecule } from '../../Presentation/ElementsPresentation';
import Save from '../../Save/Presentation/SavePresentation';

function Background() {
  const [pageIndex, SetPageIndex] = useRecoilState<number>(Infrastructure().PageIndex);

  const Atom = useRecoilValue<template>(Infrastructure().Atom)

  const settingIndexArray: navArray[] = [
    {label: <img src={BrowDiaImg} alt="ﾎｰﾑ" />, component:  <Home />},
    {label: <img src={SetImg} alt="設定" />, component:  <Setting />},
    {label: <img src={DiaImg} alt="ﾀﾞｲﾔ" />, component:  <></>},
    {label: <img src={TimetableImg} alt="時刻表" />, component:  <Timetable />},
    {label: <img src={StationTimetableImg} alt="駅時刻表" />, component:  <></>},
    {label: <h1>{Atom.railway.name}</h1>, component:  <></>},
    {label: <img src={SaveImg} alt="保存" />, component:  <Save />},
  ]

  return (
    <>
      <header>
        <NavMolecule navIndex={pageIndex} SetNavIndex={SetPageIndex} value={settingIndexArray} />
      </header>
      <main>
        {settingIndexArray[pageIndex].component}
      </main>
    </>
  );
}




export default Background;
