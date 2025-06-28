import axios from 'axios';


const getToken = () => localStorage.getItem('token');

// Base API instance for JSON requests 
const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Separate instance for multipart/form-data 
const ApiFormData = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Attach token to every request if available
Api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ApiFormData.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const createUserApi = (data) => Api.post('/register', data);
export const loginUserApi = (data) => Api.post('/login', data);
export const getUserApi = () => Api.get('/user');
export const updateUserApi = (data) => ApiFormData.put('/user', data);

export const getTransactionsApi = () =>
  axios.get('http://localhost:3000/api/transactions', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });

export const addTransactionApi = (data) =>
  axios.post('http://localhost:3000/api/transactions', data, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });

export const deleteTransactionApi = (id) =>
  axios.delete(`http://localhost:3000/api/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });


  //admin ko api
  export const getUsersApi = () =>
  axios.get('http://localhost:3000/admin/users', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });

export const deleteUserApi = (id) =>
  axios.delete(`http://localhost:3000/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
  });

export default Api;
//Grish Pradhan