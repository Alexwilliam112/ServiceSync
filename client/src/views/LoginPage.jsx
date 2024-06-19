import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function googleLogin(googleResponse) {
    try {
        const { data } = await axios.post(`${url}/google-login`, null, {
          headers: { token: googleResponse.credential },
        });
        localStorage.setItem("token", data.access_token);
      navigate("/login");
    } catch (error) {
        console.log(error);
      //   Toastify({
      //     text: "Error",
      //     duration: 3000,
      //     newWindow: true,
      //     close: true,
      //     gravity: "bottom",
      //     position: "right",
      //     stopOnFocus: true,
      //     style: {
      //       background: "linear-gradient(to right, #000000  , #ff0000)",
      //     },
      //     onClick: function () {},
      //   }).showToast();
    }
  }

  async function handleLogin(e) {
    try {
      event.preventDefault();
    } catch (error) {}
  }

  return (
    <>
      <div className=" flex h-svh w-svw items-center justify-center bg-blue-300">
        <form class="mx-auto max-w-3xl rounded-xl bg-white p-5">
          <div class="mb-5">
            <label
              for="email"
              class="mb-2 block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-5">
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full"
            onClick={handleLogin}>
            Login
          </button>
          <br />
          <div className=" m-5">
          <GoogleLogin onSuccess={googleLogin} />
          </div>
        </form>
      </div>
    </>
  );
}
