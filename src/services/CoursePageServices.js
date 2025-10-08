import api from "./api";

const buildQueryString = (params) => {
  const query = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value === undefined || value === null || value === "") return;

    
    if (Array.isArray(value)) {
      value.forEach((v) => query.append(key, v));
    } else {
      query.append(key, value);
    }
  });

  return query.toString();
};

const CoursePageServices = {
  getCourses: async (specParams = {}) => {
    const queryString = buildQueryString(specParams);
    const response = await api.get(`/UserCourses/AllCourses?${queryString}`);

    if (!response.data) {
      throw new Error("Failed to fetch courses");
    }

    return response.data;
  },

   getCourseById: async (id) => {

    const response = await api.get(`/UserCourses/Course/${id}`);

    if (!response.data) {
      throw new Error("Failed to fetch courses");
    }

    return response.data;
  },
   getTopCoursesWithCategoryId: async (categoryId) => {
    const response = await api.get(`/UserCourses/TopCoursesWithSpecificCategory?categoryId=${categoryId}`);
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to load caourses");
    }

    return response.data;
  },

};

export default CoursePageServices;
