import { Action } from 'redux';

export enum ActionTypes {
  UPDATE_SCREEN = 'UPDATE_SCREEN',
  TEST = 'TEST',
}

interface UpdateScreenAction extends Action {
  type: ActionTypes.UPDATE_SCREEN;
  payload: {
    x: number;
    y: number;
    scale: number;
  };
}
export function updateScreen(
  x: number,
  y: number,
  scale: number,
): UpdateScreenAction {
  return {
    type: ActionTypes.UPDATE_SCREEN,
    payload: { x, y, scale },
  };
}

export type ScreenActions = UpdateScreenAction;
