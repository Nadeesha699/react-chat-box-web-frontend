import { ArrowLeftIcon, Send } from "lucide-react";
import { Link } from "react-router-dom";

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

const ChatBody = () => {
  return (
    <div className="home-message-body-mobile">
      <div className="home-message-body-1">
        <Link to="/home">
          <ArrowLeftIcon />
        </Link>
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
  );
};

export default ChatBody;
