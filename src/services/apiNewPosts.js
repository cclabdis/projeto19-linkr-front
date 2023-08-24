import axios, { AxiosError } from "axios";

import ConfigToken from "./configToken";

const API_URL = process.env.REACT_APP_API_URL;

const findNewPosts = async (path, token, lastPostId) => {

    const response = await axios
        .get(API_URL + `${path}/${lastPostId}`, ConfigToken(token))
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            throw new AxiosError(err.response);
        });
    return response;
}

export default findNewPosts;