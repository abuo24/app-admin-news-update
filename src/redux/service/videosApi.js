import {axiosInstanceAdmin, host} from "../../server/host";

export const videosApi = {
    add: data => {
        return axiosInstanceAdmin.post(`${host}/videonews/add`, data)
    },
    delete: (id) => {
        return axiosInstanceAdmin.delete(`${host}/videonews/${id}`)
    },
    edit: (id,data) => {
        return axiosInstanceAdmin.put(`${host}/videonews/${id}`, data)
    }

};