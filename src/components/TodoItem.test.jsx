import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import TodoItem from './TodoItem';
import { toggleTodo, deleteTodo } from '../redux/actions/todoActions';


jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('../redux/actions/todoActions', () => ({
  toggleTodo: jest.fn((id, completed) => ({ type: 'TOGGLE_TODO', payload: { id, completed } })),
  deleteTodo: jest.fn((id) => ({ type: 'DELETE_TODO', payload: id })),
}));

describe('TodoItem Component', () => {
  let mockDispatch;
  const todo = { id: 1, title: 'Belajar Testing', completed: false };

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  test('sesuai snapshot', () => {
    const { asFragment } = render(<TodoItem todo={todo} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('menampilkan judul todo', () => {
    render(<TodoItem todo={todo} />);
    expect(screen.getByText('Belajar Testing')).toBeInTheDocument();
  });

  test('klik checkbox memanggil toggleTodo', () => {
    render(<TodoItem todo={todo} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(toggleTodo).toHaveBeenCalledWith(1, true);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_TODO',
      payload: { id: 1, completed: true },
    });
  });

  test('klik tombol hapus memanggil deleteTodo', () => {
    render(<TodoItem todo={todo} />);

    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledWith(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DELETE_TODO',
      payload: 1,
    });
  });
});
