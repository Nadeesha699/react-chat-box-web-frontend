import { FaCheckDouble, FaUser } from "react-icons/fa";

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
];

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "yellow",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          backgroundColor: "aliceblue",
          width: "20%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "1%",
          gap: "2%",
        }}
      >
        <input placeholder="search" />
        <div
          style={{
            backgroundColor: "tomato",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {chatData.map((e) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "2%",
                  backgroundColor: "blueviolet",
                  gap: "2%",
                }}
              >
                <FaUser size={"40"} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "salmon",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent:"space-between",
                      alignItems:"center"
                    }}
                  >
                    <label>{e.name}</label>
                    <FaCheckDouble />
                    <label>{e.time}</label>
                  </div>
                  <div
                    style={{
                      backgroundColor: "pink",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent:"space-between",
                      alignItems:"center"
                    }}
                  >
                    <label>{e.message}</label>
                    <label style={{backgroundColor:"yellow",borderRadius:"50%"}}>2</label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{ backgroundColor: "turquoise", width: "80%", height: "100vh" }}
      ></div>
    </div>
  );
};

export default Home;
