import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useContext } from "react";
import { themeContext } from "../context/themeContext";

export default function BaseLayout() {
    const { currentTheme, theme } = useContext(themeContext);

    return (
        <>
        <div className=" h-svh bg-slate-200" data-theme={theme[currentTheme].dataTheme}>
            <Navbar />
            <Outlet />
        </div>
        </>
    )
}