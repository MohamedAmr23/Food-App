import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data,
      );
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Password reset failed. Please try again.",
      );
    }
  };

  return (
    <div>
      <div className="title">
        <h5>Reset Password</h5>
        <span style={{ color: "#8391A1" }}>
          Please Enter Your Otp or Check Your Inbox
        </span>
      </div>

      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="input-group mb-2" style={{ color: "#8391A1" }}>
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
            style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
            placeholder="Enter your E-mail"
          />
        </div>
        {errors.email && (
          <p className="text-danger mb-2" style={{ fontSize: "13px" }}>
            {errors.email.message}
          </p>
        )}

        {/* OTP */}
        <div className="input-group mb-2">
          <span className="input-group-text bg-light border-end-0 line-right">
            <i className="bi bi-lock" style={{ color: "#8391A1" }}></i>
          </span>
          <input
            type="text"
            {...register("seed", {
              required: "OTP is required",
              minLength: {
                value: 4,
                message: "OTP must be at least 4 characters",
              },
            })}
            className="form-control bg-light border-start-0 ps-0 focus-none"
            style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
            placeholder="OTP"
          />
        </div>
        {errors.seed && (
          <p className="text-danger mb-2" style={{ fontSize: "13px" }}>
            {errors.seed.message}
          </p>
        )}

        {/* Password */}
        <div className="input-group mb-2">
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
            style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
            placeholder="Password"
          />
          <span
            className="input-group-text bg-light border-start-0 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            <i
              className={`bi ${showPassword ? "bi-eye " : "bi-eye-slash"}`}
              style={{ color: "#8391A1" }}
            ></i>
          </span>
        </div>
        {errors.password && (
          <p className="text-danger mb-2" style={{ fontSize: "13px" }}>
            {errors.password.message}
          </p>
        )}

        {/* Confirm Password */}
        <div className="input-group mb-2">
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
            style={{paddingTop:"10px" , paddingBottom:"10px" , border:'none'}}
            placeholder="Confirm Password"
          />
          <span
            className="input-group-text bg-light border-start-0"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ cursor: "pointer" }}
          >
            <i
              className={`bi ${showConfirmPassword ? "bi-eye " : "bi-eye-slash"}`}
              style={{ color: "#8391A1" }}
            ></i>
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="text-danger mb-2" style={{ fontSize: "13px" }}>
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn w-100 text-white fw-semibold mt-3"
          style={{
            backgroundColor: "#3a9e5f",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
