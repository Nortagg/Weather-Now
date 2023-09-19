import "./home.page.scss";

import { AiOutlineSearch } from "react-icons/ai";
import SelectBar from "../search/select";
import MediaLinks from "./links";

const HomePage = ({
  search,
  handleChange,
  handleSelectChange,
  selectedSelectItem,
}) => {
  return (
    <div className="search-img-container">
      <img
        className="background-main"
        alt="background"
        src="/pictures/background.jpg"
      ></img>
      <div className="search-loading-links">
        <h1 className="weather-app-title">Weather app</h1>
        <div className="input-icon">
          <input
            className="input-look"
            type="text"
            placeholder="Search for cities"
            onChange={handleChange}
            value={search}
          />
          <span className="icon-input-look">
            <AiOutlineSearch />
          </span>
        </div>
        <SelectBar
          classNameSelection={"selection"}
          classNameContent={"select-content"}
          handleSelectChange={handleSelectChange}
          selectedSelectItem={selectedSelectItem}
        />
        <img
          className="img-loading"
          src="https://w.wallhaven.cc/full/r2/wallhaven-r252rq.jpg"
          alt="spinning-clouds"
        ></img>
        <MediaLinks />
      </div>
    </div>
  );
};
export default HomePage;
