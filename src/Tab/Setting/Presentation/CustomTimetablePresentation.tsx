import React from 'react';

import { template, template_customTimetableStyle, template_station, template_timetable, template_timetableStyle, template_track } from '../../../Entity/Entity'

import { BooleanInput } from '../../Presentation/ElementsPresentation';

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
            {(Object.keys(props.station.customTimetableStyle) as [keyof template_customTimetableStyle]).map((propertyKey: keyof template_customTimetableStyle, propertyIndex: number) => (
              <tr className={propertyKey} key={propertyIndex}>
                <th>
                  {propertyKey === "arrival" && "到着"}
                  {propertyKey === "departure" && "発車"}
                  {propertyKey === "trainNumber" && "列車番号"}
                  {propertyKey === "operationNumber" && "運用番号"}
                  {propertyKey === "trainType" && "種別"}
                  {propertyKey === "trainName" && "名称"}
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

type CustomTimetableStyleInputProps = {
  station: template_station;
  PropertyKey: keyof template_station["customTimetableStyle"];
  ArrayIndex: number;
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function CustomTimetableStyleInput(props: CustomTimetableStyleInputProps) {

  const set = (() => {
    props.SetStationProperty(
      "customTimetableStyle",
        {...props.station.customTimetableStyle,
        [props.PropertyKey]: props.station.customTimetableStyle[props.PropertyKey].map((property: boolean, index: number) => (props.ArrayIndex === index ? !property : property))}
    )
  })

  return (
    <>
      <BooleanInput value={props.station.customTimetableStyle[props.PropertyKey][props.ArrayIndex]} set={set} />
    </>
  )
}

export default CustomTimetableStyle;