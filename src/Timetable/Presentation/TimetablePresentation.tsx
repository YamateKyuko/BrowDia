import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle, navArray } from '../../Entity/Entity';
import BrowDia from './../../img/BrowDiaImg.svg';
import Station from './../../img/StationImg.svg';
import In from './../../img/InImg.svg';

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
import { Nav } from '../../Presentation/ElementsPresentation';
import DirectionNameRepository from '../../Repository/DirectionRepositry';
import Side from '../../Side/Presentation/StationSidePresentation';

type ComponentProps = {
}

function Component(props: ComponentProps) {
  const [sideIndex, SetSideIndex] = useRecoilState<number>(Infrastructure().sideIndex);

  const sideNavArray: navArray[] = [
    {src: Station, alt: "", component: <></>},
    {src: In, alt: "", component: <></>},
  ]

  return (
    <>
      <main>
        <Nav select={sideIndex} SetSelect={SetSideIndex} array={sideNavArray} />
        <article>
          <figure>
            <svg></svg>
          </figure>
        </article>
      </main>
      <Side />
    </>
    
  );
}

// function Timetable

function Timetable() {
  const Atom: template = useRecoilValue(Infrastructure().Atom);

  const [directionName, SetDirectionName] = useRecoilState<string[]>(DirectionNameRepository().DirectionNameSelector);

  return (
    <Component
    />
  )
}

export default Timetable;