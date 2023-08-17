import axios, { AxiosError } from "axios";
import ConfigToken from "./configToken";

const API_URL = process.env.REACT_APP_API_URL;

export const createPost = async (postData, token) => {
  // const url = `${API_URL}/timeline`;
  const tokenr = ConfigToken(token)

  console.log(tokenr)
  try {
    const response = await axios.post(`${API_URL}/timeline`, postData, ConfigToken(token));
    
    return response.data;
  } catch (error) {
    throw new AxiosError(error.response);
  }
};

// function createPost(){
//   const promise = axios.get(`${API_URL}/trendings`);
//   return promise;
// }