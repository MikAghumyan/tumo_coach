import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const res = await axios.get("/api/students", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("coach")).token}`,
        },
      });
      console.log(res.data.students);

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
      <Navbar currentPage="students" redirectPage="workshops" />
    </div>
  );
};

export default Students;
