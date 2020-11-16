import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import imagen from "./cryptomonedas.png";
import Spinner from "./components/Spinner";
import Axios from "axios";

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;
const App = () => {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [cotizacion, setCotizacion] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      if (moneda === "" || criptomoneda === "") return;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);
      setCargando(true);
      setTimeout(() => {
        setCargando(false);
        setCotizacion(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 2000);
    };
    consultarAPI();
  }, [moneda, criptomoneda]);

  const respuesta = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion cotizacion={cotizacion} />
  );
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMoneda={setMoneda} setCriptomoneda={setCriptomoneda} />
        {respuesta}
      </div>
    </Contenedor>
  );
};

export default App;
