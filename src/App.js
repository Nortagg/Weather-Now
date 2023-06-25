import "./app.scss";
import SearchBar from "./components/search/search";
import { Routes, Route } from "react-router-dom";
import InDetail from "./components/current-weather/current-weather-in-detail";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SearchBar />}></Route>
        <Route path="/details" element={<InDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
