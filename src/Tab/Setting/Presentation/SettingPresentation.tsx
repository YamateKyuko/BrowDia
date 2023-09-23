import React from 'react';
import logo from './logoImg.svg';

import SetPresentation from './SetPresentation'
import SetDisplayPresentation from './SetDisplayPropertyPresentation'
import SetStationPresentation from './SetStationPresentation';
import SetTrainTypePresentation from './SetTrainTypePresentation'

import Infrastructure from '../../../Infrastructure/Infrastructure';

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
import { template , navArray } from '../../../Entity/Entity';
import { Input, NavMolecule } from '../../Presentation/ElementsPresentation'



function Setting() {
  const [SettingIndex, SetSettingIndex] = useRecoilState<number>(Infrastructure().SettingIndex);

  const settingNavArray: navArray[] = [
    {label: <img src={General} alt="設定" />, component:  <SetPresentation />},
    {label: <img src={Style} alt="スタイル" />, component:  <SetDisplayPresentation />},
    {label: <img src={Station} alt="-駅-" />, component:  <SetStationPresentation />},
    {label: <img src={Type} alt="種別" />, component:  <SetTrainTypePresentation />},
  ]

  return (
    <>
      <NavMolecule value={settingNavArray} navIndex={SettingIndex} SetNavIndex={SetSettingIndex} />
      <article>
        {settingNavArray[SettingIndex].component}
      </article>
    </>
  );
}

export default Setting;
