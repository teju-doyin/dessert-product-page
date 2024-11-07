import React, { useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import Cart from './Cart';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from './ui/drawer'; // Adjust import path if needed

const Header = ({desserts, onRemove, resetList}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const dessertsList = Object.values(desserts)
  const totalPrice = Object.values(desserts).reduce(
    (acc, dessert) => acc + dessert.price * dessert.quantity,
    0
  );
  

  return (
    <div className='flex items-center justify-between sticky top-0 z-10 py-1 bg-[#fcf9f7]'>
      <h1 className='text-rose-950 text-4xl font-extrabold'>Desserts</h1>
      
      {/* Cart Icon as Drawer Trigger */}
      <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DrawerTrigger asChild>
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <IoCartOutline className='text-rose-950' size={30} />
            <span className='absolute bottom-4 left-4 bg-rose-800 text-white rounded-full px-1.5 text-[.6rem]'>{dessertsList.length === 0? '':dessertsList.length}</span>
          </div>
        </DrawerTrigger>

        {/* Drawer Content for Cart */}
        <DrawerContent>
          {/* <DrawerClose asChild>
            <button className="close-cart-button" onClick={toggleCart}>Close</button>
          </DrawerClose> */}
          <Cart 
            dessertsList={dessertsList} 
            removeDesserts={onRemove} 
            totalPrice={totalPrice} 
            resetList = {resetList}
            closeCart={() => setIsCartOpen(false)} />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Header;
