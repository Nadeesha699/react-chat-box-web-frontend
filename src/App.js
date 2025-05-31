import "./App.css";
import ChatBody from "./pages/ChatBody";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Intro />} path="/" />
          <Route element={<Home />} path="/home/:uid" />
          <Route element={<ChatBody />} path="/chat-body/:uid/:chatid" />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
