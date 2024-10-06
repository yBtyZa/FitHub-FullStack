import styles from "./styles.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { ExerciciosContext } from "../../../context/ExercicioContext";
import { UsuariosContext } from "../../../context/UsuariosContext";
import useAuth from "../../../hooks/useAuth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CircleIcon from "@mui/icons-material/Circle";

function CTitleDashboard() {
  const { exercicios } = useContext(ExerciciosContext);
  const { getAllActiveUsers, userAtivos } = useContext(UsuariosContext);

  const { tokenJWT } = useAuth();

  const [isExibirNomes, setIsExibirNomes] = useState(false);

  const refOnline = useRef(null);

  const mudarEstilo = () => {
    setIsExibirNomes(!isExibirNomes);
  };

  useEffect(() => {
    getAllActiveUsers();
  }, []);

  return (
    <div className={styles.title_info}>
      <div
        className={styles.titleExercicios}
        style={{
          backgroundColor: "#01161E",
          color: "#eff6e0",
          marginRight: tokenJWT ? "20rem" : "0", 
          padding: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "2.5rem",
        }}
      >
        <p>
          Locais cadastrados:{" "}
          <span className={styles.count}>{exercicios.length}</span>
        </p>
      </div>
      {tokenJWT && (
      <div
        className={styles.titleOnline}
        style={{
          backgroundColor: "#01161E",
          color: "#eff6e0",
          marginLeft: "15rem",
          padding: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 1.5s ease",
          position: "absolute",
          zIndex: 2000,
          borderBottom: isExibirNomes ? "1px solid #eff6e0" : "none",
          borderRight: isExibirNomes ? "1px solid #eff6e0" : "none",
        }}
        onClick={mudarEstilo}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Usuarios online:{" "}
            <span className={styles.count}>{userAtivos.length}</span>
          </p>
          {isExibirNomes ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          <div
            ref={refOnline}
            style={{
              maxHeight: isExibirNomes ? "1000px" : "0",
              overflow: "hidden",
              transition: "max-height 0.3s ease",
              margin: "0.5rem",
            }}
          >
            {userAtivos.map((usuario) => (
              <p key={usuario.id} style={{ paddingTop: "0.5rem" }}>
                <CircleIcon
                  sx={{
                    color: "#00db00",
                    fontSize: "0.7rem",
                    marginRight: "0.5rem",
                  }}
                />
                {usuario.nome}
              </p>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default CTitleDashboard;
