import axios from 'axios'

const api = axios.create({
    baseURL: 'https://lojaprodutosmaquiagem-backend.onrender.com'
})

export default api