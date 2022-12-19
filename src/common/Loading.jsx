import "./Loading.css";

function Loading({ label = "Loading..." }) {
  return (
    <div className="spinner">
      <div className="spinner-grow text-info"></div>
      <div className="spinner-text text-info">{label}</div>
    </div>
  );
}

export default Loading;
