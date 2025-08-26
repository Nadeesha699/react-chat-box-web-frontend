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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { isEmail, isPassword, isUserName } from "../validation/Validation";
import { login, register } from "../services/services";
import { iconSize } from "../utils/utils";

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

  useEffect(() => {
    document.title = "Chat Box - login";
  }, []);

  return (
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
                document.title = "Chat Box - register";
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
        >
          <img src={Logo} alt="img" className="intro-logo" />
          <div className="intro-div-1-3">
            <div className="home-message-list-1">
              <Mail size={iconSize} />
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
              <HelpCircle size={iconSize} />
            </div>
            <small
              className="error-message"
              style={{
                visibility:
                  !emailValidate && regTxt.email !== "" ? "visible" : "hidden",
              }}
            >
              Please enter a valid email address.
            </small>
            <div className="home-message-list-1">
              <User2Icon size={iconSize} />
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
              <HelpCircle size={iconSize}/>
            </div>
            <small
              className="error-message"
              style={{
                visibility:
                  !userNameValidate && regTxt.username !== ""
                    ? "visible"
                    : "hidden",
              }}
            >
              Must be 3–16 alphanumeric characters
            </small>
            <div className="home-message-list-1">
              <Lock size={iconSize} />
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
                className="intro-div-1-2"
              >
                {eye1 ? <Eye size={iconSize} /> : <EyeClosed size={iconSize} />}
              </div>
            </div>
            <small
              className="error-message"
              style={{
                visibility:
                  !npasswordValidate && regTxt.npassword !== ""
                    ? "visible"
                    : "hidden",
              }}
            >
              Use 8+ characters with letters and numbers.
            </small>
            <div className="home-message-list-1">
              <Lock size={iconSize} />
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
                className="intro-div-1-2"
              >
                {eye2 ? <Eye size={iconSize} /> : <EyeClosed size={iconSize} />}
              </div>
            </div>
            <small
              className="error-message"
              style={{
                visibility:
                  !cpasswordValidate && regTxt.cpassword !== ""
                    ? "visible"
                    : "hidden",
              }}
            >
              Use 8+ characters with letters and numbers.
            </small>
            <button
              className="intro-button"
              onClick={async () => {
                register(
                  regTxt.email,
                  regTxt.npassword,
                  regTxt.cpassword,
                  regTxt.username
                );
              }}
            >
              Sign up
            </button>
          </div>
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
                document.title = "Chat Box - login";
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
        >
          <img src={Logo} className="intro-logo" alt="img" />
          <div className="intro-div-1-1">
            <div className="home-message-list-1">
              <User2Icon size={iconSize} />
              <input
                placeholder="User name"
                className="input-chat"
                value={loginTxt.username}
                onChange={(e) => {
                  setLoginTxt((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
              />
              <HelpCircle size={iconSize} />
            </div>
            <div className="home-message-list-1">
              <Lock size={iconSize} />
              <input
                placeholder="Password"
                type={eye3 ? "text" : "password"}
                className="input-chat"
                value={loginTxt.password}
                onChange={(e) => {
                  setLoginTxt((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
              <div
                onClick={() => {
                  eye3 ? setEye3(false) : setEye3(true);
                }}
                className="intro-div-1-2"
              >
                {eye3 ? <Eye size={iconSize} /> : <EyeClosed size={iconSize} />}
              </div>
            </div>

            <button
              className="intro-button"
              onClick={async () => {
                login(loginTxt.username, loginTxt.password, navigate);
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
  );
};

export default Intro;
