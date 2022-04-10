import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../popup";

const Workshop = (props) => {
  return (
    <tr>
      <th>{props.workshop._id.substr(1, 10)}</th>
      <td>{props.workshop.name}</td>
      <td>{props.workshop.level}</td>
      <td>
        <button onClick className="button is-info is-outlined is-light">
          Students
        </button>{" "}
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
