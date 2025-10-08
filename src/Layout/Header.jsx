import { useAtom } from "jotai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { authAtom } from "../atoms/auth";
import authService from "../services/authService";
import { cartWithPersistenceAtom, defaultCart } from "../atoms/cartAtom";
import LMSLogo from "../assets/icons/lms.png";
import useCartServices from "../services/CartServices";

const Header = () => {
  const { getCartItems, addToCart, removeItem, checkout } = useCartServices();

  const [auth, setAuth] = useAtom(authAtom);
  const [cart, setCart] = useAtom(cartWithPersistenceAtom);

  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-10 py-4 shadow-sm bg-white">
      {/* Logo */}
      <button
        className="flex items-center gap-2"
        onClick={() => navigate("/LMS")}
      >
        <img src={LMSLogo} alt="Byway" className="w-8 h-8" />
        <span className="text-lg font-semibold">Byway</span>
      </button>

      {/* Right Side */}
      <div className="flex items-center gap-7">
        <button
          className="text-gray-700 font-medium cursor-pointer"
          onClick={() => navigate("/Courses")}
        >
          Courses
        </button>

        {!auth.isAuthenticated ? (
          // When logged out
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/Login")}
              className="px-4 py-2 border rounded-lg font-medium"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/SignUp")}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium"
            >
              Sign Up
            </button>
          </div>
        ) : (
          // When logged in
          <div className="flex items-center gap-7">
            {/* Cart */}
            <button
              className="relative cursor-pointer"
              onClick={() => navigate("/ShoppingCart")}
            >
              <FaShoppingCart size={24} />
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-md rounded-full px-2">
                {cart.items.length}
              </span>
            </button>

            {/* Logout */}
            <button
              onClick={() => {
                authService.logout();
                setAuth({
                  isAuthenticated: false,
                });
                setCart(defaultCart);
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaSignOutAlt size={20} />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold cursor-pointer">
              J
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
