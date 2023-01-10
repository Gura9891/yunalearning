import "./toast.scss";

const toastMessage = (message, description) => {
  return (
    <div className="toast__wrapper">
      <p className="message">{message}</p>
      <p className="description">{description}</p>
    </div>
  );
};

export default toastMessage;
