import { io } from "socket.io-client";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const socket = io(apiUrl || "", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket server");
});

socket.on("reconnect_attempt", () => {
  console.log("Attempting to reconnect to socket server");
});
export default socket;
