import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import { Dimmer, Loader } from "semantic-ui-react";
import cloudyImage from "../assests/cloud.jpg";
import rainyImage from "../assests/rain.jpg";
import nightSky from "../assests/night.jpg";
import sunny from "../assests/sunny.jpg";
import clearDay from "../assests/clear-day.jpg";
import MultiDayWeather from "./MultiDayWeather";
import moment from "moment";
import LoadingComponent from "./LoadingComponent";
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";

// import searchBar from './searchBar'

function Main() {
  const [data, setData] = useState([]);
  
  // const [icons,setIcons] = useState([])
  let [error, setError] = useState(__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
  let [loading, setLoading] = useState(false);
  const [lat, setLat] = useState('40.7128')
  const [long, setLong] = useState('-74.0060')
  // const [geoData, setGeoData] = useState([])
  const [multiData, setMultiData] = useState([])
  const [getState, setGetState] = useState("New York");
  const [state, setState] = useState("New York");
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
  
  

 

  useEffect(() => {
    const getData = () => {
    fetch(apiUrl)
      .then((res) => {
      if(res.status >= 400){
        throw new Error("Server responds with error!, Invalid city name!")
        
      }
        return res.json()})
      .then((result) => {
        setData(result);
        setLat(result.coord.lat)
        setLong(result.coord.lon)
        setLoading(true)
        console.log(result);
      },
      err => {
      setError(err);
      setLoading(true);
      alert(err.message)
      console.log(err.message)
    })
  }
  getData()
  }, [apiUrl]);


  const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely}&appid=${process.env.REACT_APP_API_KEY}`
    

  useEffect(() => {

    fetch(oneApiUrl)
    .then((resp) => resp.json())
    .then((result1) => {
      setMultiData(result1);
      // setLat(result1.lat)
      // setLong(result1.lon)
      console.log(result1);
    })  
    .catch(err => alert("something is wrong"))
  }, [oneApiUrl]);

  

  

  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };
  const submitHandler = () => {
    setState(getState);
    
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  const sunsetTime = multiData.current
  const imageUrl = time > sunsetTime ? nightSky : clearDay;
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    height: "100vh",
    overflow:""
    
  };

 
  

 
    
  // if(error) {
  //   return <div> {error.message} </div>
  // } else if (!loading) {
  //   return <div> Loading... </div>
  // } else {

  
  return (
  <div style={backgroundStyle}>
    {typeof data.main != "undefined" ? (
      <Weather
        input={getState}
        weatherData={data}
        handleInput={inputHandler}
        handleSubmit={submitHandler}
        unitConvert={kelvinToFarenheit}
        multiData={multiData}
      />
      
    ) : (
      <LoadingComponent loading={loading}/>
    )}
    <MultiDayWeather multiData={multiData} unitConvert={kelvinToFarenheit}/>
  </div>
  );
  // }
        
}

export default Main;
