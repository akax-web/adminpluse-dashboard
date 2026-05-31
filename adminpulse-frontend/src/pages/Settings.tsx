import { useEffect, useState } from 'react';
import { getAdminProfile } from '../api/userApi';
import type { AdminProfile } from '../types';

export default function Settings() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const adminEmail = localStorage.getItem('adminEmail') || 'admin@adminpulse.com';

  useEffect(() => {
    const load = async () => {
      const data = await getAdminProfile(adminEmail);
      setProfile(data);
      setLoading(false);
    };
    load();
  }, [adminEmail]);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Admin profile and preferences</p>
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Admin Profile</h3>

        {loading ? (
          <p className="text-slate-500">Loading profile...</p>
        ) : (
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold">
              {profile?.name?.charAt(0) || 'A'}
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-slate-500">Name:</span>{' '}
                <span className="text-white">{profile?.name}</span>
              </p>
              <p>
                <span className="text-slate-500">Email:</span>{' '}
                <span className="text-white">{profile?.email}</span>
              </p>
              <p>
                <span className="text-slate-500">Department:</span>{' '}
                <span className="text-white">{profile?.department}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Preferences</h3>
        <label className="flex items-center justify-between py-3 border-b border-dark-700">
          <span className="text-slate-300">Email notifications</span>
          <input type="checkbox" defaultChecked className="accent-indigo-500" />
        </label>
        <label className="flex items-center justify-between py-3 border-b border-dark-700">
          <span className="text-slate-300">Dark theme</span>
          <input type="checkbox" defaultChecked disabled className="accent-indigo-500" />
        </label>
        <label className="flex items-center justify-between py-3">
          <span className="text-slate-300">Weekly reports</span>
          <input type="checkbox" className="accent-indigo-500" />
        </label>
      </div>
    </div>
  );
}
