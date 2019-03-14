import * as React from 'react';
import { Stage, AppContext } from 'react-pixi-fiber';

import App from './App';

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
};

interface CanvasState {
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  displayArea: Area;
};

export default class Canvas extends React.PureComponent<{}, CanvasState> {
  private resizeListener: (e: Event) => void;

  protected constructor(props: {}) {
    super(props);
    this.state = {
      width: 800,
      height: 600,
      x: 0,
      y: 0,
      scale: 1,
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
    window.addEventListener('mousewheel', (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) {
        const deltaScale = this.state.scale * 0.08;
        const sign = e.deltaY >= 0 ? 1 : -1;

        const newScale = Math.min(4, Math.max(0.2, this.state.scale - deltaScale * sign));
        const rate = newScale / this.state.scale;
        this.setState({
          x: (this.state.x - e.offsetX) * rate + e.offsetX,
          y: (this.state.y - e.offsetY) * rate + e.offsetY,
          scale: newScale,
        });
        this.updateDisplayArea();
      } else {
        this.setState({
          x: this.state.x - e.deltaX,
          y: this.state.y - e.deltaY,
        });
        this.updateDisplayArea();
      }
    }, { passive: false });
  }

  private updateDisplayArea(): void {
    requestAnimationFrame(() => {
      const { width, height, x, y, scale } = this.state;
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
      <Stage width={width} height={height} options={{ backgroundColor: 0xf8f8f8 }}>
        <AppContext.Consumer>
          {app => (
            <App {...this.state} app={app} />
          )}
        </AppContext.Consumer>
      </Stage>
    );
  }
}

