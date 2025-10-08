import React, { useEffect, useState } from "react";
import lmsImage from "../../assets/lms.jpg";
import { useAtom } from "jotai";
import { authAtom, loadingAtom } from "../../atoms/auth";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import useCartServices from "../../services/CartServices";
import { cartWithPersistenceAtom } from "../../atoms/cartAtom";
import GoogleAuthButton from "../../components/Auth/GoogleAuthButton";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [cart, setCart] = useAtom(cartWithPersistenceAtom);
  const { getCartItems } = useCartServices();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    displayName: "",
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await authService.signUp(formData);

      setAuth({
        isAuthenticated: true,
        token: data.data.token,
      });

      navigate("/LMS");
    } catch (e) {
      setError(err.response?.data?.message || "Login Faild");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const featchCart = async () => {
      try {
        const updatedCart = await getCartItems();

        if (updatedCart.success) {
          setCart(updatedCart.data);
        }
      } catch (e) {}
    };
    featchCart();
  }, [auth.isAuthenticated == true]);

  return (
    <div className="flex h-screen items-center justify-center">
      {/* left section */}
      <div className="w-1/2 mx-20 my-20 shadow-2xl border border-gray-300 rounded-xl  overflow-hidden ">
        <img src={lmsImage} alt="lms" className="object-fill" />
      </div>

      {/* right section */}

      <div className="flex w-1/2 flex-col justify-center px-20 bg-white">
        <div className=" w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fname  , Lname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex flex-row gap-4">
                <input
                  type="text"
                  name="fName"
                  value={formData.fName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <input
                  type="text"
                  name="lName"
                  value={formData.lName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* confirm password */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confrimPassword"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-black/40" : "bg-black cursor-pointer"
              }  text-white py-2 rounded-md font-medium hover:bg-gray-800 transition`}
            >
              {loading
                ? "Creating Account In progress ..."
                : "Create Account →"}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center pt-3 ">
            You already have an account please
            <button
              className="text-blue-700 font-bold cursor-pointer pl-1"
              onClick={() => navigate("/Login")}
            >
              Sign In
            </button>
          </div>
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Sign in with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="flex justify-center items-center  gap-4">
            <button className=" flex items-center justify-center px-2 gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-5 h-5"
              />
              Facebook
            </button>

            <div className="px-2">
              <GoogleAuthButton />
            </div>

            <button className=" flex items-center justify-center px-2 gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
              <img
                src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
                alt="Microsoft"
                className="w-5 h-5"
              />
              Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
