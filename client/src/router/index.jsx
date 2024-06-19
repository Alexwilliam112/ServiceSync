import * as React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import { io } from 'socket.io-client'
import Toastify from 'toastify-js';
import BaseLayout from "../layouts/BaseLayout.jsx";
import LoginPage from "../views/LoginPage.jsx";
import ChatPage from "../views/ChatPage.jsx";
const url = "http://localhost:3001"
const socket = io("http://localhost:3001", {
    autoConnect: false
});
const router = createBrowserRouter([
    {
        path: "/login",
        element: < LoginPage url={url} />,
        loader: () => {
            if(localStorage.access_token) return redirect("/chat")
                
            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please login first",
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
                        fontWeight: "bold"
                    }
                }).showToast();
                return redirect('/login')
            }

            return null
        },  
        children: [
            {
                path: "/chat",
                element: < ChatPage socket={socket} />
            }
        ]
    }
]);
export default router