import {join} from 'path';
import {homedir} from 'os';
import {promises} from 'fs'

const filePath = join(homedir(), 'weather.data.json');

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch {
    return false;
  }
}

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
}

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)

    const data = JSON.parse(file);

    return data[key]
  }
}

const saveKeyValue = async (key, value) => {
  if (!key || !value) {
    return;
  }

  let data = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)

    data = JSON.parse(file);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data))
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY}
