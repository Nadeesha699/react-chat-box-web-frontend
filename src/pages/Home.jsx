import { CheckCheck, Edit, Search, Send, User, User2 } from "lucide-react";
import { useState } from "react";
// https://dribbble.com/shots/23280048-Web-Chat-UI

const chatData = [
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "2m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "5m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "5m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "5m",
    message: "Hello baba",
  },
  {
    name: "Nadeesha Ruwndima",
    time: "5m",
    message: "Hello baba",
  },
];

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
          {chatData
            .filter((e) =>
              e.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((e, index) => {
              return (
                <div className="message-card" key={index}>
                  <User size={"40"} />
                  <div className="message-card-1">
                    <div className="message-card-2">
                      <label style={{ fontWeight: "bold" }}>{e.name}</label>
                      <CheckCheck size={"20"} />
                      <label style={{ color: "gray", fontSize: "10px" }}>
                        {e.time}
                      </label>
                    </div>
                    <div className="message-card-2">
                      <label style={{ color: "gray", fontSize: "12px" }}>
                        {e.message}
                      </label>
                      <label className="message-card-lbl">2</label>
                    </div>
                  </div>
                </div>
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
