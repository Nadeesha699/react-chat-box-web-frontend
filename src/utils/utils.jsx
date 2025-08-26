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

export const toastColor = "rgba(0, 0, 0, 1)";

export const toastColor01 = "#00000089";

export const toastColor02 = "#ff004c";

export const toastColor03 = "gray";

export const iconColor = "white";

export const iconColor01 = "#ffffffff";

export const iconColor02 = "black";

export const iconColor03 = "#a2a2a2";

export const iconColor04 = "black";

export const normalColor = "transparent";

export const messageCard = {
  senderPostion: "flex-end",
  recieverPostion: "flex-start",
  senderColor: "#ffffffff",
  recieverColor: "#717171ff",
  num1: 0,
  num2: "20px",
};

export const hideNum01 = "3%";

export const hideNum02 = "-100%";
