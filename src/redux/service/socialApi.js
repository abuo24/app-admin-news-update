import {axiosInstanceAdmin, host} from "../../server/host";

export const socialApi = {

    edit: (data,prev) => {
        console.log(data)
        console.log(prev)
        return axiosInstanceAdmin.put(`${host}/admin/social/edit`, {
            facebook:  data.facebook?data.facebook:prev.facebook,
            instagram: data.instagram?data.instagram:prev.instagram,
            telegram: data.telegram?data.telegram:prev.telegram,
            twitter: data.twitter?data.twitter:prev.twitter,
            youtube: data.youtube?data.youtube:prev.youtube
        })
    }

};