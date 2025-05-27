import { toast } from "react-toastify";
import axios from "axios";
import { api_url } from "../components/Components";
import { FaCheckCircle } from "react-icons/fa";
import {
  isEmail,
  isPassword,
  isUserName,
  passwordMatch,
} from "../validation/Validation";
import { toastColor } from "../utils/utils";

export const latestMessage = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data[data.length - 1]?.message : "No message found";
  } catch (error) {}
};

export const latestTime = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data[data.length - 1]?.createAt : "N/A";
  } catch (error) {}
};

export const latestRead = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data[data.length - 1]?.read : false;
  } catch (error) {}
};

export const unreadCount = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/unread-messages/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data : 0;
  } catch (error) {}
};

export const login = async (username, password, navigate) => {
  let toastIds = toast.loading("logging in...", {
    style: { color: toastColor },
  });
  try {
    if (username.length !== 0 && password.length !== 0) {
      const result = await axios.post(`${api_url}users/login`, {
        username: username,
        password: password,
      });
      if (result.data.success) {
        toast.update(toastIds, {
          render: "Login success!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          icon: <FaCheckCircle color={toastColor} />,
        });
        setTimeout(() => {
          navigate(`/home/${result.data.data.id}`);
        }, 2500);
      } else {
        toast.update(toastIds, {
          type: "error",
          autoClose: 3000,
          isLoading: false,
          render: "Wrong candidate",
        });
        navigate("/");
      }
    } else {
      toast.update(toastIds, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: "Please fill the all fields",
      });
    }
  } catch (error) {
    toast.update(toastIds, {
      type: "error",
      autoClose: 3000,
      isLoading: false,
      render: "Wrong candidate",
    });
  }
};

export const register = async (email, npassword, cpassword, username) => {
  let toastId = "";
  toastId = toast.loading("sign up...", {
    style: { color: toastColor },
  });
  try {
    if (
      isEmail(email) &&
      isPassword(npassword) &&
      isPassword(cpassword) &&
      isUserName(username)
    ) {
      if (passwordMatch(npassword, cpassword)) {
        const result = await axios.post(`${api_url}users/set`, {
          username: username,
          email: email,
          password: cpassword,
        });

        if (result.data.data) {
          toast.update(toastId, {
            render: "Registration successful!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            icon: <FaCheckCircle color={toastColor} />,
          });
        } else {
          toast.update(toastId, {
            type: "error",
            autoClose: 3000,
            isLoading: false,
            render: "Registration failed!",
          });
        }
      } else {
        toast.update(toastId, {
          type: "error",
          autoClose: 3000,
          isLoading: false,
          render: "Passwords do not match. Please try again",
        });
      }
    } else {
      toast.update(toastId, {
        type: "error",
        autoClose: 3000,
        isLoading: false,
        render: "Please fill the all fields",
      });
    }
  } catch (error) {
    toast.update(toastId, {
      type: "error",
      autoClose: 3000,
      isLoading: false,
      render: "Something wrong!",
    });
  }
};



