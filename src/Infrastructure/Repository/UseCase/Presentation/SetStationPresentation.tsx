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
  const insted: any = (() => {return("")})

  return (
    <section>
      <nav>
        <StationIndexHandler stations={props.stations} stationIndex={props.stationIndex} setStationIndex={props.SetStationIndex} />
      </nav>
      <article>
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
                    <tr>
                      <th>支線分岐駅</th>
                      <td>
                      <StationElementsHandler station={props.station} stationKey="brunchCoreStationIndex" SetStationProperty={props.SetStationProperty} />
                        <details>
                          <summary></summary>
                          <select size={4} required>
                            {props.stations.map((station: template_station, index: number) => (
                              <option data-logo={index + 1} className={`${station.border ? "border" : ""} ${index == 0 ? "start" : ""} ${station.isMain ? "bold" : ""} `} key={index}>
                                {station.name}
                              </option>
                            ))}
                          </select>
                        </details>
                      </td>
                      <td><Checkbox IN={null} KE="" onChange={insted()} /></td>
                    </tr>
                    <tr>
                      <th>環状線開始駅</th>
                      <td>
                        <details>
                          <summary></summary>
                          <select size={4} required>
                            {props.stations.map((station: template_station, index: number) => (
                              <option data-logo={index + 1} className={`${station.border ? "border" : ""} ${index == 0 ? "start" : ""} ${station.isMain ? "bold" : ""} `} key={index}>
                                {station.name}
                              </option>
                            ))}
                          </select>
                        </details>
                      </td>
                      <td><Checkbox IN={null} KE="" onChange={insted()} /></td>
                    </tr>
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
                <li className="mainTrackLi" key={index}>
                  {directionName}本線
                  <details>
                    <summary>{props.station.tracks.length > props.station.mainTrack[index] ? props.station.tracks[props.station.mainTrack[index]].name : "不正な値"}</summary>
                    <MainTrackHandler index={index} setStationProperty={props.SetStationProperty} mainTrack={props.station.mainTrack} tracks={props.station.tracks} />
                  </details>
                </li>
              ))}
              {/* <StationElementsHandler station={props.station} stationKey="customTimetableStyle" SetStationProperty={props.SetStationProperty} /> */}
              {/* <StationElementsHandler station={props.station} stationKey="brunchCoreStationIndex" SetStationProperty={props.SetStationProperty} /> */}
            </ul>
          </dd>
          <dt>
            <button>削除</button>
          </dt>
        </dl>
      </article>
    </section>
  );
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
      <Input for={props.PropertyKey + props.ArrayIndex} value={props.station.customTimetableStyle[props.PropertyKey][props.ArrayIndex]} onChange={SetCustomTimetableStyle} />
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

  return (<IndexListbox for="stationIndex" values={props.stations} selectedIndex={props.stationIndex} set={set} />)
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

  return (<IndexListbox for={"mainTrack" + props.index} values={props.tracks} selectedIndex={props.mainTrack[props.index]} set={set} />)
}

type IndexListboxProps = {
  for: string;
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
        <IndexListboxHandler selectedIndex={props.selectedIndex} set={props.set} for={props.for} index={index} label={value.name} className={className(value, index)} key={index} />
      ))}
    </fieldset>
  )
}

type IndexListboxHandlerProps = {
  index: number;
  for: string;
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
    <Input for={props.for + props.index} value={props.selectedIndex == props.index} onChange={onChange} label={props.label} dataLogo={props.index + 1} className={props.className} />
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
    <Input for={props.stationKey} value={props.station[props.stationKey]} onChange={onChange} className={props.className ? props.className : ""} />
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

// const Radio = ({name, index}: {name: string; index: number; event: (event: React.MouseEvent<HTMLInputElement>) => void;}) => {
//   return (
//     <>
//       <input type="radio" id={name + index} name={name} />
//       <label className="radio" htmlFor={name + index} />
//     </>
//   )
// }

// type SetStationPresentationProps = {}
// props: SetStationPresentationProps

function SetStationPresentation() {
  const [stationIndex, SetStationIndex] = useRecoilState(Infrastructure().StationIndex)

  const Stations: template_station[] = useRecoilValue(StationRepository().Stations);
  const [Station, SetStation]: [template_station, SetterOrUpdater<template_station>] = useRecoilState(StationRepository().Station(stationIndex));

  const DirectionName: string[] = useRecoilValue(DirectionNameRepository().DirectionNameSelector); 

  const Atom: template = useRecoilValue(Infrastructure().Atom);
  console.log(Atom)

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