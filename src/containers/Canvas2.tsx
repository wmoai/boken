import { connect } from 'react-redux';

import Canvas from 'components/Canvas2';
import { State } from 'reducers/index';
import { updateScreen, resizeScreen } from 'actions/index';

export default connect(
  (state: State) => {
    const { width, height, x, y, scale } = state;
    return { width, height, x, y, scale };
  },
  dispatch => ({
    updateScreen: (x: number, y: number, scale: number) => {
      dispatch(updateScreen(x, y, scale));
    },
    resizeWindow: (width: number, height: number) => {
      dispatch(resizeScreen(width, height));
    },
  }),
)(Canvas);
