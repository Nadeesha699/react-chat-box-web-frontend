import axios from "axios";
import { CheckCheck, Edit, Search, Send, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import conversationJsonData from "../json/conversationJsonData.json";
import chatJsonData from "../json/chatJsonData.json";
import userJsonData from "../json/userJsonData.json";
import { timeAgo } from "../utils/utils";
import {
  latestMessage,
  latestRead,
  latestTime,
  unreadCount,
} from "../services/services";
import { EmptyMessageBody, LoadingScreen } from "../components/Components";

// https://dribbble.com/shots/23280048-Web-Chat-UI

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState("");
  const [visibleUserList, setVisibleUserList] = useState(false);
  const [conversationData, setConversationData] =
    useState(conversationJsonData);
  const [chatData, setChatData] = useState(chatJsonData);
  const [users, setUsers] = useState(userJsonData);
  const [showChatSpace, setShowChatSpace] = useState(true);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState({});
  const [times, setTimes] = useState({});
  const [reads, setReads] = useState({});
  const [counts, setCounts] = useState({});
  const [senderConId, setSenderConId] = useState("");
  const { uid } = useParams();
  const [msgBodyEmpty, setMsgBodyEmpty] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [senderName, setSenderName] = useState("");

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 575.98);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 575.98);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
  };

  const isMobileDisabled = useIsMobile();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    try {
      const loadData = () => {
        axios
          .get(
            `http://localhost:4000/api/conversation/get-all/by-user-id?id=${uid}`
          )
          .then((e) => {
            if (e.data.data.length !== 0) {
              setConversationData(e.data.data);
            }
          });

        axios.get("http://localhost:4000/api/users/get-all").then((e) => {
          setUsers(e.data.data);
        });
        setDataLoading(false);
      };

      loadData();
    } catch (error) {}
  }, [uid]);

  useEffect(() => {
    try {
      const fetchMessages = async () => {
        const newMessages = {};
        for (let e of conversationData) {
          const message = await latestMessage(e.id);
          newMessages[e.id] = message;
        }
        setMessages(newMessages);
      };

      fetchMessages();

      const fetchTimes = async () => {
        const newTimes = {};
        for (let e of conversationData) {
          const times = await latestTime(e.id);
          newTimes[e.id] = times;
        }
        setTimes(newTimes);
      };

      fetchTimes();

      const fetchReads = async () => {
        const newReads = {};
        for (let e of conversationData) {
          const reads = await latestRead(e.id);
          newReads[e.id] = reads;
        }
        setReads(newReads);
      };

      fetchReads();

      const fetchCounts = async () => {
        const newCounts = {};
        for (let e of conversationData) {
          const counts = await unreadCount(e.id);
          newCounts[e.id] = counts;
        }
        setCounts(newCounts);
      };

      fetchCounts();
      scrollToBottom();
    } catch (error) {}
  }, [conversationData]);

  const sendMessage = () => {
    try {
      const newMessage = {
        message: messageText,
        conversationId: senderConId,
        userid: parseInt(uid),
        creatAt: new Date().toISOString(),
      };

      axios.put(
        `http://localhost:4000/api/message/update/by-conversation-id?id=${senderConId}`
      );
      setCounts((prev) => ({
        ...prev,
        [newMessage.conversationId]: 0,
      }));

      setReads((prev) => ({
        ...prev,
        [newMessage.conversationId]: true,
      }));

      setChatData([...chatData, newMessage]);

      setMessages((prev) => ({
        ...prev,
        [newMessage.conversationId]: newMessage.message,
      }));

      setTimes((prev) => ({
        ...prev,
        [newMessage.conversationId]: newMessage.creatAt,
      }));

      axios
        .post(`http://localhost:4000/api/message/set`, {
          message: messageText,
          conversationId: senderConId,
          userid: parseInt(uid),
        })
        .then((e) => {
          setShowChatSpace(false);
          setMsgBodyEmpty(false);
          setMessageText("");
        });
    } catch (error) {}
  };

  return (
    <div className="home-container">
      {dataLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="home-message-list">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="home-message-list-2">
                <Search />
                <input
                  placeholder="search"
                  style={{
                    width: "100%",
                    borderStyle: "hidden",
                    backgroundColor: "transparent",
                    outline: "none",
                  }}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <Edit
                onClick={() => {
                  visibleUserList
                    ? setVisibleUserList(false)
                    : setVisibleUserList(true);
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="scroll-container">
              {conversationData
                .filter((e) =>
                  e.createruser?.username
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                .map((e, index) => {
                  return (
                    <Link
                      className="link-message-body"
                      to={
                        isMobileDisabled
                          ?  `/chat-body/${uid}/${e.id}?senderName=${encodeURIComponent(e.senderuser.username)}`
                            
                          : "#"
                      }
                      key={index}
                      onClick={() => {
                        axios
                          .get(
                            `http://localhost:4000/api/message/get-all/by-conversation-id?id=${e.id}`
                          )
                          .then((res) => {
                            const messages = res.data.data;
                            if (messages.length > 0) {
                              axios
                                .put(
                                  `http://localhost:4000/api/message/update/by-conversation-id?id=${e.id}`
                                )
                                .catch((err) =>
                                  console.error(
                                    "PUT error:",
                                    err.response?.data || err.message
                                  )
                                );

                              setCounts((prev) => ({
                                ...prev,
                                [e.id]: 0,
                              }));

                              setReads((prev) => ({
                                ...prev,
                                [e.id]: true,
                              }));
                              setChatData(messages);
                              setSenderConId(messages[0].conversationId);
                              setShowChatSpace(false);
                              setMsgBodyEmpty(false);
                            } else {
                              setSenderConId(e.id);
                              setShowChatSpace(false);
                              setMsgBodyEmpty(true);
                            }

                            setSenderName(e.senderuser.username);
                          })
                          .catch((err) =>
                            console.error(
                              "GET error:",
                              err.response?.data || err.message
                            )
                          );
                      }}
                    >
                      <div className="message-card" key={index}>
                        <User size={"40"} />
                        <div className="message-card-1">
                          <div className="message-card-2">
                            {e.createrId === parseInt(uid) ? (
                              <label style={{ fontWeight: "bold" }}>
                                {e.senderuser.username}
                              </label>
                            ) : (
                              <label style={{ fontWeight: "bold" }}>
                                {e.createruser.username}
                              </label>
                            )}
                            {reads[e.id] ? (
                              <CheckCheck size={"20"} color="blue" />
                            ) : (
                              <CheckCheck size={"20"} color="gray" />
                            )}

                            <label style={{ color: "gray", fontSize: "10px" }}>
                              {timeAgo(times[e.id])}
                            </label>
                          </div>
                          <div className="message-card-2">
                            <label style={{ color: "gray", fontSize: "12px" }}>
                              {messages[e.id]}
                            </label>
                            <label className="message-card-lbl">
                              {counts[e.id]}
                            </label>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          {showChatSpace ? (
            <EmptyMessageBody />
          ) : (
            <div className="home-message-body">
              <div className="home-message-body-1">
                <label style={{ fontWeight: "bold" }}>{senderName}</label>
              </div>
              <div className="home-message-card-1">
                {msgBodyEmpty
                  ? ""
                  : chatData
                      .filter((e) => e.conversationId === senderConId)
                      .map((e, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent:
                                e.userid === parseInt(uid)
                                  ? "flex-end"
                                  : "flex-start",
                            }}
                          >
                            <div
                              style={{
                                backgroundColor:
                                  e.userid === parseInt(uid)
                                    ? "#e3adf9"
                                    : "#cfcfcf",
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
                              <label style={{ fontSize: "12px" }}>
                                {e.message}
                              </label>
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
                <div ref={messagesEndRef} />
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
          )}
          <div
            style={{
              transition: "ease-in-out all 1s",
              position: "fixed",
              top: visibleUserList ? "10%" : "-100%",
              left: "15%",
              backgroundColor: "white",
              boxShadow: "10px 10px 10px black",
              borderRadius: "20px",
              padding: "1%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              height: "300px",
            }}
          >
            <div className="home-message-list-1-1">
              <Search />
              <input
                placeholder="search"
                style={{
                  width: "100%",
                  borderStyle: "hidden",
                  backgroundColor: "transparent",
                  outline: "none",
                }}
                onChange={(e) => {
                  setSearchText1(e.target.value);
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                overflow: "scroll",
              }}
            >
              {users
                .filter((e) =>
                  e.username.toLowerCase().includes(searchText1.toLowerCase())
                )
                .map((e, index) => {
                  return (
                    <div
                      onClick={async () => {
                        const result1 = await axios.get(
                          `http://localhost:4000/api/conversation/get-all/by-user-id/for-verfiy?uid=${e.id}&fid=${uid}`
                        );
                        if (result1.data.data[0]) {
                          const result3 = await axios.get(
                            `http://localhost:4000/api/message/get-all/by-conversation-id?id=${result1.data.data[0].id}`
                          );
                          if (result3.data.data.length !== 0) {
                            setChatData(result3.data.data);
                            setSenderConId(result1.data.data[0].id);
                            setSenderName(
                              result1.data.data[0].senderuser?.username
                            );
                            console.log(
                              result1.data.data[0].senderuser?.username
                            );
                            setShowChatSpace(false);
                            setMsgBodyEmpty(false);
                          } else {
                            setSenderConId(result1.data.data[0].id);
                            setSenderName(
                              result1.data.data[0].senderuser?.username
                            );
                            console.log(
                              result1.data.data[0].senderuser?.username
                            );
                            setShowChatSpace(false);
                            setMsgBodyEmpty(true);
                          }
                        } else {
                          const result2 = await axios.post(
                            `http://localhost:4000/api/conversation/set`,
                            {
                              createrId: parseInt(uid),
                              senderId: parseInt(e.id),
                            }
                          );

                          if (result2.data.data) {
                            setSenderConId(result2.data.data.id);
                            setSenderName(
                              result2.data.data.senderuser.username
                            );

                            axios
                              .get(
                                `http://localhost:4000/api/conversation/get-all/by-user-id?id=${uid}`
                              )
                              .then((e) => {
                                if (e.data.data.length !== 0) {
                                  setConversationData(e.data.data);
                                }
                              });

                            setShowChatSpace(false);
                            setMsgBodyEmpty(true);
                          }
                        }
                      }}
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <User />
                      <label>{e.username}</label>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
