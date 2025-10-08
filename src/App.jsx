import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/Auth/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Layout from "./Layout/Layout";
import SignUpPage from "./pages/Auth/SignUpPage";
import CoursesPage from "./pages/Course/CoursesPage";
import CourseDetailsPage from "./pages/Course/CourseDetailsPage";
import ScrollToTop from "./components/common/ScrollToTop";
import Breadcrumbs from "./components/common/Breadcrumbs";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PurchaseCompletePage from "./pages/PurchaseCompletePage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/LMS"
            element={
              <Layout>
                <LandingPage />
              </Layout>
            }
          />

          <Route
            path="/Courses"
            element={
              <ProtectedRoute>
                <Layout>
                  <Breadcrumbs />
                  <CoursesPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ShoppingCart"
            element={
              <ProtectedRoute>
                <Layout>
                  <Breadcrumbs />
                  <ShoppingCartPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ShoppingCart/Checkout"
            element={
              <ProtectedRoute>
                <Layout>
                  <Breadcrumbs />
                  <CheckoutPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/ShoppingCart/Checkout/PurchaseComplete"
            element={
              <ProtectedRoute>
                <Layout>
                  <Breadcrumbs />
                  <PurchaseCompletePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/Courses/CourseDetails/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <Breadcrumbs />
                  <CourseDetailsPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/LMS" replace />} />
          <Route
            path="/Courses/CourseDetails"
            element={<Navigate to="/Courses" replace />}
          />

          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUpPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
