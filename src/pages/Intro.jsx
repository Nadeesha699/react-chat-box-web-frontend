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
import { Link } from "react-router-dom";
import axios from "axios";

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
  const [links, setLink] = useState(false);

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
              }}
            />
            <HelpCircle />
          </div>
          <div className="home-message-list-1">
            <User2Icon />
            <input
              placeholder="User name"
              className="input-chat"
              value={regTxt.username}
              onChange={(e) => {
                setRegTxt((prev) => ({ ...prev, username: e.target.value }));
              }}
            />
            <HelpCircle />
          </div>
          <div className="home-message-list-1">
            <Lock />
            <input
              placeholder="New password"
              type={eye1 ? "text" : "password"}
              className="input-chat"
              value={regTxt.npassword}
              onChange={(e) => {
                setRegTxt((prev) => ({ ...prev, npassword: e.target.value }));
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
          <div className="home-message-list-1">
            <Lock />
            <input
              placeholder="Confirm password"
              type={eye2 ? "text" : "password"}
              className="input-chat"
              value={regTxt.cpassword}
              onChange={(e) => {
                setRegTxt((prev) => ({ ...prev, cpassword: e.target.value }));
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
          <button
            className="intro-button"
            onClick={() => {
              if (
                regTxt.username.length !== 0 &&
                regTxt.email.length !== 0 &&
                regTxt.npassword.length !== 0 &&
                regTxt.cpassword.length !== 0 &&
                regTxt.cpassword === regTxt.npassword
              ) {
                axios
                  .post("http://localhost:4000/api/users/set", {
                    username: regTxt.username,
                    email: regTxt.email,
                    password: regTxt.cpassword,
                  })
                  .then((e) => {
                    e.data.data
                      ? alert("Register success")
                      : alert("Regsiter unsuccess");
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
            onClick={() => {
              try {
                if (loginTxt.username.length !== 0 && loginTxt.password.length !== 0) {
                  axios
                    .get(
                      `http://localhost:4000/api/users/login?username=${loginTxt.username}&password=${loginTxt.password}`
                    )
                    .then((e) => {
                      e.data.success ? setLink(true) : setLink(false);
                    });
                }
              } catch (error) {
                
              }
              
            }}
          >
            <Link
              to={links ? "/home" : "/"}
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
