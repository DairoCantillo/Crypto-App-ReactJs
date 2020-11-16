import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Error from "./Error";
import Axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
  }
`;

const Formulario = ({setCriptomoneda, setMoneda}) => {
  const [listaCripto, setListaCripto] = useState([]);
  const [error, setError] = useState(false);

  const MONEDAS = [
    {codigo: "USD", nombre: "Dolar de Estados Unidos"},
    {codigo: "COP", nombre: "Peso colombiano"},
    {codigo: "EUR", nombre: "Euro"},
    {codigo: "GBP", nombre: "Libra Esterlina"},
  ];

  //useMoneda
  const [moneda, SelecionarMoneda] = useMoneda(
    "Elije tu Criptooneda",
    "",
    MONEDAS
  );

  //useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elije tu Criptomoneda",
    "",
    listaCripto
  );

  //api Crypto
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await Axios.get(url);
      setListaCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }
    setError(false);
    setCriptomoneda(criptomoneda);
    setMoneda(moneda);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje={"Todos los campos son obligatorios"} /> : null}
      <SelecionarMoneda />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
