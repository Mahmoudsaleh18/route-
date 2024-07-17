import "./App.css";
import Details from "./Components/Details/Details";
import NavBar from "./Components/NavBar/NavBar";
import Table from "./Components/Table/Table";
import TotalSales from "./Components/TotalSales/TotalSales";
function App() {
  return (
    <div className="App ">
      <NavBar />
      <TotalSales />
      <Table />
      <Details />
    </div>
  );
}

export default App;
