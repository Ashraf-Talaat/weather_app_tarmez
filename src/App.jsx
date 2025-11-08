import "./App.css";
import { useEffect, useState } from "react";

//MIU
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";

//external [api, locales, moment]
import axios from "axios";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/min/locales";
moment.locale("ar");

let cancelAxios = null;
function App() {
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });
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
    i18n.changeLanguage(locale);
  }, []);

  useEffect(() => {
    //date and time method
    setDateAndTime(moment().format("MMMM Do YYYY"));

    // api
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=3a26c7ed075ea96552764086756f4f9d",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((response) => {
        // handle success
        //temp
        const responseTemp = Math.round(response.data.main.temp - 272.15);

        //min temp
        const min = Math.round(response.data.main.temp_min - 272.15);

        //max temp
        const max = Math.round(response.data.main.temp_max - 272.15);

        //Description temp
        const description = response.data.weather[0].description;

        //icon
        const responseIcon = response.data.weather[0].icon;

        setTemp({
          number: responseTemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    //cleanup useEffect
    return () => {
      cancelAxios();
    };
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
              <Typography variant="h1">{temp.number}</Typography>

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
