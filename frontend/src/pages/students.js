import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";

import Navbar from "../components/navbar";
import TableItem from "../components/tableItem";

const Students = () => {
  const [fetchedStudents, setFetchedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", surname: "" });
  const fuse = new Fuse(fetchedStudents, {
    includeScore: true,
    keys: ["name", "surname"],
  });

  const { name, surname } = formData;

  const search = (value) => {
    if (value == "") {
      setStudents(fetchedStudents);
    } else {
      console.log(value);
      console.log(fetchedStudents);
      const filtered = fuse.search(value);
      setStudents(filtered.map((item) => item.item));
    }
  };

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
        setStudents((prevState) => [...prevState, response.data.student]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/students", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("coach")).token
          }`,
        },
      });
      console.log(res.data.students);
      setFetchedStudents(res.data.students);
      setStudents(res.data.students);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Navbar currentPage="students" redirectPage="workshops" search={search} />
      <div className="pt-2 pr-5 pl-5">
        <div className="block">
          <form className="" onSubmit={onSubmit}>
            <div className="field is-grouped ">
              <div className=""></div>
              <label className="label pr-3">Add Student:</label>
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  id="surname"
                  value={surname}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="control">
                <button className="button is-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Surname</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, i) => {
              return <TableItem key={i} student={student} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
