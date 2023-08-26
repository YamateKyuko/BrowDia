import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle } from '../../Entity/Entity';
import BrowDia from './../../img/BrowDia.svg';

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
import DirectionNameRepository from '../../Infrastructure/Repository/DirectionRepositry';
import { Input, IndexListbox } from '../../Presentation/ElementsPresentation';

import { isRgb, HexConverter } from '../../Presentation/SharedFunction';
import TrainTypeRepository from '../../Infrastructure/Repository/TrainTypeRepository';

type KeyOfCustomTimetableStyle = keyof template_station["customTimetableStyle"]

const lineStyleList: template_listStyle[] = [
  {name: "実線", value: "Jissen", strokeDasharray: ""},
  {name: "波線", value: "Hasen", strokeDasharray: "8, 2"},
  {name: "点線", value: "Tensen", strokeDasharray: "2, 2"},
  {name: "一点鎖線", value: "Ittensasen", strokeDasharray: "8, 2, 2, 2"}
]

const lineStyleListIndexConverter = (lineStyle: template_trainType["lineStyle"]): number => lineStyleList.findIndex((value: template_listStyle, index: number) => value.value == lineStyle)

type ComponentProps = {
  trainTypes: template_trainType[];
  trainType: template_trainType;
  directionName: string[];
  stationIndex: number;
  SetTrainTypeIndex: SetterOrUpdater<number>;
  SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
}

function Component(props: ComponentProps) {
  const lineStyleHandler = (index: number): void => {
    props.SetTrainTypeProperty("lineStyle", lineStyleList[index].value)
  }

  return (
    <article>
      <section>
      <img src={BrowDia} alt="BrowDia" />
        <dl>
          <dt>
            
          </dt>
          <dd>
            <ul>
              <li>
                BrowDia をご利用頂き誠に有難う御座います。
              </li>
              <li>
                ブラウザでダイヤの制作閲覧ができるよう現在鋭意開発中です。
              </li>
              <li>
                Github
                <a href="https://github.com/swallow3/BrowDia">BrowDia</a>
              </li>
            </ul>
          </dd>
        </dl>
      </section>
    </article>
  );
}

function Home() {
  const [trainTypeIndex, SetTrainTypeIndex] = useRecoilState(Infrastructure().TrainTypeIndex)

  const trainTypes: template_trainType[] = useRecoilValue<template_trainType[]>(TrainTypeRepository().TrainTypes);
  const [trainType, setTrainType] = useRecoilState<template_trainType>(TrainTypeRepository().TrainType(trainTypeIndex));

  const DirectionName: string[] = useRecoilValue(DirectionNameRepository().DirectionNameSelector); 

  const Atom: template = useRecoilValue(Infrastructure().Atom);

  const SetTrainTypeProperty = <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P): void => {
    setTrainType((prev: template_trainType) => ({...prev, [key]: property}))
  }

  return (
    <Component
      trainTypes={trainTypes}
      trainType={trainType}
      stationIndex={trainTypeIndex}
      SetTrainTypeIndex={SetTrainTypeIndex}
      directionName={DirectionName}
      SetTrainTypeProperty={SetTrainTypeProperty}
    />
  )
}

export default Home;