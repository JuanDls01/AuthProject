import axios from 'axios'
import { Tokens } from '../models';
import { LoginFormValues } from '../pages/Login/models';

export const loginUser = async (dataUser: LoginFormValues) => {
    const json = await axios.post('api/token/', dataUser)
    const tokens: Tokens = json.data
    return tokens
}