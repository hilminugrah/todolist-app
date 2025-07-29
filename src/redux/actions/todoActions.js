import axios from 'axios';

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO = 'ADD_TODO';


export const fetchTodos = () => async (dispatch) => {
  dispatch({ type: FETCH_TODOS_REQUEST });
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    dispatch({ type: FETCH_TODOS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_TODOS_FAILURE, payload: error.message });
  }
};


export const toggleTodo = (id, completed) => async (dispatch) => {
  await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, { completed });
  dispatch({ type: TOGGLE_TODO, payload: { id, completed } });
};


export const deleteTodo = (id) => async (dispatch) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  dispatch({ type: DELETE_TODO, payload: id });
};


export const addTodo = (title) => async (dispatch) => {
  const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed: false,
  });
  dispatch({ type: ADD_TODO, payload: res.data });
};
