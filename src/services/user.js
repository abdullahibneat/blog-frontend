import axios from "axios"
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/users`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getByID = id => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const register = async user => {
    const response = await axios.post(baseUrl, user)
    return response.data
}

export default { getAll, getByID, register }