import axiosClient from "../axiosClient"

export const getTags= async () => {
    return axiosClient.get('/tag')
}