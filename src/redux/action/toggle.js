import axios from "axios";
import {headers, host} from "../../server/host";




export function getToggle(data=false) {

    return {
        type: "TOGGLE",
        payload: data
    }
}

