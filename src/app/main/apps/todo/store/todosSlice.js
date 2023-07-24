import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

// Mostrar todos los proyectos
export const getProjects = createAsyncThunk(
  'getProjects',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().todoApp.todos.routeParams;
    const response = await axios.get('/project', {
      params: routeParams,
    });
    const data = await response.data;

    return { data, routeParams };
  }
);

export const addTodo = createAsyncThunk(
  'todoApp/todos/addTodo',
  async (todo, { dispatch, getState }) => {
    const response = await axios.post('/project',
    {
      name: 'Proyecto C',
      location: 'Cartagena',
      startDate: '2023-08-08',
      scope: 'Recogida',
      description: 'Prueba3',
      active: false
    }
    );
    const data = await response.data;

    dispatch(getProjects());

    return data;
  }
);

export const updateTodo = createAsyncThunk(
  'todoApp/todos/updateTodo',
  async (todo, { dispatch, getState }) => {
    const response = await axios.post('/api/todo-app/update-todo', todo);
    const data = await response.data;

    dispatch(getProjects());

    return data;
  }
);

export const removeTodo = createAsyncThunk(
  'todoApp/todos/removeTodo',
  async (todoId, { dispatch, getState }) => {
    const response = await axios.post('/api/todo-app/remove-todo', todoId);
    const data = await response.data;

    dispatch(getProjects());

    return data;
  }
);

const todosAdapter = createEntityAdapter({});

export const { selectAll: selectTodos, selectById: selectTodosById } = todosAdapter.getSelectors(
  (state) => state.todoApp.todos
);

const todosSlice = createSlice({
  name: 'todoApp/todos',
  initialState: todosAdapter.getInitialState({
    searchText: '',
    orderBy: '',
    orderDescending: false,
    routeParams: {},
    todoDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setTodosSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    toggleOrderDescending: (state, action) => {
      state.orderDescending = !state.orderDescending;
    },
    changeOrder: (state, action) => {
      state.orderBy = action.payload;
    },
    openNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditTodoDialog: (state, action) => {
      state.todoDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateTodo.fulfilled]: todosAdapter.upsertOne,
    [addTodo.fulfilled]: todosAdapter.addOne,
    [getProjects.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      todosAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setTodosSearchText,
  toggleOrderDescending,
  changeOrder,
  openNewTodoDialog,
  closeNewTodoDialog,
  openEditTodoDialog,
  closeEditTodoDialog,
} = todosSlice.actions;

export default todosSlice.reducer;
