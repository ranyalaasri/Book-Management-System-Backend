const axios = require ('axios')

const api = axios.create({
    baseURL: `http://localhost:8000/books`, 
    timeout : 2000,
    headers: {
        'Content-type' : 'application/json'
    }
})

exports.axiosGetBooks = async () => {
    return api.get('/');
}

exports.axiosgetSingleBook = async (id) => {
    return api.get(`/${id}`)
}

exports.axiosDeleteBooks = async (id) => {
    return api.delete(`/${id}`)
}

exports.axiosCreateBook = async (data) => {
    return api.post('/',data)
}

exports.axiosUpdateBooks = async (id,data) => {
    return api.patch(`/${id}`,data)
}

