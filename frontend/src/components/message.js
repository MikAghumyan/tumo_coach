const Message = ({ message, close }) => {
  return (
    <div className="notification is-danger">
      <button className="delete" onClick={() => close()}></button>
      {message}
    </div>
  );
};

export default Message;
