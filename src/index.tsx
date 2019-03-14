import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

import Canvas from './Canvas';

interface HogeProps {
  bgColor: string;
};

const Hoge = styled('div')<HogeProps>`
  position: absolute;
  width: 100px;
  background-color: ${(p: HogeProps) => p.bgColor};
  opacity: 0.5;
`;

render(
  <div>
    <Hoge bgColor="blue">hoge</Hoge>
    <Canvas />
  </div>,
  document.getElementById('content')
);
