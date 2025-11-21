import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AreaDeUsuario: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirectToPerfil = () => {
    navigate("/perfil"); 
  };

  return (
    <button className="btn-user" onClick={handleRedirectToPerfil}>
      <FaUserCircle />
      Área do usuário
    </button>
  );
};

export default AreaDeUsuario;