import React , {useState,useEffect} from 'react'
import { FormControl, MenuItem, Select } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries,setCountries] = useState(['USA','UK','India'])
  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            
            {
              countries.map((country,i)=>(<MenuItem key={i} value={country}>{country}</MenuItem>))
            }
            
            {/* <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="Yooo">Yooo</MenuItem>
            <MenuItem value="Hey2y">Hey2y</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field */}
      {/* Infobocs */}
      {/* Infobocs */}
      {/* Infobocs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
