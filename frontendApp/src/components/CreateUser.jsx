import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    const response = await axios("http://localhost:4000/api/users");
    setUsers(response.data);
  };

  const setData = async () => {
    await axios.post("http://localhost:4000/api/users", {
      username,
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeUsername = async (e) => {
    setUsername(e.target.value);
  };

  const onSubmitUser = async (e) => {
    e.preventDefault();
    setData();
    setUsername("");
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    fetchData();
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create New User</h3>
          <form onSubmit={onSubmitUser}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item list-group-item-action cursor-pointer"
              key={user._id}
              onDoubleClick={(id) => deleteUser(user._id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateUser;
