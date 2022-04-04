const Popup = (props) => {
  return (
    <div className={`modal ${props.isActive ? "is-active" : ""}`}>
      <div
        className="modal-background"
        onClick={() => {
          props.setActive();
        }}
      ></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={() => {
              props.setActive();
            }}
          ></button>
        </header>
        <section className="modal-card-body">{props.children}</section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            disabled={true}
            onClick={() => {
              props.setActive();
            }}
          >
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Popup;
