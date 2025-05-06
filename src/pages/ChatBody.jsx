import { ArrowLeftIcon, Send } from "lucide-react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { timeAgo } from "../utils/utils";
import { useEffect } from "react";
import chatJsonData from "../json/chatJsonData.json";
import axios from "axios";
import { useState } from "react";

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
          `http://localhost:4000/api/message/get-all/by-conversation-id?id=${parseInt(
            chatid
          )}`
        )
        .then((res) => {
          const messages = res.data.data;
          if (messages.length > 0) {
            axios
              .put(
                `http://localhost:4000/api/message/update/by-conversation-id?id=${parseInt(
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
        `http://localhost:4000/api/message/update/by-conversation-id?id=${parseInt(
          chatid
        )}`
      );

      axios
        .post(`http://localhost:4000/api/message/set`, {
          message: messageText,
          conversationId: parseInt(chatid),
          userid: parseInt(uid),
        })
        .then((e) => {
          setMsgBodyEmpty(false);
          setMessageText("");

          axios
            .get(
              `http://localhost:4000/api/message/get-all/by-conversation-id?id=${parseInt(
                chatid
              )}`
            )
            .then((res) => {
              const messages = res.data.data;
              if (messages.length > 0) {
                axios
                  .put(
                    `http://localhost:4000/api/message/update/by-conversation-id?id=${parseInt(
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
          <ArrowLeftIcon />
        </Link>
        <label style={{ fontWeight: "bold" }}>{name}</label>
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
                      style={{
                        backgroundColor:
                          e.userid === parseInt(uid) ? "#e3adf9" : "#cfcfcf",
                        width: "20%",
                        borderBottomLeftRadius: "20px",
                        borderBottomRightRadius: "20px",
                        borderTopRightRadius:
                          e.userid === parseInt(uid) ? 0 : "20px",
                        borderTopLeftRadius:
                          e.userid === parseInt(uid) ? "20px" : 0,
                        padding: "1%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <label style={{ fontSize: "12px" }}>{e.message}</label>
                      <label
                        style={{
                          textAlign: "right",
                          color: "gray",
                          fontSize: "10px",
                        }}
                      >
                        {timeAgo(e.creatAt)}
                      </label>
                    </div>
                  </div>
                );
              })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
          backgroundColor: "#e3adf9",
          padding: "1%",
          borderRadius: "10px",
        }}
      >
        <input
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
          placeholder="Your message"
          style={{
            width: "100%",
            borderStyle: "hidden",
            backgroundColor: "transparent",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              sendMessage();
            }
          }}
        />
        <Send onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ChatBody;
