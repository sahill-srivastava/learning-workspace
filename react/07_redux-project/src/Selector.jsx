import { useSelector } from "react-redux";

const Selector = () => {
  // useSelector is a hook to use the reducer value
  //Subscribing/read to the store using the useSelector
  const cartItems = useSelector((store) => store.cart.items);

  console.log(cartItems)

  return (
    <>
    <div>{cartItems}</div>
    <div>{cartItems.length}</div>
    </>
  )
};

export default Selector;
