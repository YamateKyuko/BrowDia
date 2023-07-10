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
  // for: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLElement>;
  className?: string;
  label?: string | React.ReactElement;
  dataLogo?: any;
  src?: string;
  disabled?: boolean;
}

function Input(props: InputProps) {
  return (
    <>
      {typeof props.value === "string" &&
        <input type="text" className={props.className} value={props.value} onChange={props.onChange} disabled={props.disabled} />
      }
      {typeof props.value === "boolean" && (!props.label
        ?
          <>
            <label className={"checkbox " + props.className}>
              <input type="checkbox" onChange={props.onChange} checked={props.value} />
            </label>

            {/* id={props.for}  htmlFor={props.for} */}
          </>
        : (!props.dataLogo
          ?
            <>
              <label className={props.className}>
                <input type="radio" onChange={props.onChange} checked={props.value} />
                {props.label}
              </label>
            </>
          :
            <>
              <label data-logo={props.dataLogo} className={props.className}>
                <input type="radio" onChange={props.onChange} checked={props.value} />
                {props.label}
              </label>
            </>
        )
      )}
    </>
  )
}

export default Input;