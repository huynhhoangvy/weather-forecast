import React, { useEffect } from "react";
import citiesData from '../../city-list.json';
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "../custom-toggle/CustomToggle";
import CustomMenu from "../custom-menu/CustomMenu";
import { getWeatherByIdRequest, addCity, removeCity, getWeatherByGroupRequest } from "../../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './cities.sass';
import { getName } from 'country-list';

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
  };

  const getCityIds = (cities) => {
    const result = cities.reduce((acc, item) => [...acc, item.id], []).join(',');
    console.log('res: ', result)
    return result;
  };

  useEffect(() => {
    console.log('cities: ', cities)
    const result = getCityIds(cities)
    // dispatch(getWeatherByGroupRequest(result));
  }, [])

  return (
    <>
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
      <button onClick={() => dispatch(getWeatherByGroupRequest(getCityIds(cities)))}>get</button>
      <Row>
        {
          cities.map((item, i) => (
            <Col className="col-6" key={i}>
              <Link to={`/details/${item.id}`}>
                {item.name}, {getName(item.sys.country)}
              </Link>
              <button onClick={() => onClickRemoveCity(item.id)}>X</button>
              <div>
                {(Math.round(item.main.temp * 10) / 10).toFixed()}&deg;C
            </div>
              <div>
                min: {(Math.round(item.main.temp_min * 10) / 10).toFixed()}&deg;C
            </div>
              <div>
                max: {(Math.round(item.main.temp_max * 10) / 10).toFixed()}&deg;C
            </div>
              {item.weather[0].main}
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
            </Col>
          ))
        }
      </Row>
    </>
  );
};

export default Cities;
