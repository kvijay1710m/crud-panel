import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:5000/api/todos';

export default function Todos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Axios headers with token if needed
  const headers = {
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API}/${editingId}`, { title, description }, { headers });
    } else {
      await axios.post(API, { title, description }, { headers });
    }
    setTitle('');
    setDescription('');
    setEditingId(null);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Todos</h2>

      <form onSubmit={handleCreateOrUpdate} className="mb-6 space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          {editingId ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo._id} className="p-4 border rounded shadow-sm">
            <h3 className="font-semibold">{todo.title}</h3>
            <p className="text-gray-600">{todo.description}</p>
            <div className="mt-2 space-x-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(todo)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
