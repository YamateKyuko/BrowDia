import React from 'react';
import logo from './logoImg.svg';

import SetPresentation from './SetPresentation'
import SetDisplayPresentation from './SetDisplayPropertyPresentation'
import SetStationPresentation from './SetStationPresentation';
import SetTrainTypePresentation from './SetTrainTypePresentation'

import Infrastructure from './../../Infrastructure/Infrastructure';

import General from './../../img/GeneralImg.svg';
import Style from './../../img/StyleImg.svg';
import Station from './../../img/StationImg.svg';
import Type from './../../img/TypeImg.svg';

import {
  RecoilRoot,
  SetterOrUpdater,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { template , navArray } from './../../Entity/Entity';
import { Input, Nav } from './../../Presentation/ElementsPresentation'



function Setting() {
  const [SettingIndex, SetSettingIndex] = useRecoilState<number>(Infrastructure().SettingIndex);

  const settingNavArray: navArray[] = [
    {src: General, alt: "設定", component: <SetPresentation />},
    {src: Style, alt: "スタイル", component: <SetDisplayPresentation />},
    {src: Station, alt: "-駅-", component: <SetStationPresentation />},
    {src: Type, alt: "種別", component: <SetTrainTypePresentation />},
  ]

  return (
    <main>
      <Nav array={settingNavArray} select={SettingIndex} SetSelect={SetSettingIndex} />
      {settingNavArray[SettingIndex].component}
    </main>
  );
}

type ImageInputProps = {
  SettingIndex: number;
  SetSettingIndex: SetterOrUpdater<number>;
  label: React.ReactElement;
  index: number;
}

export default Setting;
