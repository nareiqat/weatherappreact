import React from 'react';
import { Card, Form, Container,Grid, Icon} from 'semantic-ui-react'
import moment from 'moment';






const Weather = ({weatherData, handleInput, handleSubmit, unitConvert, getState, icon}) => {

    const offset = weatherData.timezone;
    const apiImgUrl = process.env.REACT_APP_ICON_URL
    const {icon} = weatherData.weather[0]

    console.log(offset);
    let weatherIcon = null;

    if (main === 'Thunderstorm') {
        weatherIcon = <FontAwesomeIcon icon={faBolt} />;
    } else if (main === 'Drizzle') {gu
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

   return (
        <Container >
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Input action='Search' type="text" placeholder="Enter City..." onChange={handleInput} value={getState}/>
                    
                </Form>
            </Container>

            <Grid columns = {2} style={{marginTop:'10%'}}>
                <Grid.Row>
                    <Grid.Column>
                        <p style={{fontFamily:'fantasy'}}>{weatherData.name} , {weatherData.sys.country}</p>
                        <p>Day: {moment().format('dddd')}</p>
                        <p>Date: {moment().format('LL')}</p>
                    </Grid.Column>
                    <Grid.Column>
                    <p>Temprature: {Math.round(unitConvert(weatherData.main.temp))} &deg;C</p>
                        {/* <p>Local Sunrise: {new Date(weatherData.sys.sunrise*1000).toLocaleTimeString('en-IN')}</p>
                        
                        <p>Local Sunset: {(new Date(weatherData.sys.sunset*1000).toLocaleTimeString('en-IN'))}</p> */}
                        <p>Condition: {weatherData.weather[0].main} <img src=`apiImgUrl/${icon}`/></p>
                        <p>Humidity: {weatherData.main.humidity} </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
           
        </Container>
    )
    
}

    


const containerStyle = {
    margin: '50px'
}



export default Weather;
