import { useRef } from "react";
import { sold_product,add_poduct } from "../store/api";
function AddOrSell() {
    const codeRef=useRef("");
    const soldRef=useRef(0);
    const addRef=useRef(0);
    const soldSubmit=()=>{
        const addQnt=parseInt(addRef.current.value);
        const soldQnt=parseInt(soldRef.current.value);

        const obj={
            code,
            "qnt":soldQnt
        }

        sold_product(obj).
        then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })

        const obj1={
            code,
            "qnt":addQnt
        }

        add_poduct(obj).
        then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    
    }
  return (
    <div>
        <input
        ref={codeRef}
          type="text"
          className="form-control"
          placeholder="product code"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      <div class="input-group flex-nowrap">
        <input
        ref={addRef}
          type="text"
          className="form-control"
          placeholder="enter Quantity to add (else enter 0)"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          Product Quantity:
        </span>
        <input
            ref={soldRef}
          type="number"
          className="form-control"
          placeholder="enter quanrtity to sell(else enter 0)"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        />
      </div>
    
      <button onClick={soldSubmit}>submit</button>
    </div>
  );
}
export default AddOrSell;