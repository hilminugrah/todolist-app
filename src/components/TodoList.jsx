import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-10">
      <div className="w-full max-w-xl space-y-4">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && todos.length === 0 && (
          <p className="text-center text-gray-500">No todos found.</p>
        )}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default React.memo(TodoList);
