import * as React from 'react';
import { Container, TilingSprite } from "react-pixi-fiber";
import * as PIXI from 'pixi.js';

import { Area } from './Canvas';
// import Texts from './Texts';
import You from './You';

interface AppProps {
  width: number;
  height: number;
  app: PIXI.Application;
  x: number;
  y: number;
  scale: number;
  displayArea: Area;
};

const canvas = document.createElement('canvas');
const size = 100;
canvas.width = size;
canvas.height = size;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#ddd';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(0, size);
ctx.lineTo(0, 0);
ctx.lineTo(size, 0);
ctx.stroke();

export default class App extends React.Component<AppProps> {
  public render(): React.ReactNode {
    const { width, height, x, y, scale, displayArea } = this.props;
    return (
      <Container>
        <TilingSprite
          texture={PIXI.Texture.fromCanvas(canvas)}
          width={width}
          height={height}
          tilePosition={new PIXI.Point(x, y)}
          tileScale={new PIXI.Point(scale, scale)}
        />
        <Container x={x} y={y} scale={new PIXI.Point(scale, scale)}>
          {/**<Texts {...displayArea} scale={scale} />**/}
          <You x={0} y={0} />
        </Container>
      </Container>
    );
  }
}
