import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { template, template_displayProperty, template_outerTerminal, template_timetableFont } from "./Entity/Entity"

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
import { Input } from "./ElementsPresentation"

import { isTimetableFont } from "./SharedFunction";

type OnchangeType = React.ChangeEventHandler<HTMLInputElement>

type NamedFontComponentProps = {
  timetableFont: template_displayProperty["timetableFont"];
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
  displayProperty: template_displayProperty;
}

function NamedFontComponent(props: NamedFontComponentProps) {
  // const onClick = (): void => {
  //   props.AddNamedFontArray()
  // }

  return (
    <>
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
                <NamedFontProp namedFont={props.displayProperty[key] as template_timetableFont} propKey={key} SetDisplayPropertyProp={props.SetDisplayPropertyProp} />
              )
            ))}
          </tbody>
          <tfoot>
            <tr className="NamedFontTr">
              <th></th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </dd>
    </>
  )
}

type ConsoleLogProps = {
  value: any;
}

function ConsoleLog(props: ConsoleLogProps) {
  console.log(props.value)
  return (<></>)
}

type NamedFontPropComponentProps = {
  NamedFont: template_timetableFont;
  propKey: keyof template_displayProperty;
  setNamedFontProperty: <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P) => void;
}

function NamedFontPropComponent(props: NamedFontPropComponentProps) {
  return (
    <tr className="NamedFontTr">
      <th>
        <span>
          {props.propKey == "timetableVFont" && "時刻表ﾋﾞｭｰ"}
          {props.propKey == "diagramStationFont" && "ﾀﾞｲﾔ駅"}
          {props.propKey == "diagramTimeFont" && "ﾀﾞｲﾔ時刻"}
          {props.propKey == "diagramTrainFont" && "ﾀﾞｲﾔ列車"}
          {props.propKey == "commentFont" && "ｺﾒﾝﾄ"}
        </span>
      </th>
      <td><NamedFontPropHandler namedFont={props.NamedFont} propKey="family" SetNamedFontProp={props.setNamedFontProperty} /></td>
      <td><NamedFontPropHandler namedFont={props.NamedFont} propKey="height" SetNamedFontProp={props.setNamedFontProperty} /></td>
      <td><NamedFontPropHandler namedFont={props.NamedFont} propKey="bold" SetNamedFontProp={props.setNamedFontProperty} /></td>
      <td><NamedFontPropHandler namedFont={props.NamedFont} propKey="italic" SetNamedFontProp={props.setNamedFontProperty} /></td>
    </tr>
  )
}

type NamedFontPropProps = {
  namedFont: template_timetableFont;
  propKey: keyof template_displayProperty;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function NamedFontProp(props: NamedFontPropProps) {
  const SetNamedFontProp = <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P): void => {
    props.SetDisplayPropertyProp(props.propKey, {...props.namedFont, [key]: property})
  }

  return (
    <NamedFontPropComponent NamedFont={props.namedFont} setNamedFontProperty={SetNamedFontProp} propKey={props.propKey} />
  )
}

type NamedFontPropHandlerProps = {
  namedFont: template_timetableFont;
  propKey: keyof template_timetableFont;
  SetNamedFontProp: <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P) => void;
  className?: string;
  arrayKey?: number;
}

function NamedFontPropHandler(props: NamedFontPropHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.namedFont[props.propKey] === "string") {
      props.SetNamedFontProp(props.propKey, event.target.value)
    }
    if (typeof props.namedFont[props.propKey] === "number") {
      props.SetNamedFontProp(props.propKey, Number(event.target.value))
    }
    if (typeof props.namedFont[props.propKey] === "boolean") {
      props.SetNamedFontProp(props.propKey, event.target.checked)
    }
  })

  return (
    <Input value={props.namedFont[props.propKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

type NamedFontProps = {
  displayProperty: template_displayProperty;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function NamedFont(props: NamedFontProps) {
  return (
    <NamedFontComponent timetableFont={props.displayProperty.timetableFont} SetDisplayPropertyProp={props.SetDisplayPropertyProp} displayProperty={props.displayProperty} />
  )
}

export default NamedFont;