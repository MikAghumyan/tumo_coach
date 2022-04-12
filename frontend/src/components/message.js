const Message = ({ message, close }) => {
  return (
    <div class="notification is-danger">
      <button class="delete" onClick={() => close()}></button>
      {message}
    </div>
  );
};

export default Message;
