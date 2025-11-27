import "./App.css";
import { useEffect, useState } from "react";

//redux
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherApi, test } from "./features/weatherApi/weatherApiSlice";

//MIU
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";

//external [api, locales, moment]
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

function App() {
  const temp = useSelector((state) => state.weatherApi.weatherData);
  const isLoading = useSelector((state) => state.weatherApi.isLoading);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");

  const [locale, setLocale] = useState("en");

  //* ** handlers ** */
  function handleLocaleBtn() {
    if (locale == "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }

    setDateAndTime(moment().format("MMMM Do YYYY"));
  }

  //locales
  useEffect(() => {
    dispatch(test());
    console.log("//////////////////");
    console.log(temp);
    console.log(isLoading);
    dispatch(fetchWeatherApi());

    i18n.changeLanguage(locale);
  }, []);

  useEffect(() => {
    //date and time method
    setDateAndTime(moment().format("MMMM Do YYYY"));
  }, []);
  return (
    <>
      <Container
        maxWidth="md"
        style={{
          background: "#b3e5fc",
          borderRadius: "1rem",
          padding: "1rem",
          marginTop: "10rem",
        }}
        dir={locale == "ar" ? "rtl" : "ltr"}
      >
        {/* start header */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* location */}
          <div>
            <Typography variant="h3">{t("Cairo")}</Typography>
            <Typography variant="h6">{dateAndTime}</Typography>
          </div>

          {/* language btn */}
          <div>
            <Button
              variant="text"
              sx={{ fontSize: "1.2rem" }}
              onClick={handleLocaleBtn}
            >
              {locale == "en" ? "AR" : "EN"}
            </Button>
          </div>
        </Box>
        {/*=== end header ===*/}

        <hr />

        {/* start body */}
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {/* tem */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                <Typography variant="h1">{temp.number}</Typography>
              )}

              <div>
                <img src={temp.icon} />

                <Typography variant="h5">{t(temp.description)}</Typography>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "2rem",
              }}
            >
              <Typography variant="h3">
                {t("min")}: {temp.min}
              </Typography>
              <Typography variant="h3" sx={{ margin: "0 1rem" }}>
                |
              </Typography>

              <Typography variant="h3">
                {t("max")}: {temp.max}
              </Typography>
            </div>
          </div>

          {/* icon */}
          <div>
            <CloudIcon sx={{ fontSize: "15rem", color: "white" }} />
          </div>
        </Box>
        {/*=== end body ===*/}
      </Container>
    </>
  );
}

export default App;
