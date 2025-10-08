import api from "./api";

const authService = {
  login: async (credentials) => {
    
    const response = await api.post("/Account/login", credentials);


    if (!response.data.success) {
      throw new Error(response.data.message || "Login failed");
    }

    if (response.data.success && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
     
    }

   return response.data;
  },

  signUp: async (credentials) => {
 
    const response = await api.post("/Account/register", credentials);
  

    if (!response.data.success) {
      throw new Error(response.data.message || "Register Failed");
    }

   if (response.data.success && response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
    }

    return response.data;
  },

  googleLogin: async ({token }) => {
    try{
      
      const response = await api.post("/Account/google-login" , {token});
    
      if(response.data)
      {
        localStorage.setItem("token", response.data.token);
     

      }
     
      return response.data;
    }catch(error)
    {

      console.error("Google login faild" , error);
      throw error.response?.data || {message : "google login faild"};
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    localStorage.removeItem("role");
  },
};

export default authService;
