import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import Workshop from "../components/workshops/workshop";
import Message from "../components/message";

const Workshops = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [workshops, setWorkshops] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("api/workshops", {
        params: { search: searchParams.get("search") },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("coach")).token
          }`,
        },
      });
      setWorkshops(response.data.workshops);
    };

    try {
      fetchData();
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }, [searchParams]);

  const search = (value) => {
    setSearchParams({ search: value });
  };

  const refetch = async (data) => {
    try {
      const res = await axios.get("/api/workshops", {
        params: { search: searchParams.get("search") },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("coach")).token
          }`,
        },
      });
      setWorkshops(res.data.workshops);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteWorkshop = async (id) => {
    try {
      const res = await axios.delete(`/api/workshops/${id}`, {
        params: { search: searchParams.get("search") },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("coach")).token
          }`,
        },
      });
      let _workshops = workshops.filter(
        (workshop) => workshop._id !== res.data.workshop._id
      );
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
        searchbox={searchParams.get("search") ? searchParams.get("search") : ""}
        search={search}
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
