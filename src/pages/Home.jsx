import axios from "axios";
import {
  CheckCheck,
  Edit,
  Pen,
  Save,
  Search,
  Send,
  Trash2Icon,
  User,
  UserCircleIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import conversationJsonData from "../json/conversationJsonData.json";
import chatJsonData from "../json/chatJsonData.json";
import userJsonData from "../json/userJsonData.json";
import userSinlgeJsonData from "../json/userSingleJsonData.json";
import {
  deleteColor,
  iconColor,
  messageCard,
  timeAgo,
  toastColor,
  toastColor01,
  toastColor02,
  updateColor,
} from "../utils/utils";
import {
  latestMessage,
  latestRead,
  latestTime,
  unreadCount,
} from "../services/services";
import {
  api_url,
  EmptyMessageBody,
  LoadingScreen,
  Logout,
} from "../components/Components";
import Swal from "sweetalert2";

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
  const [visibleTrash, setVisibleTrash] = useState(false);
  const [changeDeleteColor, setChangeDeleteColor] = useState(false);
  const [hoveredConversationId, setHoveredConversationId] = useState(null);
  const [visibleMessageTrashAndEdit, setVisibleMessageTrashAndEdit] =
    useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);
  const [editChangeMessageBackground, setEditChangeMessageBackground] =
    useState(false);
  const [deleteChangeMessageBackground, setDeleteChangeMessageBackground] =
    useState(false);
  const [userData, setUserData] = useState(userSinlgeJsonData);
  const [passwordArray, setPasswordArray] = useState({
    cupass: "",
    npass: "",
    copass: "",
  });
  const [pen1, setPen1] = useState(false);
  const [pen2, setPen2] = useState(false);
  const [visibleUserUpdatePanel, setVisibleUserUpdatePanel] = useState(false);

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
      document.title = "CHATTERBOX - converstion";
      const loadData = () => {
        axios
          .get(`${api_url}conversation/get-all/by-user-id?id=${uid}`)
          .then((e) => {
            if (e.data.data.length !== 0) {
              setConversationData(e.data.data);
            }
          });

        axios.get(`${api_url}users/get-all`).then((e) => {
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
        `${api_url}message/update/by-conversation-id?id=${senderConId}`
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
        .post(`${api_url}message/set`, {
          message: messageText,
          conversationId: senderConId,
          userid: parseInt(uid),
        })
        .then(async (e) => {
          const result1 = await axios.get(
            `${api_url}message/get-all/by-conversation-id?id=${senderConId}`
          );

          const messages = result1.data.data;

          await axios.put(
            `${api_url}message/update/by-conversation-id?id=${senderConId}`
          );

          setChatData(messages);

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
                alignItems: "center",
                gap: "10px",
              }}
            >
              <UserCircleIcon
                size={40}
                color="white"
                style={{ cursor: "pointer" }}
                onClick={async () => {
                  const result = await axios.get(
                    `${api_url}users/get-user/by-id?id=${Number(uid)}`
                    // `${api_url}users/get-user/by-id?id=22`
                  );
                  if (result.data.data) {
                    setUserData(result.data.data);
                    setVisibleUserUpdatePanel(!visibleUserUpdatePanel);
                  }
                }}
              />
              <label
                style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}
              >
                Chat
              </label>
            </div>
            <div className="home-container-1">
              <div className="home-message-list-2">
                <Search color="white" />
                <input
                  placeholder="search"
                  className="input-1"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <Edit
                color="white"
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
                  e.senderuser.username
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                .map((e, index) => {
                  return (
                    <Link
                      onMouseEnter={() => {
                        setVisibleTrash(true);
                        setHoveredConversationId(e.id);
                      }}
                      onMouseLeave={() => {
                        setVisibleTrash(false);
                        setHoveredConversationId(null);
                      }}
                      className="link-message-body"
                      to={
                        isMobileDisabled
                          ? `/chat-body/${uid}/${
                              e.id
                            }?senderName=${encodeURIComponent(
                              e.senderuser.username
                            )}`
                          : "#"
                      }
                      key={index}
                      onClick={() => {
                        document.title = "CHATTERBOX - chat";
                        axios
                          .get(
                            `${api_url}message/get-all/by-conversation-id?id=${e.id}`
                          )
                          .then((res) => {
                            const messages = res.data.data;
                            if (messages.length > 0) {
                              axios
                                .put(
                                  `${api_url}message/update/by-conversation-id?id=${e.id}`
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
                      <div
                        className="message-card"
                        key={index}
                        style={{
                          backgroundColor: changeDeleteColor
                            ? e.id === hoveredConversationId
                              ? "#ff000057"
                              : "transparent"
                            : "transparent",
                        }}
                      >
                        <User size={"40"} color="white" />
                        <div className="message-card-1">
                          <div className="message-card-2">
                            {e.createrId === parseInt(uid) ? (
                              <label className="label-1">
                                {e.senderuser.username}
                              </label>
                            ) : (
                              <label className="label-1">
                                {e.createruser.username}
                              </label>
                            )}
                            {reads[e.id] ? (
                              <CheckCheck size={"20"} color="blue" />
                            ) : (
                              <CheckCheck size={"20"} color="gray" />
                            )}

                            <label className="label-2">
                              {timeAgo(times[e.id])}
                            </label>
                          </div>
                          <div className="message-card-2">
                            <label className="label-2">{messages[e.id]}</label>
                            <label className="message-card-lbl">
                              {counts[e.id]}
                            </label>
                          </div>
                        </div>
                        <Trash2Icon
                          onClick={() => {
                            Swal.fire({
                              background: "#00000089",
                              title: "CHATTERBOX",
                              text: "Do yo want to delete this conversation ? ",
                              color: "white",
                              showCancelButton: true,
                              cancelButtonText: "no",
                              confirmButtonText: "yes",
                              cancelButtonColor: "purple",
                              confirmButtonColor: "#ff0088",
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                await axios.delete(
                                  `${api_url}conversation/delete/by-id?id=${e.id}`
                                );
                                await axios
                                  .get(
                                    `${api_url}conversation/get-all/by-user-id?id=${uid}`
                                  )
                                  .then((e) => {
                                    if (e.data.data.length !== 0) {
                                      setConversationData(e.data.data);
                                    }
                                  });

                                setShowChatSpace(true);
                              }
                            });
                          }}
                          onMouseEnter={() => {
                            setChangeDeleteColor(true);
                          }}
                          onMouseLeave={() => {
                            setChangeDeleteColor(false);
                          }}
                          color={
                            changeDeleteColor
                              ? e.id === hoveredConversationId
                                ? "white"
                                : "black"
                              : "black"
                          }
                          style={{
                            opacity: visibleTrash
                              ? hoveredConversationId === e.id
                                ? 1
                                : 0
                              : 0,
                          }}
                        />
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
                <label className="label-1">{senderName}</label>
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
                                  deleteChangeMessageBackground &&
                                  hoveredMessageId === e.id
                                    ? deleteColor
                                    : editChangeMessageBackground &&
                                      hoveredMessageId === e.id
                                    ? updateColor
                                    : e.userid === parseInt(uid)
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
                              <label className="label-4">
                                {timeAgo(e.createAt)}
                              </label>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Edit
                                  size={15}
                                  style={{
                                    opacity: visibleMessageTrashAndEdit
                                      ? hoveredMessageId === e.id
                                        ? 1
                                        : 0
                                      : 0,
                                    cursor: "pointer",
                                  }}
                                  onMouseEnter={() => {
                                    setEditChangeMessageBackground(true);
                                  }}
                                  onMouseLeave={() => {
                                    setEditChangeMessageBackground(false);
                                  }}
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

                                          setCounts((prev) => ({
                                            ...prev,
                                            [e.conversationId]: 0,
                                          }));

                                          setReads((prev) => ({
                                            ...prev,
                                            [e.conversationId]: true,
                                          }));

                                          setMessages((prev) => ({
                                            ...prev,
                                            [e.conversationId]:
                                              messages[messages.length - 1]
                                                .message,
                                          }));

                                          setChatData(messages);

                                          setSenderConId(
                                            messages[0].conversationId
                                          );
                                        }
                                      }
                                    });
                                  }}
                                />
                                <Trash2Icon
                                  size={15}
                                  style={{
                                    opacity: visibleMessageTrashAndEdit
                                      ? hoveredMessageId === e.id
                                        ? 1
                                        : 0
                                      : 0,
                                    cursor: "pointer",
                                  }}
                                  onMouseEnter={() => {
                                    setDeleteChangeMessageBackground(true);
                                  }}
                                  onMouseLeave={() => {
                                    setDeleteChangeMessageBackground(false);
                                  }}
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

                                      setCounts((prev) => ({
                                        ...prev,
                                        [e.conversationId]: 0,
                                      }));

                                      setReads((prev) => ({
                                        ...prev,
                                        [e.conversationId]: true,
                                      }));

                                      setMessages((prev) => ({
                                        ...prev,
                                        [e.conversationId]:
                                          messages[messages.length - 1].message,
                                      }));

                                      setChatData(messages);

                                      setSenderConId(
                                        messages[0].conversationId
                                      );
                                      setShowChatSpace(false);

                                      setMsgBodyEmpty(false);
                                    } else {
                                      setSenderConId(e.id);
                                      setShowChatSpace(false);
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
                <Send onClick={sendMessage} color="white" />
              </div>
            </div>
          )}
          <div
            className="home-container-3"
            style={{
              top: visibleUserList ? "20%" : "-100%",
            }}
          >
            <label className="label-5">New Chat</label>
            <div className="home-message-list-1-1">
              <Search />
              <input
                placeholder="search"
                className="input-1"
                onChange={(e) => {
                  setSearchText1(e.target.value);
                }}
              />
            </div>
            <div className="home-container-4">
              {users
                .filter(
                  (e) =>
                    e.username
                      .toLowerCase()
                      .includes(searchText1.toLowerCase()) &&
                    e.id !== Number(uid)
                )
                .map((e, index) => {
                  return (
                    <div
                      onClick={async () => {
                        const result1 = await axios.get(
                          `${api_url}conversation/get-all/by-user-id/for-verfiy?uid=${e.id}&fid=${uid}`
                        );
                        if (result1.data.data[0]) {
                          const result2 = await axios.get(
                            `${api_url}message/get-all/by-conversation-id?id=${result1.data.data[0].id}`
                          );
                          if (result2.data.data[0]) {
                            setChatData(result2.data.data);
                            setSenderConId(result1.data.data[0].id);
                            setSenderName(
                              result1.data.data[0].senderuser.username
                            );
                            setShowChatSpace(false);
                            setMsgBodyEmpty(false);
                          } else {
                            setSenderConId(result1.data.data[0].id);
                            setSenderName(
                              result1.data.data[0].senderuser.username
                            );
                            setShowChatSpace(false);
                            setMsgBodyEmpty(true);
                          }
                        } else {
                          const result3 = await axios.post(
                            `${api_url}conversation/set`,
                            {
                              createrId: parseInt(uid),
                              senderId: parseInt(e.id),
                            }
                          );

                          if (result3.data.data) {
                            setSenderConId(result3.data.data.id);
                            setSenderName(
                              result3.data.data.senderuser?.username
                            );
                            setShowChatSpace(false);
                            setMsgBodyEmpty(true);
                          }
                        }

                        axios
                          .get(
                            `${api_url}conversation/get-all/by-user-id?id=${uid}`
                          )
                          .then((e) => {
                            if (e.data.data.length !== 0) {
                              setConversationData(e.data.data);
                            }
                          });

                        document.title = "Chat Box - chat";
                      }}
                      key={index}
                      className="home-container-5"
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
      <div
        className="profile-update-div"
        style={{
          top: visibleUserUpdatePanel ? "10%" : "-100%",
        }}
      >
        <label style={{ fontWeight: "bold", fontSize: "30px" }}>Profile</label>
        <UserCircleIcon size={60} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            disabled={!pen1}
            style={{ borderRadius: "10px", borderWidth: "1px", padding: "2%" }}
            value={userData.username}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, username: e.target.value }));
            }}
          />
          <Pen
            onClick={() => {
              setPen1(!pen1);
            }}
          />
        </div>
        <label className="label-5">Email </label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            style={{ borderRadius: "10px", borderWidth: "1px", padding: "2%" }}
            value={userData.email}
            disabled={!pen2}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <Pen
            onClick={() => {
              setPen2(!pen2);
            }}
          />
        </div>
        <label className="label-5">Current Password</label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            style={{ borderRadius: "10px", borderWidth: "1px", padding: "2%" }}
            value={passwordArray.cupass}
            onChange={(e) => {
              setPasswordArray((prev) => ({ ...prev, cupass: e.target.value }));
            }}
          />
        </div>
        <label className="label-5">New Password</label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            style={{ borderRadius: "10px", borderWidth: "1px", padding: "2%" }}
            value={passwordArray.npass}
            onChange={(e) => {
              setPasswordArray((prev) => ({ ...prev, npass: e.target.value }));
            }}
          />
        </div>
        <label className="label-5">Confirm Password</label>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            style={{ borderRadius: "10px", borderWidth: "1px", padding: "2%" }}
            value={passwordArray.copass}
            onChange={(e) => {
              setPasswordArray((prev) => ({ ...prev, copass: e.target.value }));
            }}
          />
        </div>
        <div
          className="logout-container"
          onClick={async () => {
            try {
              if (userData.email !== null && userData.username !== null) {
                const valid = await axios.post(
                  `${api_url}users/password-verify/by-id?id=22`,
                  {
                    password: passwordArray.cupass,
                  }
                );
                if (
                  passwordArray.npass !== null &&
                  passwordArray.copass !== null &&
                  passwordArray.cupass !== null &&
                  valid.data.success &&
                  passwordArray.npass === passwordArray.copass
                ) {
                  const result = await axios.put(
                    `${api_url}users/update/by-id?id=22`,
                    {
                      username: userData.username,
                      email: userData.email,
                      password: passwordArray.copass,
                    }
                  );

                  if (result.data) {
                    alert("update success");
                  } else {
                  }
                }
              }
            } catch (error) {}
          }}
        >
          <Save />
          <label className="label-5">update</label>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default Home;
