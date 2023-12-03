export const calcDaysSpan = date => {
  const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
  // parse today to number
  const todayInit = new Date()
  const todayStr = todayInit.toString()
  const today = Date.parse(todayStr)
  //parse date to number
  const secondDate = Date.parse(date)
  //subtract
  return Math.round(Math.abs((today - secondDate) / oneDay))
  //pass to state

  //const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
}

export const calcMeanTemp = (
  dateRange,
  dailyWeather,
  myStartDate,
  myEndDate
) => {
  let temps = 0,
    count = 1,
    temp = 0
  console.log('templll', temp)
  if (
    (dateRange[0] !== null) & (dateRange[1] !== null) &&
    dailyWeather.length > 1
  ) {
    for (let i = myStartDate; i <= myEndDate; i++) {
      console.log('hi from inside the loop')
      temp = dailyWeather[i].temp.day
      console.log('temp', temp)
      temps += temp
      count++
    }
    return temps / count
  }
}

// TODO: refactor. check args types
export const calcMeanTempForPlot = (s, e, dailyWeather) => {
  let temps = 0,
    count = 0,
    temp = 0
  if (dailyWeather.length > 0) {
    for (let i = s; i <= e; i++) {
      temp = dailyWeather[i].temp.day
      temps += temp
      count++
    }
    return temps / count
  }
  return undefined
}
