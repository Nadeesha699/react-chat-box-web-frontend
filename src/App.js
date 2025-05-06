import './App.css';
import ChatBody from './pages/ChatBody';
import Home from './pages/Home';
import Intro from './pages/Intro';
import {  Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Intro/>} path='/'/>
      <Route element={<Home/>}  path='/home/:uid'/>
      <Route element={<ChatBody/>} path='/chat-body/:uid/:chatid'/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
