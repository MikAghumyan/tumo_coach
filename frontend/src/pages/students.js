import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import Student from "../components/students/student";
import Message from "../components/message";

const Students = (props) => {
  let [searchParams] = useSearchParams();
  let searchbox = searchParams.get("search");
  const [students, setStudents] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const requestConfig = {
    params: { search: searchbox },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("coach")).token
      }`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/students", requestConfig);
      setStudents(res.data.students);
    };

    try {
      fetchData();
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }, [searchParams]);

  const deleteStudent = async (id) => {
    try {
      const res = await axios.delete(`/api/students/${id}`, requestConfig);
      let _students = students.filter(
        (student) => student._id !== res.data.student._id
      );
      setStudents(_students);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const refetch = async (data) => {
    try {
      const res = await axios.get("/api/students", requestConfig);
      setStudents(res.data.students);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar
        currentPage="students"
        redirectPage="workshops"
        searchbox={searchbox ? searchbox : ""}
        verify={props.verify}
        refetch={refetch}
      />
      {errorMessage !== "" && (
        <Message message={errorMessage} close={() => setErrorMessage("")} />
      )}
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
