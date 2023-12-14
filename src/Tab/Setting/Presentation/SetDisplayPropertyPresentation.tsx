import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template_displayProperty, template_rgb } from '../../../Entity/Entity';

import {
  useRecoilState,
  useRecoilValue
} from 'recoil';

import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import { BooleanInput, ColorInput, NumberInput } from '../../Presentation/ElementsPresentation'
import DisplayPropertyRepository from '../../../Repository/DisplayPropertyRepository';
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
    <>
      <section>
        <h2>スタイル</h2>
        <dl>
          <dt>一般</dt>
          <dd>
            <ul>
              {(Object.keys(props.displayProperty) as (keyof template_displayProperty)[]).map((key: keyof template_displayProperty, index: number) => (
                (typeof props.displayProperty[key] === "boolean" &&
                  <li key={index}>
                    {key === "visibleTrainName" && "列車名表示"}
                    {key === "visibleOuterTerminalOriginSide" && "路線外分岐駅表示"}
                    {key === "visibleOuterTerminalTerminalSide" && "路線外終着駅表示"}
                    {key === "visibleOuterTerminal" && "路線外発着駅表示"}
                    <BooleanDisplayPropertyPropHandler displayPropertyPropKey={key} value={props.displayProperty[key] as boolean} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
                  </li>
                )
              ))}
              {(Object.keys(props.displayProperty) as (keyof template_displayProperty)[]).map((key: keyof template_displayProperty, index: number) => (
                (typeof props.displayProperty[key] === "number" &&
                  <li key={index}>
                    {key === "stationNameLength" && "時刻表駅名文字数"}
                    {key === "timetableTrainWidth" && "時刻表列車幅"}
                    {key === "anySecondIncDec1" && "任意秒移動1"}
                    {key === "anySecondIncDec2" && "任意秒移動2"}
                    <NumberDisplayPropertyPropHandler displayPropertyKey={key} value={props.displayProperty[key] as number} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
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
                    {key === "diagramTextColor" && "ﾀﾞｲﾔ文字"}
                    {key === "diagramBackgroundColor" && "ﾀﾞｲﾔ背景"}
                    {key === "diagramTrainColor" && "ﾀﾞｲﾔ列車"}
                    {key === "diagramAxisColor" && "ﾀﾞｲﾔ軸"}
                    {key === "stdOpeTimeLowerColor" && "基準より短い"}
                    {key === "stdOpeTimeHigherColor" && "基準より長い"}
                    {key === "stdOpeTimeUndefColor" && "基準未定義"}
                    {key === "stdOpeTimeIllegalColor" && "時刻不正"}
                    <ColorDisplayPropertyPropHandler displayPropertyKey={key} value={props.displayProperty[key] as template_rgb} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
                  </li>
                )
              ))}
            </ul>
          </dd>
        </dl>
      </section>
    </>
  );
}

type BooleanDisplayPropertyPropHandlerProps = {
  displayPropertyPropKey: keyof template_displayProperty;
  value: boolean;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function BooleanDisplayPropertyPropHandler(props: BooleanDisplayPropertyPropHandlerProps) {
  const set = (value: boolean): void => {
    props.SetDisplayPropertyProp(props.displayPropertyPropKey, value)
  }

  return (
    <BooleanInput value={props.value} set={set} />
  )
}

type NumberDisplayPropertyPropHandlerProps = {
  displayPropertyKey: keyof template_displayProperty;
  value: number;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function NumberDisplayPropertyPropHandler(props: NumberDisplayPropertyPropHandlerProps) {
  const set = (value: number): void => {
    props.SetDisplayPropertyProp(props.displayPropertyKey, value)
  }

  return (
    <NumberInput value={props.value} set={set} />
  )
}

type ColorDisplayPropertyPropHandlerProps = {
  displayPropertyKey: keyof template_displayProperty;
  value: template_rgb;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function ColorDisplayPropertyPropHandler(props: ColorDisplayPropertyPropHandlerProps) {
  const set = (value: template_rgb): void => {
    props.SetDisplayPropertyProp(props.displayPropertyKey, value)
  }

  return (
    <ColorInput value={props.value} set={set} />
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