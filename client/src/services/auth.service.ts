import axios from 'axios'
import { LocalStorageKey, Tokens, UserInfo } from '../models';
import { LoginFormValues } from '../pages/Login/models';

export const loginUser = async (dataUser: LoginFormValues) => {
    const json = await axios.post('api/token/', dataUser)
    const tokens: Tokens = json.data
    return tokens
}