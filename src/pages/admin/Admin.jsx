import { useEffect, useState } from "react";
import "./admin.scss";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      const res = await axios.get("http://localhost:5000/api/users/find");
      setUsers(res.data);
      setEmail("");
      setUsername("");
      setPassword("");
      alert("added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/find");
        setUsers(res.data);
      } catch (error) {}
    };

    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
      setUsers(users.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin">
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>

                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(item._id)}
                >
                  delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <form onSubmit={handleRegistration}>
          <input
            type="text"
            placeholder="Enter your username..."
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
          <label>Password</label>
          <button
            type="submit"
            style={{
              padding: "10px",
              width: "100px",
              marginTop: "10px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
