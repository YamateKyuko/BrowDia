import React from 'react';

import Infrastructure from '../../Infrastructure/Infrastructure';

import { indexArrayType , template } from '../../Entity/Entity';

import BrowDia from './../../img/BrowDia.svg'
import Set from './../../img/Set.svg';
import Timetable from './../../img/Timetable.svg'
import StationTimetable from './../../img/StationTimetable.svg'
import Dia from './../../img/Dia.svg';
import Save from './../../img/Save.svg';

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
import { Input } from '../../Presentation/ElementsPresentation';

function Background() {
  const [pageIndex, SetPageIndex] = useRecoilState<number>(Infrastructure().PageIndex);

  const Atom = useRecoilValue<template>(Infrastructure().Atom)

  const settingIndexArray: indexArrayType[] = [
    {src: BrowDia, alt: "ﾎｰﾑ", component: <Home />},
    {src: Set, alt: "設定", component: <Setting />},
    {src: Dia, alt: "ﾀﾞｲﾔ", component: <Side />},
    {src: Timetable, alt: "時刻表", component: <></>},
    {src: StationTimetable, alt: "駅時刻表", component: <></>},
    {src: Atom.railway.name, alt: "", component: <></>, str: true},
    {src: Save, alt: "保存", component: <></>},
  ]

  return (
    <>
      <header>
        <nav>
          <ul>
            {settingIndexArray.map((value: indexArrayType, index: number) => (
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
