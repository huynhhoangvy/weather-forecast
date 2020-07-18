import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestApiData } from "../redux/actions/actionCreators";

const Api = () => {
  const weather = useSelector(state => state.weather);
  const dispatch = useDispatch();
  const { results = [] } = weather;

  useEffect(() => {
    dispatch(requestApiData());
    console.log('run')
  }, []);

  const mapFunc = (x, i) => (
    <div key={x.id.value}>
      <h1>{x.gender}</h1>
      <h1>{x.name.first}</h1>
      <h1>{x.name.last}</h1>
      <img src={x.picture.medium} alt="shit" />
    </div>
  );

  return <div>{results.map(mapFunc)}</div>;
};

export default Api;
