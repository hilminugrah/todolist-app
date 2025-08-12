import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TodoForm from './TodoForm';

const mockStore = configureStore([]);

describe('TodoForm Component', () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({});
    mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
  });

  it('sesuai snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('tidak memanggil dispatch jika input kosong', () => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Tambah \+/i });
    fireEvent.click(submitButton);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('memanggil dispatch dan reset input jika ada teks', () => {
    render(
      <Provider store={store}>
        <TodoForm />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Tambah tugas baru/i);
    const submitButton = screen.getByRole('button', { name: /Tambah \+/i });

    fireEvent.change(input, { target: { value: 'Belajar Redux' } });
    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('');
  });
});
