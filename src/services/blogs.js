import axios from "axios"
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/blogs`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (blog, token) => {
    const config = {
        headers: { Authorization: token },
    }
    const result = await axios.post(baseUrl, blog, config)
    return result.data
}

const deleteBlog = async (blog, token) => {
    const config = {
        headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const comment = async (id, comment) => {
    const result = await axios.post(`${baseUrl}/${id}/comments`, { comment })
    return result.data
}

const updateLikes = async blog => {
    const result = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes })
    return result.data
}

export default { getAll, create, deleteBlog, comment, updateLikes }