import axios, { AxiosError } from "axios";
import ConfigToken from "./configToken";

const API_URL = process.env.REACT_APP_API_URL;

const apiLikes = async (liked, path, token) => {
    const endpoit = API_URL + path;
    await (liked ?
        axios.delete(endpoit, ConfigToken(token))
        : axios.post(endpoit, {}, ConfigToken(token)))
            .then((res) => res.data)
            .catch((err) => {
                throw new AxiosError(err.response);
        });
};
export default apiLikes;
