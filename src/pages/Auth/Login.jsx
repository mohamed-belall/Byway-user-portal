import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useAtom } from "jotai";
import { authAtom, loadingAtom } from "../../atoms/auth";
import { useEffect, useState } from "react";
import lmsImage from "../../assets/lms.jpg";
import { cartWithPersistenceAtom } from "../../atoms/cartAtom";
import useCartServices from "../../services/CartServices";
import GoogleAuthButton from "../../components/Auth/GoogleAuthButton";
import LoadingSpinner from "../../components/common/Spinner/LoadingSpinner";

export const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAtom(authAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [cart, setCart] = useAtom(cartWithPersistenceAtom);
  const { getCartItems } = useCartServices();

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
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
      const data = await authService.login(formData);

      setAuth({
        isAuthenticated: true,
        token: data.data.token,
      });

      navigate("/LMS");
    } catch (err) {
      setError(err.response?.data?.message);
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
      <div className="flex w-1/2 flex-col justify-center px-16 md:px-4 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div>
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

            {error && (
              <div
                className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
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
                loading ? " bg-black " : "bg-black cursor-pointer"
              } flex justify-center text-white py-2 rounded-md font-medium hover:bg-gray-800 transition `}
            >
              {loading ? <LoadingSpinner /> : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center pt-3">
            Don't Have An Account?
            <button
              className="text-blue-700 font-bold cursor-pointer  pl-1"
              onClick={() => navigate("/SignUp")}
            >
              Sign Up
            </button>
          </div>
          <div className="flex  items-center my-8">
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

      {/* right section */}
      <div className="w-1/2 md:w-1/3 text-start mr-10 my-30 shadow-2xl border border-gray-300 rounded-xl  overflow-hidden ">
        <img src={lmsImage} alt="lms" className="object-fill" />
      </div>
    </div>
  );
};
