import axiosClient from "../axiosClient";


export const Login = (data) => {
    return axiosClient.post('/Users/Login', data)
}

export const Register = (data)=>{
    return axiosClient.post('/Users/Register', data)
}
export const changePassword = (data)=>{
    return axiosClient.put('/Users/ChangePassword', data)
}