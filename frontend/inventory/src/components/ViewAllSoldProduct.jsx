import { useState,useEffect } from "react";
import { getAllProductSold } from "../store/api";
function ViewAllSoldProduct() {
    const [products,setProducts]=useState([])
    const [showType,setShowType]=useState("")
    const getAllProductSoldList=()=>{
        getAllProductSold().then(
            (response)=>{
                setProducts([...response.data])
                setShowType("notsold")
            }
        )
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div>
            <button onClick={getAllProductSoldList}>Get List Of All Left Product </button>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Code</th>
      <th scope="col">Catogry</th>
    <th scope="col">Quantity Left</th>
    </tr>
  </thead>
  <tbody>
            {showType==="notsold"&&products.map((data)=>(
                    <tr>
                    <th scope="row">{data.id}</th>
                    <td>{data.code}</td>
                    <td>{data.catogry}</td>
                    <td>{data.quantity}</td>
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
export default ViewAllSoldProduct;