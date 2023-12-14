import React from 'react';
import './../../css/Element.css';
import './../../css/Set.css';
import { template } from '../../../Entity/Entity';

import {
  useRecoilValue
} from 'recoil';

import Infrastructure from '../../../Infrastructure/Infrastructure';
import { StringInput } from '../../Presentation/ElementsPresentation';

type ComponentProps = {
  Atom: template;
}

function Component(props: ComponentProps) {
  const [downroad, setDownroad] = React.useState<string>(props.Atom.railway.name);

  const Save: React.MouseEventHandler<HTMLInputElement> = (event) => {
    console.log(event)
    
    var resultJson = JSON.stringify(props.Atom);
    var downLoadLink = document.createElement("a");
    downLoadLink.textContent = 'download';
    downLoadLink.download = downroad + ".json";
    downLoadLink.href = URL.createObjectURL(new Blob([resultJson], {type: "text.plain"}));
    downLoadLink.dataset.downloadurl = ["text/plain", downLoadLink.download, downLoadLink.href].join(":");
    downLoadLink.click();
  }

  const set = (value: string): void => {
    setDownroad(value);
  }

  return (
    <>
      <article>
        <section>
          <h2>保存</h2>
          <dl>
            <dt>
              各種設定
            </dt>
            <dd>
              <ul>
                <li>
                  ファイル名
                  <StringInput value={downroad} set={set} />
                </li>
              </ul>
            </dd>
            <dt>
              <input type="button" onClick={Save} value={"保存"} />
            </dt>
          </dl>
        </section>
      </article>
    </>
  );
}

function Save() {
  const Atom = useRecoilValue<template>(Infrastructure().Atom)

  return (
    <Component Atom={Atom} />
  )
}

export default Save;