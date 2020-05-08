import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let InitialForm = {
  author: "",
  title: "",
  content: "",
  date: new Date(),
};

const CreateNote = (props) => {
  const [editing, setEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(InitialForm);

  const fetchUsers = async () => {
    const response = await axios("http://localhost:4000/api/users");
    setUsers(response.data);
  };

  const editData = async () => {
    if (props.match.params.id) {
      const id = props.match.params.id;
      setEditing(true);
      const response = await axios(`http://localhost:4000/api/notes/${id}`);
      const newEdit = {
        title: response.data.title,
        author: response.data.author,
        content: response.data.content,
        date: new Date(response.data.date),
      };
      setForm(newEdit);
    }
  };

  useEffect(() => {
    fetchUsers();
    editData();
  }, []);

  const onFormChange = (e) => {
    const { value, name } = e.target;
    let newform = { ...form, [name]: value };
    if (newform.author === "") {
      newform = { ...form, author: users[0].username };
    }
    setForm(newform);
  };

  const onChangeDate = (date) => {
    const newform = { ...form, date };
    setForm(newform);
  };

  const setDates = async () => {
    if (editing) {
      const res = await axios.put(
        `http://localhost:4000/api/notes/${props.match.params.id}`,
        form
      );
      console.log(res);
    } else {
      await axios.post("http://localhost:4000/api/notes", form);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setDates();

    props.history.push("/");
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create a Note</h4>
        <form onSubmit={onSubmit}>
          {/* SELECT THE USER */}
          <div className="form-group">
            <select
              className="form-control"
              value={form.user}
              onChange={onFormChange}
              name="author"
              required
            >
              {users.map((user) => (
                <option key={user._id} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          {/* Note Title */}
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={onFormChange}
              name="title"
              value={form.title}
              required
            />
          </div>
          {/* Note Content */}
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Content"
              name="content"
              onChange={onFormChange}
              value={form.content}
              required
            ></textarea>
          </div>
          {/* Note Date */}
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={form.date}
              onChange={onChangeDate}
            />
          </div>
          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
