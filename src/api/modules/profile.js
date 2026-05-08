import axiosClient from "../axiosClient"

export const getProfile =  () => {

    return axiosClient.get('/Users/currentUser')
}
    