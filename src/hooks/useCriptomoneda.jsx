import React, {Fragment, useState} from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, MONEDAS) => {
  //state
  const [moneda, setMoneda] = useState(stateInicial);

  const SelectCripto = () => (
    <Fragment>
      <Label htmlFor="">{label}</Label>
      <Select onChange={(e) => setMoneda(e.target.value)} value={moneda}>
        <option value="">Selecione</option>
        {MONEDAS.map((opcion) => (
          <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
            {opcion.CoinInfo.FullName}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  return [moneda, SelectCripto, setMoneda];
};

export default useCriptomoneda;
