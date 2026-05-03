import axios from "axios";


const isLocal = window.location.hostname === "localhost";

const API = axios.create({ 
  baseURL: isLocal 
    ? 'http://localhost:4550' 
    : 'https://chat-server-three-livid.vercel.app' 
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)
export const logout = () => API.post('/auth/logout')

export const sendMessage = (messageData) => API.post('/message/send', messageData)
export const getChatMessages = (chatId) => API.get(`/message/${chatId}`)

export const fetchUser = (id) => API.get(`/user/${id}`)
export const searchUsers = (query) => API.get(`/user/search?query=${query}`)
export const getCurrentUser = () => API.get('/user/')