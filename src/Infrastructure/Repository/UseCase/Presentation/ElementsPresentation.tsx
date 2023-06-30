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

type InputProps = {
  for: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLElement>;
  className?: string;
  label?: string | React.ReactElement;
  dataLogo?: any;
  src?: string;
}

function Input(props: InputProps) {
  return (
    <>
      {typeof props.value === "string" &&
        <input type="text" className={props.className} value={props.value} onChange={props.onChange} />
      }
      {typeof props.value === "boolean" && (!props.label
        ?
          <>
            <input type="checkbox" id={props.for} name={props.for} onChange={props.onChange} checked={props.value} />
            <label className={"checkbox " + props.className} htmlFor={props.for} />
          </>
        : (!props.dataLogo
          ?
            <>
              <input type="radio" id={props.for} name={props.for} onChange={props.onChange} checked={props.value} />
              <label className={props.className} htmlFor={props.for}>{props.label}</label>
            </>
          :
            <>
              <input type="radio" id={props.for} name={props.for} onChange={props.onChange} checked={props.value} />
              <label data-logo={props.dataLogo} className={props.className} htmlFor={props.for}>{props.label}</label>
            </>
        )
      )}
    </>
  )
}

export default Input;