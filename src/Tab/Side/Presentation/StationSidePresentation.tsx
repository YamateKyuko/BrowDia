import './../../css/Element.css';
import './../../css/Set.css';
import { template_station, template__data, template_track } from '../../../Entity/Entity';

import {
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater
} from 'recoil';

import _dataRepository from '../../../Repository/_dataRepository';
import { BooleanInput, Track } from '../../Presentation/ElementsPresentation';
import StationRepository from '../../../Repository/StationRepository';

type ComponentProps = {
  _data: template__data | null;
  Station: template_station;
  Set_data: SetterOrUpdater<template__data | null>;
}

function Component(props: ComponentProps) {

  return (
        <ul>
          <li>
            null
            <NullChange _data={props._data} Set_data={props.Set_data} />
          </li>
          {props._data &&
            <Station _data={props._data} Station={props.Station} Set_data={props.Set_data} />
          }
        </ul>
  );
}

type StationProps = {
  _data: template__data;
  Station: template_station;
  Set_data: SetterOrUpdater<template__data | null>;
}

function Station(props: StationProps) {
  const stopTypeName: string[] = ["…", "○", "⇂"]
  return (
    <>
      <li>
        停車
        <div className="flexButton">
          {stopTypeName.map((value: string, index: number) => (
            <StopTypeInput value={props._data.stopType === index} buttonValue={value} Set_data={props.Set_data} index={index} key={index} />
          ))}
        </div>
      </li>
      <li>
        到着

      </li>
      <li>
        発車
      </li>
      <li>
        番線
        <TrackHandler tracks={props.Station.tracks} value={props._data.track} Set_data={props.Set_data} />
      </li>
    </>
  )
}

type TrackHandlerProps = {
  tracks: template_track[];
  value: number;
  Set_data: SetterOrUpdater<template__data | null>;
}

function TrackHandler(props: TrackHandlerProps) {
  const set = (index: number): void => {
    props.Set_data(
      (prevState: template__data | null) => (
        prevState && {...prevState, track: index}
      )
    )
  }

  return (
    <Track tracks={props.tracks} value={props.value} set={set} />
  )
}

type StopTypeInputProps = {
  value: boolean;
  buttonValue: string;
  Set_data: SetterOrUpdater<template__data | null>;
  index: number;

}

function StopTypeInput(props: StopTypeInputProps) {
  const set = () => {
    props.Set_data(
      (prevState: template__data | null) => (
        prevState && {...prevState, stopType: props.index}
      )
    )
  }

  return (
    <BooleanInput value={props.value} set={set} label={<button>{props.buttonValue}</button>} />
    // <Input value={true} onChange={onChange} label={
    //   <button>{props.value}</button>
    // } />
  )
}

type NullChangeProps = {
  _data: template__data | null;
  Set_data: SetterOrUpdater<template__data | null>;
}

function NullChange(props: NullChangeProps) {
  const set = () => {
    props._data !== null
      ? props.Set_data(null)
      : props.Set_data({
        stopType: 1,
        arrival: null,
        departure: null,
        track: 0,
      })
  }

  return (
    <BooleanInput value={!props._data} set={set} />
  )
}

function Side() {
  const [_data, Set_data] = useRecoilState<template__data | null>(_dataRepository()._data)

  const Station = useRecoilValue<template_station>(StationRepository().Station)

  return (
    <Component
      _data={_data}
      Station={Station}
      Set_data={Set_data}
      
    />
  )
}

export default Side;