import React from 'react'

import Plot from 'react-plotly.js'
import { useSelector } from 'react-redux'
import { getEnd, getStart } from '../../rtk/dateSlice'
import { getWeatherDaily } from '../../rtk/weatherSlice'

const DetailsPlot = () => {
  const start = useSelector(getStart)
  const end = useSelector(getEnd)
  const dailyWeather = useSelector(getWeatherDaily)

  const setData = () => {
    const data = []
    if (dailyWeather.length > 1) {
      for (let i = start; i <= end; i++) {
        data.push(dailyWeather[i].temp.day)
        console.log('data added')
      }
    }

    return data
  }

  const max_of_data = Math.max.apply(Math, setData())
  const min_of_data = Math.min.apply(Math, setData())

  return (
    <>
      {dailyWeather.length > 1 ? (
        <Plot
          data={[{ type: 'bar', x: [0, 1, 2, 3, 4, 5, 6, 7], y: setData() }]}
          layout={{
            width: 'auto',
            height: 'auto',
            title: 'Temps for the selected range',
            xaxis: {
              showline: true,
              domain: [0, 10],
              title: 'Days after today',
              showgrid: true,
              rangemode: 'nonnegative'
            },
            yaxis: {
              showline: true,
              title: 'Temp(K)',
              rangemode: 'normal',
              range: [min_of_data, max_of_data]
            },
            showlegend: true
          }}
        />
      ) : (
        <p className='text-center'>'Waiting for the data to plot'</p>
      )}
    </>
  )
}

export default DetailsPlot
