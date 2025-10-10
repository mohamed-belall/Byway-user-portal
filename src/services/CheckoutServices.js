

// import api from "./api";

// const PaymentServices = {
//   // addPayment: async (params) => {
//   //   const response = await api.post("/cart/checkout" , params );
//   //   if (!response.data.success) {
//   //     throw new Error(response.data.message || "faild to save payment method");
//   //   }

//   //   return response.data;
//   // },

//   addPayment: async (paymentData) => {
//     if (!paymentData) throw new Error("paymentData is required.");
//     const response = await api.post(
//       "/cart/addPayment",
//       paymentData,
//       { headers: getAuthHeader() }
//     );
//     if (!response.data.success) {
//       throw new Error(response.data.message || "faild to save payment method");
//     }
//     return response.data;
//   },

 
// };

// export default PaymentServices;







