import { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaPaypal } from "react-icons/fa";
import Visa from "../assets/icons/visa.png";
import Mastercard from "../assets/icons/master.png";
import Paypal from "../assets/icons/paypal.png";

const PaymentForm = ({ onSubmit }) => {
  const [method, setMethod] = useState("card");

  const [form, setForm] = useState({
    country: "",
    city: "",
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...from, [e.target.name]: [e.target.value] });
  };
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

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        country: form.country,
        city: form.city,
        cardNumber: form.cardNumber,
        cardHolderName: form.cardHolderName,
        expirationDate: form.expirationDate,
        cvv: form.cvv,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded-lg p-6 space-y-6 bg-white shadow-sm"
    >
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
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
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
        <button
          type="submit"
          className="w-full bg-black text-white rounded-xl py-3 font-bold text-lg hover:bg-gray-800"
        >
          Confirm Payment
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
