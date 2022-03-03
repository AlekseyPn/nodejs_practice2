import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(`${chalk.bgRed('ERROR')} ${error}`)
}

const printSuccess = (message) => {
  console.log(`${chalk.bgGreen('SUCCESS')} ${message}`)
}

const printHelp = () => {
  console.log(dedent(`
    ${chalk.bgCyan(' HELP ')} 
    No params - display weather
    -c [CITY] - for set city
    -t [TOKEN] - for set access token
    -h - display help
   `))
}

const printWeather = (weather, icon) => {
  console.log(dedent(`
    ${chalk.bgBlue(' WEATHER ')} Weather in city ${weather.name}
      ${icon}  ${weather.weather[0].description}
      Temp: ${parseInt(weather.main.temp)}C°
      Feels Like: ${parseInt(weather.main.feels_like)}C°
      humidity: ${parseInt(weather.main.humidity)}%
      Wind Speed: ${weather.wind.speed} m/s
   `))
}

export {
  printError,
  printSuccess,
  printHelp,
  printWeather,
}
