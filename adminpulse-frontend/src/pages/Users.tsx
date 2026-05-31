import { FormEvent, useEffect, useState } from 'react';
import { createUser, deleteUser, getUsers, updateUser } from '../api/userApi';
import UserTable from '../components/UserTable';
import type { User } from '../types';

const emptyForm = { name: '', email: '', role: 'User', status: 'Active' };

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadUsers = async (query?: string) => {
    setLoading(true);
    const data = await getUsers(query);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    loadUsers(search);
  };

  const openAddModal = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id, form);
      } else {
        await createUser(form);
      }
      setShowModal(false);
      loadUsers(search);
    } catch {
      alert('Could not save user. Make sure backend is running.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      loadUsers(search);
    } catch {
      alert('Could not delete user.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-slate-400 text-sm mt-1">Add, edit, and manage users</p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg text-white text-sm font-medium transition-colors"
        >
          + Add User
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <input
          type="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-dark-800 border border-dark-700 text-white outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-sm transition-colors"
        >
          Search
        </button>
      </form>

      <UserTable
        users={users}
        loading={loading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-dark-800 border border-dark-700 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {editingUser ? 'Edit User' : 'Add User'}
            </h3>

            <label className="block mb-3">
              <span className="text-sm text-slate-400">Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white outline-none focus:border-accent"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm text-slate-400">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white outline-none focus:border-accent"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm text-slate-400">Role</span>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white outline-none"
              >
                <option>User</option>
                <option>Editor</option>
                <option>Moderator</option>
                <option>Admin</option>
              </select>
            </label>

            <label className="block mb-4">
              <span className="text-sm text-slate-400">Status</span>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-dark-700 border border-dark-600 text-white outline-none"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-dark-600 hover:bg-dark-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent hover:bg-accent-hover rounded-lg text-white transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
