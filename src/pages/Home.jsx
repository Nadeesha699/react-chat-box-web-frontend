import { CheckCheck, Search, User } from "lucide-react";
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
      <div className="home-message-body"></div>
    </div>
  );
};

export default Home;
