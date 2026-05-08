import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      await authApi.Register({
        userName: data.userName,
        email: data.email,
        country: data.country,
        phoneNumber: data.phoneNumber,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      toast.success("Account created successfully! Please check your email.");
      navigate("/verify-account");
    } catch (error) {
      // Safely dig into the nested error structure — any level could be undefined
      const message =
        error?.response?.data?.additionalInfo?.errors?.password?.[0] ||
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div>
      <div className="title mb-4">
        <h5 className="fw-semibold">Register</h5>
        <span style={{ color: "#8391A1", fontSize: "14px" }}>
          Welcome Back! Please enter your details
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row g-4" style={{ justifyContent: "space-between" }}>
          {/* Username */}
          <div style={{ width: "45%" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 line-right">
                <i className="bi bi-person" style={{ color: "#8391A1" }}></i>
              </span>
              <input
                type="text"
                {...register("userName", { required: "Username is required" })}
                className="form-control bg-light border-start-0 ps-0 focus-none"
                style={{ paddingTop: "10px", paddingBottom: "10px", border: "none" }}
                placeholder="UserName"
              />
            </div>
            {errors.userName && (
              <p className="text-danger mt-1" style={{ fontSize: "13px" }}>
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div style={{ width: "45%" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 line-right">
                <i className="bi bi-envelope" style={{ color: "#8391A1" }}></i>
              </span>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="form-control bg-light border-start-0 ps-0 focus-none"
                style={{ paddingTop: "10px", paddingBottom: "10px", border: "none" }}
                placeholder="Enter your E-mail"
              />
            </div>
            {errors.email && (
              <p className="text-danger mt-1" style={{ fontSize: "13px" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div style={{ width: "45%" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 line-right">
                <i className="bi bi-globe" style={{ color: "#8391A1" }}></i>
              </span>
              <input
                type="text"
                {...register("country", { required: "Country is required" })}
                className="form-control bg-light border-start-0 ps-0 focus-none"
                style={{ paddingTop: "10px", paddingBottom: "10px", border: "none" }}
                placeholder="Country"
              />
            </div>
            {errors.country && (
              <p className="text-danger mt-1" style={{ fontSize: "13px" }}>
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div style={{ width: "45%" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 line-right">
                <i className="bi bi-phone" style={{ color: "#8391A1" }}></i>
              </span>
              <input
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                })}
                className="form-control bg-light border-start-0 ps-0 focus-none"
                style={{ paddingTop: "10px", paddingBottom: "10px", border: "none" }}
                placeholder="PhoneNumber"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-danger mt-1" style={{ fontSize: "13px" }}>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ width: "45%" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 line-right">
                <i className="bi bi-lock" style={{ color: "#8391A1" }}></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="form-control bg-light border-start-0 ps-0 focus-none"
                style={{ paddingTop: "10px", paddingBottom: "10px", border: "none" }}
                placeholder="Password"
              />
              <span
                className="input-group-text bg-light border-start-0"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}
                  style={{ color: "#8391A1" }}
                ></i>
              </span>
            </div>
            {errors.password && (
              <p className="text-danger mt-1" style={{ fontSize: "13px" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div style={{ width: "45%" }}>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 line-right">
                <i className="bi bi-lock" style={{ color: "#8391A1" }}></i>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="form-control bg-light border-start-0 ps-0 focus-none"
                style={{ paddingTop: "10px", paddingBottom: "10px", border: "none" }}
                placeholder="Confirm Password"
              />
              <span
                className="input-group-text bg-light border-start-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`bi ${showConfirmPassword ? "bi-eye" : "bi-eye-slash"}`}
                  style={{ color: "#8391A1" }}
                ></i>
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-danger mt-1" style={{ fontSize: "13px" }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Login link */}
        <div className="text-end mt-3">
          <Link
            to="/login"
            className="fw-semibold text-decoration-none"
            style={{ fontSize: "13px", color: "#009247" }}
          >
            Login Now?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn w-50 text-white fw-semibold mt-3"
          style={{
            background: "linear-gradient(135deg, #009247 0%, #00c46a 100%)",
            borderRadius: "8px",
            padding: "10px",
            margin: "0 auto",
            display: "block",
            border: "none",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
