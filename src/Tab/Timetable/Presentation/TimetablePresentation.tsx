import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle, navArray, template_diagram, template_timetable, template_timetableSide } from '../../../Entity/Entity';
import BrowDia from './../../img/BrowDiaImg.svg';
import Station from './../../img/StationImg.svg';
import In from './../../img/InImg.svg';
import Out from './../../img/OutImg.svg';
import GeneralImg from './../../img/GeneralImg.svg';
import DiagramSetting from '../../Side/Presentation/DiagramSidePresentation';

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
import Side from '../../Side/Presentation/SidePresentation';
import DiagramRepository from '../../../Repository/DiagramRepositpry';
import TimetableUseCase from '../Usecase/TimetableUseCase';
import { time } from 'console';

type ComponentProps = {
  diagrams: template_diagram[];
  directionName: string[];
  timetableSide: template_timetableSide[];
  fontSize: number;
}

function Component(props: ComponentProps) {

  const [directionIndex, SetDirectionIndex] = useRecoilState<number>(Infrastructure().directionIndex);
  const [diagramIndex, SetDiagramIndex] = useRecoilState<number>(Infrastructure().diagramIndex);

  const diagramNavArray: navArray[] = props.diagrams.map((value: template_diagram, index: number) => {
    return {label: <>{value.name}</>, component: <></>}
  })
  const directionNavArray: navArray[] = props.directionName.map((value: string, index: number) => {
    return {label: <>{value}</>, component:  <></>}
  })

  return (
    <>
      <NavMolecule navIndex={diagramIndex} SetNavIndex={SetDirectionIndex} value={diagramNavArray} />
      <article>
        <section>
          <NavMolecule navIndex={directionIndex} SetNavIndex={SetDirectionIndex} value={directionNavArray} />
          <figure>
            <svg viewBox={`0 0 ${props.timetableSide.length * props.fontSize}`}>
              <TimetableSide timetableSide={props.timetableSide} />
            </svg>
          </figure>
        </section>
        <Side />
      </article>
    </>
    
  );
}

type TimetableSideProps = {
  timetableSide: template_timetableSide[];
}

function TimetableSide(props: TimetableSideProps) {
  console.log(props.timetableSide)
  return (
    <>
      {props.timetableSide.map((value: template_timetableSide, index: number) => (
        <text x="0" y={index * 16} fontSize="16">
          {value.name}
          {value.value}
        </text>
      ))}
    </>
  );
  
}
function Aa() {console.log("aa"); return (<></>)}

function Timetable() {
  const Atom: template = useRecoilValue(Infrastructure().Atom);

  const Diagrams = useRecoilValue<template_diagram[]>(DiagramRepository().Diagrams);

  const directionName = useRecoilValue<string[]>(DirectionNameRepository().DirectionNameSelector);

  const timetableSide = useRecoilValue<template_timetableSide[]>(TimetableUseCase().timetableSide);
  const FontSize = useRecoilValue<number>(Infrastructure().FontSize);
  // const displayProperty =

  return (
    <Component
      diagrams={Diagrams}
      directionName={directionName}
      timetableSide={timetableSide}
      fontSize={FontSize}
    />
  )
}

export default Timetable;