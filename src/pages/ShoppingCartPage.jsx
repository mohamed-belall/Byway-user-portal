import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { cartWithPersistenceAtom } from "../atoms/cartAtom";
import { useNavigate } from "react-router-dom";
import useCartServices from "../services/CartServices";
import LoadingSpinner from "../components/common/Spinner/LoadingSpinner";

const ShoppingCartPage = () => {
  const { getCartItems, removeItem } = useCartServices();
  const [loadingId, setLoadingId] = useState(null);
 
  const [cart, setCart] = useAtom(cartWithPersistenceAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const featchCart = async () => {
      try {
        const updatedCart = await getCartItems();
      
        if (updatedCart.success) {
          setCart(updatedCart.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    featchCart();
  }, []);

  const removeFromCart = async (id) => {
    setLoadingId(id);
    try {
      const response = await removeItem(id);
      if (response.success) {
        const updatedCart = await getCartItems();
        
        if (updatedCart.success) {
          setCart(updatedCart.data);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingId(null);
    }
  };
  const renderStars = (Rate) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Rate ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="flex flex-col px-20 py-20 pb-40 gap-7 w-full">
      {/* header */}
      <h1 className="text-4xl font-bold">Shopping Cart</h1>

      {/* content */}
      <div className="flex flex-row gap-14 justify-between">
        {/* cart items */}
        <div className="flex-4 flex flex-col gap-7">
          {/* cart count */}
          <h3 className="border-b-2 border-b-gray-200 w-full">
            {cart.items.length} Courses in Cart
          </h3>

          {/* cart item */}
          <div className="flex flex-col gap-5">
            {cart.items.length === 0 ? (
              <div> Your Cart is Empty </div>
            ) : (
              cart.items.map((course, index) => (
                <div
                  key={index}
                  className="flex flex-row justify-between  gap-5 border-2 border-gray-200 shadow-md rounded-xl p-3 w-full"
                >
                  <div className="flex flex-row  gap-5">
                    {/* cover */}
                    <img
                      src={course.coverURL}
                      alt=""
                      className="rounded-xl  w-60 h-35 object-cover"
                    />
                    {/* details */}
                    <div className="flex flex-col gap-1 items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">{course.name}</h1>
                        <div className="font-semibold text-gray-500">
                          By {course.instructorName}
                        </div>
                        <div className="flex flex-row gap-1 font-semibold">
                          <div className="text-yellow-400">{course.rate}</div>
                          {renderStars(course.rate)}
                          <div>| {course.totalHours} Total Hours</div>
                          <div>{course.totalLectures} Lecture.</div>
                          <div>{course.level}</div>
                        </div>
                      </div>
                      <button
                        className={`${
                          loadingId === course.id
                            ? "flex justify-center bg-red-100 text-black "
                            : "bg-red-500 text-white"
                        }   px-6 py-2 rounded-lg font-semibold`}
                        onClick={() => removeFromCart(course.id)}
                      >
                        {loadingId === course.id
                          ? <LoadingSpinner />
                          : "Remove"}
                      </button>
                    </div>
                  </div>
                  {/* price */}
                  <h1 className="font-bold text-3xl">${course.price}</h1>
                </div>
              ))
            )}
          </div>
        </div>

        {/* order details */}
        <div className="flex-1 flex flex-col  gap-4">
          {/* header */}
          <h1 className="text-2xl font-bold">Order Details</h1>

          {/* details */}
          <div className="flex flex-col gap-3 p-3 bg-myBg rounded-2xl border-2 border-blue-200">
            <div className="flex flex-row justify-between">
              <div className="text-lg">price</div>
              <div className="font-bold text-lg">${cart.subtotal}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-lg">Discount</div>
              <div className="font-bold text-lg">$0.00</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-lg">Tax</div>
              <div className="font-bold text-lg">${cart.tax}</div>
            </div>
            <div className="flex flex-row justify-between border-t-2 border-t-gray-200 pt-3">
              <div className="text-xl font-bold ">Total</div>
              <div className="font-bold text-lg">${cart.total}</div>
            </div>
          </div>

          {cart.items.length === 0 ? (
            <button
              className="border-2 border-gray-300 text-gray-300 rounded-xl py-5 font-bold text-lg"
              disabled
              onClick={() => navigate("/ShoppingCart/Checkout")}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button
              className="bg-black text-white rounded-xl py-5 font-bold text-lg"
              onClick={() => navigate("/ShoppingCart/Checkout")}
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
