import { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../popup";

const Workshop = (props) => {
  return (
    <tr>
      <th>{props.workshop._id.substr(1, 10)}</th>
      <td>{props.workshop.name}</td>
      <td>{props.workshop.level}</td>
    </tr>
  );
};

export default Workshop;
