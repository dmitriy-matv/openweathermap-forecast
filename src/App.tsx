import classes from "*.module.css";
import {
  Container,
  createStyles,
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Weather } from "./components/Weather";
import { ApiFetcher } from "./services/ApiFetcher";
import { IWeatherResponse } from "./types/weatherTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    title: {
      textAlign: "center",
    },
  })
);

function App() {
  const classes = useStyles();
  const [town, setTown] = React.useState(0);
  const [data, setData] = React.useState<IWeatherResponse>();

  const FetchService = new ApiFetcher();

  useEffect(() => {
    if (town !== 0) {
      FetchService.getWeather(town).then((data) => {
        setData(data);
      });
    }
  }, [town]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.target.value && setTown(event.target.value as number);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <h1 className={classes.title}>SIMPLE WEATHER FORECAST</h1>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            Select town
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={town}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={6167865}>Toronto, CA</MenuItem>
            <MenuItem value={6094817}>Ottawa, CA</MenuItem>
            <MenuItem value={1850147}>Tokyo, JP</MenuItem>
          </Select>
        </FormControl>
        {data && <Weather data={data} />}
      </Container>
    </div>
  );
}

export default App;
