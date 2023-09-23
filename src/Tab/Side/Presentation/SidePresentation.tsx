import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle, navArray } from '../../../Entity/Entity';
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

import Infrastructure from '../../../Infrastructure/Infrastructure';
import { NavMolecule } from '../../Presentation/ElementsPresentation';

import StationSide from './StationSidePresentation';
import TrainSide from './TrainSidePresentation';

type ComponentProps = {
}

function Component(props: ComponentProps) {
  const [sideIndex, SetSideIndex] = useRecoilState<number>(Infrastructure().sideIndex);

  const sideNavArray: navArray[] = [
    {label: <img src={Station} alt="駅" />, component:  <StationSide />},
    {label: <img src={In} alt="列車" />, component:  <TrainSide />},
  ]

  return (
    <aside>
      <NavMolecule navIndex={sideIndex} SetNavIndex={SetSideIndex} value={sideNavArray} />
      <section>
        {sideNavArray[sideIndex].component}
      </section>
    </aside>
  );
}

function Side() {
  const Atom: template = useRecoilValue(Infrastructure().Atom);

  return (
    <Component
    />
  )
}

export default Side;