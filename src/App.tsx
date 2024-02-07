import './App.css';
import ListCountries from "./components/listСountries/ListСountries";
import InfoCountry from "./components/InfoCountry/InfoCountry";
import {useState} from "react";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleCountrySelect = (alpha3Code: string) => {
    setSelectedCountry(alpha3Code);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 bg-dark text-white" style={{maxHeight: "600px", overflow: "scroll"}}>
          <ListCountries onCountrySelect={handleCountrySelect}/>
        </div>
        <div className="col-md-8 bg-dark text-white">
          <InfoCountry selectedCountry={selectedCountry}/>
        </div>
      </div>
    </div>
  );
}

export default App;
