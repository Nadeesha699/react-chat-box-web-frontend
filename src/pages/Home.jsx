import { CheckCheck, Search, Send, User } from "lucide-react";
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

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-message-list">
        <div className="home-message-list-1">
          <Search />
          <input
            placeholder="search"
            style={{
              width: "100%",
              borderStyle: "hidden",
              backgroundColor: "transparent",
            }}
          />
        </div>
        <div className="scroll-container">
          {chatData.map((e) => {
            return (
              <div className="message-card">
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
        <div
         className="home-message-body-1"
        >
          <label style={{ fontWeight: "bold" }}>Nadeesha Ruwandima</label>
        </div>
        <div
          className="home-message-card-1"
        >
          {messaheData.map((e) => {
            return (
              <div
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
            }}
          />
          <Send/>
        </div>
      </div>
    </div>
  );
};

export default Home;
