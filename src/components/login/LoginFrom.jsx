import { useRouter } from "next/navigation";

export const LoginForm = ({
  onToggle,
  email,
  setEmail,
  password,
  setPassWord,
}) => {
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/game");
      } else {
        console.error("Erreur" + data.message);
      }
    } catch (error) {
      console.error("Networ Error" + error);
    }
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email.trim().toLowerCase()}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Pass Word</label>
        <input
          type="password"
          placeholder="🔒 Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassWord(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-medium"
      >
        Login
      </button>
      <button
        onClick={onToggle}
        className="w-full text-blue-500 hover:text-blue-600 underline"
      >
        Don&apos;t have an account? Sign up
      </button>
    </div>
  );
};
