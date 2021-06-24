import React, { useState, useEffect } from "react";
// import { Card, Image, Icon } from "semantic-ui-react";
import { Container, Card, Grid, CardActionArea,CardContent, CardMedia, Typography } from "@material-ui/core";
import moment from "moment-timezone";
import LoadingComponent from './LoadingComponent';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from "ansi-colors";
import { flexbox } from "@material-ui/system";

const useStyles = makeStyles({
  root : {
    maxWidth: 405,
  },
  media: {
    height: 150,
  },
  title: {
    textAlign: "center",
   
    fontWeight: 500,
  },
  header : {
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  info : {
    display: "inline-block"
  }
})

const MultiDayWeather = ({ multiData, unitConvert }) => {

  const classes = useStyles();
  
  // console.log(date.toLocaleDateString('en-US',options));
  return (
    <Container fluid style={{margin:"5rem"}}>
      <Typography variant="h3" component="h4" className={styles.title}>7 Day forecast</Typography>

      {/* <DailyTemperatures /> */}
      
      <Grid container direction ="row" justify="center" Allignspacing={2}>

          {multiData.daily  ? (
            multiData.daily.map((day) => {
              return (
              <Grid item xs={12} sm={2}>  
                <Card className={classes.root} variant="outlined"> 
                  <CardActionArea >
                    
                    <CardContent>
                      <Typography className={classes.header}>
                      {moment.unix(day.dt).format(" ddd, MMM D YYYY")}
                      </Typography>
                      <Typography >{day.weather[0].description}</Typography>
                      {/* <Typography className={styles.info}>
                        sunrise:
                        {moment
                          .unix(day.sunrise)
                          .tz(multiData.timezone)
                          .format("LT")}
                      </Typography>
                      <Typography className={styles.info}> sunset:
                        {moment
                          .unix(day.sunset)
                          .tz(multiData.timezone)
                          .format("LT")}
                      </Typography> */}
                      <CardMedia className={classes.media} image={"https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"} title={day.weather[0].description} />
                      <Container className={styles.info}>
                        <Typography  >
                          Low: {Math.floor(unitConvert(day.temp.min))} &deg;C{" "}
                        </Typography>
                        <Typography>
                          High: {Math.floor(unitConvert(day.temp.max))} &deg;C{" "}
                        </Typography>
                      </Container>
                      
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              );
            })
          ) : (
            <LoadingComponent />
          )}
      </Grid>
    </Container>
  );
};

// 
const cardStyle = {
  backgroundColor: "white",
  // width:"300px",
  
  
}

export default MultiDayWeather;
