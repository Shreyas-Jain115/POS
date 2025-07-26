import { useRef } from "react";
import { create_product } from "../store/api";
function CreateProduct() {
    const nameRef=useRef(null);
    const codeRef=useRef(null);
    const catogryRef=useRef(null);
    const priceRef=useRef(null);
    const dateRef=useRef(null)
    const quanityRef=useRef(null);
    const handleSubmit=()=>{
        const name=nameRef.current.value;
        const code=codeRef.current.value;
        const catogry=catogryRef.current.value;
        const price=priceRef.current.value;
        const quantity=quanityRef.current.value;
        const exp_date=dateRef.current.value;

        const obj={
            name,code,catogry,price,quantity,exp_date
        }

        create_product(obj).
        then((res)=>{
            if(res.data=='success') {

            }
            else {
                alert("Error check you input")
            }
        })
        .catch((err)=>{
            console.log(err);
        })
        
  
    
    }
  return (
    <div>
        <h1>Add New Product</h1>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          Product Name:
        </span>
        <input
            ref={nameRef}
          type="text"
          className="form-control"
          placeholder="Iphone"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          Product Code:
        </span>
        <input
        ref={codeRef}
          type="text"
          className="form-control"
          placeholder="Barcode"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          Product Price:
        </span>
        <input
            ref={priceRef}
          type="number"
          className="form-control"
          placeholder="Price"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          Product Quantity:
        </span>
        <input
            ref={quanityRef}
          type="number"
          className="form-control"
          placeholder="3"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          Product Catogry:
        </span>
        <input
        ref={catogryRef}
          type="text"
          className="form-control"
          placeholder="electronics"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          Expire Date:
        </span>
        <input
        ref={dateRef}
          type="date"
          className="form-control"
          placeholder="2024-12-01"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}
export default CreateProduct;
