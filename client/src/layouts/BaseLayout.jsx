import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useContext, useEffect } from "react";
import { themeContext } from "../context/themeContext";

export default function BaseLayout() {
    const { currentTheme, theme } = useContext(themeContext);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme[currentTheme].dataTheme);
    }, [currentTheme, theme]);

    return (
        <>
        <div className= "h-svh bg-slate-200">
            <Navbar />
            <Outlet />
        </div>
        </>
    )
}