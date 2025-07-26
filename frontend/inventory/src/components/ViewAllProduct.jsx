import { useState,useEffect } from "react";
import { getAllProduct } from "../store/api";
function ViewAllProduct() {
    const [products,setProducts]=useState([])
    const [showType,setShowType]=useState("")
    const getSoldProduct=()=>{
        getAllProduct().then(
            (response)=>{
                setProducts([...response.data])
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div>
            <button onClick={getSoldProduct}>Get List Of All Sold Product </button>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Code</th>
      <th scope="col">Catogry</th>
      <th scope="col">Price</th>
    <th scope="col">Quantity Left</th>
    <th scope="col">Expires</th>=
    </tr>
  </thead>
  <tbody>
            {products.map((data)=>(
                    <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.name}</td>
                    <td>{data.code}</td>
                    <td>{data.catogry}</td>
                    <td>{data.price}</td>
                    <td>{data.quantity}</td>
                    <td>{data.exp_date}</td>
                    </tr>
            ))}
            {showType==="sold"&&products.map((data)=>{
                <div key={data.id} class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{data.code}</h5>
                        <p class="card-text">Catogry:{data.catogry}</p>
                        <p class="card-text">Quantity Left:{data.quantity}</p>
                    </div>
                </div>
            })}
            </tbody>
            </table>
        </div>
    )
}
export default ViewAllProduct;