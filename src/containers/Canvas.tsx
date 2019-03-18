import { connect } from 'react-redux';

import Canvas from 'components/Canvas';
import { State } from 'reducers/index';
import { updateScreen } from 'actions/index';

export default connect(
  (state: State) => {
    const { x, y, scale } = state;
    return { x, y, scale };
  },
  dispatch => ({
    updateScreen: (x: number, y: number, scale: number) => {
      dispatch(updateScreen(x, y, scale));
    },
  }),
)(Canvas);
