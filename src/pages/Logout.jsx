import React, { useEffect } from "react";

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, [props]);

  return (<></>)
}

export default Logout;