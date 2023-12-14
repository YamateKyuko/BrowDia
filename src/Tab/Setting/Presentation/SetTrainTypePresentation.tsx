import React from 'react';
import './../../css/Element.css';
import './../../css/Set.css';
import { template_trainType, template_listStyle, template_rgb } from '../../../Entity/Entity'

import {
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater
} from 'recoil';

import Infrastructure from '../../../Infrastructure/Infrastructure';
import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import {  ColorInput, IndexListbox, StringInput } from '../../Presentation/ElementsPresentation'

import TrainTypeRepository from '../../../Repository/TrainTypeRepository';

const lineStyleList: template_listStyle[] = [
  {name: "実線", value: "Jissen", strokeDasharray: ""},
  {name: "波線", value: "Hasen", strokeDasharray: "8, 2"},
  {name: "点線", value: "Tensen", strokeDasharray: "2, 2"},
  {name: "一点鎖線", value: "Ittensasen", strokeDasharray: "8, 2, 2, 2"}
]

const lineStyleListIndexConverter = (lineStyle: template_trainType["lineStyle"]): number => lineStyleList.findIndex((value: template_listStyle, index: number) => value.value === lineStyle)

type ComponentProps = {
  trainTypes: template_trainType[];
  trainType: template_trainType;
  directionName: string[];
  stationIndex: number;
  SetTrainTypeIndex: SetterOrUpdater<number>;
  SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
}

function Component(props: ComponentProps) {
  return (
    <>
      <TrainTypeIndexHandler trainTypes={props.trainTypes} trainTypeIndex={props.stationIndex} setTrainTypeIndex={props.SetTrainTypeIndex} />
      {props.trainType
        ? <Section trainType={props.trainType} stationIndex={props.stationIndex} SetTrainTypeProperty={props.SetTrainTypeProperty} />
        : <NotFound />
      }
    </>
  );
}

function NotFound() {
  return (
    <section>
      <h2>種別が見つかりませんでした。</h2>
      <dl>
        <dd>
          <ul>
            <li>
              種別を作成してください。
            </li>
          </ul>
        </dd>
      </dl>
    </section>
  )
}

type SectionProps = {
  trainType: template_trainType;
  stationIndex: number;
  SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
}

function Section(props: SectionProps) {
  const lineStyleHandler = (index: number): void => {
    props.SetTrainTypeProperty("lineStyle", lineStyleList[index].value)
  }

  return (
    <section>
      <h2 data-logo={props.stationIndex + 1}>
        <StringTrainTypePropHandler propKey="name" value={props.trainType.name} SetTrainTypeProperty={props.SetTrainTypeProperty} />
      </h2>
      <dl>
        <dt>
          
        </dt>
        <dd>
          <ul>
            <li>
              略称
              <StringTrainTypePropHandler propKey="abbrName" value={props.trainType.abbrName} SetTrainTypeProperty={props.SetTrainTypeProperty} />
            </li>
            <li>
              フォント番号
              <details>
                <summary data-logo={lineStyleListIndexConverter(props.trainType.lineStyle) + 1}>{lineStyleList[lineStyleListIndexConverter(props.trainType.lineStyle)].name}</summary>
                <IndexListbox values={lineStyleList} selectedIndex={lineStyleListIndexConverter(props.trainType.lineStyle)} set={lineStyleHandler} />
              </details>
            </li>
            <li>
              文字色
              <ColorTrainTypePropHandler propKey="textColor" value={props.trainType.textColor} SetTrainTypeProperty={props.SetTrainTypeProperty} />
            </li>
            <li>
              線色
              <ColorTrainTypePropHandler propKey="strokeColor" value={props.trainType.strokeColor} SetTrainTypeProperty={props.SetTrainTypeProperty} />
            </li>
            <li>
              背景色
              <ColorTrainTypePropHandler propKey="backgroundColor" value={props.trainType.backgroundColor} SetTrainTypeProperty={props.SetTrainTypeProperty} />
            </li>
            <li>
              線のスタイル
              <details>
                <summary data-logo={lineStyleListIndexConverter(props.trainType.lineStyle) + 1}>{lineStyleList[lineStyleListIndexConverter(props.trainType.lineStyle)].name}</summary>
                <IndexListbox values={lineStyleList} selectedIndex={lineStyleListIndexConverter(props.trainType.lineStyle)} set={lineStyleHandler} />
              </details>
            </li>
          </ul>
        </dd>
      </dl>
    </section>
  )
}

type TrainTypeIndexHandlerProps = {
  trainTypes: template_trainType[];
  trainTypeIndex: number;
  setTrainTypeIndex: SetterOrUpdater<number>;
}

function TrainTypeIndexHandler(props: TrainTypeIndexHandlerProps) {
  const set = (index: number): void => {
    props.setTrainTypeIndex(index)
  }

  return (<aside><IndexListbox values={props.trainTypes} selectedIndex={props.trainTypeIndex} set={set} /></aside>)
}

type StringTrainTypePropHandlerProps = {
  propKey: keyof template_trainType;
  value: string;
  SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
}

function StringTrainTypePropHandler(props: StringTrainTypePropHandlerProps) {
  const set = (value: string): void => {
    props.SetTrainTypeProperty(props.propKey, value)
  }

  return (
    <StringInput value={props.value} set={set} />
  )
}

type ColorTrainTypePropHandlerProps = {
  propKey: keyof template_trainType;
  value: template_rgb;
  SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
}

function ColorTrainTypePropHandler(props: ColorTrainTypePropHandlerProps) {
  const set = (value: template_rgb): void => {
    props.SetTrainTypeProperty(props.propKey, value)
  }

  return (
    <ColorInput value={props.value} set={set} />
  )
}


function SetTrainTypePresentation() {
  const [trainTypeIndex, SetTrainTypeIndex] = useRecoilState(Infrastructure().TrainTypeIndex)

  const trainTypes: template_trainType[] = useRecoilValue<template_trainType[]>(TrainTypeRepository().trainTypes);
  const [trainType, setTrainType] = useRecoilState<template_trainType>(TrainTypeRepository().trainType(trainTypeIndex));

  const DirectionName: string[] = useRecoilValue(DirectionNameRepository().DirectionNameSelector); 

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

export default SetTrainTypePresentation;