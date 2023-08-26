import React from 'react';
import logo from './logo.svg';
import Background from './Background';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Background />
    </RecoilRoot>
  );
}

export default App;
