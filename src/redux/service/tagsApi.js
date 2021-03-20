import {axiosInstanceAdmin, host} from "../../server/host";

export const tagsApi = {
    add: data => {
        return axiosInstanceAdmin.post(`${host}/tags/add`, {
            tagUz: data.tagUz,
            tagRu: data.tagRu,
        })
    },
    delete: (tagsid) => {
        return axiosInstanceAdmin.delete(`${host}/tags/${tagsid}`)
    }
};