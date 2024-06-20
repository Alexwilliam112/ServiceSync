import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { themeContext } from "../context/themeContext";

export default function Navbar() {
  const [topic, setTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:3001";
  const decoded = atob(localStorage.role);
  const { currentTheme, setCurrentTheme } = useContext(themeContext);

  function handleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  async function handleAddRoom(e) {
    try {
      e.preventDefault();
      let body = {
        topic,
      };
      await axios.post(`${url}/cases`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      toggleModal();
      window.location.reload();
    } catch (error) {
      console.error(error);
      Toastify({
        text: "Failed to add room",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
          position: "absolute",
          right: 0,
        },
      }).showToast();
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
    {console.log(currentTheme)}
      <div className={currentTheme === "light" ? "flex items-center justify-between border-b-2 bg-base-100 px-5 py-5 shadow-md" : "flex items-center justify-between border-b-2 bg-base-100 px-5 py-5 shadow-md bg-gray-700"}>
        {decoded === "user" && (
          <button
            onClick={toggleModal}
            className={currentTheme === "light" ? "btn btn-primary bg-black" :"btn btn-primary hover:bg-green-400 bg-green-500" }
          >
            Add Room
          </button>
        )}

        <div className={currentTheme === "light" ? "flex-grow text-center text-2xl font-semibold" : "flex-grow text-center text-2xl font-semibold text-white" }>
          ServiceSync
        </div>

        <div className="flex items-center space-x-4">
          {currentTheme === "light" ? (
            <FontAwesomeIcon
              icon={faSun}
              onClick={handleTheme}
              className="cursor-pointer text-gray-400 hover:text-gray-900"
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              onClick={handleTheme}
              className="cursor-pointer text-gray-400 hover:text-gray-900"
            />
          )}
          <button
            onClick={handleLogout}
            className={currentTheme === "light" ? "btn btn-primary bg-black" :"btn btn-primary hover:bg-green-400 bg-green-500" }
          >
            Logout
          </button>
          <div className="avatar placeholder">
            <div className={currentTheme === "light" ? "bg-blue-500 text-neutral-content rounded-full w-12":"bg-red-500 text-neutral-content rounded-full w-12"} >
              <span className="text-xl text-white">{localStorage.username.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50"
        >
          <div className="relative w-full max-w-md p-4">
            <div className="relative rounded-lg bg-base-100 shadow bg-white">
              <div className="flex items-center justify-between rounded-t border-b p-4 bg-white">
                <h3 className="text-xl text-black font-semibold text-base-content">
                  Add Room
                </h3>
                <FontAwesomeIcon
                  icon={faX}
                  type="button"
                  onClick={toggleModal}
                  className="cursor-pointer text-gray-400 hover:text-gray-900"
                />
              </div>
              <div className="p-4 bg-white">
                <form className="space-y-4" onSubmit={handleAddRoom}>
                  <div>
                    <label
                      htmlFor="room-name"
                      className="block text-black text-sm font-medium text-base-content"
                    >
                      Room Name
                    </label>
                    <input
                      type="text"
                      name="room-name"
                      id="room-name"
                      className="bg-white input input-bordered w-full"
                      placeholder="Enter room name"
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full bg-blue-600 text-gray-50"
                  >
                    Create Room
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
