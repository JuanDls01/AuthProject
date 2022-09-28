import axios from "axios";
import { AxiosResponse } from 'axios';
import { access, UserInfo } from "../models";

export const getUserInfoWithJWT = async (accessToken: access) => {
    // console.log('token', tokens?.access)
    try {
        const json = await axios.get('user/user/', {
            headers: {
                Authorization: `JWT ${accessToken}`
            },
        })
        const userInfo: AxiosResponse<UserInfo> = json.data;
        console.log('user', userInfo)
        return userInfo;
    } catch (err) {
        console.log('service', err)
    }
}