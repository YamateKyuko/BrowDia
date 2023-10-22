import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_customTimetableStyle, template_station, template_timetable, template_timetableStyle, template_track } from '../../../Entity/Entity'

import {
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater
} from 'recoil';

import Infrastructure from '../../../Infrastructure/Infrastructure';
import StationRepository from '../../../Repository/StationRepository';
import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import CustomTimetableStyle from './CustomTimetablePresentation';
import { BooleanInput, IndexListbox, StringInput, Track } from '../../Presentation/ElementsPresentation'
import Tracks from './TracksPresentation';
import OuterTerminal from './SetOuterTerminalPresentation';
import { type } from 'os';

type KeyOfTimetableStyle = keyof template_timetableStyle
type KeyOfCustomTimetableStyle = keyof template_customTimetableStyle

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
    <>
      <aside>
        <StationIndexHandler stations={props.stations} stationIndex={props.stationIndex} setStationIndex={props.SetStationIndex} />
      </aside>
      <section>
        <h2 data-logo={props.stationIndex + 1}>
          <StringStationPropHandler stationKey="name" value={props.station.name} SetStationProperty={props.SetStationProperty} className={props.station.isMain ? "bold" : ""} />
        </h2>
        <dl>
          <dt>
            一般
          </dt>
          <dd>
            <ul>
              <li>
                略称
                <StringStationPropHandler stationKey="abbrName" value={props.station.abbrName} SetStationProperty={props.SetStationProperty} />
              </li>
              <li>
                主要駅
                <BooleanStationPropHandler stationKey="isMain" value={props.station.isMain} SetStationProperty={props.SetStationProperty} />
              </li>
              <li>
                下線
                <BooleanStationPropHandler stationKey="border" value={props.station.border} SetStationProperty={props.SetStationProperty} />
              </li>
              <li>
                ダイヤ番線表示
                <BooleanStationPropHandler stationKey="visibleDiagramTrack" value={props.station.visibleDiagramTrack} SetStationProperty={props.SetStationProperty} />
              </li>
              <TimetableStyle
                station={props.station}
                directionName={props.directionName}
                SetStationProperty={props.SetStationProperty}
              />
              <li>
                <table>
                  <thead>
                    <tr><th></th><td>駅</td><td>有無</td></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>支線分岐駅</th>
                      <CanNullStationPropStationIndexHandler stations={props.stations} station={props.station} propKey="brunchCoreStationIndex" SetStationProperty={props.SetStationProperty} />
                    </tr>
                    <tr>
                      <th>環状線開始駅</th>
                      <CanNullStationPropStationIndexHandler stations={props.stations} station={props.station} propKey="loopOriginStationIndex" SetStationProperty={props.SetStationProperty} />
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
                <li key={index}>
                  {directionName}本線

                  {/* <details> */}
                    {/* <summary data-logo={index + 1}>{props.station.tracks.length > props.station.mainTrack[index] ? props.station.tracks[props.station.mainTrack[index]].name : "不正な値"}</summary> */}
                    <MainTrackHandler index={index} setStationProperty={props.SetStationProperty} mainTrack={props.station.mainTrack} tracks={props.station.tracks} />
                  {/* </details> */}
                </li>
              ))}
            </ul>
          </dd>
          <dt>
            <button>削除</button>
          </dt>
        </dl>
      </section>
    </>
  );
}

type TimetableStyleProps = {
  station: template_station;
  directionName: string[];
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function TimetableStyle(props: TimetableStyleProps) {
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
            {(Object.keys(props.station.timetableStyle) as [keyof template_timetableStyle]).map((propertyKey: keyof template_timetableStyle, propertyIndex: number) => (
              <tr className={propertyKey} key={propertyIndex}>
                <th>
                  {propertyKey == "arrival" && "到着"}
                  {propertyKey == "departure" && "発車"}
                </th>
                {props.station.customTimetableStyle[propertyKey].map((arrayElement: boolean, arrayIndex: number) => (
                  <td key={arrayIndex}>
                    <TimetableStyleInput station={props.station} PropertyKey={propertyKey} ArrayIndex={arrayIndex} SetStationProperty={props.SetStationProperty} />
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

type TimetableStyleInputProps = {
  station: template_station;
  PropertyKey: keyof template_timetableStyle;
  ArrayIndex: number;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function TimetableStyleInput(props: TimetableStyleInputProps) {
  const set = () => {
    props.SetStationProperty(
      "timetableStyle",
        {...props.station.customTimetableStyle,
        [props.PropertyKey]: props.station.customTimetableStyle[props.PropertyKey].map((property: boolean, index: number) => (props.ArrayIndex == index ? !property : property))}
    )
  }

  return (
    <>
      <BooleanInput value={props.station.customTimetableStyle[props.PropertyKey][props.ArrayIndex]} set={set} />
    </>
  )
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
      <td>
        {typeof selectedIndex == "number" ?
          <details>
            <summary data-logo={selectedIndex + 1}>{props.stations[selectedIndex].name}</summary>
            <IndexListbox values={props.stations} selectedIndex={selectedIndex} set={set} />
          </details>
        :
          <StringInput value={""} set={() => {}} disabled={true} />
        }
      </td>
      <td><BooleanInput value={props.station[props.propKey] !== null} set={nullOnChange}/></td>
    </>
  )
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
    console.log(value)
    props.setStationProperty(
      "mainTrack",
      props.mainTrack.map((mainTrack: number, mapIndex: number) => (
        props.index == mapIndex ? value : mainTrack
      ))
    )
  }

  return (<Track tracks={props.tracks} value={props.mainTrack[props.index]} set={set} />)
}

type StringStationPropHandlerProps = {
  stationKey: keyof template_station;
  value: string;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
  className?: string;
}

function StringStationPropHandler(props: StringStationPropHandlerProps) {
  const set = (value: string) => {
    props.SetStationProperty(props.stationKey, value)
  }

  return (
    <StringInput value={props.value} set={set} className={props.className ? props.className : ""} />
  )
}

type BooleanStationPropHandlerProps = {
  stationKey: keyof template_station;
  value: boolean;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
  className?: string;
}

function BooleanStationPropHandler(props: BooleanStationPropHandlerProps) {
  const set = (value: boolean) => {
    props.SetStationProperty(props.stationKey, !props.value)
  }

  return (
    <BooleanInput value={props.value} set={set} className={props.className ? props.className : ""} />
  )
}

function SetStationPresentation() {
  const [stationIndex, SetStationIndex] = useRecoilState(Infrastructure().StationIndex)

  const Stations: template_station[] = useRecoilValue(StationRepository().Stations);
  const [Station, SetStation]: [template_station, SetterOrUpdater<template_station>] = useRecoilState(StationRepository().Station);

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