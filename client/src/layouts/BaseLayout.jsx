import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function BaseLayout() {
    return (
        <>
        <div className=" min-h-screen bg-slate-200">
            <Navbar />
            <Outlet />
        </div>
        </>
    )
}