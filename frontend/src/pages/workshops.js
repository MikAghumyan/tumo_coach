import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/navbar";
import Workshop from "../components/workshops/workshop";
import Message from "../components/message";

const Workshops = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  let searchbox = searchParams.get("search");
  const [workshops, setWorkshops] = useState([]);

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
      const response = await axios.get("api/workshops", requestConfig);
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
      const res = await axios.get("/api/workshops", requestConfig);
      setWorkshops(res.data.workshops);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const deleteWorkshop = async (id) => {
    try {
      const res = await axios.delete(`/api/workshops/${id}`, requestConfig);
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
        searchbox={searchbox ? searchbox : ""}
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
