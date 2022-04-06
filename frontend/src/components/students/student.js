import axios from "axios";
import { useState, useEffect } from "react";
import Popup from "../popup";

const Student = (props) => {
  const [student, setStudent] = useState(props.student);
  const [studentWorkshops, setStudentWorkshops] = useState([]);
  const [isMoreInfoActive, setIsMoreInfoActive] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const { name, surname, email, phoneNumber } = student;

  const setMoreInfoStatus = () => {
    setIsMoreInfoActive(!isMoreInfoActive);
  };

  const setDefault = () => {
    setStudent(props.student);
  };

  const onChange = (e) => {
    setStudent((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await axios.get(`/api/students/${student._id}/workshops`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("coach")).token
          }`,
        },
      });
      setStudentWorkshops(res.data);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (
      name !== props.student.name ||
      surname !== props.student.surname ||
      email !== props.student.email ||
      phoneNumber !== props.student.phoneNumber
    ) {
      setHasChanges(true);
      console.log(name, props.student.name);
    } else {
      setHasChanges(false);
      console.log(name, props.student.name);
    }
  }, [student]);

  return (
    <tr>
      <th>{props.student._id.substr(1, 10)}</th>
      <td>{props.student.name}</td>
      <td>{props.student.surname}</td>
      <td>
        <button className="button is-info">Workshops</button>{" "}
        <button onClick={setMoreInfoStatus} className="button is-success">
          More Info
        </button>{" "}
        <Popup
          title="Student Info"
          isActive={isMoreInfoActive}
          setActive={setMoreInfoStatus}
          hasChanges={hasChanges}
          setDefault={setDefault}
        >
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Name</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Surname</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="surname"
                    value={student.surname}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Email</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="email"
                    value={student.email}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Phone Number</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="phoneNumber"
                    value={student.phoneNumber}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </Popup>
        <button
          className="button is-danger "
          onClick={() => {
            props.deleteStudent(props.student._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Student;
