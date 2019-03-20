import { ActionTypes, Actions } from '../actions/index';

export interface State {
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  you: {
    x: number;
    y: number;
  };
}

const initialState: State = {
  width: 800,
  height: 600,
  x: 0,
  y: 0,
  scale: 1,
  you: {
    x: 0,
    y: 0,
  },
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.UPDATE_SCREEN: {
      const { x, y, scale } = action.payload;
      return {
        ...state,
        x,
        y,
        scale,
      };
    }
    case ActionTypes.RESIZE_SCREEN: {
      const { width, height } = action.payload;
      return { ...state, width, height };
    }
    case ActionTypes.MOVE: {
      const { x, y } = action.payload;
      return { ...state, you: { x, y } };
    }
    default:
      return state;
  }
  return state;
}
