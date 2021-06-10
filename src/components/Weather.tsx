import classes from "*.module.css";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  CardMedia,
} from "@material-ui/core";
import React, { useState } from "react";
import { IWeatherResponse } from "../types/weatherTypes";
import { Forecast } from "./Forecast";

interface IWeatherProps {
  data: IWeatherResponse | undefined;
}

const ICON_URL = "http://openweathermap.org/img/wn/";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 64,
    width: 64,
  },
  weather: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  weatherGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export const Weather: React.FC<IWeatherProps> = ({ data }) => {
  const classes = useStyles();

  const [showForecast, setShowForecast] = useState(false);

  const iconUrl = ICON_URL + data?.weather[0].icon + ".png";

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.weather}>
          <div className={classes.weatherGroup}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Current weather
            </Typography>
            <CardMedia
              className={classes.media}
              image={iconUrl}
              title="Weather icon"
            />
          </div>
          <div className={classes.weatherGroup}>
            <Typography variant="h5" component="h2">
              Clouds
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {data!.weather[0].description}
            </Typography>
          </div>
          <div className={classes.weatherGroup}>
            <Typography variant="h5" component="h2">
              Temperature
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {data!.main.temp} &deg;C
            </Typography>
          </div>
          <div className={classes.weatherGroup}>
            <Typography variant="h5" component="h2">
              Wind
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {data!.wind.speed} meter/sec
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color={showForecast ? "secondary" : "primary"}
            onClick={() => setShowForecast((prev) => !prev)}
          >
            5 days forecast
          </Button>
        </CardActions>
      </Card>
      {showForecast && <Forecast city={data!.id} />}
    </>
  );
};
