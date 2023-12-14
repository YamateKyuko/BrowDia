import React from 'react';
import './../../css/Element.css';
import './../../css/Set.css';
import { template_displayProperty, template_timetableFont } from '../../../Entity/Entity';

import { BooleanInput, NumberInput, StringInput } from '../../Presentation/ElementsPresentation';

import { isTimetableFont } from '../../Presentation/SharedFunction';

type NamedFontComponentProps = {
  timetableFont: template_displayProperty["timetableFont"];
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
  displayProperty: template_displayProperty;
}

function NamedFontComponent(props: NamedFontComponentProps) {

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
          {props.propKey === "timetableVFont" && "時刻表ﾋﾞｭｰ"}
          {props.propKey === "diagramStationFont" && "ﾀﾞｲﾔ駅"}
          {props.propKey === "diagramTimeFont" && "ﾀﾞｲﾔ時刻"}
          {props.propKey === "diagramTrainFont" && "ﾀﾞｲﾔ列車"}
          {props.propKey === "commentFont" && "ｺﾒﾝﾄ"}
        </span>
      </th>
      <td><StringNamedFontPropHandler propKey="family" value={props.NamedFont.family} SetNamedFontProp={props.setNamedFontProperty} /></td>
      <td><NumberNamedFontPropHandler propKey="height" value={props.NamedFont.height} SetNamedFontProp={props.setNamedFontProperty} /></td>
      <td><BooleanNamedFontPropHandler propKey="bold" value={props.NamedFont.bold} SetNamedFontProp={props.setNamedFontProperty} /></td>
      <td><BooleanNamedFontPropHandler propKey="italic" value={props.NamedFont.italic} SetNamedFontProp={props.setNamedFontProperty} /></td>
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

type StringNamedFontPropHandlerProps = {
  propKey: keyof template_timetableFont;
  value: string;
  SetNamedFontProp: <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P) => void;
}

function StringNamedFontPropHandler(props: StringNamedFontPropHandlerProps) {
  const set = (value: string) => props.SetNamedFontProp(props.propKey, value)
  return <StringInput value={props.value} set={set} />
}

type NumberNamedFontPropHandlerProps = {
  propKey: keyof template_timetableFont;
  value: number;
  SetNamedFontProp: <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P) => void;
}

function NumberNamedFontPropHandler(props: NumberNamedFontPropHandlerProps) {
  const set = (value: number) => props.SetNamedFontProp(props.propKey, value)
  return <NumberInput value={props.value} set={set} />
}

type BooleanNamedFontPropHandlerProps = {
  propKey: keyof template_timetableFont;
  value: boolean;
  SetNamedFontProp: <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P) => void;
}

function BooleanNamedFontPropHandler(props: BooleanNamedFontPropHandlerProps) {
  const set = (value: boolean) => props.SetNamedFontProp(props.propKey, value)
  return <BooleanInput value={props.value} set={set} />
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