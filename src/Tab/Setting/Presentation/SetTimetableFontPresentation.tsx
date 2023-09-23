import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_displayProperty, template_outerTerminal, template_timetableFont } from '../../../Entity/Entity'

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

import { Input } from '../../Presentation/ElementsPresentation'

type OnchangeType = React.ChangeEventHandler<HTMLInputElement>

type TimetableFontComponentProps = {
  timetableFont: template_displayProperty["timetableFont"];
  SetTimetableFontArray: (index: number, newValue: template_timetableFont) => void;
  DeleteTimetableFontArray: (index: number) => void;
  AddTimetableFontArray: () => void;
}

function TimetableFontComponent(props: TimetableFontComponentProps) {
  const onClick = (): void => {
    props.AddTimetableFontArray()
  }

  return (
    <>
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
            {props.timetableFont.map((timetableFont: template_timetableFont, index: number) => (
              <Track timetableFont={timetableFont} SetTrackArray={props.SetTimetableFontArray} DeleteTimetableFontArray={props.DeleteTimetableFontArray} index={index} key={index} />
            ))}
          </tbody>
          <tfoot>
            <tr className="timetableFontTr">
              <td></td>
              <th></th>
              <td></td>
              <td></td>
              <td></td>
              <td><button onClick={onClick}>追加</button></td>
            </tr>
          </tfoot>
        </table>
      </dd>
    </>
  )
}

type TrackComponentProps = {
  timetableFont: template_timetableFont;
  index: number;
  setTrackProperty: <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P) => void;
  DeleteTimetableFontArray: (index: number) => void;
}

function TrackComponent(props: TrackComponentProps) {
  return (
    <tr className="timetableFontTr" key={props.index}>
      <td><div className="data-logo">{props.index + 1}</div></td>
      <th><TrackElementsHandler timetableFont={props.timetableFont} timetableFontKey="family" SetTrackProperty={props.setTrackProperty} /></th>
      <td><TrackElementsHandler timetableFont={props.timetableFont} timetableFontKey="height" SetTrackProperty={props.setTrackProperty} /></td>
      <td><TrackElementsHandler timetableFont={props.timetableFont} timetableFontKey="bold" SetTrackProperty={props.setTrackProperty} /></td>
      <td><TrackElementsHandler timetableFont={props.timetableFont} timetableFontKey="italic" SetTrackProperty={props.setTrackProperty} /></td>
      <td><TrackDelete index={props.index} DeleteTimetableFontArray={props.DeleteTimetableFontArray} /></td>
    </tr>
  )
}

type timetableFontDeleteProps = {
  index: number;
  DeleteTimetableFontArray: (index: number) => void;
}

function TrackDelete(props: timetableFontDeleteProps) {
  const timetableFontDeleteOnClick: React.MouseEventHandler<HTMLButtonElement> = (() => {
    props.DeleteTimetableFontArray(props.index)
  })

  return (
    <button onClick={timetableFontDeleteOnClick}>削除</button>
  )
}

type TrackProps = {
  timetableFont: template_timetableFont;
  index: number;
  SetTrackArray: (index: number, newValue: template_timetableFont) => void;
  DeleteTimetableFontArray: (index: number) => void;
}

function Track(props: TrackProps) {
  const SetTrackProperty = <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P): void => {
    props.SetTrackArray(props.index, {...props.timetableFont, [key]: property})
  }

  return (
    <TrackComponent timetableFont={props.timetableFont} setTrackProperty={SetTrackProperty} DeleteTimetableFontArray={props.DeleteTimetableFontArray} index={props.index} />
  )
}

type TrackElementsHandlerProps = {
  timetableFont: template_timetableFont;
  timetableFontKey: keyof template_timetableFont;
  SetTrackProperty: <K extends keyof template_timetableFont, P extends template_timetableFont[K]>(key: K, property: P) => void;
  className?: string;
  arrayKey?: number;
}

function TrackElementsHandler(props: TrackElementsHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.timetableFont[props.timetableFontKey] === "string") {
      props.SetTrackProperty(props.timetableFontKey, event.target.value)
    }
    if (typeof props.timetableFont[props.timetableFontKey] === "number") {
      props.SetTrackProperty(props.timetableFontKey, Number(event.target.value))
    }
    if (typeof props.timetableFont[props.timetableFontKey] === "boolean") {
      props.SetTrackProperty(props.timetableFontKey, event.target.checked)
    }
  })

  return (
    <Input value={props.timetableFont[props.timetableFontKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

type TimetableFontProps = {
  displayProperty: template_displayProperty;
  SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function TimetableFont(props: TimetableFontProps) {
  const SetTimetableFontArray = (index: number, newValue: template_timetableFont): void => {
    props.SetDisplayPropertyProp(
      "timetableFont",
      props.displayProperty.timetableFont.map(
        (timetableFont: template_timetableFont, mapIndex: number) => (mapIndex == index ? newValue : timetableFont)
      )
    )
  }

  const DeleteTimetableFontArray = (index: number): void => {
    props.SetDisplayPropertyProp(
      "timetableFont",
      props.displayProperty.timetableFont.filter((timetableFont: template_timetableFont, filterIndex: number) => (index !== filterIndex))
    )
  }

  const AddTimetableFontArray = (): void => {
    props.SetDisplayPropertyProp(
      "timetableFont",
      [...props.displayProperty.timetableFont,
        {
          height: 0,
          family: "",
          bold: false,
          italic: false
        }
      ]
    )
  }

  return (
    <TimetableFontComponent timetableFont={props.displayProperty.timetableFont} SetTimetableFontArray={SetTimetableFontArray} DeleteTimetableFontArray={DeleteTimetableFontArray} AddTimetableFontArray={AddTimetableFontArray} />
  )
}

export default TimetableFont;