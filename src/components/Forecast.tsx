import moment from "moment";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Button,
  CardMedia,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ApiFetcher } from "../services/ApiFetcher";
import {
  IForecastListElement,
  IForecastResponse,
  IGroupedForecast,
} from "../types/forecastTypes";

interface IForecastProps {
  city: number;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginBottom: 15,
  },
  dateButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  rowIcon: {
    width: 64,
    height: 64,
  },
});
const ICON_URL = "http://openweathermap.org/img/wn/";

export const Forecast: React.FC<IForecastProps> = ({ city }) => {
  const classes = useStyles();
  const FetchService = new ApiFetcher();
  const [data, setData] = useState<IForecastResponse>();
  const [groupedData, setGroupedData] = useState<IGroupedForecast>();
  const [currentDate, setCurrentDate] = useState(moment().format("MMM Do YY"));

  const handleChangeDate = (date: string) => {
    setCurrentDate(date);
  };

  useEffect(() => {
    FetchService.getForecast(city).then((data) => {
      setData(data);
    });
    console.log("DATA: ", data);
  }, []);

  useEffect(() => {
    if (data) {
      console.log("DATA IN USE EFFECT: ", data);

      const weatherByDate = data.list.reduce((acc: IGroupedForecast, value) => {
        // Group initialization
        if (!acc[moment.unix(value.dt).format("MMM Do YY")]) {
          acc[moment.unix(value.dt).format("MMM Do YY")] = [];
        }

        // Grouping
        acc[moment.unix(value.dt).format("MMM Do YY")].push(value);

        return acc;
      }, {});

      setGroupedData(weatherByDate);
    }
  }, [data]);

  const currentData = groupedData
    ? Object.entries(groupedData).filter((group) => {
        return group[0] === currentDate;
      })
    : null;

  console.log(currentData);

  useEffect(() => {}, []);

  const buttons = groupedData
    ? Object.entries(groupedData).map((day, index) => {
        let color: "secondary" | "inherit" | "default" | "primary" | undefined =
          day[0] === currentDate ? "secondary" : "primary";
        console.log(color);

        return (
          <Button
            key={index}
            size="small"
            variant="contained"
            color={color}
            onClick={() => {
              handleChangeDate(day[0]);
            }}
          >
            {day[0]}
          </Button>
        );
      })
    : null;
  const rows =
    groupedData && currentData
      ? currentData[0][1].map((row) => {
          const iconUrl = ICON_URL + row.weather[0].icon + ".png";
          return (
            <TableRow key={row.dt}>
              <TableCell component="th" scope="row">
                {moment.unix(row.dt).format("Do MMM YY, LT")}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.main.temp}
              </TableCell>

              <TableCell component="th" scope="row">
                {row.wind.speed} m/sec
              </TableCell>
              <TableCell component="th" scope="row">
                {row.weather[0].description}
              </TableCell>
              <TableCell component="th" scope="row">
                <CardMedia
                  className={classes.rowIcon}
                  image={iconUrl}
                  title="Weather icon"
                />
              </TableCell>
            </TableRow>
          );
        })
      : null;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Temp</TableCell>
            <TableCell>Max temp</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Icon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
      <div className={classes.dateButtons}>{buttons}</div>
    </TableContainer>
  );
};
