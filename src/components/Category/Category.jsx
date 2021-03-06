import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentReply from 'material-ui/svg-icons/content/reply';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { browserHistory } from 'react-router';
import classNames from 'classnames';
import DialogFormContainer from '../../containers/DialogFormContainer.jsx';
import './Category.sass';

injectTapEventPlugin();

class Category extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      parentId: undefined,
      dialogType: undefined,
      focused: false,
    };

    this.toggleCategory = this.toggleCategory.bind(this);
    this.renderDialogForm = this.renderDialogForm.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  changeCategory() {
    this.props.setPrevCategoryId(this.props.todo.categoryId);
    this.props.changeDisplayedCategoryId(this.props.category.id);
  }

  openDialog(type) {
    this.setState({
      openDialog: true,
      parentId: this.props.category.id,
      dialogType: type,
    });
  }

  closeDialog() {
    this.setState({ openDialog: false });
  }

  toggleCategory() {
    if (!this.props.edit) {
      const location = Object.assign({}, browserHistory.getCurrentLocation());
      browserHistory.push(`/category/${this.props.category.id}?showDone=${location.query.showDone}`);
    }
  }

  renderDialogForm() {
    return (
      <DialogFormContainer
        parentId={this.state.parentId}
        closeDialog={this.closeDialog}
        isOpen={this.state.openDialog}
        dialogType={this.state.dialogType}
        category={this.props.category}
      />
    );
  }

  renderButtons() {
    if (!this.props.edit) {
      return (
        <div className="category__actions">
          <ImageEdit onClick={this.openDialog.bind(this, 'edit')} />
          <ActionDelete onClick={this.openDialog.bind(this, 'delete')} />
          <ContentAdd onClick={this.openDialog.bind(this, 'add')} />
        </div>
      );
    }
    return (
      <div>
        <ContentReply onClick={this.changeCategory.bind(this)} />
      </div>
    );
  }

  render() {
    const categoryClasses = classNames({
      category: true,
      focused: this.props.displayedCategoryId === this.props.category.id,
      done: this.props.category.done,
    });
    return (
      <div>
        <Paper
          zDepth={1}
          onClick={this.toggleCategory}
          className={categoryClasses}
        >
          <div className="category__name">{this.props.category.name}</div>
          {this.renderButtons()}
        </Paper>
        {this.state.openDialog && this.renderDialogForm()}
      </div>
    );
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    children: PropTypes.array.isRequired,
  }).isRequired,
  changeDisplayedCategoryId: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  todoId: PropTypes.number,
  changeTodosCategory: PropTypes.func,
  displayedCategoryId: PropTypes.number,
  setPrevCategoryId: PropTypes.func,
};

export default Category;
