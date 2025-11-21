import React from "react";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const HomeScanButton: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirectToPerfil = () => {
    navigate("/scan");
  };

  return (
    <button className="btn-user" onClick={handleRedirectToPerfil}>
      <IoHome />
      Ir para Scan
    </button>
  );
};

export default HomeScanButton;
