import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/userIcon.avif";
import Toastify from "toastify-js";

export default function ChatPage({ socket }) {
  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("defaultRoom");
  const [roomList, setRoomList] = useState([])
  const navigate = useNavigate();

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

  useEffect(() => {
    socket.auth = {
      username: localStorage.username,
    };

    socket.connect();

    socket.emit("joinRoom", { room });

    socket.on("message:update", (newMessage) => {
      setMessages((current) => {
        return [...current, newMessage];
      });
    });

    socket.on("newRoomList", (newRoomList) => {
      setRoomList(newRoomList)
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, [room]);

  const handleRoomChange = (newRoom) => {
    setMessages([]); // Clear messages when switching rooms
    setRoom(newRoom);
    socket.emit("joinRoom", { room: newRoom });
    console.log(room);
  };

  return (
    <>
      <div className="flex max-h-fit flex-row justify-between bg-white">
        
        <div className="flex max-h-full w-2/5 flex-col overflow-auto border-r-2">
          <div
            className={
              room !== "defaultRoom"
                ? "flex cursor-pointer flex-row items-center justify-center border-b-2 px-2 py-4"
                : "flex cursor-pointer flex-row items-center justify-center border-b-2 border-l-4 border-blue-400 px-2 py-4"
            }
            onClick={() => handleRoomChange("defaultRoom")}>
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Default Room</div>
              <span className="text-gray-500">Welcome to Default Room</span>
            </div>
          </div>
        </div>

        <div className="flex h-96 w-full flex-col justify-between overflow-auto px-5">
          <div className="mt-5 flex flex-col">
            {messages.map((chat, index) => (
              <>
                <div
                  className={
                    chat.from !== localStorage.username
                      ? "flex w-full justify-start"
                      : "flex w-full justify-end"
                  }>
                  <div
                    key={index}
                    className={`flex ${
                      chat.received ? "justify-start" : "justify-end"
                    } mb-4`}>
                    {chat.from !== localStorage.username ? (
                      <>
                        <label>
                          {chat.from === localStorage.username
                            ? "You"
                            : chat.from}
                        </label>
                        <img
                          src={userIcon}
                          className="h-12 w-12 rounded-full object-cover"
                          alt=""
                        />
                      </>
                    ) : null}
                  </div>
                  {/* {console.log(chat.received)} */}

                  <div
                    className={`${
                      chat.from !== localStorage.username
                        ? "ml-2 flex justify-center rounded-br-3xl rounded-tl-xl rounded-tr-3xl bg-gray-400 px-4 py-3 text-white"
                        : "mr-2  mt-4 flex rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 px-4 py-3 text-white"
                    } max-w-md break-words`}>
                    <label htmlFor="">{chat.message}</label>
                  </div>
                </div>
              </>
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
