import { Action } from 'redux';

export enum ActionTypes {
  UPDATE_SCREEN = 'UPDATE_SCREEN',
  RESIZE_SCREEN = 'RESIZE_SCREEN',
  MOVE = 'MOVE',
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

interface ResizeScreenAction extends Action {
  type: ActionTypes.RESIZE_SCREEN;
  payload: {
    width: number;
    height: number;
  };
}
export function resizeScreen(
  width: number,
  height: number,
): ResizeScreenAction {
  return {
    type: ActionTypes.RESIZE_SCREEN,
    payload: { width, height },
  };
}

interface MoveAction extends Action {
  type: ActionTypes.MOVE;
  payload: {
    x: number;
    y: number;
  };
}
export function move(x: number, y: number): MoveAction {
  return {
    type: ActionTypes.MOVE,
    payload: {
      x,
      y,
    },
  };
}

export type Actions = UpdateScreenAction | ResizeScreenAction | MoveAction;
