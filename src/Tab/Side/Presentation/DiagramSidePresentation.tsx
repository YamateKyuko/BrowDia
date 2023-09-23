import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle, navArray, template_diagram } from '../../../Entity/Entity';
import BrowDia from './../../img/BrowDiaImg.svg';
import Station from './../../img/StationImg.svg';
import In from './../../img/InImg.svg';
import Out from './../../img/OutImg.svg';
import GeneralImg from './../../img/GeneralImg.svg';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  DefaultValue,
  useSetRecoilState,
  SetterOrUpdater
} from 'recoil';

import Infrastructure from '../../../Infrastructure/Infrastructure';
import { NavMolecule } from '../../Presentation/ElementsPresentation';
import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import Side from './SidePresentation';
import DiagramRepository from '../../../Repository/DiagramRepositpry';

type ComponentProps = {
}

function Component(props: ComponentProps) {
  // const [directionIndex, SetDirectionIndex] = useRecoilState<number>(Infrastructure().directionIndex);

  // const diagramNavArray: navArray[] = props.diagrams.map((value: template_diagram, index: number) => {
  //   return {label: <>{value.name}</>, component: <></>}
  // })
  // const directionNavArray: navArray[] = [
  //   {label: <img src={Out} alt="" />, component:  <></>},
  //   {label: <img src={In} alt="" />, component:  <></>},
  //   {label: <img src={GeneralImg} alt="" />, component:  <></>},
  // ]

  return (
    <dl>
      <dt>一般</dt>
      <dd>
        <ul>
          <li>名称</li>
          <li>主背景色番号</li>
          <li>副背景色番号</li>
          <li>背景画像番号</li>
        </ul>
      </dd>
    </dl>
  );
}

function DiagramSetting() {
  // const Atom: template = useRecoilValue(Infrastructure().Atom);

  // const Diagrams = useRecoilValue<template_diagram[]>(DiagramRepository().Diagrams);

  // const [directionName, SetDirectionName] = useRecoilState<string[]>(DirectionNameRepository().DirectionNameSelector);

  return (
    <Component
      // diagrams={Diagrams}
    />
  )
}

export default DiagramSetting;