import Logo from "../images/n_8970968.png";

const Intro = () => {
  return (
    <div
      style={{
        backgroundColor: "tomato",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "steelblue",
          height: "80vh",
          width: "70%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ backgroundColor: "wheat", width: "50%" }}>
          <img src={Logo} />
          <input placeholder="Email" />
          <input placeholder="User name" />
          <input placeholder="Password" type="password" />
          <button>Sign up</button>
        </div>
        <div style={{ backgroundColor: "darkorange", width: "50%" }}>
          <img src={Logo} />
          <input placeholder="User name" />
          <input placeholder="Password" type="password" />
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
