import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { entitiesList, template, template_displayProperty, template_railway, template_rgb } from "./Entity/Entity"

import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';

import DirectionNameRepository from "../../DirectionRepositry";
import { Input } from "./ElementsPresentation"
import DataRepository from "../../DataRepository";
import RailwayRepository from "../../SetRepository";
import { SecondsConverter, TimeConverter } from "./SharedFunction";

type ComponentProps = {
  data: template;
  railway: template_railway;
  SetDataProp: <K extends keyof template, P extends template[K]>(key: K, property: P) => void;
  SetRailwayProp: <K extends keyof template_railway, P extends template_railway[K]>(key: K, property: P) => void;
  // displayProperty: template_displayProperty;
  // directionName: string[];
  // SetDisplayPropertyProp: <K extends keyof template_displayProperty, P extends template_displayProperty[K]>(key: K, property: P) => void;
}

function Component(props: ComponentProps) {

  return (
    <article>
      <section>
        <dl>
          <dt><RailwayPropHandler railway={props.railway} propKey="name" SetRailwayProp={props.SetRailwayProp} /></dt>
          <dd>
            <ul>
              <li>
                ファイル形式
                <DataPropHandler data={props.data} propKey="fileType" SetDataProp={props.SetDataProp} />
              </li>
              <li>
                アプリケーション形式
                <DataPropHandler data={props.data} propKey="fileTypeAppComment" SetDataProp={props.SetDataProp} />
              </li>
              <li>
                方向名称
              </li>
              <li>
                ダイヤ開始時刻
                <RailwayTimePropHandler railway={props.railway} propKey="startTime" SetRailwayProp={props.SetRailwayProp} />
              </li>
              <li>
                標準駅間隔
                <RailwayPropHandler railway={props.railway} propKey="stationInterval" SetRailwayProp={props.SetRailwayProp} />
              </li>
              <li>
                コメント
                <RailwayPropHandler railway={props.railway} propKey="comment" SetRailwayProp={props.SetRailwayProp} />
              </li>
            </ul>
          </dd>
        </dl>
      </section>
    </article>
  );
}

type DataPropHandlerProps = {
  data: template;
  propKey: keyof template;
  SetDataProp: <K extends keyof template, P extends template[K]>(key: K, property: P) => void;
  className?: string;
}

function DataPropHandler(props: DataPropHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.data[props.propKey] === "string") {
      props.SetDataProp(props.propKey, event.target.value)
    }
  })

  return (
    <Input value={props.data[props.propKey]} onChange={onChange} className={props.className ? props.className : ""} />
  )
}

type RailwayPropHandlerProps = {
  railway: template_railway;
  propKey: keyof template_railway;
  SetRailwayProp: <K extends keyof template_railway, P extends template_railway[K]>(key: K, property: P) => void;
  time?: boolean;
  className?: string;
}

function RailwayPropHandler(props: RailwayPropHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.railway[props.propKey] === "boolean") {
      props.SetRailwayProp(props.propKey, event.target.checked)
    }
    if (typeof props.railway[props.propKey] === "number") {
      props.SetRailwayProp(props.propKey, Number(event.target.value))
    }
    if (typeof props.railway[props.propKey] === "string") {
      props.SetRailwayProp(props.propKey, event.target.value)
    }
  })

  return (
    <Input value={props.railway[props.propKey]} onChange={onChange} className={props.className ? props.className : ""} time={true} />
  )
}

const isNumber = (value: any): value is number => {
  return typeof value == "number"
}

function RailwayTimePropHandler(props: {
  railway: template_railway,
  propKey: keyof template_railway,
  // value: P,
  SetRailwayProp: <K extends keyof template_railway, P extends template_railway[K]>(key: K, property: P) => void
}) {
  const [prev, setPrev] = React.useState<number>(0)
  if (typeof props.railway[props.propKey] === "number") {
    // props.SetRailwayProp(props.propKey, 1)
    // setPrev(Number(props.railway[props.propKey]))
    const onFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      setPrev(prev)
      console.log(event)
      event.target.setSelectionRange(4, 5)
      const keyUpEvent = (keyUpEvent: Event) => {
        if (keyUpEvent instanceof KeyboardEvent) {
          if (keyUpEvent.code == "ArrowLeft") {
            event.target.setSelectionRange(Number(event.target.selectionStart) - 1, Number(event.target.selectionStart))
          }
          if (keyUpEvent.code == "ArrowRight") {
            event.target.setSelectionRange(Number(event.target.selectionStart), Number(event.target.selectionStart) + 1)
          }
        }
      }
      event.target.addEventListener(
        "keyup", 
        keyUpEvent
      )
      event.target.addEventListener(
        "select", () => {
        console.log(event.target.selectionStart + "-" + event.target.selectionEnd)
      })
      event.target.addEventListener(
        "blur", () => {}
      )
    }

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      
    }

    return (
      <Input value={TimeConverter(0)} onChange={onChange} onFocus={onFocus} time={true} dataGray={"0"} />
    )
  }

  return (<>Error</>)
}

type DirectionNameHandlerProps = {
  railway: template_railway;
  propKey: keyof template_railway;
  SetRailwayProp: <K extends keyof template_railway, P extends template_railway[K]>(key: K, property: P) => void;
  className?: string;
}

function DirectionNameHandler(props: DirectionNameHandlerProps) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = ((event: React.ChangeEvent<HTMLInputElement>) => {
    // if (typeof props.railway[props.propKey] === "boolean") {
    //   props.SetRailwayProp(props.propKey, event.target.checked)
    // }
    // if (typeof props.railway[props.propKey] === "number") {
    //   props.SetRailwayProp(props.propKey, Number(event.target.value))
    // }
    // if (typeof props.railway[props.propKey] === "string") {
    //   props.SetRailwayProp(props.propKey, event.target.value)
    // }
  })

  return (
    <>
      {props.railway.directionName.map((element: string, index: number) => {
        <Input value={element} onChange={onChange} className={props.className ? props.className : ""} />
      })}
    </>
  )
}

function SetPresentation() {
  const DirectionName: string[] = useRecoilValue(DirectionNameRepository().DirectionNameSelector);
  
  const SetDataProp = <K extends keyof template, P extends template[K]>(key: K, property: P): void => {
    SetData((prev: template) => ({...prev, [key]: property}))
  }

  const SetRailwayProp = <K extends keyof template_railway, P extends template_railway[K]>(key: K, property: P): void => {
    SetRailway((prev: template_railway) => ({...prev, [key]: property}))
  }

  const [Data, SetData] = useRecoilState(DataRepository().Data)
  const [Railway, SetRailway] = useRecoilState(RailwayRepository().Railway)

  return (
    <Component
      data={Data}
      railway={Railway}
      SetDataProp={SetDataProp}
      SetRailwayProp={SetRailwayProp}
      // displayProperty={DisplayProperty}
      // directionName={DirectionName}
      // SetDisplayPropertyProp={SetDisplayPropertyProp}
    />
  )
}


export default SetPresentation;