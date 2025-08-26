import axios from "axios";
import {
  CheckCheck,
  Edit,
  Eye,
  EyeClosed,
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
  hideNum01,
  hideNum02,
  iconColor,
  iconColor02,
  iconColor03,
  iconColor04,
  iconSize,
  iconSize01,
  iconSize02,
  messageCard,
  normalColor,
  timeAgo,
  toastColor,
  toastColor01,
  toastColor02,
  toastColor03,
} from "../utils/utils";
import {
  latestMessage,
  latestRead,
  latestTime,
  latestUserId,
  unreadCount,
} from "../services/services";
import {
  api_url,
  EmptyMessageBody,
  LoadingScreen,
  Logout,
} from "../components/Components";
import Swal from "sweetalert2";
import { isEmail, isPassword, isUserName } from "../validation/Validation";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

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
  const [userIds, setUserIds] = useState({});
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
  // const [editChangeMessageBackground, setEditChangeMessageBackground] =
  //   useState(false);
  // const [deleteChangeMessageBackground, setDeleteChangeMessageBackground] =
  //   useState(false);
  const [userData, setUserData] = useState(userSinlgeJsonData);
  const [passwordArray, setPasswordArray] = useState({
    cupass: "",
    npass: "",
    copass: "",
  });
  const [pen1, setPen1] = useState(false);
  const [pen2, setPen2] = useState(false);
  const [visibleUserUpdatePanel, setVisibleUserUpdatePanel] = useState(false);

  const [emailValidate, setEmailValidate] = useState(true);
  const [userNameValidate, setUserNameValidate] = useState(true);
  const [npasswordValidate, setNpasswordValidate] = useState(true);
  const [cupasswordValidate, setCupasswordValidate] = useState(true);
  const [copasswordValidate, setCopasswordValidate] = useState(true);
  const [hideError01, setHideEorr01] = useState(false);
  const [hideError02, setHideEorr02] = useState(false);
  const [hideError03, setHideEorr03] = useState(false);

  const [passowordHide01, setPasswordHide01] = useState(false);
  const [passowordHide02, setPasswordHide02] = useState(false);
  const [passowordHide03, setPasswordHide03] = useState(false);

  const [conClickedId, setConClickedId] = useState(0);

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
    scrollToBottom();
  }, [chatData]);

  useEffect(() => {
    try {
      const loadData = async () => {
        const user = await axios.get(
          `${api_url}users/get-user/by-id?id=${uid}`
        );
        if (user.data.data) {
          document.title = `Chat Box - Conversations | ${user.data.data.username}`;
        }

        axios
          .get(`${api_url}conversation/get-all/by-user-id?id=${uid}`)
          .then((e) => {
            if (e.data.data.length !== 0) {
              setConversationData(e.data.data);
            } else {
              setConversationData([]);
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

      const fetchUserId = async () => {
        const newUserIds = {};
        for (let e of conversationData) {
          const userid = await latestUserId(e.id);
          newUserIds[e.id] = userid;
        }
        setUserIds(newUserIds);
      };

      fetchUserId();

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
            <div className="home-input-div">
              <UserCircleIcon
                size={iconSize01}
                className="icon-hover"
                onClick={async () => {
                  const result = await axios.get(
                    `${api_url}users/get-user/by-id?id=${Number(uid)}`
                  );
                  if (result.data.data) {
                    setUserData(result.data.data);
                    setVisibleUserUpdatePanel(!visibleUserUpdatePanel);
                  }
                }}
              />
              <label className="label-7">Chat</label>
            </div>
            <div className="home-container-1">
              <div className="home-message-list-2">
                <Search color={iconColor04} />
                <input
                  placeholder="search"
                  className="input-1"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <Edit
                onClick={() => {
                  visibleUserList
                    ? setVisibleUserList(false)
                    : setVisibleUserList(true);
                }}
                className="icon-hover"
              />
            </div>
            <div className="scroll-container">
              {conversationData.length === 0
                ? ""
                : conversationData
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
                          style={{
                            backgroundColor:
                              conClickedId === e.id
                                ? "#0202024d"
                                : "transparent",
                          }}
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
                            e.senderId === parseInt(uid)
                              ? (document.title = `Chat with ${e.createruser.username} | Chat Box`)
                              : (document.title = `Chat with ${e.senderuser.username} | Chat Box`);
                            setConClickedId(e.id);
                            axios
                              .get(
                                `${api_url}message/get-all/by-conversation-id?id=${e.id}`
                              )
                              .then(async (res) => {
                                const messages = res.data.data;
                                if (messages.length > 0) {
                                  if (
                                    messages[messages.length - 1].userid !==
                                    Number(uid)
                                  ) {
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
                                  }

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
                              backgroundColor:normalColor
                            }}
                          >
                            <User size={iconSize01} color={iconColor} />
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
                                {messages[e.id] === undefined ? (
                                  ""
                                ) : reads[e.id] ||
                                  userIds[e.id] === parseInt(uid) ? (
                                  <CheckCheck
                                    size={iconSize}
                                    color={iconColor}
                                  />
                                ) : (
                                  <CheckCheck
                                    size={iconSize}
                                    color={iconColor03}
                                  />
                                )}

                                <label className="label-2">
                                  {messages[e.id] === undefined
                                    ? ""
                                    : timeAgo(times[e.id])}
                                </label>
                              </div>
                              <div className="message-card-2">
                                <label className="label-2">
                                  {messages[e.id]}
                                </label>
                                {messages[e.id] === undefined ? (
                                  ""
                                ) : counts[e.id] === 0 ? (
                                  ""
                                ) : userIds[e.id] === parseInt(uid) ? (
                                  ""
                                ) : (
                                  <label className="message-card-lbl">
                                    {counts[e.id]}
                                  </label>
                                )}
                              </div>
                            </div>
                            <Trash2Icon
                              onClick={() => {
                                Swal.fire({
                                  background: toastColor01,
                                  title: "Chat Box",
                                  text: "Do yo want to delete this conversation ? ",
                                  color: iconColor,
                                  showCancelButton: true,
                                  cancelButtonText: "no",
                                  confirmButtonText: "yes",
                                  cancelButtonColor: toastColor02,
                                  confirmButtonColor: toastColor03,
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

                                    axios
                                      .get(
                                        `${api_url}conversation/get-all/by-user-id?id=${uid}`
                                      )
                                      .then((e) => {
                                        if (e.data.data.length !== 0) {
                                          setConversationData(e.data.data);
                                        } else {
                                          setConversationData([]);
                                        }
                                      });
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
                                    ? iconColor02
                                    : iconColor
                                  : iconColor
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
                                  // deleteChangeMessageBackground &&
                                  // hoveredMessageId === e.id
                                  //   ? deleteColor
                                  //   : editChangeMessageBackground &&
                                  //     hoveredMessageId === e.id
                                  //   ? updateColor :
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
                              <label className="label-4">
                                {timeAgo(e.createAt)}
                              </label>
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
                                    // onMouseEnter={() => {
                                    //   setEditChangeMessageBackground(true);
                                    // }}
                                    // onMouseLeave={() => {
                                    //   setEditChangeMessageBackground(false);
                                    // }}
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
                                        confirmButtonColor: toastColor03,
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

                                            if (
                                              messages[messages.length - 1]
                                                .userid !== Number(uid)
                                            ) {
                                              axios
                                                .put(
                                                  `${api_url}message/update/by-conversation-id?id=${e.id}`
                                                )
                                                .catch((err) =>
                                                  console.error(
                                                    "PUT error:",
                                                    err.response?.data ||
                                                      err.message
                                                  )
                                                );
                                            }

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
                                  // onMouseEnter={() => {
                                  //   setDeleteChangeMessageBackground(true);
                                  // }}
                                  // onMouseLeave={() => {
                                  //   setDeleteChangeMessageBackground(false);
                                  // }}
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
                <Send onClick={sendMessage} color={iconColor04} />
              </div>
            </div>
          )}
          <div
            className="home-container-3"
            style={{
              top: visibleUserList ? hideNum01 : hideNum02,
            }}
          >
            <label className="label-7">New Chat</label>
            <div className="home-message-list-1-1">
              <Search color={iconColor04} />
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
                      <User color={iconColor} />
                      <label style={{ color: iconColor }}>{e.username}</label>
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
          top: visibleUserUpdatePanel ? hideNum01 : hideNum02,
        }}
      >
        <label className="label-7">Profile</label>
        <UserCircleIcon size={iconSize02} color={iconColor} />
        <div className="home-input-div">
          <input
            disabled={!pen1}
            className="input-2"
            value={userData.username}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, username: e.target.value }));
              setUserNameValidate(isUserName(e.target.value));
            }}
          />
          <Pen
            className="icon-hover"
            onClick={() => {
              setPen1(!pen1);
            }}
          />
        </div>
        <small
          className="error-message"
          style={{ visibility: userNameValidate ? "hidden" : "visible" }}
        >
          Please enter a valid email address.
        </small>
        <label className="label-5">Email </label>
        <div className="home-input-div">
          <input
            className="input-2"
            value={userData.email}
            disabled={!pen2}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }));
              setEmailValidate(isEmail(e.target.value));
            }}
          />
          <Pen
            className="icon-hover"
            onClick={() => {
              setPen2(!pen2);
            }}
          />
        </div>
        <small
          className="error-message"
          style={{ visibility: emailValidate ? "hidden" : "visible" }}
        >
          Must be 3–16 alphanumeric characters
        </small>
        <label className="label-5">Current Password</label>
        <div className="home-input-div">
          <input
            type={passowordHide01 ? "text" : "password"}
            className="input-2"
            value={passwordArray.cupass}
            onChange={(e) => {
              setPasswordArray((prev) => ({ ...prev, cupass: e.target.value }));
              setCupasswordValidate(isPassword(e.target.value));
              if (e.target.value.length === 0) {
                setHideEorr01(true);
              }
            }}
          />
          {passowordHide01 ? (
            <Eye
              className="icon-hover"
              onClick={() => {
                setPasswordHide01(!passowordHide01);
              }}
            />
          ) : (
            <EyeClosed
              className="icon-hover"
              onClick={() => {
                setPasswordHide01(!passowordHide01);
              }}
            />
          )}
        </div>
        <small
          className="error-message"
          style={{
            visibility:
              cupasswordValidate || hideError01 ? "hidden" : "visible",
          }}
        >
          Use 8+ characters with letters and numbers.
        </small>
        <label className="label-5">New Password</label>
        <div className="home-input-div">
          <input
            type={passowordHide02 ? "text" : "password"}
            className="input-2"
            value={passwordArray.npass}
            onChange={(e) => {
              setPasswordArray((prev) => ({ ...prev, npass: e.target.value }));
              setNpasswordValidate(isPassword(e.target.value));
              if (e.target.value.length === 0) {
                setHideEorr02(true);
              }
            }}
          />
          {passowordHide02 ? (
            <Eye
              className="icon-hover"
              onClick={() => {
                setPasswordHide02(!passowordHide02);
              }}
            />
          ) : (
            <EyeClosed
              className="icon-hover"
              onClick={() => {
                setPasswordHide02(!passowordHide02);
              }}
            />
          )}
        </div>
        <small
          className="error-message"
          style={{
            visibility: npasswordValidate || hideError02 ? "hidden" : "visible",
          }}
        >
          Use 8+ characters with letters and numbers.
        </small>
        <label className="label-5">Confirm Password</label>
        <div className="home-input-div">
          <input
            type={!passowordHide03 ? "text" : "password"}
            className="input-2"
            value={passwordArray.copass}
            onChange={(e) => {
              setPasswordArray((prev) => ({ ...prev, copass: e.target.value }));
              setCopasswordValidate(isPassword(e.target.value));
              if (e.target.value.length === 0) {
                setHideEorr03(true);
              }
            }}
          />
          {passowordHide03 ? (
            <Eye
              className="icon-hover"
              onClick={() => {
                setPasswordHide03(!passowordHide03);
              }}
            />
          ) : (
            <EyeClosed
              className="icon-hover"
              onClick={() => {
                setPasswordHide03(!passowordHide03);
              }}
            />
          )}
        </div>
        <small
          className="error-message"
          style={{
            visibility:
              copasswordValidate || hideError03 ? "hidden" : "visible",
          }}
        >
          Use 8+ characters with letters and numbers.
        </small>
        <div
          className="logout-container"
          onClick={async () => {
            try {
              let toastId = toast.loading("Updating your profile...", {
                style: { color: toastColor },
              });
              if (userNameValidate && emailValidate) {
                const valid = await axios.post(
                  `${api_url}users/password-verify/by-id?id=${uid}`,
                  {
                    password: passwordArray.cupass,
                  }
                );
                if (
                  cupasswordValidate &&
                  npasswordValidate &&
                  copasswordValidate &&
                  valid.data.success &&
                  passwordArray.npass === passwordArray.copass
                ) {
                  const result = await axios.put(
                    `${api_url}users/update/by-id?id=${uid}`,
                    {
                      username: userData.username,
                      email: userData.email,
                      password: passwordArray.copass,
                    }
                  );

                  if (result.data) {
                    toast.update(toastId, {
                      render: "Profile and password updated successfully!",
                      type: "success",
                      isLoading: false,
                      autoClose: 3000,
                      icon: <FaCheckCircle color={toastColor} />,
                    });
                  } else {
                    toast.update(toastId, {
                      render: "Failed to update profile and password.",
                      type: "error",
                      isLoading: false,
                      autoClose: 3000,
                    });
                  }
                } else {
                  const result = await axios.put(
                    `${api_url}users/update/by-id?id=${uid}`,
                    {
                      username: userData.username,
                      email: userData.email,
                      password: null,
                    }
                  );

                  if (result.data) {
                    toast.update(toastId, {
                      render:
                        "Profile updated successfully (password unchanged).",
                      type: "success",
                      isLoading: false,
                      autoClose: 3000,
                      icon: <FaCheckCircle color={toastColor} />,
                    });
                  } else {
                    toast.update(toastId, {
                      render: "Failed to update profile.",
                      type: "error",
                      isLoading: false,
                      autoClose: 3000,
                    });
                  }
                }
              } else {
                toast.update(toastId, {
                  render:
                    "Invalid username or email. Please check your inputs.",
                  type: "warning",
                  isLoading: false,
                  autoClose: 3000,
                });
              }
            } catch (error) {
              toast.error("Something went wrong. Please try again later.");
            }
          }}
        >
          <Save color={iconColor} />
          <label className="label-5">update</label>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default Home;
