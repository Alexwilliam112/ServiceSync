import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

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

  return (
    <>
      <div className="container rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b-2 bg-white px-5 py-5 w-screen">
          <div className="text-2xl font-semibold">ServiceSync</div>
          <button onClick={handleLogout}>Logout</button>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 p-2 font-semibold text-white">
            {localStorage.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </>
  );
}
