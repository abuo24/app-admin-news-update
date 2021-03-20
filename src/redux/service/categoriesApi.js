import {axiosInstanceAdmin, host} from "../../server/host";

export const categoriesApi = {
    add: data => {
        return axiosInstanceAdmin.post(`${host}/admin/categori/add`, {
            nameUz: data.nameUz,
            nameRu: data.nameRu
        })
    },
    delete: (id, category) => {
        return axiosInstanceAdmin.delete(`${host}/admin/categori/${id}?category=${category}`)
    },
    edit: (id,data) => {
        return axiosInstanceAdmin.put(`${host}/admin/categori/${id}`, {
            nameUz: data.nameUz,
            nameRu: data.nameRu
        })
    }

};