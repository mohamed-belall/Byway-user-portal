

import api from "./api";

const CheckoutServices = {
  addPayment: async (params) => {
    const response = await api.post("/cart/checkout" , params );
    if (!response.data.success) {
      throw new Error(response.data.message || "faild to save payment method");
    }

    return response.data;
  },

 
};

export default CheckoutServices;







