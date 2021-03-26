import {axiosInstance, axiosInstanceAdmin, host} from "../../server/host";

export const commentsApi = {
    // add: data => {
    //     return axiosInstanceAdmin.post(`${host}/admin/categori/add`, {
    //         nameUz: data.nameUz,
    //         nameRu: data.nameRu
    //     })
    // },
    delete: (commentid) => {
        return axiosInstance.delete(`/comments/${commentid}`)
    },
    // edit: (id,data) => {
    //     return axiosInstanceAdmin.put(`${host}/admin/categori/${id}`, {
    //         nameUz: data.nameUz,
    //         nameRu: data.nameRu
    //     })
    // }

};