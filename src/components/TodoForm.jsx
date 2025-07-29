import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions/todoActions';

function TodoForm() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    dispatch(addTodo(title));
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6 w-full max-w-xl mx-auto mt-8">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tambah tugas baru" className="flex-1 border border-gray-500 rounded px-3 py-2 shadow-sm focus:outline-none" />
      <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-500 transition flex items-center gap-2">
        <span>Tambah</span>
        <span className="text-lg">+</span>
      </button>
    </form>
  );
}

export default TodoForm;
