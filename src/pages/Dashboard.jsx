import React, { useEffect, useMemo, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../redux/actions/todoActions';


const TodoForm = lazy(() => import('../components/TodoForm'));
const TodoList = lazy(() => import('../components/TodoList'));

function Dashboard() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  
  const completedCount = useMemo(() => todos.filter(todo => todo.completed).length, [todos]);
  const incompleteCount = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl">
        <div className="w-full overflow-hidden rounded-lg shadow-md">
          <div className="bg-gray-200 p-4 sm:p-6">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
              <span className="text-blue-400">To</span>
              <span className="text-purple-600">do</span>
            </h1>
            <Suspense fallback={<div>Loading form...</div>}>
              <TodoForm />
            </Suspense>
          </div>
        </div>
        <div className="mt-20 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0 text-sm sm:text-base text-gray-700">
          <div className="flex items-center justify-center gap-1 text-blue-400 text-center sm:text-left">
            Belum Selesai:
            <span className="ml-1 px-2 py-1 rounded-full bg-blue-400 text-white text-xs font-semibold">
              {incompleteCount}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-purple-500 text-center sm:text-right">
            Selesai:
            <span className="ml-1 px-2 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold">
              {completedCount}
            </span>
          </div>
        </div>

        <div className="mt-2">
          {loading && (
            <p className="text-center text-sm sm:text-base text-gray-500">Loading todos...</p>
          )}
          {error && (
            <p className="text-center text-sm sm:text-base text-red-500">Error: {error}</p>
          )}
          <Suspense fallback={<div>Loading todos...</div>}>
            <TodoList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
