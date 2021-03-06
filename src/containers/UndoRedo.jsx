import React from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

const UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <p>
    <FlatButton onClick={onUndo} disabled={!canUndo}>
      Undo
    </FlatButton>
    <FlatButton onClick={onRedo} disabled={!canRedo}>
      Redo
    </FlatButton>
  </p>
);

const mapStateToProps = state => ({
  canUndo: state.todoApp.past.length > 0,
  canRedo: state.todoApp.future.length > 0,
});

const mapDispatchToProps = dispatch => ({
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo);
