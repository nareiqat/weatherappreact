import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import { Dimmer, Loader } from "semantic-ui-react";
import cloudyImage from '../assests/cloud.jpg'
import rainyImage from '../assests/rain.jpg'
import nightSky from '../assests/night.jpg'
import sunny from '../assests/sunny.jpg'

// import searchBar from './searchBar'

function Main() {
  

  const [data, setData] = useState([]);
  const [icons,setIcons] = useState([])
  const [getState, setGetState] = useState('New york')
  const [state, setState] = useState('New york')
  const apiKey = process.env.REACT_APP_API_KEY 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

  
  
  
  
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      })
      // .catch(err => alert("Can't find city make sure the name is correct!"))
   
  }, [apiUrl]);

  

 

  const today = new Date()
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const inputHandler = (event) => {
    setGetState(event.target.value)
  }
  const submitHandler = () => {
    setState(getState);
  };
  
  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  const sunsetTime = data.sys
  const imageUrl =  time > sunsetTime ? nightSky : sunny
  const backgroundStyle = { 
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    height: '100vh'
    
  }

  return (
    <div style={backgroundStyle}>
        {(typeof data.main != 'undefined') ? (
        <Weather input={getState} weatherData={data} handleInput={inputHandler} handleSubmit={submitHandler} unitConvert={kelvinToFarenheit} />
      ): (
        <div>
          <Dimmer >
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
    

  );
}




export default Main;
