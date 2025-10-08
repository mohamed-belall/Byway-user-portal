import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authAtom } from "../../atoms/auth";
import authService from "../../services/authService";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAtom(authAtom);

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await authService.googleLogin({ token });

      setAuth({
        isAuthenticated: true,
        token: response.token,
      });

      navigate("/LMS");
    } catch (e) {
      console.error("Google login failed:", error);
    }
  };
  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Google Login Failed")}
        
      />
    </div>
  );
};

export default GoogleAuthButton;
