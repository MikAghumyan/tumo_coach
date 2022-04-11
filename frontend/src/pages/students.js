import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";

import Navbar from "../components/navbar";
import Student from "../components/students/student";
import AddStudent from "../components/students/addStudent";

const Students = (props) => {
  const [fetchedStudents, setFetchedStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const fuse = new Fuse(fetchedStudents, {
    includeScore: true,
    keys: ["name", "surname"],
  });

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("coach")).token
      }`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/students", requestConfig);
      setFetchedStudents(res.data.students);
      setStudents(res.data.students);
    };

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const search = (value) => {
    if (value === "") {
      setStudents(fetchedStudents);
    } else {
      const filtered = fuse.search(value);
      setStudents(filtered.map((item) => item.item));
    }
  };

  const deleteStudent = async (id) => {
    try {
      const res = await axios.delete(`/api/students/${id}`, requestConfig);
      let _students = fetchedStudents.filter(
        (student) => student._id !== res.data.student._id
      );
      setFetchedStudents(_students);
      setStudents(_students);
    } catch (error) {
      console.log(error);
    }
  };

  const refetch = async (data) => {
    try {
      const res = await axios.get("/api/students", requestConfig);
      setFetchedStudents(res.data.students);
      setStudents(res.data.students);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar
        currentPage="students"
        redirectPage="workshops"
        search={search}
        verify={props.verify}
        refetch={refetch}
      />
      <div className="pt-2 pr-5 pl-5">
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
              return (
                <Student
                  key={i}
                  student={student}
                  deleteStudent={deleteStudent}
                  refetch={refetch}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
