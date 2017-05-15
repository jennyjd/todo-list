import * as actions from './todoActionCreators'

describe('Todo Actions', () => {
  it('should create an action to ADD a todo', () => {
    const text = 'New Todo';
    const categoryId = 0;
    const expectedAction = {
      type: 'ADD_TODO',
      id: actions.todoId++,
      text,
      categoryId
    }
    expect(actions.addTodo(text, categoryId)).toEqual(expectedAction)
  })

  it('should create an action to TOGGLE a todo', () => {
    const id = 0;
    const expectedAction = {
      type: 'TOGGLE_TODO',
      id
    }
    expect(actions.toggleTodo(id)).toEqual(expectedAction)
  })

  it('should create an action to change todos category', () => {
    const todoId = 0;
    const categoryId = 2;
    const expectedAction = {
      type: 'CHANGE_TODOS_CATEGORY',
      todoId,
      categoryId
    }
    expect(actions.changeTodosCategory(categoryId, todoId)).toEqual(expectedAction)
  })

  it('should create an action to EDIT todo', () => {
    const id = 0;
    const title = 'Edited todo title';
    const description = 'Edited description';
    const done = true;
    const expectedAction = {
      type: 'EDIT_TODO',
      id,
      title,
      description,
      done
    }
    expect(actions.editTodo(id, title, description, done)).toEqual(expectedAction)
  })

  it('should create an action to EDIT todo', () => {
    const categoryId = 0;
    const expectedAction = {
      type: 'TRIGGER_TODO_CHECK',
      categoryId
    }
    expect(actions.triggerTodoCheck(categoryId)).toEqual(expectedAction)
  })
})