import { IconContext } from "react-icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Like({ liked, onLike }) {
  return (
    <IconContext.Provider value={{ size: "1.3em", className: "clickable" }}>
      {liked ? (
        <FaHeart onClick={onLike} color="red" />
      ) : (
        <FaRegHeart onClick={onLike} />
      )}
    </IconContext.Provider>
  );
}

export default Like;
