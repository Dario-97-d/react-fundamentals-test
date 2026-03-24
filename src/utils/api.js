import axios from 'axios';

const API_URL = '/.netlify/functions';

const axiosApi = axios.create({
  baseURL: API_URL
});

const api = {
  getTask: (id) => axiosApi.get(`/getTask?id=${id}`),
  getTasks: () => axiosApi.get('/getTasks'),
  createTask: (task) => axiosApi.post('/createTask', task),
  editTask: (id, task) => axiosApi.put(`/editTask?id=${id}`, task),
  setTaskDone: (id, done) => axiosApi.patch(`/setTaskDone?id=${id}`, { done }),
  deleteTask: (id) => axiosApi.delete(`/deleteTask?id=${id}`)
}

export default api;
