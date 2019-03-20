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

export default function Canvas(props: CanvasProps): JSX.Element {
  const { width, height, x, y, scale, resizeWindow, updateScreen } = props;
  const [state, dispatch] = React.useReducer(
    (state, event) => {
      const { x, y, scale } = state;
      const { ctrlKey, deltaX, deltaY, offsetX, offsetY } = event;

      if (ctrlKey) {
        const deltaScale = scale * 0.06;
        const sign = deltaY >= 0 ? 1 : -1;

        const newScale = Math.min(4, Math.max(0.2, scale - deltaScale * sign));
        const rate = newScale / scale;
        return {
          x: (x - offsetX) * rate + offsetX,
          y: (y - offsetY) * rate + offsetY,
          scale: newScale,
        };
      } else {
        return { x: x - deltaX, y: y - deltaY, scale };
      }
    },
    {
      x,
      y,
      scale,
    },
  );

  React.useEffect(() => {
    function fitCanvasSizeToWindow(): void {
      resizeWindow(window.innerWidth, window.innerHeight);
    }
    fitCanvasSizeToWindow();
    addEventListener('resize', fitCanvasSizeToWindow);

    return () => {
      removeEventListener('resize', fitCanvasSizeToWindow);
    };
  }, [resizeWindow]);

  React.useEffect(() => {
    function handleWheel(e: WheelEvent): void {
      e.preventDefault();
      dispatch(e);
    }

    addEventListener('mousewheel', handleWheel, { passive: false });
    return () => {
      removeEventListener('mousewheel', handleWheel);
    };
  }, []);

  React.useEffect(() => {
    updateScreen(state.x, state.y, state.scale);
  }, [state, updateScreen]);

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
                  scale={scale}
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
