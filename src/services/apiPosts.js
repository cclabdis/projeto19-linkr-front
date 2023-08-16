import axios, { AxiosError } from "axios";
import ConfigToken from "./configToken";

const API_URL = process.env.REACT_APP_API_URL;

export const createPost = async (postData, token) => {
  const url = `${API_URL}/timeline`;

  try {
    const response = await axios.post(url, postData, ConfigToken(token));

    return response.data;
  } catch (error) {
    throw new AxiosError(error.response);
  }
};