
import axios from 'axios';
import {axiosInstanceAdmin, host} from "../../server/host";

export const shortNewsApi = {
    add: data => {
        return axiosInstanceAdmin.post(`${host}/admin/shortnews/add`, {
            category_id: data.category,
            title: data.title
        })
    },
    delete: (id) => {
        return axiosInstanceAdmin.delete(`${host}/admin/shortnews/${id}`)
    },
    edit: (id,data) => {
        return axiosInstanceAdmin.put(`${host}/admin/shortnews/${id}`, {
            category_id: data.category,
            title: data.title
        })
    }

};