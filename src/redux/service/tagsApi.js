import {axiosInstanceAdmin, host} from "../../server/host";

export const tagsApi = {
    add: data => {
        return axiosInstanceAdmin.post(`${host}/tags/add`, {
            tag: data.tag,
        })
    },
    delete: (tagsid) => {
        return axiosInstanceAdmin.delete(`${host}/tags/${tagsid}`)
    },
    edit: (id,data) => {
        return axiosInstanceAdmin.put(`${host}/admin/categori/${id}`, {
            name: data.name,
        })
    }

};