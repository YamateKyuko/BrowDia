import React from 'react';
import logo from './logo.svg';

import SetPresentation from './SetPresentation'
import SetDisplayPresentation from './SetDisplayPropertyPresentation'
import SetStationPresentation from './SetStationPresentation';
import SetTrainTypePresentation from './SetTrainTypePresentation'

import Infrastructure from '../../../Infrastructure';

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
import { template , indexArrayType } from './Entity/Entity';
import { Input } from "./ElementsPresentation"



function Setting() {
  const [SettingIndex, SetSettingIndex] = useRecoilState<number>(Infrastructure().SettingIndex);

  const settingIndexArray: indexArrayType[] = [
    {src: General, component: <SetPresentation />},
    {src: Style, component: <SetDisplayPresentation />},
    {src: Station, component: <SetStationPresentation />},
    {src: Type, component: <SetTrainTypePresentation />},
  ]

  return (
    <main>
      <nav>
        <ul>
          {settingIndexArray.map((value: indexArrayType, index: number) => (
            <li key={index}><SettingIndexInputHandler SettingIndex={SettingIndex} SetSettingIndex={SetSettingIndex} label={<img src={value.src} />} index={index} /></li>
          ))}
        </ul>
      </nav>
      {settingIndexArray[SettingIndex].component}
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
    <Input value={SettingIndex == props.index} onChange={onChange} label={props.label} />
  )
}

export default Setting;
