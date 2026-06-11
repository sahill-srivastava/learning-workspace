import { useDispatch } from "react-redux"
import { addCartItem } from "./features/cartSlice";

const Dispatch = () => {

    const dispatch =  useDispatch();

    function handleAddItem() {
        dispatch(addCartItem("lahsun"))
    }

  return (
    <div>
        <button onClick={handleAddItem}>Add Item</button>
    </div>
  )
}

export default Dispatch