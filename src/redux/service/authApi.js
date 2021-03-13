import axios from 'axios';
import {axiosInstanceAdmin, host} from "../../server/host";

export const authApi = {
    login: data => {
        return axios.post(`${host}/auth/login`, data)
    },
    editUser: data => {
        return axiosInstanceAdmin.put(`/edit`, data)
    },
    resetPassword: data => {
        return axiosInstanceAdmin.put(`/reset`, data)
    }

};