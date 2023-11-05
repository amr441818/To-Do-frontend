import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Api = axios.create({
  baseURL: "http://192.168.1.8:3000/api",
});

Api.interceptors.request.use(async (req) => {
  if (await AsyncStorage.getItem("token")) {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      token = JSON.parse(token);
    }
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchAllTodos = () => Api.get(`/todos`);
export const createTodo = (text: string) => Api.post(`/todos`, { text });
export const deleteTodo = (
  todId: string
): Promise<{ data: { message: string } }> => Api.delete(`/todos/${todId}`);
