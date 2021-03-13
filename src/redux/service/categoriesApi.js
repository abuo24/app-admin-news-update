import {axiosInstanceAdmin, host} from "../../server/host";

export const categoriesApi = {
    add: data => {
        return axiosInstanceAdmin.post(`${host}/admin/categori/add`, {
            name: data.name,
        })
    },
    delete: (id, category) => {
        return axiosInstanceAdmin.delete(`${host}/admin/categori/${id}?category=${category}`)
    },
    edit: (id,data) => {
        return axiosInstanceAdmin.put(`${host}/admin/categori/${id}`, {
            name: data.name,
        })
    }

};