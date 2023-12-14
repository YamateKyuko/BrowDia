import React from 'react';
import './../../css/Element.css';
import './../../css/Set.css';
import { template_station, template_outerTerminal } from '../../../Entity/Entity'

import { BooleanInput, ButtonInput, StringInput } from '../../Presentation/ElementsPresentation'

type TracksComponentProps = {
  outerTerminal: template_outerTerminal[] | null;
  directionName: string[];
  SetOuterTerminalChild: (index: number, newValue: template_outerTerminal) => void;
  DeleteOuterTerminalChild: (index: number) => void;
  AddOuterTerminalChild: () => void;

  nullChange: () => void;
}

function OuterTerminalComponent(props: TracksComponentProps) {
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
  const set = () => {
    props.nullChange()
  }

  return (<BooleanInput value={!!props.outerTerminal} set={set} />)
}

type OuterTerminalChildProps = {
  outerTerminal: template_outerTerminal;
  SetOuterTerminalArray: (index: number, newValue: template_outerTerminal) => void;
  DeleteOuterTerminalArray: (index: number) => void;
  index: number;
}

function OuterTerminalChild(props: OuterTerminalChildProps) {
  const SetOuterTerminalChildProperty = <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P): void => {
    props.SetOuterTerminalArray(props.index, {...props.outerTerminal, [key]: property})
  }

  return (
    <OuterTerminalChildComponent
      outerTerminal={props.outerTerminal}
      SetOuterTerminalArrayProperty={SetOuterTerminalChildProperty}
      DeleteOuterTerminalArray={props.DeleteOuterTerminalArray}
      index={props.index}
    />
  )
}

type OuterTerminalChildComponentProps = {
  outerTerminal: template_outerTerminal;
  SetOuterTerminalArrayProperty: <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P) => void;
  DeleteOuterTerminalArray: (index: number) => void;
  index: number;
}

function OuterTerminalChildComponent(props: OuterTerminalChildComponentProps) {
  

  return (
    <tr className="outerTerminalsTr">
      <td><div className="data-logo">{props.index + 1}</div></td>
      <th><OuterTerminalChildPropHandler propKey="name" value={props.outerTerminal.name} SetOuterTerminalProperty={props.SetOuterTerminalArrayProperty} /></th>
      <CanNullOuterTerminalChildPropHandler propKey="timetableName" value={props.outerTerminal.timetableName} SetOuterTerminalProperty={props.SetOuterTerminalArrayProperty} />
      <CanNullOuterTerminalChildPropHandler propKey="diagramName" value={props.outerTerminal.diagramName} SetOuterTerminalProperty={props.SetOuterTerminalArrayProperty} />
      <td><OuterTerminalDelete index={props.index} DeleteOuterTerminalArray={props.DeleteOuterTerminalArray} /></td>
    </tr>
  )
}

type CanNullOuterTerminalChildPropHandlerProps = {
  propKey: keyof template_outerTerminal;
  value: string | null;
  SetOuterTerminalProperty: <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P) => void;
}

function CanNullOuterTerminalChildPropHandler(props: CanNullOuterTerminalChildPropHandlerProps) {
  const set = (value: string) => props.SetOuterTerminalProperty(props.propKey, value)

  const nullSet = () => {
    if (!props.value) props.SetOuterTerminalProperty(props.propKey, "")
    else props.SetOuterTerminalProperty(props.propKey, null)
  }

  return (
    <>
      <td>
        {props.value
          ? <StringInput value={props.value} set={set} />
          : <StringInput value={""} set={() => {}} disabled={true} />
        }
      </td>
      <td><BooleanInput value={!!props.value} set={nullSet} /></td>
    </>
  )
}

type OuterTerminalDeleteProps = {
  index: number;
  DeleteOuterTerminalArray: (index: number) => void;
}

function OuterTerminalDelete(props: OuterTerminalDeleteProps) {
  const set = () => props.DeleteOuterTerminalArray(props.index)
  return <ButtonInput value={"削除"} set={set} />
}

type OuterTerminalChildPropertyHandlerProps = {
  propKey: keyof template_outerTerminal;
  value: string;
  SetOuterTerminalProperty: <K extends keyof template_outerTerminal, P extends template_outerTerminal[K]>(key: K, property: P) => void;
}

function OuterTerminalChildPropHandler(props: OuterTerminalChildPropertyHandlerProps) {
  const set = (value:string) => props.SetOuterTerminalProperty(props.propKey, value)
  return <StringInput value={props.value} set={set} />
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
        props.station.outerTerminal.map((outerTerminal: template_outerTerminal, mapIndex: number) => (mapIndex === index ? newValue : outerTerminal))
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