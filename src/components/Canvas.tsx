import * as React from 'react';
import { Stage, AppContext } from 'react-pixi-fiber';

import App from '../App';

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CanvasProps {
  x: number;
  y: number;
  scale: number;
  updateScreen: (x: number, y: number, scale: number) => void;
}

interface CanvasState {
  width: number;
  height: number;
  displayArea: Area;
}

export default class Canvas extends React.PureComponent<
  CanvasProps,
  CanvasState
> {
  private resizeListener: (e: Event) => void;

  public constructor(props: CanvasProps) {
    super(props);
    this.state = {
      width: 800,
      height: 600,
      displayArea: {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
      },
    };
    this.resizeListener = this.resize.bind(this);
  }

  public componentDidMount(): void {
    addEventListener('resize', this.resizeListener);
    this.resize();
    this.updateDisplayArea();
    window.addEventListener(
      'mousewheel',
      (e: WheelEvent) => {
        e.preventDefault();
        const { x, y, scale } = this.props;
        if (e.ctrlKey) {
          const deltaScale = scale * 0.06;
          const sign = e.deltaY >= 0 ? 1 : -1;

          const newScale = Math.min(
            4,
            Math.max(0.2, scale - deltaScale * sign),
          );
          const rate = newScale / scale;
          this.props.updateScreen(
            (x - e.offsetX) * rate + e.offsetX,
            (y - e.offsetY) * rate + e.offsetY,
            newScale,
          );
          this.updateDisplayArea();
        } else {
          this.props.updateScreen(x - e.deltaX, y - e.deltaY, scale);

          this.updateDisplayArea();
        }
      },
      { passive: false },
    );
  }

  private updateDisplayArea(): void {
    requestAnimationFrame(() => {
      const { x, y, scale } = this.props;
      const { width, height } = this.state;
      this.setState({
        displayArea: {
          x: -x / scale,
          y: -y / scale,
          width: width / scale,
          height: height / scale,
        },
      });
    });
  }

  private resize(): void {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  public render(): React.ReactNode {
    const { width, height } = this.state;
    return (
      <Stage
        width={width}
        height={height}
        options={{ backgroundColor: 0xf8f8f8 }}
      >
        <AppContext.Consumer>
          {app => (
            <App
              x={this.props.x}
              y={this.props.y}
              scale={this.props.scale}
              {...this.state}
              app={app}
            />
          )}
        </AppContext.Consumer>
      </Stage>
    );
  }
}
