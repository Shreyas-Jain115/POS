import axios from 'axios'
const base_url='http://127.0.0.1:5000/'
const create_product=async(data)=>{
    return axios.post(`${base_url}product/create`,data)
}

const sold_product=async(data)=> {
    return axios.patch(`${base_url}product/soldByQnt`,data)
}

const add_poduct=async(data)=> {
    return axios.patch(`${base_url}product/add`,data)
}

const getAllProduct=async ()=> {
    return axios.get(`${base_url}product/get/leftall`)
}

const getAllProductSold=async ()=> {
    return axios.get(`${base_url}product/get/soldall`)
}


export{create_product,sold_product,getAllProduct,getAllProductSold,add_poduct}