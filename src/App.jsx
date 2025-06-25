import { useEffect, useState } from "react";
import ListComponent from "@/components/ListComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((users) => {
        setData(users);
        toast.success("🎉 Users loaded successfully!");
      })
      .catch((err) => {
        setError(err.message);
        toast.error(`❌ ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleView = (user) => {
    toast.info(`👤 Viewing profile of ${user.name}`);
  };

  return (
    <main className="app">
      <h1 className="app-title">🌟 User Directory</h1>

      {loading && (
        <div className="skeleton-list">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      )}

      {error && <p className="status-msg error">🚨 {error}</p>}

      {!loading && !error && (
        <ListComponent
          items={data}
          renderItem={(user) => (
            <div className="user-card-content">
              <div className="avatar">{user.name[0]}</div>
              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
              <button
                className="action-button"
                onClick={() => handleView(user)}
              >
                View
              </button>
            </div>
          )}
        />
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark" // use 'colored' if you want vibrancy instead
      />
    </main>
  );
}

export default App;
