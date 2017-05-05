import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoItemList.css';

class TodoItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {this.props.todos.map( todo => {
          if (this.props.displayedCategoryId === undefined ||
              todo.categoryId === this.props.displayedCategoryId) {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={ this.props.toggleTodo }
              />
            );
          }
        })}
      </div>
    );
  }
}

export default TodoItemList;
