import axios, { AxiosError } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const apiAuth = async (path, body) => {
    const response = await axios.post(API_URL + path, body)
        .then(res => res.data)
        .catch(err => {
            throw new AxiosError(err.response);
        });
    return response;
};
export default apiAuth;