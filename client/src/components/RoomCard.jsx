import { useState } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import userIcon from "../assets/userIcon.avif";

export default function RoomCard({ roomData, room, url }) {
  const [isChecked, setIsChecked] = useState(false);

  async function handleToggleAutoReply(roomId, changeTo) {
    try {
      const { data } = await axios.post(`${url}/autoreply`, 
        { roomId, changeTo },
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );
      console.log(data);

    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #000000, #ff0000)",
        },
        onClick: function () {},
      }).showToast();
    }
  }

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    handleToggleAutoReply(roomData.roomId, checked);
  };

  return (
    <div
      className={`flex cursor-pointer flex-row items-center justify-center border-b-2 px-2 py-4 ${
        room === roomData.roomId ? "border-l-4 border-blue-400" : ""
      }`}
    >
      <div className="w-1/4">
        <img
          src={userIcon}
          className="h-12 w-12 rounded-full object-cover"
          alt="User Icon"
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{roomData.topic}</div>
        <span className="text-gray-500">
          Welcome to {roomData.roomId === "defaultRoom" ? "Default Room" : roomData.topic}
        </span>
      </div>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="peer sr-only"
        />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-green-400">
          Autoreply
        </span>
      </label>
    </div>
  );
}
