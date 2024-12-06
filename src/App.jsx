import { useState } from 'react'
import Header from './components/Header'
import Desserts from './components/Desserts'
import Cart from './components/Cart'


function App() {
  const [selectedDesserts, setSelectedDesserts] = useState({})
  const [orderQuantity, setOrderQuantity] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const dessertsList = Object.values(selectedDesserts)
  const totalPrice = Object.values(selectedDesserts).reduce(
    (acc, dessert) => acc + dessert.price * dessert.quantity,
    0
  );
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
    setOrderQuantity({}); 
  };

  // Handle removing dessert from the cart and reset its quantity
  const handleRemoveDessert = (dessertId) => {
    console.log('Removing')
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
    <div className='w-[90%] md:flex md:justify-between md:gap-9 mx-auto mt-4 bg-rose-0 md:max-w-[1500px]'>
      <div className="md:w-[80%]">
        <Header   toggleCart={toggleCart}totalPrice={totalPrice} isCartOpen={isCartOpen} dessertsList={dessertsList} onRemove={handleRemoveDessert} resetList={resetSelectedDesserts}/>
        <Desserts quantity={orderQuantity} selectedDesserts={selectedDesserts} handleAddToCart={handleAddToCart}  resetQuantity={handleRemoveDessert} />
      </div>
      <div className=" md:w-[25%] hidden md:block ">
        <Cart
          dessertsList={dessertsList}
          removeDesserts={handleRemoveDessert}
          totalPrice={totalPrice}
          resetList = {resetSelectedDesserts}
          closeCart={() => setIsCartOpen(false)}
        />
      </div>
    </div>
  )
}

export default App
