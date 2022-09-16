import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()
const baseUrl = process.env.REACT_APP_API || 'http://localhost:8000/';

axios.defaults.baseURL = baseUrl

