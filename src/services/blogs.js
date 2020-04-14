import axios from "axios"
const baseUrl = "/api/blogs"

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

const updateLikes = async blog => await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes })

export default { getAll, create, deleteBlog, updateLikes }