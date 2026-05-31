export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt?: string;
}

export interface Activity {
  id: number;
  description: string;
  type: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  revenue: number;
  growth: number;
}

export interface RevenuePoint {
  month: string;
  revenue: number;
}

export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  department: string;
  profileImage?: string;
}

export interface LoginResponse {
  token: string;
  adminName: string;
  adminEmail: string;
  message: string;
}
