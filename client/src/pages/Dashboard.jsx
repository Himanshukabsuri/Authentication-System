import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white shadow-lg p-10 rounded-xl">

        <h1 className="text-3xl font-bold mb-4">
          Welcome {user?.fullName}
        </h1>

        <p className="mb-5">{user?.email}</p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Dashboard;