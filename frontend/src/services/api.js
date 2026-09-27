import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach JWT token if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('karate_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 Unauthorized globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Auto logout on token expiration
      localStorage.removeItem('karate_token');
      localStorage.removeItem('karate_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authApi = {
  login: (data) => API.post('/auth/login', data),
  signup: (data) => API.post('/auth/signup', data),
};

// User Profile Services
export const userApi = {
  getProfile: () => API.get('/users/me'),
  updateProfile: (data) => API.put('/users/me', data),
  getAllUsers: () => API.get('/users'),
};

// Student Management Services (Admin CRUD & User Profile)
export const studentApi = {
  getMyStudentProfile: () => API.get('/students/me'),
  getAllStudents: (searchQuery = '') => API.get(`/students${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`),
  getStudentById: (id) => API.get(`/students/${id}`),
  createStudent: (data) => API.post('/students', data),
  updateStudent: (id, data) => API.put(`/students/${id}`, data),
  deleteStudent: (id) => API.delete(`/students/${id}`),
  getDashboardStats: () => API.get('/students/stats'),
};

// Karate Class Services
export const classApi = {
  getAllClasses: () => API.get('/classes'),
  getClassById: (id) => API.get(`/classes/${id}`),
  createClass: (data) => API.post('/classes', data),
  updateClass: (id, data) => API.put(`/classes/${id}`, data),
  deleteClass: (id) => API.delete(`/classes/${id}`),
};

// Enrollment Services
export const enrollmentApi = {
  enrollInClass: (classId) => API.post(`/enrollments/class/${classId}`),
  getMyEnrollments: () => API.get('/enrollments/my'),
  getAllEnrollmentsForAdmin: () => API.get('/enrollments/admin'),
  cancelEnrollment: (id) => API.delete(`/enrollments/${id}`),
};

export default API;
