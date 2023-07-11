import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { template, template_station, template_outerTerminal, template_track, template_displayProperty, template_timetableFont, template_rgb } from "./Entity/Entity"

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

import Infrastructure from "../../../Infrastructure";
import StationRepository from "../../StationRepository";
import DirectionNameRepository from "../../DirectionRepositry";
import Input from "./ElementsPresentation"
import Tracks from "./TracksPresentation";
import { promises } from "dns";
import OuterTerminal from "./SetOuterTerminalPresentation";
import DisplayPropertyRepository from "../../DisplayPropertyRepository";

type KeyOfCustomTimetableStyle = keyof template_station["customTimetableStyle"]

type OnchangeType = React.ChangeEventHandler<HTMLInputElement>

type ComponentProps = {
  displayProperty: template_displayProperty;
  directionName: string[];
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function isTimetableFont(value: template_displayProperty[keyof template_displayProperty]): value is template_timetableFont {
  return typeof value == "object" && "height" in value && "family" in value && "bold" in value && "italic" in value;
}

function isRgb(value: template_displayProperty[keyof template_displayProperty]): value is template_rgb {
  return typeof value == "object" && "r" in value && "g" in value && "b" in value;
}


function Component(props: ComponentProps) {
  const insted: any = (() => {return("")})

  return (
    <article>
      {/* <nav>
        <StationIndexHandler stations={props.stations} stationIndex={props.stationIndex} setStationIndex={props.SetStationIndex} />
      </nav> */}
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
          <dt>時刻表フォント</dt>
          <dd>
            <table>
              <thead>
                <tr className="timetableFontTr">
                  <td><span>番号</span></td>
                  <th><span>ファミリー</span></th>
                  <td><span>高さ</span></td>
                  <td><span>太字</span></td>
                  <td><span>斜体</span></td>
                  <td><span></span></td>
                </tr>
              </thead>
              <tbody>
                {props.displayProperty.timetableFont.map((timetableFont: template_timetableFont, index: number) => (
                  <tr className="timetableFontTr" key={index}>
                    <td><div className="data-logo">{index + 1}</div></td>
                    <th><Input value="family" onChange={() => {}} /></th>
                    <td><Input value="height" onChange={() => {}} /></td>
                    <td><Input value={true} onChange={() => {}} /></td>
                    <td><Input value={true} onChange={() => {}} /></td>
                    <td><button>削除</button></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="timetableFontTr">
                  <td></td>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><button>追加</button></td>
                </tr>
              </tfoot>
            </table>
          </dd>
          <dt>各種フォント</dt>
          <dd>
            <table>
              <thead>
                <tr className="timetableFontTr">
                  <th><span></span></th>
                  <td><span>ファミリー</span></td>
                  <td><span>高さ</span></td>
                  <td><span>太字</span></td>
                  <td><span>斜体</span></td>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(props.displayProperty) as (keyof template_displayProperty)[]).map((key: keyof template_displayProperty, index: number) => (
                  (isTimetableFont(props.displayProperty[key]) &&
                    <tr className="NamedFontTr" key={index}>
                      <th>
                        <span>
                          {key == "timetableVFont" && "時刻表ﾋﾞｭｰ"}
                          {key == "diagramStationFont" && "ﾀﾞｲﾔ駅"}
                          {key == "diagramTimeFont" && "ﾀﾞｲﾔ時刻"}
                          {key == "diagramTrainFont" && "ﾀﾞｲﾔ列車"}
                          {key == "commentFont" && "ｺﾒﾝﾄ"}
                        </span>
                      </th>
                      <td><Input value="family" onChange={() => {}} /></td>
                      <td><Input value="height" onChange={() => {}} /></td>
                      <td><Input value={true} onChange={() => {}} /></td>
                      <td><Input value={true} onChange={() => {}} /></td>
                    </tr>
                  )
                ))}
              </tbody>
              <tfoot>
                <tr className="timetableFontTr">
                  <th></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </dd>
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

function HexConverter(value: string): template_rgb {
  if (value.slice(0, 1) == "#") {value = value.slice(1)}

	return {r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16)}
}

type StationElementsHundlerProps = {
  displayProperty: template_displayProperty;
  displayPropertyPropKey: keyof template_displayProperty;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
  className?: string;
}

function DisplayPropertyPropHandler(props: StationElementsHundlerProps) {
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

type ConsoleLogProps = {
  value: any;
}

function ConsoleLog(props: ConsoleLogProps) {
  console.log(props.value)
  return (<></>)
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

const Checkbox = ({KE: KE, IN: IN, onChange}: {KE: string; IN: number | null; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;}) => {
  const onChangeHundler: React.ChangeEventHandler<HTMLInputElement> = (() => {
    
  })

  return (
    <>
      <input type="checkbox" id={IN ? KE + IN : KE} name={KE} onChange={onChangeHundler} />
      <label className="checkbox" htmlFor={IN ? KE + IN : KE} />
    </>
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