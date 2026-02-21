import axios from "axios";
const api=axios.create({
    //baseURL: 'http://localhost:3000'
    baseURL: 'http://mern-bookstore-2lag.onrender.com'
})
export default api
