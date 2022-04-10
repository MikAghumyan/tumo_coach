import { useEffect, useState } from "react";
import axios from "axios";

import Popup from "../popup";

const Workshop = (props) => {
  const [workshop, setWorkshop] = useState(props.workshop);
  const [studentEmailInuput, setstudentEmailInuput] = useState("");
  const [workshopStudents, setWorkshopStudents] = useState([]);
  const [isStudentsListActive, setIsStudentsListActive] = useState(false);
  const [isMoreInfoActive, setIsMoreInfoActive] = useState(false);
  const [hasInfoChanges, setHasInfoChanges] = useState(false);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await axios.get(`/api/workshops/${workshop._id}/students`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("coach")).token
          }`,
        },
      });
      setWorkshopStudents(res.data);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setMoreInfoStatus = () => {
    setIsMoreInfoActive(!isMoreInfoActive);
  };

  const setStudentsListStatus = () => {
    setIsStudentsListActive(!isStudentsListActive);
  };

  const onChangeStudent = (e) => {
    setstudentEmailInuput(e.target.value);
  };

  const attachStudent = async () => {
    try {
      const response = await axios.put(
        `/api/workshops/${workshop._id}/attach`,
        {
          email: studentEmailInuput,
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
        setWorkshopStudents((prevState) => [
          ...prevState,
          response.data.student,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeStudent = async (studentId) => {
    try {
      const response = await axios.put(
        `/api/workshops/detach`,
        {
          studentId,
          workshopId: workshop._id,
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
        let _students = workshopStudents.filter(
          (student) => student._id !== response.data.student._id
        );
        setWorkshopStudents(_students);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <th>{props.workshop._id.substr(1, 10)}</th>
      <td>{props.workshop.name}</td>
      <td>{props.workshop.level}</td>
      <td>
        <button
          onClick={setStudentsListStatus}
          className="button is-info is-outlined is-light"
        >
          Students
        </button>
        <Popup
          title="Workshop Students"
          isActive={isStudentsListActive}
          setActive={setStudentsListStatus}
          hasChanges={studentEmailInuput !== "" ? true : false}
          updateReq={attachStudent}
        >
          <div className="content is-medium">
            <ul>
              {workshopStudents.map((student, i) => {
                return (
                  <li key={i}>
                    {`${student.name} ${student.surname} `}
                    <a
                      className="button is-small is-danger is-inverted"
                      onClick={() => removeStudent(student._id)}
                    >
                      Remove
                    </a>
                  </li>
                );
              })}
            </ul>
            <label className="label">Add a Student</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="email"
                      placeholder="email"
                      value={studentEmailInuput}
                      onChange={onChangeStudent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popup>{" "}
        <button onClick className="button is-primary is-outlined is-light">
          More Info
        </button>{" "}
        <button
          onClick={() => {
            props.deleteWorkshop(props.workshop._id);
          }}
          className="button is-danger is-outlined is-light"
        >
          Delete
        </button>{" "}
      </td>
    </tr>
  );
};

export default Workshop;
