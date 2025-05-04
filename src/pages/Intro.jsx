import {
  Eye,
  Lock,
  Mail,
  HelpCircle,
  User2Icon,
  ArrowRightIcon,
  ArrowLeftIcon,
  EyeClosed,
} from "lucide-react";
import Logo from "../images/message.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { isEmail, isPassword, isUserName, passwordMatch } from "../validation/Validation";

const Intro = () => {

  const [visibleButton1, setVisibleButton1] = useState(false);
  const [visibleRegScreen1, setVisibleRegScreen1] = useState(true);
  const [visibleRegScreen2, setVisibleRegScreen2] = useState(false);

  const [visibleButton2, setVisibleButton2] = useState(false);
  const [visibleLogScreen1, setVisibleLogScreen1] = useState(true);
  const [visibleLogScreen2, setVisibleLogScreen2] = useState(false);

  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);

  const [loginTxt, setLoginTxt] = useState({ username: "", password: "" });
  const [regTxt, setRegTxt] = useState({
    username: "",
    email: "",
    npassword: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const [emailValidate, setEmailValidate] = useState(true);
  const [userNameValidate, setUserNameValidate] = useState(true);
  const [npasswordValidate, setNpasswordValidate] = useState(true);
  const [cpasswordValidate, setCpasswordValidate] = useState(true);

  return (
    <div className="intro-container">
      <div className="intro-card">
        <div
          className="intro-div-2"
          style={{ display: visibleRegScreen1 ? "flex" : "none" }}
          onMouseEnter={() => {
            setVisibleButton1(true);
          }}
          onMouseLeave={() => {
            setVisibleButton1(false);
          }}
        >
          <div
            className="intro-div-3"
            style={{ display: visibleButton1 ? "flex" : "none" }}
          >
            <div
              className="intro-div-4"
              onClick={() => {
                setVisibleRegScreen1(false);
                setVisibleRegScreen2(true);
                setVisibleLogScreen1(false);
                setVisibleLogScreen2(true);
              }}
            >
              <ArrowLeftIcon />
            </div>
          </div>
        </div>
        <div
          className="intro-div-1"
          style={{ display: visibleRegScreen2 ? "flex" : "none" }}
          // style={{ display: "flex" }}
        >
          <img src={Logo} alt="img" className="intro-logo" />
          <div className="home-message-list-1">
            <Mail />
            <input
              placeholder="Email"
              className="input-chat"
              value={regTxt.email}
              onChange={(e) => {
                setRegTxt((prev) => ({ ...prev, email: e.target.value }));
                setEmailValidate(isEmail(e.target.value));
                if (e.target.value.length === 0) {
                  setEmailValidate(true);
                }
              }}
            />
            <HelpCircle />
          </div>
          <label
            style={{
              visibility:
                !emailValidate && regTxt.email !== "" ? "visible" : "hidden",
              color: "red",
              fontSize: 10,
            }}
          >
            Invalid email address
          </label>
          <div className="home-message-list-1">
            <User2Icon />
            <input
              placeholder="User name"
              className="input-chat"
              value={regTxt.username}
              onChange={(e) => {
                setRegTxt((prev) => ({ ...prev, username: e.target.value }));
                setUserNameValidate(isUserName(e.target.value));
                if (e.target.value.length === 0) {
                  setUserNameValidate(true);
                }
              }}
            />
            <HelpCircle />
          </div>
          <label
            style={{
              visibility:
                !userNameValidate && regTxt.username !== ""
                  ? "visible"
                  : "hidden",
              color: "red",
              fontSize: 10,
            }}
          >
            Username must be 3-16 characters and contain only letters, numbers,
            or underscores
          </label>
          <div className="home-message-list-1">
            <Lock />
            <input
              placeholder="New password"
              type={eye1 ? "text" : "password"}
              className="input-chat"
              value={regTxt.npassword}
              onChange={(e) => {
                setRegTxt((prev) => ({ ...prev, npassword: e.target.value }));
                setNpasswordValidate(isPassword(e.target.value));
                if (e.target.value.length === 0) {
                  setNpasswordValidate(true);
                }
              }}
            />
            <div
              onClick={() => {
                eye1 ? setEye1(false) : setEye1(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {eye1 ? <Eye /> : <EyeClosed />}
            </div>
          </div>
          <label
            style={{
              visibility:
                !npasswordValidate && regTxt.npassword !== ""
                  ? "visible"
                  : "hidden",
              color: "red",
              fontSize: 10,
            }}
          >
            Password must be at least 8 characters long and include a letter and
            a number
          </label>
          <div className="home-message-list-1">
            <Lock />
            <input
              placeholder="Confirm password"
              type={eye2 ? "text" : "password"}
              className="input-chat"
              value={regTxt.cpassword}
              onChange={(e) => {
                setRegTxt((prev) => ({ ...prev, cpassword: e.target.value }));
                setCpasswordValidate(isPassword(e.target.value));
                if (e.target.value.length === 0) {
                  setCpasswordValidate(true);
                }
              }}
            />
            <div
              onClick={() => {
                eye2 ? setEye2(false) : setEye2(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {eye2 ? <Eye /> : <EyeClosed />}
            </div>
          </div>
          <label
            style={{
              visibility:
                !cpasswordValidate && regTxt.cpassword !== ""
                  ? "visible"
                  : "hidden",
              color: "red",
              fontSize: 10,
            }}
          >
            Password must be at least 8 characters long and include a letter and
            a number
          </label>
          <button
            className="intro-button"
            onClick={async () => {
              let toastId = "";
              try {
                if (
                  isEmail(regTxt.email) &&
                  isPassword(regTxt.npassword) &&
                  isPassword(regTxt.cpassword) &&
                  isUserName(regTxt.username)
                ) {
                  if (passwordMatch(regTxt.npassword, regTxt.cpassword)) {
                    toastId = toast.loading("sign in...", {
                      style: { color: "purple" },
                    });
                    const result = await axios.post(
                      "http://localhost:4000/api/users/set",
                      {
                        username: regTxt.username,
                        email: regTxt.email,
                        password: regTxt.cpassword,
                      }
                    );

                    if (result.data.data) {
                      toast.update(toastId, {
                        render: "Register success!",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                        icon: <FaCheckCircle color="purple" />,
                      });
                    } else {
                      toast.update(toastId, {
                        type: "error",
                        autoClose: 3000,
                        isLoading: false,
                        render: "Something wrong!",
                      });
                    }
                  } else {
                    toast.update(toastId, {
                      type: "error",
                      autoClose: 3000,
                      isLoading: false,
                      render: "Something wrong!",
                    });
                  }
                }
              } catch (error) {
                toast.update(toastId, {
                  type: "error",
                  autoClose: 3000,
                  isLoading: false,
                  render: "Something wrong!",
                });
              }
            }}
          >
            Sign up
          </button>
        </div>
        <div
          className="intro-div-2"
          style={{ display: visibleLogScreen1 ? "none" : "flex" }}
          onMouseEnter={() => {
            setVisibleButton2(true);
          }}
          onMouseLeave={() => {
            setVisibleButton2(false);
          }}
        >
          <div
            className="intro-div-3"
            style={{ display: visibleButton2 ? "flex" : "none" }}
          >
            <div
              className="intro-div-4"
              onClick={() => {
                setVisibleLogScreen1(true);
                setVisibleLogScreen2(false);
                setVisibleRegScreen1(true);
                setVisibleRegScreen2(false);
              }}
            >
              <ArrowRightIcon />
            </div>
          </div>
        </div>
        <div
          className="intro-div-1"
          style={{ display: visibleLogScreen2 ? "none" : "flex" }}
          // style={{ display: "flex" }}
        >
          <img src={Logo} className="intro-logo" alt="img" />
          <div className="home-message-list-1">
            <User2Icon />
            <input
              placeholder="User name"
              className="input-chat"
              value={loginTxt.username}
              onChange={(e) => {
                setLoginTxt((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
            <HelpCircle />
          </div>
          <div className="home-message-list-1">
            <Lock />
            <input
              placeholder="Password"
              type={eye3 ? "text" : "password"}
              className="input-chat"
              value={loginTxt.password}
              onChange={(e) => {
                setLoginTxt((prev) => ({ ...prev, password: e.target.value }));
              }}
            />
            <div
              onClick={() => {
                eye3 ? setEye3(false) : setEye3(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {eye3 ? <Eye /> : <EyeClosed />}
            </div>
          </div>

          <button
            className="intro-button"
            onClick={async () => {
              let toastIds = toast.loading("logging in...", {
                style: { color: "purple" },
              });
              try {
                if (
                  loginTxt.username.length !== 0 &&
                  loginTxt.password.length !== 0
                ) {
                  const result = await axios.post(
                    `http://localhost:4000/api/users/login`,
                    {
                      username: loginTxt.username,
                      password: loginTxt.password,
                    }
                  );
                  if (result.data.success) {
                    toast.update(toastIds, {
                      render: "Login success!",
                      type: "success",
                      isLoading: false,
                      autoClose: 3000,
                      icon: <FaCheckCircle color="purple" />,
                    });
                    setTimeout(() => {
                      // navigate(`/home/7`);
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
                }else{
                  toast.update(toastIds, {
                    type: "error",
                    autoClose: 3000,
                    isLoading: false,
                    render: "fill all fields! ",
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
            }}
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Intro;
