import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle } from '../../../Entity/Entity';
import BrowDia from './../../img/BrowDiaImg.svg';

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
import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import { IndexListbox, StringInput } from '../../Presentation/ElementsPresentation';

import { isRgb, HexConverter } from '../../Presentation/SharedFunction';
import TrainTypeRepository from '../../../Repository/TrainTypeRepository';

type KeyOfCustomTimetableStyle = keyof template_station["customTimetableStyle"]

const lineStyleList: template_listStyle[] = [
  {name: "実線", value: "Jissen", strokeDasharray: ""},
  {name: "波線", value: "Hasen", strokeDasharray: "8, 2"},
  {name: "点線", value: "Tensen", strokeDasharray: "2, 2"},
  {name: "一点鎖線", value: "Ittensasen", strokeDasharray: "8, 2, 2, 2"}
]

const lineStyleListIndexConverter = (lineStyle: template_trainType["lineStyle"]): number => lineStyleList.findIndex((value: template_listStyle, index: number) => value.value == lineStyle)

type ComponentProps = {
  Atom: template;
  // trainTypes: template_trainType[];
  // trainType: template_trainType;
  // directionName: string[];
  // stationIndex: number;
  // SetTrainTypeIndex: SetterOrUpdater<number>;
  // SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
}

function Component(props: ComponentProps) {
  const [downroad, setDownroad] = React.useState<string>("");

  const Save: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    
    var resultJson = JSON.stringify(props.Atom);
    var downLoadLink = document.createElement("a");
    downLoadLink.textContent = 'download';
    downLoadLink.download = downroad + ".json";
    downLoadLink.href = URL.createObjectURL(new Blob([resultJson], {type: "text.plain"}));
    downLoadLink.dataset.downloadurl = ["text/plain", downLoadLink.download, downLoadLink.href].join(":");
    downLoadLink.click();
  }

  const set = (value: string): void => {
    setDownroad(value);
  }

  return (
    <>
      <article>
        <section>
          <h2>保存</h2>
          <dl>
            <dt>
              各種設定
            </dt>
            <dd>
              <ul>
                <li>
                  ファイル名
                  <StringInput value={downroad} set={set} />
                </li>
              </ul>
            </dd>
            <dt>
              <button onClick={Save}>保存</button>
            </dt>
          </dl>
        </section>
      </article>
    </>
  );
}

function Save() {
  const Atom = useRecoilValue<template>(Infrastructure().Atom)
  const [trainTypeIndex, SetTrainTypeIndex] = useRecoilState(Infrastructure().TrainTypeIndex)

  // const trainTypes: template_trainType[] = useRecoilValue<template_trainType[]>(TrainTypeRepository().TrainTypes);
  // const [trainType, setTrainType] = useRecoilState<template_trainType>(TrainTypeRepository().TrainType(trainTypeIndex));

  const DirectionName: string[] = useRecoilValue(DirectionNameRepository().DirectionNameSelector); 

  // const Atom: template = useRecoilValue(Infrastructure().Atom);

  // const SetTrainTypeProperty = <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P): void => {
  //   setTrainType((prev: template_trainType) => ({...prev, [key]: property}))
  // }

  return (
    <Component
    Atom={Atom}
      // trainTypes={trainTypes}
      // trainType={trainType}
      // stationIndex={trainTypeIndex}
      // SetTrainTypeIndex={SetTrainTypeIndex}
      // directionName={DirectionName}
      // SetTrainTypeProperty={SetTrainTypeProperty}
    />
  )
}

export default Save;