import { ArrowLeftIcon, Send } from "lucide-react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { timeAgo } from "../utils/utils";
import { useEffect } from "react";
import chatJsonData from "../json/chatJsonData.json";
import axios from "axios";
import { useState } from "react";
import { api_url } from "../components/Components";

const ChatBody = () => {
  const { uid, chatid } = useParams();
  const [data] = useSearchParams();
  const name = data.get("senderName");
  const [chatData, setChatData] = useState(chatJsonData);
  const [msgBodyEmpty, setMsgBodyEmpty] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const loadData = () => {
      axios
        .get(
          `${api_url}message/get-all/by-conversation-id?id=${parseInt(chatid)}`
        )
        .then((res) => {
          const messages = res.data.data;
          if (messages.length > 0) {
            axios
              .put(
                `${api_url}message/update/by-conversation-id?id=${parseInt(
                  chatid
                )}`
              )
              .catch((err) =>
                console.error("PUT error:", err.response?.data || err.message)
              );
            setChatData(messages);
            setMsgBodyEmpty(false);
          } else {
            setMsgBodyEmpty(true);
          }
        })
        .catch((err) =>
          console.error("GET error:", err.response?.data || err.message)
        );
    };
    loadData();
  }, [chatid]);

  const sendMessage = () => {
    try {
      axios.put(
        `${api_url}message/update/by-conversation-id?id=${parseInt(chatid)}`
      );

      axios
        .post(`${api_url}message/set`, {
          message: messageText,
          conversationId: parseInt(chatid),
          userid: parseInt(uid),
        })
        .then((e) => {
          setMsgBodyEmpty(false);
          setMessageText("");

          axios
            .get(
              `${api_url}message/get-all/by-conversation-id?id=${parseInt(
                chatid
              )}`
            )
            .then((res) => {
              const messages = res.data.data;
              if (messages.length > 0) {
                axios
                  .put(
                    `${api_url}message/update/by-conversation-id?id=${parseInt(
                      chatid
                    )}`
                  )
                  .catch((err) =>
                    console.error(
                      "PUT error:",
                      err.response?.data || err.message
                    )
                  );
                setChatData(messages);
                setMsgBodyEmpty(false);
              } else {
                setMsgBodyEmpty(true);
              }
            })
            .catch((err) =>
              console.error("GET error:", err.response?.data || err.message)
            );
        });
    } catch (error) {}
  };

  return (
    <div className="home-message-body-mobile">
      <div className="home-message-body-1">
        <Link to={`/home/${uid}`}>
          <ArrowLeftIcon color="white" />
        </Link>
        <label className="label-1">{name}</label>
      </div>
      <div className="home-message-card-1">
        {msgBodyEmpty
          ? ""
          : chatData
              .filter((e) => e.conversationId === parseInt(chatid))
              .map((e, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent:
                        e.userid === parseInt(uid) ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      className="message-text-card"
                      style={{
                        backgroundColor:
                          e.userid === parseInt(uid) ? "#e3adf9" : "#cfcfcf",
                        borderTopRightRadius:
                          e.userid === parseInt(uid) ? 0 : "20px",
                        borderTopLeftRadius:
                          e.userid === parseInt(uid) ? "20px" : 0,
                      }}
                    >
                      <label className="label-3">{e.message}</label>
                      <label className="label-4">{timeAgo(e.creatAt)}</label>
                    </div>
                  </div>
                );
              })}
      </div>
      <div className="home-container-2">
        <input
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          placeholder="Your message"
          className="input-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage();
            }
          }}
        />
        <Send onClick={sendMessage}  color="white"/>
      </div>
    </div>
  );
};

export default ChatBody;
