import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `http://${import.meta.env.VITE_SERVER_BASE_URL}/api/v1`,
})

export default axiosClient
