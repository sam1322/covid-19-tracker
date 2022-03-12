import React, { useState, useEffect } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import axios from "axios";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./utils";
import LineGraph from "./LineGraph";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState({});
  // do not ever use a raw async function in useEffect
  useEffect(() => {
        axios.get("https://disease.sh/v3/covid-19/all").then((resp) => {
        // console.log(resp.data)
        setCountry("worldwide");
        setCountryInfo(resp.data);
      });
 
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((resp) => {
          // console.log(resp);
          const countries = resp.data.map((country, i) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(resp.data);
          console.log("sortedData",sortedData)
          setTableData(sortedData);
          setCountries(countries);
        })
        .catch((err) => console.log("Error => ", err));
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await axios.get(url).then((resp) => {
      // console.log(resp.data)
      setCountry(countryCode);
      setCountryInfo(resp.data);
    });
  };
  // console.log(countryInfo)
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            title="Coronavirus cases"
          />
          <InfoBox
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            title="Recovered"
          />
          <InfoBox
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            title="Deaths"
          />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>WorldWide new cases</h3>
        </CardContent>
        <LineGraph />
      </Card>
    </div>
  );
}

export default App;
