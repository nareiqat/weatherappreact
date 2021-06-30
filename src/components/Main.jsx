import React, { useEffect, useState } from "react";
import Weather from "./Weather";
// import { Dimmer, Loader } from "semantic-ui-react";
// import cloudyImage from "../assests/cloud.jpg";
// import rainyImage from "../assests/rain.jpg";
import nightSky from "../assests/night.jpg";
// import sunny from "../assests/sunny.jpg";
import clearDay from "../assests/clear-day.jpg";
import MultiDayWeather from "./MultiDayWeather";
import moment from "moment";
import LoadingComponent from "./LoadingComponent";
// import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from "react-dom/cjs/react-dom.development";

// import searchBar from './searchBar'

function Main() {
  const [data, setData] = useState([]);

  // const [icons,setIcons] = useState([])
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);
  const [lat, setLat] = useState("40.7128");
  const [long, setLong] = useState("-74.0060");
  // const [geoData, setGeoData] = useState([])
  const [multiData, setMultiData] = useState([]);
  const [getState, setGetState] = useState("New York");
  const [state, setState] = useState("New York");
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  useEffect(() => {
    const getData = () => {
      fetch(apiUrl)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!, Invalid city name!");
          }
          return res.json();
        })
        .then(
          (result) => {
            setData(result);
            setLat(result.coord.lat);
            setLong(result.coord.lon);
            setLoading(false);
            console.log(result);
          },
          (err) => {
            setError(err);
            setLoading(false);
            alert(err.message);
            console.log(err.message);
          }
        );
    };
    getData();
  }, [apiUrl]);

  const oneApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={minutely}&appid=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    const getData = () => {
      fetch(oneApiUrl)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Invalid longitude and latitude values");
          }
          return res.json();
        })
        .then(
          (result) => {
            setMultiData(result);

            setLoading(false);
            console.log(result);
          },
          (err) => {
            setError(err);
            setLoading(true);
            alert(err.message);
            console.log(err.message);
          }
        );
    };
    getData();
  }, [oneApiUrl]);

  
  const sunsetTime = moment
    .unix(data?.sys?.sunset)
    .utcOffset(data.timezone / 3600)
    .format("HH");

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };
  const submitHandler = () => {
    setState(getState);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  // const sunsetTime = multiData.current
  const time = moment().format("HH");
  console.log(time);
  //current time for example if its 2pm time = 14
  console.log(sunsetTime);
  //localsunsetTime in 24hrs
  const imageUrl = (time > sunsetTime) ? nightSky : clearDay;

  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundeRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    height: "100%",
    overflow: "",
  };

  return (
    <div style={backgroundStyle}>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Weather
          input={getState}
          weatherData={data}
          handleInput={inputHandler}
          handleSubmit={submitHandler}
          unitConvert={kelvinToFarenheit}
          multiData={multiData}
        />
      )}

      <MultiDayWeather
        multiData={multiData || null}
        unitConvert={kelvinToFarenheit}
      />
    </div>
  );

  // return (
  //   <div style={backgroundStyle}>
  //     {typeof data.main != undefined && <Weather
  //       input={getState}
  //       weatherData={data}
  //       handleInput={inputHandler}
  //       handleSubmit={submitHandler}
  //       unitConvert={kelvinToFarenheit}
  //       multiData={multiData}
  //     />}
  //     <MultiDayWeather multiData={multiData} unitConvert={kelvinToFarenheit}/>
  //     {loading && <LoadingComponent loading={loading} />}
  //     {error && <div> error loading data!</div>}
  //   </div>
}

export default Main;
