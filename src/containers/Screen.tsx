import { connect } from 'react-redux';

import Screen from 'components/Screen';
import { State } from 'reducers/index';
import { move } from 'actions/index';
import { context } from 'components/canvasContext';

export default connect(
  (state: State) => {
    const { you } = state;
    return { you };
  },
  dispatch => ({
    move: (x: number, y: number) => {
      dispatch(move(x, y));
    },
  }),
  (stateProps, dispatchProps, ownProps) => {
    return {
      ...stateProps,
      ...dispatchProps,
      ...ownProps,
    };
  },
  { context },
)(Screen);
