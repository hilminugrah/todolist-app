import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../redux/actions/todoActions';
import { Trash2 } from 'lucide-react';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id, !todo.completed));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <li
      className={`flex justify-between items-center p-4 rounded-lg border border-gray-500 shadow-md ${
        todo.completed ? 'bg-gray-300' : 'bg-white'
      }`}
    >
      <div className="flex items-center space-x-3 relative">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className={`
            w-5 h-5 appearance-none rounded-full border border-black
            checked:bg-purple-800 checked:border-purple-800
            relative transition duration-200
            after:content-[''] checked:after:content-['✔']
            after:absolute after:top-[1px] after:left-[5px]
            checked:after:text-white checked:after:font-bold checked:after:text-sm
          `}
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.title}</span>
      </div>
      <button onClick={handleDelete} className="text-black hover:text-gray-700 transition">
        <Trash2 size={20} />
      </button>
    </li>
  );
}

export default React.memo(TodoItem);
