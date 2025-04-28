import axios from "axios";
import { CheckCheck, Edit, Search, Send, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// https://dribbble.com/shots/23280048-Web-Chat-UI

// const chatData = [
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "2m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "5m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "5m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "5m",
//     message: "Hello baba",
//   },
//   {
//     name: "Nadeesha Ruwndima",
//     time: "5m",
//     message: "Hello baba",
//   },
// ];

const messaheData = [
  {
    message: "Hello baba",
    uid: 1,
    time: "5m",
  },
  {
    message: "Ow patiyo",
    uid: 2,
    time: "3m",
  },
  {
    message: "Kohomada",
    uid: 1,
    time: "1m",
  },
  {
    message: "Hello baba",
    uid: 1,
    time: "5m",
  },
  {
    message: "Ow patiyo",
    uid: 2,
    time: "3m",
  },
  {
    message: "Kohomada",
    uid: 1,
    time: "1m",
  },
  {
    message: "Hello baba",
    uid: 1,
    time: "5m",
  },
  {
    message: "Ow patiyo",
    uid: 2,
    time: "3m",
  },
  {
    message: "Kohomada",
    uid: 1,
    time: "1m",
  },
  {
    message: "Ow patiyo",
    uid: 2,
    time: "3m",
  },
  {
    message: "Kohomada",
    uid: 1,
    time: "1m",
  },
  {
    message: "Ow patiyo",
    uid: 2,
    time: "3m",
  },
  {
    message: "Kohomada",
    uid: 1,
    time: "1m",
  },
];

const user = [
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
  { name: "Nadeesha" },
];

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [searchText1, setSearchText1] = useState("");
  const [visibleUserList, setVisibleUserList] = useState(false);
  const [conversationData, setConversationData] = useState([
    {
      id: 0,
      createrId: 0,
      senderId: 0,
      createAt: "",
      updateAt: "",
      createruser: {
        id: 0,
        username: "",
        email: "",
        password: "",
        createAt: "",
        updateAt: "",
      },
      senderuser: {
        id: 0,
        username: "",
        email: "",
        password: "",
        createAt: "",
        updateAt: "",
      },
    },
  ]);

  // const [messageData, setMessageData] = useState(
  //   {
  //     id: 0,
  //     message: "",
  //     conversationId: 0,
  //     userid: 0,
  //     createAt: "",
  //     updateAt: "",
  //     user: {
  //       id: 0,
  //       username: "",
  //       email: "",
  //       password: "",
  //       createAt: "",
  //       updateAt: "",
  //     },
  //   },
  // );

  useEffect(() => {
    const loadData = () => {
      axios
        .get("http://localhost:4000/api/conversation/get-all/by-user-id?id=9")
        .then((e) => {
          setConversationData(e.data.data);
        });
    };
    loadData();
  }, []);

  function timeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date); 

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); 
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years}y`;
    } else if (months > 0) {
      return `${months}mo`;
    } else if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else if (seconds > 0) {
      return `${seconds}s`;
    } else {
      return "Just now";
    }
  }

  const [messages, setMessages] = useState({});
  const [times, setTimes] = useState({});

  const latestMessage = async (a) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/message/get-all/by-conversation-id?id=${a}`
      );
      const data = response.data.data;
      return data ? data[0].message : "No message found";
    } catch (error) {
      // console.error("Error fetching message data:", error);
      // return "Error fetching message data";
    }
  };

  const latestTime = async (a) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/message/get-all/by-conversation-id?id=${a}`
      );
      const data = response.data.data;
      return data ? data[0].createAt : "N/A";
    } catch (error) {
      // console.error("Error fetching message data:", error);
      // return "Error fetching message data";
    }
  };

  useEffect(() => {
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
  }, [conversationData]);

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
  return (
    <div className="home-container">
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
              e.createruser.username
                .toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((e, index) => {
              return (
                <Link
                  className="link-message-body"
                  to={isMobileDisabled ? "/chat-body" : "#"}
                  key={index}
                >
                  <div className="message-card" key={index}>
                    <User size={"40"} />
                    <div className="message-card-1">
                      <div className="message-card-2">
                        <label style={{ fontWeight: "bold" }}>
                          {e.createruser.username}
                        </label>
                        <CheckCheck size={"20"} />
                        <label style={{ color: "gray", fontSize: "10px" }}>
                          {timeAgo(times[e.id])}
                        </label>
                      </div>
                      <div className="message-card-2">
                        <label style={{ color: "gray", fontSize: "12px" }}>
                          {messages[e.id]}
                        </label>
                        <label className="message-card-lbl">2</label>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="home-message-body">
        <div className="home-message-body-1">
          <label style={{ fontWeight: "bold" }}>Nadeesha Ruwandima</label>
        </div>
        <div className="home-message-card-1">
          {messaheData.map((e, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: e.uid === 1 ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    backgroundColor: e.uid === 1 ? "#e3adf9" : "#cfcfcf",
                    width: "20%",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderTopRightRadius: e.uid === 1 ? 0 : "20px",
                    borderTopLeftRadius: e.uid === 1 ? "20px" : 0,
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
                    {e.time}
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
            placeholder="Your message"
            style={{
              width: "100%",
              borderStyle: "hidden",
              backgroundColor: "transparent",
              outline: "none",
            }}
          />
          <Send />
        </div>
      </div>
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
        <div className="home-message-list-1">
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
          {user
            .filter((e) =>
              e.name.toLowerCase().includes(searchText1.toLowerCase())
            )
            .map((e, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <User />
                  <label>{e.name}</label>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
