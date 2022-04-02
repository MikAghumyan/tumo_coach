const TableItem = (props) => {
  return (
    <tr>
      <th>{props.student._id.substr(1, 10)}</th>
      <td>{props.student.name}</td>
      <td>{props.student.surname}</td>
      <td>
        <button className="button is-info">Workshops</button>
      </td>
      <td>
        <button className="button is-danger">Delete</button>
      </td>
    </tr>
  );
};

export default TableItem;
