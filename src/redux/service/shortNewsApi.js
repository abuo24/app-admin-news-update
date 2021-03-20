
import axios from 'axios';
import {axiosInstanceAdmin, host} from "../../server/host";

export const shortNewsApi = {
    add: data => {
        return axiosInstanceAdmin.post(`${host}/admin/shortnews/add`, {
            category_id: data.category,
            titleUz: data.titleUz,
            titleRu: data.titleRu
        })
    },
    delete: (id) => {
        return axiosInstanceAdmin.delete(`${host}/admin/shortnews/${id}`)
    },
    edit: (id,data) => {
        return axiosInstanceAdmin.put(`${host}/admin/shortnews/${id}`, {
            category_id: data.category_id,
            titleUz: data.titleUz,
            titleRu: data.titleRu
        })
    }

};