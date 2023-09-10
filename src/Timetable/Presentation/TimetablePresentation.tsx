import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle, navArray, template_diagram } from '../../Entity/Entity';
import BrowDia from './../../img/BrowDiaImg.svg';
import Station from './../../img/StationImg.svg';
import In from './../../img/InImg.svg';
import Out from './../../img/OutImg.svg';

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

import Infrastructure from '../../Infrastructure/Infrastructure';
import { NavMolecule } from '../../Presentation/ElementsPresentation';
import DirectionNameRepository from '../../Repository/DirectionRepositry';
import Side from '../../Side/Presentation/SidePresentation';
import DiagramRepository from '../../Repository/DiagramRepositpry';

type ComponentProps = {
  diagrams: template_diagram[];
}

function Component(props: ComponentProps) {
  const [directionIndex, SetDirectionIndex] = useRecoilState<number>(Infrastructure().directionIndex);

  // const sideNavArray: navArray[] = props.diagrams.map((value: template_diagram, index: number) => {
  //   return {src: value.src, alt: value.alt />, component:  <Side diagram={value} />}
  // }

  const sideNavArray: navArray[] = [
    {label: <img src={Out} alt="" />, component:  <></>},
    {label: <img src={In} alt="" />, component:  <></>},
  ]

  return (
    <>
      <NavMolecule navIndex={directionIndex} SetNavIndex={SetDirectionIndex} value={sideNavArray} />
      <article>
        <section>
          <dl>
            <dt>a</dt>
            <dd>a</dd>
          </dl>
          
        </section>
        <Side />
      </article>
    </>
    
  );
}

// function Timetable

function Timetable() {
  const Atom: template = useRecoilValue(Infrastructure().Atom);

  const Diagrams = useRecoilValue<template_diagram[]>(DiagramRepository().Diagrams);

  const [directionName, SetDirectionName] = useRecoilState<string[]>(DirectionNameRepository().DirectionNameSelector);

  return (
    <Component
      diagrams={Diagrams}
    />
  )
}

export default Timetable;