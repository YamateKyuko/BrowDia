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

type KeyOfCustomTimetableStyle = keyof template_station["customTimetableStyle"]

type OnchangeType = React.ChangeEventHandler<HTMLInputElement>

type TracksComponentProps = {
  // stations: template_station[];
  outerTerminal: template_outerTerminal[] | null;
  directionName: string[];
  // stationIndex: number;
  // SetStationIndex: SetterOrUpdater<number>;
  SetTracksArray: (index: number, newValue: template_track) => void;
  DeleteTracksArray: (index: number) => void;
  AddTracksArray: () => void;

  nullChange: () => void;
}

function OuterTerminalComponent(props: TracksComponentProps) {
  const onClick = (): void => {
    props.AddTracksArray()
  }

  return (
    <>
      <dt>路線外発着駅</dt>
      <dd>
        <ul>
          {props.outerTerminal &&
            <li>
              <table>
                <thead>
                  <tr className="outerTerminalsTr">
                    <td></td>
                    <th>名称</th>
                    <td>表略</td>
                    <td>有無</td>
                    <td>ﾀﾞｲﾔ略</td>
                    <td>有無</td>
                    <td></td>
                  </tr>
                </thead>
                  <tbody>
                    {props.outerTerminal.map((outerTerminal: template_outerTerminal, index: number) => (
                      <tr className="outerTerminalsTr" key={index}>
                        <td><div className="data-logo">{index}</div></td>
                        <th><input type="text" value={outerTerminal.name} readOnly /></th>
                        <td>{outerTerminal.diagramName ? <input type="text" value={outerTerminal.diagramName} readOnly /> : <div></div>}</td>
                        {/* <td><Checkbox KE="" IN={0} onChange={insted()} /></td> */}
                        <td>{outerTerminal.timetableName ? <input type="text" value={outerTerminal.timetableName} readOnly /> : <div></div>}</td>
                        {/* <td><Checkbox KE="" IN={0} onChange={insted()} /></td> */}
                        <td><button>削除</button></td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="outerTerminalsTr">
                      <td></td>
                      <th></th>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td><button>追加</button></td>
                    </tr>
                  </tfoot>
              </table>
            </li>
          }
          <li>有無<NullHandler outerTerminal={props.outerTerminal} nullChange={props.nullChange} /></li>
          {/* <li>有無<Checkbox IN={null} KE="" onChange={insted()} /></li> */}
        </ul>
      </dd>
    </>
  )
}

type NullHandlerProps = {
  outerTerminal: template_outerTerminal[] | null;
  nullChange: () => void;
}

function NullHandler(props: NullHandlerProps) {
  const onChange = () => {
    props.nullChange()
  }

  return (<Input for="OuterTerminal" value={!!props.outerTerminal} onChange={onChange} />)
}

type TrackComponentProps = {
  track: template_track;
  directionName: string[];
  index: number;
  setTrackProperty: <K extends keyof template_track, P extends template_track[K]>(key: K, property: P) => void;
  DeleteTracksArray: (index: number) => void;
}

function TrackComponent(props: TrackComponentProps) {
  return (
    <tr className="tracksTr" key={props.index}>
      <td><div className="data-logo">{props.index + 1}</div></td>
      <th><TrackElementsHandler track={props.track} trackKey="name" SetTrackProperty={props.setTrackProperty} /></th>
      {props.directionName.map((directionName: string, index: number) => (
        <td key={index}><TrackArrayElementsHandler track={props.track} trackKey="abbrName" SetTrackProperty={props.setTrackProperty} index={index} /></td>
      ))}
      {/* <td><input type="text" value={props.track.abbrName[0]} readOnly /></td>
      <td><input type="text" value={props.track.abbrName[1]} readOnly /></td> */}
      <td><TrackDelete index={props.index} DeleteTracksArray={props.DeleteTracksArray} /></td>
    </tr>
  )
}

type trackDeleteProps = {
  index: number;
  DeleteTracksArray: (index: number) => void;
}

function TrackDelete(props: trackDeleteProps) {
  const trackDeleteOnClick: React.MouseEventHandler<HTMLButtonElement> = (() => {
    props.DeleteTracksArray(props.index)
  })

  return (
    <button onClick={trackDeleteOnClick}>削除</button>
  )
}

type TrackProps = {
  track: template_track;
  directionName: string[];
  index: number;
  SetTrackArray: (index: number, newValue: template_track) => void;
  DeleteTracksArray: (index: number) => void;
}

function Track(props: TrackProps) {
  const SetTrackProperty = <K extends keyof template_track, P extends template_track[K]>(key: K, property: P): void => {
    props.SetTrackArray(props.index, {...props.track, [key]: property})
  }

  return (
    <TrackComponent track={props.track} directionName={props.directionName} setTrackProperty={SetTrackProperty} DeleteTracksArray={props.DeleteTracksArray} index={props.index} />
  )
}

type TrackElementsHandlerProps = {
  track: template_track;
  trackKey: keyof template_track;
  SetTrackProperty: <K extends keyof template_track, P extends template_track[K]>(key: K, property: P) => void;
  className?: string;
  arrayKey?: number;
}

function TrackElementsHandler(props: TrackElementsHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.track[props.trackKey] === "string") {
      props.SetTrackProperty(props.trackKey, event.target.value)
    }
  })

  return (
    <Input for={props.trackKey} value={props.track[props.trackKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

type TrackArrayElementsHandlerProps = {
  track: template_track;
  trackKey: keyof template_track;
  index: number;
  SetTrackProperty: <K extends keyof template_track, P extends template_track[K]>(key: K, property: P) => void;
  className?: string;
}

function TrackArrayElementsHandler(props: TrackArrayElementsHandlerProps) {
  const property: template_track[keyof template_track] = props.track[props.trackKey]
  if (Array.isArray(property)) {
    const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof props.track[props.trackKey][props.index] === "string") {
        props.SetTrackProperty(props.trackKey, property.map((value: string, mapIndex: number) => (mapIndex == props.index ? event.target.value : value)))
      }
    })

    return (
      <Input for={props.trackKey} value={props.track[props.trackKey][props.index]} onChange={onChange} className={props.className ? props.className : ""} />
    )
  }
  return (<>Error</>)
}

type TracksProps = {
  station: template_station;
  directionName: string[];
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function OuterTerminal(props: TracksProps) {
  // const SetTracksProperty = ((key: keyof template_station["tracks"], property) => {
  //   props.SetStationProperty("tracks", (prevState: template_station) => {...prevState, key: property})
  // })

  // const SetTracksArray = <K extends keyof template_station["tracks"], P extends template_station["tracks"][K]>(key: K, property: P): void => {
    
  //   props.SetStationProperty("tracks", (prev: template_station["tracks"]) => ({...prev, [key]: property}))
  // }
  

  const SetTracksArray = (index: number, newValue: template_track): void => {
    props.SetStationProperty(
      "tracks",
      props.station.tracks.map((track: template_track, mapIndex: number) => (mapIndex == index ? newValue : track))
    )
  }

  const DeleteTrackArray = (index: number): void => {
    props.SetStationProperty(
      "tracks",
      props.station.tracks.filter((track: template_track, filterIndex: number) => (index !== filterIndex))
    )
  }

  const AddTrackArray = (): void => {
    props.SetStationProperty(
      "tracks",
      [...props.station.tracks,
        {
          name: "",
          abbrName: ["", ""]
        }
      ]
    )
  }

  const nullChange = (): void => {
    props.SetStationProperty(
      "outerTerminal",
      props.station.outerTerminal ? null : []
    )
  }
 
  return (
    <OuterTerminalComponent outerTerminal={props.station.outerTerminal} directionName={props.directionName} SetTracksArray={SetTracksArray} DeleteTracksArray={DeleteTrackArray} AddTracksArray={AddTrackArray} nullChange={nullChange} />
  )
}

export default OuterTerminal;