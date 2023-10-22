import React from 'react';
import ReactDOMServer from 'react-dom/server';
import './../../css/Element.css';
import './../../css/Set.css';
import { template, template_trainType } from '../../../Entity/Entity';
import BrowDia from './../../img/BrowDiaImg.svg';

import {
  useRecoilState,
  useRecoilValue,
  SetterOrUpdater
} from 'recoil';

import Infrastructure from '../../../Infrastructure/Infrastructure';
import DirectionNameRepository from '../../../Repository/DirectionRepositry';
import TrainTypeRepository from '../../../Repository/TrainTypeRepository';


type ComponentProps = {
}

function Component(props: ComponentProps) {

  return (
    <>
      <article>
        
        <section>
          <dl>
            <dt>
              <img src={BrowDia} alt="BrowDia" />
            </dt>
            <dd>
              <ul>
                <li>
                  BrowDia をご利用頂き誠に有難う御座います。
                </li>
                <li>
                  ブラウザでダイヤの制作閲覧ができるよう現在鋭意開発中です。
                </li>
                <li>
                  Github
                  <a href="https://github.com/swallow3/BrowDia">BrowDia</a>
                </li>
                <li>
                  
                </li>
              </ul>
            </dd>
          </dl>
        </section>
      </article>
    </>
  );
}

function Home() {
  return (
    <Component
    />
  )
}

export default Home;