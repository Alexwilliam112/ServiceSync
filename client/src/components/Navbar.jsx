import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Navbar() {
  const [topic, setTopic] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:3001";
  const decoded = atob(localStorage.role);

  async function handleAddRoom(e) {
    try {
      e.preventDefault();
      let body = {
        topic,
      };
      console.log(`${url}/cases`, `ini url`);
      await axios.post(`${url}/cases`, body , {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      toggleModal()
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      Toastify({
        text: err,
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

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div className="container rounded-lg shadow-lg">
        <div className="flex w-screen items-center justify-between border-b-2 bg-white px-5 py-5">
          {decoded === "user" ? (
            <button
              onClick={toggleModal}
              className="block rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
              type="button">
              Add Room
            </button>
          ) : (
            false
          )}
          <div className="text-2xl font-semibold">ServiceSync</div>
          <button
            onClick={handleLogout}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none">
            Logout
          </button>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 p-2 font-semibold text-white">
            {localStorage.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md p-4">
            <div className="relative rounded-lg bg-white shadow">
              <div className="flex items-center justify-between rounded-t border-b p-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Add Room
                </h3>
                <FontAwesomeIcon
                  icon={faX}
                  type="button"
                  onClick={toggleModal}
                  className="ms-auto inline-flex items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                  style={{ fontSize: "1rem" }}
                />
              </div>
              <div className="p-4">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="room-name"
                      className="mb-2 block text-sm font-medium text-gray-900">
                      Room Name
                    </label>
                    <input
                      type="text"
                      name="room-name"
                      id="room-name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter room name"
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleAddRoom}
                    className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
