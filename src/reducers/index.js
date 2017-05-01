const getNewCategory = (action) => {
  return {
    id: action.id,
    name: action.name,
    children: []
  }
}

const todo = (todo = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      if (todo.id !== action.id) {
        return todo;
      }
      return Object.assign({}, todo, { done: !todo.done});
    case 'ADD_TODO':
      return {
        id: action.id,
        title: action.text,
        done: false
      }
  }
}

const category = (c = {}, action) => {
  switch(action.type) {
    case 'ADD_CATEGORY':
      if (c.id !== action.parentId) {
        return Object.assign({}, c, {
          children: c.children.map(elem => category(elem, action))
        })
      }
      return Object.assign({}, c, {
        children: c.children.concat(getNewCategory(action))
      })
    case 'REMOVE_CATEGORY':
      let result;
      c.children.forEach((child, index) => {
        if (child.id === action.id) {
          result = Object.assign({}, c, {
            children: [...c.children.slice(0, index), ...c.children.slice(index + 1)]
          })
        }
      })
      if(result === undefined) {
        result = Object.assign({}, c, {
          children: c.children.map((elem) => category(elem, action))
        })
      }
      return result
  }
}

const todoApp = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return Object.assign({}, state, {
        todos: state.todos.map(t =>
          todo(t, action)
        )
      })
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos : state.todos.concat(todo({}, action))
      })
    case 'ADD_CATEGORY':
      if (action.isRoot) {
        return Object.assign({}, state, {
          categories : state.categories.concat(getNewCategory(action))
        })
      }
      return Object.assign({}, state, {
        categories: state.categories.map(c =>
          category(c, action)
        )
      })
    case 'REMOVE_CATEGORY':
      return Object.assign({}, state, {
        categories: state.categories.map((c) =>
          category(c, action)
        )
      })
    default:
      return state;
  }
}

export default todoApp;

let initialState = {
  todos: [
    {
      id: 0,
      title: "1st sdjfh",
      done: true
    },
    {
      id: 1,
      title: "2nd sdhjfk",
      done: false
    },
    {
      id: 2,
      title: "djsk sdhkf",
      done: true
    }
  ],
  categories: [
    {
      id: 0,
      name: "CAT 1",
      children: [{
        id: 2,
        name: "CAT 1-1",
        children:[{
          id: 4,
          name: "CAT 1-1-1",
          children:[]
        }]
      },
      {
        id: 3,
        name: "CAT 1-2",
        children:[]
      }]
    },
    {
      id: 1,
      name: "CAT 2",
      children:[]
    }
  ]
}