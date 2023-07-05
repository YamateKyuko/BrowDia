import React from 'react';
import logo from './logo.svg';
// import './App.css';
import SetStationPresentation from './SetStationPresentation';

import Infrastructure from '../../../Infrastructure';

import BrowDia from './img/BrowDia.svg';

import General from './img/General.svg';
import Style from './img/Style.svg';
import Station from './img/Station.svg';
import Type from './img/Type.svg';

import {
  RecoilRoot,
  SetterOrUpdater,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { template, template_station } from './Entity/Entity';
import Input from './ElementsPresentation';

type settingIndexArrayType = {
  src: string;
  component: JSX.Element;
}

function Setting() {
  const [SettingIndex, SetSettingIndex] = useRecoilState<number>(Infrastructure().PageIndex);

  const Atom = useRecoilValue<template>(Infrastructure().Atom)

  const settingIndexArray: settingIndexArrayType[] = [
    {src: General, component: <SetStationPresentation />},
    {src: Style, component: <SetStationPresentation />},
    {src: Station, component: <SetStationPresentation />},
    {src: Type, component: <SetStationPresentation />},
  ]

  return (
    <main>
      <nav>
        <ul>
          {settingIndexArray.map((value: settingIndexArrayType, index: number) => (
            <li key={index}><SettingIndexInputHandler SettingIndex={SettingIndex} SetSettingIndex={SetSettingIndex} label={<img src={value.src} />} index={index} /></li>
          ))}
        </ul>
      </nav>
      <SetStationPresentation />
    </main>
  );
}

type ImageInputProps = {
  SettingIndex: number;
  SetSettingIndex: SetterOrUpdater<number>;
  label: React.ReactElement;
  index: number;
}

function SettingIndexInputHandler(props: ImageInputProps) {
  const [SettingIndex, SetSettingIndex] = useRecoilState<number>(Infrastructure().SettingIndex)
  const onChange: React.ChangeEventHandler<HTMLElement> = (() => {
    SetSettingIndex(props.index)
  })

  return (
    <Input for={"Setting" + props.index} value={SettingIndex == props.index} onChange={onChange} label={props.label} />
  )
}

export default Setting;
