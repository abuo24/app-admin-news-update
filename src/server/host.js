import axios from "axios";

export  let  host ="https://news-update-backend.herokuapp.com/api";

export  let  getFile ="https://news-update-backend.herokuapp.com/api/files/preview/";

export let headers = {
    'Authorization': localStorage.getItem("token") === null ? "" : ('Bearer ' + localStorage.getItem("token"))
};

export let axiosInstance = axios.create({
    baseURL: `${host}`,
    timeout: 30000,
    headers
});

export let axiosInstanceAdmin = axios.create({
    baseURL: `${host}/admin`,
    headers
});

