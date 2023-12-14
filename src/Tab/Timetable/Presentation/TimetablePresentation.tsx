import React from 'react';
import './../../css/Element.css';
import './../../css/Set.css';
import { navArray, template_diagram, template_timetableSide, template_displayProperty, template_timetableCell } from '../../../Entity/Entity';
import DisplayPropertyRepository from '../../../Repository/DisplayPropertyRepository';

import {
  useRecoilState,
  useRecoilValue, 
  SetterOrUpdater
} from 'recoil';

import Infrastructure from '../../../Infrastructure/Infrastructure';
import { NavMolecule } from '../../Presentation/ElementsPresentation';
import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import Side from '../../Side/Presentation/SidePresentation';
import DiagramRepository from '../../../Repository/DiagramRepositpry';
import TimetableUseCase from '../Usecase/TimetableUseCase';
import { RgbConverter, SVGClickPoint } from '../../Presentation/SharedFunction';

type ComponentProps = {
  diagrams: template_diagram[];
  directionName: string[];
  timetableSide: template_timetableSide[];
  fontSize: number;
  displayProperty: template_displayProperty;
  timetableCells: template_timetableCell[][];

  StationIndex: number;
  TrainIndex: number;

  SetStationIndex: SetterOrUpdater<number>;
  SetTrainIndex: SetterOrUpdater<number>;
}

function Component(props: ComponentProps) {
  const [X, SetX] = React.useState<number>(0);
  const [Y, SetY] = React.useState<number>(0);

  const [directionIndex, SetDirectionIndex] = useRecoilState<number>(Infrastructure().DirectionIndex);
  const [diagramIndex, SetDiagramIndex] = useRecoilState<number>(Infrastructure().DiagramIndex);

  const diagramNavArray: navArray[] = props.diagrams.map((value: template_diagram) => {
    return {label: <>{value.name}</>, component: <></>}
  })
  const directionNavArray: navArray[] = props.directionName.map((value: string) => {
    return {label: <>{value}</>, component:  <></>}
  })

  const cellWidth = props.displayProperty.timetableTrainWidth * props.fontSize / 2;
  const cellHeight = props.fontSize;

  const SVGWidth = cellWidth * props.timetableCells.length
  const SVGHeight = cellHeight * props.timetableSide.length


  const SVGOnClick: React.MouseEventHandler<SVGSVGElement> = (event) => {
    const clickPoint: DOMPoint = SVGClickPoint(event)
    if (directionIndex === 0) {
      props.SetStationIndex(Math.floor(clickPoint.y / cellHeight))
      props.SetTrainIndex(Math.floor(clickPoint.x / cellWidth))
    } else {
      props.SetStationIndex(Math.floor((SVGHeight - clickPoint.y) / cellHeight))
      props.SetTrainIndex(Math.floor(clickPoint.x / cellWidth))
    }

    SetX(clickPoint.x)
    SetY(clickPoint.y)
  }

  return (
    <>
      <NavMolecule navIndex={diagramIndex} SetNavIndex={SetDiagramIndex} value={diagramNavArray} />
      <article>
        <section>
          <NavMolecule navIndex={directionIndex} SetNavIndex={SetDirectionIndex} value={directionNavArray} />
          <figure>
            <div className="timetableStation">
              <svg
                width={props.displayProperty.stationNameLength * props.fontSize}
                viewBox={`0 0 ${props.displayProperty.stationNameLength * props.fontSize} ${SVGHeight}`}
              >
                <TimetableSide timetableSide={props.timetableSide} displayProperty={props.displayProperty} fontSize={props.fontSize} />
              </svg>
            </div>
            <div className="timetabeTimetable">
              <svg
                width={SVGWidth}
                viewBox={`0 0 ${SVGWidth} ${SVGHeight}`}
                onClick={SVGOnClick}
              >
                <TimetableCells
                  timetableCells={props.timetableCells}
                  cellWidth={cellWidth}
                  cellHeight={cellHeight}
                  fontsize={props.fontSize}
                />

                {/* 縦軸 */}
                <TimetableVerticalAxis
                  cellWidth={cellWidth}
                  SVGHeight={SVGHeight}
                  length={props.timetableCells.length}
                  fill={RgbConverter(props.displayProperty.diagramAxisColor)}
                />

                {/* クリック位置 */}
                <rect
                  x={X - (X % cellWidth)}
                  y={Y - (Y % cellHeight)}
                  width={cellWidth}
                  height={cellHeight}
                  stroke="black"
                  fill="none"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </figure>
        </section>
        <Side />
      </article>
    </>
    
  );
}

type TimetableCellsProps = {
  timetableCells: template_timetableCell[][];
  cellWidth: number;
  cellHeight: number;
  fontsize: number;
}

function TimetableCells(props: TimetableCellsProps) {
  return (
    <g>
      {props.timetableCells.map((timetablecolumn: template_timetableCell[], index: number) => (
        <TimetableColumn
          timetableColumn={timetablecolumn}
          index={index}
          fontsize={props.fontsize}
          cellWidth={props.cellWidth}
          cellHeight={props.cellHeight}
        />
      ))}
    </g>
  )
}

type TimeTableColumnProps = {
  timetableColumn: template_timetableCell[];
  index: number;
  fontsize: number;
  cellWidth: number;
  cellHeight: number;
}

function TimetableColumn(props: TimeTableColumnProps) {
  return (
    <g>
      {props.timetableColumn.map((timetableCell: template_timetableCell, rowIndex: number) => (
        <TimetableCell
          timetableCell={timetableCell}
          index={props.index}
          rowIndex={rowIndex}
          fontsize={props.fontsize}
          cellWidth={props.cellWidth}
          cellHeight={props.cellHeight}
        />
      ))}
    </g>
  )
}

type TimetableCellProps = {
  timetableCell: template_timetableCell;
  index: number;
  rowIndex: number;
  fontsize: number;
  cellWidth: number;
  cellHeight: number;
}

function TimetableCell(props: TimetableCellProps) {

  return (
    <>
      <text
        x={(props.index - 0.5) * props.cellWidth}
        y={props.rowIndex * props.cellHeight}
        fontSize={props.fontsize}
        dominantBaseline="text-before-edge"
        textAnchor="middle"
        fill={props.timetableCell.color}
      >
        {props.timetableCell.value}
      </text>
      
    </>
  )
}

type TimetableSideProps = {
  timetableSide: template_timetableSide[];
  displayProperty: template_displayProperty;
  fontSize: number;
}

function TimetableSide(props: TimetableSideProps) {
  return (
    <>
      {props.timetableSide.map((value: template_timetableSide, index: number) => (
        <>
          <text
            x="0"
            y={index * 16}
            fontSize="16"
            dominantBaseline="text-before-edge"
          >
            {value.name}
          </text>
          <text
            x={props.displayProperty.stationNameLength * props.fontSize}
            y={index * 16}
            fontSize="16"
            textAnchor="end"
            dominantBaseline="text-before-edge"
          >
            {value.value}
          </text>
        </>
      ))}
    </>
  );
  
}

type TimetableVerticalAxisProps = {
  cellWidth: number;
  SVGHeight: number;
  length: number;
  fill: string;
}

function TimetableVerticalAxis(props: TimetableVerticalAxisProps) {
  let d = ""
  for (let i = 0; i <= props.length; i++) {
    d = d + `M${props.cellWidth * i},0V${props.SVGHeight}`
  }

  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={props.fill}
        strokeWidth="1"
      />
    </>
  )
}

function Timetable() {
  const Diagrams = useRecoilValue<template_diagram[]>(DiagramRepository().Diagrams);

  const directionName = useRecoilValue<string[]>(DirectionNameRepository().DirectionNameSelector);

  const timetableSide = useRecoilValue<template_timetableSide[]>(TimetableUseCase().timetableSide);
  const FontSize = useRecoilValue<number>(Infrastructure().FontSize);
  const displayProperty = useRecoilValue<template_displayProperty>(DisplayPropertyRepository().DisplayProperty);
  const timetableCells = useRecoilValue<template_timetableCell[][]>(TimetableUseCase().timetableCells);

  const [StationIndex, SetStationIndex] = useRecoilState<number>(Infrastructure().StationIndex);
  const [TrainIndex, SetTrainIndex] = useRecoilState<number>(Infrastructure().TrainIndex);

  return (
    <Component
      diagrams={Diagrams}
      directionName={directionName}
      timetableSide={timetableSide}
      fontSize={FontSize}
      displayProperty={displayProperty}
      timetableCells={timetableCells}

      StationIndex={StationIndex}
      TrainIndex={TrainIndex}

      SetStationIndex={SetStationIndex}
      SetTrainIndex={SetTrainIndex}
    />
  )
}

export default Timetable;