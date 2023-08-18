import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { entitiesList, template, template_displayProperty, template_eventList, template_railway, template_rgb } from "./Entity/Entity"

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
                <RailwayPropHandler railway={props.railway} propKey="comment" SetRailwayProp={props.SetRailwayProp} textarea={true} />
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
  textarea?: boolean;
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
    <Input value={props.railway[props.propKey]} onChange={onChange} className={props.className ? props.className : ""} time={true} textArea={props.textarea} />
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
  // const order: number[] = [1, 0, 2]
  // localStorage.setItem("StorageOrder", JSON.stringify(order));
  // var data: string | null = localStorage.getItem("StorageOrder")
  // if (data === null) {data = "[1, 0, 2]";}
  // const a = JSON.parse(data)

  
  const [value, setValue] = React.useState(TimeConverter(Number(props.railway[props.propKey])))
  
  if (isNumber(props.railway[props.propKey])) {
    
    // const [phase, setPhase] = React.useState<number>(0)
    props.railway[props.propKey] as number
    const onFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      // setPrev(prev)
      event.target.setSelectionRange(5, 5)
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      // event.preventDefault();
      const Target = event.target as HTMLInputElement
      if (event.code == "ArrowLeft") {
        event.preventDefault();
        Target.setSelectionRange(Number(Target.selectionStart) - 3, Number(Target.selectionStart) - 3);
        // if (Number(Target.selectionStart) % 3 == 2) {
        //   Target.setSelectionRange(Number(Target.selectionStart) - 1, Number(Target.selectionStart) - 0);
        // }
      } else if (event.code == "ArrowRight") {
        event.preventDefault();
        Target.setSelectionRange(Number(Target.selectionEnd) + 3, Number(Target.selectionEnd) + 3);
        // if (Number(Target.selectionStart) % 3 == 2) {
        //   Target.setSelectionRange(Number(Target.selectionStart) + 1, Number(Target.selectionStart) + 2);
        // }
      } else if (event.code) {

        // event.preventDefault();
        console.log(event.key)
        // const value = Target.value.substring(0, 3) + "  " + Target.value.substring(4, 7)

        // const seconds: number = SecondsConverter(value)
        props.SetRailwayProp(props.propKey, 100)
      }
    }

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {


      // event.preventDefault();
      console.log(event)
      // const Target = event.target as HTMLInputElement
      // const nativeEvent = event.nativeEvent as InputEvent
      
      // if (!isNaN(Number(nativeEvent.data))) {
        
      //   props.SetRailwayProp(props.propKey, SecondsConverter(event.target.value))
      //   Target.setSelectionRange(Number(Target.selectionStart) - 2, Number(Target.selectionStart) - 1);
      // }
    }

    const onSelect: React.ReactEventHandler<HTMLInputElement> = (event) => {
      // const Target = event.target as HTMLInputElement

      // const a = Target.value.substring(0, Number(Target.selectionStart)) + "-  -" + Target.value.substring(Number(Target.selectionEnd), Target.value.length)
      // setValue(a)
      // if (Number(Target.selectionStart) + 1 != Number(Target.selectionEnd)) {
      //   Target.setSelectionRange(Number(Target.selectionEnd) - 1, Target.selectionEnd);
      // }
      // console.log(event)
      // Target.selectionStart == Target.value.length && Target.setSelectionRange(Number(Target.selectionStart) - 1, Target.selectionEnd);
      // Target.selectionEnd == 0 && Target.setSelectionRange(Target.selectionEnd, Number(Target.selectionStart) + 1);
    }

    const onMouseDown: React.MouseEventHandler<HTMLInputElement> = (event) => {
      // const Target = event.target as HTMLInputElement
      // Target.setSelectionRange(Number(Target.selectionEnd) - 1, Target.selectionEnd);
    }

    const eventList: template_eventList = {
      onChange: onChange,
      onFocus: onFocus,
      onKeyDown: onKeyDown,
      onSelect: onSelect,
      onMouseDown: onMouseDown,
    }

    // TimeConverter(Number(props.railway[props.propKey]))

    return (
      <Input value={value} eventList={eventList} onChange={onChange} onFocus={onFocus}  time={true} dataGray={"0"} />
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