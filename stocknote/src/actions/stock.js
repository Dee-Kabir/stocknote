import {API} from '../Config'

export const newStock = async(data,token) => {
    return fetch(`${API}/new`,{
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body : data
    }).then(response => response.json())
    .catch(err => console.log(err)) 
}
export const getStockList = async (token) => {
    return fetch(`${API}/get-stock-list`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json())
    .catch(err => console.log(err)) 
}
export const searchList = async (token) => {
    return fetch(`${API}/search`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json())
    .catch(err => console.log(err)) 
}
export const getStock = async (id,token) => {
    return fetch(`${API}/read/${id}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json())
    .catch(err => console.log(err))
}
export const update = async (data,token,id) => {
    return fetch(`${API}/update/${id}`,{
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body : data
    }).then(response => response.json())
    .catch(err => console.log(err)) 
} 
export const removestock = async(id,token) => {
    return fetch(`${API}/delete/${id}`,{
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then(response => response.json())
    .catch(err => console.log(err)) 
}