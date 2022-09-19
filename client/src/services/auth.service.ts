import axios from 'axios'
import { LoginFormValues } from '../components/loginForm/LoginForm';
import { UserInfo } from '../models';

export const getUser = async (dataUser: LoginFormValues) => {
    const json = await axios.post('http://localhost:8000/user/login', dataUser)
    const userInfo: UserInfo = json.data
    return userInfo
}