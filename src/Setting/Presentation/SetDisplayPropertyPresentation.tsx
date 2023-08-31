import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template_displayProperty, template_rgb } from '../../Entity/Entity';

import {
  useRecoilState,
  useRecoilValue
} from 'recoil';

import DirectionNameRepository from '../../Repository/DirectionRepositry';
import { Input } from '../../Presentation/ElementsPresentation'
import DisplayPropertyRepository from '../../Repository/DisplayPropertyRepository';
import TimetableFont from './SetTimetableFontPresentation';
import NamedFont from './SetNamedFontPresentation';
import { isRgb, HexConverter } from '../../Presentation/SharedFunction'

type ComponentProps = {
  displayProperty: template_displayProperty;
  directionName: string[];
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function Component(props: ComponentProps) {
  return (
    <article>
      <section>
        <dl>
        <dt>スタイル</dt>
          <dd>
            <ul>
              {(Object.keys(props.displayProperty) as (keyof template_displayProperty)[]).map((key: keyof template_displayProperty, index: number) => (
                (typeof props.displayProperty[key] === "boolean" &&
                  <li key={index}>
                    {key == "visibleTrainName" && "列車名表示"}
                    {key == "visibleOuterTerminalOriginSide" && "路線外分岐駅表示"}
                    {key == "visibleOuterTerminalTerminalSide" && "路線外終着駅表示"}
                    {key == "visibleOuterTerminal" && "路線外発着駅表示"}
                    <DisplayPropertyPropHandler displayProperty={props.displayProperty} displayPropertyPropKey={key} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
                  </li>
                )
              ))}
              {(Object.keys(props.displayProperty) as (keyof template_displayProperty)[]).map((key: keyof template_displayProperty, index: number) => (
                (typeof props.displayProperty[key] === "number" &&
                  <li key={index}>
                    {key == "stationNameLength" && "時刻表駅名文字数"}
                    {key == "timetableTrainWidth" && "時刻表列車幅"}
                    {key == "anySecondIncDec1" && "任意秒移動1"}
                    {key == "anySecondIncDec2" && "任意秒移動2"}
                    <DisplayPropertyPropHandler displayProperty={props.displayProperty} displayPropertyPropKey={key} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
                  </li>
                )
              ))}
            </ul>
          </dd>
          <TimetableFont displayProperty={props.displayProperty} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
          <NamedFont displayProperty={props.displayProperty} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
          <dt>色</dt>
          <dd>
            <ul>
              {(Object.keys(props.displayProperty) as (keyof template_displayProperty)[]).map((key: keyof template_displayProperty, index: number) => (
                (isRgb(props.displayProperty[key]) &&
                  <li key={index}>
                    {key == "diagramTextColor" && "ﾀﾞｲﾔ文字"}
                    {key == "diagramBackgroundColor" && "ﾀﾞｲﾔ背景"}
                    {key == "diagramTrainColor" && "ﾀﾞｲﾔ列車"}
                    {key == "diagramAxisColor" && "ﾀﾞｲﾔ軸"}
                    {key == "stdOpeTimeLowerColor" && "基準より短い"}
                    {key == "stdOpeTimeHigherColor" && "基準より長い"}
                    {key == "stdOpeTimeUndefColor" && "基準未定義"}
                    {key == "stdOpeTimeIllegalColor" && "時刻不正"}
                    <DisplayPropertyPropHandler displayProperty={props.displayProperty} displayPropertyPropKey={key} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
                  </li>
                )
              ))}
            </ul>
          </dd>
        </dl>
      </section>
    </article>
  );
}

type StationElementshandlerProps = {
  displayProperty: template_displayProperty;
  displayPropertyPropKey: keyof template_displayProperty;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
  className?: string;
}

function DisplayPropertyPropHandler(props: StationElementshandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.displayProperty[props.displayPropertyPropKey] === "boolean") {
      props.SetDisplayPropertyProp(props.displayPropertyPropKey, event.target.checked)
    }
    if (typeof props.displayProperty[props.displayPropertyPropKey] === "number") {
      console.log(Number(event.target.value))
      props.SetDisplayPropertyProp(props.displayPropertyPropKey, Number(event.target.value))
    }
    if (isRgb(props.displayProperty[props.displayPropertyPropKey])) {
      console.log(event.target.value + "HEX")
      props.SetDisplayPropertyProp(props.displayPropertyPropKey, HexConverter(event.target.value))
    }
  })

  return (
    <Input value={props.displayProperty[props.displayPropertyPropKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

function SetDisplayPropertyPresentation() {
  const [DisplayProperty, SetDisplayProperty] = useRecoilState<template_displayProperty>(DisplayPropertyRepository().DisplayProperty);

  const DirectionName: string[] = useRecoilValue(DirectionNameRepository().DirectionNameSelector); 

  const SetDisplayPropertyProp = <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P): void => {
    SetDisplayProperty((prev: template_displayProperty) => ({...prev, [key]: property}))
  }

  return (
    <Component
      displayProperty={DisplayProperty}
      directionName={DirectionName}
      SetDisplayPropertyProp={SetDisplayPropertyProp}
    />
  )
}


export default SetDisplayPropertyPresentation;