import axios from "axios";
const Api = axios.create({
  baseURL: "http://192.168.1.8:3000/api",
});

type authResponse = {
  data: { token: string };
};
export const signInApi = (
  email: string,
  password: string
): Promise<authResponse> => Api.post(`/login`, { email, password });

export const signUpApi = (
  email: string,
  password: string,
  name: string
): Promise<authResponse> => Api.post(`/signUp`, { email, password, name });
