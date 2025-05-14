import { FaMessage } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {  LogOut } from "lucide-react";



export const EmptyMessageBody = () => {
  return (
    <div className="home-message-body-empty">
      <FaMessage size={100} color="#e3adf9" />
      <label style={{ color: "white" }}>Welcome to Chatterbox</label>
      <p style={{ color: "white" }}>
        Start a conversation by adding new friends!
      </p>
      <p style={{ color: "white" }}>
        Your chats will appear here once you start messaging.
      </p>
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <ClipLoader color="purple" size={50} />
    </div>
  );
};

export const Logout = () => {
  const navigate = useNavigate()
  return (
    <div
      className="logout-container"
      onClick={() => {
        Swal.fire({
          background: "#00000089",
          title: "CHATTERBOX",
          text: "Are you want to logout ? ",
          color: "white",
          showCancelButton: true,
          cancelButtonText: "no",
          confirmButtonText: "yes",
          cancelButtonColor: "#ff0088",
        }).then((result) => {
          result.isConfirmed ? navigate("/") : navigate("#");
        });
      }}
    >
      <LogOut color="white" />
      <label className="label-1">logout</label>
    </div>
  );
};

export const api_url = "http://localhost:4000/api/";
