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
import { Input } from './ElementsPresentation'

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater,
} from 'recoil';

import { template , indexArrayType } from './Entity/Entity';
import Home from './HomePresentation';
import Setting from './SettingPresentation';


// export default Header;
