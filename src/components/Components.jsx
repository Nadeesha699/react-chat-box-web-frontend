import { FaMessage } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

export const EmptyMessageBody = () => {
  return (
    <div className="home-message-body-empty">
      <FaMessage size={100} color="#e3adf9" />
      <label style={{color:"white"}}>Welcome to Chatterbox</label>
      <p style={{color:"white"}}>Start a conversation by adding new friends!</p>
      <p style={{color:"white"}}>Your chats will appear here once you start messaging.</p>
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

export const api_url = "http://localhost:4000/api/"

