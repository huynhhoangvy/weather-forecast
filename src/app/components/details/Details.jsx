import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getForecastByIdRequest } from '../../redux/actions/actionCreators';
import isEmpty from 'lodash/isEmpty'
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Details = () => {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather);
  const { cityId } = useParams();

  useEffect(() => {
    dispatch(getForecastByIdRequest(cityId));
  }, [])

  return (
    <>
      {
        !isEmpty(weather) &&
        <div>
          <h4>{weather.city.name}, {weather.city.country}</h4>
          <Row>
            {
              weather.list.map((item, i) => (
                <Col className="col-3" key={i}>
                  <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                  <div>
                    {moment.unix(item.dt).format('MMM DD')}
                    </div>
                    <div>
                    {moment.unix(item.dt).format('h A')}
                  </div>
                  <div>
                    {(Math.ceil(item.main.temp*10)/10).toFixed()}&deg;C
                  </div>
                  {item.weather[0].main}
                  <div>{item.weather[0].description}</div>
                </Col>
              ))
            }
          </Row>
        </div>
      }
    </>
  )
}

export default Details
