import axios from "axios";
import { AxiosResponse } from 'axios';
import { LocalStorageKey, Tokens, UserInfo } from "../models";

export const getUserInfoWithJWT = async (tokens: Tokens) => {
    // const token2 = localStorage.getItem(LocalStorageKey.TOKENS)

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