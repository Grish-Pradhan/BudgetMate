import axios from 'axios';

const ApiFromData = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const createUserApi = (data) => Api.post('/register', data);          
export const loginUserApi = (data) => Api.post('/login', data);              
export const deleteUserApi = (id) => Api.delete(`/user/${id}`);             
export const getUserApi = () => Api.get('/user');                            
export const updateUserApi = (data) => ApiFromData.put('/user', data);       

