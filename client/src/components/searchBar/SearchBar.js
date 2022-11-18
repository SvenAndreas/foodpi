import React, { useState } from "react";
import s from "./searchBar.module.css";
import magnifyingglass from "../../media/images/lupa.png";
import { useDispatch } from "react-redux";
import { searchByName, setLoading } from "../../redux/actions";
import fs from "../../media/images/fs.png";

function SearchBar({ allRecipes }) {
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState("");
  const [active, setActive] = useState(false)
  const dispatch = useDispatch();
 
  // console.log(allRecipes)

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const newFilter =
      allRecipes.length > 0
      ? allRecipes.filter((e) => e.name.toLowerCase().includes(searchWord.toLowerCase()))
      : [];
    setActive(true)
    setName(searchWord);
    searchWord === "" ? setFilteredData([]) : setFilteredData(newFilter);
  };

  const hadlePress = (e) => {
    if (e.key === "Enter") {
      dispatch(setLoading())
      dispatch(searchByName(name));
      setFilteredData([]);
      setName("")
    }
  };

  const handleClick = () => {
    setFilteredData([]);
    dispatch(setLoading())
    dispatch(searchByName(name));
    setName("")
  };

  const handleSearchSelection = (e) => {
    setFilteredData([]);
    dispatch(setLoading())
    dispatch(searchByName(e.target.innerHTML));
    setName("")
  };
  const handleCancel = () => {
    const input = document.getElementById("searchBar");
    input.value = "";
    setFilteredData([]);
    setActive(false)
    setName("");
  };
    
  return (
    <div className={s.search_container}>
      <div className={s.search_inputs_container}>
        <input
          id="searchBar"
          placeholder="Enter recipe name..."
          onChange={handleFilter}
          onKeyDown={hadlePress}
          autoComplete="off"
        />

        {active && name.length !== 0
        ?<div onClick={handleCancel} className={s.search_img_container_fs}>
        <img src={fs} alt="forkAndSpoon" />
       </div>
       : null }
        
          

        <div onClick={handleClick} className={s.search_img_container}>
          <img src={magnifyingglass} alt="magnifyingglass" />
        </div>

      </div>

      {filteredData.length === 0 && name.length !== 0
      ? (
        <div className={s.dataResults}>
          <p className={s.dataItem}>No results with that name...</p>
        </div>
      ) 
      : filteredData.length !== 0 
        ? (
        <div className={s.dataResults}>
          {filteredData.length !== 0 &&
            filteredData.slice(0, 10).map((e) => (
              <p
                onClick={handleSearchSelection}
                className={s.dataItem}
                key={e.id}
                value={e.name}
              >
                {e.name}
              </p>
            ))}
        </div>
          ) 
        : null}
    </div>
  );
}

export default SearchBar;
