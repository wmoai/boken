import { ActionTypes, ScreenActions } from '../actions/index';

export interface State {
  x: number;
  y: number;
  scale: number;
}

const initialState: State = {
  x: 0,
  y: 0,
  scale: 1,
};

export default function reducer(
  state = initialState,
  action: ScreenActions,
): State {
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
    default:
      return state;
  }
}
