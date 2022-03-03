#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printError, printHelp, printSuccess, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getIcon, getWeather} from "./services/api.service.js";

const saveToken = async (token) => {
  if (typeof token !== "string") {
    printError('Token is not passed')
    return;
  }

  try {
    await saveKeyValue('token', token);
    printSuccess('Token saved')
  } catch (e) {
    printError(e.message)
  }
}

const saveCity = async (city) => {
  if (!city.length) {
    printError('No city specified');
    return;
  }
  try {
    await saveKeyValue('city', city);
    printSuccess('City saved')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
    const weather = await getWeather(city);
    const icon = getIcon(weather.weather[0].icon);
    printWeather(weather, icon);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError('City not found');
    } else if (e?.response?.status === 401) {
      printError('Token is invalid')
    } else {
      printError(e.message);
    }
  }
}

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }

  if (args.c) {
    return saveCity(args.c);
  }

  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast('Moscow');
};

initCLI();
