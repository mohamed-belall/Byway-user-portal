

import { useAtom } from "jotai";
import api from "./api";
import { authAtom } from "../atoms/auth";


const useCartServices = () => {
  
  const [auth] = useAtom(authAtom);

  const getAuthHeader = () => {

    if (!auth?.token) throw new Error("User is not authenticated.");
    return { Authorization: `Bearer ${auth.token}` };
  };



  const CartServices = {

      addToCart: async (courseId) => {
        if (!courseId) throw new Error("CourseId is required.");
        const response = await api.post(
          `/cart/add/${courseId}`,
          {},
          { headers: getAuthHeader() }
        );
        return response.data;
      },

      removeItem: async (courseId) => {
        if (!courseId) throw new Error("CourseId is required.");
        const response = await api.delete(
          `/cart/remove/${courseId}`,
          { headers: getAuthHeader() }
        );
        return response.data;
      },

      getCartItems: async () => {
        const response = await api.get(
          `/cart`,
          { headers: getAuthHeader() }
        );
        return response.data;
      },


      checkout: async (paymentData) => {
        if (!paymentData) throw new Error("paymentData is required.");
        const response = await api.post(
          "/cart/checkout",
          paymentData,
          { headers: getAuthHeader() }
        );
        return response.data;
      },
     
    };
  return CartServices;
};

export default useCartServices;
