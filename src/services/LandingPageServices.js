import api from "./api";

const LandingPageServices = {
  getCategories: async () => {
    const response = await api.get("/LandingPage/AllCategories");
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to load categories");
    }

    return response.data;
  },

  getTopCourses: async () => {
    const response = await api.get("/LandingPage/TopCourses");
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to load courses");
    }

    return response.data;
  },

  getTopInstructors: async () => {
    const response = await api.get("/LandingPage/TopInstructors");
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to load instrucotors");
    }

    return response.data;
  },
};

export default LandingPageServices;



