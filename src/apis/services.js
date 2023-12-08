export const getWeather = async (lat, lon, part) => {
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${process.env.REACT_APP_API_KEY}`
  )
  return request
}
