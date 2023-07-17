import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { template, template_station, template_outerTerminal, template_track, template_trainType } from "./Entity/Entity"

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
import { Input, IndexListbox } from "./ElementsPresentation"
import Tracks from "./TracksPresentation";
import { promises } from "dns";
import OuterTerminal from "./SetOuterTerminalPresentation";

import { isStation } from "./SharedFunction";
import TrainTypeRepository from "../../TrainTypeRepository";

type KeyOfCustomTimetableStyle = keyof template_station["customTimetableStyle"]

type OnchangeType = React.ChangeEventHandler<HTMLInputElement>


type ComponentProps = {
  trainTypes: template_trainType[];
  trainType: template_trainType;
  directionName: string[];
  stationIndex: number;
  SetTrainTypeIndex: SetterOrUpdater<number>;
  SetTrainTypeProperty: <K extends keyof template_trainType, P extends template_trainType[K]>(key: K, property: P) => void;
}

function Component(props: ComponentProps) {
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
                
              </li>
            </ul>
          </dd>
        </dl>
      </section>
      {/* <nav>
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
      </section> */}
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
    if (typeof props.trainType[props.propKey] === "boolean") {
      props.SetTrainTypeProperty(props.propKey, event.target.checked)
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