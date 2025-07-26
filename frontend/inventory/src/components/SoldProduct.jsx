import { useRef } from "react";
import { sold_product } from "../store/api";
function SoldProduct() {
    const codeRef=useRef(null);
    const quanityRef=useRef(null);
    const soldSubmit=()=>{
        const code=codeRef.current.value;
        let quantity=(quanityRef.current.value);
        quantity=parseInt(quantity)

        const obj={
            code,
            "qnt":quantity
        }

        sold_product(obj).
        then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    
    }
  return (
    <div>
        <h1>Sold Product</h1>
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
    
      <button onClick={soldSubmit}>submit</button>
    </div>
  );
}
export default SoldProduct;
