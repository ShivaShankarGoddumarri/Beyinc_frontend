import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ApiServices } from "../../Services/ApiServices";

const Editprofile = () => {
  const { email, role, userName } = useSelector(
    (store) => store.auth.loginDetails
  );
  useEffect(() => {
    ApiServices.getProfile({ email: email })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email]);

  return <div>{email}</div>;
};

export default Editprofile;
