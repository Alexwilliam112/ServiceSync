import { useState } from "react";
import userIcon from "../assets/userIcon.avif";
import axios from "axios";

export default function RoomCard({
  roomData,
  room,
  setRoom,
  url,
  setMessages,
  socket
}) {
  const handleRoomChange = async (newRoom) => {
    const { data } = await axios.get(`${url}/chat-history/${newRoom?.roomId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    })
    console.log(data, `<<<<<<<<<<<<<<<<<<<<< ini data`);
    setMessages(data); // Clear messages when switching rooms
    setRoom(newRoom?.roomId);
    console.log(newRoom)
    console.log(roomData.topic, "<<<<<<<<<<<NewRoom");
    socket.emit("joinRoom", { room: newRoom });
  };
  return (
    <div>
      <div
        className={
          room !== "defaultRoom"
            ? "flex cursor-pointer flex-row items-center justify-center border-b-2 px-2 py-4"
            : "flex cursor-pointer flex-row items-center justify-center border-b-2 border-l-4 border-blue-400 px-2 py-4"
        }
        onClick={() => handleRoomChange(roomData)}>
        <div className="w-1/4">
          <img
            src={userIcon}
            className="h-12 w-12 rounded-full object-cover"
            alt=""
          />
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">{roomData.topic}</div>
          <span className="text-gray-500">Welcome to Default Room</span>
        </div>
      </div>
    </div>
  );
}
