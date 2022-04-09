import axios from "axios";
import { useState, useEffect } from "react";
import Popup from "../popup";

const Student = (props) => {
  const [student, setStudent] = useState(props.student);
  const [studentWorkshops, setStudentWorkshops] = useState([]);
  const [isWorkshopsListActive, setIsWorkshopsListActive] = useState(false);
  const [isMoreInfoActive, setIsMoreInfoActive] = useState(false);
  const [hasInfoChanges, setHasChanges] = useState(false);

  const { name, surname, email, phoneNumber } = student;

  const setMoreInfoStatus = () => {
    setIsMoreInfoActive(!isMoreInfoActive);
  };

  const setWorkshopsListStatus = () => {
    setIsWorkshopsListActive(!isWorkshopsListActive);
  };

  const updateReq = async () => {
    try {
      const response = await axios.put(
        `/api/students/${props.student._id}`,
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
        props.refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeWorkshop = async (workshopId) => {
    try {
      const response = await axios.put(
        `/api/workshops/detach`,
        {
          workshopId,
          studentId: student._id,
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
    } catch (error) {
      console.log(error);
    }
  };

  const setInfoDefault = () => {
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
        <button onClick={setWorkshopsListStatus} className="button is-info">
          Workshops
        </button>
        <Popup
          title="Student workshops"
          isActive={isWorkshopsListActive}
          setActive={setWorkshopsListStatus}
        >
          <div className="content is-medium">
            <ul>
              {studentWorkshops.map((workshop, i) => {
                return (
                  <li key={i}>
                    {`${workshop.name} - level ${workshop.level} `}
                    <a
                      className="button is-small is-danger is-inverted"
                      onClick={() => removeWorkshop(workshop._id)}
                    >
                      Remove
                    </a>
                  </li>
                );
              })}
            </ul>
            <label className="label">Add Workshop</label>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="workshop"
                      placeholder="Workshop"
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="workshop"
                      placeholder="Level"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popup>{" "}
        <button onClick={setMoreInfoStatus} className="button is-success">
          More Info
        </button>{" "}
        <Popup
          title="Student Info"
          isActive={isMoreInfoActive}
          setActive={setMoreInfoStatus}
          hasChanges={hasInfoChanges}
          setDefault={setInfoDefault}
          updateReq={updateReq}
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
