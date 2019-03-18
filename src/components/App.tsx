import * as React from 'react';
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
  pointer-events: none;
`;

export default class App extends React.PureComponent {
  public render(): React.ReactNode {
    return (
      <div>
        <Hoge bgColor="blue">hoge</Hoge>
        <Canvas />
      </div>
    );
  }
}
