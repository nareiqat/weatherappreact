import React from "react";
import { Form} from "semantic-ui-react";
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
// import LoadingComponent from "./LoadingComponent";
import { Container, Row, Col} from "reactstrap";

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
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    // create new Date object for different city
    // using supplied offset
    const nd = new Date(utc + 3600000 * offset);
    // return time as a string
    return nd.toLocaleTimeString();
  }

  // console.log(convertSuntime(weatherData.dt, weatherData.timezone/3600));

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

      <Container>
        <Container style={{ marginTop: "5%" }}>
          <Row>
            <Col>
              <p style={styledCity}>
                {weatherData.name} , {weatherData.sys.country}
              </p>
              <p style={dateStyle}>
                {/* {moment().format("dddd")} {moment().format("LL")} */}
                {calcTime(weatherData.timezone / 3600)}
              </p>
            </Col>
            <Col>
              <p style={tempStyle}>
                <i style={iconStyle}>{weatherIcon}</i>
                {Math.round(unitConvert(weatherData.main.temp))} &deg;
              </p>
              <p
                style={{
                  fontSize: "clamp(1rem, -0.8750rem + 8.3333vw, 1.5rem)",
                  color: "white",
                  marginRight: "20px"
                }}
              >
                {weatherData.weather[0].description}
              </p>
            </Col>
          </Row>
        </Container>

        <Container style={{ marginTop: "2%" }}>
          <Row>
           
            <Col xs={12} lg={6}>
              <Container>
                <Row style={infoRowStyle}>
                  <Col style={infoColStyle}>
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
                  </Col>
                  <Col style={infoColStyle}>
                    <p style={pInfoStyle}> {weatherData.wind.speed} m/s</p>
                    <span style={spanInfoStyle}>Wind</span>
                    <p style={pInfoStyle}>
                      {moment
                        .unix(weatherData.sys.sunrise)
                        .utcOffset(weatherData.timezone / 3600)
                        .format("LT")}
                    </p>
                    <span style={spanInfoStyle}>Sunrise</span>
                    <p style={pInfoStyle}>
                      {moment
                        .unix(weatherData.sys.sunset)
                        .utcOffset(weatherData.timezone / 3600)
                        .format("LT")}
                    </p>
                    <span style={spanInfoStyle}>Sunset</span>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
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
  margin: "0.2rem 0px",
  padding: "2%",
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
  fontSize: "clamp(1.2rem, -0.8750rem + 7vw, 3.5rem)",
  color: "white",
  fontWeight: "700",
};

const styledCity = {
  fontFamily: "Arial",
  fontSize: "clamp(1.2rem, -0.8750rem + 8.3333vw, 5rem)",
  color: "white",
  fontWeight: "700",
  margin: "0px",
};

const tempStyle = {
  fontFamily: "Ubuntu, sans-serif",
  fontSize: "clamp(2rem, -0.8750rem + 8.3333vw, 5rem)",
  fontWeight: "400",
  margin: "0.125rem",
  color: "white",
};

const iconStyle = {
  color: "white",
  marginRight: "0.7rem",
};

export default Weather;
