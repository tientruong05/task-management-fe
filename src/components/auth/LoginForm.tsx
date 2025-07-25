import { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Login data:", { username, password });
  };
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter username"
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"
          className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
