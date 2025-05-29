import { FaMessage } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { iconSize01, iconSize03, toastColor,iconColor, iconColor01,toastColor01,toastColor02 } from "../utils/utils";

export const EmptyMessageBody = () => {
  return (
    <div className="home-message-body-empty">
      <FaMessage size={iconSize03} color={iconColor01} />
      <label style={{ color: iconColor }}>Welcome to Chatterbox</label>
      <small style={{ color: iconColor }}>
        Start a conversation by adding new friends!
      </small>
      <small style={{ color: iconColor }}>
        Your chats will appear here once you start messaging.
      </small>
    </div>
  );
};

export const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <ClipLoader color={toastColor} size={iconSize01} />
    </div>
  );
};

export const Logout = () => {
  const navigate = useNavigate();
  return (
    <div
      className="logout-container"
      onClick={() => {
        Swal.fire({
          background: toastColor01,
          title: "Chat Box",
          text: "Are you want to logout ? ",
          color: iconColor,
          showCancelButton: true,
          cancelButtonText: "no",
          confirmButtonText: "yes",
          cancelButtonColor: toastColor02,
          confirmButtonColor:toastColor,
        }).then((result) => {
          result.isConfirmed ? navigate("/") : navigate("#");
        });
      }}
    >
      <LogOut />
      <label className="label-5">logout</label>
    </div>
  );
};

export const api_url = "http://localhost:4000/api/";
