import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getForecastByIdRequest } from '../../redux/actions/actionCreators';
import isEmpty from 'lodash/isEmpty'
import moment from 'moment';

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
          <div>
            {
              weather.list.map((item, i) => (
                <div key={i}>
                  <div>
                    {moment.unix(item.dt).format('MMM DD')}
                    </div>
                    <div>
                    {moment.unix(item.dt).format('h A')}
                  </div>
                  <div>
                    {Math.ceil(item.main.temp)}&deg;C
                  </div>
                  {item.weather[0].main}
                  <div>{item.weather[0].description}</div>
                  <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                </div>
              ))
            }
          </div>
        </div>
      }
    </>
  )
}

export default Details
