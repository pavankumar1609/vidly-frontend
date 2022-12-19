import { useState } from "react";

function withVisibility(Component) {
  return function WithVisibility(props) {
    const [passwordShown, setPasswordShown] = useState(false);

    const handlePasswordVisibility = () => {
      setPasswordShown(!passwordShown);
    };

    return (
      <Component
        {...props}
        passwordShown={passwordShown}
        onClick={handlePasswordVisibility}
      />
    );
  };
}

export default withVisibility;
