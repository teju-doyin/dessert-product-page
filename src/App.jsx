import { useState } from 'react'
import Header from './components/Header'
import Desserts from './components/Desserts'
import Cart from './components/Cart'


function App() {
  const [selectedDesserts, setSelectedDesserts] = useState({})
  const [orderQuantity, setOrderQuantity] = useState({});

  const handleAddToCart = (dessert, quantity) => {
    setSelectedDesserts((prev) => ({
      ...prev,
      [dessert.id]: {
        ...dessert,
        quantity,
      },
    }));
  };
  const resetSelectedDesserts = () => {
    setSelectedDesserts({});
    setOrderQuantity({}); // Reset order quantities as well
  };

  // Handle removing dessert from the cart and reset its quantity
  const handleRemoveDessert = (dessertId) => {
    setSelectedDesserts((prev) => {
      const updatedDesserts = { ...prev };
      delete updatedDesserts[dessertId];
      return updatedDesserts;
    });
    setOrderQuantity((prev) => {
      const updatedQuantities = { ...prev };
      delete updatedQuantities[dessertId];
      return updatedQuantities;
    });
  };
  // console.log(selectedDesserts)
  return (
    <div className='w-[90%] mx-auto mt-4 bg-rose-0'>
      {/* <Cart selectedDesserts={selectedDesserts}/> */}
      <Header desserts={selectedDesserts} onRemove={handleRemoveDessert} resetList={resetSelectedDesserts}/>
      <Desserts quantity={orderQuantity} selectedDesserts={selectedDesserts} handleAddToCart={handleAddToCart}  resetQuantity={handleRemoveDessert} />
    </div>
  )
}

export default App
