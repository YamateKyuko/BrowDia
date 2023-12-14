import React from 'react';
import { IndexListbox, NavMolecule } from '../../Presentation/ElementsPresentation';
import { template_diagram, navArray, template_stationTimetable_data, template_station } from '../../../Entity/Entity';
import Infrastructure from '../../../Infrastructure/Infrastructure';

import {
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater
} from 'recoil';
import DiagramRepository from '../../../Repository/DiagramRepositpry';
import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import Side from '../../Side/Presentation/SidePresentation';
import StationTimetableUseCase from '../UseCase/StationTimetableUseCase';
import StationRepository from '../../../Repository/StationRepository';

type ComponentProps = {
  diagrams: template_diagram[];
  diagramIndex: number;
  SetDiagramIndex: SetterOrUpdater<number>;
  directionIndex: number;
  stationIndex: number;
  SetStationIndex: SetterOrUpdater<number>;
  SetDirectionIndex: SetterOrUpdater<number>;
  stationTimetableType: number;
  SetStationTimetableType: SetterOrUpdater<number>;
  directionName: string[];
  stations: template_station[];
  stationTimetableSide: number[];
  stationTimetable: template_stationTimetable_data[][];
}

function Component(props: ComponentProps) {
  const stationTimetableType = ["一般", "種別別"]
  const diagramNavArray: navArray[] = props.diagrams.map((value: template_diagram) => {
    return {label: <>{value.name}</>, component: <></>}
  })
  const directionNavArray: navArray[] = props.directionName.map((value: string) => {
    return {label: <>{value}</>, component:  <></>}
  })
  const stationTimetableTypeNavArray: navArray[] = stationTimetableType.map((value: string) => {
    return {label: <>{value}</>, component:  <></>}
  })

  return (
    <>
      <NavMolecule navIndex={props.diagramIndex} SetNavIndex={props.SetDiagramIndex} value={diagramNavArray} />
      <article>
        <StationIndexHandler stations={props.stations} stationIndex={props.stationIndex} setStationIndex={props.SetStationIndex} />
        <section>
          <NavMolecule navIndex={props.directionIndex} SetNavIndex={props.SetDirectionIndex} value={directionNavArray} />
          <NavMolecule navIndex={props.stationTimetableType} SetNavIndex={props.SetStationTimetableType} value={stationTimetableTypeNavArray} />
          <figure className="stationTimetable">
            <div className="stationTimetable">
              <caption>
                {props.diagrams[props.diagramIndex].name}
              </caption>
              <table>
                <colgroup>
                  <col className="time" />
                  <col className="table" />
                </colgroup>
                <thead>
                  <tr>
                    <th>時</th>
                    <th>{props.directionName[props.directionIndex]}</th>
                  </tr>
                </thead>
                <tbody>
                  {props.stationTimetableSide.map((value: number, index: number) => (
                    <tr key={index}>
                      <th className="">{value}</th>
                      {props.stationTimetable[index].map((stationTimetable_data: template_stationTimetable_data) => (
                        <td
                          style={{
                            backgroundColor: stationTimetable_data.backgroundColor,
                            color: stationTimetable_data.color
                          }}
                          data-type={stationTimetable_data.traintype}
                          data-terminal={stationTimetable_data.terminalStation}
                          data-value={stationTimetable_data.value}
                        >
                          {stationTimetable_data.value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </figure>
        </section>
        <Side />
      </article>
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

  return (<aside><IndexListbox values={props.stations} selectedIndex={props.stationIndex} set={set} /></aside>)
}

function StationTimetable() {
  const [diagramIndex, SetDiagramIndex] = useRecoilState<number>(Infrastructure().DiagramIndex);
  const [stationIndex, SetStationIndex] = useRecoilState<number>(Infrastructure().StationIndex);
  const [directionIndex, SetDirectionIndex] = useRecoilState<number>(Infrastructure().DirectionIndex);
  const diagrams = useRecoilValue<template_diagram[]>(DiagramRepository().Diagrams);
  const directionName = useRecoilValue<string[]>(DirectionNameRepository().DirectionNameSelector);
  const stations = useRecoilValue<template_station[]>(StationRepository().Stations);
  const [stationTimetableType, SetStationTimetableType] = useRecoilState<number>(Infrastructure().stationTimetableType);

  const stationTimetableSide = useRecoilValue<number[]>(StationTimetableUseCase().stationTimetableSide);

  const stationTimetable = useRecoilValue<template_stationTimetable_data[][]>(StationTimetableUseCase().stationTimetable);
  console.log(stationTimetable)


  return (
    <Component
      diagrams={diagrams}
      diagramIndex={diagramIndex}
      SetDiagramIndex={SetDiagramIndex}
      stationIndex={stationIndex}
      SetStationIndex={SetStationIndex}
      directionIndex={directionIndex}
      SetDirectionIndex={SetDirectionIndex}
      stationTimetableType={stationTimetableType}
      SetStationTimetableType={SetStationTimetableType}
      directionName={directionName}
      stations={stations}
      stationTimetableSide={stationTimetableSide}
      stationTimetable={stationTimetable}
    />
  )
}

export default StationTimetable;