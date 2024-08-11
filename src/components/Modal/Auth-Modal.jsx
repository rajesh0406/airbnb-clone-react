import React, { useContext, useState } from "react";
import { ModalContainer, ModalWrapper } from "./Review-Modal";

import { IconButton } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { ModalContext } from "../Context/ModalContext";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cn } from "../../helper";
import { loginUser, registerUser } from "../../api/api";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

export const commonInputClassName =
  "outline-none roboto-regular mt-3 bg-slate-100 border-2 border-cyan-50 rounded-[10px] w-full px-3 py-4 text-black placeholder:text-custom-grey";

const loginSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const signupSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    mobile: yup.number().required(),
    name: yup.string().required(),
  })
  .required();

const RegisterForm = ({ toggleLayout, onClose }) => {
  const { setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response?.user) {
        setUser(response?.user);
      }
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to Register!");
    }
  };
  return (
    <form
      id="signup-form"
      className="w-full mt-4 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("name")}
        id="name"
        name="name"
        required={true}
        type="text"
        placeholder="Full Name"
        className={cn(
          "outline-none roboto-regular mt-3 bg-slate-100 border-2 border-cyan-50 rounded-[10px] w-full px-3 py-4 text-black placeholder:text-custom-grey",
          errors?.name?.message && "border-red-400"
        )}
      />
      <input
        {...register("email")}
        id="email"
        name="email"
        required={true}
        type="email"
        placeholder="Email Addres"
        className={cn(
          "outline-none roboto-regular mt-3 bg-slate-100 border-2 border-cyan-50 rounded-[10px] w-full px-3 py-4 text-black placeholder:text-custom-grey",
          errors?.email?.message && "border-red-400"
        )}
      />
      <input
        {...register("mobile")}
        id="mobil"
        name="mobile"
        required={true}
        type="number"
        placeholder="Contact Number"
        className={cn(
          "outline-none roboto-regular mt-3 bg-slate-100 border-2 border-cyan-50 rounded-[10px] w-full px-3 py-4 text-black placeholder:text-custom-grey",
          errors?.mobile?.message && "border-red-400"
        )}
      />

      <input
        {...register("password")}
        name="password"
        required={true}
        type="password"
        className={cn(
          "outline-none roboto-regular mt-3 bg-slate-100 border-2 border-cyan-50 rounded-[10px] w-full px-3 py-4 text-black placeholder:text-custom-grey",
          errors?.password?.message && "border-red-400"
        )}
        placeholder="Password"
      />
      <div className="flex items-center justify-center mt-3">
        <p className="roboto-medium text-black">
          Already have an account ?&nbsp;
        </p>
        <span
          className="roboto-medium text-primary text-base cursor-pointer"
          onClick={toggleLayout}
        >
          Login
        </span>
      </div>

      <button
        type="submit"
        className="py-3 px-8 w-full mt-3 roboto-medium border-2 flex items-center justify-center  rounded-[12px] text-center bg-primary text-white"
      >
        Register
      </button>
    </form>
  );
};

const LoginForm = ({ toggleLayout, onClose }) => {
  const { setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log("response", response);
      if (response?.registeredUser) {
        setUser(response?.registeredUser);
      }
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to Login!");
    }
  };

  return (
    <form
      id="login-form"
      className="w-full mt-4 h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("email")}
        id="email"
        name="email"
        required={true}
        type="email"
        placeholder="Email Addres"
        className={cn(
          "outline-none roboto-regular bg-slate-100 border-2 border-cyan-50 rounded-[10px] w-full px-3 py-4 text-black placeholder:text-custom-grey",
          errors?.email?.message && "border-red-400"
        )}
      />

      <input
        {...register("password")}
        name="password"
        required={true}
        type="password"
        className={cn(
          "outline-none roboto-regular mt-3 bg-slate-100 border-2 border-cyan-50 rounded-[10px] w-full px-3 py-4 text-black placeholder:text-custom-grey",
          errors?.password?.message && "border-red-400"
        )}
        placeholder="Password"
      />
      <div className="flex items-center justify-center mt-3">
        <p className="roboto-medium text-black">
          Don't have an account ?&nbsp;
        </p>
        <span
          className="roboto-medium text-primary text-base cursor-pointer"
          onClick={toggleLayout}
        >
          Register
        </span>
      </div>

      <button
        type="submit"
        className="py-3 px-8 w-full mt-3 roboto-medium border-2 flex items-center justify-center  rounded-[12px] text-center bg-primary text-white"
      >
        Login
      </button>
    </form>
  );
};

const AuthModal = () => {
  const [layout, setLayout] = useState("login");
  const { modalData, onClose } = useContext(ModalContext);

  const toggleLayout = () => {
    if (layout === "login") {
      setLayout("register");
    } else {
      setLayout("login");
    }
  };

  return (
    <ModalWrapper>
      <ModalContainer>
        <div className="flex items-center justify-between gap-5">
          <h2 className="roboto-bold text-black text-xl">
            {layout === "login" ? "Login to proceed" : "Create a free account"}
          </h2>
          <IconButton onClick={onClose}>
            <ControlPointOutlinedIcon className="!w-8 !h-8 rotate-45 !text-custom-grey" />
          </IconButton>
        </div>
        <div className="flex flex-col">
          {layout === "login" ? (
            <LoginForm toggleLayout={toggleLayout} onClose={onClose} />
          ) : (
            <RegisterForm toggleLayout={toggleLayout} onClose={onClose} />
          )}
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default AuthModal;
