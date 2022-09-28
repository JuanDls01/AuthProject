import axios from "axios"
import { refresh } from "../models";

export const refreshToken = async (refreshToken: refresh) => {
    const json = await axios.post('api/token/refresh/', {
        'refresh': `${refreshToken}`
    });
    const newAccess: string = json?.data?.access;
    return newAccess;
    // try {

    // } catch (err) {
    //     console.log('service', err);
    // }
}