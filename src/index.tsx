import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from 'reducers/index';
import styled from 'styled-components';

import Canvas from 'containers/Canvas';

interface HogeProps {
  bgColor: string;
}

const Hoge = styled.div<HogeProps>`
  position: absolute;
  width: 100px;
  background-color: ${(p: HogeProps) => p.bgColor};
  opacity: 0.5;
`;

const store = createStore(reducer);

render(
  <Provider store={store}>
    <div>
      <Hoge bgColor="blue">hoge</Hoge>
      <Canvas />
    </div>
  </Provider>,
  document.getElementById('content'),
);
