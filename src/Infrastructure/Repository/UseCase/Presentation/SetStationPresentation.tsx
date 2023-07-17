import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { template, template_station, template_outerTerminal, template_track } from "./Entity/Entity"

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

type KeyOfCustomTimetableStyle = keyof template_station["customTimetableStyle"]

type OnchangeType = React.ChangeEventHandler<HTMLInputElement>

type ComponentProps = {
  stations: template_station[];
  station: template_station;
  directionName: string[];
  stationIndex: number;
  SetStationIndex: SetterOrUpdater<number>;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function Component(props: ComponentProps) {
  return (
    <article>
      <nav>
        <StationIndexHandler stations={props.stations} stationIndex={props.stationIndex} setStationIndex={props.SetStationIndex} />
      </nav>
      <section>
        <dl>
          <dt data-logo={props.stationIndex + 1} className="">
            <StationElementsHandler station={props.station} stationKey="name" SetStationProperty={props.SetStationProperty} className={props.station.isMain ? "bold" : ""} />
          </dt>
          <dd>
            <ul>
              <li>
                略称
                <StationElementsHandler station={props.station} stationKey="abbrName" SetStationProperty={props.SetStationProperty} />
              </li>
              <li>
                主要駅
                <StationElementsHandler station={props.station} stationKey="isMain" SetStationProperty={props.SetStationProperty} />
              </li>
              <li>
                下線
                <StationElementsHandler station={props.station} stationKey="border" SetStationProperty={props.SetStationProperty} />
              </li>
              <li>
                ダイヤ番線表示
                <StationElementsHandler station={props.station} stationKey="visibleDiagramTrack" SetStationProperty={props.SetStationProperty} />
              </li>
              <li>
                <table>
                  <thead>
                    <tr><th></th><td>駅</td><td>有無</td></tr>
                  </thead>
                  <tbody>
                    <CanNullStationPropStationIndexHandler stations={props.stations} station={props.station} propKey="brunchCoreStationIndex" SetStationProperty={props.SetStationProperty} />
                    <CanNullStationPropStationIndexHandler stations={props.stations} station={props.station} propKey="loopOriginStationIndex" SetStationProperty={props.SetStationProperty} />
                  </tbody>
                </table>
              </li>
              
            </ul>
          </dd>
          <CustomTimetableStyle
            station={props.station}
            directionName={props.directionName}
            SetStationProperty={props.SetStationProperty}
          />
          <OuterTerminal
            station={props.station}
            directionName={props.directionName}
            SetStationProperty={props.SetStationProperty}
          />
          <Tracks
            station={props.station}
            directionName={props.directionName}
            SetStationProperty={props.SetStationProperty}
          />
          <dt>本線</dt>
          <dd>
            <ul>
              {props.directionName.map((directionName: string, index: number) => (
                <li key={index}>
                  {directionName}本線
                  <details>
                    <summary data-logo={index + 1}>{props.station.tracks.length > props.station.mainTrack[index] ? props.station.tracks[props.station.mainTrack[index]].name : "不正な値"}</summary>
                    <MainTrackHandler index={index} setStationProperty={props.SetStationProperty} mainTrack={props.station.mainTrack} tracks={props.station.tracks} />
                  </details>
                </li>
              ))}
            </ul>
          </dd>
          <dt>
            <button>削除</button>
          </dt>
        </dl>
      </section>
    </article>
  );
}

type CanNullStationPropStationIndexHandlerProps = {
  stations: template_station[];
  station: template_station;
  propKey: keyof template_station;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function CanNullStationPropStationIndexHandler(props: CanNullStationPropStationIndexHandlerProps) {
  const set = (index: number): void => {
    props.SetStationProperty(props.propKey, index)
  }

  const nullOnChange = () => {
    if (props.station[props.propKey] === null) {props.SetStationProperty(props.propKey, 0)}
    if (props.station[props.propKey] !== null) {props.SetStationProperty(props.propKey, null)}
  }

  const selectedIndex: template_station[keyof template_station] = props.station[props.propKey]

  return (
    <>
      <tr>
        <th>支線分岐駅</th>
        <td>
          {typeof selectedIndex == "number" ?
            <details>
              <summary data-logo={selectedIndex + 1}>{props.stations[selectedIndex].name}</summary>
              <IndexListbox values={props.stations} selectedIndex={selectedIndex} set={set} />
            </details>
          :
            <Input value={""} onChange={() => {}} disabled={true} />
          }
        </td>
        {/* <td></td> */}
        <td><Input value={props.station[props.propKey] !== null} onChange={nullOnChange}/></td>
      </tr>
      {/* <td>
        
      </td>
      <td><Input value={props.outerTerminal[props.propertyKey] !== null} onChange={nullOnChange}/></td> */}
    </>
  )
}

type CustomTimetableStyleProps = {
  station: template_station;
  directionName: string[];
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function CustomTimetableStyle(props: CustomTimetableStyleProps) {
  return (
    <>
      <dt>時刻表表示</dt>
      <dd>
        <table>
          <thead>
            <tr>
              <th></th>
              {props.directionName.map((directionName: string, index: number) => (
                <td key={index}>{directionName}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {(Object.keys(props.station.customTimetableStyle) as KeyOfCustomTimetableStyle[]).map((propertyKey: KeyOfCustomTimetableStyle, propertyIndex: number) => (
              <tr className={propertyKey} key={propertyIndex}>
                <th>
                  {propertyKey == "arrival" && "到着"}
                  {propertyKey == "departure" && "発車"}
                  {propertyKey == "trainNumber" && "号数"}
                  {propertyKey == "operationNumber" && "列車番号"}
                  {propertyKey == "trainType" && "種別"}
                  {propertyKey == "trainName" && "名称"}
                </th>
                {props.station.customTimetableStyle[propertyKey].map((arrayElement: boolean, arrayIndex: number) => (
                  <td key={arrayIndex}>
                    <CustomTimetableStyleInput station={props.station} PropertyKey={propertyKey} ArrayIndex={arrayIndex} SetStationProperty={props.SetStationProperty} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </dd>
    </>
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

function isStation(value: template_station | template_track): value is template_station {
  return "customTimetableStyle" in value;
}

type stationIndexHandlerProps = {
  stations: template_station[];
  stationIndex: number;
  setStationIndex: SetterOrUpdater<number>;
}

function StationIndexHandler(props: stationIndexHandlerProps) {
  const set = (index: number): void => {
    props.setStationIndex(index)
  }

  return (<IndexListbox values={props.stations} selectedIndex={props.stationIndex} set={set} />)
}

type MainTrackHandlerProps = {
  index: number;
  setStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
  mainTrack: number[];
  tracks: template_track[];
}

function MainTrackHandler(props: MainTrackHandlerProps) {
  const set = (value: number): void => {
    props.setStationProperty("mainTrack", props.mainTrack.map((mainTrack: number, mapIndex: number) => (props.index == mapIndex ? value : mainTrack)))
  }

  return (<IndexListbox values={props.tracks} selectedIndex={props.mainTrack[props.index]} set={set} />)
}

type IndexListboxProps = {
  values: template_station[] | template_track[];
  selectedIndex: number;
  set: (index: number) => void;
}

function IndexListbox(props: IndexListboxProps) {
  const className = (value: template_station | template_track, index: number): string => {
    if (isStation(value)) {
      return `${!value.border && (index == props.values.length && "line")} ${value.brunchCoreStationIndex && "gray"}`
    }
    return "";
  }

  return (
    <fieldset>
      {props.values.map((value: template_station | template_track, index: number) => (
        <IndexListboxHandler selectedIndex={props.selectedIndex} set={props.set} index={index} label={value.name} className={className(value, index)} key={index} />
      ))}
    </fieldset>
  )
}

type IndexListboxHandlerProps = {
  index: number;
  selectedIndex: number;
  set: (index: number) => void;
  label: string;
  className?: string;
}

function IndexListboxHandler(props: IndexListboxHandlerProps) {
  const onChange = (): void => {
    props.set(props.index)
  }

  return (
    <Input value={props.selectedIndex == props.index} onChange={onChange} label={props.label} dataLogo={props.index + 1} className={props.className} />
  )
}

type StationElementsHundlerProps = {
  station: template_station;
  stationKey: keyof template_station;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
  className?: string;
}

function StationElementsHandler(props: StationElementsHundlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.station[props.stationKey] === "string") {
      props.SetStationProperty(props.stationKey, event.target.value)
    }
    if (typeof props.station[props.stationKey] === "boolean") {
      props.SetStationProperty(props.stationKey, event.target.checked)
    }
  })

  return (
    <Input value={props.station[props.stationKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

function SetStationPresentation() {
  const [stationIndex, SetStationIndex] = useRecoilState(Infrastructure().StationIndex)

  const Stations: template_station[] = useRecoilValue(StationRepository().Stations);
  const [Station, SetStation]: [template_station, SetterOrUpdater<template_station>] = useRecoilState(StationRepository().Station(stationIndex));

  const DirectionName: string[] = useRecoilValue(DirectionNameRepository().DirectionNameSelector); 

  const Atom: template = useRecoilValue(Infrastructure().Atom);

  const SetStationProperty = <K extends keyof template_station, P extends template_station[K]>(key: K, property: P): void => {
    SetStation((prev: template_station) => ({...prev, [key]: property}))
  }

  return (
    <Component
      stations={Stations}
      station={Station}
      stationIndex={stationIndex}
      SetStationIndex={SetStationIndex}
      directionName={DirectionName}
      SetStationProperty={SetStationProperty}
    />
  )
}

export default SetStationPresentation;