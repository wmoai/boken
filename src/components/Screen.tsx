import * as React from 'react';
import { Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

import { Area } from 'components/Canvas';
import Background from 'components/Background';
import You from './You';

interface ScreenProps {
  width: number;
  height: number;
  app: PIXI.Application;
  x: number;
  y: number;
  scale: number;
  you: {
    x: number;
    y: number;
  };
  move: (x: number, y: number) => void;
}

export default class Screen extends React.Component<ScreenProps> {
  public componentDidMount(): void {
    const { stage } = this.props.app;
    stage.interactive = true;
    stage.on('click', (e: PIXI.interaction.InteractionEvent) => {
      const { x, y, scale } = this.props;
      const pointX = (e.data.global.x - x) / scale;
      const pointY = (e.data.global.y - y) / scale;
      this.props.move(pointX, pointY);
    });
    this.props.app.ticker.add((d: number) => {});
  }

  public render(): React.ReactNode {
    const { width, height, x, y, scale, you } = this.props;
    return (
      <Container>
        <Background width={width} height={height} x={x} y={y} scale={scale} />
        <Container x={x} y={y} scale={new PIXI.Point(scale, scale)}>
          <You x={you.x} y={you.y} />
        </Container>
      </Container>
    );
  }
}
