import React from 'react';
import { Form, Container,Grid} from 'semantic-ui-react'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt,faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faCloud, faSmog } from '@fortawesome/free-solid-svg-icons'
// import { Utils } from '../utils';

const Weather = ({weatherData, handleInput, handleSubmit, unitConvert, getState}) => {

    const offset = weatherData.timezone;
    const sunset = weatherData.sys.sunset;
    const d = new Date()
    const localTime = d.getTime()
    const localOffset = d.getTimezoneOffset() * 60000
    const utc = localTime + localOffset
    const cityTime = utc + (1000 * offset)
    const newDate = new Date(cityTime)
    // console.log(cityTime);
    // console.log(localTime);
    // let localTime = 
    // const apiImgUrl = process.env.REACT_APP_ICON_URL
    // const {icon} = weatherData.weather[0]
    const main = weatherData.weather[0].main
    

    // console.log(offset);
    let weatherIcon = null;

    if (main === 'Thunderstorm') {
        weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (main === 'Drizzle') {
        weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
    } else if (main === 'Rain') {
        weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
    } else if (main === 'Snow') {
        weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
    } else if (main === 'Clear') {
        weatherIcon = <FontAwesomeIcon icon={faSun} />;
    } else if (main === 'Clouds') {
        weatherIcon = <FontAwesomeIcon icon={faCloud} />;
    } else {
        weatherIcon = <FontAwesomeIcon icon={faSmog} />;
    }

  
    // <p>Temprature: {Math.round(unitConvert(weatherData.main.temp))} &deg;C</p>
    // <p>Current Time: {(new Date(weatherData.dt*1000)).toLocaleTimeString('en-US')}</p>
    // <p>Local Sunrise: {new Date(weatherData.sys.sunrise*1000+(weatherData.timezon)).toLocaleTimeString('en-US')}</p>
    
    // {/* <p>{moment.unix(weatherData.sys.sunrise).tz(weatherData.name).format()}</p> */}
    // <p>Local Sunset: {(new Date(weatherData.sys.sunset*1000+(weatherData.timezone)).toLocaleTimeString('en-US'))}</p>
    // <p>Condition: {weatherData.weather[0].main}<i>{weatherIcon}</i></p>
    // <p>Humidity: {weatherData.main.humidity}% </p>
    return (
        <Container >
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Input action='Search' type="text" placeholder="Enter City..." onChange={handleInput} value={getState}/>
                    
                </Form>
            </Container>
    
            <Grid columns = {1} style={{marginTop:'10%'}}>
                <Grid.Row>
                    <Grid.Column>
                        <p style={styledCity}>{weatherData.name} , {weatherData.sys.country}</p>
                        <p style={dateStyle}>{moment().format('dddd')} {moment().format('LL')}</p>
                    </Grid.Column>
                   
                </Grid.Row>
                
            </Grid>
            <Grid columns = {2} style={{marginTop:'4%'}}>
                <Grid.Row>
                    <Grid.Column >
                       <p style={tempStyle}><i style={iconStyle}>{weatherIcon}</i>{Math.round(unitConvert(weatherData.main.temp))} &deg;</p>
                       <p style={{fontSize:"1.5rem",color:"white",marginRight:"20px"}}>{weatherData.weather[0].description}</p>
                    </Grid.Column>
                    <Grid.Column >
                        <Grid columns={2}>
                            <Grid.Row style={infoRowStyle}>
                                <Grid.Column style={infoColStyle}>
                                <p style={pInfoStyle}>{Math.round(unitConvert(weatherData.main.temp_max))} &deg;</p>
                                <span style={spanInfoStyle}>High</span>
                                <p style={pInfoStyle}>{Math.round(unitConvert(weatherData.main.temp_min))} &deg;</p>
                                <span style={spanInfoStyle}>Low</span>
                               <p style={pInfoStyle}>{weatherData.main.humidity}%</p>
                               <span style={spanInfoStyle}>Humidity</span>
                                </Grid.Column>
                                <Grid.Column style={infoColStyle}>
                                    <p style={pInfoStyle}> {weatherData.wind.speed}mph</p>
                                    <span style={spanInfoStyle}>Wind</span>
                                    <p style={pInfoStyle}>{moment.unix(weatherData.sys.sunrise).format("h:mm a")}</p>
                                    <span style={spanInfoStyle}>Sunrise</span>
                                    <p style={pInfoStyle}>{moment.unix(weatherData.sys.sunset).format("h:mm a")}</p>
                                    <span style={spanInfoStyle}>Sunset</span>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                      
                    </Grid.Column>
                </Grid.Row>
            </Grid>
           
        </Container>
    )
}


const spanInfoStyle = {
    padding:"5px",
    fontWeight:"700"
}

const pInfoStyle = {
    fontSize:"1.5rem",
    fontWeight:"600",
    margin:"2px 0px",
    padding:"5px"
}
const infoColStyle = {
    color: "white",
    fontSize:"1.2rem"
}

const infoRowStyle = {
    border:"1px solid rgba(255,255,255,0.3)",
    borderRadius: "10px",
   
   
}

const dateStyle = {
fontFamily: "Arial",
fontSize: "1.5rem",
color:"white",
fontWeight: "700",

}

const styledCity = {
fontFamily: "Arial",
fontSize: "4rem",
color:"white",
fontWeight: "700",
margin:"0px"

}    

const tempStyle = {
    fontFamily: 'Ubuntu, sans-serif',
    fontSize: "5rem",
    fontWeight:"400",
    margin:"2px",
    color:"white"
    
}

const iconStyle = {
    color: "white",
    marginRight:"10px"
}




export default Weather;
