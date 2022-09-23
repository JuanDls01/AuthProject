import axios from "axios";
import { AxiosResponse } from 'axios';
import { Tokens, UserInfo } from "../models";

export const getUserInfoWithJWT = async (tokens: Tokens) => {
    console.log('token', tokens?.access)
    const json = await axios.get('user/user/', {
        headers: {
            Authorization: `JWT ${tokens?.access}`
        },
    })
    const userInfo: AxiosResponse<UserInfo> = json.data;
    console.log('user', userInfo)
    return userInfo;
}