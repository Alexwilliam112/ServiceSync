import axios from "axios";
import { useEffect, useState } from "react";
import userIcon from "../assets/userIcon.avif";
import RoomCard from "../components/RoomCard";

export default function ChatPage_Admin({ socket, url }) {
  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState(null);
  const [roomList, setRoomList] = useState([]);

  async function fetchRoomList() {
    try {
      let { data } = await axios.get(`${url}/cases`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data);
      setRoomList(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (messageSent.trim() !== "") {
      socket.emit("message:new", {
        message: messageSent,
        roomId: room,
        username: localStorage.username,
      }); // Include room
      setMessageSent(""); // Clear the message input after sending
    }
  }

  const handleRoomChange = async (newRoom) => {
    const { data } = await axios.get(`${url}/chat-history/${newRoom}`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    console.log(data, "ini chat history");
    setMessages(data); // Clear messages when switching rooms

    // setMessages([]); // Clear messages when switching rooms
    console.log({
      message: messageSent,
      roomId: room,
      username: localStorage.username,
    });
    setRoom(newRoom);
    console.log(`ROOM NAME:` + newRoom);
    socket.emit("joinRoom", { room: newRoom });
  };

  useEffect(() => {
    fetchRoomList();
    socket.auth = {
      username: localStorage.username,
    };

    socket.connect();

    socket.emit("joinRoom", { room });
    console.log(room);

    socket.on("message:update", (newMessage) => {
      setMessages((current) => {
        return [...current, newMessage];
      });
    });

    // socket.on("newRoomList", (newRoomList) => {
    //   setRoomList(newRoomList);
    // });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="flex h-5/6 flex-row justify-between bg-white">
        <div className="flex max-h-full w-2/5 flex-col overflow-auto border-r-2">
          {roomList.map((el, i) => {
            return (
              <div key={i} onClick={() => handleRoomChange(el.roomId)}>
                <RoomCard roomData={el} room={room} />
              </div>
            );
          })}
        </div>
        <div className="flex h-96 w-full flex-col justify-between overflow-auto px-5">
          <div className="mt-5 flex flex-col">
            {messages.map((chat, index) => (
              <div
                key={index}
                className={
                  chat.username !== localStorage.username
                    ? "mb-4 flex w-full justify-start"
                    : "mb-4 flex w-full justify-end"
                }>
                {chat.username !== localStorage.username ? (
                  <div className="flex items-start">
                    <img
                      src={userIcon}
                      className="h-12 w-12 rounded-full object-cover"
                      alt="user icon"
                    />
                    <div className="ml-2">
                      <label className="mb-1 block text-xs text-gray-500">
                        {chat.username}
                      </label>
                      <div className="flex w-fit justify-center break-words rounded-br-3xl rounded-tl-xl rounded-tr-3xl bg-gray-400 px-4 py-3 text-white">
                        <label htmlFor="">{chat.message}</label>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end">
                    <div className="mr-2 text-right">
                      <label className="mb-1 block text-xs text-gray-500">
                        {chat.username}
                      </label>
                      <div className="flex w-fit justify-end break-words rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 px-4 py-3 text-white">
                        <label htmlFor="">{chat.message}</label>
                      </div>
                    </div>
                    <img
                      src={userIcon}
                      className="h-12 w-12 rounded-full object-cover"
                      alt="user icon"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <form className="relative py-5" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-xl bg-gray-300 px-3 py-5 pr-12"
              type="text"
              placeholder="type your message here..."
              onChange={(e) => setMessageSent(e.target.value)}
              value={messageSent}
            />
            <button
              className="btn btn-base-100 absolute bottom-0 right-0 top-0 m-auto mr-3"
              type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
