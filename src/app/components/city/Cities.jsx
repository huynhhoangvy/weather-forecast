import React from "react";
import citiesData from '../../city-list.json';
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "../custom-toggle/CustomToggle";
import CustomMenu from "../custom-menu/CustomMenu";
import { getWeatherByIdRequest, addCity, removeCity } from "../../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cities = () => {
  const dispatch = useDispatch();
  const cities = useSelector(state => state.cities);

  const onClickAddCity = (city) => {
    const isExisting = cities.filter(item => item.id === city.id).length;
    if (!isExisting && cities.length < 10) {
      dispatch(getWeatherByIdRequest(city.id));
    }
  };

  const onClickRemoveCity = idx => {
    dispatch(removeCity(idx));
    // const localData = JSON.parse(localStorage.getItem('cities'));
    // if (localData) {
    //   localStorage.setItem('cities', localData.filter(item => item.id !== idx));
    // }
  };

  const getCityIds = (cities) => {
    const result = cities.reduce((acc, item) => [...acc, item.id], []);
    return result;
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Cities
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {
            citiesData.map((city, i) => (
              <Dropdown.Item eventKey={i} key={i} onClick={() => onClickAddCity(city)}>
                {city.name}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      <h3>MY LIST:</h3>
      <ol>
        {
          cities.map((item, i) => (
            <li key={i}>
              <Link to={`/details/${item.id}`}>
                {item.name}
              </Link>
                <button onClick={() => onClickRemoveCity(item.id)}>X</button>
              <div>
                {Math.ceil(item.main.temp)}&deg;C
            </div>
              {item.weather[0].main}
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
            </li>
          ))
        }
      </ol>
    </div>
  );
};

export default Cities;
