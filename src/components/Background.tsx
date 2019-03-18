import * as React from 'react';
import { Container, TilingSprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

interface BackgroundProps {
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
}

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

export default class Background extends React.Component<BackgroundProps> {
  public render(): React.ReactNode {
    const { width, height, x, y, scale } = this.props;
    return (
      <Container>
        <TilingSprite
          texture={PIXI.Texture.fromCanvas(canvas)}
          width={width}
          height={height}
          tilePosition={new PIXI.Point(x, y)}
          tileScale={new PIXI.Point(scale, scale)}
        />
      </Container>
    );
  }
}
