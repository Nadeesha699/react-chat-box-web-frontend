export function timeAgo(date) {
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

export const iconSize = 15;

export const iconSize01 = 50;

export const iconSize02 = 60;

export const iconSize03 = 100;

export const toastColor = "#0073ff";

export const toastColor01 = "#00000089";

export const toastColor02 = "#ff004c";

export const iconColor = "white";

export const iconColor01 = "#c2daf7";

export const updateColor = "#00ff00ab"

export const deleteColor = "#ff000057"

export const messageCard = {
  senderPostion: "flex-end",
  recieverPostion: "flex-start",
  senderColor: "#55a1ff",
  recieverColor: "#55d1ff",
  num1: 0,
  num2: "20px",
};
