import type { Activity, DashboardStats, RevenuePoint, User } from '../types';

/**
 * Fallback data when backend is not running.
 * Useful for UI demo during development or interviews.
 */
export const dummyUsers: User[] = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Amit Kumar', email: 'amit@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@example.com', role: 'Moderator', status: 'Active' },
];

export const dummyStats: DashboardStats = {
  totalUsers: 128,
  activeUsers: 96,
  newUsers: 12,
  revenue: 45200,
  growth: 8.5,
};

export const dummyActivities: Activity[] = [
  { id: 1, description: 'Admin logged into dashboard', type: 'auth', createdAt: new Date().toISOString() },
  { id: 2, description: 'New user Rahul Sharma was added', type: 'user', createdAt: new Date().toISOString() },
  { id: 3, description: 'Monthly revenue report generated', type: 'report', createdAt: new Date().toISOString() },
];

export const dummyRevenue: RevenuePoint[] = [
  { month: 'Jan', revenue: 3200 },
  { month: 'Feb', revenue: 4100 },
  { month: 'Mar', revenue: 3800 },
  { month: 'Apr', revenue: 5200 },
  { month: 'May', revenue: 4800 },
  { month: 'Jun', revenue: 6100 },
];
