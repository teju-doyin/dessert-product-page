import React, { useState, useEffect } from 'react';
import cart from '/assets/images/icon-add-to-cart.svg';
import plus from '/assets/images/icon-increment-quantity.svg';
import minus from '/assets/images/icon-decrement-quantity.svg';
import { Skeleton } from "@/components/ui/skeleton";

const Desserts = ({ handleAddToCart, resetQuantity, selectedDesserts }) => {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setTimeout(() => {
          setDesserts(data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching desserts:", error);
        setLoading(false);
      }
    };
    fetchDesserts();
  }, []);

  const increaseQuantity = (dessert) => {
    const newQuantity = (selectedDesserts[dessert.id]?.quantity || 0) + 1;
    handleAddToCart(dessert, newQuantity);
  };

  const decreaseQuantity = (dessert) => {
    const currentQuantity = selectedDesserts[dessert.id]?.quantity || 0;
    const newQuantity = currentQuantity - 1;

    if (newQuantity <= 0) {
      resetQuantity(dessert.id); 
    } else {
      handleAddToCart(dessert, newQuantity);
    }
  };

  if (loading) {
    return (
      <section>
        <div>
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="mb-8 mt-4">
              <Skeleton className="bg-rose300 w-full h-60 rounded-lg mb-12" />
              <Skeleton className="bg-rose300 h-4 w-1/5 mb-2" />
              <Skeleton className="bg-rose300 h-5 w-1/3 mb-2" />
              <Skeleton className="bg-rose300 h-4 w-1/5" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div>
        {desserts.map((dessert) => (
          <div key={dessert.id}>
            <div className="relative mt-3">
              <img
                src={dessert.image.mobile}
                alt={dessert.name}
                className={`rounded-xl ${selectedDesserts[dessert.id] ? 'border-2 border-red' : ''}`}
              />

              {!selectedDesserts[dessert.id] ? (
                <div
                  onClick={() => increaseQuantity(dessert)}
                  className="absolute flex gap-4 -bottom-6 left-[100px] bg-white border border-rose-950 cursor-pointer px-5 py-3 rounded-3xl"
                >
                  <img src={cart} alt="" />
                  <p className="font-semibold">Add to Cart</p>
                </div>
              ) : (
                <div className="absolute flex gap-8 -bottom-6 left-[100px] bg-red px-5 py-3 rounded-full">
                  <img
                    src={minus}
                    alt="decrease"
                    width={28}
                    onClick={() => decreaseQuantity(dessert)}
                    className="cursor-pointer border border-white rounded-full px-2 py-2"
                  />
                  <p className="font-semibold text-white mt-1">
                    {selectedDesserts[dessert.id]?.quantity || 0}
                  </p>
                  <img
                    src={plus}
                    alt="increase"
                    width={28}
                    onClick={() => increaseQuantity(dessert)}
                    className="cursor-pointer border border-white rounded-full px-2 py-2"
                  />
                </div>
              )}
            </div>
            <p className="mt-9 text-rose300">{dessert.category}</p>
            <h2 className="text-rose-950 font-semibold">{dessert.name}</h2>
            <p className="text-red font-semibold mb-9">${dessert.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Desserts;
