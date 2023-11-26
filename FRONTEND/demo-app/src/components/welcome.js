import React from "react";
import { useParams } from "react-router-dom";

const WelcomePage = () => {
  const { username } = useParams();

  return (
    <div>
      <h2>Welcome, {username}!</h2>
         
    </div>
  );
};

export default WelcomePage;
