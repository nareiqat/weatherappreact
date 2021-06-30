import React from "react";
// import { Card, Image, Icon } from "semantic-ui-react";
// import {
//   Container,
//   Card,
//   Grid,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@material-ui/core";
import moment from "moment-timezone";
import LoadingComponent from "./LoadingComponent";
import { makeStyles } from "@material-ui/core/styles";
// import { flexbox } from "@material-ui/system";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
// import "./grid.css"

const useStyles = makeStyles({
  root: {
    maxWidth: 405,
    width: "11rem",
  },
  media: {
    height: 100,
  },
  title: {
    textAlign: "center",
    fontSize: "clamp(1.75rem, -0.8750rem + 8.3333vw, 3.5rem)",
    fontWeight: 700,
    color: "white",
  },
  header: {
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  info: {
    // display: "inline",
  },
});

const MultiDayWeather = ({ multiData, unitConvert }) => {
  const classes = useStyles();

  // console.log(date.toLocaleDateString('en-US',options));
  return (
    <Container fluid="xs" style={{ margin: "5rem", paddingBottom: "2rem" }}>
      <p className={classes.title}>7 Day forecast</p>

      {/* <DailyTemperatures /> */}

      <Row>
        {multiData.daily ? (
          multiData.daily.map((day) => {
            return (
              <Col>
                <Card className={classes.root}>
                  <CardBody>
                    <CardTitle className={classes.header}>
                      {moment.unix(day.dt).format(" dddd")}
                    </CardTitle>
                    <CardSubtitle>
                      {moment.unix(day.dt).format(" MMMM DD YYYY")}
                    </CardSubtitle>
                    <CardText>{day.weather[0].description}</CardText>
                    <CardImg
                      className={classes.media}
                      src={
                        "https://openweathermap.org/img/wn/" +
                        day.weather[0].icon +
                        ".png"
                      }
                      title={day.weather[0].description}
                    />
                    <Container>
                      <CardText>
                        Low: {Math.floor(unitConvert(day.temp.min))} &deg;C{" "}
                      </CardText>
                      <CardText>
                        High: {Math.floor(unitConvert(day.temp.max))} &deg;C{" "}
                      </CardText>
                    </Container>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        ) : (
          <LoadingComponent />
        )}
      </Row>
    </Container>
  );
};

//

export default MultiDayWeather;
