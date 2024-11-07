import React, { useState } from 'react'
import close from '../../public/assets/images/icon-remove-item.svg'
import tree from '../../public/assets/images/icon-carbon-neutral.svg'
import cake from '../../public/assets/images/illustration-empty-cart.svg'
import greenTick from '../../public/assets/images/icon-order-confirmed.svg'

const Cart = ({dessertsList, removeDesserts, totalPrice, closeCart, resetList}) => {
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const handleConfirmOrder = () => {
    if (orderConfirmed) {
      closeCart();
      resetList();
    } else {
      setOrderConfirmed(true);
    }
  }

  return (
    <section className='bg-white rounded-md '>
      <div className="w-[90%] mx-auto">
        {orderConfirmed ?
        <div>
          <img src={greenTick} alt="" />
          <h1 className='text-3xl font-extrabold  py-2'>Order <br />Confirmed</h1>
          <p>We hope you enjoy your food!</p>
        </div>
        :
        <h1 className='text-2xl font-extrabold text-red py-5'>Your Cart ({dessertsList.length})</h1>
      }
       {dessertsList.length === 0?
       <div className='flex flex-col gap-5 justify-center items-center'>
          <img src={cake} alt="" />
          <p className='text-rose-950 font-semibold mb-12'>Your added items will appear here</p>
       </div>
       : 
       <>
        <div className={`${orderConfirmed?'bg-rose50 rounded-md  my-7 py-5':''}`}>
          <div className="max-h-[15rem] overflow-y-auto smooth-scroll">
           { dessertsList.map((dessert) => (
            orderConfirmed? 
              <div key = {dessert.id} className='w-[90%] mx-auto'>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={dessert.image.thumbnail} width={60} alt="" className='rounded-md' />
                    <div className="">
                      <p className='text-black font-semibold mb-2'>{dessert.name}</p>
                      <p>
                        <span className='font-semibold text-red mr-4'>{dessert.quantity}x</span>
                        <span className='font-light text-rose-950 mr-2'>@ ${dessert.price.toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                  <span className='font-semibold text-rose-950'>${(dessert.quantity * dessert.price).toFixed(2)}</span>
                </div>
                <div className="bg-[#e2e2d8] h-[1px] my-4" ></div>
              </div>
              :
              <div key = {dessert.id} className=''>
          
                <div className="flex justify-between items-center">
                  <div className="">
                    <p className='text-black font-semibold mb-2'>{dessert.name}</p>
                    <p>
                      <span className='font-semibold text-red mr-4'>{dessert.quantity}x</span>
                      <span className='font-light text-rose-950 mr-2'>@ ${dessert.price.toFixed(2)}</span>
                      <span className='font-semibold text-rose-950'>${(dessert.quantity * dessert.price).toFixed(2)}</span>
                    </p>
                  </div>
                  <img src={close} alt="" onClick={()=>removeDesserts(dessert.id)}  className='border border-[#bfbfac] p-0.5 rounded-full cursor-pointer'/>
                </div>
                <div className="bg-[#e2e2d8] h-[1px] my-4" ></div>
              </div>))}
          </div>
          <div className={`flex justify-between items-center ${orderConfirmed?'w-[90%] mx-auto mt-3':''} `}>
            <p>Order Total</p>
            <p className='text-2xl font-semibold'>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
       { !orderConfirmed && <div className="flex gap-3 justify-center py-3 my-5 items-center bg-[#fcf9f7] rounded-md">
          <img src={tree} alt="" />
          <p>This is a <span className="font-semibold">carbon-neutral</span> delivery</p>
        </div>}
        <button onClick={handleConfirmOrder} className='bg-red text-white text-[1.2rem] rounded-full w-full py-4 mb-6'>{`${orderConfirmed?'Start New Order':'Confirm Order'}`}</button>
        </>}
      </div>
    </section>
  )
}

export default Cart