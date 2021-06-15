import React from "react";
import { Form, Container, Grid } from "semantic-ui-react";
import moment from "moment-timezone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faCloud,
  faSmog,
} from "@fortawesome/free-solid-svg-icons";
import LoadingComponent from "./LoadingComponent";

const Weather = ({
  weatherData,
  handleInput,
  handleSubmit,
  unitConvert,
  getState,
  multiData,
}) => {
  const main = weatherData.weather[0].main;

  // console.log(offset);
  let weatherIcon = null;

  if (main === "Thunderstorm") {
    weatherIcon = <FontAwesomeIcon icon={faBolt} />;
  } else if (main === "Drizzle") {
    weatherIcon = <FontAwesomeIcon icon={faCloudRain} />;
  } else if (main === "Rain") {
    weatherIcon = <FontAwesomeIcon icon={faCloudShowersHeavy} />;
  } else if (main === "Snow") {
    weatherIcon = <FontAwesomeIcon icon={faSnowflake} />;
  } else if (main === "Clear") {
    weatherIcon = <FontAwesomeIcon icon={faSun} />;
  } else if (main === "Clouds") {
    weatherIcon = <FontAwesomeIcon icon={faCloud} />;
  } else {
    weatherIcon = <FontAwesomeIcon icon={faSmog} />;
  }

  function calcTime(offset) {

    // create Date object for current location
    const d = new Date();
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    const utc = d.getTime() + (d.getTimezoneOffset()*60000);
    // create new Date object for different city
    // using supplied offset
    const nd = new Date(utc + (3600000*offset));
    // return time as a string
    return nd.toLocaleTimeString();

  }
  


  function convertSuntime(unixTime, offset){
    
  }

  console.log(convertSuntime(weatherData.dt, weatherData.timezone/3600));

  return (
    <Container>
      <Container>
        <Form style={searchContainer} onSubmit={handleSubmit}>
          <Form.Input
            action="Search"
            type="text"
            placeholder="Enter City..."
            onChange={handleInput}
            value={getState}
          />
        </Form>
      </Container>

      <Grid columns={1} style={{ marginTop: "10%" }}>
        <Grid.Row>
          <Grid.Column>
            <p style={styledCity}>
              {weatherData.name} , {weatherData.sys.country}
            </p>
            <p style={dateStyle}>
              {/* {moment().format("dddd")} {moment().format("LL")} */}
              {calcTime(weatherData.timezone/3600)}
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid columns={2} style={{ marginTop: "4%" }}>
        <Grid.Row>
          <Grid.Column>
            <p style={tempStyle}>
              <i style={iconStyle}>{weatherIcon}</i>
              {Math.round(unitConvert(weatherData.main.temp))} &deg;
            </p>
            <p
              style={{
                fontSize: "1.5rem",
                color: "white",
                marginRight: "20px",
              }}
            >
              {weatherData.weather[0].description}
            </p>
          </Grid.Column>
          <Grid.Column>
            <Grid columns={2}>
              <Grid.Row style={infoRowStyle}>
                <Grid.Column style={infoColStyle}>
                  <p style={pInfoStyle}>
                    {Math.round(unitConvert(weatherData.main.temp_max))} &deg;
                  </p>
                  <span style={spanInfoStyle}>High</span>
                  <p style={pInfoStyle}>
                    {Math.round(unitConvert(weatherData.main.temp_min))} &deg;
                  </p>
                  <span style={spanInfoStyle}>Low</span>
                  <p style={pInfoStyle}>{weatherData.main.humidity}%</p>
                  <span style={spanInfoStyle}>Humidity</span>
                </Grid.Column>
                <Grid.Column style={infoColStyle}>
                  <p style={pInfoStyle}> {weatherData.wind.speed} m/s</p>
                  <span style={spanInfoStyle}>Wind</span>
                  {/* <p style={pInfoStyle}>
                    {moment
                      .unix(multiData.current.sunrise)
                      .tz(multiData.timezone)
                      .format("LT") && <LoadingComponent/>}
                  </p>

                  <span style={spanInfoStyle}>Sunrise</span>
                  <p style={pInfoStyle}>
                    {moment
                      .unix(multiData.current.sunset)
                      .tz(multiData.timezone)
                      .format("LT") && <LoadingComponent/>}
                  </p> */}
                  {/* <p>{convertSuntime(weatherData.sys.sunrise,weatherData.timezone/3600)}</p> */}

                  <span style={spanInfoStyle}>Sunset</span>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

const searchContainer = {
  paddingTop: "5%",
  width: "1000px",
  textAllign: "center",
};

const spanInfoStyle = {
  padding: "5px",
  fontWeight: "700",
};

const pInfoStyle = {
  fontSize: "1.5rem",
  fontWeight: "600",
  margin: "2px 0px",
  padding: "5px",
};
const infoColStyle = {
  color: "white",
  fontSize: "1.2rem",
};

const infoRowStyle = {
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: "10px",
};

const dateStyle = {
  fontFamily: "Arial",
  fontSize: "1.5rem",
  color: "white",
  fontWeight: "700",
};

const styledCity = {
  fontFamily: "Arial",
  fontSize: "4rem",
  color: "white",
  fontWeight: "700",
  margin: "0px",
};

const tempStyle = {
  fontFamily: "Ubuntu, sans-serif",
  fontSize: "5rem",
  fontWeight: "400",
  margin: "2px",
  color: "white",
};

const iconStyle = {
  color: "white",
  marginRight: "10px",
};

export default Weather;
