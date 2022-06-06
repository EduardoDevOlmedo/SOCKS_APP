
import axios from "axios"

const socksApi = axios.create(
    {
        baseURL: '/api'
    }
) 

export default socksApi