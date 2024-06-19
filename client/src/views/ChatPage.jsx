import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userIcon from "../assets/userIcon.avif";
import Toastify from "toastify-js";

export default function ChatPage({ socket }) {
  const [messageSent, setMessageSent] = useState("");
  const [messages, setMessages] = useState([]);
  // const [room, setRoom] = useState("defaultRoom");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("message:new", { message: messageSent });
    setMessageSent(""); // Clear the message input after sending
  }

  useEffect(() => {
    socket.connect();

    socket.on("message:update", (newMessage) => {
      setMessages((current) => {
        return [...current, newMessage];
      });
    });

    return () => {
      socket.off("message:update");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="container mx-auto rounded-lg shadow-lg">
      <div className="flex items-center justify-between border-b-2 bg-white px-5 py-5">
        <div className="text-2xl font-semibold">ServiceSync</div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 p-2 font-semibold text-white">
          T
        </div>
      </div>
      <div className="flex flex-row justify-between bg-white">
        <div className="flex w-2/5 flex-col overflow-y-auto border-r-2">
          <div className="flex flex-row items-center justify-center border-b-2 px-2 py-4">
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Luis1994</div>
              <span className="text-gray-500">Pick me at 9:00 Am</span>
            </div>
          </div>
          <div className="flex flex-row items-center border-b-2 px-2 py-4">
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Everest Trip 2021</div>
              <span className="text-gray-500">Hi Sam, Welcome</span>
            </div>
          </div>
          <div className="flex flex-row items-center border-b-2 border-l-4 border-blue-400 px-2 py-4">
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">MERN Stack</div>
              <span className="text-gray-500">Lusi : Thanks Everyone</span>
            </div>
          </div>
          <div className="flex flex-row items-center border-b-2 px-2 py-4">
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Javascript Indonesia</div>
              <span className="text-gray-500">
                Evan : some one can fix this
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center border-b-2 px-2 py-4">
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Javascript Indonesia</div>
              <span className="text-gray-500">
                Evan : some one can fix this
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center border-b-2 px-2 py-4">
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Javascript Indonesia</div>
              <span className="text-gray-500">
                Evan : some one can fix this
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center border-b-2 px-2 py-4">
            <div className="w-1/4">
              <img
                src={userIcon}
                className="h-12 w-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Javascript Indonesia</div>
              <span className="text-gray-500">
                Evan : some one can fix this
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between px-5">
        <div className="mt-5 flex flex-col">
            {messages.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.received ? "justify-start" : "justify-end"
                } mb-4`}
              >
                {chat.received ? (
                  <img
                    src={userIcon}
                    className="h-12 w-12 rounded-full object-cover"
                    alt=""
                  />
                ) : null}
                <div
                  className={`${
                    chat.received
                      ? "ml-2 rounded-br-3xl rounded-tl-xl rounded-tr-3xl bg-gray-400 px-4 py-3 text-white"
                      : "mr-2 mt-4 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 px-4 py-3 text-white"
                  } max-w-md break-words`}
                >
                  {chat.message}
                </div>
                {!chat.received ? (
                  <img
                    src={userIcon}
                    className="h-12 w-12 rounded-full object-cover"
                    alt=""
                  />
                ) : null}
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
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
