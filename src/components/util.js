export function jsonParse (value, defValue) {
  try {
    return JSON.parse(value)
  }
  catch (e) {
    console.error(e)
    return defValue
  }
}

export function loadConfig () {
  let config = jsonParse(localStorage.getItem('myfirstapp'), {})
  return config
}

export function saveConfig (config) {
  localStorage.setItem('myfirstapp', JSON.stringify(config))
}
