import './App.css';
import ListCountries from "./components/listСountries/ListСountries";

function App() {



  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 bg-dark text-white" style={{maxHeight: "600px", overflow: "scroll"}}>
          <ListCountries />
        </div>

      </div>
    </div>
  );
}

export default App;
