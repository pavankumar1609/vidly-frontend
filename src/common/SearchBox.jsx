import React from "react";

function SearchBox({ value, onChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-2"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
}

export default SearchBox;
