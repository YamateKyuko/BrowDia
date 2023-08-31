import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_station, template_trainType, template_listStyle } from '../../Entity/Entity';
import BrowDia from './../../img/BrowDiaImg.svg';

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

import Infrastructure from '../../Infrastructure/Infrastructure';

type ComponentProps = {
}

function Component(props: ComponentProps) {

  return (
    <dl>
      <dt>
        列車
      </dt>
      <dd>
        <ul>
          <li>
            種別
          </li>
          <li>
            番号
          </li>
          <li>
            名称
          </li>
          <li>
            号
          </li>
          <li>
            情報
          </li>
        </ul>
      </dd>
    </dl>
  );
}

function Side() {
  const Atom: template = useRecoilValue(Infrastructure().Atom);

  return (
    <Component
    />
  )
}

export default Side;