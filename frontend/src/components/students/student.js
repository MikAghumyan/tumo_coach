import axios from "axios";
import { useState, useEffect } from "react";
import Popup from "../popup";

const Student = (props) => {
  const [student, setStudent] = useState(props.student);
  const [workshopInputs, setWorkshopInputs] = useState({
    workshop: "",
    level: "",
  });
  const [studentWorkshops, setStudentWorkshops] = useState([]);
  const [isWorkshopsListActive, setIsWorkshopsListActive] = useState(false);
  const [isMoreInfoActive, setIsMoreInfoActive] = useState(false);

  const { name, surname, email, phoneNumber } = student;

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("coach")).token
      }`,
    },
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await axios.get(
        `/api/students/${student._id}/workshops`,
        requestConfig
      );
      setStudentWorkshops(res.data);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, []);

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
        props.refetch();
      }
    } catch (error) {
      console.log(error.response);
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
        let _workshops = studentWorkshops.filter(
          (workshop) => workshop._id !== response.data.workshop._id
        );
        setStudentWorkshops(_workshops);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const attachWorkshop = async () => {
    try {
      const response = await axios.put(
        `/api/students/${student._id}/attach`,
        {
          name: workshopInputs.workshop,
          level: workshopInputs.level,
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
        setStudentWorkshops((prevState) => [
          ...prevState,
          response.data.workshop,
        ]);
      }
    } catch (error) {
      console.log(error.response);
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

  const onChangeWorkshop = (e) => {
    setWorkshopInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <tr>
      <th>{props.student._id.substr(1, 10)}</th>
      <td>{props.student.name}</td>
      <td>{props.student.surname}</td>
      <td>
        <button
          onClick={setWorkshopsListStatus}
          className="button is-info is-outlined is-light"
        >
          Workshops
        </button>
        <Popup
          title="Student workshops"
          isActive={isWorkshopsListActive}
          setActive={setWorkshopsListStatus}
          hasChanges={
            workshopInputs.workshop !== "" || workshopInputs.level !== ""
              ? true
              : false
          }
          updateReq={attachWorkshop}
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
                      value={workshopInputs.workshop}
                      onChange={onChangeWorkshop}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      min={1}
                      max={3}
                      name="level"
                      placeholder="Level"
                      value={workshopInputs.level}
                      onChange={onChangeWorkshop}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popup>{" "}
        <button
          onClick={setMoreInfoStatus}
          className="button is-primary is-outlined is-light"
        >
          More Info
        </button>{" "}
        <Popup
          title="Student Info"
          isActive={isMoreInfoActive}
          setActive={setMoreInfoStatus}
          hasChanges={
            name !== props.student.name ||
            surname !== props.student.surname ||
            email !== props.student.email ||
            phoneNumber !== props.student.phoneNumber
              ? true
              : false
          }
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
          className="button is-danger is-outlined is-light"
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
