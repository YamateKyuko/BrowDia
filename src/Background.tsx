import React from 'react';
import logo from './logo.svg';
import './App.css';
import SetStationPresentation from './Infrastructure/Repository/UseCase/Presentation/SetStationPresentation';

import Infrastructure from './Infrastructure/Infrastructure';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import Header from './Infrastructure/Repository/UseCase/Presentation/HeaderPresentation';
import Setting from './Infrastructure/Repository/UseCase/Presentation/SettingPresentation';

function Background() {
  const PageIndex = useRecoilValue<number>(Infrastructure().PageIndex);

  return (
    <>
      <Header />
      {PageIndex == 0 && <Setting />}
    </>
  );
}

export default Background;
