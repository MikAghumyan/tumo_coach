import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";

import Navbar from "../components/navbar";
import Workshop from "../components/workshops/workshop";

const Workshops = (props) => {
  const [fetchedWorkshops, setFetchedWorkshops] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const fuse = new Fuse(fetchedWorkshops, {
    includeScore: true,
    keys: ["name"],
  });

  const [errorMessage, setErrorMessage] = useState("");

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("coach")).token
      }`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("api/workshops", requestConfig);
      setFetchedWorkshops(response.data.workshops);
      setWorkshops(response.data.workshops);
    };

    try {
      fetchData();
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }, []);

  const search = (value) => {
    if (value === "") {
      setWorkshops(fetchedWorkshops);
    } else {
      const filtered = fuse.search(value);
      setWorkshops(filtered.map((item) => item.item));
    }
  };

  const refetch = async (data) => {
    try {
      const res = await axios.get("/api/workshops", requestConfig);
      setFetchedWorkshops(res.data.workshops);
      setWorkshops(res.data.workshops);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteWorkshop = async (id) => {
    try {
      const res = await axios.delete(`/api/workshops/${id}`, requestConfig);
      let _workshops = fetchedWorkshops.filter(
        (workshop) => workshop._id !== res.data.workshop._id
      );
      setFetchedWorkshops(_workshops);
      setWorkshops(_workshops);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar
        currentPage="workshops"
        redirectPage="students"
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
              <th>level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((workshop, i) => {
              return (
                <Workshop
                  key={i}
                  workshop={workshop}
                  deleteWorkshop={deleteWorkshop}
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

export default Workshops;
