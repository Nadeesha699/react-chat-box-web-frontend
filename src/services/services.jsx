import axios from "axios";
import { api_url } from "../components/Components";

export const latestMessage = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data[data.length - 1]?.message : "No message found";
  } catch (error) {}
};

export const latestTime = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data[data.length - 1]?.createAt : "N/A";
  } catch (error) {}
};

export const latestRead = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data[data.length - 1]?.read : false;
  } catch (error) {}
};

export const unreadCount = async (a) => {
  try {
    const response = await axios.get(
      `${api_url}message/get-all/unread-messages/by-conversation-id?id=${a}`
    );
    const data = response.data.data;
    return data ? data : 0;
  } catch (error) {}
};
