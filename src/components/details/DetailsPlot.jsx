import React from 'react'
import { useSelector } from 'react-redux'
import { getPlotEndDate, getPlotStartDate } from '../../rtk/dateSlice'
import { getWeatherDaily } from '../../rtk/weatherSlice'
import ReactEcharts from 'echarts-for-react'

const DetailsPlot = () => {
  const start = useSelector(getPlotStartDate)
  const end = useSelector(getPlotEndDate)
  const dailyWeather = useSelector(getWeatherDaily)
  let data = [],
    xData = []
  const setData = () => {
    data = []
    xData = []
    if (dailyWeather.length > 0) {
      for (let i = start; i <= end; i++) {
        data.push(dailyWeather[i].temp.day)
        xData.push(i)
      }
    }
    return data
  }

  setData()

  const min_of_data = Math.min.apply(Math, data)

  const option = {
    legend: {
      data: ['day temp']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      min: min_of_data - 1,
      name: 'Temp (K)',
      nameTextStyle: {
        align: 'right'
      }
    },
    series: [
      {
        data: data,
        type: 'bar',
        name: 'day temp'
      }
    ]
  }

  return (
    <>
      {dailyWeather.length > 0 ? (
        <ReactEcharts option={option} />
      ) : (
        <p className='text-center'>'Waiting for the data to plot'</p>
      )}
    </>
  )
}

export default DetailsPlot
