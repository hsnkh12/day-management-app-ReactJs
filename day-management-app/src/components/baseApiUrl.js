import Axois from 'axios'



export const ApiUrl = Axois.create({
    baseURL:"",
    headers:{
        Authorization : "Token "+localStorage.getItem("Token")
    }
})
