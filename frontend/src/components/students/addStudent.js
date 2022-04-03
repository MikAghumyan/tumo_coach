import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddStudent = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
  });

  const { name, surname } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(surname);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/students/",
        {
          name,
          surname,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("coach")).token
            }`,
          },
        }
      );
      if (response.data) {
        console.log(response.data);
        props.refetch();
      }
    } catch (error) {}
  };

  return (
    <div className={`modal ${props.isActive ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={() => {
          props.setActive();
        }}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modal title</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              props.setActive();
            }}
          ></button>
        </header>
        <section className="modal-card-body">
          <form className="">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  placeholder="e.g. Haykanush"
                  className="input"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Surname</label>
              <div className="control ">
                <input
                  type="text"
                  placeholder="e.g Sahakyan"
                  className="input"
                  name="surname"
                  id="surname"
                  value={surname}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <Link to="/students">
            <button onClick={onSubmit} class="button is-success">
              Save changes
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default AddStudent;
