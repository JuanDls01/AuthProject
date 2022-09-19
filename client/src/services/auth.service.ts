import axios from 'axios'
import dotenv from 'dotenv'
import { LoginFormValues } from '../components/loginForm/loginForm';
import { UserInfo } from '../models';
dotenv.config()
const baseUrl = process.env.REACT_APP_API || 'http://localhost:8000/';

axios.defaults.baseURL = baseUrl

export const getUser = async (dataUser: LoginFormValues) => {
    const json = await axios.post('http://localhost:8000/user/login', dataUser)
    const userInfo: UserInfo = json.data
    return userInfo
}