import React, { useState, useEffect } from "react";
import { Grid, Card, Image, Icon, Container } from "semantic-ui-react";
import moment from "moment-timezone";

const MultiDayWeather = ({ multiData, unitConvert }) => {
  // function DailyTemperatures(multiData){

  //   const DailyData = multiData.current.daily.map((day) =>

  //       <div key={day.dt}>
  //         <div>{day.temp.day}</div>
  //         <div>{day.temp.min}</div>
  //         <div>{day.temp.max}</div>
  //       </div>

  //   )
  //   return (
  //     <Grid.Column>
  //       {DailyData}
  //     </Grid.Column>
  //   )
  // }

  // const iconurl = "https://openweathermap.org/img/wn" + `${multiData.daily.weather[0].icon}` + ".png"
  const date = new Date()
  const date1 = date.toDateString
  console.log(date1);
  return (
    <Container style={{paddingTop: "5%"}}>
      <h2 style={{ textAlign: "center" }}>7 Day forecast</h2>

      {/* <DailyTemperatures /> */}
      
      <Card.Group itemsPerRow={8}>
        {multiData.daily !== undefined ? (
          multiData.daily.map((day) => {
            return (
              <Card style={{backgroundColor:"white"}}>
                <Image style={{backgroundColor:"white"}} src={"https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>
                    {Math.floor(unitConvert(day.temp.day))} &deg;C 
                  </Card.Header>
                  <Card.Description>{day.weather[0].description}</Card.Description>
                  <Card.Meta>
                    sunrise:
                    {moment
                      .unix(day.sunrise)
                      .tz(multiData.timezone)
                      .format("LT")}
                  </Card.Meta>
                  <Card.Meta> sunset:
                    {moment
                      .unix(day.sunset)
                      .tz(multiData.timezone)
                      .format("LT")}</Card.Meta>
                  <Card.Description style={{display:"inline"}}>
                  <Card.Description>
                    {Math.floor(unitConvert(day.temp.min))} &deg;C{" "}
                  </Card.Description>
                  <Card.Description>
                    {Math.floor(unitConvert(day.temp.max))} &deg;C{" "}
                  </Card.Description>
                  </Card.Description>    
                  
                </Card.Content>
              </Card>
            );
          })
        ) : (
          <div>Please search for a city!</div>
        )}
      </Card.Group>
    </Container>
  );
};

export default MultiDayWeather;
