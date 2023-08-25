import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { template, template_station, template_trainType, template_listStyle } from './Entity/Entity'

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

import Infrastructure from '../../../Infrastructure';
import DirectionNameRepository from '../../DirectionRepositry';
import { Input, IndexListbox } from './ElementsPresentation'

import { isRgb, HexConverter } from './SharedFunction';
import TrainTypeRepository from '../../TrainTypeRepository';

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
      <nav>
        <StationIndexHandler trainTypes={props.trainTypes} trainTypeIndex={props.stationIndex} setTrainTypeIndex={props.SetTrainTypeIndex} />
      </nav>
      <section>
        <dl>
          <dt data-logo={props.stationIndex + 1}>
            <TrainTypePropHandler trainType={props.trainType} propKey="name" SetTrainTypeProperty={props.SetTrainTypeProperty} />
          </dt>
          <dd>
            <ul>
              <li>
                略称
                <TrainTypePropHandler trainType={props.trainType} propKey="abbrName" SetTrainTypeProperty={props.SetTrainTypeProperty} />
              </li>
              <li>
                フォント番号
                <details>
                  <summary data-logo={lineStyleListIndexConverter(props.trainType.lineStyle) + 1}>{lineStyleList[lineStyleListIndexConverter(props.trainType.lineStyle)].name}</summary>
                  <IndexListbox values={lineStyleList} selectedIndex={lineStyleListIndexConverter(props.trainType.lineStyle)} set={lineStyleHandler} />
                </details>
                {/* <TrainTypePropHandler trainType={props.trainType} propKey="fontIndex" SetTrainTypeProperty={props.SetTrainTypeProperty} /> */}
              </li>
              <li>
                文字色
                <TrainTypePropHandler trainType={props.trainType} propKey="textColor" SetTrainTypeProperty={props.SetTrainTypeProperty} />
              </li>
              <li>
                線色
                <TrainTypePropHandler trainType={props.trainType} propKey="strokeColor" SetTrainTypeProperty={props.SetTrainTypeProperty} />
              </li>
              <li>
                背景色
                <TrainTypePropHandler trainType={props.trainType} propKey="backgroundColor" SetTrainTypeProperty={props.SetTrainTypeProperty} />
              </li>
              <li>
                線のスタイル
                <details>
                  <summary data-logo={lineStyleListIndexConverter(props.trainType.lineStyle) + 1}>{lineStyleList[lineStyleListIndexConverter(props.trainType.lineStyle)].name}</summary>
                  <IndexListbox values={lineStyleList} selectedIndex={lineStyleListIndexConverter(props.trainType.lineStyle)} set={lineStyleHandler} />
                </details>
              </li>
              {/* "SenStyle_Jissen", "SenStyle_Hasen", "SenStyle_Tensen", "SenStyle_Ittensasen" */}
            </ul>
          </dd>
        </dl>
      </section>
    </article>
  );
}

type CustomTimetableStyleCheckboxProps = {
  station: template_station;
  PropertyKey: keyof template_station["customTimetableStyle"];
  ArrayIndex: number;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function CustomTimetableStyleInput(props: CustomTimetableStyleCheckboxProps) {

  const SetCustomTimetableStyle: React.ChangeEventHandler<HTMLInputElement> = (() => {
    props.SetStationProperty(
      "customTimetableStyle",
        {...props.station.customTimetableStyle,
        [props.PropertyKey]: props.station.customTimetableStyle[props.PropertyKey].map((property: boolean, index: number) => (props.ArrayIndex == index ? !property : property))}
    )
  })

  return (
    <>
      <Input value={props.station.customTimetableStyle[props.PropertyKey][props.ArrayIndex]} onChange={SetCustomTimetableStyle} />
    </>
  )
}

type stationIndexHandlerProps = {
  trainTypes: template_trainType[];
  trainTypeIndex: number;
  setTrainTypeIndex: SetterOrUpdater<number>;
}

function StationIndexHandler(props: stationIndexHandlerProps) {
  const set = (index: number): void => {
    props.setTrainTypeIndex(index)
  }

  return (<IndexListbox values={props.trainTypes} selectedIndex={props.trainTypeIndex} set={set} />)
}

type TrainTypePropHandlerProps = {
  trainType: template_trainType;
  propKey: keyof template_trainType;
  SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
  className?: string;
}

function TrainTypePropHandler(props: TrainTypePropHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.trainType[props.propKey] === "string") {
      props.SetTrainTypeProperty(props.propKey, event.target.value)
    }
    if (typeof props.trainType[props.propKey] === "number") {
      props.SetTrainTypeProperty(props.propKey, Number(event.target.value))
    }
    if (typeof props.trainType[props.propKey] === "boolean") {
      props.SetTrainTypeProperty(props.propKey, event.target.checked)
    }
    if (isRgb(props.trainType[props.propKey])) {
      props.SetTrainTypeProperty(props.propKey, HexConverter(event.target.value))
    }
  })

  return (
    <Input value={props.trainType[props.propKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

function SetTrainTypePresentation() {
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

export default SetTrainTypePresentation;