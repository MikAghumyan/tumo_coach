import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddStudent = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });

  const { name, surname, email, phoneNumber } = formData;

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
          email,
          phoneNumber,
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
        props.refetch(response.data.student);
      }
    } catch (error) {}
    props.setActive();
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
          <p className="modal-card-title">Add a Student</p>
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
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  placeholder="e.g. nanisahakyan@gmail.com"
                  className="input"
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Phone Number</label>
              <div className="control">
                <input
                  type="tel"
                  placeholder="e.g. +37496000069"
                  className="input"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button onClick={onSubmit} className="button is-success">
            Save changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AddStudent;
