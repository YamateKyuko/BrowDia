import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { template_station, template_outerTerminal } from "./Entity/Entity"

import { Input } from "./ElementsPresentation"

type TracksComponentProps = {
  outerTerminal: template_outerTerminal[] | null;
  directionName: string[];
  SetOuterTerminalChild: (index: number, newValue: template_outerTerminal) => void;
  DeleteOuterTerminalChild: (index: number) => void;
  AddOuterTerminalChild: () => void;

  nullChange: () => void;
}

function OuterTerminalComponent(props: TracksComponentProps) {
  const onClick = (): void => {
    props.AddOuterTerminalChild()
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
                    <td><span></span></td>
                    <th><span>名称</span></th>
                    <td><span>表略</span></td>
                    <td><span>有無</span></td>
                    <td><span>ﾀﾞｲﾔ略</span></td>
                    <td><span>有無</span></td>
                    <td></td>
                  </tr>
                </thead>
                  <tbody>
                    {props.outerTerminal.map((outerTerminal: template_outerTerminal, index: number) => (
                      <OuterTerminalChild
                        outerTerminal={outerTerminal}
                        SetOuterTerminalArray={props.SetOuterTerminalChild}
                        DeleteOuterTerminalArray={props.DeleteOuterTerminalChild}
                        AddOuterTerminalArray={props.AddOuterTerminalChild}
                        index={index}
                        key={index}
                      />
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
          <li>有無<NullHandler outerTerminal={props.outerTerminal} for="outerTerminal" nullChange={props.nullChange} /></li>
        </ul>
      </dd>
    </>
  )
}

type NullHandlerProps = {
  outerTerminal: template_outerTerminal[] | null;
  for: string;
  nullChange: () => void;
}

function NullHandler(props: NullHandlerProps) {
  const onChange = () => {
    props.nullChange()
  }

  return (<Input value={!!props.outerTerminal} onChange={onChange} />)
}

type OuterTerminalChildProps = {
  outerTerminal: template_outerTerminal;
  index: number;

  SetOuterTerminalArray: (index: number, newValue: template_outerTerminal) => void;
  DeleteOuterTerminalArray: (index: number) => void;
  AddOuterTerminalArray: () => void;
}

function OuterTerminalChild(props: OuterTerminalChildProps) {
  const SetOuterTerminalChildProperty = <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P): void => {
    props.SetOuterTerminalArray(props.index, {...props.outerTerminal, [key]: property})
  }

  return (
    <OuterTerminalChildComponent
      outerTerminal={props.outerTerminal}
      SetOuterTerminalArrayProperty={SetOuterTerminalChildProperty}
      // SetOuterTerminalArray={props.SetOuterTerminalArray}
      DeleteOuterTerminalArray={props.DeleteOuterTerminalArray}
      AddOuterTerminalArray={props.AddOuterTerminalArray}
      index={props.index}
    />
  )
}

type OuterTerminalChildComponentProps = {
  outerTerminal: template_outerTerminal;
  index: number;

  SetOuterTerminalArrayProperty: <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P) => void;
  // SetOuterTerminalArray: (index: number, newValue: template_outerTerminal) => void;
  DeleteOuterTerminalArray: (index: number) => void;
  AddOuterTerminalArray: () => void;
}

function OuterTerminalChildComponent(props: OuterTerminalChildComponentProps) {
  

  return (
    <tr className="outerTerminalsTr">
      <td><div className="data-logo">{props.index + 1}</div></td>
      <th><OuterTerminalChildPropertyHandler outerTerminal={props.outerTerminal} PropertyKey="name" SetOuterTerminalProperty={props.SetOuterTerminalArrayProperty} /></th>
      <CanNullOuterTerminalChildPropertyHandler outerTerminal={props.outerTerminal} propertyKey="timetableName" SetOuterTerminalProperty={props.SetOuterTerminalArrayProperty} />
      <CanNullOuterTerminalChildPropertyHandler outerTerminal={props.outerTerminal} propertyKey="diagramName" SetOuterTerminalProperty={props.SetOuterTerminalArrayProperty} />
      <td><OuterTerminalDelete index={props.index} DeleteOuterTerminalArray={props.DeleteOuterTerminalArray} /></td>
    </tr>
  )
}

type CanNullOuterTerminalChildPropertyHandlerProps = {
  outerTerminal: template_outerTerminal;
  propertyKey: keyof template_outerTerminal;
  SetOuterTerminalProperty: <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P) => void;
  className?: string;
}

function CanNullOuterTerminalChildPropertyHandler(props: CanNullOuterTerminalChildPropertyHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.SetOuterTerminalProperty(props.propertyKey, event.target.value)
  }

  const nullOnChange = () => {
    if (props.outerTerminal[props.propertyKey] === null) {props.SetOuterTerminalProperty(props.propertyKey, "")}
    if (props.outerTerminal[props.propertyKey] !== null) {props.SetOuterTerminalProperty(props.propertyKey, null)}
  }

  return (
    <>
      <td>
        {typeof props.outerTerminal[props.propertyKey] == "string" ?
          <Input value={props.outerTerminal[props.propertyKey]} onChange={onChange} />
        :
          <Input value="" onChange={onChange} disabled={true} />
        }
      </td>
      <td><Input value={props.outerTerminal[props.propertyKey] !== null} onChange={nullOnChange}/></td>
    </>
  )
}

type OuterTerminalDeleteProps = {
  index: number;
  DeleteOuterTerminalArray: (index: number) => void;
}

function OuterTerminalDelete(props: OuterTerminalDeleteProps) {
  const OnClick: React.MouseEventHandler<HTMLButtonElement> = (() => {
    props.DeleteOuterTerminalArray(props.index)
  })

  return (
    <button onClick={OnClick}>削除</button>
  )
}

type OuterTerminalChildPropertyHandlerProps = {
  outerTerminal: template_outerTerminal;
  PropertyKey: keyof template_outerTerminal;
  SetOuterTerminalProperty: <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P) => void;
  className?: string;
}

function OuterTerminalChildPropertyHandler(props: OuterTerminalChildPropertyHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.outerTerminal[props.PropertyKey] === "string") {
      props.SetOuterTerminalProperty(props.PropertyKey, event.target.value)
    }
  })

  return (
    <Input value={props.outerTerminal[props.PropertyKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

type OuterTerminalProps = {
  station: template_station;
  directionName: string[];
  SetStationProperty: <K extends keyof template_station, P extends template_station[K]>(key: K, property: P) => void;
}

function OuterTerminal(props: OuterTerminalProps) {
  const SetOuterTerminalChild = (index: number, newValue: template_outerTerminal): void => {
    if (props.station.outerTerminal) {
      props.SetStationProperty(
        "outerTerminal",
        props.station.outerTerminal.map((outerTerminal: template_outerTerminal, mapIndex: number) => (mapIndex == index ? newValue : outerTerminal))
      )
    }
    
  }

  const DeleteOuterTerminalChild = (index: number): void => {
    if (props.station.outerTerminal) {
      props.SetStationProperty(
        "outerTerminal",
        props.station.outerTerminal.filter((outerTerminal: template_outerTerminal, filterIndex: number) => (index !== filterIndex))
      )
    }
  }

  const AddOuterTerminalChild = (): void => {
    if (props.station.outerTerminal) {
      props.SetStationProperty(
        "outerTerminal",
        [...props.station.outerTerminal,
          {
            name: "",
            timetableName: null,
            diagramName: null
          }
        ]
      )
    }
  }

  const nullChange = (): void => {
    props.SetStationProperty(
      "outerTerminal",
      props.station.outerTerminal ? null : []
    )
  }
 
  return (
    <OuterTerminalComponent outerTerminal={props.station.outerTerminal} directionName={props.directionName} SetOuterTerminalChild={SetOuterTerminalChild} DeleteOuterTerminalChild={DeleteOuterTerminalChild} AddOuterTerminalChild={AddOuterTerminalChild} nullChange={nullChange} />
  )
}

export default OuterTerminal;