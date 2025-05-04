import { FaMessage } from "react-icons/fa6";

export const EmptyMessageBody = ()=>{
    return(
        <div className="home-message-body-empty">
          <FaMessage size={100} color="#e3adf9" />
          <label>Welcome to Chatterbox</label>
          <p>Start a conversation by adding new friends!</p>
          <p>Your chats will appear here once you start messaging.</p>
        </div>
    )
}