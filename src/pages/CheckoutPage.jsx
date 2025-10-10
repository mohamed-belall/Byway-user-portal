import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { cartWithPersistenceAtom, defaultCart } from "../atoms/cartAtom";
import { useNavigate } from "react-router-dom";
import { TbDiscount } from "react-icons/tb";
import useCartServices from "../services/CartServices";
import Visa from "../assets/icons/visa.png";
import Mastercard from "../assets/icons/master.png";
import Paypal from "../assets/icons/paypal.png";
import LoadingSpinner from "../components/common/Spinner/LoadingSpinner";


const CheckoutPage = () => {
  const { getCartItems, checkout , addPayment } = useCartServices();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
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

  // form
  const [method, setMethod] = useState("card");

  const [form, setForm] = useState({
    country: "",
    city: "",
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [errors, setErrors] = useState({});
  const validate = () => {
    const newErrors = {};
    
    if (!form.country) newErrors.country = "Country is required";
    if (!form.city) newErrors.city = "City is required";
    if (method === "card") {
      if (!form.cardHolderName)
        newErrors.cardHolderName = "Card holder name is required";
      if (!form.cardNumber.match(/^(4\d{12}(\d{3})?|5[1-5]\d{14})$/))
        newErrors.cardNumber = "Enter a valid Visa or MasterCard number";
      if (!form.expirationDate.match(/^\d{4}-\d{2}-\d{2}$/))
        newErrors.expirationDate = "Use format YYYY-MM-DD";
      if (!form.cvv.match(/^\d{3,4}$/))
        newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
   
    setLoadingCheckout(true);
    e.preventDefault();
    try {
      if (validate()) {
        console.log(form);
          handelCheckout(form);
    
      }
    } catch (e) {
      console.error(e);
    }
   
  };
  const handelCheckout = async (paymentData) => {
    try {
      
      if (method === "paypal") {
        const response = await checkout();
       
        if (response.success) {
          navigate("/ShoppingCart/Checkout/PurchaseComplete");
          setLoadingCheckout(false);
        }

      }else if(method === "card")
      {
        const response1 = await checkout();
        const response2 = await addPayment(paymentData);
        if (response1.success && response2.success) {
          navigate("/ShoppingCart/Checkout/PurchaseComplete");
          setLoadingCheckout(false);
        }
      }

     
      setCart(defaultCart);
    } catch (e) {
      console.error(e);
    } 
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col px-20 py-20 pb-40 gap-7 w-full">
        {/* header */}
        <h1 className="text-4xl font-bold">Checkout Page</h1>

        {/* content */}
        <div className="flex flex-row gap-14 justify-between">
          {/* cart items */}
          <div className="flex-4 flex flex-col gap-7">
            {/* cart item */}

            <div className="border border-gray-300 rounded-lg p-6 space-y-6 bg-white shadow-sm">
              {/* Country / State */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State/Union Territory
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Enter State"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Payment Method
                </h3>

                {/* Credit/Debit Card */}
                <div className="border border-gray-300 bg-myBg rounded-lg p-4 mb-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={method === "card"}
                      onChange={() => setMethod("card")}
                      className="text-blue-600 "
                    />
                    <span className="font-medium">Credit/Debit Card</span>
                    <span className="ml-auto flex items-center gap-0 text-xl text-gray-500">
                      <img
                        src={Visa}
                        alt={"VisaVisa"}
                        className=" w-15  object-cover"
                      />
                      <img
                        src={Mastercard}
                        alt={"Mastercard"}
                        className=" w-12  object-cover"
                      />
                    </span>
                  </label>

                  {method === "card" && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <input
                          type="text"
                          name="cardHolderName"
                          placeholder="Name on card"
                          value={form.cardHolderName}
                          onChange={handleChange}
                          className="w-full rounded-lg bg-white border  border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.cardHolderName && (
                          <p className="text-red-500 text-sm">
                            {errors.cardHolderName}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="Card Number"
                          value={form.cardNumber}
                          onChange={handleChange}
                          className="w-full rounded-lg bg-white border  border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm">
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          name="expirationDate"
                          placeholder="YYYY-MM-DD"
                          value={form.expirationDate}
                          onChange={handleChange}
                          className="rounded-lg bg-white border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.expirationDate && (
                          <p className="text-red-500 text-sm">
                            {errors.expirationDate}
                          </p>
                        )}
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={form.cvv}
                          onChange={handleChange}
                          className="rounded-lg bg-white border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-sm">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* PayPal */}
                <div className="border border-gray-300 bg-myBg rounded-lg p-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={method === "paypal"}
                      onChange={() => setMethod("paypal")}
                      className="text-blue-600"
                    />
                    <span className="font-medium">PayPal</span>
                    <span className="ml-auto text-blue-600 text-xl">
                      <img
                        src={Paypal}
                        alt={"paypal"}
                        className=" w-20  object-cover"
                      />
                    </span>
                  </label>

                  {method === "paypal" && (
                    <p className="mt-3 text-sm text-gray-600">
                      You’ll be redirected to PayPal to complete your payment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* order details */}
          <div className="flex-2 flex flex-col  gap-4">
            {/* header */}
            <h1 className="text-2xl font-bold">
              Order Details ({cart.length})
            </h1>

            {/* corse name */}
            <div className="flex flex-col  px-3 bg-myBg rounded-2xl border-2 border-blue-200">
              {cart.items.map((course, index) => (
                <div
                  key={index}
                  className="w-full max-w-lg truncate text-xl  font-semibold text-gray-700 overflow-hidden border-b-2 border-b-gray-200 last:border-b-0 py-3"
                >
                  {course.name}
                </div>
              ))}
            </div>
            {/* apply coupon code  */}
            <div className="flex flex-row items-center gap-3 p-3 bg-myBg rounded-2xl border-2 border-blue-200">
              <TbDiscount size={30} />{" "}
              <h3 className="text-lg font-semibold text-gray-600">
                APPLY COUPON CODED
              </h3>
            </div>
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

            {cart.length === 0 ? (
              <button
                className="border-2 border-gray-300 text-gray-300 rounded-xl py-5 font-bold text-lg"
                disabled
                onClick={() => handleSubmit}
              >
                Checkout
              </button>
            ) : (
              <button
                className={`${
                  loadingCheckout
                    ? "flex justify-center bg-black/40 text-white"
                    : "bg-black text-white"
                }  rounded-xl py-5 font-bold text-lg`}
                onClick={() => handleSubmit}
              >
                {loadingCheckout ? <LoadingSpinner /> : "Checkout"}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
