import * as React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { Stage, AppContext } from 'react-pixi-fiber';

import Screen from 'containers/Screen';
import { context } from 'components/canvasContext';

export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CanvasProps {
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  updateScreen: (x: number, y: number, scale: number) => void;
  resizeWindow: (width: number, height: number) => void;
}

interface CanvasState {
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
      displayArea: {
        x: 0,
        y: 0,
        width: 800,
        height: 600,
      },
    };
    this.resizeListener = this.fitCanvasSizeToWindow.bind(this);
  }

  public componentDidMount(): void {
    addEventListener('resize', this.resizeListener);
    this.fitCanvasSizeToWindow();
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
      const { width, height, x, y, scale } = this.props;
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

  private fitCanvasSizeToWindow(): void {
    this.props.resizeWindow(window.innerWidth, window.innerHeight);
  }

  public render(): React.ReactNode {
    const { width, height, x, y } = this.props;
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Stage
            width={width}
            height={height}
            options={{ backgroundColor: 0xf8f8f8 }}
          >
            <AppContext.Consumer>
              {app => (
                <Provider store={store} context={context}>
                  <Screen
                    width={width}
                    height={height}
                    x={x}
                    y={y}
                    scale={this.props.scale}
                    displayArea={this.state.displayArea}
                    app={app}
                  />
                </Provider>
              )}
            </AppContext.Consumer>
          </Stage>
        )}
      </ReactReduxContext.Consumer>
    );
  }
}
