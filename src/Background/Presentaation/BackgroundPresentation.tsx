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
import { Input } from '../../Presentation/ElementsPresentation';

function Background() {
  const [pageIndex, SetPageIndex] = useRecoilState<number>(Infrastructure().PageIndex);

  const Atom = useRecoilValue<template>(Infrastructure().Atom)

  const settingIndexArray: navArray[] = [
    {src: BrowDiaImg, alt: "ﾎｰﾑ", component: <Home />},
    {src: SetImg, alt: "設定", component: <Setting />},
    {src: DiaImg, alt: "ﾀﾞｲﾔ", component: <Side />},
    {src: TimetableImg, alt: "時刻表", component: <Timetable />},
    {src: StationTimetableImg, alt: "駅時刻表", component: <></>},
    {src: Atom.railway.name, alt: "", component: <></>, str: true},
    {src: SaveImg, alt: "保存", component: <></>},
  ]

  return (
    <>
      <header>
        <nav>
          <ul>
            {settingIndexArray.map((value: navArray, index: number) => (
              <li key={index}><PageIndexInputHandler pageIndex={pageIndex} SetPageIndex={SetPageIndex} label={<img src={value.src} alt={value.alt} />} index={index} str={!!value.src} /></li>
            ))}
          </ul>
        </nav>
      </header>
      {settingIndexArray[pageIndex].component}
    </>
  );
}


type PageInputHandlerProps = {
  pageIndex: number;
  SetPageIndex: SetterOrUpdater<number>;
  label: React.ReactElement;
  index: number;
  str?: boolean;
}

function PageIndexInputHandler(props: PageInputHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLElement> = (() => {
    props.SetPageIndex(props.index)
  })

  return (
    <>
      <Input value={props.pageIndex == props.index} onChange={onChange} label={props.label} />
    </>
  )
}


export default Background;
