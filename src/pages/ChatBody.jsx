import { ArrowLeftIcon, Edit, Send, Trash2Icon } from "lucide-react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { iconColor04, timeAgo } from "../utils/utils";
import { useEffect } from "react";
import chatJsonData from "../json/chatJsonData.json";
import axios from "axios";
import { useState } from "react";
import { api_url } from "../components/Components";
import { iconColor } from "../utils/utils";
import { messageCard } from "../utils/utils";
import { useRef } from "react";
import Swal from "sweetalert2";
import {
  iconSize,
  toastColor,
  toastColor01,
  toastColor02,
} from "../utils/utils";

const ChatBody = () => {
  const { uid, chatid } = useParams();
  const [data] = useSearchParams();
  const name = data.get("senderName");
  const [chatData, setChatData] = useState(chatJsonData);
  const [msgBodyEmpty, setMsgBodyEmpty] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [visibleMessageTrashAndEdit, setVisibleMessageTrashAndEdit] =
    useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  useEffect(() => {
    const loadData = () => {
      document.title = `Chat with ${name} | Chat Box`
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
  }, [chatid,name]);

  const sendMessage = () => {
    try {
      

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
                        e.userid === parseInt(uid)
                          ? messageCard.senderPostion
                          : messageCard.recieverPostion,
                    }}
                  >
                    <div
                      onMouseEnter={() => {
                        setHoveredMessageId(e.id);
                        setVisibleMessageTrashAndEdit(true);
                      }}
                      onMouseLeave={() => {
                        setVisibleMessageTrashAndEdit(false);
                      }}
                      className="message-text-card"
                      style={{
                        backgroundColor:
                            e.userid === parseInt(uid)
                            ? messageCard.senderColor
                            : messageCard.recieverColor,
                        borderTopRightRadius:
                          e.userid === parseInt(uid)
                            ? messageCard.num1
                            : messageCard.num2,
                        borderTopLeftRadius:
                          e.userid === parseInt(uid)
                            ? messageCard.num2
                            : messageCard.num1,
                      }}
                    >
                      <label className="label-3">{e.message}</label>
                      <label className="label-4">{timeAgo(e.createAt)}</label>
                      <div className="div-1">
                        {e.userid === Number(uid) ? (
                          <Edit
                            size={iconSize}
                            style={{
                              opacity: visibleMessageTrashAndEdit
                                ? hoveredMessageId === e.id
                                  ? 1
                                  : 0
                                : 0,
                            }}
                            className="icon-hover"
                            onClick={() => {
                              Swal.fire({
                                background: toastColor01,
                                title: "Chat Box",
                                text: "Do you want to edit this message ?",
                                color: iconColor,
                                showCancelButton: true,
                                cancelButtonText: "cancel",
                                confirmButtonText: "edit",
                                cancelButtonColor: toastColor02,
                                confirmButtonColor: toastColor,
                                input: "text",
                                inputPlaceholder: e.message,
                              }).then(async (result) => {
                                if (
                                  result.isConfirmed &&
                                  result.value !== null
                                ) {
                                  const result2 = await axios.put(
                                    `${api_url}message/update/by-id?id=${e.id}`,
                                    {
                                      message: result.value,
                                    }
                                  );
                                  if (result2.data.data) {
                                    const result1 = await axios.get(
                                      `${api_url}message/get-all/by-conversation-id?id=${e.conversationId}`
                                    );

                                    const messages = result1.data.data;

                                    await axios.put(
                                      `${api_url}message/update/by-conversation-id?id=${e.conversationId}`
                                    );

                                    setChatData(messages);

                                    // setSenderConId(messages[0].conversationId);
                                  }
                                }
                              });
                            }}
                          />
                        ) : (
                          ""
                        )}
                        <Trash2Icon
                          size={iconSize}
                          style={{
                            opacity: visibleMessageTrashAndEdit
                              ? hoveredMessageId === e.id
                                ? 1
                                : 0
                              : 0,
                          }}
                          className="icon-hover"
                          onClick={async () => {
                            await axios.delete(
                              `${api_url}message/delete/by-id?id=${e.id}`
                            );

                            const result1 = await axios.get(
                              `${api_url}message/get-all/by-conversation-id?id=${e.conversationId}`
                            );

                            const messages = result1.data.data;

                            if (messages.length > 0) {
                              await axios.put(
                                `${api_url}message/update/by-conversation-id?id=${e.conversationId}`
                              );

                              setChatData(messages);

                              // setSenderConId(messages[0].conversationId);
                              // setShowChatSpace(false);

                              setMsgBodyEmpty(false);
                            } else {
                              // setSenderConId(e.id);
                              // setShowChatSpace(false);
                              setMsgBodyEmpty(true);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
        <div ref={messagesEndRef} />
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
        <Send onClick={sendMessage} color={iconColor04} />
      </div>
    </div>
  );
};

export default ChatBody;
