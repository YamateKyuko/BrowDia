import React from 'react';
import './../../css/Element.css';
import './../../css/Set.css';
import BrowDia from './../../img/BrowDiaImg.svg';
import { FileInput } from '../../Presentation/ElementsPresentation';
import { template } from '../../../Entity/Entity';
import Infrastructure from '../../../Infrastructure/Infrastructure';

import {
  useSetRecoilState
} from 'recoil';

type ComponentProps = {
}

function Component(props: ComponentProps) {
  const SetAtom = useSetRecoilState(Infrastructure().Atom)
  const set = (value: template): void => {
    SetAtom(value)
  }

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
                  <FileInput set={set} />
                </li>
                <li>
                  <p>BrowDia をご利用頂き誠に有難う御座います。</p>
                </li>
                <li>
                  <p>ブラウザでダイヤの制作閲覧ができるよう<s>現在鋭意開発中です</s>開発していました。</p>
                </li>
                <li>
                  <p><s>めんどくさくなったため</s>諸般の事情により開発を<s>多分もうやらない</s>中断しています。</p>
                </li>
                <li>
                  <p><s>途中でめんどくさくなったため</s>開発途上のためかなり<s>ひどい</s>不安定です。</p>
                </li>
                <li>
                  <p><s>適当</s>不安定なソース・動作、もしくは要望等ありましたら Issues へどうぞ。</p>
                </li>
                <li>
                  <p><s>適当に</s>できる限り確認できるよう<s>にしません</s>努力します。</p>
                </li>
                <li>
                  Github
                  <a href="https://github.com/swallow3/BrowDia">BrowDia</a>
                </li>
                
                <li>
                  <p>各種ソースの提供などをいただきました、大井さかな氏に、この場を借りて厚く御礼を申し上げます。</p>
                </li>
                <li>
                  <p>氏の開発された clouddia を使われることを強くお勧めします。</p>
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