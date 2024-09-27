import axios from "axios";
export const api = axios.create({
  baseURL: `https://interviewtesting.onrender.com/v1/users`
});