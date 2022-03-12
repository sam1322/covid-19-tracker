import React from "react";
import "./Table.css";
import numeral, { nullFormat } from "numeral";

function Table({ countries }) {
  console.log("countries", countries);
  return (
    <div className="table">
      {/* {countries?.map((country, i) => (
        <tr key={i}>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))} */}

      {  Object.keys(countries).length!==0 ? (countries?.map((country, i) => (
        <tr key={i}>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))):<></>
    }
    </div>
  );
}

export default Table;
