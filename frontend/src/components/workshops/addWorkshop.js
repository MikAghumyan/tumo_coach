import { useState } from "react";
import axios from "axios";

const AddWorkshop = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
  });

  const { name, level, description } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/workshops/",
        {
          name,
          description,
          level,
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
        props.refetch();
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
          <p className="modal-card-title">Add a Workshop</p>
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
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      type="text"
                      placeholder="e.g. Robotics"
                      className="input"
                      name="name"
                      id="name"
                      value={name}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Description</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control ">
                    <textarea
                      className="textarea"
                      placeholder="Learn LabView"
                      name="description"
                      id="description"
                      value={description}
                      onChange={onChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">level</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control ">
                    <input
                      type="number"
                      className="input"
                      min="1"
                      max="3"
                      placeholder="1"
                      name="level"
                      id="level"
                      value={level}
                      onChange={onChange}
                      required
                    ></input>
                  </div>
                </div>
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

export default AddWorkshop;
