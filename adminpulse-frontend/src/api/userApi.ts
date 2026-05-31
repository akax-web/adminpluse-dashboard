import api from './axiosConfig';
import { ADMIN_DISPLAY_NAME, ADMIN_EMAIL } from '../constants/admin';
import { dummyActivities, dummyRevenue, dummyStats, dummyUsers } from './dummyData';
import type {
  Activity,
  AdminProfile,
  DashboardStats,
  LoginResponse,
  RevenuePoint,
  User,
} from '../types';

// Helper: use API if available, else fallback to dummy data
async function withFallback<T>(apiCall: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await apiCall();
  } catch {
    console.warn('API unavailable, using dummy data');
    return fallback;
  }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', { email, password });
  return response.data;
};

export const getUsers = async (search?: string): Promise<User[]> => {
  return withFallback(async () => {
    const params = search ? { search } : {};
    const response = await api.get('/users', { params });
    return (response.data as Record<string, unknown>[]).map(mapUserFromApi);
  }, filterDummyUsers(search));
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await api.post('/users', {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });
  return mapUserFromApi(response.data);
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${id}`, {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  });
  return mapUserFromApi(response.data);
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return withFallback(async () => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  }, dummyStats);
};

export const getRevenueData = async (): Promise<RevenuePoint[]> => {
  return withFallback(async () => {
    const response = await api.get<RevenuePoint[]>('/dashboard/revenue');
    return response.data;
  }, dummyRevenue);
};

export const getActivities = async (): Promise<Activity[]> => {
  return withFallback(async () => {
    const response = await api.get<Activity[]>('/activities');
    return response.data;
  }, dummyActivities);
};

export const getAdminProfile = async (email: string): Promise<AdminProfile> => {
  const fallback: AdminProfile = {
    id: 1,
    name: ADMIN_DISPLAY_NAME,
    email: ADMIN_EMAIL,
    department: 'IT Administration',
  };

  const profile = await withFallback(async () => {
    const response = await api.get<AdminProfile>('/auth/profile', { params: { email } });
    return response.data;
  }, fallback);

  if (email === ADMIN_EMAIL) {
    return { ...profile, name: ADMIN_DISPLAY_NAME };
  }
  return profile;
};

// Map backend field names to frontend User type
function mapUserFromApi(data: Record<string, unknown>): User {
  return {
    id: data.id as number,
    name: data.name as string,
    email: data.email as string,
    role: (data.role as string) || 'User',
    status: (data.status as string) || 'Active',
    createdAt: data.createdAt as string | undefined,
  };
}

function filterDummyUsers(search?: string): User[] {
  if (!search) return dummyUsers;
  const q = search.toLowerCase();
  return dummyUsers.filter(
    (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );
}
