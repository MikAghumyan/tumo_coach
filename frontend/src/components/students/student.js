import axios from "axios";
import { useState, useEffect } from "react";
import Popup from "../popup";

const Student = (props) => {
  const [student, setStudent] = useState(props.student);
  const [studentWorkshops, setStudentWorkshops] = useState([]);
  const [isMoreInfoActive, setIsMoreInfoActive] = useState(false);

  const setMoreInfoStatus = () => {
    setIsMoreInfoActive(!isMoreInfoActive);
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
  }, [studentWorkshops]);

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
        >
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Name</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input className="input" type="text" value={student.name} />
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
                    value={student.surname}
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
                  <input className="input" type="text" value={student.email} />
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
                    value={student.phoneNumber}
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
