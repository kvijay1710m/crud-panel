import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Todo App</h1>

      {user ? (
        <>
          <p className="mb-4">Hello, {user.name || 'User'}!</p>
          <div className="space-x-4">
            <Link
              to="/todos"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Todos
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-4">Please log in or sign up to get started.</p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Signup
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
